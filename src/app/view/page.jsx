"use client";

import React, { useState } from "react";

export default function DecodePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [extractedMessage, setExtractedMessage] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const DELIMITER = "###END###";

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setExtractedMessage("");
    setError(null);

    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      // JPEG is lossy — warn user but still attempt decode
      setError(
        "Warning: JPEG is lossy and can destroy hidden bits. If possible, upload the PNG produced by your encoder."
      );
    }
  };

  const handleDecode = () => {
    setError(null);
    setExtractedMessage("");
    if (!selectedImage) {
      setError("Please upload an encoded image first.");
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // We'll build the message byte-by-byte while iterating pixels.
          let currentByteBits = "";
          let message = "";

          // Iterate pixels. Each pixel: [R,G,B,A] -> use R,G,B (skip A).
          // For each channel we take the LSB.
          const maxPixels = data.length / 4;
          // capacity in bits = maxPixels * 3
          const capacityBits = maxPixels * 3;

          for (let i = 0; i < data.length; i += 4) {
            // R, G, B
            for (let channel = 0; channel < 3; channel++) {
              const byteValue = data[i + channel];
              const lsb = byteValue & 1;
              currentByteBits += lsb.toString();

              if (currentByteBits.length === 8) {
                const charCode = parseInt(currentByteBits, 2);
                currentByteBits = "";
                message += String.fromCharCode(charCode);

                // stop if delimiter found
                if (message.endsWith(DELIMITER)) {
                  message = message.slice(0, -DELIMITER.length);
                  setExtractedMessage(message);
                  setIsProcessing(false);
                  setError(null);
                  console.log(
                    `Decoded message (len ${message.length}) from image ${img.width}x${img.height}. Capacity: ${capacityBits} bits`
                  );
                  return;
                }
              }
            }
          }

          // If we finish and didn't find delimiter
          setIsProcessing(false);
          setExtractedMessage("");
          setError(
            "No delimiter found. Image may not contain a message or it was saved in a lossy format (e.g., JPEG) after encoding."
          );
          console.warn(
            `Decoded partial message (no delimiter): ${message.slice(0, 200)}...`
          );
        } catch (err) {
          setIsProcessing(false);
          setError(
            "Failed to read image data. Canvas may be tainted (cross-origin) or the file is too large."
          );
          console.error(err);
        }
      };

      img.onerror = () => {
        setIsProcessing(false);
        setError("Failed to load image. Try a different file.");
      };

      img.src = ev.target.result;
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setError("Failed to read file.");
    };

    reader.readAsDataURL(selectedImage);
  };

  const copyToClipboard = async () => {
    if (!extractedMessage) return;
    try {
      await navigator.clipboard.writeText(extractedMessage);
      // small UI feedback
      alert("Copied to clipboard");
    } catch {
      setError("Failed to copy to clipboard.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center  pt-20">

      <div className="w-full max-w-2xl text-center mb-10 px-4">
        <h1 className="text-4xl font-bold mb-2">Reveal Hidden Messages</h1>
        <p className="text-gray-400">Upload an encoded image to extract and reveal the secret message hidden within.</p>
      </div>
      <div className="w-full max-w-4xl  grid grid-cols-1 md:grid-cols-2 rounded-lg p-6 gap-5 ">
        
      {/* left div */}
        <div className="w-[60] bg-card border border-[#192238] border-border/50 p-6 rounded-lg shadow-sm bg-[#0B0F19] flex flex-col gap-5">

          <input id="decode" type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>

           <label
            htmlFor="decode"
            className="flex flex-col gap-2 items-center justify-center w-full  h-48 border-2 border-dashed border-gray-600 
                      rounded-lg cursor-pointer bg-[#0d1117] hover:border-blue-500 transition"
          >
            <span className="text-4xl text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M450-313v-371L330-564l-43-43 193-193 193 193-43 43-120-120v371h-60ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"/></svg>
            </span>
            <p className="mt-2 text-sm font-medium text-gray-300">
              Click to upload images or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPEG up to 10MB each</p>
          </label>
        {
        imagePreview && (
          <div className=" relative w-full flex flex-col  items-center justify-center ">
              <button className="absolute top-2 right-20 px-2 py-1 rounded-full -mt-3 bg-red-600" htmlFor="decode" onClick={()=>{setImagePreview(null);setSelectedImage(null)}}>X</button>
               <img src={imagePreview} alt="preview" className="w-40 rounded-md border border-gray-700 mb-4" />
          </div>
        )
        }

        {
        error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded mb-4">{error}</div>
        )
        }

        <button  onClick={handleDecode} disabled={isProcessing && imagePreview } className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white mb-4" >
          {isProcessing ? "Decoding..." : "Decode Message"}
        </button>

        {extractedMessage ? (
          <div className="bg-[#13192a] p-4 rounded ">
            <h3 className="font-medium mb-2">Hidden message</h3>
            <label className="font-sans w-50 h-auto  p-1 border border-gray-600 bg-[#192238] rounded text-white">{extractedMessage}</label>
            <div className="mt-3 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-green-600 border border-green-600 text-white px-3 py-1 rounded"
              >
                Copy
              </button>
            </div>
          </div>
        ) : null}
    </div>
{/* right div */}
    <div className="w-[60] bg-card border border-[#192238]  border-border/50 p-6 rounded-lg shadow-sm bg-[#0B0F19] flex flex-col gap-5">
      <div className="w-full text-left">
       <h1 className="flex gap-2 text-lg font-semibold ">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>How it works
        </h1>
        <p className=" text-sm  text-gray-400">Understanding steganography message extraction</p>
        </div>

        <div class=" p-2 rounded-lg shadow-md max-w-md w-full">
            <div class="flex items-start space-x-4">
              
              <div class="flex-shrink-0">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-950 text-white font-semibold">1</span>
              </div>

              <div>
                <h2 class="text- font-medium">Upload Encoded Image</h2>
                <p class="text-gray-400 text-sm">
                  Select an image that was previously encoded with a hidden message using Stegano.
                </p>
              </div>
            </div>
          </div>

          <div class=" p-2 rounded-lg shadow-md max-w-md w-full">
            <div class="flex items-start space-x-4">
              
              <div class="flex-shrink-0">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-950 text-white font-semibold">2</span>
              </div>

              <div>
                <h2 class="text- font-medium">LSB Analysis</h2>
                <p class="text-gray-400 text-sm">
                  Our algorithm extracts the least significant bits from each pixel to reconstruct the hidden message.
                </p>
              </div>
            </div>
          </div>

          <div class=" p-2 rounded-lg shadow-md max-w-md w-full">
            <div class="flex items-start space-x-4">
              
              <div class="flex-shrink-0">
                <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-950 text-white font-semibold">3</span>
              </div>

              <div>
                <h2 class="text- font-medium">Message Revealed</h2>
                <p class="text-gray-400 text-sm">
                  The hidden message is decoded and displayed, ready for you to read or copy.
                </p>
              </div>
            </div>
          </div>
    </div>

      </div>
    </div>
  );
}

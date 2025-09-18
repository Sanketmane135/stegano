"use client";

import React, { useState, useRef } from "react";

export default function SimpleStegano() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [secretMessage, setSecretMessage] = useState("");
  const [encodedUrl, setEncodedUrl] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const stringToBinary = (str) => {
    return str.split("").map((char) =>
        char.charCodeAt(0).toString(2).padStart(8, "0")
      )
      .join("");
  };

  const encodeMessage = () => {
    if (!image || !secretMessage.trim()) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const messageWithEnd = secretMessage + "###END###";
      const binaryMessage = stringToBinary(messageWithEnd);

      let messageIndex = 0;
      for (let i = 0; i < data.length && messageIndex < binaryMessage.length; i += 4) {
        for (let j = 0; j < 3 && messageIndex < binaryMessage.length; j++) {
          data[i + j] = (data[i + j] & 0xfe) | parseInt(binaryMessage[messageIndex], 10);
          messageIndex++;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setEncodedUrl(canvas.toDataURL());
    };
  };

  return (
    <div className="min-h-full flex  mb-20 flex-col items-center justify-center bg-[#0B0B0F] text-white p-10">
      <div className="text-center mb-12">
         <h1 className="text-4xl font-bold text-foreground mb-4">Hide Your Secret Message</h1>
      <p className="text-xl text-gray-500 max-w-2xl mx-auto">Upload multiple images and enter your secret message. We'll hide it using advanced steganography techniques.</p>
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="  flex p-2 flex-col gap-2 rounded-xl border border-[#151c2f] py-6 shadow-sm bg-card border-border/50 bg-[#0B0F19] ">
          <h2 className="flex gap-1"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>Upload Images</h2>
          <p className="text-gray-400">Select multiple PNG or JPEG images or drag and drop them here</p>
          
          <input  id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden"  required/>
           
      {/* Custom label styled as upload box */}
      <label
        htmlFor="fileInput"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 
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

          {preview && (
            <div className="w-full flex flex-col items-center"> 
              <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded shadow mb-4" />
            </div>
            )}
        </div>

        <div className="flex p-2 flex-col gap-1 rounded-xl border border-[#151c2f] py-6 shadow-sm bg-card border-border/50 bg-[#0B0F19] ">
          <h2 className="flex gap-1"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q97-30 162-118.5T718-480H480v-315l-240 90v207q0 7 2 18h238v316Z"/></svg>Hide your Secret</h2>
          <p className="text-gray-400">Enter the message you want to hide in the images</p>
          
          <textarea value={secretMessage} onChange={(e) => setSecretMessage(e.target.value)} placeholder="Enter secret message" className="w-full min-h-32 p-2 rounded mb-4 bg-transparent border border-[#151c2f] outline-none text-white  "/>
          <button onClick={encodeMessage} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">
            Encode Message
          </button>
           {encodedUrl && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="mb-2 font-semibold">Encoded Image:</h2>
          <img
            src={encodedUrl}
            alt="Encoded"
            className="w-64 h-64 object-cover rounded shadow mb-2"
          />
          <a
            href={encodedUrl}
            download="encoded.png"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Download Encoded Image
          </a>
        </div>
      )}
       </div>

      </div>

      {/* Preview */}
      

      {/* Message */}
      

      {/* Encoded Image
      {encodedUrl && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="mb-2 font-semibold">Encoded Image:</h2>
          <img
            src={encodedUrl}
            alt="Encoded"
            className="w-64 h-64 object-cover rounded shadow mb-2"
          />
          <a
            href={encodedUrl}
            download="encoded.png"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Download Encoded Image
          </a>
        </div>
      )} */}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}

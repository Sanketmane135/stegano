import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";



export const metadata = {
  title: "Stagsteganography - Advanced Image Steganography",
  description: "Advanced steganography for image encoding and decoding. Hide secret messages within images using cutting-edge cryptographic techniques.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Navbar/>
        <div className="mt-20">{children}</div>
        <Footer/>

      </body>
    </html>
  );
}

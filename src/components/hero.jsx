'use client'
import React from 'react'

import { useRouter } from 'next/navigation'

function Hero() {
  const router = useRouter();
  return (
   <section className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          Secure Your Secrets with{" "}
          <span className="text-pink-500">Stegano</span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-10">
          Advanced steganography for image encoding and decoding. Hide secret
          messages within images using cutting-edge cryptographic techniques.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/create')}
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white font-medium transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
            Hide Message
          </button>
          <a
            href="/view"
            className="px-6 py-3 border border-pink-600 hover:bg-blue-600/20 rounded-lg text-white font-medium transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Reveal Message
          </a>
        </div>
      </section>
  )
}

export default Hero
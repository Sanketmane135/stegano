import React from 'react'

function Ready() {
  return (
   <section class="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/95">

  <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
    Ready to Secure Your Messages?
  </h1>

  <p class="text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
    Start hiding your secrets in plain sight with military-grade steganography.
  </p>

  <div class="flex gap-4">
    
    <button  className=" flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow-lg transition" >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
      Encode Message
    </button>

    <button  className=" flex items-center gap-2 bg-[#0B0F19] border border-gray-700 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transitio" >
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
      Decode Message
    </button>
    
  </div>    
</section>

  )
}

export default Ready;
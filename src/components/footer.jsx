import React from 'react'

function Footer() {
  return (
    <footer class=" bg-[#0B0B0F] text-gray-400 py-10 px-6">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div>
      <div class="flex items-center gap-2 mb-4">
        <div class="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
          <span class="text-sm font-bold text-white">S</span>
        </div>
        <span class="font-semibold text-xl text-white">Stegano</span>
      </div>
      <p class="text-gray-400 text-sm">
        Hide your secrets in plain sight with secure, modern steganography.
      </p>
    </div>

   
    <div>
      <h3 class="text-white font-semibold mb-4">Quick Links</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-white transition">Home</a></li>
        <li><a href="#" class="hover:text-white transition">Encode Message</a></li>
        <li><a href="#" class="hover:text-white transition">Decode Message</a></li>
        <li><a href="#" class="hover:text-white transition">About</a></li>
      </ul>
    </div>

    
    <div>
      <h3 class="text-white font-semibold mb-4">Follow Us</h3>
      <div class="flex gap-4">
        <a href="#" class="hover:text-white transition">🌐</a>
        <a href="#" class="hover:text-white transition">🐦</a>
        <a href="#" class="hover:text-white transition">📘</a>
        <a href="#" class="hover:text-white transition">📷</a>
      </div>
    </div>
  </div>

 
  <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
    © 2025 Stegano. All rights reserved.
  </div>
</footer>

  )
}

export default Footer
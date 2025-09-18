'use client'
import React from 'react'
function Navbar() {

  return (
      <nav className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 md:pl-40 md:pr-40 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-xs font-bold">S</span>
          </div>
          <span className="font-semibold text-lg text-white">Stegano</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a href="/create" className="text-gray-200 hover:text-white transition">
            Create
          </a>
          <a href="/view" className="text-gray-200 hover:text-white transition">
            View
          </a>
        </div>
      </nav>

  )
}

export default Navbar
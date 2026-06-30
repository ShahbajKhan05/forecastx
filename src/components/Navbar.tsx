'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar wrapper - Mobile friendly */}
      <div className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50">
  {/* Logo aur Title ka container */}
  <div className="flex items-center gap-3">
    <img className="w-10 h-10" src="favicon.ico" alt="Logo" />
    <h1 className="text-lg md:text-xl font-bold tracking-tighter">FORECAST X</h1>
  </div>
  
  {/* MENU Button */}
  <button 
    onClick={() => setIsOpen(true)} 
    className="text-xs md:text-sm font-bold tracking-widest hover:opacity-50 transition"
  >
    MENU
  </button>
</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-100 flex flex-col items-center justify-center p-6"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-black font-bold text-sm z-101">CLOSE</button>
            
            {/* Mobile-friendly stack */}
            <nav className="text-center space-y-4 md:space-y-6 text-4xl md:text-8xl font-black text-black">
              {['Forecast X -  Shahbaj'].map((item) => (
                <a key={item} href="#" className="block hover:text-neutral-500 transition text-4xl md:text-8xl">{item}</a>
              ))}
            </nav>

            <div className="absolute bottom-8 flex gap-6 text-black">
              <a href="https://github.com/ShahbajKhan05" className="hover:scale-110 transition"><FaGithub size={24} /></a>
              <a href="https://www.linkedin.com/in/shahbaj-khan-274613226/" className="hover:scale-110 transition"><FaLinkedin size={24} /></a>
              <a href="https://www.instagram.com/qr/" className="hover:scale-110 transition"><FaInstagram size={24} /></a>
              <a href="https://wa.me/918349813831" className="hover:scale-110 transition"><FaWhatsapp size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
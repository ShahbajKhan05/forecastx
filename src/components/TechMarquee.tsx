'use client';
import { motion } from 'framer-motion';
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiThreedotjs, SiReact, SiTypescript } from 'react-icons/si';

const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#FFFFFF' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
];

export default function TechMarquee() {
  return (
    <div className="w-full py-16 bg-black overflow-hidden">
      <h2 className="text-center text-zinc-500 text-sm uppercase tracking-[0.3em] mb-12 font-medium">
        Tech Stack Utilized
      </h2>
      
      <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex gap-20 pr-20"
        >
          {[...techStack, ...techStack].map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-pointer"
            >
              <tech.icon 
                size={36} 
                style={{ color: tech.color }} 
                className="transition-transform duration-300 group-hover:scale-125"
              />
              <span className="text-xl font-bold text-zinc-300 uppercase tracking-tight group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
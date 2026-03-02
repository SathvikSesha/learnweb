import { motion, useScroll } from "framer-motion";
import CountUp from "react-countup";

export default function ProgressCard({ value = 798, total = 999 }) {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = value / total;
  const strokeDashoffset = circumference - progress * circumference;

  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* 🔵 Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,200,0.08)] w-[300px]"
      >
        <h2 className="text-lg text-gray-300 mb-4">Progress</h2>

        <div className="relative flex items-center justify-center">
          <svg height={radius * 2} width={radius * 2}>
            {/* Background Circle */}
            <circle
              stroke="#1f2937"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            {/* Animated Progress Circle */}
            <motion.circle
              stroke="url(#grad)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            <defs>
              <linearGradient id="grad">
                <stop offset="0%" stopColor="#00f5a0" />
                <stop offset="100%" stopColor="#00d9f5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Text */}
          <div className="absolute text-center">
            <div className="text-3xl font-bold text-white">
              <CountUp end={value} duration={2} />
            </div>
            <div className="text-gray-400 text-sm">of {total}</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

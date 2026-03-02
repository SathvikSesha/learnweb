import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const data = [
  { day: "Mon", amount: 200 },
  { day: "Tue", amount: 450 },
  { day: "Wed", amount: 300 },
  { day: "Thu", amount: 600 },
  { day: "Fri", amount: 150 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl shadow-xl">
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-cyan-400 font-semibold text-lg">
          ₹ {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function ExpensesBarChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,200,0.08)] flex-1"
    >
      <h2 className="text-lg text-gray-300 mb-4">Monthly Expenses</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />

          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f5a0" />
              <stop offset="100%" stopColor="#00d9f5" />
            </linearGradient>

            <linearGradient id="barHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  index === activeIndex ? "url(#barHover)" : "url(#barGradient)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

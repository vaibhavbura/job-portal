import { motion } from 'framer-motion';
import { FiBriefcase, FiUsers, FiGlobe, FiAward } from 'react-icons/fi';

const stats = [
  { icon: <FiBriefcase />, value: "50K+", label: "Job Positions" },
  { icon: <FiUsers />, value: "10K+", label: "Companies" },
  { icon: <FiGlobe />, value: "150+", label: "Countries" },
  { icon: <FiAward />, value: "1M+", label: "Success Stories" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg text-blue-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { FiSearch, FiSend, FiUserCheck } from 'react-icons/fi';

const steps = [
  {
    icon: <FiSearch />,
    title: "Search Jobs",
    description: "Use our advanced filters to find positions matching your skills and preferences"
  },
  {
    icon: <FiSend />,
    title: "Apply Easily",
    description: "Submit your application with just a few clicks using our smart application system"
  },
  {
    icon: <FiUserCheck />,
    title: "Get Hired",
    description: "Connect directly with employers and land your dream job faster"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to your next career move
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-blue-50 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative p-8 h-full">
                <div className="text-blue-600 text-4xl mb-6">{step.icon}</div>
                <div className="flex items-center mb-4">
                  <div className="text-2xl font-bold text-blue-600 mr-3">0{index + 1}</div>
                  <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
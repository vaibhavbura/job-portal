import { motion } from 'framer-motion';
import { FiCode, FiBriefcase, FiDollarSign, FiGlobe, FiHeart, FiTool } from 'react-icons/fi';

const categories = [
  { icon: <FiCode />, title: "Tech & IT", jobs: "2.3k" },
  { icon: <FiBriefcase />, title: "Business", jobs: "1.8k" },
  { icon: <FiDollarSign />, title: "Finance", jobs: "1.2k" },
  { icon: <FiGlobe />, title: "Marketing", jobs: "950" },
  { icon: <FiHeart />, title: "Healthcare", jobs: "2.1k" },
  { icon: <FiTool />, title: "Engineering", jobs: "1.5k" },
];

export default function JobCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Popular Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities across various industries and find your perfect match
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="p-4 bg-blue-100 rounded-lg text-blue-600 text-2xl">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.jobs}+ Open Positions</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
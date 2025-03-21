import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiSearch } from 'react-icons/fi';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Find Your
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-blue-100 sm:text-xl md:mt-5 md:max-w-3xl">
            Discover thousands of job opportunities from top companies worldwide.
            Grow your career with us.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <div className="flex items-center">
              <FiBriefcase className="h-8 w-8 text-blue-300" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="mt-1 text-blue-100">Job Positions</p>
              </div>
            </div>
          </div>
          {/* Repeat similar blocks for other stats */}
        </div>
      </div>
    </div>
  );
}
import React from 'react'
import { motion } from 'framer-motion'
import { AnalyticsData } from '../types/analytics'
import { BeakerIcon, CpuChipIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline'

interface DashboardProps {
  data: AnalyticsData[]
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const physicsData = data.filter(item => item.dataType === 'physics')
  const csData = data.filter(item => item.dataType === 'computer_science')

  const stats = [
    {
      name: 'Total Datasets',
      value: data.length,
      icon: ChartBarIcon,
      color: 'text-secondary-600'
    },
    {
      name: 'Physics Experiments',
      value: physicsData.length,
      icon: BeakerIcon,
      color: 'text-blue-600'
    },
    {
      name: 'CS Analytics',
      value: csData.length,
      icon: CpuChipIcon,
      color: 'text-success-500'
    },
    {
      name: 'Last Updated',
      value: data.length > 0 ? new Date(Math.max(...data.map(d => d.updatedAt.getTime()))).toLocaleDateString() : 'N/A',
      icon: ClockIcon,
      color: 'text-accent-600'
    }
  ]

  return (
    <div className="w-full">
      {/* Title Section */}
      <motion.div 
        className="bg-secondary-900 text-white py-16 px-6 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Analytics Dashboard
        </motion.h1>
        <motion.p 
          className="text-xl opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Explore comprehensive data visualizations for physics experiments and computer science analytics
        </motion.p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="bg-white py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.name} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className="flex items-center">
                <motion.div 
                  className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </motion.div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <motion.p 
                    className="text-2xl font-semibold text-gray-900"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Datasets */}
      <motion.div 
        className="bg-white py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Recent Datasets
          </motion.h3>
          <div className="space-y-4">
            {data.slice(0, 5).map((item, index) => (
              <motion.div 
                key={item.id} 
                className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
                whileHover={{ x: 4, scale: 1.01 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.dataType === 'physics' ? (
                      <BeakerIcon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <CpuChipIcon className="h-5 w-5 text-success-500" />
                    )}
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {item.createdAt.toLocaleDateString()}
                  </p>
                  <motion.span 
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.dataType === 'physics' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-success-100 text-success-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.dataType === 'physics' ? 'Physics' : 'Computer Science'}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard

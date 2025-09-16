import React from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts'
import { AnalyticsData, AnalyticsType, PhysicsData } from '../types/analytics'

interface DataVisualizationProps {
  data: AnalyticsData[]
  type: AnalyticsType
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data, type }) => {
  const renderPhysicsCharts = (item: AnalyticsData) => {
    const physicsData = item.data as PhysicsData
    
    if (physicsData.measurements) {
      const chartData = physicsData.measurements.map((measurement, index) => ({
        index: index + 1,
        energy: measurement.energy,
        time: measurement.time
      }))

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            <motion.h4 
              className="text-lg font-semibold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Energy vs Time
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" label={{ value: `Time (${physicsData.units?.time || 'ns'})`, position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Energy (${physicsData.units?.energy || 'eV'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="#24303e" strokeWidth={2} dot={{ fill: '#ee5757' }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <motion.h4 
              className="text-lg font-semibold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Energy Distribution
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label={{ value: 'Measurement #', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Energy (${physicsData.units?.energy || 'eV'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energy" fill="#24303e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    if (physicsData.collisions) {
      const chartData = physicsData.collisions.map((collision, index) => ({
        index: index + 1,
        momentum: collision.momentum,
        angle: collision.angle
      }))

      return (
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -2 }}
        >
          <motion.h4 
            className="text-lg font-semibold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Particle Collision Analysis
          </motion.h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="momentum" label={{ value: 'Momentum (GeV/c)', position: 'insideBottom', offset: -10 }} />
                <YAxis dataKey="angle" label={{ value: 'Angle (degrees)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Scatter dataKey="angle" fill="#ee5757" />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )
    }

    return null
  }

  const renderCSCharts = (item: AnalyticsData) => {
    const csData = item.data as any // Use any to handle both camelCase and snake_case
    
    if (csData.algorithms && csData.algorithms.length > 0) {
      // Handle both camelCase and snake_case from backend
      const firstAlgo = csData.algorithms[0]
      const inputSizes = firstAlgo.inputSize || firstAlgo.input_size
      
      if (!inputSizes || inputSizes.length === 0) {
        return <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center"><p className="text-gray-500">No algorithm data available</p></div>
      }

      const chartData = inputSizes.map((size: number, index: number) => {
        const dataPoint: any = { inputSize: size }
        csData.algorithms?.forEach((algo: any) => {
          const runtime = algo.runtime || []
          if (runtime[index] !== undefined) {
            dataPoint[algo.name] = runtime[index]
          }
        })
        return dataPoint
      })

      return (
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -2 }}
        >
          <motion.h4 
            className="text-lg font-semibold mb-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Algorithm Performance Comparison
          </motion.h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="inputSize" label={{ value: 'Input Size', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Runtime (seconds)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {csData.algorithms.map((algo: any, index: number) => (
                  <Line 
                    key={algo.name}
                    type="monotone" 
                    dataKey={algo.name} 
                    stroke={index === 0 ? '#24303e' : index === 1 ? '#5ed2b9' : '#ee5757'} 
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )
    }

    if (csData.metrics && csData.metrics.length > 0) {
      const chartData = csData.metrics.map((metric: any, index: number) => ({
        time: new Date(metric.timestamp).toLocaleTimeString(),
        bandwidth: metric.bandwidth,
        latency: metric.latency
      }))

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            <motion.h4 
              className="text-lg font-semibold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Network Bandwidth
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: `Bandwidth (${csData.units?.bandwidth || 'Mbps'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bandwidth" fill="#24303e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <motion.h4 
              className="text-lg font-semibold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Network Latency
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: `Latency (${csData.units?.latency || 'ms'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="latency" stroke="#ee5757" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    return null
  }

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
          {type === 'physics' ? 'Physics Analytics' : 'Computer Science Analytics'}
        </motion.h1>
        <motion.p 
          className="text-xl opacity-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {type === 'physics' 
            ? 'Explore experimental physics data and quantum measurements'
            : 'Analyze algorithm performance and system metrics'
          }
        </motion.p>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="bg-white py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {data.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-gray-500 text-lg">No data available for {type === 'physics' ? 'physics' : 'computer science'} analytics.</p>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {data.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                >
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-lg mb-2">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      Created: {item.createdAt.toLocaleDateString()} | 
                      Updated: {item.updatedAt.toLocaleDateString()}
                    </p>
                  </motion.div>
                  
                  <div className="bg-white">
                    {type === 'physics' ? renderPhysicsCharts(item) : renderCSCharts(item)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default DataVisualization

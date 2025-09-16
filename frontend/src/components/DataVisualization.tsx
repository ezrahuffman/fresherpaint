import React from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts'
import { AnalyticsData, AnalyticsType, PhysicsData } from '../types/analytics'

interface DataVisualizationProps {
  data: AnalyticsData[]
  type: AnalyticsType
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ data, type }) => {
  console.log('DataVisualization received data:', data, 'type:', type) // Debug log
  
  const renderPhysicsCharts = (item: AnalyticsData) => {
    console.log('Rendering physics charts for item:', item) // Debug log
    const physicsData = item.data as PhysicsData
    
    // Handle Higgs boson decay data
    if (physicsData.measurements && physicsData.measurements.some(m => m.invariant_mass)) {
      const chartData = physicsData.measurements.map((measurement, index) => ({
        index: index + 1,
        invariant_mass: measurement.invariant_mass,
        photon1_energy: measurement.photon1_energy,
        photon2_energy: measurement.photon2_energy,
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
              Higgs Boson Invariant Mass Distribution
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label={{ value: 'Event #', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Invariant Mass (${physicsData.units?.energy || 'GeV'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name) => [value, name === 'invariant_mass' ? 'Invariant Mass (GeV)' : name]} />
                  <Legend />
                  <Bar dataKey="invariant_mass" fill="#1E3A8A" />
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
              Photon Energy Distribution
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label={{ value: 'Event #', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Energy (${physicsData.units?.energy || 'GeV'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="photon1_energy" stroke="#1E3A8A" strokeWidth={2} name="Photon 1" />
                  <Line type="monotone" dataKey="photon2_energy" stroke="#DC2626" strokeWidth={2} name="Photon 2" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
      )
    }

    // Handle quantum entanglement data
    if (physicsData.quantum_measurements) {
      const chartData = physicsData.quantum_measurements.map((measurement) => ({
        angle: measurement.angle,
        correlation: measurement.correlation,
        measurement_count: measurement.measurement_count,
        error: measurement.statistical_error
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
            Quantum Entanglement Correlation vs Measurement Angle
            {physicsData.bell_parameter && (
              <div className="text-sm text-gray-600 mt-2">
                Bell Parameter S = {physicsData.bell_parameter} (violates Bell inequality: S &gt; 2)
              </div>
            )}
          </motion.h4>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="angle" label={{ value: 'Angle (degrees)', position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: 'Correlation', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="correlation" stroke="#1E3A8A" strokeWidth={3} dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )
    }

    // Handle regular measurements (energy vs time)
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
                  <Line type="monotone" dataKey="energy" stroke="#1E3A8A" strokeWidth={2} dot={{ fill: '#DC2626' }} />
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
                  <Bar dataKey="energy" fill="#1E3A8A" />
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
    
    // Handle machine learning training data
    if (csData.models && csData.models.length > 0) {
      const model = csData.models[0] // Show first model
      const chartData = model.epochs.map((epoch: number, index: number) => ({
        epoch: epoch,
        accuracy: model.accuracy[index],
        loss: model.loss[index]
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
              {model.name} Training Accuracy
              <div className="text-sm text-gray-600 mt-1">
                Parameters: {model.parameters} | Time/Epoch: {model.training_time_per_epoch}
              </div>
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Accuracy', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [typeof value === 'number' ? value.toFixed(3) : value, 'Accuracy']} />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#1E3A8A" strokeWidth={2} dot={{ fill: '#DC2626', r: 2 }} />
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
              Training Loss
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [typeof value === 'number' ? value.toFixed(3) : value, 'Loss']} />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="#DC2626" strokeWidth={2} dot={{ fill: '#1E3A8A', r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        </div>
      )
    }
    
    // Handle algorithm performance data
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

      const colors = ['#1E3A8A', '#DC2626', '#059669', '#7C3AED']

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
            {csData.test_environment && (
              <div className="text-sm text-gray-600 mt-2">
                {csData.test_environment.cpu} | {csData.test_environment.memory} | {csData.test_environment.compiler} {csData.test_environment.optimization}
              </div>
            )}
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
                    stroke={colors[index % colors.length]} 
                    strokeWidth={2}
                    name={`${algo.name} (${algo.complexity || 'Unknown'})`}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )
    }

    if (csData.metrics && csData.metrics.length > 0) {
      const chartData = csData.metrics.map((metric: any) => ({
        time: new Date(metric.timestamp).toLocaleTimeString(),
        hour: new Date(metric.timestamp).getHours(),
        bandwidth: metric.bandwidth,
        latency: metric.latency,
        packet_loss: metric.packet_loss,
        signal_strength: metric.signal_strength,
        user_count: metric.user_count
      }))

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
              5G Network Bandwidth (24h)
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Bandwidth (${csData.units?.bandwidth || 'Mbps'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value, name) => [value, name === 'bandwidth' ? 'Bandwidth (Mbps)' : name]} />
                  <Legend />
                  <Line type="monotone" dataKey="bandwidth" stroke="#1E3A8A" strokeWidth={3} dot={{ fill: '#DC2626', r: 3 }} />
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
              Network Latency & Packet Loss
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: `Latency (${csData.units?.latency || 'ms'})`, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="latency" stroke="#DC2626" strokeWidth={2} name="Latency (ms)" />
                  <Line type="monotone" dataKey="packet_loss" stroke="#059669" strokeWidth={2} name="Packet Loss (%)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <motion.h4 
              className="text-lg font-semibold mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Signal Strength & User Load
            </motion.h4>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }} />
                  <YAxis label={{ value: 'Signal Strength (dBm) / Users', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="signal_strength" stroke="#7C3AED" strokeWidth={2} name="Signal Strength (dBm)" />
                  <Line type="monotone" dataKey="user_count" stroke="#F59E0B" strokeWidth={2} name="Active Users" />
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

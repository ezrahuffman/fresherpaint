import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChartBarIcon, BeakerIcon, CpuChipIcon, ChevronDownIcon, UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  activeTab: 'dashboard' | 'physics' | 'cs' | 'about-me' | 'about-site'
  onTabChange: (tab: 'dashboard' | 'physics' | 'cs' | 'about-me' | 'about-site') => void
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [analyticsDropdownOpen, setAnalyticsDropdownOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)


  return (
    <motion.header 
      className="bg-secondary-900"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-white cursor-default">
              FresherPaint
            </h1>
          </motion.div>
          
          <nav className="flex space-x-8 ml-8">
            {/* Analytics Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAnalyticsDropdownOpen(true)}
              onMouseLeave={() => setAnalyticsDropdownOpen(false)}
            >
              <motion.button
                className={`flex items-center space-x-2 text-sm font-medium transition-colors text-white hover:text-accent-600`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChartBarIcon className="h-5 w-5" />
                <span>Analytics</span>
                <motion.div
                  animate={{ rotate: analyticsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {analyticsDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 pt-1 w-48 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                      <div className="py-1">
                        <motion.button
                          onClick={() => {
                            onTabChange('dashboard')
                            setAnalyticsDropdownOpen(false)
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                            activeTab === 'dashboard'
                              ? 'bg-secondary-100 text-secondary-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <ChartBarIcon className="h-4 w-4" />
                          <span>Dashboard</span>
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            onTabChange('physics')
                            setAnalyticsDropdownOpen(false)
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                            activeTab === 'physics'
                              ? 'bg-secondary-100 text-secondary-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <BeakerIcon className="h-4 w-4" />
                          <span>Physics</span>
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            onTabChange('cs')
                            setAnalyticsDropdownOpen(false)
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                            activeTab === 'cs'
                              ? 'bg-secondary-100 text-secondary-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <CpuChipIcon className="h-4 w-4" />
                          <span>Computer Science</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <motion.button
                className={`flex items-center space-x-2 text-sm font-medium transition-colors text-white hover:text-accent-600`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <InformationCircleIcon className="h-5 w-5" />
                <span>About</span>
                <motion.div
                  animate={{ rotate: aboutDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 pt-1 w-48 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                      <div className="py-1">
                        <motion.button
                          onClick={() => {
                            onTabChange('about-me')
                            setAboutDropdownOpen(false)
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                            activeTab === 'about-me'
                              ? 'bg-secondary-100 text-secondary-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <UserIcon className="h-4 w-4" />
                          <span>About Me</span>
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            onTabChange('about-site')
                            setAboutDropdownOpen(false)
                          }}
                          className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                            activeTab === 'about-site'
                              ? 'bg-secondary-100 text-secondary-900'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.15 }}
                        >
                          <InformationCircleIcon className="h-4 w-4" />
                          <span>About Site</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

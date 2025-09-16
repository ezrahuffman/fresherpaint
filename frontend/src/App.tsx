import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import DataVisualization from './components/DataVisualization'
import LoginPrompt from './components/LoginPrompt'
import AboutMe from './components/AboutMe'
import AboutSite from './components/AboutSite'
import { AnalyticsData } from './types/analytics'
import { buildApiUrl } from './config/api'

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'physics' | 'cs' | 'about-me' | 'about-site'>(() => {
    // Check localStorage for saved tab preference
    const savedTab = localStorage.getItem('fresherpaint_active_tab')
    if (savedTab && ['dashboard', 'physics', 'cs', 'about-me', 'about-site'].includes(savedTab)) {
      return savedTab as 'dashboard' | 'physics' | 'cs' | 'about-me' | 'about-site'
    }
    return 'dashboard'
  })
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user has a valid JWT token
    const savedAuth = localStorage.getItem('fresherpaint_auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        // Check if token exists and hasn't expired
        const now = new Date().getTime() / 1000 // Convert to seconds
        if (authData.token && authData.expiresAt && now < authData.expiresAt) {
          return true
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
        localStorage.removeItem('fresherpaint_auth')
      }
    }
    return false
  })
  const [loginError, setLoginError] = useState('')

  const handleLogin = async (password: string) => {
    try {
      setLoginError('')
      const response = await fetch(buildApiUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const result = await response.json()

      if (result.success && result.data.token) {
        setIsAuthenticated(true)
        // Save JWT token to localStorage
        localStorage.setItem('fresherpaint_auth', JSON.stringify({
          token: result.data.token,
          expiresAt: result.data.expires_at,
          timestamp: new Date().getTime()
        }))
      } else {
        setLoginError(result.error || 'Authentication failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Network error. Please check your connection and try again.')
    }
  }

  const handleTabChange = (tab: 'dashboard' | 'physics' | 'cs' | 'about-me' | 'about-site') => {
    setActiveTab(tab)
    // Save tab preference to localStorage
    localStorage.setItem('fresherpaint_active_tab', tab)
  }

  useEffect(() => {
    // Only fetch data if authenticated
    if (!isAuthenticated) return
    
    // Fetch analytics data from backend with authentication
    const fetchData = async () => {
      try {
        const savedAuth = localStorage.getItem('fresherpaint_auth')
        if (!savedAuth) {
          setIsAuthenticated(false)
          return
        }

        const authData = JSON.parse(savedAuth)
        const response = await fetch(buildApiUrl('/analytics'), {
          headers: {
            'Authorization': `Bearer ${authData.token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('fresherpaint_auth')
          setIsAuthenticated(false)
          return
        }

        const result = await response.json()
        
        if (result.success) {
          console.log('Raw API data:', result.data) // Debug log
          // Convert date strings to Date objects and normalize dataType
          const processedData = result.data.map((item: any) => {
            console.log('Processing item:', item) // Debug log
            return {
              ...item,
              createdAt: new Date(item.CreatedAt || item.created_at || item.createdAt),
              updatedAt: new Date(item.UpdatedAt || item.updated_at || item.updatedAt),
              dataType: item.DataType || item.data_type || item.dataType
            }
          })
          console.log('Processed data:', processedData) // Debug log
          setAnalyticsData(processedData)
        } else {
          console.error('API error:', result.error)
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated])

  const filteredData = activeTab === 'dashboard' 
    ? analyticsData 
    : analyticsData.filter(item => {
        console.log('Filtering item:', item, 'activeTab:', activeTab, 'dataType:', item.dataType) // Debug log
        if (activeTab === 'cs') return item.dataType === 'computer_science'
        return item.dataType === activeTab
      })

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return <LoginPrompt onLogin={handleLogin} error={loginError} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="w-full mx-auto">
        {loading ? (
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="rounded-full h-32 w-32 border-b-2 border-secondary-900"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {activeTab === 'dashboard' && <Dashboard data={analyticsData} />}
              {(activeTab === 'physics' || activeTab === 'cs') && (
                <DataVisualization 
                  data={filteredData} 
                  type={activeTab === 'cs' ? 'computer_science' : 'physics'}
                />
              )}
              {activeTab === 'about-me' && <AboutMe />}
              {activeTab === 'about-site' && <AboutSite />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  )
}

export default App

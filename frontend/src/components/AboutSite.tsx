import React from 'react'
import { ChartBarIcon, BeakerIcon, CpuChipIcon, CircleStackIcon } from '@heroicons/react/24/outline'

const AboutSite: React.FC = () => {
  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="bg-secondary-900 text-white py-16 px-6 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">About FresherPaint</h1>
        <p className="text-xl opacity-90">Modern analytics platform for physics and computer science data visualization</p>
      </div>

      {/* What is FresherPaint Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">What is FresherPaint?</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            FresherPaint is a modern analytics platform designed specifically for physics and computer 
            science data visualization. Built with cutting-edge web technologies, it provides researchers 
            and data enthusiasts with powerful tools to explore, analyze, and visualize complex datasets.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            The platform bridges the gap between raw scientific data and meaningful insights through 
            interactive charts, real-time analytics, and intuitive user interfaces.
          </p>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-secondary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Dashboard</h3>
                <p className="text-gray-600">Real-time analytics overview with customizable widgets</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
              <BeakerIcon className="h-8 w-8 text-secondary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Physics Analytics</h3>
                <p className="text-gray-600">Quantum measurements and particle collision visualizations</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
              <CpuChipIcon className="h-8 w-8 text-secondary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">CS Analytics</h3>
                <p className="text-gray-600">Algorithm performance and network metrics analysis</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
              <CircleStackIcon className="h-8 w-8 text-secondary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Management</h3>
                <p className="text-gray-600">PostgreSQL backend with JSONB for flexible data storage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Frontend</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>React 18 with TypeScript</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Vite for fast development</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Tailwind CSS for styling</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Recharts for data visualization</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Heroicons for UI icons</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Backend</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Go HTTP server</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>PostgreSQL database</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>CORS middleware</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>RESTful API design</span>
                </li>
                <li className="flex items-center">
                  <span className="text-secondary-900 mr-2">•</span>
                  <span>Database migrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Design Philosophy Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">Design Philosophy</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            FresherPaint follows a clean, modern design philosophy with a focus on usability and accessibility. 
            The color scheme uses white as the primary color, dark blue (#1E3A8A) as secondary, and red (#DC2626) 
            as an accent color to create a professional yet approachable interface.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Every component is designed with responsive principles in mind, ensuring a seamless experience 
            across desktop, tablet, and mobile devices.
          </p>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">Getting Started</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Navigate through the Analytics sections to explore different types of data visualizations. 
            The Dashboard provides an overview of all data types, while the Physics and Computer Science 
            sections offer specialized views tailored to each domain's unique requirements.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutSite

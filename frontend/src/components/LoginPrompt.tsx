import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/24/outline'

interface LoginPromptProps {
  onLogin: (password: string) => void
  error?: string
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return
    
    setIsSubmitting(true) 
    onLogin(password)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-secondary-900 p-3 rounded-full">
            <LockClosedIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          FresherPaint
        </h2>
        <p className="mt-2 text-center text-lg text-secondary-900 font-medium">
          Welcome Freshpaint team!
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Please enter the password from my resume to access the analytics platform. Please reach out to me if you have any questions or issues.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-secondary-900 focus:border-secondary-900 sm:text-sm"
                  placeholder="Enter password"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-accent-500">{error}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !password.trim()}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-900 hover:bg-secondary-800 hover:shadow-lg hover:shadow-secondary-900/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none transition-all duration-300 transform"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Access Analytics'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure Access Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPrompt

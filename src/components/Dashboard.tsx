import { Outlet } from '@tanstack/react-router'
import Sidebar from './Sidebar'

interface DashboardProps {
  userName?: string
}

function Dashboard({ userName = 'Admin' }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Welcome back, {userName}</div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center uppercase">
                <span className="text-white text-sm font-medium">
                  {userName.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

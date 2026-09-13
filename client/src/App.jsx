// client/src/App.jsx
import { useState } from 'react'
import ChatContainer from './components/chat/ChatContainer'
import Sidebar from './components/sidebar/Sidebar'
import ThemeToggle from './components/ui/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="app">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'is-open' : ''}`}>
        <Sidebar />
      </div>

      <div className="app-content">
        <header className="app-header">
          <div className="app-brand">
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen((v) => !v)}
              aria-label="Toggle chat history"
            >
              ☰
            </button>
            <span className="app-title">zoto paro toto koro .. chat</span>
            <span className="app-badge">3.5 Flash</span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <main className="app-main">
          <ChatContainer />
        </main>
      </div>
    </div>
  )
}

export default App
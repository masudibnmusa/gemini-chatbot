import ChatContainer from './components/chat/ChatContainer'
import ThemeToggle from './components/ui/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <span className="app-title">Gemini Chatbot</span>
          <span className="app-badge">3.5 Flash</span>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="app-main">
        <ChatContainer />
      </main>
    </div>
  )
}

export default App
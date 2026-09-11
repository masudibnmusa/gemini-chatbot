// App.jsx
import ChatContainer from './components/chat/ChatContainer'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Gemini Chatbot</h1>
      </header>

      <main className="app-main">
        <ChatContainer />
      </main>
    </div>
  )
}

export default App
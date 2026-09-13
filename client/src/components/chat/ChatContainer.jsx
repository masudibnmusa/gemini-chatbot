// client/src/components/chat/ChatContainer.jsx
import { useChatStore } from '../../store/chatStore'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import './ChatContainer.css'

const EMPTY_MESSAGES = []

function ChatContainer() {
  const messages = useChatStore(
    (state) => state.conversations[state.activeConversationId]?.messages ?? EMPTY_MESSAGES
  )

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        <div className="chat-empty">
          <h2 className="chat-empty-title">Start a conversation</h2>
          <p className="chat-empty-subtitle">Ask me anything — I'm powered by Gemini.</p>
        </div>
      ) : (
        <MessageList />
      )}
      <ChatInput />
    </div>
  )
}

export default ChatContainer
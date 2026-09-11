// components/chat/MessageBubble.jsx
import MarkdownRenderer from '../ui/MarkdownRenderer'
import { formatTimestamp } from '../../utils/formatters'
import './MessageBubble.css'

function MessageBubble({ message }) {
  const { role, content, timestamp } = message
  const isUser = role === 'user'

  return (
    <div className={`message-bubble-row ${isUser ? 'is-user' : 'is-assistant'}`}>
      <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
        {isUser ? (
          <p className="message-text">{content}</p>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
      {timestamp && (
        <span className="message-timestamp">{formatTimestamp(timestamp)}</span>
      )}
    </div>
  )
}

export default MessageBubble
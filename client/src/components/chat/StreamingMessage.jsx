// components/chat/StreamingMessage.jsx
import MarkdownRenderer from '../ui/MarkdownRenderer'
import './StreamingMessage.css'

function StreamingMessage({ text }) {
  return (
    <div className="message-bubble-row is-assistant">
      <div className="message-bubble assistant streaming">
        <MarkdownRenderer content={text} />
        <span className="streaming-cursor" />
      </div>
    </div>
  )
}

export default StreamingMessage
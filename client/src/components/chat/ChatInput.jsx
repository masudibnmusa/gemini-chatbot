// components/chat/ChatInput.jsx
import { useState, useRef } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useAutoResize } from '../../hooks/useAutoResize'
import { useChatStream } from '../../hooks/useChatStream'
import Button from '../ui/Button'
import './ChatInput.css'

function ChatInput() {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)
  useAutoResize(textareaRef, input)

  const { sendMessage } = useChatStream()
  const isStreaming = useChatStore((state) => state.isStreaming)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return

    sendMessage(trimmed)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className="chat-input-textarea"
        placeholder="Message Gemini..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        disabled={isStreaming}
      />
      <Button
        type="submit"
        disabled={!input.trim() || isStreaming}
        variant="primary"
      >
        {isStreaming ? '...' : 'Send'}
      </Button>
    </form>
  )
}

export default ChatInput
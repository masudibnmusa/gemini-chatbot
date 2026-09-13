// client/src/components/chat/MessageList.jsx
import { useRef } from 'react'
import { useChatStore } from '../../store/chatStore'
import { useScrollToBottom } from '../../hooks/useScrollToBottom'
import MessageBubble from './MessageBubble'
import StreamingMessage from './StreamingMessage'
import './MessageList.css'

const EMPTY_MESSAGES = []

function MessageList() {
  const messages = useChatStore(
    (state) => state.conversations[state.activeConversationId]?.messages ?? EMPTY_MESSAGES
  )
  const isStreaming = useChatStore((state) => state.isStreaming)
  const streamingText = useChatStore((state) => state.streamingText)

  const containerRef = useRef(null)
  useScrollToBottom(containerRef, [messages, streamingText])

  return (
    <div className="message-list" ref={containerRef}>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {isStreaming && <StreamingMessage text={streamingText} />}
    </div>
  )
}

export default MessageList
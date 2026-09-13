// client/src/components/sidebar/Sidebar.jsx
import { useChatStore } from '../../store/chatStore'
import Button from '../ui/Button'
import ConversationItem from './ConversationItem'
import './Sidebar.css'

function Sidebar() {
  const conversationOrder = useChatStore((state) => state.conversationOrder)
  const conversations = useChatStore((state) => state.conversations)
  const activeConversationId = useChatStore((state) => state.activeConversationId)
  const createConversation = useChatStore((state) => state.createConversation)
  const setActiveConversation = useChatStore((state) => state.setActiveConversation)
  const deleteConversation = useChatStore((state) => state.deleteConversation)
  const isStreaming = useChatStore((state) => state.isStreaming)

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Button variant="primary" onClick={() => createConversation()} disabled={isStreaming}>
          + New chat
        </Button>
      </div>

      <nav className="sidebar-list">
        {conversationOrder.length === 0 ? (
          <p className="sidebar-empty">No conversations yet</p>
        ) : (
          conversationOrder.map((id) => (
            <ConversationItem
              key={id}
              conversation={conversations[id]}
              isActive={id === activeConversationId}
              onSelect={() => setActiveConversation(id)}
              onDelete={() => deleteConversation(id)}
            />
          ))
        )}
      </nav>
    </aside>
  )
}

export default Sidebar
// client/src/components/sidebar/ConversationItem.jsx
import './ConversationItem.css'

function ConversationItem({ conversation, isActive, onSelect, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      className={`conversation-item ${isActive ? 'is-active' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <span className="conversation-title">{conversation.title}</span>
      <button
        className="conversation-delete"
        onClick={handleDelete}
        aria-label="Delete conversation"
        title="Delete conversation"
      >
        ×
      </button>
    </div>
  )
}

export default ConversationItem
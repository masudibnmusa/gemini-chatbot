// client/src/store/chatStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId, truncateText } from '../utils/formatters'
import { MESSAGE_ROLES } from '../utils/constants'

function createEmptyConversation() {
  const id = generateId()
  return {
    id,
    title: 'New chat',
    messages: [],
    createdAt: Date.now(),
  }
}

export const useChatStore = create(
  persist(
    (set, get) => ({
      conversations: {},
      conversationOrder: [],
      activeConversationId: null,

      isStreaming: false,
      streamingText: '',
      error: null,

      ensureActiveConversation: () => {
        const state = get()
        if (state.activeConversationId && state.conversations[state.activeConversationId]) {
          return state.activeConversationId
        }
        const conv = createEmptyConversation()
        set((s) => ({
          conversations: { ...s.conversations, [conv.id]: conv },
          conversationOrder: [conv.id, ...s.conversationOrder],
          activeConversationId: conv.id,
        }))
        return conv.id
      },

      createConversation: () => {
        const conv = createEmptyConversation()
        set((s) => ({
          conversations: { ...s.conversations, [conv.id]: conv },
          conversationOrder: [conv.id, ...s.conversationOrder],
          activeConversationId: conv.id,
          streamingText: '',
          isStreaming: false,
          error: null,
        }))
        return conv.id
      },

      setActiveConversation: (id) => {
        set({ activeConversationId: id, streamingText: '', isStreaming: false, error: null })
      },

      deleteConversation: (id) => {
        set((s) => {
          const { [id]: _, ...rest } = s.conversations
          const order = s.conversationOrder.filter((cid) => cid !== id)
          let activeId = s.activeConversationId
          if (activeId === id) {
            activeId = order[0] || null
          }
          return { conversations: rest, conversationOrder: order, activeConversationId: activeId }
        })
      },

      addMessage: (role, content) => {
        const id = get().ensureActiveConversation()
        const message = { id: generateId(), role, content, timestamp: Date.now() }

        set((s) => {
          const conv = s.conversations[id]
          const isFirstUserMessage = role === MESSAGE_ROLES.USER && conv.messages.length === 0
          const updatedConv = {
            ...conv,
            messages: [...conv.messages, message],
            title: isFirstUserMessage ? truncateText(content, 40) : conv.title,
          }
          return { conversations: { ...s.conversations, [id]: updatedConv } }
        })

        return message
      },

      addUserMessage: (content) => {
        get().addMessage(MESSAGE_ROLES.USER, content)
      },

      startStreaming: () => set({ isStreaming: true, streamingText: '', error: null }),

      appendStreamingChunk: (chunk) =>
        set((s) => ({ streamingText: s.streamingText + chunk })),

      finishStreaming: () => {
        const finalText = get().streamingText
        if (finalText) {
          get().addMessage(MESSAGE_ROLES.ASSISTANT, finalText)
        }
        set({ isStreaming: false, streamingText: '' })
      },

      setError: (error) => set({ error: error?.message || String(error), isStreaming: false }),
      clearError: () => set({ error: null }),

      getHistory: () => {
        const s = get()
        const conv = s.conversations[s.activeConversationId]
        if (!conv) return []
        return conv.messages.map(({ role, content }) => ({ role, content }))
      },
    }),
    {
      name: 'gemini-chatbot-storage',
      partialize: (s) => ({
        conversations: s.conversations,
        conversationOrder: s.conversationOrder,
        activeConversationId: s.activeConversationId,
      }),
    }
  )
)
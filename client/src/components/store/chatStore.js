// store/chatStore.js
import { create } from 'zustand'
import { generateId } from '../../utils/formatters'
import { MESSAGE_ROLES } from '../../utils/constants'

export const useChatStore = create((set, get) => ({
  messages: [],
  isStreaming: false,
  streamingText: '',
  error: null,

  addMessage: (role, content) => {
    const message = {
      id: generateId(),
      role,
      content,
      timestamp: Date.now(),
    }
    set((state) => ({ messages: [...state.messages, message] }))
    return message
  },

  addUserMessage: (content) => {
    get().addMessage(MESSAGE_ROLES.USER, content)
  },

  startStreaming: () => {
    set({ isStreaming: true, streamingText: '', error: null })
  },

  appendStreamingChunk: (chunk) => {
    set((state) => ({ streamingText: state.streamingText + chunk }))
  },

  finishStreaming: () => {
    const finalText = get().streamingText
    if (finalText) {
      get().addMessage(MESSAGE_ROLES.ASSISTANT, finalText)
    }
    set({ isStreaming: false, streamingText: '' })
  },

  setError: (error) => {
    set({ error: error?.message || String(error), isStreaming: false })
  },

  clearError: () => set({ error: null }),

  clearChat: () => set({ messages: [], streamingText: '', isStreaming: false, error: null }),

  getHistory: () => {
    return get().messages.map(({ role, content }) => ({ role, content }))
  },
}))
// hooks/useChatStream.js
import { useRef, useCallback } from 'react'
import { useChatStore } from '../store/chatStore'
import { streamChatMessage } from '../services/chatApi'

export function useChatStream() {
  const abortControllerRef = useRef(null)

  const addUserMessage = useChatStore((state) => state.addUserMessage)
  const startStreaming = useChatStore((state) => state.startStreaming)
  const appendStreamingChunk = useChatStore((state) => state.appendStreamingChunk)
  const finishStreaming = useChatStore((state) => state.finishStreaming)
  const setError = useChatStore((state) => state.setError)
  const getHistory = useChatStore((state) => state.getHistory)

  const sendMessage = useCallback(
    async (text) => {
      addUserMessage(text)
      const history = getHistory()

      startStreaming()

      abortControllerRef.current = new AbortController()

      await streamChatMessage(
        text,
        history,
        {
          onChunk: (chunk) => appendStreamingChunk(chunk),
          onDone: () => finishStreaming(),
          onError: (err) => setError(err),
        },
        abortControllerRef.current.signal
      )
    },
    [addUserMessage, getHistory, startStreaming, appendStreamingChunk, finishStreaming, setError]
  )

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort()
    finishStreaming()
  }, [finishStreaming])

  return { sendMessage, stopStreaming }
}
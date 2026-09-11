// hooks/useScrollToBottom.js
import { useEffect } from 'react'

/**
 * Auto-scrolls a container to the bottom whenever dependencies change.
 * @param {React.RefObject} containerRef - ref to the scrollable container
 * @param {Array} deps - dependency array that triggers scroll (e.g. [messages, streamingText])
 */
export function useScrollToBottom(containerRef, deps = []) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Only auto-scroll if user is already near the bottom (avoids yanking them down mid-read)
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 150

    if (isNearBottom) {
      el.scrollTop = el.scrollHeight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
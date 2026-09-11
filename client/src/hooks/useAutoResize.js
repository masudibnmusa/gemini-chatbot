// hooks/useAutoResize.js
import { useEffect } from 'react'

/**
 * Auto-grows a textarea's height based on its content, up to its CSS max-height.
 * @param {React.RefObject} textareaRef - ref to the textarea element
 * @param {string} value - current textarea value (trigger resize on change)
 */
export function useAutoResize(textareaRef, value) {
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [textareaRef, value])
}
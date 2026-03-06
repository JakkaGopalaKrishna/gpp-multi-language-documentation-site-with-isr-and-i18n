'use client'

import { useEffect } from 'react'

export default function CodeBlockEnhancer() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre')
    codeBlocks.forEach((pre) => {
      if (pre.querySelector('button')) return // Already has button

      const button = document.createElement('button')
      button.textContent = 'Copy'
      button.className = 'absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-sm rounded'
      button.setAttribute('data-testid', 'copy-code-button')
      button.onclick = () => {
        const code = pre.querySelector('code')
        if (code) {
          navigator.clipboard.writeText(code.textContent || '')
        }
      }

      const wrapper = document.createElement('div')
      wrapper.className = 'relative'
      wrapper.setAttribute('data-testid', 'code-block')
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)
      wrapper.appendChild(button)
    })
  }, [])

  return null
}
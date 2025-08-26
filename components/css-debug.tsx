"use client"

import { useEffect, useState } from 'react'

export function CSSDebug() {
  const [cssLoaded, setCssLoaded] = useState(false)
  const [tailwindClasses, setTailwindClasses] = useState<string[]>([])

  useEffect(() => {
    // Check if Tailwind CSS is loaded
    const checkCSS = () => {
      // Test if Tailwind classes are working
      const testElement = document.createElement('div')
      testElement.className = 'bg-blue-500 text-white p-4 rounded'
      document.body.appendChild(testElement)
      
      const computedStyle = window.getComputedStyle(testElement)
      const hasTailwind = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                          computedStyle.backgroundColor !== 'transparent'
      
      setCssLoaded(hasTailwind)
      
      // Clean up
      document.body.removeChild(testElement)
      
      // Log CSS status
      console.log('🔍 CSS Debug Info:')
      console.log('CSS Loaded:', hasTailwind)
      console.log('Computed Styles:', {
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        padding: computedStyle.padding,
        borderRadius: computedStyle.borderRadius
      })
    }

    // Wait a bit for CSS to load
    setTimeout(checkCSS, 1000)
    
    // Check again after 3 seconds
    setTimeout(checkCSS, 3000)
  }, [])

  if (!cssLoaded) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50">
        ⚠️ CSS Not Loaded
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded text-xs z-50">
      ✅ CSS Loaded
    </div>
  )
}

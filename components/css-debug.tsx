"use client"

import { useEffect, useState } from 'react'

export function CSSDebug() {
  const [cssLoaded, setCssLoaded] = useState(false)
  const [tailwindWorking, setTailwindWorking] = useState(false)
  const [customCssWorking, setCustomCssWorking] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    // Check if CSS is loaded
    const checkCSS = () => {
      // Test if Tailwind classes are working
      const testElement = document.createElement('div')
      testElement.className = 'bg-blue-500 text-white p-4 rounded'
      document.body.appendChild(testElement)
      
      const computedStyle = window.getComputedStyle(testElement)
      const hasTailwind = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                          computedStyle.backgroundColor !== 'transparent' &&
                          computedStyle.backgroundColor !== ''
      
      setTailwindWorking(hasTailwind)
      
      // Test custom CSS rule
      const customElement = document.createElement('div')
      customElement.className = 'test-css-rule'
      document.body.appendChild(customElement)
      
      const customStyle = window.getComputedStyle(customElement)
      const hasCustomCss = customStyle.backgroundColor === 'rgb(255, 0, 0)' // red
      
      setCustomCssWorking(hasCustomCss)
      
      // Overall CSS status
      setCssLoaded(hasTailwind || hasCustomCss)
      
      // Clean up
      document.body.removeChild(testElement)
      document.body.removeChild(customElement)
      
      // Store debug info
      setDebugInfo({
        tailwind: {
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          padding: computedStyle.padding,
          borderRadius: computedStyle.borderRadius
        },
        custom: {
          backgroundColor: customStyle.backgroundColor,
          color: customStyle.color,
          padding: customStyle.padding,
          borderRadius: customStyle.borderRadius
        }
      })
      
      // Log CSS status
      console.log('🔍 CSS Debug Info:')
      console.log('CSS Loaded:', hasTailwind || hasCustomCss)
      console.log('Tailwind Working:', hasTailwind)
      console.log('Custom CSS Working:', hasCustomCss)
      console.log('Tailwind Styles:', computedStyle)
      console.log('Custom CSS Styles:', customStyle)
    }

    // Wait a bit for CSS to load
    setTimeout(checkCSS, 1000)
    
    // Check again after 3 seconds
    setTimeout(checkCSS, 3000)
    
    // Check again after 5 seconds
    setTimeout(checkCSS, 5000)
  }, [])

  if (!cssLoaded) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded text-xs z-50 max-w-xs">
        ⚠️ CSS Not Loaded
        <div className="mt-1 text-xs">
          Tailwind: {tailwindWorking ? '✅' : '❌'}<br/>
          Custom: {customCssWorking ? '✅' : '❌'}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded text-xs z-50 max-w-xs">
      ✅ CSS Loaded
      <div className="mt-1 text-xs">
        Tailwind: {tailwindWorking ? '✅' : '❌'}<br/>
        Custom: {customCssWorking ? '✅' : '❌'}
      </div>
    </div>
  )
}

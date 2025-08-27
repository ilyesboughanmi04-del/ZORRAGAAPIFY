"use client"

import { useEffect, useState } from 'react'

export function CSSDebug() {
  const [cssLoaded, setCssLoaded] = useState(false)
  const [tailwindWorking, setTailwindWorking] = useState(false)
  const [customCssWorking, setCustomCssWorking] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [cssFiles, setCssFiles] = useState<string[]>([])

  useEffect(() => {
    // Check what CSS files are loaded
    const checkCSSFiles = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]')
      const cssFiles = Array.from(links).map(link => (link as HTMLLinkElement).href)
      setCssFiles(cssFiles)
      console.log('🔍 CSS Files loaded:', cssFiles)
    }

    // Check if CSS is loaded
    const checkCSS = () => {
      // Test if Tailwind classes are working
      const testElement = document.createElement('div')
      testElement.className = 'bg-blue-500 text-white p-4 rounded'
      testElement.style.position = 'absolute'
      testElement.style.left = '-9999px'
      testElement.style.top = '-9999px'
      document.body.appendChild(testElement)
      
      const computedStyle = window.getComputedStyle(testElement)
      console.log('🔍 Raw computed styles for Tailwind test:', {
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        padding: computedStyle.padding,
        borderRadius: computedStyle.borderRadius,
        display: computedStyle.display,
        position: computedStyle.position
      })
      
      const hasTailwind = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                          computedStyle.backgroundColor !== 'transparent' &&
                          computedStyle.backgroundColor !== '' &&
                          computedStyle.backgroundColor !== 'initial'
      
      setTailwindWorking(hasTailwind)
      
      // Test custom CSS rule
      const customElement = document.createElement('div')
      customElement.className = 'test-css-rule'
      customElement.style.position = 'absolute'
      customElement.style.left = '-9999px'
      customElement.style.top = '-9999px'
      document.body.appendChild(customElement)
      
      const customStyle = window.getComputedStyle(customElement)
      console.log('🔍 Raw computed styles for custom CSS test:', {
        backgroundColor: customStyle.backgroundColor,
        color: customStyle.color,
        padding: customStyle.padding,
        borderRadius: customStyle.borderRadius
      })
      
      const hasCustomCss = customStyle.backgroundColor === 'rgb(255, 0, 0)' // red
      
      setCustomCssWorking(hasCustomCss)
      
      // Test basic CSS classes
      const basicElement = document.createElement('div')
      basicElement.className = 'test-basic'
      basicElement.style.position = 'absolute'
      basicElement.style.left = '-9999px'
      basicElement.style.top = '-9999px'
      document.body.appendChild(basicElement)
      
      const basicStyle = window.getComputedStyle(basicElement)
      console.log('🔍 Raw computed styles for basic CSS test:', {
        backgroundColor: basicStyle.backgroundColor,
        color: basicStyle.color,
        padding: basicStyle.padding,
        margin: basicStyle.margin,
        border: basicStyle.border
      })
      
      const hasBasicCss = basicStyle.backgroundColor === 'rgb(255, 0, 0)' // red
      console.log('🔍 Basic CSS working:', hasBasicCss)
      
      // Test with inline styles to see if CSS is working at all
      const inlineElement = document.createElement('div')
      inlineElement.style.backgroundColor = 'purple'
      inlineElement.style.color = 'white'
      inlineElement.style.padding = '20px'
      inlineElement.style.position = 'absolute'
      inlineElement.style.left = '-9999px'
      inlineElement.style.top = '-9999px'
      document.body.appendChild(inlineElement)
      
      const inlineStyle = window.getComputedStyle(inlineElement)
      console.log('🔍 Inline styles test:', {
        backgroundColor: inlineStyle.backgroundColor,
        color: inlineStyle.color,
        padding: inlineStyle.padding
      })
      
      // Test with !important styles to see if there are conflicts
      const importantElement = document.createElement('div')
      importantElement.style.cssText = 'background-color: orange !important; color: black !important; padding: 25px !important; position: absolute; left: -9999px; top: -9999px;'
      document.body.appendChild(importantElement)
      
      const importantStyle = window.getComputedStyle(importantElement)
      console.log('🔍 !important styles test:', {
        backgroundColor: importantStyle.backgroundColor,
        color: importantStyle.color,
        padding: importantStyle.padding
      })
      
      // Test if the issue is with specific properties
      const propertyElement = document.createElement('div')
      propertyElement.style.cssText = 'background: lime; color: navy; margin: 30px; position: absolute; left: -9999px; top: -9999px;'
      document.body.appendChild(propertyElement)
      
      const propertyStyle = window.getComputedStyle(propertyElement)
      console.log('🔍 Property styles test:', {
        background: propertyStyle.background,
        backgroundColor: propertyStyle.backgroundColor,
        color: propertyStyle.color,
        margin: propertyStyle.margin
      })
      
      // Overall CSS status
      setCssLoaded(hasTailwind || hasCustomCss || hasBasicCss)
      
      // Clean up
      document.body.removeChild(testElement)
      document.body.removeChild(customElement)
      document.body.removeChild(basicElement)
      document.body.removeChild(inlineElement)
      document.body.removeChild(importantElement)
      document.body.removeChild(propertyElement)
      
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
        },
        basic: {
          backgroundColor: basicStyle.backgroundColor,
          color: basicStyle.color,
          padding: basicStyle.padding,
          margin: basicStyle.margin,
          border: basicStyle.border
        },
        inline: {
          backgroundColor: inlineStyle.backgroundColor,
          color: inlineStyle.color,
          padding: inlineStyle.padding
        },
        important: {
          backgroundColor: importantStyle.backgroundColor,
          color: importantStyle.color,
          padding: importantStyle.padding
        },
        property: {
          background: propertyStyle.background,
          backgroundColor: propertyStyle.backgroundColor,
          color: propertyStyle.color,
          margin: propertyStyle.margin
        }
      })
      
      // Log CSS status
      console.log('🔍 CSS Debug Info:')
      console.log('CSS Loaded:', hasTailwind || hasCustomCss || hasBasicCss)
      console.log('Tailwind Working:', hasTailwind)
      console.log('Custom CSS Working:', hasCustomCss)
      console.log('Basic CSS Working:', hasBasicCss)
      console.log('Tailwind Styles:', {
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        padding: computedStyle.padding,
        borderRadius: computedStyle.borderRadius
      })
      console.log('Custom CSS Styles:', {
        backgroundColor: customStyle.backgroundColor,
        color: customStyle.color,
        padding: customStyle.padding,
        borderRadius: customStyle.borderRadius
      })
      console.log('Basic CSS Styles:', {
        backgroundColor: basicStyle.backgroundColor,
        color: basicStyle.color,
        padding: basicStyle.padding,
        margin: basicStyle.margin,
        border: basicStyle.border
      })
      console.log('Inline Styles:', {
        backgroundColor: inlineStyle.backgroundColor,
        color: inlineStyle.color,
        padding: inlineStyle.padding
      })
      console.log('!important Styles:', {
        backgroundColor: importantStyle.backgroundColor,
        color: importantStyle.color,
        padding: importantStyle.padding
      })
      console.log('Property Styles:', {
        background: propertyStyle.background,
        backgroundColor: propertyStyle.backgroundColor,
        color: propertyStyle.color,
        margin: propertyStyle.margin
      })
    }

    // Check CSS files first
    checkCSSFiles()
    
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
          Custom: {customCssWorking ? '✅' : '❌'}<br/>
          Files: {cssFiles.length}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded text-xs z-50 max-w-xs">
      ✅ CSS Loaded
      <div className="mt-1 text-xs">
        Tailwind: {tailwindWorking ? '✅' : '❌'}<br/>
        Custom: {customCssWorking ? '✅' : '❌'}<br/>
        Files: {cssFiles.length}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import useMousePosition from '../../hooks/useMousePosition'

const Cursor = () => {
  const { x, y } = useMousePosition()
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isClient || !isVisible) return null

  return (
    <div 
      id="cursor" 
      style={{ 
        left: `${x}px`, 
        top: `${y}px` 
      }}
    />
  )
}

export default Cursor
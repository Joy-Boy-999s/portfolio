import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkHeight = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', checkHeight)
    return () => window.removeEventListener('scroll', checkHeight)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isClient) return null

  return (
    <a 
      onClick={scrollToTop} 
      className="to-top" 
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <i className="bx bx-chevron-up"></i>
    </a>
  )
}

export default ScrollToTop
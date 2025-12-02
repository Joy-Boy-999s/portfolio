import { useEffect, RefObject } from 'react'

const useElementRotation = (elementRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX
      const y = event.clientY

      const middleX = window.innerWidth / 2
      const middleY = window.innerHeight / 2

      const offsetX = ((x - middleX) / middleX) * 50
      const offsetY = ((y - middleY) / middleY) * 50

      element.style.setProperty('--rotX', `${-1 * offsetY}deg`)
      element.style.setProperty('--rotY', `${offsetX}deg`)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [elementRef])
}

export default useElementRotation
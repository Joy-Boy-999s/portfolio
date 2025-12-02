import { useRef } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
}

const AnimatedText = ({ text, className = '' }: AnimatedTextProps) => {
  const textRef = useRef<HTMLHeadingElement>(null)

  const handleMouseOver = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let iteration = 0
    const element = textRef.current

    if (!element) return

    const originalText = text
    let interval: NodeJS.Timeout | null = null

    interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("")

      if (iteration >= originalText.length) {
        clearInterval(interval!)
      }

      iteration += 1 / 2
    }, 30)
  }

  return (
    <h2 
      ref={textRef}
      className={`ranlets ${className}`}
      onMouseOver={handleMouseOver}
      data-value={text}
    >
      {text}
    </h2>
  )
}

export default AnimatedText
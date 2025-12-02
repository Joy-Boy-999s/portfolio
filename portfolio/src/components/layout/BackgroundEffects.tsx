import { useEffect, useState } from 'react'

const BackgroundEffects = () => {
  const [squares, setSquares] = useState<number[]>([])
  const [columns, setColumns] = useState(20) // Default value for SSR

  useEffect(() => {
    // Client-side only calculations
    const calculateSquares = () => {
      const colres = Math.round(window.innerWidth / 50)
      const rowres = Math.round(window.innerHeight / 50)
      const numsq = colres * rowres
      setColumns(colres)
      setSquares(Array.from({ length: numsq }))
    }

    calculateSquares()
    window.addEventListener('resize', calculateSquares)
    return () => window.removeEventListener('resize', calculateSquares)
  }, [])

  return (
    <div className="d-none d-sm-block">
      <div id="container" style={{ '--rescol': columns } as React.CSSProperties}>
        {squares.map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  )
}

export default BackgroundEffects
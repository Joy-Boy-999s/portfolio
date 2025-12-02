import { useState, useEffect, useRef } from 'react'

type MenuItem =
  | { type: 'action'; label: string; action: () => void }
  | { type: 'separator' }

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const contextMenuRef = useRef<HTMLDivElement>(null)

  const menuItems: MenuItem[] = [
    { type: 'action', label: 'Go to top', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { type: 'action', label: 'Reload', action: () => window.location.reload() },
    { type: 'separator' },
    { type: 'action', label: 'Home', action: () => document.querySelector('#Home')?.scrollIntoView({ behavior: 'smooth' }) },
    { type: 'action', label: 'Skills', action: () => document.querySelector('#Skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { type: 'action', label: 'Projects', action: () => document.querySelector('#Projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { type: 'action', label: 'Contact me', action: () => document.querySelector('#Contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { type: 'separator' },
  ]

  useEffect(() => {
    if (!isClient) return

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()

      const normalizedPosition = normalizePosition(e.clientX, e.clientY)
      setPosition(normalizedPosition)
      setIsVisible(true)
    }

    const handleClick = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setIsVisible(false)
      }
    }

    const handleScroll = () => {
      setIsVisible(false)
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('click', handleClick)
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [isClient])

  const normalizePosition = (mouseX: number, mouseY: number) => {
    const scope = document.body
    const contextMenu = contextMenuRef.current

    if (!contextMenu) return { x: mouseX, y: mouseY }

    const { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect()
    const scopeX = mouseX - Math.max(scopeOffsetX, 0)
    const scopeY = mouseY - Math.max(scopeOffsetY, 0)

    const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth
    const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight

    let normalizedX = mouseX
    let normalizedY = mouseY

    if (outOfBoundsOnX) {
      normalizedX = Math.max(scopeOffsetX, 0) + scope.clientWidth - contextMenu.clientWidth
    }

    if (outOfBoundsOnY) {
      normalizedY = Math.max(scopeOffsetY, 0) + scope.clientHeight - contextMenu.clientHeight
    }

    return { x: normalizedX, y: normalizedY }
  }

  if (!isClient) return null

  return (
    <div
      ref={contextMenuRef}
      id="context-menu"
      className={isVisible ? 'visible' : ''}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        display: isVisible ? 'block' : 'none'
      }}
    >
      {menuItems.map((item, index) =>
        item.type === 'separator' ? (
          <hr key={index} className="ctmhr" />
        ) : (
          <div
            key={index}
            className="item"
            onClick={() => {
              item.action()
              setIsVisible(false)
            }}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  )
}

export default ContextMenu
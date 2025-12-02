import { useState, useEffect } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const navItems = [
    { id: 'Home', label: 'Home', href: '#Home' },
    { id: 'Skills', label: 'Skills', href: '#Skills' },
    { id: 'Achievements', label: 'Achievements', href: '#Achievements' },
    { id: 'Projects', label: 'Links', href: '#Projects' },
    { id: 'Contact', label: 'Contact Me', href: '#Contact' },
  ]

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPos = window.scrollY + 100

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.clientHeight
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  const handleNavClick = (href: string, id: string) => {
    setIsMenuOpen(false)
    setActiveSection(id)
    if (isClient) {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!isClient) {
    // Return basic header for SSR
    return (
      <header className="header">
        <a className="logo">B.Neeraj Kumar</a>
        <nav className="navbar">
          {navItems.map((item, index) => (
            <a key={item.id} className="url">
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    )
  }

  return (
    <header className="header">
      <a onClick={() => handleNavClick('#Home', 'Home')} className="logo">
        B.Neeraj Kumar
      </a>
      
      <input 
        type="checkbox" 
        id="check" 
        checked={isMenuOpen}
        onChange={(e) => setIsMenuOpen(e.target.checked)}
        style={{ display: 'none' }}
      />
      
      <label htmlFor="check" className="icons">
        <i className={`bx bx-menu bx-tada-hover ${isMenuOpen ? 'hidden' : ''}`} id="menu-icon"></i>
        <i className={`bx bx-x bx-tada-hover ${isMenuOpen ? '' : 'hidden'}`} id="close-icon"></i>
      </label>
      
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`} id="navigation">
        {navItems.map((item, index) => (
          <a
            key={item.id}
            className={`url ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.href, item.id)}
            style={{ '--i': index } as React.CSSProperties}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header
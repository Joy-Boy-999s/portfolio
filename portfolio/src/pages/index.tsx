import { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/layout/Header'
import BackgroundEffects from '../components/layout/BackgroundEffects'
import Cursor from '../components/layout/Cursor'
import Hero from '../components/sections/Hero'
import Skills from '../components/sections/Skills'
import Achievements from '../components/sections/Achievements'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import ScrollToTop from '../components/common/ScrollToTop'
import ContextMenu from '../components/ui/ContextMenu'

export default function Home() {
  const [titlePosition, setTitlePosition] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Animated title
    const title = "Hi there, I'm B.Neeraj Kumar. Welcome to my portfolio !           "
    const scrollTitle = () => {
      document.title = title.substring(titlePosition, title.length) + title.substring(0, titlePosition)
      setTitlePosition(prev => prev >= title.length ? 0 : prev + 1)
    }

    const titleScroll = setInterval(scrollTitle, 270)
    return () => clearInterval(titleScroll)
  }, [titlePosition, isClient])

  return (
    <>
      <Head>
        <title>portfolio ! Hi there, I&apos;m B.Neeraj Kumar. Welcome to my</title>
      </Head>

      <BackgroundEffects />
      <Cursor />
      <Header />

      <main>
        <Hero />
        <Skills />
        <Achievements />
        <Projects />
        <Contact />
      </main>

      <footer className="socialm">
        <div className="footerd">
          <div className="fttxt">
            <h1>By JoyBoy<small>&gt;&gt;&gt;</small></h1>
            <br />
            <h4>Contact us To Create Your Own Site or for any enquiries.</h4>
            <h4>Contact B.Neeraj Kumar now</h4>
            <br />
            <p style={{ color: '#999999' }}>Copyright JoyBoy © 2024</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
      <ContextMenu />
    </>
  )
}
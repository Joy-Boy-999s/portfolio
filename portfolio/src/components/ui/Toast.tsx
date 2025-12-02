import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface ToastContextType {
  showToast: (title: string, message: string, icon: string, color: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isActive, setIsActive] = useState(false)
  const [isProgressActive, setIsProgressActive] = useState(false)
  const [toastData, setToastData] = useState({
    title: '',
    message: '',
    icon: '',
    color: ''
  })

  const showToast = useCallback((title: string, message: string, icon: string, color: string) => {
    setToastData({ title, message, icon, color })
    setIsActive(true)
    setIsProgressActive(true)

    setTimeout(() => {
      setIsActive(false)
    }, 5000)

    setTimeout(() => {
      setIsProgressActive(false)
    }, 5300)
  }, [])

  const closeToast = () => {
    setIsActive(false)
    setTimeout(() => {
      setIsProgressActive(false)
    }, 300)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`toastnt ${isActive ? 'ntact' : ''}`}>
        <div className="ntcont">
          <i className={`bx ${toastData.icon} ntcheck`} style={{ color: toastData.color }}></i>
          <div className="ntmsg">
            <span id="alttil" className="nttxt nttxt1">{toastData.title}</span>
            <span id="altmsg" className="nttxt nttxt2">{toastData.message}</span>
          </div>
          <i className="bx bx-x-circle ntclose" onClick={closeToast}></i>
          <div className={`ntprog ${isProgressActive ? 'ntact' : ''}`}></div>
        </div>
      </div>
    </ToastContext.Provider>
  )
}

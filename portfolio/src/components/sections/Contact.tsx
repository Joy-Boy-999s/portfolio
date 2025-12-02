import { useState } from 'react'
import GlitchText from '../ui/GlitchText'
import { sendEmail } from '../../utils/emailService'
import { useToast } from '../ui/Toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const { showToast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await sendEmail({
        sendername: formData.name,
        sendermail: formData.email,
        subject: formData.subject,
        message: formData.message
      })
      showToast('Done !', 'Your message has been sent.', 'bx-message-square-check', '#0060af')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      showToast('Error !', 'An error occurred. Please try again.', 'bx-message-square-error', '#af0000')
    }
  }

  return (
    <div className="contactme" id="Contact">
      <div className="titles">
        <GlitchText text="Contact me" />
        <hr id="hr0" />
        <br /><br /><br /><br />
        <div className="contmediv">
          <form onSubmit={handleSubmit} className="contactmail">
            <div className="contactgroup">
              <input 
                type="text" 
                className="inputcont" 
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <label className="contlabel">
                {['Y','o','u','r','\u00A0','n','a','m','e',':'].map((letter, index) => (
                  <span key={index} className="inputword" style={{ transitionDelay: `${index * 30}ms`, filter: `hue-rotate(${index * 25}deg)` }}>
                    {letter}
                  </span>
                ))}
              </label>
            </div>
            
            <div className="contactgroup">
              <input 
                type="email" 
                className="inputcont" 
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <label className="contlabel">
                {['Y','o','u','r','\u00A0','E','m','a','i','l',':'].map((letter, index) => (
                  <span key={index} className="inputword" style={{ transitionDelay: `${index * 30}ms`, filter: `hue-rotate(${index * 25}deg)` }}>
                    {letter}
                  </span>
                ))}
              </label>
            </div>
            
            <div className="contactgroup">
              <input 
                type="text" 
                className="inputcont" 
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required 
              />
              <label className="contlabel inprmailvalid">
                {['S','u','b','j','e','c','t',':'].map((letter, index) => (
                  <span key={index} className="inputword" style={{ transitionDelay: `${index * 30}ms`, filter: `hue-rotate(${index * 25}deg)` }}>
                    {letter}
                  </span>
                ))}
              </label>
            </div>
            
            <div className="contactgroup">
              <textarea 
                className="inputcont" 
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                required 
                rows={4}
              ></textarea>
              <label className="contlabel">
                {['Y','o','u','r','\u00A0','m','e','s','s','a','g','e',':'].map((letter, index) => (
                  <span key={index} className="inputword" style={{ transitionDelay: `${index * 30}ms`, filter: `hue-rotate(${index * 25}deg)` }}>
                    {letter}
                  </span>
                ))}
              </label>
            </div>
            
            <br />
            <div className="lastcont">
              <button type="submit" style={{ fontWeight: 'bolder' }} id="ctmbutton">
                <span id="ctme">Send</span>
              </button>
            </div>
            <br />
          </form>
        </div>
        <hr style={{ height: '10rem', border: 0 }} /><br /><br /><br />
      </div>
    </div>
  )
}

export default Contact
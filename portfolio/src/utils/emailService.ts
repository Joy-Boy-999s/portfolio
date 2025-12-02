import type { EmailJSResponseStatus } from 'emailjs-com'

export interface EmailParams {
  sendername: string
  sendermail: string
  subject: string
  message: string
  [key: string]: string
}

export const sendEmail = async (params: EmailParams): Promise<EmailJSResponseStatus> => {
  // Initialize EmailJS (you'll need to install emailjs-com)
  const emailjs = await import('emailjs-com')
  emailjs.init("ZTY97s9zx--zHLnYC")

  const serviceID = "service_qscbx4g"
  const templateID = "template_iw2vt3f"

  return emailjs.send(serviceID, templateID, params)
}
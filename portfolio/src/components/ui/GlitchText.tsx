interface GlitchTextProps {
  text: string
}

const GlitchText = ({ text }: GlitchTextProps) => {
  return (
    <h1 className="glitch">
      <span aria-hidden="true">{text}</span>
      {text}
      <span aria-hidden="true">{text}</span>
    </h1>
  )
}

export default GlitchText
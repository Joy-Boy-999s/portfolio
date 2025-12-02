import AnimatedText from '../ui/AnimatedText'
import CodeDisplay from '../ui/CodeDisplay'

const Hero = () => {
  return (
    <section id="Home">
      <div id="mytext">
        <h1 id="names">
          I&apos;m a
          <span style={{ '--i': 0 } as React.CSSProperties} data-text="Coder..">Coder..</span>
          <span style={{ '--i': 1 } as React.CSSProperties} data-text="Editor..">Editor..</span>
          <span style={{ '--i': 2 } as React.CSSProperties} data-text="Creator..">Creator..</span>
        </h1>
      </div>
      
      <div className="aboutunder">
        <AnimatedText 
          text="Welcome to my portfolio !" 
          className="ranlets" 
        />
        <br />
        <p id="childtext">Greetings, tech enthusiasts! I&apos;m B.Neeraj Kumar.</p>
      </div>
      
      <div className="spbuttons">
        <a onClick={() => document.querySelector('#Contact')?.scrollIntoView({ behavior: 'smooth' })} id="ctmbutton">
          <span id="ctme">Contact me</span>
        </a>
        <a 
          href="https://drive.google.com/file/d/1jrKmpeooPkSKZ2JSEyqj--HtjDsv4rCu/view?usp=drive_link"
          id="ctmbutton" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <span id="ctme">My Resume</span>
        </a>
      </div>

      <CodeDisplay />
    </section>
  )
}

export default Hero
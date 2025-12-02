import { useRef, type RefObject } from 'react'
import useElementRotation from '../../hooks/useElementRotation'

const CodeDisplay = () => {
  const codeRef = useRef<HTMLDivElement>(null)
  useElementRotation(codeRef as RefObject<HTMLElement>)

  return (
    <div className="codesmooth">
      <div className="window glassbox"></div>
      <div className="codename" id="rotXY" ref={codeRef}>
        <span className="codearea"></span>
        <span id="python">
          <p><b className="nuberings">&nbsp;1 </b><span className="greencode">#About me</span></p>
          <p><b className="nuberings">&nbsp;2 </b><span className="bluecode">name</span> = <span className="orangecode">&quot;B.Neeraj Kumar&quot;</span></p>
          <p><b className="nuberings">&nbsp;3 </b><span className="bluecode">job</span> = <span className="orangecode">&quot;Aspiring Software Developer&quot;</span></p>
          <p><b className="nuberings">&nbsp;4 </b><span className="bluecode">hobby</span> = <span className="orangecode">&quot;Turning creative ideas </span></p>
          <p><b className="nuberings">&nbsp;</b><span className="orangecode">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;into reality through code&quot;</span></p>
          <p><b className="nuberings">&nbsp;5 </b><span className="bluecode">fav_lang</span> = <span className="orangecode">&quot;Python&quot;</span></p>
          <p><b className="nuberings">&nbsp;6 </b></p>
          <p><b className="nuberings">&nbsp;7 </b><span className="yellowcodeL">print</span><span className="yellowcode">(</span><span className="bluecodeD">f</span><span className="orangecode">&quot;Hi there! I&apos;m </span><span className="pinkcode">{'{'}name{'}'}</span><span className="orangecode">.</span><span className="orangecode"> I&apos;m an </span></p>
          <p><b className="nuberings">&nbsp;8 </b><span className="pinkcode">{'{'}job{'}'}</span><span className="orangecode"> who enjoys </span><span className="pinkcode">{'{'}hobby{'}'} </span><span className="orangecode">as a hobby</span></p>
          <p><b className="nuberings">&nbsp;9 </b><span className="orangecode">with my favourite language</span></p>
          <p><b className="nuberings">10 </b><span className="pinkcode">{'{'}fav_lang{'}'}</span><span className="orangecode">&quot;</span><span className="yellowcode">)</span></p>
          <p><b className="currnum">11 </b><b id="blinkcur">|</b></p>
        </span>
      </div>
    </div>
  )
}

export default CodeDisplay
interface SkillCircleProps {
  id: string
  percentage: number
  name: string
  color: string
  style?: React.CSSProperties
}

const SkillCircle = ({ id, percentage, name, style }: SkillCircleProps) => {
  return (
    <div className="skillbox" id={id} style={style}>
      <div className="skillcircle">
        <div className="skillcircle2">
          <h2 className="skillpre">
            {percentage}<small>%</small>
          </h2>
        </div>
      </div>
      <h3 className="skilltx">{name}</h3>
    </div>
  )
}

export default SkillCircle
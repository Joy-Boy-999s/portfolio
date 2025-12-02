import SkillCircle from '../ui/SkillCircle'
import GlitchText from '../ui/GlitchText'

const Skills = () => {
    const skills = [
        { id: 'spy', percentage: 79, name: 'JavaScript', color: 'yellow' },
        { id: 'shtm', percentage: 85, name: 'PYTHON', color: 'orange' },
        { id: 'scphp', percentage: 80, name: 'Web Development', color: 'rgb(107, 44, 158)' },
        { id: 'sjs', percentage: 15, name: 'C', color: 'white' },
        { id: 'scpsql', percentage: 65, name: 'JAVA', color: 'rgb(8, 32, 255)' },
        { id: 'scpp', percentage: 50, name: 'Automation', color: 'rgb(179, 5, 179)' },
    ]

    return (
        <section className="smoothtransform" id="Skills">
            <div className="titles">
                <GlitchText text="My Skills" />
                <hr id="hr0" />
            </div>
            <div className="skillcontainer smoothtransform" id="skillsec">
                {skills.map((skill, index) => (
                    <SkillCircle
                        key={skill.id}
                        id={skill.id}
                        percentage={skill.percentage}
                        name={skill.name}
                        color={skill.color}
                        style={{ '--b': `${skill.percentage}%`, '--clr': skill.color } as React.CSSProperties}
                    />
                ))}
            </div>
            <br /><br /><br />
        </section>
    )
}

export default Skills
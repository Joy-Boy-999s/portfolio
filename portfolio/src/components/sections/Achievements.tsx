import GlitchText from '../ui/GlitchText'

const Achievements = () => {
  const achievements = [
    {
      title: "Education:-",
      content: (
        <ul>
          <li>
            Bachelor of Technology in Electronics and Communication Engineering, Andhra
            University College of Engineering, India. 2020-2024
            <br />Relevant Coursework: Microprocessors, PLCs, Industrial Automation, and
            Communication Systems
            <br />CGPA: 7.48/10.0
          </li>
          <br />
          <li>
            Intermediate Education, Narayana Junior College, Andhra Pradesh, India.
            2018-2020<br />CGPA: 8.89/10.0
          </li>
          <br />
          <li>
            Secondary Education, MP &amp; EV English Medium School, Visakhapatnam, India. 2017-2018
            <br /> Percentage: 60%
          </li>
        </ul>
      )
    },
    {
      title: "Internships:-",
      content: (
        <ul>
          <li>Intern at Strugger Innovations, India. 2024/06–2024/07</li>
          <br />
          <ul>
            <li>&nbsp;&nbsp;&nbsp;Gained hands-on experience in Siemens and Allen Bradley PLCs,
              designed and configured SCADA systems and HMI interfaces for real-world
              industrial applications.</li>
          </ul>
          <br />
          <li>Project Intern at RINL Visakhapatnam, India. 2023.06–2023.07</li>
          <br />
          <ul>
            <li>Studied and analyzed the application of microprocessors and PLCs in industrial
              environments, focusing on automation systems.</li>
          </ul>
        </ul>
      )
    },
    {
      title: "Certifications & Awards:-",
      content: (
        <ul>
          <li>MERN Stack Development Course. NxtWave. 2024.02–Ongoing</li>
          <ul>
            <li>Currently enrolled in a comprehensive MERN stack course to enhance full-stack
              web development skills.</li>
          </ul>
          <br />
          <li>PLC and SCADA Training Certification. Strugger Innovations. 2024</li>
          <ul>
            <li>Received specialized training in automation technologies, focusing on Siemens
              and Allen Bradley PLCs.</li>
          </ul>
          <br />
          <li>Class Representative. Andhra University College of Engineering. 2020–2024</li>
          <ul>
            <li>Elected as Class Representative for 5 semesters, demonstrating leadership and
              communication skills.</li>
          </ul>
          <br />
          <li>Volunteer at Job Mela. Andhra Pradesh Government. 2023</li>
          <ul>
            <li>Assisted in organizing and managing the Job Mela event, contributing to its
              success.</li>
          </ul>
        </ul>
      )
    },
    {
      title: "Projects:-",
      content: (
        <ul>
          <li>IoT Project on Arduino Uno with LDR Sensor. 2024</li>
          <ul>
            <li>Developed an automated lighting system using an Arduino Uno and LDR sensor to
              adjust lighting based on ambient light levels.</li>
            <li>Enhanced energy efficiency by automating lighting control, contributing to smart
              home automation.</li>
          </ul>
          <br />
          <li>Fake Currency Detection Using Machine Learning. 2023</li>
          <ul>
            <li>Designed a counterfeit detection system using image processing and machine
              learning algorithms, achieving high accuracy in identifying fake currency notes.
            </li>
            <li>Implemented advanced data processing techniques for precise detection and
              validation.</li>
          </ul>
        </ul>
      )
    }
  ]

  return (
    <div id="Achievements">
      <div className="titles">
        <GlitchText text="Achievements" />
        <br /><br />
      </div>
      
      {achievements.map((achievement, index) => (
        <div key={index} className="gledu">
          <div className="glbox">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="glsqu" style={{ '--gl': i } as React.CSSProperties}></div>
            ))}
            <div className="glcont">
              <div className="gltxedu">
                <h2>{achievement.title}</h2>
                <br />
                {achievement.content}
              </div>
            </div>
          </div>
          <br /><br /><br />
        </div>
      ))}
      
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Achievements
import GlitchText from '../ui/GlitchText'

const Projects = () => {
    const links = [
        {
            platform: 'Instagram',
            url: 'https://www.instagram.com/j.o.y___b.o.y/',
            image: 'https://i.pinimg.com/736x/19/42/d5/1942d5deb0f788e6228054cd92767ff6.jpg',
            description: ''
        },
        {
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/in/b-neeraj-kumar/',
            image: 'https://i.pinimg.com/736x/b2/f8/28/b2f828513f21444829a619ce563d4d4e.jpg',
            description: 'Contact me via here'
        }
    ]

    return (
        <div id="Projects">
            <div className="titles">
                <GlitchText text="My Links" />
                <hr id="hr0" />
            </div>
            <br />
            <div className="links-container" style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                {links.map((link, index) => (
                    <div key={link.platform.toLowerCase()} className={link.platform.toLowerCase()}>
                        <div className="pjglbox">
                            <a
                                onClick={() => window.open(link.url, '_blank')}
                                className="pjbox"
                                style={{ '--pj': 1 } as React.CSSProperties}
                            >
                                <img className="pjimg" src={link.image} alt={link.platform} />
                                <h1 className="pjtext smoothtransform">{link.platform}</h1>
                                <p className="pjsmtext smoothtransform">{link.description}</p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <br /><br /><br /><br />
        </div>
    )
}

export default Projects
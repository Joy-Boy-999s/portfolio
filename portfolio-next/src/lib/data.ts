export const SKILLS = [
  { name: "JavaScript", percentage: 85, color: "var(--color-js)" },
  { name: "TypeScript", percentage: 80, color: "var(--color-ts)" },
  { name: "Java", percentage: 75, color: "var(--color-java)" },
  { name: "Python", percentage: 70, color: "var(--color-py)" },
  { name: "React.js", percentage: 85, color: "var(--color-web)" },
  { name: "Node.js", percentage: 80, color: "var(--color-node)" },
];

export const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: "code",
    skills: ["Java", "JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    icon: "layout",
    skills: ["React.js", "HTML5", "CSS3", "Ant Design", "Responsive Design"],
  },
  {
    title: "Backend",
    icon: "server",
    skills: ["Spring Boot", "Node.js", "NestJS", "Express.js", "REST APIs"],
  },
  {
    title: "Database & Auth",
    icon: "database",
    skills: ["MySQL", "SQL", "JWT", "bcrypt", "RBAC"],
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: ["Git", "GitHub", "Postman", "Swagger", "Nodemailer"],
  },
  {
    title: "Concepts",
    icon: "lightbulb",
    skills: ["OOP", "MVC", "API Design", "Agile", "SDLC"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Work Experience",
    items: [
      {
        title: "Software Development Engineer – I (Full Stack Developer)",
        organization: "Schemax Tech Pvt. Ltd., India",
        date: "Feb 2025 – Present",
        details: [
          "Developed employee management, recruitment, attendance, leave management, and role mapping modules using React.js and NestJS (HRMS).",
          "Implemented role-based access control improving security of employee data and system access.",
          "Built reusable UI components using Ant Design improving development efficiency and consistency.",
          "Developed supplier management, purchase order workflows, and packing list lifecycle for Xapperal ERP (SUPS).",
          "Integrated Swagger documentation and Postman testing improving API reliability."
        ]
      }
    ]
  },
  {
    title: "Education",
    items: [
      {
        title: "Bachelor of Technology – Electronics and Communication Engineering",
        organization: "Andhra University College of Engineering, India",
        date: "2020 – 2024",
        details: [
          "CGPA: 7.48 / 10"
        ]
      },
      {
        title: "Intermediate Education",
        organization: "Narayana Junior College, Andhra Pradesh, India",
        date: "2018 – 2020",
        details: ["CGPA: 8.89 / 10"]
      },
      {
        title: "Secondary Education",
        organization: "MP & EV English Medium School, Visakhapatnam, India",
        date: "2017 – 2018",
        details: ["Percentage: 60%"]
      }
    ]
  },
  {
    title: "Projects",
    items: [
      {
        title: "In-One – Social Platform",
        date: "2024",
        details: [
          "Full stack social platform with authentication, profile management, and real-time messaging via WebSockets.",
          "Technologies: React.js, NestJS, MySQL, WebSockets, JWT, Ant Design"
        ]
      },
      {
        title: "Nxt Watch – Video Streaming Application",
        date: "2024",
        details: [
          "Video listing and playback with protected routes using JWT authentication and optimized rendering.",
          "Technologies: React.js, REST APIs, JWT, HTML5, CSS3"
        ]
      },
      {
        title: "Expense Tracker / Room Finance Management System",
        date: "2024",
        details: [
          "Backend APIs for expense tracking, settlements, and member activity with auth workflows.",
          "Technologies: NestJS, MySQL, REST APIs, JWT"
        ]
      }
    ]
  },
  {
    title: "Certifications & Awards",
    items: [
      {
        title: "MERN Stack Developer Program",
        organization: "NxtWave",
        date: "2024",
        details: [
          "Comprehensive full-stack web development certification covering React, Node.js, Express, and MongoDB."
        ]
      }
    ]
  }
];

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    handle: "b-neeraj-kumar",
    url: "https://www.linkedin.com/in/b-neeraj-kumar/",
    image: "https://i.pinimg.com/736x/b2/f8/28/b2f828513f21444829a619ce563d4d4e.jpg",
    subtext: "Let's connect professionally",
    color: "#0a66c2",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    handle: "Joy-Boy-999s",
    url: "https://github.com/Joy-Boy-999s",
    image: "https://i.pinimg.com/736x/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.jpg",
    subtext: "Check out my projects",
    color: "#8b5cf6",
    icon: "github",
  },
  {
    name: "Instagram",
    handle: "j.o.y___b.o.y",
    url: "https://www.instagram.com/j.o.y___b.o.y/",
    image: "https://i.pinimg.com/736x/19/42/d5/1942d5deb0f788e6228054cd92767ff6.jpg",
    subtext: "Behind the scenes",
    color: "#e1306c",
    icon: "instagram",
  },
  {
    name: "Email",
    handle: "b.neerajkumar.999",
    url: "mailto:b.neerajkumar.999@gmail.com",
    image: "https://i.pinimg.com/736x/19/42/d5/1942d5deb0f788e6228054cd92767ff6.jpg",
    subtext: "Drop me a message",
    color: "#10b981",
    icon: "mail",
  },
];

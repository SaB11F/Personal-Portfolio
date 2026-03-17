const portfolioContent = {
  hero: {
    name: "Rene Kolednik",
    title: "Full-Stack Software Engineer",
    subtitle: "MERN & AI systems builder focused on real products, not demos.",
    location: "Videm pri Ptuju, Slovenia",
    availability: "Open to software engineering opportunities",
    summary:
      "Full-stack engineer with hands-on experience shipping AI assistants, backend systems, and applied hardware-software products. Strong foundation in MERN development, RAG pipelines, and production-ready APIs.",
    ctas: [
      { label: "Email me", href: "mailto:rene.kolednik@gmail.com" },
      { label: "Call me", href: "tel:+386070244070" },
      { label: "GitHub", href: "https://github.com/SaB11F" },
    ],
    metrics: [
      { label: "AI assistant users", value: "1000+" },
      { label: "Patent secured", value: "#26655" },
      { label: "Top awards", value: "6x+" },
    ],
  },
  spotlight: [
    {
      eyebrow: "Current edge",
      title: "MERN foundations + AI systems thinking",
      text:
        "I bridge modern full-stack product work with retrieval systems, embeddings, and practical automation.",
    },
    {
      eyebrow: "What I build best",
      title: "Interfaces with backend muscle",
      text:
        "From interactive frontends to production REST APIs and database-backed workflows, I focus on systems that are actually usable.",
    },
  ],
  skills: [
    {
      group: "Frontend",
      summary: "Interactive interfaces built to feel polished and fast.",
      items: ["React", "JavaScript", "Responsive UI", "UX prototyping"],
    },
    {
      group: "Backend",
      summary: "Clean APIs and scalable application logic.",
      items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
    },
    {
      group: "AI Systems",
      summary: "Applied retrieval, embeddings, and assistant workflows.",
      items: ["OpenAI API", "LangChain", "RAG", "pgVector", "Pinecone"],
    },
    {
      group: "Deployment",
      summary: "Shipping and operating real software in production.",
      items: ["Docker", "Render", "System integration", "Hardware control"],
    },
  ],
  experience: [
    {
      company: "3Quite",
      role: "Junior Developer",
      period: "Jun 2024 - Apr 2025",
      impact:
        "Developed enterprise RAG systems for internal knowledge automation, designed embedding pipelines with OpenAI API and LangChain, implemented semantic search with PostgreSQL and pgVector, and built production REST APIs.",
    },
    {
      company: "ERSko",
      role: "AI / Full-Stack Developer",
      period: "Recent project",
      impact:
        "Built and deployed an AI-powered assistant used by 1000+ users, combining RAG architecture, OpenAI integrations, LangChain workflows, pgVector, and a MERN-based product surface.",
    },
    {
      company: "Modular Fogponic System",
      role: "Founder",
      period: "Product development",
      impact:
        "Founded and patented a modular fogponic growing system, designing the hardware architecture and integrating control software for automated plant cultivation.",
    },
    {
      company: "Sopkomat",
      role: "Software Contributor",
      period: "Applied systems project",
      impact:
        "Developed a smart vending machine workflow for bouquet sales, built a MERN-style admin surface, and integrated Raspberry Pi hardware control for real-time product management.",
    },
    {
      company: "Keuda, Finland",
      role: "Erasmus+ Technical Intern",
      period: "Internship",
      impact:
        "Provided IT support for a large institution, assisting with network management, system maintenance, and troubleshooting across an educational environment serving 10,000+ users.",
    },
    {
      company: "Smart Speed-Control Bump",
      role: "Embedded Systems Developer",
      period: "Computer vision project",
      impact:
        "Built an intelligent speed-control concept using computer vision and hardware actuation, linking real-time vehicle detection to backend control logic and mechanical infrastructure.",
    },
  ],
  projects: [
    {
      slug: "rag-assistant",
      title: "AI Knowledge Assistant",
      year: "2024",
      summary:
        "A production assistant built for real users with retrieval pipelines, semantic search, and enterprise-oriented knowledge automation.",
      stack: ["OpenAI API", "LangChain", "pgVector", "Node.js", "MERN"],
      outcome: "Used by 1000+ users and deployed in a real production setting.",
      accent: "purple",
    },
    {
      slug: "fogponic-system",
      title: "Modular Fogponic System",
      year: "Patent",
      summary:
        "A patented modular plant-growing system connecting electronics, control software, and product-grade hardware thinking.",
      stack: ["Embedded control", "Systems design", "Automation"],
      outcome: "Patent received under number 26655.",
      accent: "pink",
    },
    {
      slug: "sopkomat",
      title: "Sopkomat",
      year: "MERN",
      summary:
        "A smart vending workflow with an admin panel, live product management, and hardware integration through Raspberry Pi.",
      stack: ["MongoDB", "Express", "React", "Node.js", "Raspberry Pi"],
      outcome: "Merged software workflows with real-world device control.",
      accent: "navy",
    },
    {
      slug: "speed-bump",
      title: "Smart Speed-Control Bump",
      year: "CV + hardware",
      summary:
        "A computer vision experiment that linked vehicle detection to a responsive physical system with backend logic.",
      stack: ["OpenCV", "Computer vision", "Embedded systems"],
      outcome: "Showcased full-stack thinking beyond the browser.",
      accent: "purple",
    },
  ],
  achievements: [
    "Patent number 26655",
    "1st Place - ESA CanSat Slovenia",
    "1st Place - RoboCup Junior Soccer",
    "1st Place - Climate Detectives (ESA Program)",
    "2x Gold Award - National Young Researchers",
    "2x Gold Cankar Award - National Competition",
    "Silver Vegovo Award - National Competition",
  ],
  education: [
    {
      school: "Faculty of Information Studies (FIS), Novo Mesto",
      program: "Bachelor of Science in Computer Science and Web Technologies",
      period: "2026",
      note: "Enrolled in BSc in Computer Science.",
    },
    {
      school: "ERS Ptuj",
      program: "Computer Engineering Technician",
      period: "2022 - 2026",
      note: "Technical foundation in computer systems and engineering practice.",
    },
  ],
  languages: [
    { name: "Slovenian", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  contact: {
    email: "rene.kolednik@gmail.com",
    phone: "+386070244070",
    location: "Videm pri Ptuju, Slovenia",
  },
};

export default portfolioContent;

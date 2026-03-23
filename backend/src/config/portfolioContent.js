const portfolioContent = {
  hero: {
    name: "Rene Kolednik",
    title: "Full-Stack Software Engineer",
    subtitle: "MERN & AI systems builder focused on real products, not demos.",
    location: "Videm pri Ptuju, Slovenia",
    availability: "Open to software engineering opportunities",
    summary:
      "Full-stack software engineer with hands-on experience building production AI systems, scalable backend applications, and applied engineering products. Strong in MERN development, RAG architectures, pgVector, Pinecone, and enterprise AI integrations.",
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
      group: "Full Stack",
      summary:
        "React frontends, Node.js APIs, Express services, and database-backed product workflows.",
      items: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    {
      group: "AI Systems",
      summary:
        "RAG pipelines, OpenAI integrations, embeddings, vector search, and assistant orchestration.",
      items: ["OpenAI API", "LangChain", "RAG", "pgVector", "Pinecone"],
    },
    {
      group: "Embedded",
      summary:
        "Hardware control, Raspberry Pi integration, computer vision, and real-time applied systems.",
      items: ["Raspberry Pi", "OpenCV", "Computer vision", "Sensors", "Control logic"],
    },
    {
      group: "Deployment",
      summary:
        "Dockerized deployment, Render hosting, system integration, and production-ready delivery.",
      items: ["Docker", "Render", "System integration", "Hardware control"],
    },
  ],
  experience: [
    {
      company: "Šopkomat (Startup)",
      role: "Software Developer",
      period: "Mar 2025 - Jan 2026",
      meta: "Part-time · Ptuj, Slovenia · Hybrid",
      impact:
        "Contributed to development of a smart vending machine platform for automated bouquet sales, architecting a full-stack MERN solution and integrating backend systems with Raspberry Pi hardware for real-time device management.",
    },
    {
      company: "Keski-Uudenmaan koulutuskuntayhtyma Keuda",
      role: "IT Support Intern",
      period: "Aug 2024 - Oct 2024",
      meta: "Internship · Järvenpää, Uusimaa, Finland · On-site",
      impact:
        "Provided IT support within an educational institution serving 10,000+ users, assisting in network infrastructure maintenance, system configuration, device deployment, and day-to-day technical troubleshooting.",
    },
    {
      company: "3Quite",
      role: "Junior Developer",
      period: "Jul 2023 - Apr 2024",
      meta: "Part-time · Hybrid",
      impact:
        "Developed enterprise-grade RAG systems for internal knowledge automation, designing embedding pipelines with OpenAI API and LangChain, implementing semantic search with PostgreSQL and pgVector, and building production-ready REST APIs.",
    },
    {
      company: "Multimedija Ptuj",
      role: "Network Installation Assistant",
      period: "Jun 2022 - Aug 2022",
      meta: "Part-time · On-site",
      impact:
        "Assisted in deployment of optical fiber infrastructure, antenna installation, and network configuration during a summer engagement, contributing to on-site connectivity setup and technical implementation.",
    },
  ],
  projects: [
    {
      slug: "rag-assistant",
      title: "ERŠko",
      year: "2024",
      tag: "1000+ users",
      summary:
        "A production AI school assistant used by 1000+ students and staff for fast school information, support, and everyday questions. Built as a real proof of concept that turned AI into something practical and accessible inside the school environment.",
      stack: ["OpenAI API", "LangChain", "pgVector", "Node.js", "MERN"],
      outcome:
        "Production deployment for real users with enterprise-focused retrieval and knowledge automation.",
      accent: "purple",
    },
    {
      slug: "fogponic-system",
      title: "Fogponic Greenhouse",
      year: "Patent",
      tag: "Patented system",
      summary:
        "A patented modular fogponic greenhouse designed for efficient automated plant cultivation. It combined hardware architecture, environmental control, and practical system design into a real proof of concept.",
      stack: ["Embedded control", "Systems design", "Automation"],
      outcome:
        "Patent secured under number 26655 for the modular system and control concept.",
      accent: "pink",
    },
    {
      slug: "sopkomat",
      title: "Šopkomat",
      year: "MERN",
      tag: "Live vending machine",
      summary:
        "A smart bouquet vending machine built for real automated flower sales and pickup. It connected a MERN management app with Raspberry Pi hardware for live control, stock handling, and real-world operation.",
      stack: ["MongoDB", "Express", "React", "Node.js", "Raspberry Pi"],
      outcome:
        "Connected software workflows with live hardware control and real-world retail operations.",
      accent: "navy",
    },
    {
      slug: "speed-bump",
      title: "Smart Traffic",
      year: "CV + hardware",
      tag: "Vision-controlled",
      summary:
        "A vision-controlled traffic concept designed to detect approaching vehicles, measure speed, and trigger a responsive road obstacle. It brought together computer vision, sensing hardware, and physical actuation into one practical smart-street proof of concept.",
      stack: ["OpenCV", "Computer vision", "Embedded systems"],
      outcome:
        "Applied systems thinking across computer vision, backend logic, and physical response.",
      accent: "purple",
    },
    {
      slug: "esa-cansat",
      title: "ESA CanSat",
      year: "ESA",
      tag: "1st place ESA",
      summary:
        "Engineered a compact CanSat mission prototype with onboard sensing, telemetry, and real-time systems integration for the national ESA competition. After winning the Slovenian nationals, we advanced further to the European stage with the project.",
      stack: ["Embedded systems", "Telemetry", "Sensors", "Mission design"],
      outcome:
        "1st place in ESA CanSat Slovenia with a flight-ready concept and end-to-end mission execution.",
      accent: "navy",
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
      phase: "Phase I",
      school: "Osnovna šola Videm",
      program: "Early curiosity and first technical instincts.",
      period: "Elementary School",
      note:
        "This was where curiosity first took shape through computers, problem-solving, and the first real drive to understand how technology works.",
      tag: "Early Curiosity",
      icon: "lightbulb-on-outline",
      accent: "purple",
    },
    {
      phase: "Phase II",
      school: "Srednja elektro in računalniška šola Ptuj",
      program: "Technical foundation in engineering and software.",
      period: "2022 - 2026",
      note:
        "Technical high school gave that curiosity structure through programming, electronics, engineering logic, and the discipline of building real projects.",
      tag: "Technical Foundation",
      icon: "source-branch",
      accent: "navy",
    },
    {
      phase: "Phase III",
      school: "Fakulteta za informacijske študije Novo mesto",
      program: "Next chapter in computer science and systems growth.",
      period: "2026 -",
      note:
        "The next chapter is focused on scale, depth, and long-term growth in computer science, building on practical experience in software systems and AI.",
      tag: "Next Chapter",
      icon: "school-outline",
      accent: "pink",
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

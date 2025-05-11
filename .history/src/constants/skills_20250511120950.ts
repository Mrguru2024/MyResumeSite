import { Skill } from '@/types/skills';

export const skills: Skill[] = [
  // Full Stack Dev Skills
  {
    id: 'react',
    name: 'React',
    category: 'Full Stack Dev',
    proficiency: 90,
    description: 'Building modern, responsive web applications with React and Next.js',
    icon: '⚛️'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Full Stack Dev',
    proficiency: 85,
    description: 'Writing type-safe, maintainable code with TypeScript',
    icon: '📘'
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Full Stack Dev',
    proficiency: 80,
    description: 'Developing scalable backend services with Node.js and Express',
    icon: '🟢'
  },

  // Field Technician Skills
  {
    id: 'locksmith',
    name: 'Locksmithing',
    category: 'Field Technician',
    proficiency: 95,
    description: 'Expert in lock installation, repair, and security systems',
    icon: '🔑'
  },
  {
    id: 'security',
    name: 'Security Systems',
    category: 'Field Technician',
    proficiency: 90,
    description: 'Installation and maintenance of advanced security systems',
    icon: '🔒'
  },

  // Low Voltage Skills
  {
    id: 'networking',
    name: 'Networking',
    category: 'Low Voltage',
    proficiency: 85,
    description: 'Structured cabling and network infrastructure setup',
    icon: '🌐'
  },
  {
    id: 'av',
    name: 'A/V Systems',
    category: 'Low Voltage',
    proficiency: 80,
    description: 'Audio/Video system installation and configuration',
    icon: '🎥'
  },

  // Leadership Skills
  {
    id: 'team-lead',
    name: 'Team Leadership',
    category: 'Leadership',
    proficiency: 90,
    description: 'Leading and mentoring technical teams',
    icon: '👥'
  },
  {
    id: 'project-mgmt',
    name: 'Project Management',
    category: 'Leadership',
    proficiency: 85,
    description: 'Managing complex technical projects and timelines',
    icon: '📊'
  },

  // Repair Skills
  {
    id: 'electronics',
    name: 'Electronics Repair',
    category: 'Repair',
    proficiency: 95,
    description: 'Diagnosing and repairing electronic systems',
    icon: '🔧'
  },
  {
    id: 'mechanical',
    name: 'Mechanical Systems',
    category: 'Repair',
    proficiency: 90,
    description: 'Maintenance and repair of mechanical systems',
    icon: '⚙️'
  }
]; 
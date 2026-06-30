export interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
  demo: string;
}

export type MessageType = 'success' | 'error' | 'info' | 'warning' | '';

export interface MessageBoxState {
  show: boolean;
  type: MessageType;
  message: string;
}

export interface MessageBoxProps {
  message: string;
  type: MessageType;
  onClose: () => void;
  duration?: number;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

// types.ts
export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: 'Stage' | 'Mission' | 'Formation' | 'Certification' | 'Projet';
  description: string;
  technologies: string[];
  icon: React.ReactElement;
  achievements: string[];
}
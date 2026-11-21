// French versions of the experiences defined in app/constants (keyed by experience id).
// Fields left out fall back to the English value.
import { Experience } from '@/app/types';

type ExperienceText = Partial<Pick<Experience, 'title' | 'company' | 'location' | 'period' | 'duration' | 'description' | 'technologies' | 'achievements'>>;

export const experiencesFr: Record<number, ExperienceText> = {
  12: {
    title: "MASO – Modélisation d'Authentification et de Source Originale",
    company: "Hackathon FANILO – Ambassade de France",
    period: 'Novembre 2026',
    description: "Hackathon FANILO organisé par l'Ambassade de France (42 Antananarivo). MASO est une PWA et une plateforme web qui aide les journalistes malgaches à vérifier un contenu suspect, documenter leurs vérifications et publier des rapports fiables, même hors connexion.",
    achievements: [
      'Prototype fonctionnel déployé en ligne, 8 modules livrés et testés',
      'Analyse image, lien, texte et vidéo avec indices sourcés',
      'Circuit de validation journaliste → fact-checker → rédacteur en chef',
      'Mode hors connexion et interface FR / MG / EN',
      'Attestation de participation',
    ],
  },
  8: {
    title: 'Stage de réalisation – Développement',
    period: 'Août 2026 - Novembre 2026',
    duration: '4 mois',
    description: "Stage de fin d'études en agence digitale : conception et développement d'i-Rindra, une plateforme de gestion de projets assistée par l'IA pour l'agence (projets, tâches Kanban, équipe, clients, espace client cloisonné, notifications).",
    achievements: [
      "Développement fullstack d'i-Rindra (backend FastAPI + frontend React)",
      'Authentification par rôles : admin, direction, équipe, client',
      'Tableau Kanban, jalons, fichiers, tableau de bord et notifications',
      "Assistant IA intégré via une API de LLM",
      'Attestation de stage Bienfe Agency',
    ],
  },
  14: {
    title: "Licence – Développement d'Applications Internet et Intranet",
    period: '2023 - 13 novembre 2026',
    duration: '3 ans',
    description: "Licence en Développement d'Applications Internet et Intranet, obtenue le 13 novembre 2026.",
    technologies: ['Web', 'Mobile', 'Bases de données', 'Génie logiciel'],
    achievements: [
      'Licence obtenue le 13 novembre 2026',
      "Stage de fin d'études chez Bienfe Agency (i-Rindra)",
    ],
  },
  9: {
    title: 'MIANARA – Plateforme web pour les candidats au bac',
    period: 'Octobre 2026',
    description: "Application web dédiée aux élèves en phase de baccalauréat, réalisée lors du Science Hack Day organisé par le CIDST.",
    achievements: ['Plateforme web pour aider les candidats au bac à réviser', 'Attestation de participation'],
  },
  10: {
    period: 'Juin 2026',
    description: "Participation à l'EMIHACK, le hackathon de l'EMIT Fianarantsoa, avec UrbanFlow AI, un projet smart city basé sur l'IA.",
    achievements: ["Solution urbaine basée sur l'IA prototypée en équipe", 'Attestation de participation'],
  },
  11: {
    title: 'Plateforme de signalement urbain',
    period: 'Mai 2026',
    description: 'Plateforme permettant aux citoyens de signaler les problèmes urbains, réalisée lors du hackathon Fianara SmartCity organisé par Youth Computing Fianarantsoa.',
    achievements: [
      'Analyse des besoins',
      'Développement backend (Spring Boot) et frontend (React)',
      'Conception de la base de données PostgreSQL',
    ],
  },
  13: {
    title: "ExamPrep – Application chronométrée de préparation aux examens",
    company: 'Projet académique – EMIT',
    period: 'Juin 2026',
    description: "Application mobile multiplateforme avec tests chronométrés, fiches de révision et suivi de progression pour les étudiants et enseignants de l'EMIT.",
    achievements: [
      'Analyse des besoins et maquettage',
      'Développement mobile avec Flutter',
      'Base de données et authentification Supabase',
    ],
  },
  4: {
    title: 'Formation Linux',
    company: 'Centre de formation',
    period: 'Mai 2026',
    duration: '1 mois',
    description: "Formation approfondie à l'environnement Linux : administration système, ligne de commande, scripts bash et gestion de serveurs.",
    technologies: ['Linux', 'Bash', 'Scripts Shell', 'Administration système'],
    achievements: [
      'Maîtrise de la ligne de commande Linux',
      'Écriture de scripts Bash',
      'Administration de serveurs Linux',
      'Configuration et gestion des services',
    ],
  },
  3: {
    title: "Formation d'anglais",
    period: 'Novembre 2025 - Janvier 2026',
    duration: '3 mois',
    description: "Formation en anglais professionnel et technique à l'ITTI Mahajanga : communication, rédaction technique et vocabulaire informatique.",
    technologies: ['Anglais', 'Communication', 'Anglais des affaires', 'Anglais technique'],
    achievements: [
      'Amélioration de la communication en anglais',
      "Maîtrise de l'anglais technique et professionnel",
      'Rédaction de documents techniques en anglais',
      'Préparation aux certifications internationales',
    ],
  },
  1: {
    title: 'Stage – Gestion de stock et de vente pharmaceutique',
    company: 'Centre Hospitalier Universitaire (CHU) de Fianarantsoa',
    period: '16 juin 2025 - 16 août 2025',
    duration: '2 mois',
    description: "Développement d'un système de gestion de stock et de vente pharmaceutique pour suivre les entrées et sorties de produits, gérer les commandes et optimiser l'inventaire.",
    achievements: [
      "Conception et développement d'une interface intuitive avec Vue.js",
      "Mise en place d'une API REST avec Laravel",
      'Gestion des données avec MySQL',
      'Suivi des stocks en temps réel',
      'Optimisation des performances et de la sécurité',
    ],
  },
  2: {
    title: 'Application de gestion des étudiants',
    company: 'Mission freelance',
    period: 'Septembre 2025',
    duration: '1 mois',
    description: "Développement d'une application de gestion des étudiants en C# WinForm : inscriptions, notes et absences.",
    achievements: [
      "Développement d'une interface WinForm",
      'Gestion des étudiants, des cours et des notes',
      'Génération de rapports et de statistiques',
      'SQL Server pour la persistance des données',
    ],
  },
  7: {
    title: 'Certification numérique Pix',
    location: 'En ligne',
    period: 'Février 2024',
    description: 'Obtention de la certification Pix, qui valide les compétences numériques dans plusieurs domaines.',
    technologies: ['Compétences numériques', 'Pix'],
    achievements: [
      'Validation des compétences numériques Pix',
      'Certification officielle obtenue',
      "Compétences en traitement de l'information et communication",
    ],
  },
  5: {
    title: 'Diplôme DELF B2',
    period: 'Septembre 2022',
    description: "Obtention du Diplôme d'Études en Langue Française (DELF) niveau B2, qui atteste d'un niveau avancé en français.",
    technologies: ['Français', 'Compréhension', 'Expression', 'Communication'],
    achievements: [
      "Certification officielle DELF B2 de l'Alliance Française",
      'Compréhension orale et écrite',
      'Expression orale et écrite en français',
      'Niveau avancé de maîtrise du français',
    ],
  },
  6: {
    title: "Certificat d'anglais et de français",
    company: 'Centre de formation',
    period: 'Août - Septembre 2018',
    duration: '2 mois',
    description: "Certificat d'anglais et de français attestant des compétences linguistiques dans les deux langues.",
    technologies: ['Anglais', 'Français', 'Bilingue'],
    achievements: [
      "Certification en anglais et en français",
      'Communication bilingue',
      'Maîtrise des deux langues',
    ],
  },
};

export const localizeExperience = (exp: Experience, lang: 'en' | 'fr'): Experience =>
  lang === 'fr' ? { ...exp, ...experiencesFr[exp.id] } : exp;

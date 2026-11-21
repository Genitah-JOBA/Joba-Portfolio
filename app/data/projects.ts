// Single source of truth for every project: cards, "all projects" list and case-study pages.
import { Lang } from '@/app/i18n/dictionary';

type L = Record<Lang, string>;
type LList = Record<Lang, string[]>;

export interface ProjectCase {
  id: number;
  slug: string;
  title: string;
  category: 'Fullstack' | 'Frontend' | 'Mobile';
  featured?: boolean;
  image: string;
  coverFit?: 'contain'; // for logos: show the whole image on the cover color
  coverColor?: string;
  gallery?: string[];
  tags: string[];
  year?: string;
  kind: L;        // hackathon, internship, personal project...
  role: L;
  tagline: L;
  desc: L;        // short card description
  context: LList; // paragraphs
  approach: LList;
  features: LList;
}

export const projectCases: ProjectCase[] = [
  {
    id: 11,
    slug: 'i-rindra',
    title: 'i-Rindra',
    category: 'Fullstack',
    featured: true,
    image: '/irindra.png',
    coverFit: 'contain',
    coverColor: '#0c2340',
    gallery:['/projects/i-rindra/use-cases.png'],
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Tailwind', 'JWT', 'AI'],
    year: '2026',
    kind: { en: 'Internship — Bienfe Agency', fr: 'Stage — Bienfe Agency' },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'AI-assisted project management for a digital agency.',
      fr: "La gestion de projets d'agence, assistée par l'IA.",
    },
    desc: {
      en: 'AI-assisted project management platform built during my internship at Bienfe Agency: projects and Kanban tasks, team and client management, isolated client space, notifications, AI assistant and role-based authentication.',
      fr: "Plateforme de gestion de projets assistée par l'IA réalisée pendant mon stage chez Bienfe Agency : projets et tâches en Kanban, équipe et clients, espace client cloisonné, notifications, assistant IA et authentification par rôles.",
    },
    context: {
      en: [
        'Bienfe Agency is a digital agency in Antananarivo that runs many client projects in parallel, with developers, designers and managers working together.',
        'The agency needed one place to follow every project, assign tasks, keep clients informed and protect financial information — instead of scattered spreadsheets and messages.',
      ],
      fr: [
        "Bienfe Agency est une agence digitale d'Antananarivo qui mène de nombreux projets clients en parallèle, avec des développeurs, des graphistes et une direction.",
        "L'agence avait besoin d'un outil unique pour suivre chaque projet, affecter les tâches, informer les clients et protéger les données financières, au lieu de tableurs et de messages dispersés.",
      ],
    },
    approach: {
      en: [
        'Four roles with clear rights: admin (including finance), management (everything but money), team members with their trade, and clients.',
        'A Kanban board (To do / In progress / In review / Done) with assignment, priority and due dates.',
        'A client space that only shows the client its own project.',
        'An AI assistant connected to an LLM API to help the team day to day.',
      ],
      fr: [
        'Quatre rôles aux droits clairs : admin (finance comprise), direction (tout sauf l’argent), membres de l’équipe avec leur métier, et clients.',
        'Un tableau Kanban (À faire / En cours / En revue / Terminé) avec affectation, priorité et échéance.',
        'Un espace client qui ne montre au client que son propre projet.',
        'Un assistant IA relié à une API de LLM pour aider l’équipe au quotidien.',
      ],
    },
    features: {
      en: ['Projects with computed progress and health status', 'Milestones and file attachments', 'Dashboard with indicators and alerts', 'Notifications on new projects, assignments and task progress', 'JWT authentication (FastAPI, async SQLAlchemy, PostgreSQL)'],
      fr: ['Projets avec avancement calculé et statut de santé', 'Jalons et pièces jointes', 'Tableau de bord avec indicateurs et alertes', 'Notifications : nouveau projet, affectation, avancement des tâches', 'Authentification JWT (FastAPI, SQLAlchemy async, PostgreSQL)'],
    },
  },
  {
    id: 12,
    slug: 'maso',
    title: 'MASO',
    category: 'Fullstack',
    featured: true,
    image: '/maso.png',
    gallery: [
      '/projects/maso/circuit-1-analyse-journaliste.png',
      '/projects/maso/circuit-3-redacteur-en-chef.png',
      '/projects/maso/circuit-4-rapport-public.png',
      '/projects/maso/mod01-web-verifier-sombre.png',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'FastAPI', 'PWA', 'Vercel'],
    year: '2026',
    kind: { en: 'Hackathon FANILO — French Embassy', fr: "Hackathon FANILO — Ambassade de France" },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'Helping Malagasy journalists verify suspicious content — even offline.',
      fr: 'Aider les journalistes malgaches à vérifier un contenu suspect, même hors connexion.',
    },
    desc: {
      en: 'Fact-checking PWA and web platform for Malagasy journalists, built at the FANILO 2026 hackathon: content analysis, verification workflow up to the editor-in-chief, signed public reports, offline mode, FR / MG / EN.',
      fr: "PWA et plateforme web de fact-checking pour les journalistes malgaches, réalisée au hackathon FANILO 2026 : analyse de contenus, circuit de validation jusqu'au rédacteur en chef, rapports publics signés, mode hors connexion, FR / MG / EN.",
    },
    context: {
      en: [
        'Old photos presented as recent, videos from another country, fake figures, AI-generated content: in Madagascar this content spreads on Facebook, WhatsApp and TikTok, in Malagasy and French.',
        'Journalists have scattered tools mostly in English, little access to experts and official figures, an unstable connection and no traceability of their checks.',
      ],
      fr: [
        "Photos anciennes présentées comme récentes, vidéos d'un autre pays, chiffres truqués, contenus générés par IA : à Madagascar, ces contenus circulent sur Facebook, WhatsApp et TikTok, en malgache et en français.",
        "Les journalistes ont des outils dispersés et en anglais, peu d'accès aux experts et aux chiffres officiels, une connexion instable et aucune traçabilité de leurs vérifications.",
      ],
    },
    approach: {
      en: [
        'One interface for mobile (installable PWA) and web.',
        'The tool gives clues, professionals decide: no AI ever gives the verdict.',
        'A full circuit: receive → analyse → document → human verdict → editor-in-chief validation → public report.',
      ],
      fr: [
        'Une seule interface pour le mobile (PWA installable) et le web.',
        "L'outil fournit des indices, les professionnels décident : aucune IA ne rend de verdict.",
        'Un circuit complet : recevoir → analyser → documenter → verdict humain → validation du rédacteur en chef → rapport public.',
      ],
    },
    features: {
      en: ['Image, link, text and video analysis with sourced clues', 'Journalist → fact-checker → editor-in-chief workflow', 'Public portal, anonymous reporting and QR verification', 'Offline mode (cases, directory, statistics)', 'Interface in French, Malagasy and English, light and dark themes'],
      fr: ['Analyse image, lien, texte et vidéo avec indices sourcés', 'Circuit journaliste → fact-checker → rédacteur en chef', 'Portail public, signalement sans compte et vérification QR', 'Mode hors connexion (dossiers, annuaire, statistiques)', 'Interface en français, malgache et anglais, thèmes clair et sombre'],
    },
  },
  {
    id: 7,
    slug: 'smartcity',
    title: 'SmartCity',
    category: 'Fullstack',
    featured: true,
    image: '/smartcity.png',
    tags: ['React', 'Tailwind', 'Spring Boot', 'PostgreSQL'],
    year: '2026',
    kind: { en: 'Hackathon Fianara SmartCity', fr: 'Hackathon Fianara SmartCity' },
    role: { en: 'Analysis, backend & frontend', fr: 'Analyse, backend et frontend' },
    tagline: {
      en: 'Citizens report, the city acts.',
      fr: 'Les citoyens signalent, la ville agit.',
    },
    desc: {
      en: 'Urban issue reporting platform built during the Fianara SmartCity hackathon (Youth Computing Fianarantsoa): citizens report problems in their city and the municipality tracks their resolution.',
      fr: 'Plateforme de signalement urbain réalisée lors du hackathon Fianara SmartCity (Youth Computing Fianarantsoa) : les citoyens signalent les problèmes de leur ville et la commune suit leur résolution.',
    },
    context: {
      en: [
        'Potholes, broken lighting, waste: urban problems are often reported orally, then lost. Citizens never know whether anything was done.',
        'The Fianara SmartCity hackathon, organized by Youth Computing Fianarantsoa, challenged young developers to build a tool that brings citizens and the municipality closer.',
      ],
      fr: [
        "Nids-de-poule, éclairage en panne, déchets : les problèmes urbains sont souvent signalés à l'oral, puis oubliés. Les citoyens ne savent jamais si quelque chose a été fait.",
        'Le hackathon Fianara SmartCity, organisé par Youth Computing Fianarantsoa, invitait les jeunes développeurs à créer un outil qui rapproche les citoyens de la commune.',
      ],
    },
    approach: {
      en: [
        'Requirements analysis with the actors: citizens, agents by field, administrators.',
        'A Spring Boot REST API with a PostgreSQL database and a React interface.',
        'Full traceability of every report through its status history.',
      ],
      fr: [
        'Analyse des besoins avec les acteurs : citoyens, agents par domaine, administrateurs.',
        'Une API REST Spring Boot avec une base PostgreSQL et une interface React.',
        "Une traçabilité complète de chaque signalement grâce à l'historique des statuts.",
      ],
    },
    features: {
      en: ['Reports with photos and location', 'Assignment to agents according to their field', 'Proof of resolution and status history', 'Messages and notifications', 'Email account verification'],
      fr: ['Signalements avec photos et localisation', 'Affectation aux agents selon leur domaine', "Preuves de résolution et historique des statuts", 'Messagerie et notifications', 'Vérification du compte par e-mail'],
    },
  },
  {
    id: 1,
    slug: 'aura-privee',
    title: 'Aura Privée',
    category: 'Fullstack',
    featured: true,
    image: '/commerce1.jpg',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Node.js', 'Express', 'PostgreSQL', 'Vercel', 'Render', 'GitHub'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'High-end furniture, absolute comfort, timeless design.',
      fr: 'Mobilier haut de gamme, confort absolu, design intemporel.',
    },
    desc: {
      en: 'Aura Privée is an online boutique for high-end furniture and interior decoration, offering an exclusive collection of modern furniture combining absolute comfort and timeless design.',
      fr: 'Aura Privée est une boutique en ligne de mobilier haut de gamme et de décoration intérieure, avec une collection exclusive de meubles modernes alliant confort absolu et design intemporel.',
    },
    context: {
      en: ['A premium furniture brand needs an online shop that feels as refined as its products: elegant, smooth, and reassuring for customers making a large purchase.'],
      fr: ["Une marque de mobilier haut de gamme a besoin d'une boutique en ligne aussi raffinée que ses produits : élégante, fluide et rassurante pour des achats importants."],
    },
    approach: {
      en: ['A refined interface built with React, Tailwind CSS and Framer Motion animations.', 'A Node.js / Express API with a PostgreSQL database.', 'Frontend deployed on Vercel, backend on Render.'],
      fr: ['Une interface soignée avec React, Tailwind CSS et des animations Framer Motion.', 'Une API Node.js / Express avec une base PostgreSQL.', 'Frontend déployé sur Vercel, backend sur Render.'],
    },
    features: {
      en: ['Product catalogue', 'Shopping cart and orders', 'Customer accounts and order history', 'Admin dashboard and order management', 'Responsive design'],
      fr: ['Catalogue de produits', 'Panier et commandes', 'Comptes clients et historique des commandes', 'Tableau de bord administrateur et gestion des commandes', 'Design responsive'],
    },
  },
  {
    id: 2,
    slug: 'parent-malagasy',
    title: 'Parent Malagasy',
    category: 'Frontend',
    featured: true,
    image: '/monitor.jpg',
    gallery: ['/parentmalagasy.jpg'],
    tags: ['Vue.js', 'Tailwind', 'Framer Motion', 'Chart.js', 'LocalStorage', 'GitHub', 'Netlify'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Frontend developer', fr: 'Développeuse frontend' },
    tagline: {
      en: "Following your child's health and growth, from 0 to 12 years old.",
      fr: "Suivre la santé et la croissance de son enfant, de 0 à 12 ans.",
    },
    desc: {
      en: 'Parent Malagasy is a web-based parental monitoring application that allows parents to manage the health, growth, and development of their children from 0 to 12 years old. It offers personalized tracking with growth charts, a vaccination schedule, a budget calculator, and age-appropriate advice.',
      fr: "Parent Malagasy est une application web de suivi parental qui permet de gérer la santé, la croissance et le développement des enfants de 0 à 12 ans : courbes de croissance, calendrier vaccinal, calculateur de budget et conseils adaptés à l'âge.",
    },
    context: {
      en: ['Malagasy parents often keep health booklets, vaccination dates and expenses on paper. Parent Malagasy gathers this information in one simple, accessible tool.'],
      fr: ['Les parents malgaches gardent souvent carnets de santé, dates de vaccins et dépenses sur papier. Parent Malagasy réunit ces informations dans un outil simple et accessible.'],
    },
    approach: {
      en: ['A Vue.js application with no account needed: data stays in the browser (LocalStorage).', 'Clear charts with Chart.js to read growth at a glance.', 'Deployed on Netlify.'],
      fr: ['Une application Vue.js sans compte : les données restent dans le navigateur (LocalStorage).', 'Des graphiques clairs avec Chart.js pour lire la croissance en un coup d’œil.', 'Déployée sur Netlify.'],
    },
    features: {
      en: ['Growth charts', 'Vaccination schedule', 'Budget calculator', 'Advice by age'],
      fr: ['Courbes de croissance', 'Calendrier vaccinal', 'Calculateur de budget', "Conseils selon l'âge"],
    },
  },
  {
    id: 3,
    slug: 'examprep',
    title: 'ExamPrep',
    category: 'Mobile',
    featured: true,
    image: '/elearning.jpg',
    gallery: ['/ExamPrep1.png', '/ExamPrep2.png', '/ExamPrep3.png'],
    tags: ['Flutter', 'Dart', 'Supabase', 'GitHub'],
    year: '2026',
    kind: { en: 'Academic project — EMIT', fr: 'Projet académique — EMIT' },
    role: { en: 'Analysis, design & mobile development', fr: 'Analyse, maquettage et développement mobile' },
    tagline: {
      en: 'Timed exam preparation for EMIT students and teachers.',
      fr: "Préparation chronométrée aux examens pour les étudiants et enseignants de l'EMIT.",
    },
    desc: {
      en: 'ExamPrep is a multi-platform mobile exam preparation application that centralizes review sheets, timed tests and progress tracking for EMIT Fianarantsoa students and teachers.',
      fr: "ExamPrep est une application mobile multiplateforme de préparation aux examens qui centralise fiches de révision, tests chronométrés et suivi de progression pour les étudiants et enseignants de l'EMIT Fianarantsoa.",
    },
    context: {
      en: ['Revision material at EMIT was spread across notebooks, files and messages, and students had no way to measure their progress before exams.'],
      fr: ["À l'EMIT, les supports de révision étaient éparpillés entre cahiers, fichiers et messages, et les étudiants n'avaient aucun moyen de mesurer leur progression avant les examens."],
    },
    approach: {
      en: ['Requirements analysis and mockups with students and teachers.', 'A Flutter application for every platform from a single codebase.', 'Supabase for authentication and data.'],
      fr: ['Analyse des besoins et maquettes avec les étudiants et les enseignants.', 'Une application Flutter pour toutes les plateformes à partir d’un seul code.', 'Supabase pour l’authentification et les données.'],
    },
    features: {
      en: ['Student space: dashboard, review sheets, timed quizzes', 'AI-generated adaptive quizzes and AI study assistant', 'Progress tracking by subject', 'Teacher space: courses, subjects and student follow-up'],
      fr: ['Espace étudiant : tableau de bord, fiches, quiz chronométrés', "Quiz adaptatifs générés par IA et assistant de révision", 'Suivi de la progression par matière', 'Espace enseignant : cours, matières et suivi des étudiants'],
    },
  },
  {
    id: 9,
    slug: 'gestion-emit',
    title: 'Gestion Emit',
    category: 'Fullstack',
    image: '/gestionEmit.jpg',
    tags: ['React', 'Tailwind', 'ASP.NET', 'PostgreSQL'],
    kind: { en: 'Academic management app', fr: 'Application de gestion académique' },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'Academic years, timetables and exams in one place.',
      fr: 'Années académiques, emplois du temps et examens au même endroit.',
    },
    desc: {
      en: 'Gestion EMIT is a fullstack management web application for EMIT with role-based access: a full administration space for the owner and a limited space for the secretary.',
      fr: "Gestion EMIT est une application web fullstack de gestion pour l'EMIT avec accès par rôles : un espace d'administration complet pour le propriétaire et un espace limité pour la secrétaire.",
    },
    context: {
      en: ['A school administration juggles academic years, classes, rooms, timetables and exams. Gestion EMIT brings this organisation together and adapts what each user can do to their role.'],
      fr: ["L'administration d'une école jongle entre années académiques, classes, salles, emplois du temps et examens. Gestion EMIT réunit cette organisation et adapte les droits de chacun à son rôle."],
    },
    approach: {
      en: ['An ASP.NET Web API with Entity Framework migrations.', 'A React + Tailwind interface.', 'Two roles: owner (full administration) and secretary (limited access).'],
      fr: ['Une API ASP.NET avec migrations Entity Framework.', 'Une interface React + Tailwind.', 'Deux rôles : propriétaire (administration complète) et secrétaire (accès limité).'],
    },
    features: {
      en: ['Academic years and pedagogical structures', 'Timetables and sessions', 'Rooms management', 'Exams', 'Dashboard'],
      fr: ['Années académiques et structures pédagogiques', 'Emplois du temps et séances', 'Gestion des salles', 'Examens', 'Tableau de bord'],
    },
  },
  {
    id: 8,
    slug: 'nightblock',
    title: 'NightBlock',
    category: 'Fullstack',
    image: '/dj.jpg',
    tags: ['Angular', 'Tailwind', 'Laravel', 'PostgreSQL'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'Book the right DJ for your event.',
      fr: 'Réservez le bon DJ pour votre événement.',
    },
    desc: {
      en: 'NightBlock is a DJ booking platform: browse DJs and their services, check availability, book, pay and leave a review.',
      fr: 'NightBlock est une plateforme de réservation de DJ : parcourir les DJ et leurs prestations, vérifier les disponibilités, réserver, payer et laisser un avis.',
    },
    context: {
      en: ['Finding an available DJ for a wedding, a party or a corporate event often relies on word of mouth. NightBlock puts DJs, their services and their calendars online.'],
      fr: ["Trouver un DJ disponible pour un mariage, une soirée ou un événement d'entreprise repose souvent sur le bouche-à-oreille. NightBlock met en ligne les DJ, leurs prestations et leurs disponibilités."],
    },
    approach: {
      en: ['An Angular + Tailwind frontend.', 'A Laravel API with a PostgreSQL database.', 'A booking flow from search to invoice.'],
      fr: ['Un frontend Angular + Tailwind.', 'Une API Laravel avec une base PostgreSQL.', "Un parcours de réservation de la recherche jusqu'à la facture."],
    },
    features: {
      en: ['DJ profiles, services and event categories', 'Availability calendar', 'Bookings, payments and invoices', 'Reviews and favourites', 'Notifications'],
      fr: ['Profils de DJ, prestations et catégories d’événements', 'Calendrier des disponibilités', 'Réservations, paiements et factures', 'Avis et favoris', 'Notifications'],
    },
  },
  {
    id: 10,
    slug: 'terra-nova',
    title: 'Terra Nova',
    category: 'Fullstack',
    image: '/Terra.jpg',
    tags: ['HTML', 'CSS', 'Flask'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Fullstack developer', fr: 'Développeuse fullstack' },
    tagline: {
      en: 'Discover and book your next destination.',
      fr: 'Découvrez et réservez votre prochaine destination.',
    },
    desc: {
      en: 'Terra Nova is a travel website built with Flask: browse destinations, book a trip, save favourites and leave reviews, with an admin dashboard.',
      fr: 'Terra Nova est un site de voyage réalisé avec Flask : parcourir les destinations, réserver un séjour, enregistrer ses favoris et laisser un avis, avec un tableau de bord administrateur.',
    },
    context: {
      en: ['A travel agency wants to present its destinations with prices, duration and best season, and let travellers book online.'],
      fr: ["Une agence de voyage veut présenter ses destinations avec prix, durée et meilleure saison, et permettre aux voyageurs de réserver en ligne."],
    },
    approach: {
      en: ['A Python Flask application with SQLAlchemy and Flask-Login.', 'Server-rendered HTML / CSS templates.', 'A separate admin area to manage destinations and bookings.'],
      fr: ['Une application Python Flask avec SQLAlchemy et Flask-Login.', 'Des gabarits HTML / CSS rendus côté serveur.', 'Un espace administrateur séparé pour gérer destinations et réservations.'],
    },
    features: {
      en: ['Destinations with price, duration, season and rating', 'User accounts and bookings', 'Favourites and reviews', 'Admin dashboard'],
      fr: ['Destinations avec prix, durée, saison et note', 'Comptes utilisateurs et réservations', 'Favoris et avis', 'Tableau de bord administrateur'],
    },
  },
  {
    id: 13,
    slug: 'tanika',
    title: 'Tanika',
    category: 'Frontend',
    image: '/tanika.jpg',
    gallery: ['/projects/tanika/hero.webp', '/projects/tanika/atelier.webp', '/projects/tanika/boutique.webp'],
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    kind: { en: 'Showcase website (demo)', fr: 'Site vitrine (démonstration)' },
    role: { en: 'Design & frontend development', fr: 'Design et développement frontend' },
    tagline: {
      en: 'Clay, guided by the hand.',
      fr: 'La terre, guidée par la main.',
    },
    desc: {
      en: 'One-page showcase website for a contemporary ceramics workshop in Antananarivo (demo project): shop, workshops, custom tableware, FAQ, animated firing curve and local SEO with JSON-LD.',
      fr: "Site vitrine monopage d'un atelier de céramique contemporain à Antananarivo (projet de démonstration) : boutique, ateliers, vaisselle sur mesure, FAQ, courbe de cuisson animée et SEO local avec JSON-LD.",
    },
    context: {
      en: ['A ceramics workshop wants a site that feels as crafted as its pieces: presenting its story, selling its creations, filling its pottery classes and winning orders from restaurants and hotels.'],
      fr: ["Un atelier de céramique veut un site aussi soigné que ses pièces : raconter son histoire, vendre ses créations, remplir ses cours de poterie et décrocher des commandes de restaurants et d'hôtels."],
    },
    approach: {
      en: ['Vanilla HTML, CSS and JavaScript: no build, no framework, very fast.', 'Optimised WebP photos and an inline SVG icon sprite.', 'Local SEO: a single JSON-LD graph (store, courses, FAQ) and Open Graph image.'],
      fr: ['HTML, CSS et JavaScript natifs : aucun build, aucun framework, très rapide.', 'Photos WebP optimisées et sprite d’icônes SVG en ligne.', 'SEO local : un graphe JSON-LD unique (boutique, cours, FAQ) et image Open Graph.'],
    },
    features: {
      en: ['Animated counters and firing curve drawn on scroll', 'Shop with 6 pieces and 3 gift boxes', 'Workshops and custom tableware for professionals', 'FAQ and contact with map, WhatsApp, phone and email'],
      fr: ['Compteurs animés et courbe de cuisson dessinée au défilement', 'Boutique de 6 pièces et 3 coffrets', 'Ateliers et vaisselle sur mesure pour les professionnels', 'FAQ et contact avec carte, WhatsApp, téléphone et e-mail'],
    },
  },
  {
    id: 14,
    slug: 'port-de-la-lune',
    title: 'Port de la Lune',
    category: 'Frontend',
    image: '/port-de-la-lune.jpg',
    gallery: [
      '/projects/port-de-la-lune/chauffeur-vtc-bordeaux-accueil-1280.webp',
      '/projects/port-de-la-lune/transfert-aeroport-merignac-bagages.webp',
      '/projects/port-de-la-lune/chauffeur-prive-saint-emilion-degustation-800.webp',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
    kind: { en: 'Showcase website (fictional company)', fr: 'Site vitrine (entreprise fictive)' },
    role: { en: 'Design & frontend development', fr: 'Design et développement frontend' },
    tagline: {
      en: 'A private driver in Bordeaux — book fast, see the price straight away.',
      fr: 'Un chauffeur privé à Bordeaux : réserver vite, voir le prix tout de suite.',
    },
    desc: {
      en: 'Multi-page showcase website for a private driver in Bordeaux (fictional demo company): airport & station transfers, vineyard tours, fixed-price grid with price simulator and booking form.',
      fr: "Site vitrine multi-pages d'un chauffeur privé à Bordeaux (entreprise fictive de démonstration) : transferts aéroport et gare, vignobles, grille de prix fixes avec simulateur et formulaire de réservation.",
    },
    context: {
      en: ['An independent driver competes with ride-hailing apps. The site must be as clear as an app — instant price, quick booking — while keeping the human touch of a local driver.'],
      fr: ["Un chauffeur indépendant est en concurrence avec les applications de VTC. Le site doit être aussi clair qu'une appli — prix immédiat, réservation rapide — tout en gardant le côté humain d'un chauffeur local."],
    },
    approach: {
      en: ['Six static pages in vanilla HTML / CSS / JS, no build.', 'A "modern & dynamic" visual identity: white, light grey and a single electric blue.', 'Each page targets a local search (airport, vineyards, prices).'],
      fr: ['Six pages statiques en HTML / CSS / JS natifs, sans build.', 'Une identité « moderne et dynamique » : blanc, gris clair et un seul bleu électrique.', 'Chaque page cible une recherche locale (aéroport, vignobles, tarifs).'],
    },
    features: {
      en: ['Price simulator', 'Airport and train station transfers', 'Vineyards, weddings and events', 'Booking / quote form and mobile call bar'],
      fr: ['Simulateur de prix', 'Transferts aéroport et gare', 'Vignobles, mariages et événements', 'Formulaire de réservation / devis et barre d’appel mobile'],
    },
  },
  {
    id: 6,
    slug: 'auralis',
    title: 'Auralis',
    category: 'Frontend',
    image: '/music.jpg',
    gallery: ['/Auralis1.png', '/Auralis2.png'],
    tags: ['React', 'Vite', 'CSS'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Frontend developer', fr: 'Développeuse frontend' },
    tagline: {
      en: 'A music player inspired by Apple Music.',
      fr: 'Un lecteur de musique inspiré d’Apple Music.',
    },
    desc: {
      en: 'Auralis is a modern and elegant music player, built with React and Vite. It offers an intuitive user interface inspired by Apple Music, with a clean design and immersive visual effects.',
      fr: "Auralis est un lecteur de musique moderne et élégant, développé avec React et Vite. Son interface intuitive s'inspire d'Apple Music, avec un design épuré et des effets visuels immersifs.",
    },
    context: {
      en: ['A playground project to master React state, audio control and polished UI animation.'],
      fr: ["Un projet d'entraînement pour maîtriser l'état React, le contrôle audio et les animations d'interface soignées."],
    },
    approach: {
      en: ['React 18 with Vite.', 'Hand-written CSS with glassmorphism and background blur.', 'Custom SVG icons.'],
      fr: ['React 18 avec Vite.', 'CSS écrit à la main avec effet glassmorphisme et flou d’arrière-plan.', 'Icônes SVG personnalisées.'],
    },
    features: {
      en: ['Play, pause, next, previous, shuffle and repeat', 'Progress bar with time display', 'Likes and library drawer', 'Dynamic cover art', 'Responsive'],
      fr: ['Lecture, pause, suivant, précédent, aléatoire et répétition', 'Barre de progression avec affichage du temps', 'Likes et tiroir bibliothèque', 'Pochettes dynamiques', 'Responsive'],
    },
  },
  {
    id: 4,
    slug: 'modern-portfolio',
    title: 'Modern Portfolio',
    category: 'Frontend',
    image: '/portfolio.jpg',
    tags: ['Next.js', 'Tailwind', 'Framer'],
    year: '2025',
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Design & development', fr: 'Design et développement' },
    tagline: {
      en: 'The portfolio you are browsing right now.',
      fr: 'Le portfolio que vous êtes en train de parcourir.',
    },
    desc: {
      en: '3D portfolio with animations, built with Next.js, Tailwind CSS and Framer Motion, deployed on Vercel.',
      fr: 'Portfolio 3D animé, développé avec Next.js, Tailwind CSS et Framer Motion, déployé sur Vercel.',
    },
    context: {
      en: ['A showcase of my journey, skills and projects, designed to be fast, animated and readable on every screen.'],
      fr: ['Une vitrine de mon parcours, de mes compétences et de mes projets, pensée pour être rapide, animée et lisible sur tous les écrans.'],
    },
    approach: {
      en: ['Next.js App Router and Tailwind CSS.', 'Framer Motion for 3D and scroll animations.', 'Light / dark themes and English / French versions.'],
      fr: ['Next.js App Router et Tailwind CSS.', 'Framer Motion pour les animations 3D et au défilement.', 'Thèmes clair / sombre et versions anglaise / française.'],
    },
    features: {
      en: ['Animated timeline of my journey', 'Case study page for every project', 'Built-in CV viewer', 'Contact form'],
      fr: ['Frise animée de mon parcours', 'Page étude de cas pour chaque projet', 'Visionneuse de CV intégrée', 'Formulaire de contact'],
    },
  },
  {
    id: 5,
    slug: 'invitation-anniversaire',
    title: 'Invitation Anniversaire',
    category: 'Frontend',
    image: '/Birthday.jpg',
    gallery: ['/Anniversaire.jpg'],
    tags: ['HTML', 'CSS', 'JavaScript', 'Countdown'],
    kind: { en: 'Personal project', fr: 'Projet personnel' },
    role: { en: 'Frontend developer', fr: 'Développeuse frontend' },
    tagline: {
      en: 'An invitation that counts down to the party.',
      fr: 'Une invitation qui compte les jours jusqu’à la fête.',
    },
    desc: {
      en: 'Interactive birthday party invitation with a live countdown.',
      fr: "Invitation interactive avec compte à rebours pour fête d'anniversaire.",
    },
    context: {
      en: ['A paper invitation gets lost; a link is shared in a second. This interactive invitation gives guests every detail and builds excitement until the big day.'],
      fr: ["Une invitation papier se perd, un lien se partage en une seconde. Cette invitation interactive donne toutes les informations aux invités et fait monter l'impatience jusqu'au jour J."],
    },
    approach: {
      en: ['Vanilla HTML, CSS and JavaScript.', 'Hosted on GitHub Pages.'],
      fr: ['HTML, CSS et JavaScript natifs.', 'Hébergée sur GitHub Pages.'],
    },
    features: {
      en: ['Live countdown', 'Event details', 'Festive animations', 'Responsive'],
      fr: ['Compte à rebours en direct', "Informations sur l'événement", 'Animations festives', 'Responsive'],
    },
  },
];

export const featuredProjects = projectCases.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) => projectCases.find((p) => p.slug === slug);

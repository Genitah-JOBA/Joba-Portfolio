'use client';

import { motion } from 'framer-motion';
import { ACCENT_COLOR, TEXT_COLOR, skillCategories } from '@/app/constants';
import { 
  Binary, 
  Layout, 
  Database, 
  Cloud,
  Braces,
  ArrowUp,
  Paintbrush,
  Server,
  Coffee,
  Gem,
  GitBranch,
  Globe,
  Layers,
  Package,
  Code,
  Terminal,
  Box,
  Laptop,
  AppWindow,
  Workflow,
  GitPullRequest,
  Container,
  LucideIcon
} from 'lucide-react';

/**
 * Interface pour un nœud de l'arbre des compétences
 */
interface SkillNode {
  name: string;
  icon: LucideIcon;
  level?: number;
  children?: SkillNode[];
}

/**
 * Map des icônes par nom de compétence
 * Utilisé pour associer chaque compétence à une icône Lucide
 */
const skillIconMap: Record<string, LucideIcon> = {
  'HTML': Layout,
  'CSS': Paintbrush,
  'JavaScript': Braces,
  'React': Braces,
  'Next.js': ArrowUp,
  'Tailwind': Paintbrush,
  'Vue.js': Globe,
  'Angular': Layout,
  'Node.js': Coffee,
  'Express': Server,
  'Laravel': Code,
  'Java': Terminal,
  'Python': Terminal,
  'C#': Gem,
  'Spring Boot': Server,
  'ASP.Net': Server,
  'MySQL': Database,
  'PostgreSQL': Database,
  'Supabase': Database,
  'Firebase': Database,
  'GitHub': GitBranch,
  'Git': GitBranch,
  'Git Bash': Terminal,
  'Vercel': Cloud,
  'Render': Cloud,
  'Netlify': Cloud,
};

/**
 * Map des icônes par catégorie
 */
const categoryIconMap: Record<string, LucideIcon> = {
  'Frontend': Layout,
  'Backend': Server,
  'Databases': Database,
  'DevOps & Tools': Cloud,
};

/**
 * Fonction pour construire l'arbre des compétences à partir des données constants
 * @returns {SkillNode} L'arbre des compétences
 */
const buildSkillTree = (): SkillNode => {
  // Récupérer les catégories et leurs compétences
  const categories = skillCategories.map(cat => ({
    name: cat.title,
    icon: categoryIconMap[cat.title] || Layout,
    level: Math.round(cat.skills.reduce((acc, s) => acc + s.level, 0) / cat.skills.length),
    children: cat.skills.map(skill => ({
      name: skill.name,
      icon: skillIconMap[skill.name] || Code,
      level: skill.level,
    }))
  }));

  // Calculer le niveau moyen global
  const allLevels = categories.flatMap(cat => cat.children.map(s => s.level || 0));
  const averageLevel = Math.round(allLevels.reduce((acc, l) => acc + l, 0) / allLevels.length);

  return {
    name: "Fullstack",
    icon: Binary,
    level: averageLevel,
    children: categories
  };
};

/**
 * Composant SkillsSection - Style Tree
 * Affiche les compétences comme un arbre généalogique avec des icônes Lucide
 * Utilise les données de skillCategories depuis constants
 */
export const SkillsSection = () => {
  // Construction de l'arbre à partir des constants
  const skillTree = buildSkillTree();

  /**
   * RenderTree - Fonction récursive pour afficher l'arbre des compétences
   * @param node - Le nœud actuel à afficher
   * @param level - Le niveau de profondeur dans l'arbre
   * @param index - L'index du nœud dans son niveau
   */
  const renderTree = (node: SkillNode, level: number = 0, index: number = 0) => {
    const isRoot = level === 0;
    const isCategory = level === 1;
    const size = isRoot ? "w-20 h-20" : isCategory ? "w-16 h-16" : "w-12 h-12";
    const iconSize = isRoot ? 36 : isCategory ? 28 : 20;
    const padding = isRoot ? "p-6" : isCategory ? "p-4" : "p-3";
    const width = isRoot ? "w-36" : isCategory ? "w-28" : "w-24";
    const textSize = isRoot ? "text-xl" : isCategory ? "text-base" : "text-sm";
    const NodeIcon = node.icon;

    return (
      <div key={`${node.name}-${level}`} className="flex flex-col items-center">
        {/* Ligne verticale */}
        {level > 0 && (
          <div className="h-8 w-px" style={{ backgroundColor: `${ACCENT_COLOR}30` }} />
        )}

        {/* Nœud */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: level * 0.1 + index * 0.05, type: "spring" }}
          className="relative group"
        >
          <div
            className={`${padding} ${width} rounded-2xl border text-center transition-all duration-300 hover:-translate-y-1`}
            style={{
              backgroundColor: `${ACCENT_COLOR}${isRoot ? 20 : isCategory ? 15 : 10}`,
              borderColor: `${ACCENT_COLOR}${isRoot ? 40 : isCategory ? 30 : 20}`,
            }}
          >
            {/* Icône */}
            <div 
              className={`${size} mx-auto rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
              style={{
                backgroundColor: `${ACCENT_COLOR}${isRoot ? 20 : 10}`,
              }}
            >
              <NodeIcon size={iconSize} style={{ color: ACCENT_COLOR }} strokeWidth={1.5} />
            </div>
            
            {/* Nom */}
            <p className={`font-bold ${textSize} mt-2`}>
              {node.name}
            </p>
            
            {/* Niveau */}
            {node.level !== undefined && (
              <motion.p 
                className="text-xs font-mono"
                style={{ color: ACCENT_COLOR }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + level * 0.1 + index * 0.05 }}
              >
                {node.level}%
              </motion.p>
            )}

            {/* Effet de glow au hover */}
            <motion.div
              className="absolute -inset-1 rounded-2xl pointer-events-none"
              style={{ 
                background: `radial-gradient(circle at 50% 50%, ${ACCENT_COLOR}15, transparent 70%)`,
                opacity: 0,
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Lignes de connexion vers les enfants */}
          {node.children && node.children.length > 0 && (
            <div className="flex justify-center gap-8 mt-4">
              <div className="w-px h-8" style={{ backgroundColor: `${ACCENT_COLOR}20` }} />
            </div>
          )}
        </motion.div>

        {/* Enfants */}
        {node.children && node.children.length > 0 && (
          <div className={`flex ${level === 0 ? 'gap-12' : 'gap-6'} mt-4 flex-wrap justify-center`}>
            {node.children.map((child: SkillNode, i: number) => (
              <div key={i} className="flex flex-col items-center">
                {renderTree(child, level + 1, i)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-6 py-2 rounded-full mb-4 border"
            style={{ borderColor: `${ACCENT_COLOR}30` }}
          >
            <span className="text-sm" style={{ color: ACCENT_COLOR }}>
              ✦ MY SKILL ✦
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            Creativity & {" "}
            <span 
              className="text-transparent bg-clip-text" 
              style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT_COLOR}, ${ACCENT_COLOR}80)` }}
            >
              Expertise
            </span>
          </h2>
          <p className="text-white/50 mt-4">Hierarchy of my technical expertise</p>
        </motion.div>

        {/* Arbre */}
        <div className="flex justify-center overflow-x-auto p-4">
          {renderTree(skillTree)}
        </div>

        {/* Légende */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-12 text-xs text-white/40"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}40` }} />
            <span>Root</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}25` }} />
            <span>Category</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `${ACCENT_COLOR}15` }} />
            <span>Technology</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
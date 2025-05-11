'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill, SkillCategory } from '@/types/skills';
import { skills } from '@/constants/skills';
import { fadeInUp, staggerContainer } from '@/utils/animations';

const categories: SkillCategory[] = [
  'Full Stack Dev',
  'Field Technician',
  'Low Voltage',
  'Leadership',
  'Repair'
];

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 relative overflow-hidden"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{skill.icon}</span>
          <h3 className="text-xl font-semibold">{skill.name}</h3>
        </div>
        <span className="text-sm text-gray-400">{skill.proficiency}%</span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-gray-900/95 p-6 flex items-center justify-center"
          >
            <p className="text-gray-300 text-center">{skill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <motion.button
          key="all"
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'All'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 
export type SkillCategory =
  | "Full Stack Dev"
  | "Field Technician"
  | "Low Voltage"
  | "Leadership"
  | "Repair";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  description: string;
  icon?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

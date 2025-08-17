import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ---- Course Types ----
export interface Lesson {
  title: string;
  title1?: string;
  objectives: string[];
  content: string[];
  practical: string;
  assessments: {
    icon: any;
    label: string;
  }[];
  type: "theory" | "practical" | "assessment";
}

export interface Course {
  id: string;
  name: string;
  description: string;
  weeks: number;
  lessons: Record<number, Lesson>;
  stats: {
    classes: number;
    weeks: number;
    categories: number;
    exercises: string;
  };
  gradient?: string; 
  icon: IconDefinition;
  modules: number;
  hours: number;
  category: string;
}

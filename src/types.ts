export interface Session {
  id: string;
  name: string;
  type: 'strength' | 'hypertrophy' | 'intensity' | 'recovery';
  duration: number;
  exercises: string[];
  lastDate?: string;
  image?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  lastWeight?: number;
  image?: string;
}

export interface SetEntry {
  set: number;
  weight: number;
  reps: number;
}

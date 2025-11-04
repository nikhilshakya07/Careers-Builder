// Company types based on simplified schema

export interface Company {
  id: string;
  slug: string;
  name: string | null;
  theme: Theme;
  sections: Section[];
  jobs: Job[];
  created_at: string;
  updated_at: string;
}

export interface Theme {
  primary?: string;
  secondary?: string;
  accent?: string;
  logo?: string;
  banner?: string;
  video?: string;
}

export interface Section {
  id: string;
  type: 'about' | 'life' | 'benefits' | 'values' | 'culture' | 'team' | 'custom';
  title: string;
  content: string | Record<string, unknown>;
  order: number;
  is_visible: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  job_type: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  department?: string;
  requirements?: string[];
  benefits?: string[];
  is_active?: boolean;
}


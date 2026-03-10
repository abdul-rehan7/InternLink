import type { Database } from '@/integrations/supabase/types';

export type Department = Database['public']['Enums']['department_type'];

export const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Marketing',
  'Finance',
  'Data Science',
  'Design',
  'Human Resources',
  'Law',
  'Medicine',
  'Architecture',
  'Environmental Science',
  'Other',
];

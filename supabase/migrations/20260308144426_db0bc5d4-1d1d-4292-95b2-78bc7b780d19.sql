
-- Create department enum
CREATE TYPE public.department_type AS ENUM (
  'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 
  'Civil Engineering', 'Business Administration', 'Marketing', 
  'Finance', 'Data Science', 'Design', 'Human Resources',
  'Law', 'Medicine', 'Architecture', 'Environmental Science', 'Other'
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  university TEXT NOT NULL,
  department department_type NOT NULL,
  semester INTEGER NOT NULL CHECK (semester >= 1 AND semester <= 8),
  city TEXT NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Create internships table
CREATE TABLE public.internships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  location_type TEXT NOT NULL DEFAULT 'Local' CHECK (location_type IN ('Local', 'Abroad')),
  department department_type NOT NULL,
  description TEXT,
  stipend TEXT,
  duration TEXT,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view internships" ON public.internships FOR SELECT TO authenticated USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed internship data
INSERT INTO public.internships (title, company, location, location_type, department, description, stipend, duration) VALUES
('Software Engineering Intern', 'TechVista Labs', 'Lahore', 'Local', 'Computer Science', 'Build scalable web applications using React and Node.js', 'PKR 50,000/mo', '3 months'),
('Data Analytics Intern', 'DataPulse Inc.', 'Karachi', 'Local', 'Data Science', 'Analyze large datasets and build dashboards', 'PKR 45,000/mo', '6 months'),
('Marketing Strategy Intern', 'BrandSphere', 'Dubai', 'Abroad', 'Marketing', 'Develop go-to-market strategies for MENA region', 'AED 3,000/mo', '4 months'),
('UI/UX Design Intern', 'PixelCraft Studio', 'Islamabad', 'Local', 'Design', 'Design user interfaces for mobile and web apps', 'PKR 40,000/mo', '3 months'),
('Financial Analyst Intern', 'CapitalEdge', 'London', 'Abroad', 'Finance', 'Support equity research and financial modeling', 'GBP 1,500/mo', '6 months'),
('Civil Engineering Intern', 'StructuraPro', 'Lahore', 'Local', 'Civil Engineering', 'Assist in structural analysis and site inspections', 'PKR 35,000/mo', '3 months'),
('Machine Learning Intern', 'NeuralWave AI', 'San Francisco', 'Abroad', 'Computer Science', 'Train and deploy ML models in production', 'USD 4,000/mo', '6 months'),
('HR Operations Intern', 'PeopleFirst Co.', 'Karachi', 'Local', 'Human Resources', 'Support recruitment and employee engagement programs', 'PKR 30,000/mo', '3 months'),
('Business Development Intern', 'ScaleUp Ventures', 'Islamabad', 'Local', 'Business Administration', 'Identify growth opportunities and manage partnerships', 'PKR 45,000/mo', '4 months'),
('Electrical Systems Intern', 'VoltEdge Corp.', 'Berlin', 'Abroad', 'Electrical Engineering', 'Work on IoT device prototyping and testing', 'EUR 1,200/mo', '6 months'),
('Architecture Intern', 'UrbanForm Design', 'Lahore', 'Local', 'Architecture', 'Assist in residential project design and 3D modeling', 'PKR 35,000/mo', '3 months'),
('Environmental Research Intern', 'GreenHorizon', 'Singapore', 'Abroad', 'Environmental Science', 'Conduct sustainability assessments and field research', 'SGD 2,000/mo', '4 months');

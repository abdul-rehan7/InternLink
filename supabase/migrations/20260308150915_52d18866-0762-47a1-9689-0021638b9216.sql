ALTER TABLE public.internships ADD COLUMN apply_url TEXT;

UPDATE public.internships SET apply_url = 
  CASE title
    WHEN 'Frontend Developer Intern' THEN 'https://example.com/apply/frontend-dev'
    WHEN 'Backend Engineer Intern' THEN 'https://example.com/apply/backend-eng'
    WHEN 'Data Analyst Intern' THEN 'https://example.com/apply/data-analyst'
    WHEN 'Marketing Coordinator Intern' THEN 'https://example.com/apply/marketing'
    WHEN 'UX/UI Design Intern' THEN 'https://example.com/apply/ux-design'
    WHEN 'Financial Analyst Intern' THEN 'https://example.com/apply/finance'
    WHEN 'Civil Engineering Intern' THEN 'https://example.com/apply/civil-eng'
    WHEN 'HR Operations Intern' THEN 'https://example.com/apply/hr-ops'
    WHEN 'Legal Research Intern' THEN 'https://example.com/apply/legal'
    WHEN 'Medical Research Intern' THEN 'https://example.com/apply/medical'
    WHEN 'Architecture Design Intern' THEN 'https://example.com/apply/architecture'
    WHEN 'Environmental Consultant Intern' THEN 'https://example.com/apply/environmental'
    ELSE 'https://example.com/apply'
  END;
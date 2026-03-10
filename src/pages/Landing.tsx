import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search, Zap, Shield, Globe, ArrowRight, GraduationCap, Building2, MapPin, Star } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/departments';

const FEATURES = [
  {
    icon: Search,
    title: 'Smart Matching',
    description: 'Our algorithm matches you with internships based on your department, skills, and preferences.',
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Premium members receive real-time WhatsApp and mobile notifications for new opportunities.',
  },
  {
    icon: Globe,
    title: 'Local & Abroad',
    description: 'Browse internships in your city or explore exciting international opportunities.',
  },
  {
    icon: Shield,
    title: 'Verified Companies',
    description: 'Every listing is reviewed to ensure quality and legitimacy for student safety.',
  },
];

const STEPS = [
  { number: '01', title: 'Create Profile', description: 'Sign up and tell us about your university, department, and interests.' },
  { number: '02', title: 'Get Matched', description: 'Our engine finds internships that align with your academic background.' },
  { number: '03', title: 'Apply & Connect', description: 'Apply directly to companies and track your applications.' },
];

const STATS = [
  { value: '500+', label: 'Internships' },
  { value: '120+', label: 'Companies' },
  { value: '15', label: 'Departments' },
  { value: '95%', label: 'Match Rate' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="h-3.5 w-3.5" />
            <span>Trusted by 10,000+ university students</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight">
            Find Your Perfect <br />
            <span className="text-primary">Internship Match</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            InternLink connects university students with premium internship opportunities tailored to their department, skills, and career goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="gap-2 text-base px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base px-8">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center card-elevated p-5">
              <div className="text-2xl md:text-3xl font-heading font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-card border-y border-border">
        <div className="container py-20">
          <div className="text-center mb-14">
            <h2 className="section-title">Why InternLink?</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Everything you need to discover, match, and land your dream internship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border bg-background hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container py-20">
        <div className="text-center mb-14">
          <h2 className="section-title">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Three simple steps to kickstart your career.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative text-center">
              <div className="text-5xl font-heading font-bold text-primary/15 mb-3">{step.number}</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="bg-card border-y border-border">
        <div className="container py-20">
          <div className="text-center mb-14">
            <h2 className="section-title">15 Departments Covered</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              No matter your field of study, we have internships waiting for you.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {DEPARTMENTS.map((dept) => (
              <span
                key={dept}
                className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="card-elevated p-10 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 rounded-full bg-primary/5" />
          <div className="absolute bottom-0 left-0 w-32 h-32 -ml-8 -mb-8 rounded-full bg-accent/5" />
          <div className="relative">
            <GraduationCap className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="section-title">Ready to Find Your Match?</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Join thousands of students already using InternLink to land their dream internships.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="mt-8 gap-2 text-base px-10">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

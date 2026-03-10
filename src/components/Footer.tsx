import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-heading font-bold tracking-tight">
              Intern<span className="text-primary">Link</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Your gateway to premium internship opportunities. Connecting students with top companies worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#departments" className="text-sm text-muted-foreground hover:text-primary transition-colors">Departments</a></li>
              <li><Link to="/auth?mode=signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">Career Guide</span></li>
              <li><span className="text-sm text-muted-foreground">Resume Tips</span></li>
              <li><span className="text-sm text-muted-foreground">Interview Prep</span></li>
              <li><span className="text-sm text-muted-foreground">Blog</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">support@internlink.com</span></li>
              <li><span className="text-sm text-muted-foreground">Privacy Policy</span></li>
              <li><span className="text-sm text-muted-foreground">Terms of Service</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} InternLink. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}

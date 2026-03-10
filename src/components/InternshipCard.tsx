import { MapPin, Building2, Clock, Banknote, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Tables } from '@/integrations/supabase/types';
import type { Department } from '@/lib/departments';

interface InternshipCardProps {
  internship: Tables<'internships'>;
  userDepartment: Department;
}

export function InternshipCard({ internship, userDepartment }: InternshipCardProps) {
  const isMatch = internship.department === userDepartment;
  const matchScore = isMatch ? 95 : Math.floor(Math.random() * 40 + 30);

  return (
    <div className={`card-elevated p-6 relative overflow-hidden animate-fade-in ${
      isMatch ? 'ring-2 ring-primary/30' : ''
    }`}>
      {isMatch && (
        <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full bg-primary/10" />
      )}

      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-heading font-semibold text-lg leading-tight">{internship.title}</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
            <Building2 className="h-3.5 w-3.5" />
            <span>{internship.company}</span>
          </div>
        </div>
        <div className={isMatch ? 'badge-match' : 'badge-accent'}>
          {matchScore}% Match
        </div>
      </div>

      {internship.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{internship.description}</p>
      )}

      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{internship.location}</span>
          <span className={`ml-1 px-1.5 py-0.5 rounded text-xs font-medium ${
            internship.location_type === 'Abroad'
              ? 'bg-accent/10 text-accent'
              : 'bg-primary/10 text-primary'
          }`}>
            {internship.location_type}
          </span>
        </div>
        {internship.duration && (
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{internship.duration}</span>
          </div>
        )}
        {internship.stipend && (
          <div className="flex items-center gap-1">
            <Banknote className="h-3.5 w-3.5" />
            <span>{internship.stipend}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <span className={`text-xs font-medium ${isMatch ? 'text-primary' : 'text-muted-foreground'}`}>
          {internship.department}
        </span>
        {(internship as any).apply_url && (
          <a href={(internship as any).apply_url} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant={isMatch ? 'default' : 'outline'} className="gap-1.5 text-xs h-8">
              View & Apply
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        )}
      </div>
    </div>
  );
}

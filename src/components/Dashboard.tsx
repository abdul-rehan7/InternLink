import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { InternshipCard } from '@/components/InternshipCard';
import { ProModal } from '@/components/ProModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DEPARTMENTS, type Department } from '@/lib/departments';
import type { Tables } from '@/integrations/supabase/types';
import { Search, Bell, LogOut, SlidersHorizontal, Loader2, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardProps {
  profile: Tables<'profiles'>;
  onSignOut: () => void;
  onOpenProfile: () => void;
}

export function Dashboard({ profile, onSignOut, onOpenProfile }: DashboardProps) {
  const [internships, setInternships] = useState<Tables<'internships'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [locFilter, setLocFilter] = useState<'All' | 'Local' | 'Abroad'>('All');
  const [deptFilter, setDeptFilter] = useState<Department | 'All'>('All');
  const [showProModal, setShowProModal] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  useEffect(() => {
    const fetchInternships = async () => {
      const { data, error } = await supabase.from('internships').select('*').order('posted_at', { ascending: false });
      if (error) { toast.error('Failed to load internships'); return; }
      setInternships(data || []);
      setLoading(false);
    };
    fetchInternships();
  }, []);

  const handleAlertToggle = (checked: boolean) => {
    if (checked) {
      setShowProModal(true);
      setAlertsEnabled(false);
    } else {
      setAlertsEnabled(false);
    }
  };

  const filtered = useMemo(() => {
    let result = internships;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || i.location.toLowerCase().includes(q)
      );
    }

    if (locFilter !== 'All') {
      result = result.filter((i) => i.location_type === locFilter);
    }

    if (deptFilter !== 'All') {
      result = result.filter((i) => i.department === deptFilter);
    }

    // Sort: matching department first
    result.sort((a, b) => {
      const aMatch = a.department === profile.department ? 1 : 0;
      const bMatch = b.department === profile.department ? 1 : 0;
      return bMatch - aMatch;
    });

    return result;
  }, [internships, search, locFilter, deptFilter, profile.department]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-heading font-bold tracking-tight">
            Intern<span className="text-primary">Link</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Hi, <span className="font-medium text-foreground">{profile.full_name.split(' ')[0]}</span>
            </span>
            <Button variant="ghost" size="icon" onClick={onOpenProfile} title="Profile">
              <UserCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSignOut} title="Sign Out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome + alerts */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title">Your Internship Feed</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Showing matches for <span className="font-medium text-primary">{profile.department}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 card-elevated px-4 py-3">
            <Bell className="h-4 w-4 text-accent" />
            <Label htmlFor="alerts" className="text-sm font-medium cursor-pointer">Get Alerts</Label>
            <Switch id="alerts" checked={alertsEnabled} onCheckedChange={handleAlertToggle} />
          </div>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search internships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={locFilter} onValueChange={(v) => setLocFilter(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                <SelectItem value="Local">Local</SelectItem>
                <SelectItem value="Abroad">Abroad</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={(v) => setDeptFilter(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Internship grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No internships found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                userDepartment={profile.department}
              />
            ))}
          </div>
        )}
      </main>

      <ProModal open={showProModal} onClose={() => setShowProModal(false)} />
    </div>
  );
}

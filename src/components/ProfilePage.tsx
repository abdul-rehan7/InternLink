import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEPARTMENTS, type Department } from '@/lib/departments';
import type { Tables } from '@/integrations/supabase/types';
import { ArrowLeft, Save, Loader2, User, GraduationCap, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ProfilePageProps {
  profile: Tables<'profiles'>;
  onBack: () => void;
  onProfileUpdate: (profile: Tables<'profiles'>) => void;
}

export function ProfilePage({ profile, onBack, onProfileUpdate }: ProfilePageProps) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [university, setUniversity] = useState(profile.university);
  const [department, setDepartment] = useState<Department>(profile.department);
  const [semester, setSemester] = useState(profile.semester);
  const [city, setCity] = useState(profile.city);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!fullName.trim() || !university.trim() || !city.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName.trim(),
        university: university.trim(),
        department,
        semester,
        city: city.trim(),
      })
      .eq('id', profile.id)
      .select()
      .single();

    setSaving(false);

    if (error) {
      toast.error('Failed to update profile');
      return;
    }

    onProfileUpdate(data);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex items-center h-16 gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-heading font-bold tracking-tight">
            Intern<span className="text-primary">Link</span>
          </h1>
        </div>
      </header>

      <main className="container py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="section-title">Your Profile</h2>
          <p className="text-muted-foreground text-sm mt-1">Update your personal and academic information</p>
        </div>

        {/* Personal Info */}
        <div className="card-elevated p-6 mb-6">
          <div className="flex items-center gap-2 mb-5 text-sm font-medium text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Personal Information</span>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                maxLength={100}
              />
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="card-elevated p-6 mb-6">
          <div className="flex items-center gap-2 mb-5 text-sm font-medium text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>Academic Information</span>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Your university"
                maxLength={200}
              />
            </div>
            <div>
              <Label>Department</Label>
              <Select value={department} onValueChange={(v) => setDepartment(v as Department)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Semester</Label>
              <Select value={String(semester)} onValueChange={(v) => setSemester(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex items-center gap-2 mb-5 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Location</span>
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your city"
              maxLength={100}
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </main>
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { DEPARTMENTS, type Department } from '@/lib/departments';
import { toast } from 'sonner';
import { Loader2, ArrowRight, ArrowLeft, User, GraduationCap, MapPin } from 'lucide-react';

interface OnboardingFormProps {
  userId: string;
  onComplete: () => void;
}

export function OnboardingForm({ userId, onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    university: '',
    department: '' as Department | '',
    semester: '',
    city: '',
  });

  const totalSteps = 3;

  const canProceed = () => {
    switch (step) {
      case 1: return form.full_name.trim().length > 0;
      case 2: return form.university.trim().length > 0 && form.department !== '' && form.semester !== '';
      case 3: return form.city.trim().length > 0;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('profiles').insert({
        user_id: userId,
        full_name: form.full_name.trim(),
        university: form.university.trim(),
        department: form.department as Department,
        semester: parseInt(form.semester),
        city: form.city.trim(),
      });
      if (error) throw error;
      toast.success('Profile created! Welcome to InternLink.');
      onComplete();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const stepIcons = [User, GraduationCap, MapPin];
  const stepLabels = ['Personal', 'Academic', 'Location'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold tracking-tight">
            Intern<span className="text-primary">Link</span>
          </h1>
          <p className="text-muted-foreground mt-2">Complete your profile to get matched</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => {
            const Icon = stepIcons[s - 1];
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${s <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {stepLabels[s - 1]}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 ${s < step ? 'bg-primary' : 'bg-muted'}`} />}
              </div>
            );
          })}
        </div>

        <div className="card-elevated p-8 animate-fade-in">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-semibold">What's your name?</h2>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  placeholder="Ahmed Ali Khan"
                  autoFocus
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-semibold">Academic Details</h2>
              <div>
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  placeholder="LUMS, NUST, IBA..."
                  autoFocus
                />
              </div>
              <div>
                <Label>Department</Label>
                <Select value={form.department} onValueChange={(v) => setForm({ ...form, department: v as Department })}>
                  <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Semester</Label>
                <Select value={form.semester} onValueChange={(v) => setForm({ ...form, semester: v })}>
                  <SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map((s) => (
                      <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-heading font-semibold">Where are you based?</h2>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Lahore, Karachi, Islamabad..."
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            {step < totalSteps ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canProceed() || submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { OnboardingForm } from '@/components/OnboardingForm';
import { Dashboard } from '@/components/Dashboard';
import { Footer } from '@/components/Footer';
import { ProfilePage } from '@/components/ProfilePage';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, setProfile } = useProfile(user?.id);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleOnboardingComplete = useCallback(() => {
    setOnboardingComplete(true);
    window.location.reload();
  }, []);

  if (authLoading || (user && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-3 text-sm">Loading InternLink...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (!profile && !onboardingComplete) return <OnboardingForm userId={user.id} onComplete={handleOnboardingComplete} />;

  const content = profile && showProfile ? (
    <ProfilePage
      profile={profile}
      onBack={() => setShowProfile(false)}
      onProfileUpdate={(updated) => {
        setProfile(updated);
        setShowProfile(false);
      }}
    />
  ) : profile ? (
    <Dashboard profile={profile} onSignOut={signOut} onOpenProfile={() => setShowProfile(true)} />
  ) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">{content}</div>
      <Footer />
    </div>
  );
}

import { useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { AuthForm } from '@/components/AuthForm';
import { OnboardingForm } from '@/components/OnboardingForm';
import { Dashboard } from '@/components/Dashboard';
import { ProfilePage } from '@/components/ProfilePage';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading, setProfile } = useProfile(user?.id);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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

  if (!user) return <AuthForm />;
  if (!profile && !onboardingComplete) return <OnboardingForm userId={user.id} onComplete={handleOnboardingComplete} />;
  if (profile && showProfile) {
    return (
      <ProfilePage
        profile={profile}
        onBack={() => setShowProfile(false)}
        onProfileUpdate={(updated) => {
          setProfile(updated);
          setShowProfile(false);
        }}
      />
    );
  }
  if (profile) return <Dashboard profile={profile} onSignOut={signOut} onOpenProfile={() => setShowProfile(true)} />;

  return null;
};

export default Index;

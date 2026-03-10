import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, MessageCircle, Bell, Zap } from 'lucide-react';

interface ProModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProModal({ open, onClose }: ProModalProps) {
  const features = [
    { icon: MessageCircle, label: 'Instant WhatsApp Alerts', desc: 'Get notified the moment a matching internship is posted' },
    { icon: Bell, label: 'Mobile Push Notifications', desc: 'Never miss a deadline with real-time push alerts' },
    { icon: Zap, label: 'Priority Matching', desc: 'Your profile gets boosted in employer searches' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
              <Crown className="h-5 w-5 text-accent" />
            </div>
            <DialogTitle className="font-heading text-xl">Go Premium</DialogTitle>
          </div>
          <DialogDescription>
            Unlock powerful features to supercharge your internship search
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {features.map((f) => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Button className="w-full" size="lg">
            <Crown className="mr-2 h-4 w-4" />
            Upgrade to Premium — $9.99/mo
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { User, Briefcase, Star, Layers, SlidersHorizontal } from 'lucide-react';
import { useGetProfile } from '@/hooks/useJobHooks';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/Spinner';
import { SkillTag } from '@/components/ui/SkillTag';

interface ProfileRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const ProfileRow = ({ icon: Icon, label, value }: ProfileRowProps) => (
  <div className="flex gap-4 py-4 border-b border-surface-border last:border-0">
    <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0">
      <Icon size={15} className="text-ink-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-ink-500 font-mono uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-ink-100 font-body leading-relaxed">{value}</p>
    </div>
  </div>
);

const EXPERIENCE_LABELS: Record<string, string> = {
  entry: 'Entry Level (0–1 yr)',
  junior: 'Junior (1–2 yrs)',
  mid: 'Mid-Level (3–5 yrs)',
  senior: 'Senior (5–8 yrs)',
  lead: 'Lead / Principal (8+ yrs)',
  executive: 'Executive / C-Suite',
};

export const ProfilePage = () => {
  const { user: cachedUser } = useAuth();

  // Always fetch fresh from server; fall back to cached context data while loading
  const { data: freshUser, isLoading, isError } = useGetProfile();

  const user = freshUser ?? cachedUser;

  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={28} className="text-volt-400" />
      </div>
    );
  }

  if (isError && !user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-ink-400 font-body">Could not load profile. Please try again.</p>
      </div>
    );
  }

  if (!user) return null;

  const skillsList = user.skills
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8 animate-fade-up max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-display font-700 text-3xl text-white">My Profile</h1>
        <p className="text-ink-400 text-sm mt-1 font-body">
          Your career profile used by the AI for all analyses.
        </p>
      </div>

      {/* Avatar card */}
      <div className="card flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-volt-400/15 border border-volt-400/25 flex items-center justify-center shrink-0">
          <span className="font-display font-700 text-2xl text-volt-400">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-display font-700 text-xl text-white">{user.name}</p>
          <p className="text-ink-400 text-sm font-body">{user.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="tag-volt">{user.desired_job_title}</span>
            <span className="tag">{EXPERIENCE_LABELS[user.experience_level] ?? user.experience_level}</span>
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="card">
        <p className="text-xs font-mono text-ink-500 uppercase tracking-widest mb-2">
          Career Details
        </p>

        <ProfileRow
          icon={Briefcase}
          label="Desired Job Title"
          value={user.desired_job_title}
        />
        <ProfileRow
          icon={Star}
          label="Experience Level"
          value={EXPERIENCE_LABELS[user.experience_level] ?? user.experience_level}
        />
        <ProfileRow
          icon={SlidersHorizontal}
          label="Job Preferences"
          value={user.job_preferences}
        />

        {/* Skills – rendered as tags */}
        <div className="flex gap-4 pt-4">
          <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center shrink-0">
            <Layers size={15} className="text-ink-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-ink-500 font-mono uppercase tracking-widest mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skillsList.length > 0
                ? skillsList.map((s) => <SkillTag key={s} label={s} variant="volt" />)
                : <p className="text-sm text-ink-400">No skills listed</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Info note */}
      <div className="card border-ink-700 bg-surface-elevated/50">
        <div className="flex gap-3">
          <User size={16} className="text-ink-400 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-400 font-body leading-relaxed">
            To update your profile details, please re-register or contact support.
            Profile editing will be available in a future release.
          </p>
        </div>
      </div>
    </div>
  );
};

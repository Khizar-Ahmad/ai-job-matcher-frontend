import { Link } from 'react-router-dom';
import { Briefcase, MessageSquareText, ArrowRight, Zap, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ACTION_CARDS = [
  {
    to: '/job-match',
    icon: Briefcase,
    title: 'Analyse a Job',
    desc: 'Paste a job description and upload your resume to get a match score and custom cover letter.',
    cta: 'Start analysis',
  },
  {
    to: '/questions',
    icon: MessageSquareText,
    title: 'Answer Application Questions',
    desc: 'Paste the application questions from any job form and get polished, personalised answers.',
    cta: 'Answer questions',
  },
];

export const DashboardPage = () => {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <p className="text-ink-400 text-sm font-body">{greeting} 👋</p>
        <h1 className="font-display font-700 text-3xl text-white mt-1">
          {user?.name?.split(' ')[0]}'s Dashboard
        </h1>
      </div>

      {/* Profile snapshot */}
      <div className="card flex flex-wrap items-center gap-6">
        <div className="w-14 h-14 rounded-xl bg-volt-400/15 border border-volt-400/25 flex items-center justify-center shrink-0">
          <User size={24} className="text-volt-400" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <p className="font-display font-600 text-white">{user?.name}</p>
          <p className="text-ink-400 text-sm">{user?.email}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.desired_job_title && (
              <span className="tag-volt">{user.desired_job_title}</span>
            )}
            {user?.experience_level && (
              <span className="tag">{user.experience_level}</span>
            )}
          </div>
        </div>
        <Link to="/profile" className="btn-secondary shrink-0">
          View profile <ArrowRight size={14} />
        </Link>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-display font-600 text-white text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ACTION_CARDS.map(({ to, icon: Icon, title, desc, cta }) => (
            <div key={to} className="card group hover:border-ink-600 transition-colors duration-200 flex flex-col">
              <div className="w-10 h-10 rounded-lg bg-volt-400/10 border border-volt-400/20 flex items-center justify-center mb-4 group-hover:glow-volt transition-all">
                <Icon size={18} className="text-volt-400" />
              </div>
              <h3 className="font-display font-600 text-white text-base mb-2">{title}</h3>
              <p className="text-ink-400 text-sm font-body leading-relaxed flex-1">{desc}</p>
              <Link to={to} className="btn-primary mt-5 w-fit">
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card border-volt-400/20 bg-volt-400/5">
        <div className="flex gap-3">
          <Zap size={18} className="text-volt-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-display font-600 text-white mb-1">Pro tip</p>
            <p className="text-sm text-ink-300 font-body leading-relaxed">
              For best results, keep your skills list in your profile updated before running a job analysis.
              The AI uses your profile <em>and</em> your uploaded resume together for maximum accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

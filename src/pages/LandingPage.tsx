import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Brain, FileSearch, MessageSquareText, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: FileSearch,
    title: 'Resume Parsing',
    desc: 'Upload your resume once. Our AI extracts every skill and experience to build your profile.',
  },
  {
    icon: Brain,
    title: 'Intelligent Matching',
    desc: 'We analyse job descriptions and requirements, giving you a precise compatibility score.',
  },
  {
    icon: MessageSquareText,
    title: 'Cover Letter Generation',
    desc: 'Receive a tailored, compelling cover letter crafted specifically for the role.',
  },
  {
    icon: ShieldCheck,
    title: 'Interview Prep',
    desc: 'Paste application questions. Get polished, personalised answers in seconds.',
  },
];

export const LandingPage = () => (
  <div className="min-h-screen flex flex-col">
    {/* Nav */}
    <header className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-volt-400 flex items-center justify-center">
          <Zap size={15} className="text-ink-950" />
        </div>
        <span className="font-display font-700 text-white text-lg">JobMatch AI</span>
      </div>
      <div className="flex items-center gap-3">
        {/* <Link to="/login" className="btn-ghost">Sign In</Link> */}
        <Link to="/login" className="btn-ghost hidden xs:inline-flex sm:inline-flex">Sign In</Link>
        <Link to="/register" className="btn-primary">Get Started</Link>
      </div>
    </header>

    {/* Hero */}
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-24 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-volt-400/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-ink-700/30 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto animate-fade-up">
        <span className="tag-volt mb-6 inline-block">Powered by AI Agents</span>
        <h1 className="font-display font-700 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          Land the job <br />
          <span className="text-gradient">you actually want</span>
        </h1>
        <p className="text-ink-300 text-lg md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed">
          Upload your resume, paste a job description, and let AI do the heavy lifting —
          match scoring, cover letters, interview answers, all in one place.
        </p>
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4"> */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
          {/* <Link to="/register" className="btn-primary text-base px-8 py-3 glow-volt"> */}
            <Link to="/register" className="btn-primary text-base px-8 py-3 glow-volt w-full sm:w-auto justify-center">
            Start for free <ArrowRight size={16} />
          </Link>
          {/* <Link to="/login" className="btn-secondary text-base px-8 py-3"> */}
            <Link to="/login" className="btn-secondary text-base px-8 py-3 w-full sm:w-auto justify-center">
            Sign in
          </Link>
        </div>
      </div>
    </section>

    {/* Features */}
    {/* <section className="px-6 py-20 border-t border-surface-border"> */}
    <section className="px-4 sm:px-6 py-12 sm:py-20 border-t border-surface-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display font-700 text-3xl text-white text-center mb-2">
          Everything you need
        </h2>
        <p className="text-ink-400 text-center mb-12 font-body">
          From resume to offer letter — guided by AI at every step.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card hover:border-ink-600 transition-colors duration-200 group">
              <div className="w-10 h-10 rounded-lg bg-volt-400/10 border border-volt-400/20 flex items-center justify-center mb-4 group-hover:bg-volt-400/15 transition-colors">
                <Icon size={18} className="text-volt-400" />
              </div>
              <h3 className="font-display font-600 text-white text-base mb-2">{title}</h3>
              <p className="text-ink-400 text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA footer */}
    {/* <section className="border-t border-surface-border px-6 py-16 text-center"> */}
    <section className="border-t border-surface-border px-4 sm:px-6 py-10 sm:py-16 text-center">
      <h2 className="font-display font-700 text-3xl text-white mb-4">Ready to get matched?</h2>
      <p className="text-ink-400 mb-8 font-body">Create a free account and analyse your first job in minutes.</p>
      <Link to="/register" className="btn-primary text-base px-10 py-3">
        Create account <ArrowRight size={16} />
      </Link>
    </section>

    <footer className="border-t border-surface-border px-6 py-5 text-center text-xs text-ink-500 font-body">
      © {new Date().getFullYear()} JobMatch AI. All rights reserved.
    </footer>
  </div>
);

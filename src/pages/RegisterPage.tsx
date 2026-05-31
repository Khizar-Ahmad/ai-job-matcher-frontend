import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Zap } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '@/validations/schemas';
import { useSubmitRegister } from '@/hooks/useAuthHooks';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';

const EXPERIENCE_OPTIONS = [
  { value: 'entry', label: 'Entry Level (0–1 yr)' },
  { value: 'junior', label: 'Junior (1–2 yrs)' },
  { value: 'mid', label: 'Mid-Level (3–5 yrs)' },
  { value: 'senior', label: 'Senior (5–8 yrs)' },
  { value: 'lead', label: 'Lead / Principal (8+ yrs)' },
  { value: 'executive', label: 'Executive / C-Suite' },
];

export const RegisterPage = () => {
  const { submit, isPending } = useSubmitRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => submit(data);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt-400/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-volt-400 flex items-center justify-center mb-4">
            <Zap size={20} className="text-ink-950" />
          </div>
          <h1 className="font-display font-700 text-2xl text-white">Create your account</h1>
          <p className="text-ink-400 text-sm mt-1 font-body">Build your profile and start matching jobs</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Section: Account */}
            <div>
              <p className="text-xs font-mono text-ink-500 uppercase tracking-widest mb-4">
                Account Details
              </p>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Ada Lovelace"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="ada@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Min. 8 chars, 1 uppercase, 1 number"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>
            </div>

            <div className="border-t border-surface-border" />

            {/* Section: Profile */}
            <div>
              <p className="text-xs font-mono text-ink-500 uppercase tracking-widest mb-4">
                Career Profile
              </p>
              <div className="space-y-4">
                <Input
                  label="Desired Job Title"
                  placeholder="e.g. Senior Backend Engineer"
                  error={errors.desired_job_title?.message}
                  {...register('desired_job_title')}
                />
                <Select
                  label="Experience Level"
                  options={EXPERIENCE_OPTIONS}
                  placeholder="Select your level…"
                  error={errors.experience_level?.message}
                  {...register('experience_level')}
                />
                <Input
                  label="Skills"
                  placeholder="e.g. Python, FastAPI, PostgreSQL, Docker"
                  hint="Comma-separated list of your key skills"
                  error={errors.skills?.message}
                  {...register('skills')}
                />
                <Textarea
                  label="Job Preferences"
                  placeholder="e.g. Remote-first, fintech or SaaS, team lead opportunities, no overnight shifts…"
                  rows={3}
                  hint="Describe what you look for in a role"
                  error={errors.job_preferences?.message}
                  {...register('job_preferences')}
                />
              </div>
            </div>

            <button type="submit" disabled={isPending} className="btn-primary w-full py-3">
              {isPending ? <><Spinner size={16} /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-6 font-body">
            Already have an account?{' '}
            <Link to="/login" className="text-volt-400 hover:text-volt-300 font-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

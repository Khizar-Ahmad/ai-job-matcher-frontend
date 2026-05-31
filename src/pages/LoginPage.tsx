import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Zap, Mail, Lock } from 'lucide-react';
import { loginSchema, type LoginFormData } from '@/validations/schemas';
import { useSubmitLogin } from '@/hooks/useAuthHooks';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';

export const LoginPage = () => {
  const { submit, isPending } = useSubmitLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => submit(data);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-volt-400/4 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-volt-400 flex items-center justify-center mb-4">
            <Zap size={20} className="text-ink-950" />
          </div>
          <h1 className="font-display font-700 text-2xl text-white">Welcome back</h1>
          <p className="text-ink-400 text-sm mt-1 font-body">Sign in to your JobMatch AI account</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-[38px] text-ink-400 pointer-events-none" />
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                className="pl-9"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-3 top-[38px] text-ink-400 pointer-events-none" />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <button type="submit" disabled={isPending} className="btn-primary w-full py-3 mt-2">
              {isPending ? <><Spinner size={16} /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-6 font-body">
            No account?{' '}
            <Link to="/register" className="text-volt-400 hover:text-volt-300 font-500 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

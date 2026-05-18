import { FormEvent, useState } from 'react';
import { Eye, GraduationCap, LockKeyhole, Mail } from 'lucide-react';
import { ApiError } from '../../services/apiClient';
import { login, UserSummary } from '../../services/authService';
import { View } from '../../types';

const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJDsuuK4NvVER_6Hbcm83UUaROT9yDJl7E1s7jvYMClL9q6T9i9tJmyl0I9t9WKD6ACxyuFF567zlk9qVyKf5Ex2iAc565PbiTXDSaJBuYQrS0XNR9ZelvSjxEmjQCsCn6J8iQx_W8xtXvOo07uTzbwmEcwmjOX0O-qOmON9BfVrHTFK6E_8nEk-tH1oKeFakIY7L-NAvmnH6lYCVXIcN5BhwUfi_1DtxOaAAFqcuCHWUg0Ti9ZEoXdjDNq-k44oFT-Hk9B7DbKvJj';

interface LoginProps {
  onLoginSuccess: (user: UserSummary) => void;
  onViewChange: (view: View) => void;
}

export default function Login({ onLoginSuccess, onViewChange }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login({ email, password });
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface auth-soft-backdrop">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          <section className="bg-surface border border-outline-variant rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-8 py-10 md:px-10 md:py-12">
              <div className="mb-10 text-center">
                <img alt="UniPath Logo" className="h-11 mx-auto mb-6 object-contain" src={logoUrl} />
                <h1 className="font-display text-2xl font-semibold text-primary mb-2">Welcome Back</h1>
                <p className="text-base text-on-surface-variant">Continue your global academic journey</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface" htmlFor="login-email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={22} />
                    <input
                      className="w-full rounded border border-outline-variant bg-background py-3 pl-11 pr-4 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="login-email"
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="student@example.com"
                      required
                      type="email"
                      value={email}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface" htmlFor="login-password">
                    Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={22} />
                    <input
                      className="w-full rounded border border-outline-variant bg-background py-3 pl-11 pr-11 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="login-password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      required
                      type="password"
                      value={password}
                    />
                    <button
                      aria-label="Show password"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant transition-colors hover:text-on-surface-variant"
                      type="button"
                    >
                      <Eye size={22} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      className="h-5 w-5 rounded border-outline-variant accent-primary"
                      type="checkbox"
                    />
                    <span className="text-sm font-medium text-on-surface-variant">Remember me</span>
                  </label>
                  <button className="text-sm font-medium text-primary hover:underline" type="button">
                    Forgot password?
                  </button>
                </div>

                {error && (
                  <div className="rounded border border-error/30 bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                    {error}
                  </div>
                )}

                <button
                  className="w-full rounded bg-primary py-3.5 text-sm font-semibold text-on-primary shadow-sm transition-all hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="relative my-8 flex items-center">
                <span className="h-px flex-1 bg-outline-variant" />
                <span className="px-5 text-xs font-semibold uppercase tracking-wider text-outline">
                  or sign in with
                </span>
                <span className="h-px flex-1 bg-outline-variant" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
                  <GraduationCap size={20} />
                  School ID
                </button>
                <button className="flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary">
                  <span className="text-lg font-display font-semibold leading-none">G</span>
                  Google
                </button>
              </div>
            </div>

            <div className="border-t border-outline-variant bg-surface-container-low px-8 py-5 text-center">
              <p className="text-sm text-on-surface-variant">
                New to UniPath?
                <button
                  className="ml-1 font-bold text-primary hover:underline"
                  onClick={() => onViewChange(View.Register)}
                  type="button"
                >
                  Create an account
                </button>
              </p>
            </div>
          </section>

          <p className="mt-8 px-4 text-center text-xs font-semibold leading-5 text-outline">
            By signing in, you agree to UniPath&apos;s{' '}
            <button className="underline hover:text-on-surface-variant" type="button">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="underline hover:text-on-surface-variant" type="button">
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </main>

      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-tertiary opacity-20" />
      <footer className="w-full border-t border-outline-variant bg-surface-container-low px-4 py-8 md:px-10">
        <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center md:justify-start">
            <span className="text-sm font-bold text-primary">UniPath</span>
            <span className="hidden text-outline md:inline">|</span>
            <p className="text-xs font-semibold text-on-surface-variant">
              © 2024 UniPath. Empowering Vietnamese Students Globally.
            </p>
          </div>
          <div className="flex gap-6 text-xs font-semibold text-on-surface-variant">
            <button className="hover:text-primary" type="button">
              Privacy Policy
            </button>
            <button className="hover:text-primary" type="button">
              Terms of Service
            </button>
            <button className="hover:text-primary" type="button">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

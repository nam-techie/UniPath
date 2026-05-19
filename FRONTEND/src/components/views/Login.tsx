import { FormEvent, useEffect, useState } from 'react';
import { Eye, GraduationCap, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { ApiError } from '../../services/apiClient';
import { login, resendVerification, UserSummary } from '../../services/authService';
import { View } from '../../types';

const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJDsuuK4NvVER_6Hbcm83UUaROT9yDJl7E1s7jvYMClL9q6T9i9tJmyl0I9t9WKD6ACxyuFF567zlk9qVyKf5Ex2iAc565PbiTXDSaJBuYQrS0XNR9ZelvSjxEmjQCsCn6J8iQx_W8xtXvOo07uTzbwmEcwmjOX0O-qOmON9BfVrHTFK6E_8nEk-tH1oKeFakIY7L-NAvmnH6lYCVXIcN5BhwUfi_1DtxOaAAFqcuCHWUg0Ti9ZEoXdjDNq-k44oFT-Hk9B7DbKvJj';

const formatCooldown = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const parseCooldownSeconds = (message: string) => {
  const minutes = message.match(/(\d+)m/);
  const seconds = message.match(/(\d+)s/);
  const parsedSeconds =
    (minutes ? Number(minutes[1]) * 60 : 0) + (seconds ? Number(seconds[1]) : 0);

  return Number.isFinite(parsedSeconds) ? parsedSeconds : 0;
};

interface LoginProps {
  onLoginSuccess: (user: UserSummary) => void;
  onViewChange: (view: View) => void;
}

export default function Login({ onLoginSuccess, onViewChange }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldownSeconds, setResendCooldownSeconds] = useState(0);
  const [resendError, setResendError] = useState('');

  useEffect(() => {
    if (resendCooldownSeconds <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendCooldownSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldownSeconds]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResendError('');

    try {
      const response = await login({ email, password });
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isVerificationError = error.toLowerCase().includes('verify your email');

  const handleResendVerification = async () => {
    if (!email) {
      setResendError('Enter your email address first.');
      return;
    }

    setResendLoading(true);
    setResendError('');

    try {
      const response = await resendVerification({ email });
      setResendCooldownSeconds(response.data?.retryAfterSeconds ?? 60);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        const cooldownSeconds = parseCooldownSeconds(err.message);
        setResendCooldownSeconds(cooldownSeconds || 60);
      } else {
        setResendError(err instanceof ApiError ? err.message : 'Unable to resend verification email.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  const resendDisabled = resendLoading || resendCooldownSeconds > 0;
  const resendButtonLabel = resendLoading
    ? 'Sending...'
    : resendCooldownSeconds > 0
      ? `Resend in ${formatCooldown(resendCooldownSeconds)}`
      : 'Resend email';

  return (
    <div className="flex h-screen min-h-[100dvh] overflow-hidden bg-background p-4 text-on-surface auth-soft-backdrop max-[420px]:p-2">
      <main className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-center">
        <section className="auth-card mx-auto flex h-full max-h-[760px] min-h-0 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
          <aside className="auth-side-panel relative hidden w-[48%] flex-col justify-between overflow-hidden bg-primary-container p-8 lg:flex xl:p-10">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
            <button
              className="relative z-10 mb-5 inline-flex w-fit transition-opacity hover:opacity-80"
              onClick={() => onViewChange(View.Landing)}
              type="button"
            >
              <img alt="UniPath Logo" className="h-9 object-contain brightness-0 invert" src={logoUrl} />
            </button>
            <div className="auth-side-hero relative z-10">
              <h2 className="auth-side-title mb-4 font-display text-2xl font-semibold leading-tight text-on-primary-container xl:text-3xl">
                Welcome Back to UniPath
              </h2>
              <p className="auth-side-copy max-w-md text-base leading-7 text-on-primary-container/80 xl:text-lg">
                Continue tracking programs, scholarships, and your application roadmap from one focused workspace.
              </p>
            </div>

            <div className="auth-side-features relative z-10 space-y-5 xl:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container xl:h-12 xl:w-12">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">Personalized Matches</p>
                  <p className="text-sm text-on-primary-container/70">Pick up where your university search left off.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container xl:h-12 xl:w-12">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">Secure Student Portal</p>
                  <p className="text-sm text-on-primary-container/70">Your shortlist and profile stay protected.</p>
                </div>
              </div>
            </div>

            <p className="auth-side-quote relative z-10 max-w-md text-sm italic leading-6 text-on-primary-container/60 xl:text-base xl:leading-7">
              &quot;UniPath keeps every application decision organized and clear.&quot; - Student community
            </p>
          </aside>

          <div className="auth-form-panel flex min-h-0 w-full flex-col justify-center p-5 sm:p-7 md:p-8 lg:w-[52%] lg:p-9 xl:p-10">
            <div className="auth-heading mb-4 text-center sm:mb-5 lg:text-left">
              <h1 className="mb-1.5 font-display text-2xl font-semibold text-primary sm:text-3xl">Welcome Back</h1>
              <p className="text-sm text-on-surface-variant sm:text-base">Continue your global academic journey</p>
            </div>

            <form className="auth-form space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="auth-label text-sm font-medium text-on-surface" htmlFor="login-email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={21} />
                  <input
                    className="auth-input w-full rounded border border-outline-variant bg-background py-2.5 pl-11 pr-4 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
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

              <div className="space-y-1.5">
                <label className="auth-label text-sm font-medium text-on-surface" htmlFor="login-password">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={21} />
                  <input
                    className="auth-input w-full rounded border border-outline-variant bg-background py-2.5 pl-11 pr-11 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
                    id="login-password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="********"
                    required
                    type="password"
                    value={password}
                  />
                  <button
                    aria-label="Show password"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant transition-colors hover:text-on-surface-variant"
                    type="button"
                  >
                    <Eye size={21} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    className="h-5 w-5 shrink-0 rounded border-outline-variant accent-primary"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium leading-5 text-on-surface-variant">Remember me</span>
                </label>
                <button
                  className="text-sm font-medium leading-5 text-primary hover:underline"
                  onClick={() => onViewChange(View.ForgotPassword)}
                  type="button"
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="rounded border border-error/30 bg-error-container px-4 py-2.5 text-sm font-medium text-on-error-container">
                  <div className="flex items-center justify-between gap-3 max-[520px]:items-start">
                    <span className="leading-5">{error}</span>
                    {isVerificationError && (
                      <button
                        className="shrink-0 text-xs font-bold text-primary underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={resendDisabled}
                        onClick={handleResendVerification}
                        type="button"
                      >
                        {resendButtonLabel}
                      </button>
                    )}
                  </div>
                  {resendError && (
                    <p className="mt-2 text-xs font-semibold leading-4 text-on-error-container/80">
                      {resendError}
                    </p>
                  )}
                </div>
              )}

              <button
                className="auth-primary-button w-full rounded-full bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-divider my-4 flex items-center sm:my-5">
              <span className="h-px flex-1 bg-outline-variant" />
              <span className="px-4 text-xs font-semibold uppercase text-outline">
                or sign in with
              </span>
              <span className="h-px flex-1 bg-outline-variant" />
            </div>

            <div className="auth-social grid grid-cols-2 gap-3 sm:gap-4">
              <button className="auth-social-button flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary sm:gap-3 sm:px-4">
                <GraduationCap size={20} />
                School ID
              </button>
              <button className="auth-social-button flex items-center justify-center gap-2 rounded border border-outline-variant bg-surface px-3 py-2.5 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary sm:gap-3 sm:px-4">
                <span className="font-display text-lg font-semibold leading-none">G</span>
                Google
              </button>
            </div>

            <p className="auth-switch mt-4 text-center text-sm text-on-surface-variant sm:text-base">
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
      </main>
    </div>
  );
}

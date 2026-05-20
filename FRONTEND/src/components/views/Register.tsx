import { FormEvent, useState } from 'react';
import { BriefcaseBusiness, GraduationCap, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { ApiError } from '../../services/apiClient';
import { register } from '../../services/authService';
import { View } from '../../types';

const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJDsuuK4NvVER_6Hbcm83UUaROT9yDJl7E1s7jvYMClL9q6T9i9tJmyl0I9t9WKD6ACxyuFF567zlk9qVyKf5Ex2iAc565PbiTXDSaJBuYQrS0XNR9ZelvSjxEmjQCsCn6J8iQx_W8xtXvOo07uTzbwmEcwmjOX0O-qOmON9BfVrHTFK6E_8nEk-tH1oKeFakIY7L-NAvmnH6lYCVXIcN5BhwUfi_1DtxOaAAFqcuCHWUg0Ti9ZEoXdjDNq-k44oFT-Hk9B7DbKvJj';

interface RegisterProps {
  onViewChange: (view: View) => void;
}

export default function Register({ onViewChange }: RegisterProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await register({ fullName, email, password, confirmPassword });
      setSuccess(response.message);
      setEmail(response.data.email);
    } catch (err) {
      if (err instanceof ApiError) {
        // backend returns field errors in payload.data for validation failures
        const payload: any = err.data;
        if (payload?.data && Array.isArray(payload.data) && payload.data.length > 0) {
          const pwdErr = payload.data.find((e: any) => e.field === 'password')?.message;
          const confirmErr = payload.data.find((e: any) => e.field === 'confirmPassword')?.message;
          const fullMsg = pwdErr || confirmErr || payload.data.map((e: any) => e.message).join(' ');
          setError(fullMsg || err.message);
        } else {
          setError(err.message || 'Unable to create account. Please try again.');
        }
      } else {
        setError('Unable to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
                Start Your Global Academic Journey
              </h2>
              <p className="auth-side-copy max-w-md text-base leading-7 text-on-primary-container/80 xl:text-lg">
                Access curated university databases, exclusive scholarship alerts, and expert guidance for Vietnamese students aiming for international success.
              </p>
            </div>

            <div className="auth-side-features relative z-10 space-y-5 xl:space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container xl:h-12 xl:w-12">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">500+ Partner Universities</p>
                  <p className="text-sm text-on-primary-container/70">Verified programs across 25 countries.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container xl:h-12 xl:w-12">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">Secure Application Tracking</p>
                  <p className="text-sm text-on-primary-container/70">Keep all your documents in one safe place.</p>
                </div>
              </div>
            </div>

            <p className="auth-side-quote relative z-10 max-w-md text-sm italic leading-6 text-on-primary-container/60 xl:text-base xl:leading-7">
              &quot;UniPath simplified my master&apos;s application to Germany. The scholarship database is a game changer.&quot; - Thu Ha, Berlin
            </p>
          </aside>

          <div className="auth-form-panel flex min-h-0 w-full flex-col justify-center p-5 sm:p-7 md:p-8 lg:w-[52%] lg:p-9 xl:p-10">
            <div className="auth-heading mb-4 sm:mb-5">
              <h1 className="mb-1.5 font-display text-2xl font-semibold text-primary sm:text-3xl">Create Account</h1>
              <p className="text-sm text-on-surface-variant sm:text-base">
                Join the community of ambitious Vietnamese scholars.
              </p>
            </div>

            <form className="auth-form space-y-3.5 sm:space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="auth-label text-sm font-medium text-on-surface" htmlFor="register-name">
                  Full Name
                </label>
                <input
                  className="auth-input w-full rounded border border-outline bg-background px-4 py-2.5 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="register-name"
                  name="fullName"
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Le Van An"
                  required
                  type="text"
                  value={fullName}
                />
              </div>

              <div className="space-y-1.5">
                <label className="auth-label text-sm font-medium text-on-surface" htmlFor="register-email">
                  Email Address
                </label>
                <input
                  className="auth-input w-full rounded border border-outline bg-background px-4 py-2.5 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="register-email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="an.le@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-1.5">
                  <label className="auth-label text-sm font-medium text-on-surface" htmlFor="register-password">
                    Password
                  </label>
                    <div className="relative">
                      <input
                        className="auth-input w-full rounded border border-outline bg-background px-4 py-2.5 pr-10 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                        id="register-password"
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="********"
                        required
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface/70"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                </div>
                <div className="space-y-1.5">
                  <label className="auth-label text-sm font-medium text-on-surface" htmlFor="register-confirm-password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className="auth-input w-full rounded border border-outline bg-background px-4 py-2.5 pr-10 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                      id="register-confirm-password"
                      name="confirmPassword"
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="********"
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                    />
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface/70"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="auth-terms flex items-center gap-3">
                <input
                  checked={acceptedTerms}
                  className="h-5 w-5 shrink-0 rounded border-outline accent-primary"
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  required
                  type="checkbox"
                />
                <span className="text-sm leading-5 text-on-surface-variant">
                  I agree to the{' '}
                  <button className="font-semibold text-primary hover:underline" type="button">
                    Terms and Conditions
                  </button>{' '}
                  and{' '}
                  <button className="font-semibold text-primary hover:underline" type="button">
                    Privacy Policy
                  </button>
                  .
                </span>
              </label>

              {error && (
                <div className="rounded border border-error/30 bg-error-container px-4 py-2.5 text-sm font-medium text-on-error-container">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded border border-secondary/30 bg-secondary-container/40 px-4 py-2.5 text-sm font-medium text-on-secondary-container">
                  {success}
                </div>
              )}

              <button
                className="auth-primary-button w-full rounded-full bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-divider my-4 flex items-center sm:my-5">
              <span className="h-px flex-1 bg-outline-variant" />
              <span className="px-4 text-xs font-semibold uppercase text-outline">
                Social sign-up
              </span>
              <span className="h-px flex-1 bg-outline-variant" />
            </div>

            <div className="auth-social grid grid-cols-2 gap-3 sm:gap-4">
              <button className="auth-social-button flex items-center justify-center gap-2 rounded border border-outline bg-background px-3 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low sm:gap-3 sm:px-4">
                <span className="font-display text-lg font-semibold leading-none">G</span>
                Google
              </button>
              <button className="auth-social-button flex items-center justify-center gap-2 rounded border border-outline bg-background px-3 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low sm:gap-3 sm:px-4">
                <BriefcaseBusiness size={21} />
                LinkedIn
              </button>
            </div>

            <p className="auth-switch mt-4 text-center text-sm text-on-surface-variant sm:text-base">
              Already have an account?
              <button
                className="ml-1 font-bold text-primary hover:underline"
                onClick={() => onViewChange(View.Login)}
                type="button"
              >
                Sign in
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

import { FormEvent, useState } from 'react';
import { BriefcaseBusiness, GraduationCap, ShieldCheck } from 'lucide-react';
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
      setError(err instanceof ApiError ? err.message : 'Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-surface">
        <nav className="mx-auto flex h-[72px] max-w-container-max items-center justify-between px-4 md:px-10">
          <button
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            onClick={() => onViewChange(View.Landing)}
            type="button"
          >
            <img alt="UniPath Logo" className="h-10 object-contain" src={logoUrl} />
          </button>
          <div className="hidden items-center gap-8 md:flex">
            <button className="text-sm font-medium text-on-surface-variant hover:text-primary" type="button">
              Programs
            </button>
            <button className="text-sm font-medium text-on-surface-variant hover:text-primary" type="button">
              Scholarships
            </button>
            <button className="text-sm font-medium text-on-surface-variant hover:text-primary" type="button">
              About Us
            </button>
            <button
              className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
              type="button"
            >
              Support
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-4 py-12">
        <section className="mx-auto flex min-h-[700px] w-full max-w-[1100px] overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
          <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary-container p-12 md:flex">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
            <div className="relative z-10">
              <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-on-primary-container">
                Start Your Global Academic Journey
              </h2>
              <p className="max-w-md text-lg leading-7 text-on-primary-container/80">
                Access curated university databases, exclusive scholarship alerts, and expert guidance for Vietnamese students aiming for international success.
              </p>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">500+ Partner Universities</p>
                  <p className="text-sm text-on-primary-container/70">Verified programs across 25 countries.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-primary-container">Secure Application Tracking</p>
                  <p className="text-sm text-on-primary-container/70">Keep all your documents in one safe place.</p>
                </div>
              </div>
            </div>

            <p className="relative z-10 max-w-md text-base italic leading-7 text-on-primary-container/60">
              &quot;UniPath simplified my master&apos;s application to Germany. The scholarship database is a game changer.&quot; - Thu Ha, Berlin
            </p>
          </aside>

          <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
            <div className="mb-8">
              <h1 className="mb-2 font-display text-3xl font-semibold text-primary">Create Account</h1>
              <p className="text-base text-on-surface-variant">
                Join the community of ambitious Vietnamese scholars.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface" htmlFor="register-name">
                  Full Name
                </label>
                <input
                  className="w-full rounded border border-outline bg-background px-4 py-3 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="register-name"
                  name="fullName"
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Le Van An"
                  required
                  type="text"
                  value={fullName}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-on-surface" htmlFor="register-email">
                  Email Address
                </label>
                <input
                  className="w-full rounded border border-outline bg-background px-4 py-3 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                  id="register-email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="an.le@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface" htmlFor="register-password">
                    Password
                  </label>
                  <input
                    className="w-full rounded border border-outline bg-background px-4 py-3 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                    id="register-password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface" htmlFor="register-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full rounded border border-outline bg-background px-4 py-3 text-base outline-none transition-all placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
                    id="register-confirm-password"
                    name="confirmPassword"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    type="password"
                    value={confirmPassword}
                  />
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  checked={acceptedTerms}
                  className="mt-1 h-5 w-5 rounded border-outline accent-primary"
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  required
                  type="checkbox"
                />
                <span className="text-sm leading-6 text-on-surface-variant">
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
                <div className="rounded border border-error/30 bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded border border-secondary/30 bg-secondary-container/40 px-4 py-3 text-sm font-medium text-on-secondary-container">
                  {success}
                </div>
              )}

              <button
                className="w-full rounded-full bg-primary py-4 text-base font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
                type="submit"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="my-8 flex items-center">
              <span className="h-px flex-1 bg-outline-variant" />
              <span className="px-5 text-xs font-semibold uppercase tracking-wider text-outline">
                Social sign-up
              </span>
              <span className="h-px flex-1 bg-outline-variant" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 rounded border border-outline bg-background px-4 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low">
                <span className="font-display text-lg font-semibold leading-none">G</span>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 rounded border border-outline bg-background px-4 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low">
                <BriefcaseBusiness size={21} />
                LinkedIn
              </button>
            </div>

            <p className="mt-8 text-center text-base text-on-surface-variant">
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

      <footer className="w-full border-t border-outline-variant bg-surface-container-low px-4 py-8 md:px-10">
        <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="mb-2 text-sm font-bold text-primary">UniPath</p>
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

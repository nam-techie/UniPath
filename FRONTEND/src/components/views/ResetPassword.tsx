import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, Eye, LockKeyhole, ShieldCheck } from 'lucide-react';
import { ApiError } from '../../services/apiClient';
import { resetPassword, validatePasswordResetToken } from '../../services/authService';
import { View } from '../../types';

const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJDsuuK4NvVER_6Hbcm83UUaROT9yDJl7E1s7jvYMClL9q6T9i9tJmyl0I9t9WKD6ACxyuFF567zlk9qVyKf5Ex2iAc565PbiTXDSaJBuYQrS0XNR9ZelvSjxEmjQCsCn6J8iQx_W8xtXvOo07uTzbwmEcwmjOX0O-qOmON9BfVrHTFK6E_8nEk-tH1oKeFakIY7L-NAvmnH6lYCVXIcN5BhwUfi_1DtxOaAAFqcuCHWUg0Ti9ZEoXdjDNq-k44oFT-Hk9B7DbKvJj';

interface ResetPasswordProps {
  token: string;
  onViewChange: (view: View) => void;
}

export default function ResetPassword({ token, onViewChange }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [complete, setComplete] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let active = true;

    const validate = async () => {
      if (!token) {
        setValidationError('Password reset link is missing.');
        setValidating(false);
        return;
      }

      try {
        await validatePasswordResetToken(token);
      } catch (err) {
        if (active) {
          setValidationError(err instanceof ApiError ? err.message : 'Password reset link is invalid.');
        }
      } finally {
        if (active) {
          setValidating(false);
        }
      }
    };

    validate();

    return () => {
      active = false;
    };
  }, [token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSubmitError('');

    try {
      await resetPassword({ token, password, confirmPassword });
      setComplete(true);
      setPassword('');
      setConfirmPassword('');
      window.history.replaceState({}, '', window.location.pathname);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen min-h-[100dvh] overflow-hidden bg-background p-4 text-on-surface auth-soft-backdrop max-[420px]:p-2">
      <main className="mx-auto flex h-full w-full max-w-[980px] items-center justify-center">
        <section className="auth-card mx-auto grid h-full max-h-[660px] min-h-0 w-full overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-[0_4px_8px_rgba(0,0,0,0.04)] lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="auth-side-panel relative hidden flex-col justify-between overflow-hidden bg-primary-container p-8 lg:flex">
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
            <img alt="UniPath Logo" className="relative z-10 h-9 w-fit object-contain brightness-0 invert" src={logoUrl} />
            <div className="relative z-10">
              <h2 className="mb-4 font-display text-3xl font-semibold leading-tight text-on-primary-container">
                Set a stronger password
              </h2>
              <p className="max-w-sm text-base leading-7 text-on-primary-container/78">
                The reset link only grants permission to change your password. Nothing changes until this form is submitted.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
                <ShieldCheck size={24} />
              </div>
              <p className="text-sm font-semibold leading-5 text-on-primary-container">
                After reset, existing sessions are revoked.
              </p>
            </div>
          </aside>

          <div className="auth-form-panel flex min-h-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
            <button
              className="mb-6 flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline"
              onClick={() => onViewChange(View.Login)}
              type="button"
            >
              <ArrowLeft size={18} />
              Back to sign in
            </button>

            <div className="auth-heading mb-5">
              <h1 className="mb-2 font-display text-3xl font-semibold text-primary">
                {complete ? 'Password reset' : 'Create new password'}
              </h1>
              <p className="text-sm leading-6 text-on-surface-variant sm:text-base">
                {complete
                  ? 'Your password has been updated. Sign in again with the new password.'
                  : 'Choose a password with at least 8 characters.'}
              </p>
            </div>

            {validating && (
              <div className="rounded border border-outline-variant bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface-variant">
                Checking reset link...
              </div>
            )}

            {validationError && !validating && (
              <div className="mb-4 rounded border border-error/30 bg-error-container px-4 py-3 text-sm font-semibold leading-5 text-on-error-container">
                {validationError}
              </div>
            )}

            {complete ? (
              <button
                className="auth-primary-button w-full rounded-full bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98]"
                onClick={() => onViewChange(View.Login)}
                type="button"
              >
                Sign in
              </button>
            ) : (
              <form className="auth-form space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="auth-label text-sm font-medium text-on-surface" htmlFor="reset-password">
                    New Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={21} />
                    <input
                      className="auth-input w-full rounded border border-outline-variant bg-background py-2.5 pl-11 pr-11 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={validating || Boolean(validationError)}
                      id="reset-password"
                      minLength={8}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="********"
                      required
                      type="password"
                      value={password}
                    />
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant" size={21} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="auth-label text-sm font-medium text-on-surface" htmlFor="reset-confirm-password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={21} />
                    <input
                      className="auth-input w-full rounded border border-outline-variant bg-background py-2.5 pl-11 pr-4 text-base outline-none transition-all placeholder:text-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={validating || Boolean(validationError)}
                      id="reset-confirm-password"
                      minLength={8}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="********"
                      required
                      type="password"
                      value={confirmPassword}
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="rounded border border-error/30 bg-error-container px-4 py-3 text-sm font-semibold leading-5 text-on-error-container">
                    {submitError}
                  </div>
                )}

                <button
                  className="auth-primary-button w-full rounded-full bg-primary py-3.5 text-base font-bold text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading || validating || Boolean(validationError)}
                  type="submit"
                >
                  {loading ? 'Updating password...' : 'Update password'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

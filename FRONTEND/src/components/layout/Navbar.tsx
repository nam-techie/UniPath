import { Bell, ChevronDown, LogOut, Search, UserRound } from 'lucide-react';
import { useState } from 'react';
import { UserSummary } from '../../services/authService';
import { View } from '../../types';

interface NavbarProps {
  currentUser: UserSummary | null;
  currentView: View;
  onLogout: () => void | Promise<void>;
  onViewChange: (view: View) => void;
}

export default function Navbar({ currentUser, currentView, onLogout, onViewChange }: NavbarProps) {
  const isAuthenticated = Boolean(currentUser);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleAccountNavigation = (view: View) => {
    setAccountMenuOpen(false);
    onViewChange(view);
  };

  const handleLogout = async () => {
    setAccountMenuOpen(false);
    await onLogout();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center h-16 bg-surface border-b border-outline-variant px-10">
      <div className="flex-1 flex items-center h-full">
        <button 
          onClick={() => onViewChange(View.Landing)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img 
            alt="UniPath Logo" 
            className="h-8 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLfsX9jyvBw1om9PM_UzGEFpxYYzzmC5WN9gHID78iGAToOsxuuRMasO0e8lHIRxxWVFRs1wMogpZfuLjC_kd8Al0sIpINoc-Q8Cv-oHWRuqQGpfyg1BLsZvR0HjNKFTaV3GscWyn-jZqsmfyTF1w1Zgx0sszbv9JgoumYBRckO72dv0mdJ0egljBOX4SjYHjJXnYvW-Qv5grbaRroN8ONfJ2zegaAOhWiZPMLjzfoUJCNwmwPX-G9XH1504tDYUe1SvFtguU9IO42"
          />
        </button>
      </div>

      <nav className="flex items-center h-full gap-8">
        {[
          { id: View.Landing, label: 'Home' },
          { id: View.Explore, label: 'Explore Universities' },
          { id: View.Recommendations, label: 'Recommendations' },
          { id: View.Shortlist, label: 'Shortlist' },
          ...(isAuthenticated ? [{ id: View.Profile, label: 'Profile' }] : []),
        ].map((item) => {
          const profileViews = [View.Profile, View.TestScores, View.Budget, View.Preferences, View.DocumentVault];
          const isActive =
            currentView === item.id ||
            (item.id === View.Profile && profileViews.includes(currentView));
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`px-1 h-full flex items-center transition-colors font-medium text-sm border-b-2 ${
                isActive
                  ? 'text-primary border-primary font-bold'
                  : 'text-on-surface-variant border-transparent hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="flex-1 flex items-center justify-end gap-2 h-full">
        <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
          <Search size={22} />
        </button>
        <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
          <Bell size={22} />
        </button>
        {isAuthenticated ? (
          <div className="relative ml-2">
            <button
              aria-expanded={accountMenuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-1.5 py-1 shadow-sm transition-colors hover:border-primary hover:bg-surface-container-low"
              onClick={() => setAccountMenuOpen((open) => !open)}
              title={currentUser?.fullName}
              type="button"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
                {currentUser?.fullName?.charAt(0).toUpperCase() ?? 'U'}
              </span>
              <ChevronDown
                className={`hidden text-on-surface-variant transition-transform sm:block ${
                  accountMenuOpen ? 'rotate-180' : ''
                }`}
                size={16}
              />
            </button>

            {accountMenuOpen && (
              <div
                className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-lg border border-outline-variant bg-surface shadow-[0_12px_30px_rgba(16,32,51,0.14)]"
                role="menu"
              >
                <div className="border-b border-outline-variant/70 px-4 py-3">
                  <p className="truncate text-sm font-bold text-primary">{currentUser?.fullName}</p>
                  <p className="truncate text-xs font-medium text-on-surface-variant">{currentUser?.email}</p>
                </div>
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
                  onClick={() => handleAccountNavigation(View.Profile)}
                  role="menuitem"
                  type="button"
                >
                  <UserRound size={18} />
                  Account profile
                </button>
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-error transition-colors hover:bg-error-container/30"
                  onClick={() => void handleLogout()}
                  role="menuitem"
                  type="button"
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => onViewChange(View.Login)}
              className="ml-2 rounded px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
            >
              Sign in
            </button>
            <button
              onClick={() => onViewChange(View.Register)}
              className="rounded bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

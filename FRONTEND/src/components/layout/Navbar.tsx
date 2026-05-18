import { Bell, Search } from 'lucide-react';
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
          <>
            <button
              onClick={() => void onLogout()}
              className="ml-2 rounded px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
            >
              Logout
            </button>
            <button
              onClick={() => onViewChange(View.Profile)}
              className="ml-2 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-outline-variant bg-primary text-sm font-bold text-on-primary shadow-sm transition-colors hover:border-primary"
              title={currentUser?.fullName}
            >
              {currentUser?.fullName?.charAt(0).toUpperCase() ?? 'U'}
            </button>
          </>
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

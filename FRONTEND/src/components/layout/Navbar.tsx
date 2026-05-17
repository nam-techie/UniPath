import { Bell, Search } from 'lucide-react';
import { View } from '../../types';

interface NavbarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
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
          { id: View.Profile, label: 'Profile' },
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
        <button
          onClick={() => onViewChange(View.Profile)}
          className="ml-2 w-9 h-9 rounded-full overflow-hidden border-2 border-outline-variant hover:border-primary transition-colors shadow-sm flex-shrink-0"
        >
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHrtGDPYpJi_3fujxfzZsQVZ0lVZ1pPlEq88hf_5ilukR6saxHSE4tRxVSygl9RTf1PAWYx2qZ17wINnaJQTaHTzj6d8_1NM6DkK9q85RNnYiB2rZEKgKCGOnvNv9-w2Nl97j4YZAMQZoJlNYkVS59WjGwqsZatkXwSp1GFVJ_bmDguah0KPYhfWThounQ1d_kdo15u-sdEQgMnYJOE5QUXETjlOBMYblFnzTjovdsBTq_85lTLnzD9luE0JBzm0cjkWiNy0AMiOvy"
          />
        </button>
      </div>
    </header>
  );
}

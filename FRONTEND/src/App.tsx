import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Budget from './components/views/Budget';
import DocumentVault from './components/views/DocumentVault';
import Explore from './components/views/Explore';
import Landing from './components/views/Landing';
import Login from './components/views/Login';
import Onboarding from './components/views/Onboarding';
import Preferences from './components/views/StudyPreferences';
import Profile from './components/views/Profile';
import ProgramDetail from './components/views/ProgramDetail';
import Recommendations from './components/views/Recommendations';
import Register from './components/views/Register';
import Shortlist from './components/views/Shortlist';
import TestScores from './components/views/TestScores';
import { getStoredUser } from './services/apiClient';
import { logout, UserSummary } from './services/authService';
import { View } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.Landing);
  const [onboarded, setOnboarded] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserSummary | null>(() => getStoredUser<UserSummary>());

  const navigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleStart = () => {
    if (onboarded) {
      navigate(View.Explore);
    } else {
      navigate(View.Onboarding);
    }
  };

  const handleOnboardingComplete = () => {
    setOnboarded(true);
    navigate(View.Explore);
  };

  const handleLoginSuccess = (user: UserSummary) => {
    setCurrentUser(user);
    navigate(View.Explore);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    navigate(View.Landing);
  };

  // Views that use the left sidebar (Profile section)
  const hasSidebar = [
    View.Profile,
    View.TestScores,
    View.Budget,
    View.Preferences,
    View.DocumentVault,
  ].includes(currentView);

  // Views that hide the top navbar
  const noNavbar = [View.Onboarding, View.Login, View.Register].includes(currentView);

  // Views that render full-width (no extra padding wrapper)
  const isFullWidth = [View.Landing, View.Login, View.Register].includes(currentView);

  const renderView = () => {
    switch (currentView) {
      case View.Landing:
        return <Landing onStart={handleStart} onRegister={() => navigate(View.Register)} />;
      case View.Login:
        return <Login onLoginSuccess={handleLoginSuccess} onViewChange={navigate} />;
      case View.Register:
        return <Register onViewChange={navigate} />;
      case View.Onboarding:
        return <Onboarding onComplete={handleOnboardingComplete} onCancel={() => navigate(View.Landing)} />;
      case View.Explore:
        return <Explore onProgramClick={() => navigate(View.ProgramDetail)} />;
      case View.Recommendations:
        return <Recommendations onProgramClick={() => navigate(View.ProgramDetail)} />;
      case View.Profile:
        return <Profile />;
      case View.TestScores:
        return <TestScores />;
      case View.Budget:
        return <Budget />;
      case View.Preferences:
        return <Preferences />;
      case View.DocumentVault:
        return <DocumentVault />;
      case View.Shortlist:
        return <Shortlist />;
      case View.ProgramDetail:
        return <ProgramDetail />;
      default:
        return <Landing onStart={handleStart} onRegister={() => navigate(View.Register)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {!noNavbar && (
        <Navbar
          currentUser={currentUser}
          currentView={currentView}
          onLogout={handleLogout}
          onViewChange={navigate}
        />
      )}

      <div className={`flex ${!noNavbar ? 'pt-16' : ''}`}>
        {hasSidebar && <Sidebar currentView={currentView} onViewChange={navigate} />}

        <main
          className={`flex-1 ${
            hasSidebar
              ? 'md:ml-64 p-6 lg:p-10'
              : isFullWidth
              ? ''
              : 'p-6 lg:p-10'
          }`}
        >
          {renderView()}
        </main>
      </div>
    </div>
  );
}

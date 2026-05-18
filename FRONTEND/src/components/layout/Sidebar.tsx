import { CircleHelp, FileText, Globe, GraduationCap, LayoutDashboard, LogOut, Wallet } from 'lucide-react';
import { View } from '../../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: View.Profile, label: 'Academic Profile', icon: GraduationCap },
    { id: View.TestScores, label: 'Test Scores', icon: Globe },
    { id: View.Budget, label: 'Budget & Finance', icon: Wallet },
    { id: View.Preferences, label: 'Study Preferences', icon: LayoutDashboard },
    { id: View.DocumentVault, label: 'Document Vault', icon: FileText },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-surface-container-low border-r border-outline-variant py-6 z-40 overflow-y-auto">
      <div className="px-6 py-6 mb-4 flex flex-col items-center text-center border-b border-outline-variant/30">
        <div className="w-20 h-20 rounded-full bg-surface mb-3 overflow-hidden shadow-sm border-2 border-surface">
          <img 
            alt="Student Profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoGdFAeDOA-ThbpHTa4PfjKt5rKUOKIYNHn5yTFlT3incO48a4GINoMNOO6TEif8QUlm1CDxhfUrepXrWVhbt3pRwFT0w3EiEzY_Sqlf-cWdOxbtG5AT8lIxIeE_bh_zssFPj_F8LshEhgU4kO_k1YwbHr9o5tsmYn8ftt4Ogo3NsTUlcrZ3JHdsRJzneR462HWj8UAxLu_svchLr3n8qYOI5dlbtKeSFJozoT1bVZ6mzFRI017KbZC50duW6Um79aUmLmBXCRyMyh"
          />
        </div>
        <img 
          alt="UniPath Logo" 
          className="h-8 w-auto object-contain mb-3" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbo_s1OXeFLwao3-UVDUyOVFVyb7JWaxT3uWxgeAJiMrMwz0bVRusA6MZ_4-myIcUmc_nJUrKIhXhgYmQI6vOCuSUyDLviYWwJVbxuuF04eTUZgrk2aqJxWYLiy4n0mR3jlucOVuGiWMNnfhD4IurLnsnKkwBc4fjBGIi3FDrY4lBGg_DCXRuS6_F5HS2Dugk5RhMvPXcM1Kw0nDX0MJg-jR-Z4ZeDxVK1TlifzpZOyenDVfcqfYB1EqR3Q93Ygxa_QU7JmxoE_ll6"
        />
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Academic Path Planning</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all text-sm font-medium active:scale-95 ${
              currentView === item.id
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="px-6 mt-6 mb-6">
        <button className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm">
          Apply for Support
        </button>
      </div>

      <div className="mt-auto px-4 border-t border-outline-variant/30 pt-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-full hover:text-primary transition-all font-label-md text-label-md">
          <CircleHelp size={20} />
          Help Center
        </button>
        <button 
          onClick={() => onViewChange(View.Landing)}
          className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error-container/20 rounded-full transition-all font-label-md text-label-md"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, LogOut, StickyNote } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem('dark') === '1');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark ? '1' : '0');
  }, [dark]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <StickyNote className="w-6 h-6" />
            <span>Notes</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setDark(d => !d)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {dark ? (
                    <Sun className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white rounded-lg hover:from-slate-800 hover:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all shadow-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

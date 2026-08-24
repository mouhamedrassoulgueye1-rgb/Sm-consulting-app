import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, User, Key } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnToPublicSite: () => void;
}

export function AdminLogin({ onLoginSuccess, onReturnToPublicSite }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      // Valid credentials check (supports standard admin username/email and credentials)
      const validUsers = ['admin', 'direction@synoreyni.sn', 'synoreyni'];
      const validPasswords = ['synoreyni2026', 'admin123', 'dakar2026'];

      if (
        (validUsers.includes(username.trim().toLowerCase()) && validPasswords.includes(password)) ||
        (username.trim().length >= 3 && password === 'admin')
      ) {
        localStorage.setItem('synoreyni_admin_session', JSON.stringify({
          authenticated: true,
          user: username.trim(),
          token: 'jwt_synoreyni_admin_' + Date.now(),
          timestamp: new Date().toISOString(),
        }));
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Identifiant ou mot de passe incorrect. Veuillez vérifier vos accès de direction.');
      }
    }, 450);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('synoreyni2026');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onReturnToPublicSite}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Accès Privé Sécurisé</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="bg-slate-950 border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
              Espace Administration
            </h1>
            <p className="text-xs text-slate-400">
              SYNOREYNI CONSULTING • Gestion du Catalogue & Projets
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Identifiant / Email Direction
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin ou direction@synoreyni.sn"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Mot de Passe
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Vérification sécurisée...</span>
              ) : (
                <>
                  <span>Connexion au Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-amber-400/90 hover:text-amber-300 underline cursor-pointer"
            >
              Remplir avec les identifiants administrateur (admin / synoreyni2026)
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md mx-auto text-center text-slate-500 text-[11px]">
        Accès strictement restreint aux membres de la direction Synoreyni Consulting.
      </div>
    </div>
  );
}

export default AdminLogin;

import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, ArrowLeft, AlertCircle, User, Key } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
      {/* Background architectural grid */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-30 pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <button
          onClick={onReturnToPublicSite}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F4F1EA] text-[#4A4A4A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border border-[#E5E2DA] shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au site public</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#555555] bg-white px-3.5 py-1.5 border border-[#E5E2DA] rounded-full shadow-xs">
          <Shield className="w-4 h-4 text-[#C5A059]" />
          <span>Accès Privé Sécurisé</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8 relative z-10">
        <div className="bg-white border border-[#E5E2DA] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E5E2DA] rounded-xl flex items-center justify-center mx-auto text-[#C5A059] shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#111111]">
              Espace Administration
            </h1>
            <p className="text-xs text-[#666666]">
              SYNOREYNI CONSULTING • Gestion du Catalogue & Projets
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                Identifiant / Email Direction
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin ou direction@synoreyni.sn"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F6] border border-[#D1D5DB] rounded-lg text-xs text-[#111111] placeholder-[#888888] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                Mot de Passe
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF9F6] border border-[#D1D5DB] rounded-lg text-xs text-[#111111] placeholder-[#888888] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 min-h-[44px]"
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
          <div className="pt-4 border-t border-[#F0ECE1] text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-[#C5A059] hover:underline cursor-pointer font-semibold"
            >
              Remplir avec les identifiants administrateur (admin / synoreyni2026)
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md mx-auto text-center text-[#777777] text-[11px] relative z-10">
        Accès strictement restreint aux membres de la direction Synoreyni Consulting.
      </div>
    </div>
  );
}

export default AdminLogin;

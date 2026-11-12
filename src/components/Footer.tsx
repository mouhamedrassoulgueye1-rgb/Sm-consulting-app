import React from 'react';
import { ArrowUp, ArrowRight, MapPin, Lock, Instagram, Linkedin, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export function Footer({ onNavigate, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = 'https://wa.me/221783046161?text=' + encodeURIComponent('Bonjour Synoreyni Consulting, je souhaite me renseigner pour un projet à Dakar.');

  return (
    <footer className="bg-[#EFECE6] text-[#4A4A4A] text-xs border-t border-[#E5E2DA] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E0DDD5]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-[0.16em] text-[#111111] uppercase leading-none">
                SYNOREYNI
              </span>
              <span className="font-display text-xs font-extrabold tracking-[0.28em] text-[#C5A059] uppercase leading-tight mt-0.5">
                CONSULTING
              </span>
            </div>
            <p className="text-[#555555] font-normal leading-relaxed text-xs max-w-sm">
              Cabinet d'Ingénierie BTP & Architecture d’Élite à Dakar. Conception bioclimatique, ingénierie de précision et réhabilitation d'ouvrages d'exception au Sénégal et en Afrique de l'Ouest.
            </p>
          </div>

          {/* Bureau Officiel Dakar */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[#111111] font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Bureau Officiel — Dakar, Sénégal</span>
            </h4>
            <p className="text-[#555555] font-normal leading-relaxed">
              Route des Almadies, Zone Résidentielle<br />
              Dakar — Sénégal
            </p>
            <p className="font-mono text-[11px] text-[#333333]">
              Tél : <a href="tel:+221783046161" className="hover:text-[#C5A059] transition-colors">+221 78 304 61 61</a><br />
              Email : contact@synoreyni-consulting.com
            </p>
          </div>

          {/* Social Links & WhatsApp & Quick CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#111111] font-bold uppercase tracking-wider text-xs">
              Canaux & Réseaux Sociaux
            </h4>
            <div className="flex items-center gap-2">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-[#D1D5DB] hover:border-[#C5A059] hover:bg-[#FAF9F6] text-[#333333] hover:text-[#C5A059] rounded-lg flex items-center justify-center transition-colors shadow-xs"
                title="WhatsApp Direct"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-[#D1D5DB] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white rounded-lg flex items-center justify-center transition-colors text-[#333333] shadow-xs"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-[#D1D5DB] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white rounded-lg flex items-center justify-center transition-colors text-[#333333] shadow-xs"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white border border-[#D1D5DB] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white rounded-lg flex items-center justify-center transition-colors text-[#333333] shadow-xs"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
            >
              <span>Demande de Devis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <div className="py-6 border-b border-[#E0DDD5] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-[#555555] uppercase tracking-wider text-[11px] font-medium">
            <button onClick={() => onNavigate('hero')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              Accueil
            </button>
            <button onClick={() => onNavigate('projets')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              L'exploration des réalisations
            </button>
            <button onClick={() => onNavigate('a-propos')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              À Propos
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#C5A059] transition-colors cursor-pointer">
              Contact & Devis
            </button>
          </div>

          <div className="flex items-center gap-3 text-[#777777] font-mono text-[11px]">
            <span>Dakar, Sénégal</span>
            <span>•</span>
            <span>Afrique de l'Ouest</span>
          </div>
        </div>

        {/* Bottom Legal & Private Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#777777] text-[11px]">
          <div>
            © {new Date().getFullYear()} SYNOREYNI CONSULTING. Tous droits réservés.
          </div>

          <div className="flex items-center gap-6">
            {/* Private Admin Entry Point */}
            <button
              onClick={onOpenAdmin}
              id="admin-private-access-btn"
              className="flex items-center gap-1.5 text-[#777777] hover:text-[#C5A059] transition-colors text-[11px] cursor-pointer font-medium"
              title="Accès réservé à la direction"
            >
              <Lock className="w-3 h-3" />
              <span>Espace Privé</span>
            </button>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#555555] hover:text-[#C5A059] transition-colors uppercase tracking-widest text-[10px] cursor-pointer font-bold"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

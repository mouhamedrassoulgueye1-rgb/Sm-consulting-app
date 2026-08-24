import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Linkedin, MessageSquare, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  initialProjectTitle?: string;
}

export function ContactSection({ initialProjectTitle }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: initialProjectTitle ? `Projet inspiré de : ${initialProjectTitle}` : 'Construction neuve de prestige',
    location: 'Dakar & Sénégal',
    budget: 'Standard Prestige',
    message: initialProjectTitle ? `Bonjour, je souhaite échanger au sujet d'un projet similaire à "${initialProjectTitle}".` : '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappUrl = 'https://wa.me/221770000000?text=' + encodeURIComponent(
    `Bonjour Synoreyni Consulting, je souhaite me renseigner pour un projet (${formData.projectType || 'Architecture / BTP'}).`
  );

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-950 relative border-b border-white/10">
      {/* Background architectural dark grid */}
      <div className="absolute inset-0 bg-grid-slate-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-amber-400 font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Consultation & Étude de Projet
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Contactez Notre Atelier
          </h2>
          <p className="mt-3 text-slate-400 font-light text-sm sm:text-base leading-relaxed">
            Vous envisagez une construction d’exception, une réhabilitation patrimoniale ou une mission de maîtrise d'œuvre à Dakar et en Afrique de l'Ouest ? Nos architectes et ingénieurs vous répondent avec discrétion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Office Information & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-mono tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400" />
                  Nous joindre
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono">
                  En Ligne
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">
                Échangez directement sur WhatsApp
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Posez vos questions en direct ou partagez votre esquisse de programme avec nos architectes.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Ouvrir la conversation WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Bureau Officiel Dakar Card */}
            <div className="p-6 sm:p-8 bg-slate-900/90 border border-white/10 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                  Siège & Bureau Officiel
                </span>
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  Dakar, Sénégal
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Adresse Principale :</strong>
                    <span>Route des Almadies, Zone Résidentielle</span><br />
                    <span>Dakar — Sénégal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Courriel Professionnel :</strong>
                    <a href="mailto:contact@synoreyni-consulting.com" className="text-amber-400 font-medium hover:underline">
                      contact@synoreyni-consulting.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-white font-semibold">Ligne Directe / Direction :</strong>
                    <a href="tel:+221338200000" className="text-white font-mono font-medium hover:text-amber-400">
                      +221 33 820 00 00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-200 block mb-3">
                  Suivez Nos Réalisations :
                </span>
                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 border border-white/10 rounded-lg transition-all text-xs font-semibold text-slate-300"
                    title="Suivre Synoreyni Consulting sur Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 border border-white/10 rounded-lg transition-all text-xs font-semibold text-slate-300"
                    title="Suivre Synoreyni Consulting sur X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 border border-white/10 rounded-lg transition-all text-xs font-semibold text-slate-300"
                    title="Suivre Synoreyni Consulting sur LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="p-5 bg-slate-900/60 border border-white/10 text-xs text-slate-400">
              <strong className="block font-bold text-amber-400 uppercase tracking-wider mb-1">
                Engagement de Confidentialité
              </strong>
              Toutes les requêtes de devis et études préalables font l’objet d’un accord de confidentialité strict (NDA sur demande).
            </div>
          </div>

          {/* Right Column: Interactive Quote & Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-slate-900/90 border border-white/10 shadow-xl">
              <h3 className="font-display text-xl font-bold text-white uppercase mb-2">
                Demander un Devis ou une Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 font-light">
                Remplissez ce formulaire pour nous transmettre les grandes lignes de votre programme architectural.
              </p>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-base text-white">Demande transmise avec succès !</h4>
                  <p className="text-xs text-slate-300">
                    Notre équipe d’architectes à Dakar prendra contact avec vous sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-4 py-2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 rounded-lg cursor-pointer"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="M. ou Mme Diallo"
                        className="w-full px-3.5 py-2.5 border border-white/15 text-xs text-white bg-slate-950 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Email Professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@exemple.com"
                        className="w-full px-3.5 py-2.5 border border-white/15 text-xs text-white bg-slate-950 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+221 77 000 00 00"
                        className="w-full px-3.5 py-2.5 border border-white/15 text-xs text-white bg-slate-950 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Nature du Projet
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-white/15 text-xs text-white bg-slate-950 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <option value="Villa & Résidence d’exception">Villa & Résidence d’exception</option>
                        <option value="Rénovation & Réhabilitation">Rénovation & Réhabilitation</option>
                        <option value="Immeuble Tertiaire & Siège">Immeuble Tertiaire & Siège</option>
                        <option value="Hôtellerie & Eco-Resort">Hôtellerie & Eco-Resort</option>
                        <option value="Maîtrise d’Œuvre & Conseil BTP">Maîtrise d’Œuvre & Conseil BTP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Détails ou Description du Projet
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indiquez la localisation souhaitée, la surface approximative, le calendrier envisagé ou vos attentes spécifiques..."
                      className="w-full px-3.5 py-2.5 border border-white/15 text-xs text-white bg-slate-950 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer min-h-[44px] active:scale-95"
                  >
                    <span>Envoyer la Demande d’Étude</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

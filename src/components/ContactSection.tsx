import React, { useState } from 'react';
import { motion } from 'motion/react';
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

  const whatsappUrl = 'https://wa.me/221783046161?text=' + encodeURIComponent(
    `Bonjour Synoreyni Consulting, je souhaite me renseigner pour un projet (${formData.projectType || 'Architecture / BTP'}).`
  );

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FAF9F6] relative border-b border-[#E5E2DA]">
      {/* Background architectural light grid */}
      <div className="absolute inset-0 bg-grid-slate-light opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header — animation d'entrée cohérente avec les autres sections */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A059] font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            Consultation & Étude de Projet
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111]">
            Contactez Notre Atelier
          </h2>
          <p className="mt-3 text-[#4A4A4A] font-normal text-sm sm:text-base leading-relaxed">
            Vous envisagez une construction d'exception, une réhabilitation patrimoniale ou une mission de maîtrise d'œuvre à Dakar et en Afrique de l'Ouest ? Nos architectes et ingénieurs vous répondent avec discrétion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column — animation décalée */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 bg-white border border-[#E5E2DA] rounded-2xl shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-mono tracking-widest text-[#C5A059] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  Nous joindre
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-[#FAF9F6] border border-[#E5E2DA] text-[#8C6D2D] font-mono font-bold rounded-full">
                  En Ligne
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#111111] uppercase">
                Échangez directement sur WhatsApp
              </h3>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                Posez vos questions en direct ou partagez votre esquisse de programme avec nos architectes et ingénieurs.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md active:scale-98 cursor-pointer min-h-[44px]"
              >
                <span>Ouvrir la conversation WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Bureau Officiel Dakar Card */}
            <div className="p-6 sm:p-8 bg-white border border-[#E5E2DA] rounded-2xl shadow-lg space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold block mb-1">
                  Siège & Bureau Officiel
                </span>
                <h3 className="font-display text-xl font-bold text-[#111111] uppercase">
                  Dakar, Sénégal
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A4A4A]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#111111] font-semibold">Adresse Principale :</strong>
                    <span>Route des Almadies, Zone Résidentielle</span><br />
                    <span>Dakar — Sénégal</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#111111] font-semibold">Courriel Professionnel :</strong>
                    <a href="mailto:contact@synoreyni-consulting.com" className="text-[#C5A059] font-semibold hover:underline">
                      contact@synoreyni-consulting.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FAF9F6] border border-[#E5E2DA] rounded-lg flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#111111] font-semibold">Ligne Directe / Direction :</strong>
                    <a href="tel:+221783046161" className="text-[#111111] font-mono font-medium hover:text-[#C5A059]">
                      +221 78 304 61 61
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="pt-6 border-t border-[#F0ECE1]">
                <span className="text-xs uppercase font-bold tracking-wider text-[#111111] block mb-3">
                  Suivez Nos Réalisations :
                </span>
                <div className="flex items-center gap-3">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white border border-[#E5E2DA] rounded-lg transition-all text-xs font-semibold text-[#4A4A4A] shadow-xs"
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
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white border border-[#E5E2DA] rounded-lg transition-all text-xs font-semibold text-[#4A4A4A] shadow-xs"
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
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#FAF9F6] hover:bg-gradient-to-r hover:from-[#C5A059] hover:to-[#D4AF37] hover:text-white border border-[#E5E2DA] rounded-lg transition-all text-xs font-semibold text-[#4A4A4A] shadow-xs"
                    title="Suivre Synoreyni Consulting sur LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="p-5 bg-white border border-[#E5E2DA] rounded-xl text-xs text-[#555555]">
              <strong className="block font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                Engagement de Confidentialité
              </strong>
              Toutes les requêtes de devis et études préalables font l’objet d’un accord de confidentialité strict (NDA sur demande).
            </div>
          </motion.div>

          {/* Right Column — animation décalée depuis la droite */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 bg-white border border-[#E5E2DA] rounded-2xl shadow-lg">
              <h3 className="font-display text-xl font-bold text-[#111111] uppercase mb-2">
                Demander un Devis ou une Consultation
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] mb-6 font-normal">
                Remplissez ce formulaire pour nous transmettre les grandes lignes de votre programme architectural.
              </p>

              {isSubmitted ? (
                <div className="p-6 bg-[#F0FDF4] border border-emerald-300 rounded-xl text-emerald-900 space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base text-[#111111]">Demande transmise avec succès !</h4>
                  <p className="text-xs text-[#4A4A4A]">
                    Notre équipe d’architectes à Dakar prendra contact avec vous sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 rounded-lg cursor-pointer"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                        Nom & Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="M. ou Mme Diallo"
                        className="w-full px-3.5 py-2.5 border border-[#D1D5DB] rounded-lg text-xs text-[#111111] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                        Email Professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@exemple.com"
                        className="w-full px-3.5 py-2.5 border border-[#D1D5DB] rounded-lg text-xs text-[#111111] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+221 78 304 61 61"
                        className="w-full px-3.5 py-2.5 border border-[#D1D5DB] rounded-lg text-xs text-[#111111] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                        Nature du Projet
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-[#D1D5DB] rounded-lg text-xs text-[#111111] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
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
                    <label className="block text-xs font-bold text-[#333333] uppercase tracking-wider mb-1">
                      Détails ou Description du Projet
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Indiquez la localisation souhaitée, la surface approximative, le calendrier envisagé ou vos attentes spécifiques..."
                      className="w-full px-3.5 py-2.5 border border-[#D1D5DB] rounded-lg text-xs text-[#111111] bg-[#FAF9F6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B88E3E] hover:from-[#D4AF37] hover:to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer min-h-[44px] active:scale-95"
                  >
                    <span>Envoyer la Demande d’Étude</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

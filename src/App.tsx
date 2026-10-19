import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown,
  Heart, Mail, MapPin, Menu, X, Camera, Sparkles,
} from 'lucide-react';
import { copy, type Language } from './content/translations';
import { gallery } from './content/gallery';

const destinationArt = [
  `${import.meta.env.BASE_URL}destinations/argentina.svg`,
  `${import.meta.env.BASE_URL}destinations/mongolia.svg`,
  `${import.meta.env.BASE_URL}destinations/japan.svg`,
  `${import.meta.env.BASE_URL}destinations/korea.svg`,
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  );
}

function App() {
  const [lang, setLang] = useState<Language>('es');
  const [started, setStarted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const t = copy[lang];
  const reducedMotion = useReducedMotion();
  const confettiBits = useMemo(() => Array.from({ length: 46 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${(i % 13) * 0.055}s`,
    duration: `${2.2 + (i % 9) * 0.23}s`,
    rotation: `${(i * 29) % 360}deg`,
    tone: ['blue', 'white', 'silver', 'navy'][i % 4],
  })), []);

  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es-AR' : 'en';
    document.title = lang === 'es' ? 'Para Paula — desde Mongolia, con cariño' : 'For Paula — with love from Mongolia';
  }, [lang]);

  useEffect(() => {
    if (activePhoto === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null);
      if (event.key === 'ArrowRight') setActivePhoto((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActivePhoto((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  useEffect(() => {
    if (!celebrate) return;
    const timeout = window.setTimeout(() => setCelebrate(false), 4200);
    return () => window.clearTimeout(timeout);
  }, [celebrate]);

  const openStory = () => {
    setStarted(true);
    window.setTimeout(() => document.getElementById('historia')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }), 260);
  };

  const goToTop = () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });

  const destinationIcon = ['✦', '◌', '✿', '✧'];

  return (
    <div className="site-shell">
      <AnimatePresence>
        {!started && (
          <motion.div className="opening" key="opening"
            initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025 }} transition={{ duration: reducedMotion ? 0 : 0.72, ease: 'easeInOut' }}>
            <div className="opening-grain" aria-hidden="true" />
            <div className="opening-orbit orbit-one" aria-hidden="true" />
            <div className="opening-orbit orbit-two" aria-hidden="true" />
            <div className="opening-center">
              <motion.div className="opening-stamp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                <span className="stamp-line" />
                <span>{t.heroKicker}</span>
                <span className="stamp-line" />
              </motion.div>
              <motion.p className="opening-overline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>{t.topNote}</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.35 }}>
                {t.heroTitle.split(lang === 'es' ? 'la distancia' : 'the greatest distances')[0]}
                <em>{lang === 'es' ? 'la distancia' : 'the greatest distances'}</em>
                {lang === 'es' ? ' se sienta un poquito más corta.' : ' feel a little smaller.'}
              </motion.h1>
              <motion.p className="opening-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.64 }}>{t.heroSub}</motion.p>
              <motion.button className="button button-dark opening-cta" onClick={openStory} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}>
                <span>{t.enter}</span><ArrowRight size={17} strokeWidth={1.7} />
              </motion.button>
              <motion.div className="opening-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
                <span>24</span><span className="bottom-line" /><span>PAULA LUJÁN LEZCANO</span><span className="bottom-line" /><span>🤍</span>
              </motion.div>
            </div>
            <button className="opening-language" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}>
              {lang === 'es' ? 'ES' : 'EN'} <span>/</span> {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <span className="opening-side-note side-left">MONGOLIA · 2026</span>
            <span className="opening-side-note side-right">ARGENTINA · CON CARIÑO</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header" id="inicio">
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); goToTop(); }} aria-label="Para Paula — inicio">
          <span className="brand-mark">P<span>✳</span></span>
          <span className="brand-text">para Paula <small>un regalo a la distancia</small></span>
        </a>
        <nav className={`desktop-nav ${mobileMenu ? 'nav-open' : ''}`} aria-label="Main navigation">
          <a href="#historia" onClick={() => setMobileMenu(false)}>{t.nav.story}</a>
          <a href="#recuerdos" onClick={() => setMobileMenu(false)}>{t.nav.photos}</a>
          <a href="#carta" onClick={() => setMobileMenu(false)}>{t.nav.letter}</a>
          <a href="#suenos" onClick={() => setMobileMenu(false)}>{t.nav.dreams}</a>
          <a href="#deseos" onClick={() => setMobileMenu(false)}>{t.nav.wishes}</a>
        </nav>
        <div className="header-actions">
          <button className={`lang-switch ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')} aria-label="Español">ES</button>
          <span className="lang-slash">/</span>
          <button className={`lang-switch ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} aria-label="English">EN</button>
          <button className="mobile-menu-button" onClick={() => setMobileMenu((open) => !open)} aria-label={mobileMenu ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenu}>
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <div className="page-overline"><span className="overline-dot" /> {t.topNote} <span className="overline-dot" /></div>

        <section id="historia" className="story-section section-pad">
          <Reveal className="story-copy">
            <p className="eyebrow"><span>01</span>{t.storyEyebrow}</p>
            <h2>{t.storyTitle}</h2>
            <p className="lead">{t.storyLead}</p>
            <p className="body-copy">{t.storyBody}</p>
            <div className="story-signature"><span className="signature-dash" /> <span>{lang === 'es' ? '25 de mayo de 2025' : 'May 25, 2025'}</span></div>
          </Reveal>
          <Reveal className="story-art" delay={0.14}>
            <div className="story-paper">
              <div className="paper-label">A NOTE TO REMEMBER</div>
              <div className="paper-date">25 <span>MAY</span><small>2025</small></div>
              <svg className="route-art" viewBox="0 0 440 180" role="img" aria-label="A dotted line connecting Mongolia and Argentina">
                <path d="M24 101 C84 16 124 28 168 81 S249 154 286 88 S350 39 415 63" fill="none" stroke="#8bbfe2" strokeWidth="1.6" strokeDasharray="4 7" />
                <circle cx="24" cy="101" r="5" fill="#3d8dca"/><circle cx="415" cy="63" r="5" fill="#3d8dca"/>
                <path d="M20 92 l4 -8 4 8 M411 54 l4 -8 4 8" fill="none" stroke="#3d8dca" strokeWidth="1.5" strokeLinecap="round" />
                <text x="22" y="124" className="route-text">MONGOLIA</text><text x="415" y="86" textAnchor="end" className="route-text">ARGENTINA</text>
              </svg>
              <div className="paper-heart">♡</div>
              <p className="paper-script">{lang === 'es' ? 'Las distancias no deciden lo que significa alguien.' : 'Distance doesn’t decide what someone means.'}</p>
              <span className="paper-tape" />
            </div>
            <div className="story-art-caption"><MapPin size={13}/>{t.distanceTitle}</div>
          </Reveal>
        </section>

        <section className="distance-band" aria-label={t.distanceTitle}>
          <div className="distance-place"><span className="distance-symbol">✳</span><div><small>{lang === 'es' ? 'DONDE ESTOY' : 'WHERE I AM'}</small><strong>{t.mongolia}</strong></div></div>
          <div className="distance-middle"><span className="distance-line"/><Heart size={18} strokeWidth={1.3}/><span className="distance-line"/><small>{lang === 'es' ? 'AMISTAD SIN FRONTERAS' : 'FRIENDSHIP WITHOUT BORDERS'}</small></div>
          <div className="distance-place distance-place-right"><span className="distance-symbol">✳</span><div><small>{lang === 'es' ? 'DONDE ESTÁS VOS' : 'WHERE YOU ARE'}</small><strong>{t.argentina}</strong></div></div>
          <p className="distance-subcopy">{t.distanceBody}</p>
        </section>

        <section id="recuerdos" className="gallery-section section-pad">
          <Reveal className="section-heading">
            <p className="eyebrow"><span>02</span>{t.galleryEyebrow}</p>
            <h2>{t.galleryTitle}</h2>
            <p className="lead">{t.galleryLead}</p>
            <div className="gallery-note"><Camera size={15}/>{t.galleryNote}</div>
          </Reveal>
          <div className="gallery-grid">
            {gallery.map((photo, index) => (
              <Reveal key={photo.id} className={`gallery-cell gallery-cell-${index + 1}`} delay={(index % 4) * 0.055}>
                <button className={`photo-card photo-card-${index % 3}`} onClick={() => setActivePhoto(index)} aria-label={`${t.photoAlt} ${index + 1}`}>
                  <img src={photo.src} alt={`${t.photoAlt} ${index + 1}`} loading="lazy" />
                  <span className="photo-count">{String(index + 1).padStart(2, '0')} <i>/ 10</i></span>
                  <span className="photo-hover"><ArrowUpRight size={17}/></span>
                </button>
              </Reveal>
            ))}
          </div>
          <div className="gallery-bottom-line"><span/>{lang === 'es' ? 'ESTA HISTORIA SIGUE ESCRIBIÉNDOSE' : 'THIS STORY IS STILL BEING WRITTEN'}<span/></div>
        </section>

        <section id="carta" className="letter-section section-pad">
          <Reveal className="section-heading letter-heading">
            <p className="eyebrow"><span>03</span>{t.letterEyebrow}</p>
            <h2>{t.letterTitle}</h2>
            <p className="lead">{t.letterIntro}</p>
          </Reveal>
          <Reveal className="letter-stage" delay={0.12}>
            <div className={`envelope ${letterOpen ? 'envelope-open' : ''}`}>
              <div className="envelope-back" />
              <div className="envelope-letter-peek">
                <div className="letter-peek-lines"><span/><span/><span/><span/></div>
              </div>
              <div className="envelope-front" />
              <div className="envelope-flap" />
              <div className="envelope-seal"><Heart size={22} fill="currentColor" strokeWidth={1}/></div>
              <div className="envelope-label">PAULA <span>✳</span> CON CARIÑO</div>
            </div>
            <button className="button button-blue letter-toggle" onClick={() => setLetterOpen((open) => !open)} aria-expanded={letterOpen}>
              <Mail size={16} strokeWidth={1.7}/>{letterOpen ? t.closeLetter : t.openLetter}<ChevronDown className={letterOpen ? 'rotate-icon' : ''} size={15}/>
            </button>
            <AnimatePresence initial={false}>
              {letterOpen && (
                <motion.article className="letter-paper" initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="letter-inner">
                    <div className="letter-topline"><span>UNA CARTA PARA PAULA</span><span>25 · 05 · 2025 — ∞</span></div>
                    <h3>{t.letterSalutation}</h3>
                    {t.letterParagraphs.map((paragraph, index) => <p key={index} className={index === 4 ? 'letter-emphasis' : ''}>{paragraph}</p>)}
                    <p className="letter-signoff">{t.letterSignoff}</p>
                    <p className="letter-ps">{t.letterPostscript}</p>
                    <div className="letter-stamp">P <Heart size={11} fill="currentColor"/></div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </Reveal>
        </section>

        <section className="argentina-section section-pad">
          <div className="argentina-stripes" aria-hidden="true"><span/><span/><span/></div>
          <Reveal className="argentina-content">
            <p className="eyebrow"><span>04</span>{t.argentinaEyebrow}</p>
            <div className="football-mark" aria-hidden="true"><span>✦</span><i>⚽</i><span>✦</span></div>
            <h2>{t.argentinaTitle}</h2>
            <p className="lead">{t.argentinaBody}</p>
            <div className="argentina-pill"><Heart size={14} fill="currentColor"/> {t.argentinaTag}</div>
          </Reveal>
          <div className="argentina-number" aria-hidden="true">10</div>
          <div className="argentina-star star-left" aria-hidden="true">✳</div>
          <div className="argentina-star star-right" aria-hidden="true">✳</div>
        </section>

        <section id="suenos" className="travel-section section-pad">
          <Reveal className="section-heading">
            <p className="eyebrow"><span>05</span>{t.travelEyebrow}</p>
            <h2>{t.travelTitle}</h2>
            <p className="lead">{t.travelLead}</p>
          </Reveal>
          <div className="travel-grid">
            {t.destinations.map((destination, index) => (
              <Reveal key={destination.name} className={`travel-card travel-card-${index + 1}`} delay={index * 0.07}>
                <div className="travel-image-wrap">
                  <img src={destinationArt[index]} alt="" loading="lazy" />
                  <span className="travel-index">0{index + 1}</span>
                  <span className="travel-symbol">{destinationIcon[index]}</span>
                </div>
                <div className="travel-card-copy">
                  <div className="travel-place">{destination.place}</div>
                  <h3>{destination.name}</h3>
                  <p>{destination.caption}</p>
                  <div className="travel-dream-line"><span/>{lang === 'es' ? 'ALGÚN DÍA' : 'SOMEDAY'}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="dream-quote">
            <span className="quote-mark">“</span><p>{t.dreamLine}</p><span className="quote-end">✳</span>
          </Reveal>
        </section>

        <section id="deseos" className="wishes-section section-pad">
          <Reveal className="section-heading">
            <p className="eyebrow"><span>06</span>{t.wishesEyebrow}</p>
            <h2>{t.wishesTitle}</h2>
            <p className="lead">{t.wishesLead}</p>
          </Reveal>
          <div className="wishes-grid">
            {t.wishes.map((wish, index) => (
              <Reveal key={wish.title} className="wish-card" delay={index * 0.055}>
                <span className="wish-number">0{index + 1}</span>
                <span className="wish-icon">{['✳', '♡', '↗', '✧', '☼', '∞'][index]}</span>
                <h3>{wish.title}</h3>
                <p>{wish.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="finale-section">
          <div className="finale-sun" aria-hidden="true" />
          <Reveal className="finale-content">
            <p className="finale-kicker"><span/> {t.finaleKicker} <span/></p>
            <div className="finale-heart"><Heart size={28} strokeWidth={1.2}/></div>
            <h2>{t.finaleTitle}</h2>
            <p className="finale-body">{t.finaleBody}</p>
            <p className="finale-thanks">{t.finaleThanks}</p>
            <div className="finale-flags">🇲🇳 <span>♡</span> 🇦🇷</div>
            <button className="button button-dark finale-button" onClick={() => setCelebrate(true)}><Sparkles size={16}/>{t.confetti}</button>
          </Reveal>
          <div className="finale-bottom-mark">P <span>✳</span> 24</div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-mark" href="#inicio" onClick={(event) => { event.preventDefault(); goToTop(); }}>P<span>✳</span></a>
        <p>{t.footer}</p>
        <button onClick={goToTop} className="back-top">{t.backTop}<ArrowDown size={14}/></button>
      </footer>

      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={t.photoAlt}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
            <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label={t.close}><X size={22}/></button>
            <button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto - 1 + gallery.length) % gallery.length); }} aria-label={t.previous}><ArrowLeft size={20}/></button>
            <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
              <motion.img key={activePhoto} src={gallery[activePhoto].src} alt={`${t.photoAlt} ${activePhoto + 1}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.28 }} />
              <div className="lightbox-caption"><small>{String(activePhoto + 1).padStart(2, '0')} / 10</small></div>
            </div>
            <button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); setActivePhoto((activePhoto + 1) % gallery.length); }} aria-label={t.next}><ArrowRight size={20}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {celebrate && (
          <motion.div className="confetti-layer" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {confettiBits.map((bit) => <span key={bit.id} className={`confetti confetti-${bit.tone}`} style={{ left: bit.left, animationDelay: bit.delay, animationDuration: bit.duration, rotate: bit.rotation }} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

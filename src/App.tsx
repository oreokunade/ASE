import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue, useInView } from 'motion/react';
import { 
  ArrowUp,
  ArrowUpRight, 
  MapPin, 
  ChevronRight,
  CheckCircle2,
  Calendar,
  Users,
  Briefcase,
  Globe,
  Zap,
  Building,
  Check,
  LineChart,
  ArrowDown,
  Ticket,
  Handshake,
  Mic,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

import LogoNoBg from '../Images/Logo/Abuja Startup Expo Logo - No bg.png';
import HeroBg from '../Images/Other/photo_2026-04-29_16-57-19.jpg';
import HeroVideo from '../Images/Hero video.MP4';
import CardBg1 from '../Images/Other/photo_2026-04-29_16-56-34.jpg';
import CardBg2 from '../Images/Other/photo_2026-04-29_16-57-10.jpg';
import CardBg3 from '../Images/Other/photo_2026-04-29_16-57-15.jpg';
import Speaker1 from '../Images/Speakers/2025/Ada Onobun, Managing Partner, First law Partners.jpg';
import Speaker2 from '../Images/Speakers/2025/Barr Emmanuel Edet. Ag. Director regulation and compliance (NITDA).jpg';
import Speaker3 from '../Images/Speakers/2025/Damilola Victoria Alabi (ESQ).jpg';
import Speaker4 from '../Images/Speakers/2025/Hart Shirley-Grace - Founder FoundHer.jpg';
import Speaker5 from '../Images/Speakers/2025/Joel Amawhe - Growth Strategies and Founder Bizthom.jpg';
import Speaker6 from '../Images/Speakers/2025/Nelson Agbo (Abuja TechBro) - Tech Storyteller, Cinematograher.jpg';
import Speaker7 from '../Images/Speakers/2025/Omu Obilor Managinf partner Afrileaplabs.jpg';
import Speaker8 from '../Images/Speakers/2025/Remy Chukwunyere - Startup Ecosystem Builder, Exexutive Director, Ugumba leadership center.jpg';
import Speaker9 from '../Images/Speakers/2025/Sir Stanley Amuchie Executive Director  - Operations and information group fidelity bank PLC.jpg';
import Speaker10 from '../Images/Speakers/2025/Susanne Egbe - Head of account mgt, cloud plexo.jpg';
import Sponsor1 from '../Images/Sponsors/2025/48 Property Marketing.png';
import Sponsor2 from '../Images/Sponsors/2025/Afrileap Labs.png';
import Sponsor3 from '../Images/Sponsors/2025/Bank Plus.png';
import Sponsor4 from '../Images/Sponsors/2025/Cloud Plexo.png';
import Sponsor5 from '../Images/Sponsors/2025/Fidelity.png';
import Sponsor6 from '../Images/Sponsors/2025/First Law Partners.png';
import Sponsor7 from '../Images/Sponsors/2025/Future Living Africa.png';
import Sponsor8 from '../Images/Sponsors/2025/IPLAN.png';
import ManifestoImage from '../Images/ASE26 website Pictures/DSC01949.jpg';
import SpeakersHeroImage from '../Images/ASE26 website Pictures/DSC01941.jpg';
import StartupHeroImage from '../Images/ASE26 website Pictures/DSC01933.jpg';
import ImpactHeroImage from '../Images/ASE26 website Pictures/DSC01992.jpg';
import VolunteerHeroImage from '../Images/ASE26 website Pictures/DSC01846.jpg';

function AnimatedCounter({ value }: { value: string }) {
  const target = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const prefix = value.startsWith('₦') ? '₦' : '';
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !isNaN(target)) {
      const animation = animate(count, target, { duration: 2, ease: "easeOut" });
      return animation.stop;
    }
  }, [count, target, isInView]);

  if (isNaN(target) && value !== '∞') return <span>{value}</span>;
  if (value === '∞') return <span>∞</span>;
  
  return (
    <span ref={ref} className="inline-flex justify-center items-center tabular-nums">
      {prefix && <span>{prefix}</span>}
      <motion.span>{rounded}</motion.span>
      <span>{suffix.replace('₦', '')}</span>
    </span>
  );
}

function ScrambleText({ text }: { text: string }) {
  const [chars, setChars] = useState<{char: string, color: string}[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  // Brand colors + red/blue/glitch colors
  const colors = ["#ffffff", "#F17522", "#387BBF", "#F59B5C", "#639FD9", "#00ffff"]; 

  useEffect(() => {
    if (!isInView) {
      setChars(text.split("").map(c => ({ char: c.replace(/[a-zA-Z0-9]/g, "_"), color: "#ffffff" })));
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setChars(
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return { char: text[index], color: "" };
          }
          if (letter === " " || letter === "," || letter === "+") {
            return { char: letter, color: "" };
          }
          const randomChar = letters[Math.floor(Math.random() * letters.length)];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return { char: randomChar, color: randomColor };
        })
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 4; // slower resolution
    }, 60); // slower interval for longer lasting glitch
    
    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <span ref={ref}>
      {chars.map((c, i) => (
        <span key={i} style={c.color ? { color: c.color } : {}}>{c.char}</span>
      ))}
    </span>
  );
}

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] bg-brand-primary text-white p-3 md:p-4 rounded-none shadow-2xl hover:bg-orange-600 transition-all group ${!isVisible ? 'pointer-events-none' : ''}`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
    </motion.button>
  );
}

export default function App() {
  return (
    <div className="selection:bg-brand-primary selection:text-white bg-brand-bg text-brand-dark min-h-screen bg-grid-pattern overflow-hidden font-sans">
      <Navbar />
      <Ticker />
      <Hero />
      <StatsSection />
      <ManifestoSection />
      <ExperienceZonesSection />
      <WhyAttendSection />
      <StartupShowcaseSection />
      <SpeakersSection />
      <VolunteerSection />
      <TicketsSection />
      <SponsorshipSection />
      <ClosingCTASection />
      <Footer />
      <BackToTop />
    </div>
  );
}

function StatsSection() {
  const stats = [
    { value: "Abuja", label: "Location" },
    { value: "Nov 14", label: "Event Date" },
    { value: "1,000+", label: "Expected Attendees" },
    { value: "4", label: "Experience Zones" },
    { value: "1 Day", label: "High-Impact Programme" }
  ];

  return (
    <section className="bg-[#050505] border-y border-white/10 relative z-30">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/10 max-w-[1400px] mx-auto px-1 md:px-0 border-x border-white/10">
        {stats.map((s, i) => (
          <div key={i} className={`p-8 lg:p-12 text-center group hover:bg-[#0a0a0a] transition-colors flex flex-col justify-center min-h-[160px] ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
            <div className="text-3xl lg:text-4xl font-black font-heading text-white mb-2 group-hover:scale-105 transition-transform">
              <ScrambleText text={s.value} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white font-bold">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
      scrolled 
        ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/10 top-0" 
        : "bg-transparent border-b border-transparent top-10"
    }`}>
      <div className="flex items-center">
        <a href="#" className="block">
          <img 
            src={LogoNoBg} 
            alt="CONVERGE 2026" 
            className="h-[72px] md:h-[86px] object-contain filter invert" 
          />
        </a>
      </div>
      
      <div className="hidden lg:flex gap-8 items-center text-[11px] font-bold tracking-widest uppercase text-white/80">
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
        <a href="#tickets" className="hover:text-white transition-colors">Tickets</a>
        <a href="#volunteer" className="hover:text-white transition-colors">Volunteer</a>
        <a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a>
      </div>

      <div className="flex gap-4 items-center">
        <a href="#tickets" className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center rounded-none px-4 md:px-8 h-10 md:h-12">
          Get Tickets <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
        </a>
      </div>
    </nav>
  );
}

function Ticker() {
  const items = [
    "Abuja · November 14, 2026",
    "1,000+ Founders · Investors · Builders",
    "CONVERGE 2026 — Early Bird Now Open",
    "Four Zones · One Deal Room · Infinite Possibilities",
    "Nigeria's Capital. Africa's Stage.",
    "Abuja · November 14, 2026",
    "1,000+ Founders · Investors · Builders",
    "CONVERGE 2026 — Early Bird Now Open",
    "Four Zones · One Deal Room · Infinite Possibilities",
    "Nigeria's Capital. Africa's Stage."
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-10 bg-brand-accent text-white z-50 flex items-center overflow-hidden border-b border-white/20">
      <div className="flex whitespace-nowrap animate-marquee items-center text-xs font-bold uppercase tracking-widest">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-6">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mx-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [0.8, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 origin-bottom bg-[#050505]">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Centered Main Headline */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center justify-center h-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white font-black text-[11px] md:text-[13px] tracking-[0.5em] uppercase mb-8 flex items-center gap-5"
        >
          <span>Abuja Startup Expo</span>
          <div className="w-[1.5px] h-4 bg-white/30" />
          <span className="opacity-70">November 14th 2026</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-[12vw] md:text-[8vw] font-black text-white leading-none uppercase tracking-tighter mb-10 drop-shadow-[0_10px_50px_rgba(0,0,0,0.5)] whitespace-nowrap"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          CONVERGE 2026
        </motion.h1>

        {/* Subheading & CTAs Centered Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center gap-10 max-w-2xl"
        >
          <p className="text-white text-base md:text-lg font-light leading-relaxed text-center opacity-80">
            One day in Nigeria’s capital where founders, investors, enterprise leaders, and policymakers gather to close something real.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <a href="#tickets" className="group bg-brand-primary text-white hover:bg-orange-600 transition-all duration-300 px-10 py-5 flex items-center justify-center gap-2 rounded-none font-bold text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1">
              <Ticket className="w-4 h-4" /> Get Your Tickets
            </a>
            <div className="flex gap-4">
              <a href="#sponsors" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 px-6 py-4 flex items-center justify-center gap-2 rounded-none font-bold text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1">
                <Handshake className="w-4 h-4" /> Become a Sponsor
              </a>
              <a href="#speakers" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 px-6 py-4 flex items-center justify-center gap-2 rounded-none font-bold text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1">
                <Mic className="w-4 h-4" /> Apply as Speaker
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator or minimal footer could go here */}
    </section>
  );
}

function ManifestoSection() {
  return (
    <section id="about" className="section-padding border-b border-white/10 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">What Is CONVERGE?</div>
        
        <div className="grid lg:grid-cols-12 gap-16 mb-24 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-12">
            <div>
              <h2 className="text-4xl md:text-[44px] font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Not just an event. <br/>
                <span className="text-white/40">A working ecosystem.</span>
              </h2>
              <div className="text-lg md:text-xl text-white/80 font-light leading-relaxed space-y-8">
                <p>
                  Nigeria has the founders. Africa has the ambition. What has always been missing is the room.
                </p>
                <p>
                  Abuja Startup Expo 2026 is that room. On November 14th, 2026, in Nigeria’s capital city, we assemble the most consequential players in the ecosystem under one roof — not to talk about change, but to make it happen in real time.
                </p>
                <p>
                  Every session is engineered for action. Every introduction is structured for outcome. Every zone is designed around a specific kind of deal: funding, partnership, enterprise, or policy.
                </p>
                <p className="text-white font-medium border-l-2 border-brand-primary pl-6 py-2 bg-white/[0.02]">
                  We don’t measure success in attendance numbers. We measure it in term sheets signed, partnerships launched, and funding rounds started within the walls of CONVERGE.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative group overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={HeroBg} 
                alt="CONVERGE 2026 Ecosystem" 
                className="w-full h-[400px] md:h-[600px] object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 right-6 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[3px] text-white/60 text-right">Abuja, Nigeria <br/>Nov 2025</span>
                <div className="w-10 h-[1px] bg-brand-primary" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

function ExperienceZonesSection() {
  const drawVariant = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      fillOpacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, type: "spring", duration: 1.5, bounce: 0 },
        fillOpacity: { delay: i * 0.15 + 0.4, duration: 0.5, ease: "easeIn" }
      }
    })
  };

  const strokeColor = "rgba(255, 255, 255, 0.9)";
  const iconStrokeWidth = "3.5";

  const CapitalIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      {/* Money Bag Shape */}
      <motion.path 
        d="M35 25 C35 15, 65 15, 65 25 L60 35 C75 35, 85 50, 85 70 C85 85, 15 85, 15 70 C15 50, 25 35, 40 35 Z" 
        fill="#F17522" 
        variants={drawVariant} 
        custom={0} 
      />
      {/* Bag Tie */}
      <motion.path d="M40 35 L60 35" stroke={strokeColor} variants={drawVariant} custom={1} />
      {/* Naira-inspired Symbol */}
      <motion.path 
        d="M42 52 H58 M42 58 H58 M45 45 L45 65 L55 45 L55 65" 
        stroke={strokeColor} 
        strokeWidth="3" 
        fill="none" 
        variants={drawVariant} 
        custom={2} 
      />
    </motion.svg>
  );

  const BuildersIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.path d="M50 15 C60 30, 60 60, 60 75 L40 75 C40 60, 40 30, 50 15" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M40 60 L30 75 L40 75" fill="#F17522" variants={drawVariant} custom={1} />
      <motion.path d="M60 60 L70 75 L60 75" fill="#F17522" variants={drawVariant} custom={2} />
      <motion.circle cx="50" cy="40" r="6" fill="#F17522" variants={drawVariant} custom={3} />
      <motion.path d="M45 75 L50 95 L55 75" fill="#ea580c" variants={drawVariant} custom={4} />
      <motion.path d="M48 75 L50 85 L52 75" fill="#fde047" variants={drawVariant} custom={5} />
    </motion.svg>
  );

  const EnterpriseIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.rect x="35" y="20" width="30" height="60" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.rect x="15" y="45" width="25" height="35" fill="#F17522" variants={drawVariant} custom={1} />
      <motion.rect x="60" y="40" width="25" height="40" fill="#F17522" variants={drawVariant} custom={2} />
      <motion.path d="M40 30 H60 M40 40 H60 M40 50 H60 M20 55 H35 M65 50 H80" stroke={strokeColor} strokeWidth="2" variants={drawVariant} custom={3} />
      <motion.path d="M10 80 H90" stroke={strokeColor} variants={drawVariant} custom={4} />
    </motion.svg>
  );

  const PolicyIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.rect x="25" y="25" width="50" height="10" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M30 35 V75 M50 35 V75 M70 35 V75" stroke={strokeColor} variants={drawVariant} custom={1} />
      <motion.rect x="20" y="75" width="60" height="15" fill="#F17522" variants={drawVariant} custom={2} />
      <motion.circle cx="50" cy="55" r="8" fill="#F17522" variants={drawVariant} custom={3} />
      <motion.path d="M45 55 H55 M47 51 H53 M47 59 H53" stroke={strokeColor} strokeWidth="1" variants={drawVariant} custom={4} />
    </motion.svg>
  );

  const zones = [
    {
      id: "01",
      shortName: "CAPITAL",
      title: "CONVERGE: CAPITAL",
      desc: "Curated deal floor for VCs and serious funding. Where term sheets take shape and capital meets its next high-impact mission.",
      icon: <CapitalIcon />
    },
    {
      id: "02",
      shortName: "BUILDERS",
      title: "CONVERGE: BUILDERS",
      desc: "High-stakes pitches and product showcases. The stage where silent builders step into the light before investors and global media.",
      icon: <BuildersIcon />
    },
    {
      id: "03",
      shortName: "ENTERPRISE",
      title: "CONVERGE: ENTERPRISE",
      desc: "B2B deal-making and corporate partnerships. Connecting established institutions with startups redefining their industries in real-time.",
      icon: <EnterpriseIcon />
    },
    {
      id: "04",
      shortName: "POLICY",
      title: "CONVERGE: POLICY",
      desc: "Regulator assembly where policy is written. Conversations that move at the speed of legislation, not just social media posts.",
      icon: <PolicyIcon />
    }
  ];

  return (
    <section id="experience" className="py-8 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 mb-20 items-end">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">The Experience</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] uppercase tracking-tighter">
              Four Zones. <br/><span className="text-white/40">One Purpose.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white text-lg md:text-xl font-light leading-relaxed">
              CONVERGE 2026 is structured into four high-intent spaces, each built around a specific kind of value creation. Every hour you spend here is pointed at an outcome.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {zones.map((zone, i) => (
            <div 
              key={i} 
              className="bg-[#0a0a0a] p-4 md:p-8 flex flex-col h-full min-h-[450px] md:min-h-[550px] hover:bg-[#0c0c0c] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-7xl font-black font-heading text-white/5 group-hover:text-white/10 transition-colors">
                {zone.id}
              </div>
              
              {/* Heading Area with Fixed Height for Icon Alignment */}
              <div className="relative z-10 h-[80px] md:h-[120px] flex flex-col justify-end mb-8 md:mb-12">
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1 md:mb-2 text-left">ZONE {zone.id}</div>
                <h3 className="text-sm md:text-2xl font-black text-white tracking-tight text-left leading-tight uppercase">{zone.title}</h3>
              </div>

              {/* Icon Area - Now horizontally aligned across the row */}
              <div className="flex-grow flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-8 md:mb-12">
                <div className="w-full flex items-center justify-center">
                  {zone.icon}
                </div>
              </div>

              <p className="text-white font-light leading-relaxed text-[12px] md:text-base relative z-10 text-left">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyAttendSection() {
  const drawVariant = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      fillOpacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, type: "spring", duration: 1.5, bounce: 0 },
        fillOpacity: { delay: i * 0.15 + 0.4, duration: 0.5, ease: "easeIn" }
      }
    })
  };

  const strokeColor = "rgba(255, 255, 255, 0.9)";
  const iconStrokeWidth = "3.5";

  const InvestorsIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.rect x="15" y="35" width="70" height="45" rx="5" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M15 45 L85 45" variants={drawVariant} custom={1} />
      <motion.circle cx="50" cy="57" r="10" fill="#F17522" variants={drawVariant} custom={2} />
      <motion.path d="M45 57 L55 57 M50 52 L50 62" variants={drawVariant} custom={3} />
    </motion.svg>
  );

  const PartnersIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.circle cx="35" cy="50" r="20" fill="#F17522" variants={drawVariant} custom={0} />
      <motion.circle cx="65" cy="50" r="20" fill="#387BBF" variants={drawVariant} custom={1} />
      <motion.path d="M50 40 L50 60" variants={drawVariant} custom={2} />
    </motion.svg>
  );

  const FundingIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.path d="M20 80 L80 80" variants={drawVariant} custom={0} />
      <motion.path d="M30 80 L30 60" variants={drawVariant} custom={1} fill="#F17522" />
      <motion.path d="M50 80 L50 40" variants={drawVariant} custom={2} fill="#387BBF" />
      <motion.path d="M70 80 L70 20" variants={drawVariant} custom={3} fill="#fde047" />
      <motion.path d="M25 65 L45 45 L65 25 L85 10" stroke="#F17522" variants={drawVariant} custom={4} />
    </motion.svg>
  );

  const TalentIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.circle cx="50" cy="35" r="20" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M25 80 C 25 60, 75 60, 75 80" fill="#F17522" variants={drawVariant} custom={1} />
      <motion.circle cx="75" cy="35" r="10" fill="#fde047" variants={drawVariant} custom={2} />
      <motion.path d="M72 35 L78 35 M75 32 L75 38" variants={drawVariant} custom={3} />
    </motion.svg>
  );

  const ExpansionIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.circle cx="50" cy="50" r="35" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M50 15 L50 85 M15 50 L85 50" variants={drawVariant} custom={1} />
      <motion.path d="M30 30 L70 70 M70 30 L30 70" variants={drawVariant} custom={2} />
      <motion.circle cx="70" cy="30" r="8" fill="#F17522" variants={drawVariant} custom={3} />
    </motion.svg>
  );

  const AuthorityIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-24 md:h-24 transform transition-transform duration-300">
      <motion.path d="M50 15 L80 30 L80 60 L50 85 L20 60 L20 30 Z" fill="#F17522" variants={drawVariant} custom={0} />
      <motion.path d="M50 35 L55 45 L65 45 L58 52 L61 62 L50 55 L39 62 L42 52 L35 45 L45 45 Z" fill="#fde047" variants={drawVariant} custom={1} />
    </motion.svg>
  );

  const benefits = [
    { 
      title: "Meet Investors Directly", 
      desc: "Skip cold emails and pitch decks into the void. CONVERGE puts you in the room with the people who can write the cheque — curated, structured sessions engineered for action.", 
      img: CardBg1,
      icon: <InvestorsIcon />
    },
    { 
      title: "Find Real Partners", 
      desc: "Corporates, governments, and fellow founders ready to build together. Every introduction at CONVERGE is a potential partnership. The room is full of the right ones.", 
      img: CardBg2,
      icon: <PartnersIcon />
    },
    { 
      title: "Raise Funding", 
      desc: "Structured pitch sessions, the Deal Room, and direct investor access designed to help startups start and close funding rounds. Not a competition. A funding environment.", 
      img: CardBg3,
      icon: <FundingIcon />
    },
    { 
      title: "Hiring Top Talent", 
      desc: "Connect with the brightest engineers, operators, and designers in the region. Abuja’s elite talent pool is here, ready for their next mission.", 
      img: HeroBg,
      icon: <TalentIcon />
    },
    { 
      title: "Market Expansion", 
      desc: "Gain the regulatory insights and government introductions needed to scale across Nigeria and into the rest of the continent.", 
      img: CardBg1,
      icon: <ExpansionIcon />
    },
    { 
      title: "Brand Authority", 
      desc: "Position your brand at the center of the conversation. CONVERGE is where the stories of Nigeria’s tech future are told first.", 
      img: CardBg2,
      icon: <AuthorityIcon />
    },
  ];

  return (
    <section className="py-8 md:py-24 border-b border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20 items-start relative">
          <div className="lg:col-span-6 lg:sticky lg:top-32 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Community & Impact</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl lg:text-[44px] font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              YOU DON'T ATTEND TO LISTEN. <br/><span className="text-white/40">YOU ATTEND TO ACT.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-6 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video w-full group overflow-hidden border border-white/10"
            >
              <img 
                src={ImpactHeroImage} 
                alt="Impact at ASE" 
                className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <div className="text-[10px] font-black tracking-widest text-white/40 uppercase group-hover:text-brand-primary transition-colors">Visual impact / ASE 2025</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {benefits.map((b, i) => (
            <div key={i} className="group relative overflow-hidden bg-[#0a0a0a] min-h-[380px] md:min-h-[450px] flex flex-col p-6 md:p-10 hover:bg-[#0c0c0c] border border-white/5 transition-all duration-500">
              
              {/* Background ID number style */}
              <div className="absolute top-0 right-0 p-4 md:p-8 text-6xl md:text-8xl font-black font-heading text-white/[0.03] group-hover:text-brand-primary/5 transition-colors">
                0{i+1}
              </div>

              <div className="relative z-10 mb-auto">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 mb-2 text-left">BENEFIT 0{i+1}</div>
                <h3 className="text-sm md:text-2xl font-black text-white mb-4 md:mb-6 tracking-tight text-left leading-tight pr-4 uppercase">{b.title}</h3>
                <div className="w-full flex items-center justify-start my-6 md:my-12 group-hover:scale-110 transition-transform duration-500">
                  {b.icon}
                </div>
              </div>

              <p className="text-white font-light leading-relaxed text-xs md:text-base relative z-10 text-left">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function StartupShowcaseSection() {
  const drawVariant = {
    hidden: { pathLength: 0, fillOpacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      fillOpacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, type: "spring", duration: 1.5, bounce: 0 },
        fillOpacity: { delay: i * 0.15 + 0.4, duration: 0.5, ease: "easeIn" }
      }
    })
  };

  const strokeColor = "rgba(255, 255, 255, 0.9)";
  const iconStrokeWidth = "3.5";

  const PitchIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-20 md:h-20 transform transition-transform duration-300">
      <motion.rect x="35" y="20" width="30" height="45" rx="15" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M25 45 C 25 65, 75 65, 75 45" variants={drawVariant} custom={1} />
      <motion.path d="M50 65 L50 80 M35 80 L65 80" variants={drawVariant} custom={2} />
    </motion.svg>
  );

  const BoothIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-20 md:h-20 transform transition-transform duration-300">
      <motion.rect x="20" y="40" width="60" height="40" fill="#F17522" variants={drawVariant} custom={0} />
      <motion.path d="M15 40 L50 20 L85 40 Z" fill="#fde047" variants={drawVariant} custom={1} />
      <motion.rect x="40" y="55" width="20" height="25" fill="#387BBF" variants={drawVariant} custom={2} />
    </motion.svg>
  );

  const MeetingsIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-20 md:h-20 transform transition-transform duration-300">
      <motion.path d="M20 50 C 20 40, 45 40, 45 50 L45 65 L20 65 Z" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.path d="M80 50 C 80 40, 55 40, 55 50 L55 65 L80 65 Z" fill="#F17522" variants={drawVariant} custom={1} />
      <motion.circle cx="32" cy="30" r="10" fill="#fde047" variants={drawVariant} custom={2} />
      <motion.circle cx="68" cy="30" r="10" fill="#fde047" variants={drawVariant} custom={3} />
      <motion.path d="M40 55 L60 55" strokeWidth={5} variants={drawVariant} custom={4} />
    </motion.svg>
  );

  const FeedbackIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-16 h-16 md:w-20 md:h-20 transform transition-transform duration-300">
      <motion.path d="M20 25 L80 25 L80 65 L55 65 L45 75 L35 65 L20 65 Z" fill="#387BBF" variants={drawVariant} custom={0} />
      <motion.circle cx="40" cy="45" r="4" fill="#fde047" variants={drawVariant} custom={1} />
      <motion.circle cx="50" cy="45" r="4" fill="#fde047" variants={drawVariant} custom={2} />
      <motion.circle cx="60" cy="45" r="4" fill="#fde047" variants={drawVariant} custom={3} />
    </motion.svg>
  );

  return (
    <section id="startups" className="py-8 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-20 px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-start text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-primary font-black text-sm tracking-[0.3em] uppercase mb-4">Startup Programme</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              Get Your Startup On The <br className="hidden md:block" /><span className="text-white/40">Biggest Stage In Abuja.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-12 max-w-3xl">
              Selected startups gain more than a booth. They gain access, visibility, and the momentum that changes trajectories. We look for startups solving real problems, ready for investor scrutiny, and hungry to scale.
            </motion.p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-4 text-xs font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all rounded-none shadow-xl hover:-translate-y-1">
                Apply as a Startup <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#" className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white px-8 py-4 text-xs font-black uppercase tracking-[2px] hover:bg-white/5 transition-all rounded-none hover:-translate-y-1">
                View Criteria
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative group overflow-hidden border border-white/10 shadow-2xl rounded-none min-h-[400px] md:min-h-[500px]">
            <img 
              src={StartupHeroImage} 
              alt="Startup Pitching" 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Visual Label */}
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                Live Pitching Session
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { stat: "05 Min", label: "Live Pitch Slot", icon: <PitchIcon /> },
            { stat: "3×3m", label: "Branded Booth", icon: <BoothIcon /> },
            { stat: "3", label: "Curated Investor Meetings", icon: <MeetingsIcon /> },
            { stat: "30 Min", label: "Expert Feedback Session", icon: <FeedbackIcon /> }
          ].map((item, i) => (
            <div key={i} className="relative group p-6 md:p-10 flex flex-col items-center text-center justify-center rounded-none overflow-hidden min-h-[300px] md:min-h-[380px] border border-white/5 bg-[#0a0a0a] hover:border-white/20 transition-colors duration-500">
              {/* Glowing Background Blobs */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/30 transition-colors duration-700 pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] group-hover:bg-brand-accent/20 transition-colors duration-700 pointer-events-none" />
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Icon Container */}
                <div className="mb-6 md:mb-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500">
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <div className="text-3xl md:text-5xl font-black font-heading text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">
                  {item.stat}
                </div>
                
                {/* Animated Divider */}
                <div className="w-8 h-1 bg-brand-accent mb-6 rounded-full group-hover:w-16 group-hover:bg-brand-primary transition-all duration-500" />
                
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 font-bold leading-relaxed group-hover:text-white transition-colors duration-300">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakersSection() {
  const speakers = [
    { title: "Startup Founders", desc: "Who’ve raised Series A+ in African markets. Unfiltered lessons from the frontlines of building." },
    { title: "Venture Capitalists", desc: "Managing partners actively deploying capital into Africa. What they’re actually looking for." },
    { title: "Angel Investors", desc: "High-conviction individuals backing Nigerian startups with capital, networks, and mentorship." },
    { title: "Corporate Executives", desc: "Innovation leads from Nigeria’s largest enterprises with active mandates to partner with startups." },
    { title: "Government Leaders", desc: "Policymakers and regulators from FCT and federal agencies. In Abuja, these are neighbours." },
    { title: "Ecosystem Builders", desc: "Accelerators, hubs, and development organisations driving Nigeria’s innovation infrastructure." }
  ];

  const previousSpeakers = [
    { name: "Sir Stanley Amuchie", role: "Executive Director, Fidelity Bank", image: Speaker9 },
    { name: "Barr. Emmanuel Edet", role: "Ag. Director, NITDA", image: Speaker2 },
    { name: "Damilola Victoria Alabi", role: "Coordinator, Intellectual property lawyers association of Nigeria", image: Speaker3 },
    { name: "Hart Shirley-Grace", role: "Founder, FoundHer", image: Speaker4 },
    { name: "Joel Amawhe", role: "Founder, Bizthom", image: Speaker5, position: "object-right" },
    { name: "Nelson Agbo", role: "Abuja TechBro", image: Speaker6 },
    { name: "Omu Obilor", role: "Managing Partner, Afrileaplabs", image: Speaker7 },
    { name: "Remy Chukwunyere", role: "Executive Director, Ugumba", image: Speaker8 },
    { name: "Ada Onobun", role: "Managing Partner, First Law Partners", image: Speaker1 },
    { name: "Susanne Egbe", role: "Head of Account Mgt, Cloud Plexo", image: Speaker10 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <section id="speakers" className="py-8 md:py-24 border-b border-white/10 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Narrative Header Row */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Speakers & Guests</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              The Voices Shaping <br/><span className="text-white/40">Nigeria's Next Decade.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-3xl">
              CONVERGE doesn’t fill a stage. Every speaker is selected because they have something specific to offer the room — a network to open, capital to deploy, or insight earned from building the real thing.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mb-16">
              <a href="#" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-10 py-5 text-sm font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all rounded-none shadow-xl hover:-translate-y-1">
                Apply as a Speaker <ArrowUpRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Compressed Cohort Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-12 border-t border-white/10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-brand-primary" />
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Expected Cohort / Ecosystem Assembly</div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Founders who’ve raised Series A+ in African markets",
                  "Managing partners from global VC firms",
                  "Senior regulators shaping digital economy policy",
                  "Corporate leads with active partnership mandates",
                  "Angel investors deploying ₦500M+ annually",
                  "Ecosystem builders with market entry expertise"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group/item">
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span className="text-white/60 text-[13px] font-light leading-relaxed group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] w-full group overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 bg-brand-primary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src={CardBg2} 
                alt="Speakers at ASE" 
                className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-xs font-black tracking-widest text-white uppercase">Abuja Startup Expo / Speakers</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-white border-l-4 border-brand-accent pl-4">Past Speakers (2025)</h3>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {previousSpeakers.map((speaker, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group relative overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-none aspect-[3/4]"
              >
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className={`w-full h-full object-cover ${speaker.position || 'object-top'} transition-all duration-700 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <div className="text-sm md:text-base font-black font-heading text-white leading-tight mb-1">{speaker.name}</div>
                  <div className="text-[9px] md:text-xs font-bold text-brand-primary uppercase tracking-widest opacity-80">{speaker.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto bg-[#0a0a0a] border border-white/10 rounded-none relative overflow-hidden group shadow-2xl">
          {/* Background Image / Texture */}
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{ 
              backgroundImage: `url(${CardBg2})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'right center',
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-[1]" />
          
          <div className="relative z-10 p-12 md:p-16 lg:p-24 grid lg:grid-cols-12 items-center gap-12">
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <h3 className="text-2xl md:text-[48px] font-black text-white mb-8 leading-[1] uppercase tracking-tighter font-heading">
                Full 2026 speaker lineup drops <br className="hidden md:block" />October 1st, 2026.
              </h3>
              
              <div className="flex flex-col gap-2 mb-12 border-l-2 border-brand-primary pl-6">
                <div className="text-xs font-black text-brand-primary uppercase tracking-[0.3em]">Speaker Announcement</div>
                <div className="text-white/50 text-sm font-light tracking-wide">Subscribe to be the first to know when our global speakers are announced.</div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-0 w-full max-w-xl shadow-2xl">
                <input 
                  type="email" 
                  placeholder="ENTER YOUR EMAIL" 
                  className="flex-grow px-8 py-5 bg-white/5 text-white border border-white/10 focus:outline-none focus:border-brand-primary text-xs tracking-widest font-bold rounded-none transition-all placeholder:text-white/20" 
                />
                <button className="bg-brand-primary text-white px-12 py-5 rounded-none text-[10px] font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group/btn shrink-0">
                  Notify Me <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-4 hidden lg:flex justify-end items-center">
              <div className="text-[140px] font-black text-white/[0.02] leading-none select-none tracking-tighter group-hover:text-brand-primary/5 transition-colors duration-700">ASE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerSection() {
  const roles = [
    { title: "Guest Relations", desc: "Welcome and guide 1,000+ attendees from registration through to their seats. The first impression of CONVERGE 2026 is yours to own." },
    { title: "Deal Room Support", desc: "Coordinate the highest-value sessions. Support curated founder-investor meetings, manage schedules, and ensure every session runs precisely on time." },
    { title: "Stage Management", desc: "Work with our production team to run the four experience zones. Speakers, AV cues, timing, and on-stage logistics are your responsibility." },
    { title: "Media & Content", desc: "Capture CONVERGE through photography, social media, and live updates. You are the eyes and voice of the event beyond the room." },
    { title: "Sponsor Liaison", desc: "Dedicated support for CONVERGE sponsors. Booth setup, logistics, introductions — ensuring every partner's experience is seamless." },
    { title: "Registration & Tech", desc: "Own the attendee check-in experience. Manage the event app, ticketing systems, and real-time support for 1,000+ participants from gates open." }
  ];

  const iconVariants = {
    hidden: { pathLength: 0, fillOpacity: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      fillOpacity: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        fillOpacity: { duration: 1, delay: 1 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const ZoneIcon = ({ type }: { type: number }) => {
    const blue = "#387BBF";
    const orange = "#F17522";

    const iconContent = [
      // 0: Guest Relations (Person & Bubble)
      <g>
        <motion.circle cx="45" cy="35" r="12" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.path d="M20 80 C20 60, 70 60, 70 80" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.path d="M65 30 L85 20 V45 L65 35" stroke={orange} strokeWidth="3" fill={orange} fillOpacity="0.2" variants={iconVariants} />
      </g>,
      // 1: Deal Room (Dual-tone Handshake)
      <g>
        <motion.path d="M20 50 L45 50" stroke={blue} strokeWidth="6" strokeLinecap="round" variants={iconVariants} />
        <motion.path d="M55 50 L80 50" stroke={orange} strokeWidth="6" strokeLinecap="round" variants={iconVariants} />
        <motion.circle cx="50" cy="50" r="28" stroke={blue} strokeWidth="2" strokeDasharray="4 4" variants={iconVariants} />
        <motion.path d="M45 40 L55 60 M45 60 L55 40" stroke={orange} strokeWidth="4" strokeLinecap="round" variants={iconVariants} />
      </g>,
      // 2: Stage (Stage & Mic)
      <g>
        <motion.rect x="15" y="70" width="70" height="15" fill={blue} fillOpacity="0.2" stroke={blue} strokeWidth="2" variants={iconVariants} />
        <motion.rect x="45" y="25" width="10" height="35" rx="5" stroke={orange} strokeWidth="4" variants={iconVariants} />
        <motion.path d="M50 60 V70" stroke={orange} strokeWidth="4" variants={iconVariants} />
      </g>,
      // 3: Media (Megaphone & Sound)
      <g>
        <motion.path d="M25 40 L50 25 V75 L25 60 H15 V40 H25" stroke={blue} strokeWidth="4" fill={blue} fillOpacity="0.2" variants={iconVariants} />
        <motion.path d="M60 30 Q75 50 60 70 M75 20 Q95 50 75 80" stroke={orange} strokeWidth="4" strokeLinecap="round" variants={iconVariants} />
      </g>,
      // 4: Sponsor (Shield & Star)
      <g>
        <motion.path d="M25 25 V50 C25 70, 50 85, 50 85 C50 85, 75 70, 75 50 V25 H25" stroke={blue} strokeWidth="4" fill={blue} fillOpacity="0.1" variants={iconVariants} />
        <motion.path d="M50 35 L55 48 H68 L57 57 L62 70 L50 62 L38 70 L43 57 L32 48 H45 Z" fill={orange} variants={iconVariants} />
      </g>,
      // 5: Registration (Mobile & QR)
      <g>
        <motion.rect x="30" y="20" width="40" height="65" rx="5" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.path d="M30 35 H70 M30 75 H70" stroke={blue} strokeWidth="2" variants={iconVariants} />
        <motion.rect x="42" y="45" width="16" height="16" stroke={orange} strokeWidth="3" fill={orange} fillOpacity="0.3" variants={iconVariants} />
        <motion.circle cx="50" cy="82" r="2" fill={orange} variants={iconVariants} />
      </g>
    ];

    return (
      <motion.svg viewBox="0 0 100 100" fill="none" className="w-16 h-16 mb-6" initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {iconContent[type]}
      </motion.svg>
    );
  };

  const PerkIcon = ({ type }: { type: number }) => {
    const blue = "#387BBF";
    const orange = "#F17522";

    const iconContent = [
      // 0: Kit (T-shirt/Gear)
      <g>
        <motion.path d="M30 40 L50 25 L70 40 V80 H30 Z" stroke={blue} strokeWidth="4" fill={blue} fillOpacity="0.1" variants={iconVariants} />
        <motion.circle cx="50" cy="50" r="8" fill={orange} variants={iconVariants} />
        <motion.path d="M40 32 L50 42 L60 32" stroke={orange} strokeWidth="3" variants={iconVariants} />
      </g>,
      // 1: Access (VIP Pass)
      <g>
        <motion.rect x="30" y="25" width="40" height="55" rx="4" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.path d="M40 25 V15 C40 10, 60 10, 60 15 V25" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.rect x="40" y="40" width="20" height="25" fill={orange} variants={iconVariants} />
        <motion.path d="M35 70 H65" stroke={orange} strokeWidth="2" variants={iconVariants} />
      </g>,
      // 2: Network (Global/Nodes)
      <g>
        <motion.circle cx="50" cy="50" r="25" stroke={blue} strokeWidth="4" variants={iconVariants} />
        <motion.circle cx="50" cy="50" r="6" fill={orange} variants={iconVariants} />
        <motion.path d="M30 30 L40 40 M70 30 L60 40 M30 70 L40 60 M70 70 L60 60" stroke={orange} strokeWidth="4" strokeLinecap="round" variants={iconVariants} />
      </g>,
      // 3: Certificate (Document/Seal)
      <g>
        <motion.path d="M25 20 H65 L75 30 V80 H25 Z" stroke={blue} strokeWidth="4" fill={blue} fillOpacity="0.1" variants={iconVariants} />
        <motion.path d="M35 40 H55 M35 55 H55 M35 70 H45" stroke={blue} strokeWidth="2" variants={iconVariants} />
        <motion.circle cx="65" cy="70" r="10" fill={orange} variants={iconVariants} />
        <motion.path d="M60 70 L65 75 L70 65" stroke="white" strokeWidth="2" variants={iconVariants} />
      </g>
    ];

    return (
      <motion.svg viewBox="0 0 100 100" fill="none" className="w-14 h-14 mb-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {iconContent[type]}
      </motion.svg>
    );
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      }
    })
  };

  return (
    <section id="volunteer" className="py-8 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div variants={textVariant} custom={0} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <span className="text-lg">★</span> Volunteer at CONVERGE 2026
            </motion.div>
            <motion.h2 variants={textVariant} custom={1} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              Help build Nigeria's <br/><span className="text-white/40">Most Important <br/>Startup Gathering.</span>
            </motion.h2>
            <motion.div variants={textVariant} custom={2} className="space-y-6 text-lg text-white/90 font-light leading-relaxed mb-10">
              <p>Behind every great event is a team of people who chose to show up before anyone asked them to. CONVERGE 2026’s volunteer programme is for students, young professionals, and emerging ecosystem leaders who want to be part of building Nigeria’s startup moment — not just attending it.</p>
            </motion.div>
            <motion.div variants={textVariant} custom={3} className="flex flex-wrap gap-4 mb-16">
              <a href="#" className="bg-white text-black h-14 px-8 text-xs font-bold uppercase tracking-widest flex items-center justify-center rounded-none hover:bg-brand-primary transition-colors">Apply to Volunteer</a>
            </motion.div>

            {/* Who Should Apply relocated here */}
            <motion.div variants={textVariant} custom={4} className="bg-[#0a0a0a] border border-white/10 p-10 rounded-none w-full max-w-2xl">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-primary mb-6 border-b border-white/10 pb-4">Who Should Apply</h3>
              <ul className="space-y-5">
                {[
                  "University students and recent graduates",
                  "Young professionals (0–3 years exp)",
                  "Aspiring ecosystem builders",
                  "Available Nov 14, 2026 in Abuja"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <span className="text-white/80 font-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-8"
          >
            <div className="relative group overflow-hidden border border-white/10 aspect-video md:aspect-square">
              <img 
                src={VolunteerHeroImage} 
                alt="CONVERGE Volunteer Community" 
                className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors" />
            </div>
          </motion.div>
        </div>
        {/* Departments Header */}
        <div className="mb-16 flex items-center gap-8">
          <h3 className="text-2xl md:text-3xl font-black font-heading text-white uppercase tracking-tight">Departments</h3>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-32 overflow-hidden">
          {roles.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#080808] p-6 md:p-12 hover:bg-[#111] transition-all duration-500 relative overflow-hidden group min-h-[350px] md:min-h-[420px] flex flex-col border border-white/5"
            >
              <div className="mb-8 md:mb-12 group-hover:scale-110 transition-transform duration-500 flex justify-start">
                <ZoneIcon type={i} />
              </div>
              
              <div className="mt-auto">
                <div className="text-brand-primary/10 font-black text-3xl md:text-6xl absolute top-6 right-6 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">0{i+1}</div>
                <h4 className="text-lg md:text-2xl font-black text-white mb-4 relative z-10 uppercase tracking-tight group-hover:text-brand-primary transition-colors font-heading leading-tight">{r.title}</h4>
                <p className="text-white/60 font-light leading-relaxed text-[11px] md:text-sm relative z-10 group-hover:text-white/80 transition-colors">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Perks Section Header */}
        <div className="mb-16 flex items-center gap-8">
          <h3 className="text-2xl md:text-3xl font-black font-heading text-white uppercase tracking-tight">Volunteer Perks</h3>
          <div className="h-[1px] flex-grow bg-white/10" />
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { title: "Volunteer Kit", desc: "Official CONVERGE gear — t-shirt, lanyard, and programme.", type: 0 },
            { title: "Full Access", desc: "Access to all main stage sessions and exhibition floor.", type: 1 },
            { title: "Network", desc: "Be in the room with Nigeria's top founders and investors.", type: 2 },
            { title: "Certificate", desc: "Signed certificate for your portfolio and record.", type: 3 }
          ].map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 flex flex-col items-start group hover:bg-white/[0.04] hover:border-brand-primary/30 transition-all duration-500 rounded-none"
            >
              <div className="group-hover:scale-110 transition-transform duration-500">
                <PerkIcon color="#387BBF" type={p.type} />
              </div>
              <h4 className="text-xs font-black font-heading text-brand-accent mb-3 uppercase tracking-widest">{p.title}</h4>
              <p className="text-white/40 font-light text-[12px] leading-relaxed group-hover:text-white/60 transition-colors">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TicketsSection() {
  const tickets = [
    { 
      name: "General Access", 
      price: "₦35,000", 
      tag: "Early bird · Ends Sept 30",
      cta: "Get General Access", 
      popular: false,
      features: ["All main stage sessions", "Full exhibition area access", "General networking sessions", "Event app & digital programme", "Access to recorded sessions"]
    },
    { 
      name: "Premium Access", 
      price: "₦85,000", 
      tag: "Early bird · Ends Sept 30",
      cta: "Get Premium Pass", 
      popular: true,
      features: ["Priority front-10-rows seating", "Closed investor-only sessions", "Exclusive lounge (50 seats only)", "Speaker meet-and-greet access", "Physical event kit & programme", "+ All General benefits"]
    },
    { 
      name: "Startup Pass", 
      price: "₦120,000", 
      tag: "Full package · No expiry",
      cta: "Apply as Startup", 
      popular: false,
      features: ["3m × 3m branded exhibition booth", "One 5-minute live pitch slot", "3 curated investor meetings", "Media & press profile feature", "30-min expert feedback session", "2 General Access passes included"]
    },
  ];

  return (
    <section id="tickets" className="min-h-screen flex items-center py-20 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 px-6 w-full">
        <div className="text-left md:text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
          >
            Choose Your Experience
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] uppercase tracking-tighter">GET YOUR <br/><span className="text-white/40">TICKETS.</span></motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tickets.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 lg:p-10 flex flex-col bg-[#0a0a0a] border border-white/5 relative overflow-hidden group rounded-none hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${t.popular ? 'ring-1 ring-brand-primary' : ''}`}
            >
              {t.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-primary px-6 py-1.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-black mb-2 font-heading text-white tracking-wide uppercase">{t.name}</h3>
                <div className="text-brand-accent text-[9px] font-bold uppercase tracking-[0.2em]">{t.tag}</div>
              </div>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl md:text-5xl font-black text-white font-heading tracking-tighter">{t.price}</span>
              </div>
              
              <div className="w-full h-px bg-white/10 mb-8" />

              <ul className="space-y-4 mb-10 flex-grow text-[13px] text-white/90 font-light">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.popular ? 'bg-brand-accent/20' : 'bg-white/10'}`}>
                      <Check className={`w-2.5 h-2.5 ${t.popular ? 'text-brand-accent' : 'text-white'}`} />
                    </div>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-none relative overflow-hidden group/btn ${t.popular ? 'bg-brand-primary text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-brand-primary'}`}>
                <span className="relative z-10">{t.cta}</span>
              </button>

              {/* Decorative Background Blob for Hover */}
              <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${t.popular ? 'bg-brand-accent' : 'bg-brand-primary'}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorshipSection() {
  const iconVariants = {
    hidden: { pathLength: 0, fillOpacity: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      fillOpacity: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        fillOpacity: { duration: 1, delay: 1 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const TrophyIcon = ({ color, type }: { color: string, type: 'bronze' | 'silver' | 'gold' }) => (
    <motion.svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-2xl">
      {/* Trophy Base */}
      <motion.path 
        d="M30 85 H70 L65 75 H35 Z" 
        stroke={color} 
        strokeWidth="2" 
        fill={color} 
        fillOpacity="0.2" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Trophy Stem */}
      <motion.rect 
        x="45" y="65" width="10" height="10" 
        stroke={color} 
        strokeWidth="2" 
        fill={color} 
        fillOpacity="0.1" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Trophy Cup */}
      <motion.path 
        d="M25 25 C25 55, 75 55, 75 25 H25 Z" 
        stroke={color} 
        strokeWidth="4" 
        fill={color} 
        fillOpacity="0.3" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Trophy Handles */}
      <motion.path 
        d="M25 35 C15 35, 15 50, 25 50 M75 35 C85 35, 85 50, 75 50" 
        stroke={color} 
        strokeWidth="3" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Tier specific star/detail */}
      <motion.path 
        d="M50 35 L53 42 H60 L54 47 L56 54 L50 50 L44 54 L46 47 L40 42 H47 Z" 
        fill="white" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
    </motion.svg>
  );

  const PlatinumCoinIcon = ({ color }: { color: string }) => (
    <motion.svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-2xl">
      {/* Inner Glow Circle */}
      <motion.circle 
        cx="50" cy="50" r="40" 
        stroke={color} 
        strokeWidth="1" 
        strokeOpacity="0.5" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Main Coin Body */}
      <motion.circle 
        cx="50" cy="50" r="35" 
        stroke={color} 
        strokeWidth="6" 
        fill={color} 
        fillOpacity="0.25" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Inner Ridges */}
      <motion.circle 
        cx="50" cy="50" r="28" 
        stroke={color} 
        strokeWidth="1" 
        strokeDasharray="2 4" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Central Sparkle/Emblem */}
      <motion.path 
        d="M50 25 L55 45 L75 50 L55 55 L50 75 L45 55 L25 50 L45 45 Z" 
        fill="white" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
      {/* Accent Shine */}
      <motion.path 
        d="M35 35 Q50 30 65 35" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.6" 
        variants={iconVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
      />
    </motion.svg>
  );


  const tiers = [
    { 
      tier: "BRONZE", 
      perks: [
        "Brand visibility across ASE digital channels",
        "Exhibition presence on the main floor",
        "Digital programme listing & logo feature"
      ],
      color: "#CD7F32",
      glow: "rgba(205, 127, 50, 0.4)",
      icon: (color: string) => <TrophyIcon color={color} type="bronze" />
    },
    { 
      tier: "SILVER", 
      perks: [
        "All Bronze benefits included",
        "Dedicated speaking slot on a breakout panel",
        "Curated networking session access",
        "Post-event audience data & impact report"
      ],
      color: "#C0C0C0",
      glow: "rgba(192, 192, 192, 0.4)",
      icon: (color: string) => <TrophyIcon color={color} type="silver" />
    },
    { 
      tier: "GOLD", 
      perks: [
        "All Silver benefits included",
        "Official Deal Room naming rights",
        "Direct warm investor introductions",
        "Premium co-branded content campaign"
      ],
      color: "#FFD700",
      glow: "rgba(255, 215, 0, 0.6)",
      icon: (color: string) => <TrophyIcon color={color} type="gold" />
    },
    { 
      tier: "TITLE PARTNER", 
      perks: [
        "Primary event co-branding (ASE x [Partner])",
        "Opening Keynote address slot",
        "Exclusive VIP lounge naming & access",
        "First right of refusal for ASE 2027"
      ],
      color: "#F17522",
      glow: "rgba(241, 117, 34, 0.6)",
      icon: (color: string) => <PlatinumCoinIcon color={color} />
    }
  ];


  return (
    <section id="sponsors" className="py-8 md:py-24 border-b border-white/10 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="max-w-[1400px] mx-auto relative z-10 px-6">
        <div className="text-left md:text-center mb-16 md:mb-24 flex flex-col items-start md:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Partnership & Sponsorship</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-[44px] font-black text-white leading-[1.1] mb-6 uppercase tracking-tighter">Sponsors don't get visibility.<br/> <span className="text-white/40">They get access.</span></motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-0 md:mx-auto">The organisations that backed Nigeria's startup ecosystem.</motion.p>
        </div>
        <div className="text-left md:text-center mb-16">
          <h3 className="text-2xl font-black font-heading text-white uppercase tracking-wider">Sponsorship Levels</h3>
          <div className="w-20 h-1 bg-brand-gold mx-0 md:mx-auto mt-4 rounded-none" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-start group hover:border-white/30 transition-all duration-500 rounded-none relative overflow-hidden min-h-[450px] md:min-h-[580px]">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 md:mb-10 mx-auto">
                <div 
                  className="w-full h-full relative"
                  style={{
                    filter: `drop-shadow(0 0 20px ${t.glow})`
                  }}
                >
                  {t.icon(t.color)}
                </div>
              </div>

              <div className="relative z-10 w-full">
                <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">{t.tier}</h4>
                <div className="w-12 h-1 bg-brand-primary/30 mb-8 group-hover:w-full group-hover:bg-brand-primary transition-all duration-500 rounded-none" />
                
                <ul className="space-y-4 text-left">
                  {t.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-none bg-brand-primary shrink-0" />
                      <span className="text-white/80 font-light text-[13px] leading-relaxed">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>


        <div className="text-center mt-20">
          <a href="#" className="inline-flex items-center justify-center gap-4 bg-brand-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-none shadow-xl group">
            Request Sponsorship Deck <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Past Sponsors */}
        <div className="mt-32 mb-10 bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-none">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black font-heading text-white mb-4 uppercase tracking-tight">2025 SPONSORS</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">The organisations that backed Nigeria's startup ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[Sponsor1, Sponsor2, Sponsor3, Sponsor4, Sponsor5, Sponsor6, Sponsor7, Sponsor8].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, borderColor: 'rgba(241, 117, 34, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                className="h-32 md:h-40 bg-white/[0.02] border border-white/10 flex items-center justify-center p-8 md:p-10 transition-all duration-500 group rounded-none relative overflow-hidden"
              >
                {/* Subtle corner accent on hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-brand-primary opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-500" />
                
                <img 
                  src={img} 
                  alt="2025 Sponsor" 
                  className="max-h-10 md:max-h-14 w-auto object-contain opacity-100 transition-all duration-700" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTASection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 bg-black relative overflow-hidden text-white">
      {/* High-Impact Image Background - No Grayscale, More Visible */}
      <div 
        className="absolute inset-0 z-0 opacity-90"
        style={{ 
          backgroundImage: `url(${CardBg2})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }} 
      />
      
      {/* Reduced Overlays */}
      {/* Darker Overlays for Legibility */}
      <div className="absolute inset-0 bg-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-[2]" />

      <div className="max-w-5xl mx-auto text-left md:text-center relative z-10 px-6 flex flex-col items-start md:items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-4 px-4 py-1.5 rounded-none border border-white/20 bg-white/10 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-white"
        >
          Abuja Startup Expo 2026
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-[44px] font-black mb-4 md:mb-10 leading-[1.1] tracking-tighter text-white drop-shadow-2xl uppercase"
        >
          The Room Where Nigeria's Next Chapter <br/><span className="text-white/40">Gets Written.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl font-light mb-8 md:mb-12 max-w-2xl mx-0 md:mx-auto leading-relaxed text-white/90 drop-shadow-lg"
        >
          This is where the deal gets done. Where the introduction becomes a partnership. Where the pitch becomes a term sheet.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 mb-12 text-[10px] font-black uppercase tracking-[0.2em] border-y border-white/20 py-6 sm:py-10 px-6 sm:px-20 backdrop-blur-md bg-white/5 rounded-none w-full max-w-4xl mx-auto text-center md:text-left">
          <span>Nov 14, 2026</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-brand-gold rounded-none" />
          <span>Abuja, Nigeria</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-brand-gold rounded-none" />
          <span>1,000+ Founders & Investors</span>
        </div>

        <div className="font-bold text-xl font-heading mb-10 text-white drop-shadow-lg uppercase tracking-widest text-center">Don't watch this from the outside.</div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-6 md:px-0 items-center justify-center">
          <a href="#tickets" className="group bg-brand-primary text-white hover:bg-orange-600 transition-all duration-300 px-10 py-5 flex items-center justify-center gap-2 rounded-none font-bold text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 w-full md:w-auto">
            <Ticket className="w-4 h-4" /> Get Tickets Now
          </a>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#sponsors" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 px-6 py-4 flex items-center justify-center gap-2 rounded-none font-bold text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1 w-full sm:w-auto">
              <Handshake className="w-4 h-4" /> Become a Sponsor
            </a>
            <a href="#startups" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all duration-300 px-6 py-4 flex items-center justify-center gap-2 rounded-none font-bold text-[10px] uppercase tracking-widest shadow-xl hover:-translate-y-1 w-full sm:w-auto">
              <Zap className="w-4 h-4" /> Apply as a Startup
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-32 pb-16 bg-[#050505] relative overflow-hidden">
      {/* Background Text Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="text-[25vw] font-black text-white/[0.03] tracking-tighter leading-none uppercase translate-y-[80px]">
          CONVERGE
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-5">
            <div className="mb-8">
              <img src={LogoNoBg} alt="Abuja Startup Expo" className="h-[72px] md:h-[86px] w-auto object-contain filter invert" />
            </div>
            <p className="text-white/60 font-light max-w-md mb-12 text-sm leading-relaxed">
              CONVERGE 2026 brings together the most important players in Nigeria’s startup ecosystem. Where capital, innovation, and opportunity meet — in Nigeria’s capital city.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                { icon: <Youtube className="w-5 h-5" />, label: 'YouTube' }
              ].map((social, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/5 rounded-none" title={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Attend</h4>
            <ul className="space-y-4 text-sm text-white font-light tracking-wide">
              <li><a href="#tickets" className="hover:text-white transition-colors">Get Tickets</a></li>
              <li><a href="#startups" className="hover:text-white transition-colors">Startup Pass</a></li>
              <li><a href="#deal-room" className="hover:text-white transition-colors">Deal Room</a></li>
              <li><a href="#speakers" className="hover:text-white transition-colors">Apply as Speaker</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Experience</h4>
            <ul className="space-y-4 text-sm text-white font-light tracking-wide">
              <li><a href="#experience" className="hover:text-white transition-colors">Capital Zone</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Builders Zone</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Enterprise Zone</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Policy Zone</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Connect</h4>
            <ul className="space-y-4 text-sm text-brand-text-muted font-light tracking-wide">
              <li><a href="#sponsors" className="hover:text-white transition-colors">Become a Sponsor</a></li>
              <li><a href="#volunteer" className="hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media & Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
          <div>© 2026 ABUJA STARTUP EXPO. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, animate, useMotionValue, useInView } from 'motion/react';
import { 
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
  Mic
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
  const colors = ["#ffffff", "#ef4444", "#3b82f6", "#B8FF00", "#7B2FBE", "#00ffff"]; 

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/10 max-w-[1400px] mx-auto border-x border-white/10">
        {stats.map((s, i) => (
          <div key={i} className={`p-8 lg:p-12 text-center group hover:bg-[#0a0a0a] transition-colors flex flex-col justify-center min-h-[160px] ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
            <div className="text-3xl lg:text-4xl font-black font-heading text-white mb-2 group-hover:scale-105 transition-transform">
              <ScrambleText text={s.value} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-brand-text-muted font-bold">{s.label}</div>
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
            className="h-[40px] md:h-[60px] object-contain filter invert" 
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
        <a href="#tickets" className="btn-primary btn-white text-[10px] md:text-xs font-bold uppercase tracking-wider items-center rounded-sm px-4 md:px-8">
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
    <div className="fixed top-0 left-0 w-full h-10 bg-brand-primary text-white z-50 flex items-center overflow-hidden border-b border-white/20">
      <div className="flex whitespace-nowrap animate-marquee items-center text-xs font-bold uppercase tracking-widest">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-6">{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mx-2" />
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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505] pt-32 md:pt-[160px]">
      {/* Background Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 origin-bottom bg-[#050505]">
        <div className="absolute inset-0 bg-[#050505]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60 z-10" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </motion.div>



      {/* Bottom Section */}
      <div className="w-full px-6 md:px-12 pb-12 flex flex-col xl:flex-row items-end justify-between relative z-20 gap-10 xl:gap-0 mt-auto">
        
        {/* Bottom Left - Headline & CTAs */}
        {/* Bottom Left - Headline & Subheading */}
        <div className="w-full xl:w-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-brand-accent font-bold text-[11px] md:text-[13px] tracking-[0.2em] uppercase mb-4 md:mb-6 flex items-center gap-3"
          >
            Abuja Startup Expo 2026
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[85px] font-black text-white text-left leading-[1.05] font-hero drop-shadow-2xl flex flex-col items-start">
            <span className="block overflow-hidden pb-2">
              {Array.from("The Deal").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: i * 0.03 }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden pb-2">
              {Array.from("Gets Done Here.").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: (i + "The Deal".length) * 0.03 }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h1>

        </div>

        {/* Bottom Right - Subheading & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="mt-10 flex flex-col gap-8 max-w-[460px] xl:w-[460px]"
        >
          <div>
            <p className="text-white text-[16px] md:text-[18px] font-light leading-relaxed text-left">
              CONVERGE 2026 is not just a conference. It is one day in Nigeria’s capital where founders, investors, enterprise leaders, and policymakers gather with a single shared agenda: to close something real.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <a href="#tickets" className="group bg-white text-black hover:bg-brand-accent transition-all duration-300 w-full flex items-center justify-center gap-2 h-14 rounded-none font-bold text-[13px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <Ticket className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300" /> Get Your Tickets
            </a>
            <div className="flex gap-3">
              <a href="#sponsors" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 hover:border-white/30 text-white transition-all duration-300 w-1/2 flex items-center justify-center gap-2 h-12 rounded-none font-bold text-[11px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Handshake className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" /> Become a Sponsor
              </a>
              <a href="#speakers" className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 hover:border-white/30 text-white transition-all duration-300 w-1/2 flex items-center justify-center gap-2 h-12 rounded-none font-bold text-[11px] uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" /> Apply as Speaker
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section id="about" className="section-padding border-b border-white/10 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-4">What Is CONVERGE?</div>
        
        <div className="grid lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-heading text-white leading-[1.1]">
              Not just an event. <br/>
              <span className="text-white/40">A working ecosystem.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 text-lg md:text-xl text-white/80 font-light leading-relaxed space-y-6">
            <p>
              Nigeria has the founders. Africa has the ambition. What has always been missing is the room.
            </p>
            <p>
              Abuja Startup Expo 2026 is that room. On November 14th, 2026, in Nigeria’s capital city, we assemble the most consequential players in the ecosystem under one roof — not to talk about change, but to make it happen in real time.
            </p>
            <p>
              Every session is engineered for action. Every introduction is structured for outcome. Every zone is designed around a specific kind of deal: funding, partnership, enterprise, or policy.
            </p>
            <p className="text-white font-medium">
              We don’t measure success in attendance numbers. We measure it in term sheets signed, partnerships launched, and funding rounds started within the walls of CONVERGE.
            </p>
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
      <motion.rect x="15" y="30" width="70" height="40" rx="2" fill="#8b5cf6" variants={drawVariant} custom={0} />
      <motion.circle cx="50" cy="50" r="12" fill="#a7f3d0" variants={drawVariant} custom={1} />
      <motion.circle cx="50" cy="50" r="4" fill={strokeColor} variants={drawVariant} custom={2} />
      <motion.path d="M25 40 L35 40 M65 40 L75 40 M25 60 L35 60 M65 60 L75 60" variants={drawVariant} custom={3} />
      {/* Speed lines */}
      <motion.path d="M5 60 L10 55 M5 70 L15 65 M5 80 L10 75" variants={drawVariant} custom={4} />
    </motion.svg>
  );

  const BuildersIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.circle cx="50" cy="35" r="25" fill="#f59e0b" variants={drawVariant} custom={0} />
      <motion.circle cx="50" cy="35" r="14" fill="#8b5cf6" variants={drawVariant} custom={1} />
      <motion.path d="M34 56 L66 56 L58 75 L42 75 Z" fill="#ea580c" variants={drawVariant} custom={2} />
      <motion.path d="M42 75 L58 75 L50 90 Z" fill="#fde047" variants={drawVariant} custom={3} />
      <motion.path d="M50 90 L48 85 L52 85 Z" fill={strokeColor} variants={drawVariant} custom={4} />
      <motion.path d="M38 62 L62 62 M40 68 L60 68" variants={drawVariant} custom={5} />
      <motion.path d="M20 90 L35 90 M25 85 L30 85" variants={drawVariant} custom={6} />
    </motion.svg>
  );

  const EnterpriseIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.rect x="25" y="30" width="50" height="40" rx="10" fill="#ef4444" variants={drawVariant} custom={0} />
      <motion.circle cx="38" cy="48" r="7" fill="#fde047" variants={drawVariant} custom={1} />
      <motion.circle cx="38" cy="48" r="2" fill={strokeColor} variants={drawVariant} custom={2} />
      <motion.circle cx="62" cy="48" r="7" fill="#fde047" variants={drawVariant} custom={3} />
      <motion.circle cx="62" cy="48" r="2" fill={strokeColor} variants={drawVariant} custom={4} />
      <motion.rect x="15" y="45" width="10" height="15" rx="2" fill="#9ca3af" variants={drawVariant} custom={5} />
      <motion.rect x="75" y="45" width="10" height="15" rx="2" fill="#9ca3af" variants={drawVariant} custom={6} />
      <motion.path d="M45 60 L55 60" variants={drawVariant} custom={7} />
      <motion.path d="M40 85 L40 75 M50 90 L50 80 M60 85 L60 75" variants={drawVariant} custom={8} />
    </motion.svg>
  );

  const PolicyIcon = () => (
    <motion.svg viewBox="0 0 100 100" stroke={strokeColor} strokeWidth={iconStrokeWidth} strokeLinecap="round" strokeLinejoin="round" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="w-20 h-20 md:w-[120px] md:h-[120px] mx-auto transform transition-transform duration-300">
      <motion.circle cx="50" cy="45" r="30" fill="#3b82f6" variants={drawVariant} custom={0} />
      <motion.ellipse cx="50" cy="45" rx="12" ry="30" fill="none" variants={drawVariant} custom={1} />
      <motion.path d="M20 45 L80 45" variants={drawVariant} custom={2} />
      <motion.path d="M35 20 C 35 20, 65 20, 65 20" variants={drawVariant} custom={3} />
      <motion.path d="M35 70 C 35 70, 65 70, 65 70" variants={drawVariant} custom={4} />
      <motion.path d="M25 85 L75 85 M40 95 L60 95" variants={drawVariant} custom={5} />
    </motion.svg>
  );

  const zones = [
    {
      id: "01",
      shortName: "CAPITAL",
      title: "CONVERGE: CAPITAL",
      desc: "A closed, curated environment for investors, VCs, and serious funding conversations. Where term sheets take shape and capital finds its next great bet. Not a panel — a deal floor.",
      icon: <CapitalIcon />
    },
    {
      id: "02",
      shortName: "BUILDERS",
      title: "CONVERGE: BUILDERS",
      desc: "Live pitches, product demonstrations, and startup showcases. The stage where companies that have been building in silence finally step into the light. Investors are in the room. So is the media.",
      icon: <BuildersIcon />
    },
    {
      id: "03",
      shortName: "ENTERPRISE",
      title: "CONVERGE: ENTERPRISE",
      desc: "B2B deal-making, corporate partnership negotiations, and supplier discovery. Connecting established institutions with startups redefining their industries — before competitors find them first.",
      icon: <EnterpriseIcon />
    },
    {
      id: "04",
      shortName: "POLICY",
      title: "CONVERGE: POLICY",
      desc: "Government officials, regulators, and ecosystem builders in Abuja — where policy is written. These conversations have potential to move at the speed of legislation, not just LinkedIn posts.",
      icon: <PolicyIcon />
    }
  ];

  return (
    <section id="experience" className="section-padding border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-0">
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-4">The Experience</div>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-white leading-[1.1] mb-6 uppercase">
              Four Zones. <br/>One Purpose.
            </h2>
            <p className="text-brand-text-muted text-lg font-light leading-relaxed max-w-2xl">
              CONVERGE 2026 is structured into four high-intent spaces, each built around a specific kind of value creation. Every hour you spend here is pointed at an outcome.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {zones.map((zone, i) => (
            <div 
              key={i} 
              className="bg-[#0a0a0a] p-10 flex flex-col justify-between min-h-[420px] hover:bg-[#111] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-7xl font-black font-heading text-white/5 group-hover:text-white/10 transition-colors">
                {zone.id}
              </div>
              <div className="relative z-10 mb-auto">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">ZONE {zone.id} — {zone.shortName}</div>
                <h3 className="text-2xl font-bold font-heading text-white mb-6 tracking-tight">{zone.title}</h3>
                <div className="w-full flex items-center justify-center my-12 group-hover:scale-110 transition-transform duration-500">
                  {zone.icon}
                </div>
              </div>
              <p className="text-brand-text-muted font-light leading-relaxed text-sm relative z-10">
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
  const benefits = [
    {
      title: "Meet Investors Directly",
      desc: "Skip cold emails and pitch decks into the void. CONVERGE puts you in the room with the people who can write the cheque — curated, structured sessions engineered for action.",
      img: CardBg1
    },
    {
      title: "Find Real Partners",
      desc: "Corporates, governments, and fellow founders ready to build together. Every introduction at CONVERGE is a potential partnership. The room is full of the right ones.",
      img: CardBg2
    },
    {
      title: "Raise Funding",
      desc: "Structured pitch sessions, the Deal Room, and direct investor access designed to help startups start and close funding rounds. Not a competition. A funding environment.",
      img: CardBg3
    },
    {
      title: "Discover Startups",
      desc: "For investors and corporates: curated, vetted startups across key verticals — pre-selected for quality, investor readiness, and market traction. The signal, not the noise.",
      img: HeroBg
    },
    {
      title: "Close Deals",
      desc: "We don’t just facilitate conversations — we facilitate outcomes. Every zone, session, and networking moment is structured to push conversations toward commitment.",
      img: CardBg1
    },
    {
      title: "Build Ecosystem Visibility",
      desc: "Get your startup, fund, or organisation positioned at the centre of Nigeria’s most important innovation conversation — in the city where the next chapter is being written.",
      img: CardBg2
    }
  ];

  return (
    <section className="section-padding border-b border-white/10 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-6">
            <div className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-4">Why CONVERGE?</div>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-white leading-[1.1] mb-8">
              You don't attend to listen. <br/>You attend to act.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {benefits.map((b, i) => (
            <div key={i} className="group relative overflow-hidden bg-[#050505] min-h-[420px] flex flex-col p-10 lg:p-12">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${b.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-end items-center mb-8 pb-6 border-b border-white/20">
                  <span className="text-white/50 font-heading font-black text-2xl group-hover:text-white transition-colors">0{i+1} / 06</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-heading text-white mb-4 pr-4">{b.title}</h3>
                  <p className="text-white/80 font-light leading-relaxed text-sm group-hover:text-white transition-colors">{b.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartupShowcaseSection() {
  return (
    <section id="startups" className="section-padding border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-20">
        <div className="text-center flex flex-col items-center">
          <div className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-4">Startup Programme</div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-heading text-white leading-[1.1] mb-8 max-w-5xl">
            Get Your Startup On The <br className="hidden md:block" />Biggest Stage In Abuja.
          </h2>
          <p className="text-lg text-white/70 font-light leading-relaxed mb-12 max-w-2xl">
            Selected startups gain more than a booth. They gain access, visibility, and the momentum that changes trajectories. We look for startups solving real problems, ready for investor scrutiny, and hungry to scale.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="btn-primary btn-white h-14 px-8 text-xs rounded-sm">
              Apply as a Startup
            </a>
            <a href="#" className="btn-primary btn-outline h-14 px-8 text-xs rounded-sm">
              View Application Criteria
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { stat: "05 Min", label: "Live Pitch Slot", icon: <Mic className="w-8 h-8 text-brand-primary" /> },
            { stat: "3×3m", label: "Branded Booth", icon: <MapPin className="w-8 h-8 text-brand-primary" /> },
            { stat: "3", label: "Curated Investor Meetings", icon: <Handshake className="w-8 h-8 text-brand-primary" /> },
            { stat: "30 Min", label: "Expert Feedback Session", icon: <Users className="w-8 h-8 text-brand-primary" /> }
          ].map((item, i) => (
            <div key={i} className="relative group p-10 flex flex-col items-center text-center justify-center rounded-2xl overflow-hidden min-h-[380px] border border-white/5 bg-[#0a0a0a] hover:border-white/20 transition-colors duration-500">
              {/* Glowing Background Blobs */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] group-hover:bg-brand-primary/30 transition-colors duration-700 pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-brand-accent/10 rounded-full blur-[80px] group-hover:bg-brand-accent/20 transition-colors duration-700 pointer-events-none" />
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center w-full">
                {/* Icon Container with Glass Effect */}
                <div className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-translate-y-2 group-hover:bg-white/[0.08] transition-all duration-500 shadow-2xl">
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <div className="text-5xl md:text-6xl font-black font-heading text-white mb-6 tracking-tight drop-shadow-lg">
                  {item.stat}
                </div>
                
                {/* Animated Divider */}
                <div className="w-8 h-1 bg-brand-accent mb-6 rounded-full group-hover:w-16 group-hover:bg-brand-primary transition-all duration-500" />
                
                <div className="text-xs uppercase tracking-widest text-white/60 font-bold leading-relaxed group-hover:text-white transition-colors duration-300">
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
    { name: "Ada Onobun", role: "Managing Partner, First Law Partners", image: Speaker1 },
    { name: "Barr. Emmanuel Edet", role: "Ag. Director, NITDA", image: Speaker2 },
    { name: "Damilola Victoria Alabi", role: "ESQ", image: Speaker3 },
    { name: "Hart Shirley-Grace", role: "Founder, FoundHer", image: Speaker4 },
    { name: "Joel Amawhe", role: "Founder, Bizthom", image: Speaker5 },
    { name: "Nelson Agbo", role: "Abuja TechBro", image: Speaker6 },
    { name: "Omu Obilor", role: "Managing Partner, Afrileaplabs", image: Speaker7 },
    { name: "Remy Chukwunyere", role: "Executive Director, Ugumba", image: Speaker8 },
    { name: "Sir Stanley Amuchie", role: "Executive Director, Fidelity Bank", image: Speaker9 },
    { name: "Susanne Egbe", role: "Head of Account Mgt, Cloud Plexo", image: Speaker10 },
  ];

  return (
    <section id="speakers" className="section-padding border-b border-white/10 bg-[#020202]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <div className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-4">Speakers & Guests</div>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-white leading-[1.1] mb-8">
              The Voices Shaping <br/>Nigeria's Next Decade.
            </h2>
            <p className="text-white/80 font-light leading-relaxed mb-8">
              CONVERGE doesn’t fill a stage. Every speaker is selected because they have something specific to offer the room — a network to open, capital to deploy, or insight earned from building the real thing.
            </p>
            <p className="text-white/80 font-light leading-relaxed mb-10">
              Expect founders who’ve raised Series A and beyond, managing partners from leading VC firms, senior government officials, corporate innovation leads, and international ecosystem builders with African market expertise.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-white transition-colors">
              Apply as a Speaker <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 bg-[#050505] border border-white/10 p-8 md:p-12 relative rounded-xl">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-primary rounded-l-xl" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-8 border-b border-white/10 pb-4">Expect to hear from:</h3>
            <ul className="space-y-6">
              {[
                "Founders who’ve raised Series A and beyond in African markets",
                "Managing partners from leading pan-African and global VC firms",
                "Senior government officials shaping Nigeria’s digital economy policy",
                "Corporate innovation leads with active startup partnership mandates",
                "Angel investors deploying ₦500M+ annually in Nigerian startups",
                "International ecosystem builders with African market entry expertise"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <ArrowUpRight className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-white/80 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-white border-l-4 border-brand-accent pl-4">Past Speakers (2025)</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {previousSpeakers.map((speaker, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-lg aspect-[3/4]">
                <img 
                  src={speaker.image} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-bold text-lg leading-tight mb-1">{speaker.name}</h4>
                  <p className="text-brand-accent font-medium text-xs leading-snug">{speaker.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto border border-brand-accent/30 bg-brand-accent/5 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl" />
          <p className="text-white font-medium text-lg mb-4">Full 2026 speaker lineup drops October 1st, 2026.</p>
          <p className="text-white/60 text-sm mb-6">Subscribe to be the first to know when speakers are announced.</p>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto relative z-10">
            <input type="email" placeholder="EMAIL ADDRESS" className="flex-grow px-6 py-4 bg-[#050505] text-white border border-white/20 focus:outline-none focus:border-brand-accent text-xs tracking-widest font-light rounded-none" />
            <button className="btn-primary btn-accent h-[50px] px-8 text-xs rounded-none font-bold">Notify Me</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerSection() {
  const roles = [
    { title: "Guest Relations", desc: "Welcome and guide 1,000+ attendees from registration through to their seats. The first impression of CONVERGE 2026 is yours to own.", img: CardBg1 },
    { title: "Deal Room Support", desc: "Coordinate the highest-value sessions. Support curated founder-investor meetings, manage schedules, and ensure every session runs precisely on time.", img: CardBg2 },
    { title: "Stage Management", desc: "Work with our production team to run the four experience zones. Speakers, AV cues, timing, and on-stage logistics are your responsibility.", img: CardBg3 },
    { title: "Media & Content", desc: "Capture CONVERGE through photography, social media, and live updates. You are the eyes and voice of the event beyond the room.", img: HeroBg },
    { title: "Sponsor Liaison", desc: "Dedicated support for CONVERGE sponsors. Booth setup, logistics, introductions — ensuring every partner's experience is seamless.", img: CardBg1 },
    { title: "Registration & Tech", desc: "Own the attendee check-in experience. Manage the event app, ticketing systems, and real-time support for 1,000+ participants from gates open.", img: CardBg2 }
  ];

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
    <section id="volunteer" className="py-12 md:py-16 border-b border-white/10 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <motion.div variants={textVariant} custom={0} className="text-brand-accent font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="text-lg">★</span> Volunteer at CONVERGE 2026
            </motion.div>
            <motion.h2 variants={textVariant} custom={1} className="text-4xl md:text-5xl font-black font-heading text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              Help build Nigeria's <br/>Most Important <br/>Startup Gathering.
            </motion.h2>
            <motion.div variants={textVariant} custom={2} className="space-y-6 text-lg text-white/70 font-light leading-relaxed mb-10">
              <p>Behind every great event is a team of people who chose to show up before anyone asked them to. CONVERGE 2026’s volunteer programme is for students, young professionals, and emerging ecosystem leaders who want to be part of building Nigeria’s startup moment — not just attending it.</p>
            </motion.div>
            <motion.div variants={textVariant} custom={3} className="flex flex-wrap gap-4">
              <a href="#" className="bg-white text-black h-14 px-8 text-xs font-bold uppercase tracking-widest flex items-center rounded-sm hover:bg-brand-gold transition-colors">Apply to Volunteer</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:col-start-9 flex items-center"
          >
            <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-2xl w-full">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-6 border-b border-white/10 pb-4">Who Should Apply</h3>
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
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-20 overflow-hidden rounded-xl">
          {roles.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#080808] p-10 hover:bg-[#111] transition-all duration-500 relative overflow-hidden group min-h-[300px] flex flex-col justify-end"
            >
              {/* Background Image on Hover */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
              </div>
              
              <div className="text-brand-primary/10 font-black font-heading text-6xl absolute top-6 right-6 group-hover:text-brand-primary/30 transition-colors">0{i+1}</div>
              <h4 className="text-xl font-black font-heading text-white mb-4 relative z-10 uppercase tracking-tight group-hover:text-brand-accent transition-colors">{r.title}</h4>
              <p className="text-white/50 font-light leading-relaxed text-sm relative z-10 group-hover:text-white/80 transition-colors">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Perks */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden">
          {[
            { title: "Volunteer Kit", desc: "Official CONVERGE gear — t-shirt, lanyard, and programme." },
            { title: "Full Access", desc: "Access to all main stage sessions and exhibition floor." },
            { title: "Network", desc: "Be in the room with Nigeria's top founders and investors." },
            { title: "Certificate", desc: "Signed certificate for your portfolio and record." }
          ].map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0a0a] p-8 flex flex-col"
            >
              <h4 className="text-xs font-black font-heading text-brand-accent mb-3 uppercase tracking-widest">{p.title}</h4>
              <p className="text-white/40 font-light text-xs leading-relaxed">{p.desc}</p>
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
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-brand-accent/30 bg-brand-accent/5 px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-8 rounded-full backdrop-blur-sm"
          >
            Early bird pricing ends Sept 30, 2026
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white leading-tight uppercase tracking-tighter">Choose Your <br/>Experience.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {tickets.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 lg:p-10 flex flex-col bg-[#0a0a0a] border border-white/5 relative overflow-hidden group rounded-[32px] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${t.popular ? 'ring-2 ring-brand-accent ring-offset-4 ring-offset-[#050505]' : ''}`}
            >
              {t.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-brand-accent px-6 py-1.5 text-[9px] font-bold uppercase tracking-widest text-black rounded-b-xl shadow-lg">
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

              <ul className="space-y-4 mb-10 flex-grow text-[13px] text-white/70 font-light">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${t.popular ? 'bg-brand-accent/20' : 'bg-white/10'}`}>
                      <Check className={`w-2.5 h-2.5 ${t.popular ? 'text-brand-accent' : 'text-white'}`} />
                    </div>
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-xl relative overflow-hidden group/btn ${t.popular ? 'bg-brand-accent text-black hover:bg-white' : 'bg-white text-black hover:bg-brand-accent'}`}>
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
  const tiers = [
    { 
      tier: "BRONZE", 
      perks: "Brand visibility + exhibition presence + digital programme listing",
      color: "from-[#CD7F32] to-[#8B4513]",
      glow: "rgba(205, 127, 50, 0.3)"
    },
    { 
      tier: "SILVER", 
      perks: "Bronze + speaking slot + networking session + audience data report",
      color: "from-[#C0C0C0] to-[#707070]",
      glow: "rgba(192, 192, 192, 0.3)"
    },
    { 
      tier: "GOLD", 
      perks: "Silver + Deal Room naming rights + investor introductions + co-branded content",
      color: "from-[#FFD700] to-[#B8860B]",
      glow: "rgba(255, 215, 0, 0.3)"
    },
    { 
      tier: "TITLE PARTNER", 
      perks: "Full co-branding + keynote slot + exclusive lounge + first right of refusal 2027",
      color: "from-[#FFFFFF] to-[#888888]",
      glow: "rgba(255, 255, 255, 0.3)"
    }
  ];

  return (
    <section id="sponsors" className="section-padding border-b border-white/10 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="text-brand-accent font-bold text-xs tracking-widest uppercase mb-4">Partnership & Sponsorship</div>
          <h2 className="text-4xl md:text-7xl font-black font-heading text-white leading-[1.1] mb-12 uppercase">
            Sponsors don't get visibility.<br/>
            They get access.
          </h2>
        </div>
        <div className="text-center mb-16">
          <h3 className="text-2xl font-black font-heading text-white uppercase tracking-wider">Sponsorship Levels</h3>
          <div className="w-20 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/10 p-10 flex flex-col items-center text-center group hover:border-white/30 transition-all duration-500 rounded-2xl relative overflow-hidden h-[480px] justify-between">
              {/* Coin Container */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-10 perspective-1000">
                <motion.div 
                  className={`w-full h-full rounded-full bg-gradient-to-br ${t.color} relative preserve-3d`}
                  animate={{ 
                    rotateY: 360
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{
                    boxShadow: `0 0 40px ${t.glow}, inset -5px -5px 15px rgba(0,0,0,0.4), inset 5px 5px 15px rgba(255,255,255,0.3)`
                  }}
                >
                  {/* Coin Edge/Rim Effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                  <div className="absolute inset-[10%] rounded-full border border-black/20" />
                  
                  {/* Symbol in the middle (optional but adds to coin look) */}
                  <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-black/20 font-heading select-none">
                    ₦
                  </div>
                </motion.div>
                
                {/* Ground Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/60 blur-md rounded-full scale-x-150" />
              </div>

              <div className="relative z-10">
                <h4 className="text-2xl font-black font-heading text-white mb-6 uppercase tracking-wider">{t.tier}</h4>
                <div className="w-12 h-1 bg-brand-gold/30 mx-auto mb-6 group-hover:w-20 group-hover:bg-brand-gold transition-all duration-500 rounded-full" />
                <p className="text-brand-text-muted font-light text-sm leading-relaxed">{t.perks}</p>
              </div>

              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors border border-brand-gold/30 px-12 py-5 rounded-sm hover:bg-brand-gold hover:text-black">
            Request Sponsorship Deck <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Past Sponsors */}
        <div className="mt-32 mb-10 bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-2xl">
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black font-heading text-white mb-4 uppercase tracking-tight">Trusted By Leaders (2025)</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">The organisations that backed Nigeria's startup ecosystem.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 items-center justify-items-center opacity-50 hover:opacity-100 transition-opacity duration-500">
            {[Sponsor1, Sponsor2, Sponsor3, Sponsor4, Sponsor5, Sponsor6, Sponsor7, Sponsor8].map((img, i) => (
              <div key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110">
                <img src={img} alt="Past Sponsor" className="max-h-12 md:max-h-16 w-auto object-contain" />
              </div>
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
      {/* High-Impact Image Background */}
      <div 
        className="absolute inset-0 z-0 opacity-70 grayscale-[30%]"
        style={{ 
          backgroundImage: `url(${CardBg2})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
        }} 
      />
      
      {/* Multi-layered Overlays for depth and readability */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />
      <div className="absolute inset-0 bg-brand-primary/20 mix-blend-multiply z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[3]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-10 font-heading leading-[1.1] tracking-tight text-white drop-shadow-2xl">
          The Room Where Nigeria's Next Chapter Gets Written.
        </h2>

        <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed text-white/90 drop-shadow-lg">
          This is where the deal gets done. Where the introduction becomes a partnership. Where the pitch becomes a term sheet.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] border-y border-white/20 py-10 backdrop-blur-md bg-white/5 rounded-sm">
          <span>Nov 14, 2026</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-brand-gold rounded-full" />
          <span>Abuja, Nigeria</span>
          <span className="hidden sm:block w-1.5 h-1.5 bg-brand-gold rounded-full" />
          <span>1,000+ Founders & Investors</span>
        </div>

        <div className="font-bold text-xl font-heading mb-10 text-white drop-shadow-lg uppercase tracking-widest">Don't watch this from the outside.</div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#tickets" className="bg-white text-black px-10 py-5 text-xs font-bold uppercase tracking-[1.5px] hover:bg-brand-gold transition-all rounded-sm shadow-2xl hover:-translate-y-1">
            Get Tickets Now
          </a>
          <a href="#sponsors" className="border border-white/60 text-white px-10 py-5 text-xs font-bold uppercase tracking-[1.5px] hover:bg-white hover:text-black transition-all rounded-sm hover:-translate-y-1 backdrop-blur-sm">
            Become a Sponsor
          </a>
          <a href="#startups" className="border border-white/60 text-white px-10 py-5 text-xs font-bold uppercase tracking-[1.5px] hover:bg-white hover:text-black transition-all rounded-sm hover:-translate-y-1 backdrop-blur-sm">
            Apply as a Startup
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-32 pb-16 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
          <div className="lg:col-span-5">
            <div className="mb-8">
              <img src={LogoNoBg} alt="Abuja Startup Expo" className="h-16 w-auto" />
            </div>
            <p className="text-white/60 font-light max-w-md mb-12 text-sm leading-relaxed">
              CONVERGE 2026 brings together the most important players in Nigeria’s startup ecosystem. Where capital, innovation, and opportunity meet — in Nigeria’s capital city.
            </p>
            
            <div className="flex gap-4">
              {['LinkedIn', 'Twitter/X', 'Instagram', 'YouTube'].map((social, i) => (
                <a key={i} href="#" className="text-xs font-bold uppercase tracking-widest text-brand-text-muted hover:text-white transition-colors border border-white/10 px-4 py-2 hover:border-white/30 rounded-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Attend</h4>
            <ul className="space-y-4 text-sm text-brand-text-muted font-light tracking-wide">
              <li><a href="#tickets" className="hover:text-white transition-colors">Get Tickets</a></li>
              <li><a href="#startups" className="hover:text-white transition-colors">Startup Pass</a></li>
              <li><a href="#deal-room" className="hover:text-white transition-colors">Deal Room</a></li>
              <li><a href="#speakers" className="hover:text-white transition-colors">Apply as Speaker</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-8 text-xs uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Experience</h4>
            <ul className="space-y-4 text-sm text-brand-text-muted font-light tracking-wide">
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

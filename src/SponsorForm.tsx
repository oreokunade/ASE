import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import LogoNoBg from '../Images/Logo/Abuja Startup Expo Logo - No bg.png';
import HeaderBg from '../Images/ASE26 website Pictures/DSC01933.jpg';
import { Navbar, Footer } from './App';

// Import Sponsors
import Sponsor1 from '../Images/Sponsors/2025/48 Property Marketing.png';
import Sponsor2 from '../Images/Sponsors/2025/Afrileap Labs.png';
import Sponsor3 from '../Images/Sponsors/2025/Bank Plus.png';
import Sponsor4 from '../Images/Sponsors/2025/Cloud Plexo.png';
import Sponsor5 from '../Images/Sponsors/2025/Fidelity.png';
import Sponsor6 from '../Images/Sponsors/2025/First Law Partners.png';
import Sponsor7 from '../Images/Sponsors/2025/Future Living Africa.png';
import Sponsor8 from '../Images/Sponsors/2025/IPLAN.png';

export default function SponsorForm() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const fullName = `${formData.get('first_name')} ${formData.get('last_name')}`;
    
    const googleFormData = new FormData();
    googleFormData.append('entry.1348112742', formData.get('company_name'));
    googleFormData.append('entry.301797802', fullName);
    googleFormData.append('entry.1243391090', formData.get('job_title'));
    googleFormData.append('entry.1324358255', formData.get('email'));
    googleFormData.append('entry.918672001', formData.get('phone'));
    googleFormData.append('entry.1457479524', formData.get('country'));
    googleFormData.append('entry.1860957890', formData.get('sector'));
    googleFormData.append('entry.1496492741', formData.get('website'));
    googleFormData.append('entry.1930189365', formData.get('description'));
    googleFormData.append('entry.2059695822', formData.get('budget'));

    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSckTFoqL2fkQmTKvimhX-IS-MOWJ4OUOmGOdHe88f6Dl8VRmQ/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: googleFormData
    }).then(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }).catch((err) => {
      setIsSubmitting(false);
      console.error(err);
    });
  };

  const sponsors = [Sponsor1, Sponsor2, Sponsor3, Sponsor4, Sponsor5, Sponsor6, Sponsor7, Sponsor8];

  return (
    <div className="selection:bg-brand-primary selection:text-white bg-[#050505] text-brand-dark min-h-screen font-sans">
      <Navbar />

      {/* Hero Header Split Layout */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-4 md:px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="flex flex-col items-start text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-brand-primary font-black text-xs md:text-sm tracking-[0.3em] uppercase mb-4">Partner With Us</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6 uppercase">
              Become a <br /><span>Sponsor</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
              Abuja Startup Expo — happening soon in Abuja — is Nigeria's premier innovation showcase, bringing together visionary founders, investors, and industry leaders under one roof.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-4">
              <a href="#sponsor-form" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-4 text-sm font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all rounded-none shadow-xl hover:-translate-y-1 group">
                Fill Application <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="relative h-[400px] md:h-[600px] group overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src={HeaderBg} alt="Become a Sponsor" className="w-full h-full object-cover" />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-transparent to-transparent opacity-40 md:opacity-80" />
          </motion.div>
          
        </div>
      </section>

      {/* Former Sponsors Bar */}
      <section className="border-y border-white/10 bg-white/[0.02] py-10 md:py-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <p className="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-10">Join these industry leaders who have sponsored before</p>
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ x: [0, -1000] }} 
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex w-max gap-12 md:gap-24 items-center pl-12 md:pl-24"
            >
              {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((src, idx) => (
                <img key={idx} src={src} alt="Former Sponsor" className="h-8 md:h-12 w-auto object-contain shrink-0" />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Form Content */}
      <section id="sponsor-form" className="py-20 md:py-32 px-4 md:px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            
            {isSuccess ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-4">Application Received!</h3>
                <p className="text-white/60 font-light text-lg mb-8 max-w-md mx-auto">
                  Thank you for your interest in sponsoring Abuja Startup Expo 2026. Our partnerships team will review your details and get back to you within 48 hours.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-brand-primary text-white px-8 py-4 text-xs font-black uppercase tracking-[2px] hover:bg-white hover:text-black transition-all rounded-none"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="mb-10 relative z-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-2">Sponsorship Inquiry</h2>
                  <p className="text-white/60 font-light text-sm md:text-base">
                    Need to reach out to us immediately? Send us an email at <a href="mailto:partner@abujastartupexpo.com" className="text-brand-primary hover:underline font-medium">partner@abujastartupexpo.com</a>
                  </p>
                </div>

                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                  {/* Company Name */}
                  <div>
                    <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Company Name *</label>
                    <input 
                      type="text" 
                      name="company_name"
                      required
                      placeholder="Enter your company name"
                      className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                    />
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">First name *</label>
                      <input 
                        type="text" 
                        name="first_name"
                        required
                        placeholder="Enter first name"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Last name *</label>
                      <input 
                        type="text" 
                        name="last_name"
                        required
                        placeholder="Enter last name"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Job Title & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Job Title *</label>
                      <input 
                        type="text" 
                        name="job_title"
                        required
                        placeholder="E.g. Marketing Director"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Email *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="you@company.com"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Phone Number *</label>
                      <div className="flex border border-white/20 focus-within:border-brand-primary transition-colors bg-[#151515]">
                        <div className="flex items-center px-4 border-r border-white/10 cursor-pointer">
                          <span className="text-lg mr-2">🇳🇬</span>
                          <span className="text-white/40 text-[10px]">▼</span>
                        </div>
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          placeholder="+234"
                          className="w-full bg-transparent text-white p-4 focus:outline-none rounded-none placeholder:text-white/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Country *</label>
                      <div className="relative">
                        <select 
                          name="country"
                          required
                          className="w-full bg-[#151515] border border-white/20 text-white/80 p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none appearance-none cursor-pointer"
                          defaultValue=""
                        >
                          <option value="" disabled className="text-white/20">Select an option</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary text-xs">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Company Sector & Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Company Sector *</label>
                      <input 
                        type="text" 
                        name="sector"
                        required
                        placeholder="E.g. Fintech, Healthtech"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Website *</label>
                      <input 
                        type="url" 
                        name="website"
                        required
                        placeholder="https://"
                        className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Company Description */}
                  <div>
                    <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold flex justify-between">
                      <span>Company description *</span>
                      <span className="text-white/40 font-normal normal-case tracking-normal">Max 150 words</span>
                    </label>
                    <textarea 
                      name="description"
                      required
                      placeholder="Tell us what your company does..."
                      rows={3}
                      className="w-full bg-[#151515] border border-white/20 text-white p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none resize-y placeholder:text-white/50"
                    ></textarea>
                  </div>



                  {/* Sponsorship Budget */}
                  <div>
                    <label className="block text-white text-xs uppercase tracking-widest mb-3 font-bold">Sponsorship Budget *</label>
                    <div className="relative">
                      <select 
                        name="budget"
                        required
                        className="w-full bg-[#151515] border border-white/20 text-white/80 p-4 focus:outline-none focus:border-brand-primary transition-colors rounded-none appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled className="text-white/20">Select one</option>
                        <option value="₦15,000,000">₦15,000,000</option>
                        <option value="₦10,000,000 – ₦5,000,000">₦10,000,000 – ₦5,000,000</option>
                        <option value="₦5,000,000 – ₦3,000,000">₦5,000,000 – ₦3,000,000</option>
                        <option value="₦2,500,000">₦2,500,000</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary text-xs">
                        ▼
                      </div>
                    </div>
                  </div>



                  {/* Submit Button */}
                  <div className="pt-6">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-primary text-white py-5 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-[2px] hover:bg-white hover:text-black transition-all rounded-none shadow-xl hover:-translate-y-1 group disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-brand-primary disabled:hover:text-white"
                    >
                      {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"} {!isSubmitting && <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

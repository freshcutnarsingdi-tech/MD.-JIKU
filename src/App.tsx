/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Instagram, Facebook, Music2, Mail, ChefHat, Utensils, Clock, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("freshcut_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("freshcut_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: "Home Made Noodles",
      price: "99 TK",
      description: "Crafted with tradition. Our noodles are prepared daily using premium flour and farm-fresh eggs, tossed with seasonal greens and a hint of secret spices.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
      tag: "Signature Dish",
      prepTime: "15-20 MIN",
      serving: "1 PERSON",
      details: ["Freshly Prepared", "Hand-pulled texture", "Seasonal Veggies"]
    },
    {
      id: 2,
      title: "Chicken Biryani",
      price: "199 TK",
      description: "A royal feast. Our signature biryani features long-grain basmati rice, tender Pakistani chicken, and aromatic spices slow-cooked to perfection.",
      image: "https://i.imgur.com/DxOVLxv.jpg",
      tag: "Ramadhan Special",
      prepTime: "25-30 MIN",
      serving: "1 PERSON",
      details: ["Fragrant Pulao", "Roasted Potato", "Boiled Egg", "Pakistani Chicken"]
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Simple countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand/30 overflow-x-hidden relative">
      {/* GDK Style Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4">
        <div className="max-w-[1400px] mx-auto bg-brand rounded-full h-14 md:h-16 flex items-center justify-between px-6 md:px-8 shadow-2xl">
          <div className="flex-1">
            <motion.button 
              onClick={() => setShowMenu(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-4 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest w-fit"
            >
              Order Now
            </motion.button>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-black fill-black" />
            <span className="font-display text-2xl md:text-3xl text-black tracking-tighter">FRESHCUT</span>
          </div>

          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setShowMenu(true)}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black flex flex-col items-center justify-center gap-1 group hover:bg-black transition-colors"
            >
              <div className="w-4 md:w-5 h-[2px] bg-black group-hover:bg-brand transition-colors" />
              <div className="w-4 md:w-5 h-[2px] bg-black group-hover:bg-brand transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000"
              alt="Premium Kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Multi-layered overlay for depth and readability */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent hidden md:block" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl md:ml-auto text-center md:text-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 bg-brand/10 backdrop-blur-md border border-brand/20 text-brand px-4 py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                  </span>
                  100% Home-Based Cloud Kitchen
                </div>
                
                <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1] md:leading-[0.85] tracking-tight md:tracking-tighter mb-8">
                  NOTHING BEATS A <br />
                  <span className="text-brand uppercase inline-block mt-2">Home-Cooked Feast</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-white/90 max-w-2xl md:ml-auto mb-12 font-medium leading-relaxed">
                  Gourmet quality, family tradition, and farm-fresh ingredients delivered safely to your door. 
                  <span className="hidden md:inline"> Experience the revolution of home dining in Narsingdi.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6">
                  <motion.button 
                    onClick={() => setShowMenu(true)}
                    whileHover={{ scale: 1.02, backgroundColor: "#FFFFFF" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-brand text-black px-12 py-5 rounded-full font-display text-2xl tracking-tight uppercase transition-colors shadow-2xl shadow-brand/20"
                  >
                    Order Now
                  </motion.button>
                  
                  <button 
                    onClick={() => {
                      const el = document.getElementById('signature');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/60 hover:text-brand font-display text-xl uppercase tracking-widest transition-colors flex items-center gap-2 group"
                  >
                    Explore Menu
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
          </motion.div>
        </section>

        {/* Featured Items - Brutalist Style */}
        <section id="signature" className="py-20 md:py-32 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-4 border-brand pb-4 gap-4">
              <div className="space-y-2">
                <h2 className="font-display text-5xl md:text-7xl tracking-tighter uppercase">Our Signature</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowFavoritesOnly(false)}
                    className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-colors ${!showFavoritesOnly ? 'border-brand text-brand' : 'border-transparent text-white/40 hover:text-white'}`}
                  >
                    All Items
                  </button>
                  <button 
                    onClick={() => setShowFavoritesOnly(true)}
                    className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-colors ${showFavoritesOnly ? 'border-brand text-brand' : 'border-transparent text-white/40 hover:text-white'}`}
                  >
                    Saved ({favorites.length})
                  </button>
                </div>
              </div>
              <span className="font-display text-xl md:text-2xl text-brand uppercase">Handcrafted for you</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {menuItems
                .filter(item => !showFavoritesOnly || favorites.includes(item.id))
                .map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/5 border-4 border-white/10 overflow-hidden cursor-pointer"
                  onClick={() => {
                    setCurrentSlide(item.id - 1);
                    setShowMenu(true);
                  }}
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-brand hover:text-black transition-all"
                    >
                      <Utensils className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-6 md:p-8 flex justify-between items-center bg-black group-hover:bg-brand transition-colors">
                    <div>
                      <span className="text-[8px] md:text-xs font-black uppercase tracking-[0.2em] text-brand group-hover:text-black mb-1 md:mb-2 block">{item.tag}</span>
                      <h4 className="font-display text-3xl md:text-4xl text-white group-hover:text-black leading-none">{item.title}</h4>
                    </div>
                    <div className="bg-brand group-hover:bg-black text-black group-hover:text-brand px-4 md:px-6 py-1 md:py-2 font-display text-xl md:text-2xl">
                      {item.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="py-20 md:py-32 bg-brand">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-display text-6xl md:text-8xl text-black leading-[1.1] md:leading-none tracking-tighter mb-6 md:mb-8">
                JOIN THE <br />REVOLUTION
              </h2>
              <p className="text-black text-lg md:text-xl font-bold uppercase tracking-tight max-w-md">
                Sign up for exclusive offers, new menu drops, and home delivery updates.
              </p>
            </div>
            <div className="bg-black p-8 md:p-12 rounded-[2rem] md:rounded-[3rem]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-black text-brand">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="YOUR@EMAIL.COM"
                      className="w-full bg-white/5 border-b-2 border-brand py-4 px-0 focus:outline-none focus:border-white transition-all placeholder:text-white/20 font-display text-2xl uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand hover:bg-white text-black py-6 rounded-full font-display text-2xl uppercase transition-colors"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <h3 className="font-display text-5xl text-brand mb-4">THANK YOU!</h3>
                  <p className="text-white/60 uppercase tracking-widest font-bold">You're on the list.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black pt-20 md:pt-32 pb-12 border-t-4 border-brand">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
              <div className="space-y-8">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-10 h-10 text-brand fill-brand" />
                  <span className="font-display text-4xl tracking-tighter">FRESHCUT</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {['Our Food', 'The Menu', 'Offers', 'Latest News', 'Join Us'].map((link) => (
                    <a key={link} href="#" className="font-display text-2xl uppercase tracking-tight hover:text-brand transition-colors border-b border-white/10 pb-2 w-fit">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="lg:col-start-4 space-y-8 text-left md:text-right">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Contact Us</p>
                  <a 
                    href="mailto:freshcutnarsingdi@gmail.com" 
                    className="font-sans text-lg text-brand hover:text-white transition-colors block lowercase"
                  >
                    freshcutnarsingdi@gmail.com
                  </a>
                </div>
                <div className="flex justify-start md:justify-end gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61588031116137" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-6 h-6 hover:text-brand cursor-pointer transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/freshcutnarsingdi/?hl=en" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-6 h-6 hover:text-brand cursor-pointer transition-colors" />
                  </a>
                  <Music2 className="w-6 h-6 hover:text-brand cursor-pointer transition-colors" />
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">© FRESHCUT NARSINGDI 2026</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">SITE CREDIT: THE DESIGN FACTORY</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Menu Modal - Redesigned */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowMenu(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-black border-4 border-brand overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col"
            >
              <div className="p-6 md:p-8 flex items-center justify-between border-b-4 border-brand">
                <h2 className="font-display text-3xl md:text-5xl tracking-tighter uppercase">The Menu</h2>
                <button onClick={() => setShowMenu(false)} className="bg-brand text-black p-2 rounded-full hover:bg-white transition-colors">
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
                  >
                    <div className="relative border-4 md:border-8 border-white/10">
                      <img 
                        src={menuItems[currentSlide].image} 
                        alt={menuItems[currentSlide].title} 
                        className="w-full aspect-square object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={() => toggleFavorite(menuItems[currentSlide].id)}
                        className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-brand text-brand hover:bg-brand hover:text-black transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"
                      >
                        <Utensils className={`w-4 h-4 ${favorites.includes(menuItems[currentSlide].id) ? 'fill-current' : ''}`} />
                        {favorites.includes(menuItems[currentSlide].id) ? 'Saved' : 'Save for Later'}
                      </button>
                      <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-brand text-black px-4 md:px-8 py-2 md:py-4 font-display text-2xl md:text-4xl shadow-2xl">
                        {menuItems[currentSlide].price}
                      </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      <div>
                        <span className="font-display text-xl md:text-2xl text-brand uppercase tracking-tight block mb-2">{menuItems[currentSlide].tag}</span>
                        <h3 className="font-display text-5xl md:text-8xl leading-none tracking-tighter uppercase mb-4 md:mb-6">
                          {menuItems[currentSlide].title}
                        </h3>
                        <p className="text-lg md:text-xl text-white/60 font-medium leading-tight uppercase">
                          {menuItems[currentSlide].description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:gap-8 border-y-4 border-white/10 py-6 md:py-8">
                        <div>
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Prep Time</span>
                          <span className="font-display text-2xl md:text-3xl uppercase">{menuItems[currentSlide].prepTime}</span>
                        </div>
                        <div>
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Serving</span>
                          <span className="font-display text-2xl md:text-3xl uppercase">{menuItems[currentSlide].serving}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {menuItems[currentSlide].details.map((detail, i) => (
                          <span key={i} className="bg-white/10 px-3 md:px-4 py-1 md:py-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                            {detail}
                          </span>
                        ))}
                      </div>

                      <motion.a 
                        href={`https://wa.me/8801841513021?text=${encodeURIComponent(`Hi Freshcut! I'd like to order ${menuItems[currentSlide].title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full bg-brand text-black py-4 md:py-6 rounded-full text-center font-display text-2xl md:text-3xl uppercase"
                      >
                        Order via WhatsApp
                      </motion.a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-6 md:p-8 border-t-4 border-brand flex items-center justify-between bg-white/5">
                <div className="flex gap-2 md:gap-4">
                  <button onClick={prevSlide} className="bg-brand text-black p-3 md:p-4 rounded-full hover:bg-white transition-colors">
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button onClick={nextSlide} className="bg-brand text-black p-3 md:p-4 rounded-full hover:bg-white transition-colors">
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                </div>
                <div className="font-display text-2xl md:text-3xl tracking-tighter">
                  0{currentSlide + 1} / 0{menuItems.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

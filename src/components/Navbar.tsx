import { motion } from "motion/react";
import { Bot, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Features", href: "/#features" },
  { name: "Use Cases", href: "/#use-cases" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Resources", href: "/#resources", hasDropdown: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-border",
        scrolled ? "bg-brand-950/90 backdrop-blur-md" : "bg-brand-950/50 backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <div className="w-4 h-4 bg-brand-950 rounded-sm"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-text-main">Born Ai</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-text-muted hover:text-text-main transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Auth / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-5 py-2 text-sm font-medium bg-text-main text-brand-950 rounded-full hover:bg-gray-200 hover:text-black transition-colors">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-text-main" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

import { TextHoverEffect, FooterBackgroundGradient } from "./ui/hover-footer";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-brand-950 border-t border-border mt-12 overflow-hidden pb-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-950 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-text-main">Born Ai</span>
            </div>
            <p className="text-text-muted mb-6 max-w-sm">
              The premium platform for building, deploying, and managing intelligent AI agents powered by your knowledge base.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-hover transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-hover transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-hover transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-text-main font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Integrations</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-main font-semibold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-main font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Partners</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 relative z-40">
          <p className="text-text-muted text-sm">© 2026 Born Ai Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-text-main transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Text hover effect integrated smoothly at the bottom */}
      <div className="relative w-full h-[15rem] md:h-[25rem] lg:h-[30rem] -mt-20 md:-mt-36 lg:-mt-52 -mb-10 md:-mb-24 lg:-mb-36 z-30 flex items-center justify-center">
        <TextHoverEffect text="BORN AI" className="w-full h-full pointer-events-auto" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

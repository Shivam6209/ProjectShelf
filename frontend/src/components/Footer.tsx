import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Linkedin, Instagram, Send, Heart, Code, Palette, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/30 to-muted/50 border-t border-border">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-30" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
            {/* Brand Section */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <Link href="/" className="inline-block group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Palette className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      ProjectShelf
                    </span>
                  </div>
                </Link>
              </div>
              
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Create stunning, dynamic portfolios with modular case studies. Perfect for designers, developers, and creative professionals who want to showcase their work beautifully.
              </p>
              
              {/* Features Highlight */}
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Dynamic Portfolios</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Case Studies</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Custom Themes</span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold mb-3 text-foreground">Stay Updated</h4>
                <div className="flex gap-2 max-w-sm">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-background/80 backdrop-blur-sm border-border focus:border-primary"
                  />
                  <Button className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Get updates on new features and design inspiration.
                </p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Platform</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/explore" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                    <Users className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Explore Portfolios
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                    <Code className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group">
                    <Palette className="h-4 w-4 group-hover:text-primary transition-colors" />
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Design Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} ProjectShelf.</span>
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>for creators</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground hidden sm:block">Follow us:</span>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-muted hover:bg-blue-500/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-blue-500 transition-all duration-200 hover:scale-110"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-muted hover:bg-blue-600/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-blue-600 transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 bg-muted hover:bg-pink-500/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-pink-500 transition-all duration-200 hover:scale-110"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
              
              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Privacy
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Terms
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
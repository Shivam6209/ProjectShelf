'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, BookOpen, Search, Sparkles, Globe } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export function Header() {
  const { user, logout } = useAuth();
  const { currentTheme, darkMode } = useTheme();
  const isAuthenticated = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                ProjectShelf
              </span>
            </Link>
            
            <nav className="hidden md:flex gap-1">
              <Link href="/explore" className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 group">
                <Globe className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                Explore
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 group">
                  <LayoutDashboard className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3 relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-3 hover:bg-accent px-3 py-2 rounded-lg transition-all duration-200"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <Avatar className="h-8 w-8 ring-2 ring-border hover:ring-primary/50 transition-all duration-200">
                    {user?.avatarUrl ? (
                      <AvatarImage src={user.avatarUrl} alt={user.name || 'User'} />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                        {user?.name ? user.name.substring(0, 2).toUpperCase() : user?.username?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{user?.username}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg p-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <Link href={`/${user?.username}`}>
                      <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 rounded-lg" onClick={() => setIsUserMenuOpen(false)}>
                        <User className="h-4 w-4 mr-3" />
                        View Profile
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-purple-50 hover:text-purple-600 rounded-lg" onClick={() => setIsUserMenuOpen(false)}>
                        <LayoutDashboard className="h-4 w-4 mr-3" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/dashboard/themes">
                      <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-600 rounded-lg" onClick={() => setIsUserMenuOpen(false)}>
                        <Sparkles className="h-4 w-4 mr-3" />
                        Themes
                      </Button>
                    </Link>
                    <div className="h-px bg-border my-2"></div>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link href="/explore" className="flex items-center text-sm font-medium p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              <Globe className="mr-3 h-4 w-4" />
              Explore Portfolios
            </Link>
            <Link href="/search" className="flex items-center text-sm font-medium p-3 hover:bg-accent hover:text-foreground rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
              <Search className="mr-3 h-4 w-4" />
              Search
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="flex items-center text-sm font-medium p-3 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                  <LayoutDashboard className="mr-3 h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/dashboard/themes" className="flex items-center text-sm font-medium p-3 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                  <Sparkles className="mr-3 h-4 w-4" />
                  Themes
                </Link>
                <Link href={`/${user?.username}`} className="flex items-center text-sm font-medium p-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                  <User className="mr-3 h-4 w-4" />
                  View Profile
                </Link>
                <div className="h-px bg-border my-2"></div>
                <Button variant="ghost" className="flex items-center justify-start text-sm font-medium p-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
            
            {!isAuthenticated && (
              <div className="flex gap-3 pt-4 border-t border-border">
                <Link href="/login" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full rounded-lg">Login</Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">Sign Up</Button>
                </Link>
              </div>
            )}
            <div className="pt-4 border-t border-border flex justify-center">
              <ThemeSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 
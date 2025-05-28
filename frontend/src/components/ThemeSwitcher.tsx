'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme, ThemeType } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Moon, Sun, Palette, X, Sparkles, Eye, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher() {
  const { currentTheme, darkMode, setTheme, toggleDarkMode, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Get theme colors for preview
  const getThemeColors = (theme: any, isDark: boolean = false) => {
    if (isDark) {
      return {
        background: '#0a0a0a',
        foreground: '#fafafa',
        card: '#1a1a1a',
        cardForeground: '#fafafa',
        muted: '#262626',
        mutedForeground: '#a3a3a3',
        border: '#262626',
        primary: theme.primary,
        secondary: '#262626',
        accent: '#1a1a1a',
      };
    } else {
      return {
        background: theme.background || '#ffffff',
        foreground: theme.foreground || '#0a0a0a',
        card: theme.card || '#ffffff',
        cardForeground: theme.cardForeground || '#0a0a0a',
        muted: theme.muted || '#f5f5f5',
        mutedForeground: theme.mutedForeground || '#737373',
        border: theme.border || '#e5e5e5',
        primary: theme.primary,
        secondary: theme.secondary || '#f5f5f5',
        accent: theme.accent || '#f5f5f5',
      };
    }
  };

  const handleThemeSelect = (themeKey: ThemeType) => {
    setTheme(themeKey);
    
    // Auto-close after selection with a small delay for visual feedback
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center justify-center transition-all duration-200",
          "hover:scale-105 hover:shadow-md",
          "border-border hover:border-primary/50 hover:bg-accent",
          isOpen && "bg-accent border-primary/50 shadow-md"
        )}
      >
        <Palette className={cn(
          "h-5 w-5 transition-colors duration-200",
          "text-foreground",
          isOpen && "text-primary"
        )} />
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-2xl shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  Theme Settings
                </h3>
                <p className="text-xs text-muted-foreground">
                  Choose your portfolio theme
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground h-8 w-8 p-0 hover:bg-accent rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Controls */}
            <div className="flex gap-2">
              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border flex-1">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">
                  Dark Mode
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toggleDarkMode();
                  }}
                  className={cn(
                    "ml-auto h-6 w-12 rounded-full transition-all duration-200 p-0 border-2",
                    darkMode 
                      ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-muted border-border text-muted-foreground hover:bg-accent"
                  )}
                >
                  {darkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                </Button>
              </div>

              {/* Preview Mode Toggle */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border flex-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-foreground">
                  Preview
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(previewMode === 'light' ? 'dark' : 'light')}
                  className={cn(
                    "ml-auto h-6 w-12 rounded-full transition-all duration-200 p-0 border-2",
                    previewMode === 'dark'
                      ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-900" 
                      : "bg-yellow-400 border-yellow-500 text-slate-900 hover:bg-yellow-500"
                  )}
                >
                  {previewMode === 'dark' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                </Button>
              </div>
            </div>

            {/* Current Theme Info */}
            <div className="p-3 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm truncate">
                    Current: {themes[currentTheme].name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {themes[currentTheme].description}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border border-primary/20 text-xs font-medium"
                >
                  Active
                </Badge>
              </div>
            </div>

            {/* Theme Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Available Themes</h4>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(themes) as ThemeType[]).map((themeKey) => {
                  const theme = themes[themeKey];
                  const isActive = currentTheme === themeKey;
                  const colors = getThemeColors(theme, previewMode === 'dark');

                  return (
                    <div 
                      key={themeKey}
                      className={cn(
                        "cursor-pointer overflow-hidden transition-all duration-300 group rounded-xl border-2",
                        "hover:shadow-lg hover:scale-[1.02]",
                        isActive 
                          ? "ring-2 ring-primary/50 shadow-md border-primary/30 bg-primary/5" 
                          : "hover:ring-2 hover:ring-primary/30 border-border bg-card hover:bg-accent/50"
                      )}
                      onClick={() => handleThemeSelect(themeKey)}
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-foreground truncate">
                              {theme.name}
                            </h5>
                            <p className="text-xs text-muted-foreground truncate">
                              {theme.description}
                            </p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center ml-2 shadow-lg">
                              <Check className="h-3 w-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        
                        {/* Theme Preview */}
                        <div 
                          className="h-16 p-2 relative overflow-hidden rounded-lg border border-border/50"
                          style={{ 
                            background: colors.background,
                            color: colors.foreground,
                          }}
                        >
                          {/* Header Bar */}
                          <div 
                            className="h-3 w-full mb-1 rounded flex items-center px-1"
                            style={{ 
                              background: colors.card,
                              border: `1px solid ${colors.border}`
                            }}
                          >
                            <div 
                              className="h-1 w-6 rounded"
                              style={{ background: theme.primary }}
                            />
                            <div className="ml-auto flex gap-0.5">
                              <div className="w-1 h-1 rounded-full" style={{ background: colors.muted }} />
                              <div className="w-1 h-1 rounded-full" style={{ background: colors.muted }} />
                              <div className="w-1 h-1 rounded-full" style={{ background: colors.muted }} />
                            </div>
                          </div>

                          {/* Content Area */}
                          <div className="flex gap-1">
                            {/* Sidebar */}
                            <div 
                              className="w-6 h-8 rounded flex flex-col gap-0.5 p-1" 
                              style={{ 
                                background: colors.card,
                                border: `1px solid ${colors.border}`
                              }}
                            >
                              <div className="h-1 w-full rounded" style={{ background: theme.primary }} />
                              <div className="h-0.5 w-3/4 rounded" style={{ background: colors.muted }} />
                              <div className="h-0.5 w-1/2 rounded" style={{ background: colors.muted }} />
                            </div>

                            {/* Main Content */}
                            <div className="flex-1">
                              <div className="h-1 w-8 rounded mb-1" style={{ background: colors.foreground }} />
                              <div className="h-0.5 w-full rounded mb-0.5" style={{ background: colors.muted }} />
                              <div className="h-0.5 w-3/4 rounded mb-1" style={{ background: colors.muted }} />
                              
                              {/* Cards */}
                              <div className="flex gap-0.5">
                                <div 
                                  className="w-3 h-3 rounded"
                                  style={{ 
                                    background: colors.card,
                                    border: `1px solid ${colors.border}`
                                  }}
                                />
                                <div 
                                  className="w-3 h-3 rounded"
                                  style={{ 
                                    background: colors.accent,
                                    border: `1px solid ${colors.border}`
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Preview Mode Badge */}
                          <div className="absolute top-1 right-1">
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-xs px-1 py-0.5 border",
                                previewMode === 'dark' 
                                  ? "bg-slate-800 text-white border-slate-600" 
                                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
                              )}
                            >
                              {previewMode === 'dark' ? 'Dark' : 'Light'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center gap-3 p-4 border-t border-border bg-muted/30 rounded-b-2xl">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(false)}
              className="border-border hover:border-primary/50 hover:bg-accent"
            >
              Close
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { ThemeType, useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Palette, Eye, Calendar, Image, ExternalLink, Sparkles } from 'lucide-react';

interface PreviewProject {
  title: string;
  description: string;
  image: string;
}

const previewProject: PreviewProject = {
  title: "Project Title",
  description: "A brief description of the project showcasing its key features and outcomes.",
  image: "https://placehold.co/600x400/png",
};

export default function PortfolioThemeSelector() {
  const { currentTheme, darkMode, setTheme, toggleDarkMode, themes } = useTheme();
  const [showDarkPreview, setShowDarkPreview] = useState(false);
  
  // Toggle between light/dark preview without actually changing the site theme
  const handlePreviewModeChange = () => {
    setShowDarkPreview(!showDarkPreview);
  };

  // Get theme colors based on preview mode
  const getThemeColors = (theme: any) => {
    if (showDarkPreview) {
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Theme Engine
              </h1>
              <p className="text-gray-600">
                Customize the look and feel of your portfolio with prebuilt themes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="themes" className="w-full space-y-8">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white shadow-sm border border-gray-200">
            <TabsTrigger value="themes" className="h-10 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Palette className="h-4 w-4 mr-2" />
              Themes
            </TabsTrigger>
            <TabsTrigger value="preview" className="h-10 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="themes" className="space-y-8">
            {/* Theme Selection Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select Theme</h2>
                <p className="text-gray-600">Choose from our collection of professionally designed themes</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-3">
                  <Switch 
                    id="preview-mode" 
                    checked={showDarkPreview}
                    onCheckedChange={handlePreviewModeChange}
                  />
                  <Label htmlFor="preview-mode" className="text-sm font-medium">Dark Preview</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                  <Label htmlFor="dark-mode" className="text-sm font-medium">Dark Mode</Label>
                </div>
              </div>
            </div>
            
            {/* Current Theme Info */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Current Theme: {themes[currentTheme].name}
                    </h3>
                    <p className="text-gray-600">{themes[currentTheme].description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-auto bg-purple-100 text-purple-700">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Object.keys(themes) as ThemeType[]).map((themeKey) => {
                const theme = themes[themeKey];
                const isActive = currentTheme === themeKey;
                const colors = getThemeColors(theme);
                
                return (
                  <Card 
                    key={themeKey}
                    className={cn(
                      "cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl group",
                      isActive 
                        ? "ring-2 ring-purple-500 shadow-lg scale-105" 
                        : "hover:ring-2 hover:ring-purple-300 hover:scale-102"
                    )}
                    onClick={() => setTheme(themeKey)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">{theme.name}</CardTitle>
                        {isActive && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-sm text-gray-600">
                        {theme.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      {/* Enhanced Theme Preview */}
                      <div 
                        className="h-40 p-4 relative overflow-hidden"
                        style={{ 
                          background: colors.background,
                          color: colors.foreground,
                        }}
                      >
                        {/* Header Bar */}
                        <div 
                          className="h-6 w-full mb-3 rounded flex items-center px-2"
                          style={{ 
                            background: colors.card,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          <div 
                            className="h-2 w-16 rounded"
                            style={{ background: theme.primary }}
                          />
                          <div className="ml-auto flex gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: colors.muted }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: colors.muted }} />
                            <div className="w-2 h-2 rounded-full" style={{ background: colors.muted }} />
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex gap-3">
                          {/* Sidebar */}
                          <div 
                            className="w-16 h-20 rounded flex flex-col gap-1 p-2" 
                            style={{ 
                              background: colors.card,
                              border: `1px solid ${colors.border}`
                            }}
                          >
                            <div className="h-2 w-full rounded" style={{ background: theme.primary }} />
                            <div className="h-1 w-3/4 rounded" style={{ background: colors.muted }} />
                            <div className="h-1 w-1/2 rounded" style={{ background: colors.muted }} />
                            <div className="h-1 w-2/3 rounded" style={{ background: colors.muted }} />
                          </div>

                          {/* Main Content */}
                          <div className="flex-1">
                            <div className="h-3 w-20 rounded mb-2" style={{ background: colors.foreground }} />
                            <div className="h-2 w-full rounded mb-1" style={{ background: colors.muted }} />
                            <div className="h-2 w-3/4 rounded mb-3" style={{ background: colors.muted }} />
                            
                            {/* Cards */}
                            <div className="flex gap-2">
                              <div 
                                className="w-8 h-8 rounded"
                                style={{ 
                                  background: colors.card,
                                  border: `1px solid ${colors.border}`
                                }}
                              />
                              <div 
                                className="w-8 h-8 rounded"
                                style={{ 
                                  background: colors.accent,
                                  border: `1px solid ${colors.border}`
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-8">
            {/* Preview Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Theme Preview</h2>
                <p className="text-gray-600">See how your portfolio will look with the selected theme</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handlePreviewModeChange}
                  className="border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                >
                  {showDarkPreview ? 'Light Preview' : 'Dark Preview'}
                </Button>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {themes[currentTheme].name}
                </Badge>
              </div>
            </div>

            {/* Enhanced Preview */}
            <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-2xl">
              {/* Preview Header */}
              <div 
                className="p-6 border-b flex justify-between items-center"
                style={{ 
                  background: getThemeColors(themes[currentTheme]).card,
                  borderColor: getThemeColors(themes[currentTheme]).border,
                  color: getThemeColors(themes[currentTheme]).cardForeground,
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: themes[currentTheme].primary }}
                  >
                    <span className="text-white text-sm font-bold">P</span>
                  </div>
                  <div className="font-bold text-lg">Portfolio Name</div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-2 w-16 rounded" style={{ background: getThemeColors(themes[currentTheme]).muted }} />
                  <div className="h-2 w-12 rounded" style={{ background: getThemeColors(themes[currentTheme]).muted }} />
                  <div className="h-2 w-14 rounded" style={{ background: getThemeColors(themes[currentTheme]).muted }} />
                </div>
              </div>
              
              {/* Preview Content */}
              <div 
                className="p-8"
                style={{ 
                  background: getThemeColors(themes[currentTheme]).background,
                  color: getThemeColors(themes[currentTheme]).foreground,
                }}
              >
                <div className="max-w-6xl mx-auto">
                  {/* Hero Section */}
                  <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4" style={{ color: getThemeColors(themes[currentTheme]).foreground }}>
                      {previewProject.title}
                    </h1>
                    <p className="text-xl" style={{ color: getThemeColors(themes[currentTheme]).mutedForeground }}>
                      {previewProject.description}
                    </p>
                  </div>
                  
                  {/* Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Project Gallery Card */}
                    <div 
                      className="rounded-xl overflow-hidden shadow-lg"
                      style={{ 
                        background: getThemeColors(themes[currentTheme]).card,
                        border: `1px solid ${getThemeColors(themes[currentTheme]).border}`,
                      }}
                    >
                      <div 
                        className="aspect-video flex items-center justify-center"
                        style={{ background: getThemeColors(themes[currentTheme]).muted }}
                      >
                        <Image className="h-12 w-12" style={{ color: getThemeColors(themes[currentTheme]).mutedForeground }} />
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2" style={{ color: getThemeColors(themes[currentTheme]).cardForeground }}>
                          Project Gallery
                        </h3>
                        <p className="text-sm" style={{ color: getThemeColors(themes[currentTheme]).mutedForeground }}>
                          Showcase your project with multiple media items
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Card */}
                    <div 
                      className="rounded-xl overflow-hidden shadow-lg"
                      style={{ 
                        background: getThemeColors(themes[currentTheme]).card,
                        border: `1px solid ${getThemeColors(themes[currentTheme]).border}`,
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="h-5 w-5" style={{ color: themes[currentTheme].primary }} />
                          <h3 className="font-semibold text-lg" style={{ color: getThemeColors(themes[currentTheme]).cardForeground }}>
                            Project Timeline
                          </h3>
                        </div>
                        <div className="space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div 
                                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                                style={{ background: themes[currentTheme].primary }}
                              />
                              <div>
                                <div className="text-xs font-medium" style={{ color: getThemeColors(themes[currentTheme]).mutedForeground }}>
                                  Month {i}, 2023
                                </div>
                                <div className="text-sm font-medium" style={{ color: getThemeColors(themes[currentTheme]).cardForeground }}>
                                  Development Phase {i}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="text-center">
                    <Button
                      className="px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: themes[currentTheme].primary,
                        color: showDarkPreview ? '#ffffff' : '#ffffff',
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Full Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Actions */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={handlePreviewModeChange}
                className="border-gray-300 hover:border-purple-300 hover:bg-purple-50"
              >
                Toggle {showDarkPreview ? 'Light' : 'Dark'} Mode
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Apply theme logic here
                  console.log('Applying theme:', currentTheme);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Theme
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
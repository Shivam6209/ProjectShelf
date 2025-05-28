'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Loader2, 
  Edit, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Globe, 
  Mail, 
  User, 
  Folder, 
  Eye, 
  Star,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  Heart,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProjectCard from '@/components/ProjectCard';
import { useAuth } from '@/context/AuthContext';
import config from '@/lib/config';

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  mediaItems: any[];
}

interface User {
  id: string;
  username: string;
  name: string;
  bio: string | null;
  avatarUrl?: string;
}

interface Portfolio {
  user: User;
  projects: Project[];
}

export default function UserPortfolio() {
  const params = useParams();
  const { user } = useAuth();
  const username = params.username as string;
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isOwner = user?.username === username;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_BASE_URL}/portfolios/${username}`, {
          headers: {
            'Content-Type': 'application/json',
            // Include auth token if available for analytics tracking
            ...(localStorage.getItem('token') && {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        
        const data = await response.json();
        // The response contains user and projects directly
        setPortfolio({
          user: data.user,
          projects: data.projects || []
        });
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Could not load this portfolio. The user may not exist.');
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      fetchPortfolio();
    }
  }, [username]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }
  
  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 text-center max-w-md">
            {error || 'This user does not exist or has no public portfolio.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 ring-4 ring-white shadow-2xl">
                  {portfolio.user.avatarUrl ? (
                    <AvatarImage 
                      src={portfolio.user.avatarUrl} 
                      alt={portfolio.user.name || portfolio.user.username}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold">
                      {(portfolio.user.name || portfolio.user.username).substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                      {portfolio.user.name || portfolio.user.username}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <User className="h-4 w-4" />
                      <span className="text-lg">@{portfolio.user.username}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        <Globe className="h-3 w-3 mr-1" />
                        Public Portfolio
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {portfolio.user.bio && (
                  <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mb-6">
                    {portfolio.user.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Folder className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{portfolio.projects.length}</span>
                    <span>{portfolio.projects.length === 1 ? 'Project' : 'Projects'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Member since {new Date().getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="h-5 w-5 text-green-600" />
                    <span>Public Portfolio</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {isOwner ? (
                    <>
                      <Button 
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Portfolio
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = '/dashboard/projects/new/edit'}
                        className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline"
                        className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Projects Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Folder className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Projects
                  </h2>
                  <p className="text-gray-600">
                    {portfolio.projects.length === 0 
                      ? 'No projects yet' 
                      : `${portfolio.projects.length} ${portfolio.projects.length === 1 ? 'project' : 'projects'} showcased`
                    }
                  </p>
                </div>
              </div>
              
              {portfolio.projects.length > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {portfolio.projects.length} Total
                </Badge>
              )}
            </div>

            {/* Projects Grid */}
            {portfolio.projects.length === 0 ? (
              <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Folder className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {isOwner ? 'Start Your Portfolio Journey! 🚀' : 'No Projects Yet'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    {isOwner 
                      ? 'Your portfolio is ready to showcase amazing work. Create your first project and let your creativity shine!'
                      : `${portfolio.user.name || portfolio.user.username} hasn't shared any projects yet. Check back soon for updates!`
                    }
                  </p>
                  
                  {isOwner && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => window.location.href = '/dashboard/projects/new/edit'}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Create First Project
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => window.location.href = '/dashboard'}
                        className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.projects.map((project) => (
                  <div key={project.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                    <ProjectCard 
                      project={project}
                      username={username}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Footer */}
          {portfolio.projects.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thanks for visiting {portfolio.user.name || portfolio.user.username}'s portfolio!
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {isOwner 
                    ? 'Your portfolio is looking great! Keep adding projects to showcase your amazing work.'
                    : 'Impressed by this work? Connect with the creator or explore more portfolios.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {!isOwner && (
                    <>
                      <Button 
                        variant="outline"
                        className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Follow Creator
                      </Button>
                      <Button 
                        onClick={() => window.location.href = '/explore'}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Explore More Portfolios
                      </Button>
                    </>
                  )}
                  {isOwner && (
                    <Button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Manage Portfolio
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 
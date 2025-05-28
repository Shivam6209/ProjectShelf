'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Loader2, 
  ChevronLeft, 
  Calendar, 
  Wrench, 
  ImageOff, 
  Clock,
  Target,
  Quote,
  ArrowLeft,
  Edit,
  ExternalLink,
  Star,
  Award,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MediaGallery from '@/components/MediaGallery';
import config from '@/lib/config';

interface Media {
  id: string;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  caption?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  technologies?: string[];
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
  outcomes?: {
    metric?: string;
    testimonial?: string;
  }[];
  mediaItems: Media[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const username = params.username as string;
  const projectId = params.projectId as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isOwner = user?.username === username;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        console.log(`Fetching project: ${username}/${projectId}`);
        
        const response = await fetch(`${config.API_BASE_URL}/portfolios/${username}/projects/${projectId}`, {
          headers: {
            'Content-Type': 'application/json',
            // Include auth token if available for analytics tracking
            ...(localStorage.getItem('token') && {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error('Failed to fetch project');
        }
        
        const data = await response.json();
        console.log('Project data fetched:', data.project?.id);
        setProject(data.project);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Could not load this project. It may not exist or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };
    
    if (username && projectId) {
      fetchProject();
    }
  }, [username, projectId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600 text-lg">Loading project...</p>
        </div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ImageOff className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 text-center max-w-md mb-6">
            {error || 'This project does not exist or you do not have permission to view it.'}
          </p>
          <Button 
            onClick={() => router.push(`/${username}`)}
            variant="outline"
            className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost"
              onClick={() => router.push(`/${username}`)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {username}'s portfolio
            </Button>
            
            {isOwner && (
              <Button 
                onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Project Hero Section */}
        <div className="mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  Portfolio Project
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
                {project.description}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Media Gallery */}
        {project.mediaItems && project.mediaItems.length > 0 && (
          <section className="mb-12">
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <ImageOff className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Project Gallery</CardTitle>
                    <CardDescription className="text-gray-600">Visual showcase of the project</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <MediaGallery mediaItems={project.mediaItems} />
              </CardContent>
            </Card>
          </section>
        )}

        {/* Main Content */}
        {project.content && (
          <section className="mb-12">
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Edit className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Project Overview</CardTitle>
                    <CardDescription className="text-gray-600">Detailed description and insights</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {project.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Technologies & Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Technologies Used</CardTitle>
                    <CardDescription className="text-gray-600">Tools and frameworks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-all duration-200"
                    >
                      <Wrench className="w-3 h-3 mr-2" />
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {project.timeline && project.timeline.length > 0 && (
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Development Timeline</CardTitle>
                    <CardDescription className="text-gray-600">Project milestones and progress</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {project.timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          {index < project.timeline!.length - 1 && (
                            <div className="w-0.5 h-12 bg-orange-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                              {item.date}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="mb-12">
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Project Outcomes</CardTitle>
                    <CardDescription className="text-gray-600">Results, metrics, and testimonials</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.outcomes.map((outcome, index) => (
                    <Card key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        {outcome.metric && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <TrendingUp className="w-5 h-5 text-yellow-600" />
                              <h3 className="font-bold text-gray-900">Key Metric</h3>
                            </div>
                            <p className="text-lg font-semibold text-gray-800 bg-white/80 rounded-lg p-3 border border-yellow-300">
                              {outcome.metric}
                            </p>
                          </div>
                        )}
                        {outcome.testimonial && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Quote className="w-5 h-5 text-yellow-600" />
                              <h3 className="font-bold text-gray-900">Testimonial</h3>
                            </div>
                            <blockquote className="bg-white/80 rounded-lg p-4 border-l-4 border-yellow-400 italic text-gray-700 leading-relaxed">
                              "{outcome.testimonial}"
                            </blockquote>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Project Footer */}
        <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanks for viewing this project!</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Interested in working together or learning more about this project? Feel free to explore more of {username}'s work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => router.push(`/${username}`)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View More Projects
              </Button>
              {isOwner && (
                <Button 
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
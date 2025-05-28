'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Save, Eye, Trash2, Upload, Plus, Check, ExternalLink, Edit, Clock, Wrench, TrendingUp } from 'lucide-react';
import ProjectFormTabs from '@/components/dashboard/ProjectFormTabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import config from '@/lib/config';
import MediaGalleryEditor from '@/components/dashboard/MediaGalleryEditor';
import TimelineEditor from '@/components/dashboard/TimelineEditor';
import TechnologiesEditor from '@/components/dashboard/TechnologiesEditor';
import OutcomesEditor from '@/components/dashboard/OutcomesEditor';
import MediaRenderer from '@/components/MediaRenderer';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface OutcomeItem {
  metric?: string;
  testimonial?: string;
}

interface Project {
  id?: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  slug?: string;
  timeline: TimelineItem[];
  technologies: string[];
  outcomes: OutcomeItem[];
  isPublished?: boolean;
  mediaItems: any[];
}

export default function ProjectEditorPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    content: '',
    timeline: [],
    technologies: [],
    outcomes: [],
    mediaItems: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);
  const [redirectAfterSave, setRedirectAfterSave] = useState(false);
  
  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.API_BASE_URL}/api/builder/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }
      
      const data = await response.json();
      setProject(data.project);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Could not load project. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);
  
  useEffect(() => {
    if (user) {
      fetchProject();
    }
  }, [user, fetchProject]);
  
  const saveProject = async (showToast = true, shouldRedirect = false) => {
    try {
      // Validate project data before saving
      if (!project.title || project.title.trim() === '') {
        toast.error('Project title is required');
        return;
      }

      if (!project.description || project.description.trim() === '') {
        toast.error('Short description is required');
        return;
      }

      if (!project.technologies || project.technologies.length === 0) {
        toast.error('At least one technology must be specified');
        setActiveTab('technologies');
        return;
      }

      if (!project.content || project.content.trim() === '') {
        toast.error('Project content is required');
        setActiveTab('content');
        return;
      }
      
      setSaving(true);
      
      const response = await fetch(`${config.API_BASE_URL}/api/builder/${projectId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving project:', errorData);
        
        // Handle authentication/user errors
        if (response.status === 401 || response.status === 403 || response.status === 404) {
          if (errorData.message.includes('User not found')) {
            // Force user to login again
            localStorage.removeItem('token');
            toast.error('Your session has expired. Please log in again.');
            setTimeout(() => {
              router.push('/login');
            }, 1500);
            return;
          }
        }
        
        throw new Error(errorData.message || 'Failed to save project');
      }
      
      const data = await response.json();
      console.log('Project saved successfully:', data);
      
      // Show success message
      toast.success('Project saved successfully! Redirecting to dashboard...');
      
      // Always redirect to the dashboard after successful save
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1500);
    } catch (err) {
      console.error('Error saving project:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };
  
  const publishProject = async () => {
    try {
      if (!project.id) {
        await saveProject();
        return; // saveProject will handle the redirect
      }
      
      const response = await fetch(`${config.API_BASE_URL}/api/builder/${project.id}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to publish project');
      }
      
      toast.success('Project published successfully! Redirecting to dashboard...');
      
      // Redirect to the dashboard after publishing
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1500);
    } catch (err) {
      console.error('Error publishing project:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to publish project');
    }
  };
  
  const unpublishProject = async () => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/api/builder/${project.id}/unpublish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to unpublish project');
      }
      
      toast.success('Project unpublished successfully! Redirecting to dashboard...');
      
      // Redirect to the dashboard after unpublishing
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1500);
    } catch (err) {
      console.error('Error unpublishing project:', err);
      toast.error('Failed to unpublish project');
    }
  };
  
  const handleInputChange = (field: keyof Project, value: any) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4 text-muted-foreground">Loading project...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-destructive">Error</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {projectId === 'new' ? 'Create New Project' : 'Edit Project'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {projectId === 'new' ? 'Bring your ideas to life with a stunning portfolio project' : 'Update your project details and content'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                onClick={() => router.push('/dashboard/projects')}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                Cancel
              </Button>
              
              <Button 
                onClick={() => saveProject(true)}
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Project
                  </>
                )}
              </Button>
              
              {project.id && (
                project.isPublished ? (
                  <Button 
                    variant="outline"
                    onClick={unpublishProject}
                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Unpublish
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={publishProject}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                )
              )}
              
              {project.id && user?.username && (
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/${user.username}/projects/${project.id}`)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Editor Column */}
          <div className="space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Edit className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    id="title"
                    value={project.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
                    placeholder="Enter an engaging project title..."
                    className="w-full h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Textarea
                    id="description"
                    value={project.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                    placeholder="Write a compelling description that captures the essence of your project..."
                    className="w-full h-24 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This will be the first thing visitors see. Make it count!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Project Content Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <ProjectFormTabs
                project={project}
                handleInputChange={handleInputChange}
                projectId={projectId}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-md transition-shadow duration-300 sticky top-24 max-h-[calc(100vh-8rem)]">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Preview</h3>
                  <p className="text-xs text-gray-600">See how your project will look to visitors</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              {/* Project Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {project.title || (
                    <span className="text-gray-400 italic">Your Project Title</span>
                  )}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description || (
                    <span className="text-gray-400 italic">Your project description will appear here...</span>
                  )}
                </p>
              </div>
              
              {/* Cover Image */}
              {project.coverImage && (
                <div className="w-full h-64 bg-gray-100 mb-8 rounded-xl overflow-hidden shadow-sm">
                  <MediaRenderer 
                    media={{
                      url: project.coverImage,
                      type: 'IMAGE',
                      caption: project.title
                    }} 
                    aspectRatio="auto"
                    className="w-full h-full object-cover"
                    showCaption={false}
                  />
                </div>
              )}
              
              {/* Project Content */}
              <div className="prose prose-gray max-w-none mb-8">
                {project.content ? (
                  <div className="text-gray-700 leading-relaxed">{project.content}</div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 italic text-center">
                      Add project content in the Overview tab to see it here
                    </p>
                  </div>
                )}
              </div>

              {/* Media Gallery Preview */}
              {project.mediaItems && project.mediaItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    </div>
                    Media Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.mediaItems.slice(0, 4).map((item, index) => (
                      <div key={item.id || index} className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        {item.type === 'VIDEO' ? (
                          <MediaRenderer 
                            media={{
                              url: item.url,
                              type: 'VIDEO',
                              caption: item.caption
                            }} 
                            aspectRatio="video"
                            isPreview={true}
                          />
                        ) : (
                          <MediaRenderer 
                            media={{
                              url: item.url,
                              type: 'IMAGE',
                              caption: item.caption
                            }} 
                            aspectRatio="square"
                            showCaption={false}
                          />
                        )}
                        {item.caption && (
                          <p className="p-3 text-sm text-gray-600 bg-white">{item.caption}</p>
                        )}
                      </div>
                    ))}
                    {project.mediaItems.length > 4 && (
                      <div className="bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                        +{project.mediaItems.length - 4} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timeline Preview */}
              {project.timeline && project.timeline.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-3 h-3 text-blue-500" />
                    </div>
                    Project Timeline
                  </h2>
                  <div className="space-y-4">
                    {project.timeline.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-blue-600 mb-1">{item.date}</div>
                          <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                          {item.description && (
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {project.timeline.length > 3 && (
                      <div className="text-center text-gray-500 text-sm">
                        +{project.timeline.length - 3} more timeline items
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Technologies Preview */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                      <Wrench className="w-3 h-3 text-green-500" />
                    </div>
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 8).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 8 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">
                        +{project.technologies.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Outcomes Preview */}
              {project.outcomes && project.outcomes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-yellow-600" />
                    </div>
                    Project Outcomes
                  </h2>
                  <div className="space-y-4">
                    {project.outcomes.slice(0, 2).map((outcome, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        {outcome.metric && (
                          <div className="font-semibold text-gray-900 mb-2">{outcome.metric}</div>
                        )}
                        {outcome.testimonial && (
                          <blockquote className="italic text-gray-700 border-l-4 border-yellow-400 pl-4">
                            "{outcome.testimonial}"
                          </blockquote>
                        )}
                      </div>
                    ))}
                    {project.outcomes.length > 2 && (
                      <div className="text-center text-gray-500 text-sm">
                        +{project.outcomes.length - 2} more outcomes
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!project.content && !project.mediaItems?.length && !project.timeline?.length && 
               !project.technologies?.length && !project.outcomes?.length && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Project</h3>
                  <p className="text-gray-600 mb-4">
                    Add content, media, timeline, and more using the tabs on the left
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Overview</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Media</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Timeline</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Technologies</span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Outcomes</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Image, Clock, Wrench, Target } from 'lucide-react';
import MediaGalleryEditor from './MediaGalleryEditor';
import TimelineEditor from './TimelineEditor';
import TechnologiesEditor from './TechnologiesEditor';
import OutcomesEditor from './OutcomesEditor';

interface Project {
  id?: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  slug?: string;
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
  technologies: string[];
  outcomes: {
    metric?: string;
    testimonial?: string;
  }[];
  mediaItems: any[];
}

interface ProjectFormTabsProps {
  project: Project;
  handleInputChange: (field: keyof Project, value: any) => void;
  projectId: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function ProjectFormTabs({
  project,
  handleInputChange,
  projectId,
  activeTab = 'overview',
  onTabChange
}: ProjectFormTabsProps) {
  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={onTabChange}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-5 w-full h-14 bg-gray-50 p-1 rounded-xl">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="media" 
            className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
          >
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Media</span>
          </TabsTrigger>
          <TabsTrigger 
            value="timeline" 
            className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger 
            value="technologies" 
            className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
          >
            <Wrench className="h-4 w-4" />
            <span className="hidden sm:inline">Tech</span>
          </TabsTrigger>
          <TabsTrigger 
            value="outcomes" 
            className="flex items-center gap-2 h-12 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
          >
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Results</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <TabsContent value="overview" className="p-6 space-y-6 m-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Project Overview</h3>
                <p className="text-sm text-gray-600">Tell the story of your project in detail</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-3">
                Project Content
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                id="content"
                value={project.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('content', e.target.value)}
                placeholder="Share the story behind your project. What problem did you solve? What was your process? What challenges did you overcome? Be detailed and engaging..."
                className="min-h-[320px] border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl resize-none transition-all duration-200"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-500">
                  This detailed description will be the main content of your project page.
                </p>
                <span className="text-xs text-gray-400">
                  {project.content?.length || 0} characters
                </span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="p-6 m-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Image className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Media Gallery</h3>
                <p className="text-sm text-gray-600">Upload images and videos to showcase your work</p>
              </div>
            </div>
            
            <MediaGalleryEditor 
              projectId={project.id || projectId} 
              mediaItems={project.mediaItems || []}
              onChange={(mediaItems) => handleInputChange('mediaItems', mediaItems)}
              onCoverImageChange={(url) => handleInputChange('coverImage', url)}
              coverImage={project.coverImage}
            />
          </TabsContent>
          
          <TabsContent value="timeline" className="p-6 m-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
                <p className="text-sm text-gray-600">Document key milestones and phases of your project</p>
              </div>
            </div>
            
            <TimelineEditor 
              timeline={project.timeline} 
              onChange={(timeline) => handleInputChange('timeline', timeline)}
            />
          </TabsContent>
          
          <TabsContent value="technologies" className="p-6 m-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Wrench className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Technologies & Tools</h3>
                <p className="text-sm text-gray-600">List the technologies, tools, and frameworks you used</p>
              </div>
            </div>
            
            <TechnologiesEditor 
              technologies={project.technologies}
              onChange={(technologies) => handleInputChange('technologies', technologies)}
            />
          </TabsContent>
          
          <TabsContent value="outcomes" className="p-6 m-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Project Outcomes</h3>
                <p className="text-sm text-gray-600">Share the results, metrics, and testimonials</p>
              </div>
            </div>
            
            <OutcomesEditor 
              outcomes={project.outcomes}
              onChange={(outcomes) => handleInputChange('outcomes', outcomes)}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
} 
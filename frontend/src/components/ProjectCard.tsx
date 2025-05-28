import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MediaRenderer from '@/components/MediaRenderer';
import { Clock, Play, Image as ImageIcon, ArrowRight, Calendar, Eye } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  technologies?: string[];
  mediaItems?: Array<{
    id: string;
    url: string;
    type: 'IMAGE' | 'VIDEO';
    caption?: string;
  }>;
}

interface ProjectCardProps {
  project: Project;
  username: string;
}

export default function ProjectCard({ project, username }: ProjectCardProps) {
  // Check if valid media items exist
  const hasMediaItems = project.mediaItems && project.mediaItems.length > 0 && project.mediaItems[0]?.url;
  
  // Determine if the first media is a video
  const firstMediaIsVideo = hasMediaItems && project.mediaItems?.[0]?.type === 'VIDEO';
  
  // Create a media object for rendering
  const media = hasMediaItems && project.mediaItems
    ? {
        url: project.mediaItems[0]?.url || '',
        type: project.mediaItems[0]?.type || 'IMAGE' as const,
        caption: project.mediaItems[0]?.caption
      }
    : {
        url: project.coverImage || '/placeholder-project.jpg',
        type: 'IMAGE' as const,
        caption: project.title
      };

  // Format date
  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/${username}/projects/${project.id}`} className="block group">
      <Card className="overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group border-0 bg-white shadow-lg hover:shadow-blue-500/10">
        {/* Media Container */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
          
          {/* Media */}
          <MediaRenderer 
            media={media}
            aspectRatio="auto" 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            showCaption={false}
            isPreview={true}
          />
          
          {/* Media Type Badge */}
          {firstMediaIsVideo ? (
            <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 z-20 shadow-lg">
              <Play className="h-3 w-3 fill-current" />
              Video
            </div>
          ) : (
            <div className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ImageIcon className="h-3 w-3" />
              Image
            </div>
          )}
          
          {/* View Project Button - Appears on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
            <div className="bg-background/95 backdrop-blur-sm text-foreground px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Eye className="h-4 w-4" />
              View Project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <CardContent className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
          {/* Date Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-border text-xs px-2 py-1">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </Badge>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          
          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs px-3 py-1 bg-muted text-muted-foreground border border-border"
                >
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          {/* Bottom Action Area */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Recently updated</span>
            </div>
            
            <div className="flex items-center gap-1 text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span>View Details</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </CardContent>
        
        {/* Card Border Glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
      </Card>
    </Link>
  );
} 
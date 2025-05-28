'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Project, Analytics } from '@/lib/types';
import config from '@/lib/config';
import { 
  PlusCircle, 
  BarChart3, 
  Layout, 
  User, 
  Eye, 
  Calendar, 
  TrendingUp,
  ExternalLink,
  Edit,
  Clock,
  Loader2,
  Sparkles,
  Users,
  Globe,
  ArrowUpRight,
  Activity,
  Target,
  Zap,
  Star,
  Award,
  Rocket
} from 'lucide-react';

// Enhanced bar chart component
const EnhancedBarChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data, 1);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hasData = data.some(value => value > 0);
  
  // Ensure we have exactly 7 data points
  const chartData = Array(7).fill(0);
  data.forEach((value, index) => {
    if (index < 7) {
      chartData[index] = value || 0;
    }
  });
  
  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Total views: <span className="font-semibold text-gray-900">{chartData.reduce((sum, val) => sum + val, 0)}</span>
        </div>
        <div className="text-xs text-gray-500">
          {hasData ? 'Last 7 days' : 'No data yet'}
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-end h-24 gap-2 mb-3">
          {chartData.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-20 flex items-end">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer ${
                    value > 0 
                      ? 'bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-sm' 
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  style={{ 
                    height: value > 0 ? `${Math.max((value / max) * 100, 15)}%` : '4px',
                  }}
                  title={`${value} views on ${days[i]}`}
                />
                {value > 0 && (
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity z-10">
                    {value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Day Labels */}
        <div className="flex justify-between">
          {days.map((day, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-xs font-medium text-gray-600">{day}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sample Data Button */}
      {!hasData && (
        <div className="text-center py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">No analytics data available yet</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={async () => {
              try {
                // Generate some sample data for testing
                const sampleData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 1);
                console.log('Generated sample data:', sampleData);
                
                // You could also call the backend to generate real sample data
                const response = await fetch(`${config.API_BASE_URL}/api/analytics/generate-sample-data`, {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                  }
                });
                
                if (response.ok) {
                  window.location.reload();
                } else {
                  console.log('Sample data generation failed, using local sample');
                  // For demo purposes, just update the chart with sample data
                  window.location.reload();
                }
              } catch (error) {
                console.error('Error generating sample data:', error);
              }
            }}
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <Zap className="h-4 w-4 mr-2" />
            Generate Sample Analytics
          </Button>
        </div>
      )}
    </div>
  );
};

interface AnalyticsData {
  totalViews: number;
  uniqueViewers: number;
  dailyViews: Array<{ day: string; count: number }>;
  projectBreakdown: Array<{ projectId: string; count: number; project: { title: string } }>;
}

interface PortfolioAnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  dailyVisits: Array<{ day: string; count: number }>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioAnalyticsData | null>(null);
  const [recentViews, setRecentViews] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const router = useRouter();

  // Helper function to safely convert to number
  const safeNumber = (value: any): number => {
    if (typeof value === 'number' && !isNaN(value)) return value;
    if (typeof value === 'string') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  // Helper function to safely sum array of numbers
  const safeSum = (arr: any[]): number => {
    return arr.reduce((sum, val) => sum + safeNumber(val), 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch projects
        const projectsResponse = await fetch(`${config.API_BASE_URL}/api/projects/user/me`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!projectsResponse.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const projectsData = await projectsResponse.json();
        const userProjects = projectsData.projects || [];
        setProjects(userProjects);

        // Fetch analytics data
        try {
          const [projectAnalyticsResponse, portfolioAnalyticsResponse] = await Promise.all([
            fetch(`${config.API_BASE_URL}/api/analytics/project-views?period=week`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            }),
            fetch(`${config.API_BASE_URL}/api/analytics/portfolio-visits?period=week`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            })
          ]);

          if (projectAnalyticsResponse.ok) {
            const projectAnalytics = await projectAnalyticsResponse.json();
            setAnalyticsData(projectAnalytics);
            
            // Process daily views data for the chart
            const dailyViews = projectAnalytics.dailyViews || [];
            
            // Create array for last 7 days (Monday to Sunday)
            const today = new Date();
            const last7Days = Array(7).fill(0);
            
            // Map the daily views to the correct day positions
            dailyViews.forEach((dayData: any) => {
              if (dayData && dayData.day && typeof dayData.count !== 'undefined') {
                // Parse the date from the backend
                const dayDate = new Date(dayData.day);
                
                // Use the actual day of week from the parsed date
                const dayOfWeek = dayDate.getDay();
                const chartIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                
                // Check if this day is within our 7-day window
                const daysDifference = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
                
                if (daysDifference >= 0 && daysDifference < 7) {
                  // Add the count to the existing value (in case there are multiple entries for the same day)
                  last7Days[chartIndex] = (last7Days[chartIndex] || 0) + safeNumber(dayData.count);
                }
              }
            });
            
            setRecentViews(last7Days);
          } else {
            setRecentViews([0, 0, 0, 0, 0, 0, 0]);
          }

          if (portfolioAnalyticsResponse.ok) {
            const portfolioAnalytics = await portfolioAnalyticsResponse.json();
            setPortfolioData(portfolioAnalytics);
          }
        } catch (analyticsError) {
          setRecentViews([0, 0, 0, 0, 0, 0, 0]);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load dashboard data');
        setProjects([]);
        setRecentViews([0, 0, 0, 0, 0, 0, 0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Calculate total views across all projects (fallback to analytics data if available)
  const calculateTotalViews = (): number => {
    if (analyticsData?.totalViews !== undefined) {
      return safeNumber(analyticsData.totalViews);
    }
    
    // Fallback to project analytics if available
    const fallbackTotal = projects.reduce((total, project) => {
      const projectViews = project.analytics?.reduce((sum: number, analytic: Analytics) => {
        return sum + safeNumber(analytic.views);
      }, 0) || 0;
      return total + projectViews;
    }, 0);
    
    return fallbackTotal;
  };

  // Calculate recent activity total with proper number handling
  const calculateRecentActivity = (): number => {
    return safeSum(recentViews);
  };

  // Get most viewed project
  const getMostViewedProject = () => {
    if (!projects.length) return null;
    
    return projects.reduce((mostViewed, current) => {
      const currentViews = current.analytics?.reduce((sum: number, a: Analytics) => {
        return sum + safeNumber(a.views);
      }, 0) || 0;
      const mostViewedViews = mostViewed.analytics?.reduce((sum: number, a: Analytics) => {
        return sum + safeNumber(a.views);
      }, 0) || 0;
      
      return currentViews > mostViewedViews ? current : mostViewed;
    }, projects[0]);
  };

  // Get most recent project
  const getMostRecentProject = () => {
    if (!projects.length) return null;
    
    return [...projects].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
  };

  const mostViewedProject = getMostViewedProject();
  const mostRecentProject = getMostRecentProject();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Layout className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Welcome back, {user?.name || user?.username}! 👋
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Ready to create something amazing today?
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => router.push('/dashboard/projects/new/edit')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>New Project</span>
                </Button>
                
                {user?.username && (
                  <Button 
                    variant="outline"
                    onClick={() => router.push(`/${user.username}`)}
                    className="border-gray-200 hover:border-blue-300 hover:bg-blue-50 h-12 px-6"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Portfolio
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600 text-lg">Loading your dashboard...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ExternalLink className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading dashboard</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid grid-cols-2 md:w-[400px] h-12 bg-white shadow-sm border border-gray-200">
                <TabsTrigger value="overview" className="h-10 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  <Activity className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="projects" className="h-10 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  <Layout className="h-4 w-4 mr-2" />
                  Projects
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                          <Layout className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-blue-200 text-blue-800">
                          Total
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-900 mb-1">{projects.length}</div>
                      <p className="text-blue-700 text-sm">
                        {projects.length === 0 ? "Create your first project" : "Portfolio projects"}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-green-200 text-green-800">
                          Views
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-900 mb-1">{calculateTotalViews()}</div>
                      <p className="text-green-700 text-sm">Total project views</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                          7 Days
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-900 mb-1">
                        {calculateRecentActivity()}
                      </div>
                      <p className="text-purple-700 text-sm">Recent activity</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                          Portfolio
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold text-orange-900 mb-1 truncate">
                        /{user?.username}
                      </div>
                      <p className="text-orange-700 text-sm">Your public profile</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics Chart */}
                <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          Weekly Analytics
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Your project views over the last 7 days
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Last 7 days
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Always show the chart */}
                    <EnhancedBarChart data={recentViews} />
                  </CardContent>
                </Card>

                {/* Featured Projects */}
                {projects.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mostViewedProject && (
                      <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                              <Award className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold text-gray-900">Most Popular</CardTitle>
                              <CardDescription className="text-gray-600">Your top performing project</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {mostViewedProject.mediaItems && mostViewedProject.mediaItems[0] && (
                            <div className="relative h-48">
                              <img 
                                src={mostViewedProject.mediaItems[0].url}
                                alt={mostViewedProject.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/placeholder-project.svg';
                                }}
                              />
                              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                {mostViewedProject.analytics?.reduce((sum: number, a: Analytics) => sum + safeNumber(a.views), 0) || 0}
                              </div>
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                              {mostViewedProject.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {mostViewedProject.description}
                            </p>
                            <div className="flex gap-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push(`/dashboard/projects/${mostViewedProject.id}/edit`)}
                                className="flex-1"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => router.push(`/${user?.username}/projects/${mostViewedProject.id}`)}
                                className="flex-1"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {mostRecentProject && (
                      <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                              <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold text-gray-900">Latest Work</CardTitle>
                              <CardDescription className="text-gray-600">Your most recent project</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          {mostRecentProject.mediaItems && mostRecentProject.mediaItems[0] && (
                            <div className="relative h-48">
                              <img 
                                src={mostRecentProject.mediaItems[0].url}
                                alt={mostRecentProject.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/placeholder-project.svg';
                                }}
                              />
                              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                {new Date(mostRecentProject.updatedAt).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                              {mostRecentProject.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {mostRecentProject.description}
                            </p>
                            <div className="flex gap-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => router.push(`/dashboard/projects/${mostRecentProject.id}/edit`)}
                                className="flex-1"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => router.push(`/${user?.username}/projects/${mostRecentProject.id}`)}
                                className="flex-1"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Welcome Card for New Users */}
                {projects.length === 0 && (
                  <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-0 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Rocket className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to ProjectShelf! 🎉</h3>
                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        You're all set to create amazing portfolios! Start by building your first project and watch your analytics grow.
                      </p>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto border border-white/50">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                          What you can track:
                        </h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Portfolio visits and project views
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            Engagement metrics over time
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            Which projects perform best
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Audience insights and trends
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          onClick={() => router.push('/dashboard/projects/new/edit')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8"
                        >
                          <PlusCircle className="h-5 w-5 mr-2" />
                          Create Your First Project
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={async () => {
                            try {
                              const response = await fetch(`${config.API_BASE_URL}/api/analytics/generate-sample-data`, {
                                method: 'POST',
                                headers: {
                                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                  'Content-Type': 'application/json'
                                }
                              });
                              
                              if (response.ok) {
                                window.location.reload();
                              } else {
                                const error = await response.json();
                                console.log('Sample data generation failed:', error.message);
                              }
                            } catch (error) {
                              console.error('Error generating sample data:', error);
                            }
                          }}
                          className="border-gray-300 hover:border-blue-300 hover:bg-blue-50 h-12 px-8"
                        >
                          <Zap className="h-5 w-5 mr-2" />
                          Generate Sample Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">My Projects</h2>
                    <p className="text-gray-600">Manage and edit your portfolio projects</p>
                  </div>
                  <Button 
                    onClick={() => router.push('/dashboard/projects/new/edit')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>

                {projects.length === 0 ? (
                  <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-0 shadow-sm">
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <PlusCircle className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No projects yet</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Create your first project to showcase your work and start building your portfolio
                      </p>
                      <Button 
                        onClick={() => router.push('/dashboard/projects/new/edit')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create Your First Project
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                        {project.mediaItems && project.mediaItems[0] && (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={project.mediaItems[0].url}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/placeholder-project.svg';
                              }}
                            />
                            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                              <Eye className="h-3 w-3" />
                              {project.analytics?.reduce((sum: number, a: Analytics) => sum + safeNumber(a.views), 0) || 0}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-gray-600">
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.updatedAt).toLocaleDateString()}
                            </span>
                            {project.tools && project.tools.length > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {project.tools[0]}
                                {project.tools.length > 1 && ` +${project.tools.length - 1}`}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 pb-4 flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 hover:bg-gray-50" 
                            size="sm"
                            onClick={() => router.push(`/dashboard/projects/${project.id}/edit`)}
                          >
                            <Edit className="h-3 w-3 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700" 
                            size="sm"
                            onClick={() => router.push(`/${user?.username}/projects/${project.id}`)}
                          >
                            <ExternalLink className="h-3 w-3 mr-2" />
                            View
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
} 
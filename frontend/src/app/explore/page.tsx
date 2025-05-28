'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '@/lib/config';
import { 
  Search, 
  Users, 
  Loader2, 
  Globe, 
  Eye, 
  Folder, 
  Star, 
  TrendingUp,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Sparkles,
  User,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface Portfolio {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl?: string;
  projectCount: number;
}

interface PaginationInfo {
  total: number;
  page: number;
  pages: number;
}

export default function ExplorePage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  useEffect(() => {
    const fetchPublishedPortfolios = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/portfolios/published`);
        if (response.data && response.data.users) {
          setPortfolios(response.data.users);
          setFilteredPortfolios(response.data.users);
          setPagination(response.data.pagination);
        } else {
          setPortfolios(response.data || []);
          setFilteredPortfolios(response.data || []);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching published portfolios:', error);
        setIsLoading(false);
      }
    };

    fetchPublishedPortfolios();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPortfolios(portfolios);
    } else {
      const filtered = portfolios.filter(portfolio =>
        portfolio.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.bio?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPortfolios(filtered);
    }
  }, [searchQuery, portfolios]);

  const trackPortfolioView = async (username: string) => {
    try {
      await axios.post(`${config.API_BASE_URL}/api/analytics/portfolio-visit`, {
        userId: portfolios.find(p => p.username === username)?.id,
        viewerId: null
      });
      router.push(`/${username}`);
    } catch (error) {
      console.error('Error tracking view:', error);
      router.push(`/${username}`);
    }
  };

  const PortfolioCard = ({ portfolio }: { portfolio: Portfolio }) => (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300">
            {portfolio.avatarUrl ? (
              <AvatarImage src={portfolio.avatarUrl} alt={portfolio.name || portfolio.username} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                {(portfolio.name || portfolio.username).substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
              {portfolio.name || portfolio.username}
            </CardTitle>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <User className="h-3 w-3" />
              @{portfolio.username}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {portfolio.bio || 'No bio available'}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Folder className="h-3 w-3" />
            <span>{portfolio.projectCount} {portfolio.projectCount === 1 ? 'project' : 'projects'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>Public</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => trackPortfolioView(portfolio.username)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
        >
          View Portfolio
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardFooter>
    </Card>
  );

  const PortfolioListItem = ({ portfolio }: { portfolio: Portfolio }) => (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Avatar className="h-12 w-12 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300">
              {portfolio.avatarUrl ? (
                <AvatarImage src={portfolio.avatarUrl} alt={portfolio.name || portfolio.username} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                  {(portfolio.name || portfolio.username).substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                {portfolio.name || portfolio.username}
              </h3>
              <p className="text-sm text-gray-500 mb-2">@{portfolio.username}</p>
              <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                {portfolio.bio || 'No bio available'}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  <span>{portfolio.projectCount} {portfolio.projectCount === 1 ? 'project' : 'projects'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>Public</span>
                </div>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => trackPortfolioView(portfolio.username)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Portfolio
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Explore Portfolios
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing work from talented creators around the world. Get inspired by their projects and stories.
            </p>
            
            {/* Search and Stats */}
            <div className="flex flex-col lg:flex-row items-center gap-6 max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search portfolios, creators, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{portfolios.length} Creators</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Folder className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">{portfolios.reduce((sum, p) => sum + p.projectCount, 0)} Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {searchQuery ? `Search Results (${filteredPortfolios.length})` : 'All Portfolios'}
            </h2>
            {searchQuery && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                "{searchQuery}"
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <p className="text-lg text-gray-600 font-medium">Loading amazing portfolios...</p>
            <p className="text-sm text-gray-500 mt-2">Discovering creative work from around the world</p>
          </div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {searchQuery ? 'No portfolios found' : 'No portfolios available yet'}
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any portfolios matching "${searchQuery}". Try a different search term.`
                : 'Be the first to create and publish your portfolio!'
              }
            </p>
            {searchQuery ? (
              <Button 
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="mr-4"
              >
                Clear Search
              </Button>
            ) : null}
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPortfolios.map((portfolio) => (
                  <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPortfolios.map((portfolio) => (
                  <PortfolioListItem key={portfolio.id} portfolio={portfolio} />
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-200">
              <p className="text-sm text-gray-600">
                Showing page <span className="font-medium text-gray-900">{pagination.page}</span> of{' '}
                <span className="font-medium text-gray-900">{pagination.pages}</span> ({pagination.total} portfolios)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
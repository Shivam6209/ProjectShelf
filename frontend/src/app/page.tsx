import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Palette, 
  Code, 
  PenTool, 
  BarChart3,
  Eye,
  Globe,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Layers
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 text-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-muted/40">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-accent/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-card backdrop-blur-sm border border-border shadow-sm text-card-foreground">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Built for Creative Professionals
            </Badge>
          </div>
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Showcase Your Work with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ProjectShelf
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create stunning portfolios with modular case studies. Perfect for designers, developers, and writers who want to showcase their best work.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">1000+</span>
              <span>Creators</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">50K+</span>
              <span>Portfolio Views</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-5 h-5 text-pink-600" />
              <span className="font-semibold">25+</span>
              <span>Countries</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <PenTool className="mr-2 h-5 w-5" />
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/explore" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg border-2 border-border hover:border-primary/50 hover:bg-accent transition-all duration-300">
                <Eye className="mr-2 h-5 w-5" />
                Explore Portfolios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Everything You Need to Shine
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional tools designed to help you create stunning portfolios that get noticed and drive results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Layers className="h-8 w-8 text-blue-600" />}
              title="Portfolio Builder"
              description="Create comprehensive case studies with project overviews, media galleries, timelines, and detailed outcomes that tell your story."
              gradient="from-blue-500/10 to-blue-600/10"
            />
            <FeatureCard 
              icon={<Palette className="h-8 w-8 text-purple-600" />}
              title="Theme Engine"
              description="Choose from multiple pre-built themes and customize your portfolio with real-time preview. Dark mode included."
              gradient="from-purple-500/10 to-purple-600/10"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-green-600" />}
              title="Analytics Dashboard"
              description="Track portfolio traffic, engagement metrics, and visitor interest per case study with detailed insights."
              gradient="from-green-500/10 to-green-600/10"
            />
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-pink-600" />}
              title="Custom URLs"
              description="Get your personalized portfolio URL (yourname.projectshelf.com) and share your work professionally."
              gradient="from-pink-500/10 to-pink-600/10"
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="SEO Optimized"
              description="Built-in SEO optimization ensures your portfolio ranks well in search results and gets discovered."
              gradient="from-indigo-500/10 to-indigo-600/10"
            />
            <FeatureCard 
              icon={<TrendingUp className="h-8 w-8 text-orange-600" />}
              title="Performance Tracking"
              description="Monitor which projects perform best, understand your audience, and optimize your portfolio for success."
              gradient="from-orange-500/10 to-orange-600/10"
            />
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 md:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Perfect for Creative Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're just starting out or an established professional, ProjectShelf helps you showcase your best work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProfessionCard 
              icon={<Code className="h-12 w-12 text-blue-600" />}
              title="Developers"
              description="Showcase your coding projects, technical skills, and development process with detailed case studies."
              features={["Code repositories", "Technical documentation", "Project timelines", "Technology stacks"]}
            />
            <ProfessionCard 
              icon={<Palette className="h-12 w-12 text-purple-600" />}
              title="Designers"
              description="Display your design process, visual work, and creative solutions with beautiful media galleries."
              features={["Design process", "Visual portfolios", "Client testimonials", "Creative workflows"]}
            />
            <ProfessionCard 
              icon={<PenTool className="h-12 w-12 text-green-600" />}
              title="Writers"
              description="Present your writing samples, published work, and content strategy with engaging case studies."
              features={["Writing samples", "Published articles", "Content strategy", "Editorial process"]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Loved by Creators Worldwide</h2>
            <p className="text-xl text-muted-foreground">See what our community has to say about ProjectShelf</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="ProjectShelf transformed how I present my work. The analytics help me understand what resonates with potential clients."
              author="Sarah Chen"
              role="UX Designer"
              rating={5}
            />
            <TestimonialCard 
              quote="The portfolio builder is incredibly intuitive. I was able to create a professional portfolio in just a few hours."
              author="Marcus Rodriguez"
              role="Full-Stack Developer"
              rating={5}
            />
            <TestimonialCard 
              quote="Finally, a platform that understands creative professionals. The themes are beautiful and the customization is perfect."
              author="Emily Watson"
              role="Content Writer"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Showcase Your Best Work?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creative professionals who trust ProjectShelf to showcase their portfolios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-background text-foreground hover:bg-accent h-14 text-lg px-8 shadow-lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Create Your Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="h-14 text-lg px-8 !border-white !text-white hover:!bg-white/20">
                <Eye className="mr-2 h-5 w-5" />
                Explore Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ReactNode;
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function ProfessionCard({ 
  icon, 
  title, 
  description, 
  features 
}: { 
  icon: React.ReactNode;
  title: string; 
  description: string;
  features: string[];
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-card">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ 
  quote, 
  author, 
  role, 
  rating 
}: { 
  quote: string;
  author: string; 
  role: string;
  rating: number;
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-card">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-foreground mb-6 leading-relaxed">
          "{quote}"
        </blockquote>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </CardContent>
    </Card>
  );
}

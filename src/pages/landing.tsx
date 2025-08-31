import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/ui/navbar";
import AuthModal from "@/components/auth/auth-modal";
import { 
  Share2, 
  CheckCircle, 
  BookOpen, 
  Users, 
  Target, 
  Lightbulb,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  MessageCircle,
  FileText,
  Coins,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'academic' | 'guest' | null>(null);

  const handleAuth = (role: 'student' | 'academic' | 'guest') => {
    setUserRole(role);
    // Here you would typically set up user session, redirect to dashboard, etc.
  };

  const features = [
    {
      icon: Share2,
      title: "Share Real Experiences",
      description: "Share your interview journeys, selection processes, and valuable insights with fellow students.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: Coins,
      title: "Earn Rewards",
      description: "Get coins for every contribution and redeem them for exciting rewards like gadgets and vouchers.",
      gradient: "from-secondary to-accent"
    },
    {
      icon: MessageCircle,
      title: "Ask & Answer",
      description: "Get your doubts cleared by peers and seniors. Build a supportive learning community.",
      gradient: "from-accent to-primary"
    },
    {
      icon: CheckCircle,
      title: "Verified Content",
      description: "All experiences are reviewed by academics to ensure authenticity and quality.",
      gradient: "from-primary to-accent"
    }
  ];

  const problems = [
    {
      icon: Target,
      title: "Information Scattered",
      description: "Students struggle to find reliable interview experiences across different platforms."
    },
    {
      icon: Users,
      title: "Lack of Peer Support",
      description: "Limited interaction between students sharing similar career goals and challenges."
    },
    {
      icon: Lightbulb,
      title: "No Quality Assurance",
      description: "Unverified information leads to confusion and poor preparation strategies."
    }
  ];

  const benefits = [
    {
      icon: BookOpen,
      title: "Comprehensive Library",
      description: "Access thousands of verified interview experiences from top companies."
    },
    {
      icon: TrendingUp,
      title: "Smart Learning",
      description: "Learn from real experiences and avoid common mistakes made by others."
    },
    {
      icon: Award,
      title: "Recognition System",
      description: "Build your reputation through contributions and earn badges for achievements."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Share",
      description: "Submit your interview experience with detailed insights",
      icon: Share2
    },
    {
      number: "02", 
      title: "Verify",
      description: "Academic reviewers validate content for authenticity",
      icon: CheckCircle
    },
    {
      number: "03",
      title: "Learn",
      description: "Community benefits from verified, high-quality experiences",
      icon: BookOpen
    }
  ];

  const stats = [
    { number: "10K+", label: "Students" },
    { number: "5K+", label: "Experiences" },
    { number: "500+", label: "Companies" },
    { number: "50+", label: "Colleges" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        userRole={userRole} 
        walletBalance={userRole === 'student' ? 150 : undefined}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  🎓 Join 10,000+ Students
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Share Experience.{" "}
                  <span className="text-gradient-primary">Learn Smarter.</span>{" "}
                  Grow Together.
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with fellow students, share interview experiences, and build your career journey with verified insights from real professionals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="btn-gradient shadow-button text-lg px-8 py-6"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Browse Experiences
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gradient-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Students collaborating and sharing experiences"
                  className="rounded-2xl shadow-hero w-full h-auto"
                />
                <div className="absolute -top-4 -right-4 bg-gradient-primary text-white p-4 rounded-xl shadow-lg animate-bounce">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose XShare?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the power of peer learning and verified experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problems & Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Problems */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="destructive" className="px-4 py-2">
                  Current Challenges
                </Badge>
                <h2 className="text-3xl font-bold">Problems Students Face</h2>
                <p className="text-muted-foreground">
                  Traditional career preparation methods leave students struggling with scattered information and lack of peer support.
                </p>
              </div>

              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <problem.icon className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{problem.title}</h3>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-success text-white px-4 py-2">
                  XShare Solutions
                </Badge>
                <h2 className="text-3xl font-bold">How We Help You Succeed</h2>
                <p className="text-muted-foreground">
                  XShare provides a comprehensive platform that addresses all your career preparation needs in one place.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How XShare Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to contribute and learn from the community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="card-hover h-full">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who are already sharing experiences and learning together on XShare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-gradient shadow-button text-lg px-8 py-6"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Join as Student <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Browse as Guest
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <span className="text-lg font-bold text-white">X</span>
                </div>
                <span className="text-xl font-bold text-gradient-primary">XShare</span>
              </div>
              <p className="text-muted-foreground">
                Empowering students through shared experiences and collaborative learning.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Experience Library</div>
                <div>Q&A Forum</div>
                <div>Leaderboard</div>
                <div>Rewards Store</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Help Center</div>
                <div>Community Guidelines</div>
                <div>Contact Us</div>
                <div>Feedback</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Cookie Policy</div>
                <div>Academic Code</div>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 XShare. All rights reserved. Built for students, by students.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default LandingPage;
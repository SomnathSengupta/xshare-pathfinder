import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, BookOpen, Video, Calendar, ExternalLink } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "Software Engineer Resume Template",
      description: "ATS-friendly resume template optimized for tech roles",
      type: "Template",
      category: "Resume",
      downloads: 1250,
      rating: 4.8,
      isPremium: false,
      icon: FileText
    },
    {
      id: 2,
      title: "System Design Interview Guide",
      description: "Comprehensive guide covering all system design topics",
      type: "PDF",
      category: "Interview Prep",
      downloads: 890,
      rating: 4.9,
      isPremium: true,
      icon: BookOpen
    },
    {
      id: 3,
      title: "Data Structures & Algorithms Cheatsheet", 
      description: "Quick reference for common DSA concepts and patterns",
      type: "Cheatsheet",
      category: "Technical",
      downloads: 2100,
      rating: 4.7,
      isPremium: false,
      icon: FileText
    },
    {
      id: 4,
      title: "Mock Interview Sessions",
      description: "Schedule 1-on-1 mock interviews with industry experts",
      type: "Service",
      category: "Practice",
      downloads: 340,
      rating: 4.6,
      isPremium: true,
      icon: Video
    },
    {
      id: 5,
      title: "Behavioral Interview Question Bank",
      description: "500+ behavioral questions with sample answers",
      type: "Database",
      category: "Interview Prep",
      downloads: 1580,
      rating: 4.5,
      isPremium: false,
      icon: BookOpen
    },
    {
      id: 6,
      title: "Salary Negotiation Playbook",
      description: "Step-by-step guide to negotiate better offers",
      type: "Guide",
      category: "Career",
      downloads: 720,
      rating: 4.8,
      isPremium: true,
      icon: FileText
    }
  ];

  const categories = ["All", "Resume", "Interview Prep", "Technical", "Practice", "Career"];

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Resources Hub</h1>
          <p className="text-muted-foreground">Templates, guides, and tools to accelerate your career</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            
            return (
              <Card key={resource.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {resource.category}
                        </Badge>
                        {resource.isPremium && (
                          <Badge variant="default" className="text-xs ml-1">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{resource.downloads} downloads</span>
                    <span>★ {resource.rating}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      {resource.type === "Service" ? "Book Now" : "Download"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Premium Resources CTA */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold mb-2">Unlock Premium Resources</h3>
            <p className="text-muted-foreground mb-6">
              Get access to exclusive templates, advanced guides, and 1-on-1 mentoring sessions
            </p>
            <Button className="btn-gradient">
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Mock Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Practice with industry experts and get personalized feedback
              </p>
              <Button variant="outline" className="w-full">
                View Available Slots
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Request New Resource
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Let us know what you need
              </p>
              <Button variant="outline" className="w-full">
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare, 
  Upload,
  TrendingUp,
  Calendar,
  Award,
  Eye,
  Edit,
  BookOpen,
  Star,
  MessageCircle,
  BarChart3,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import professorImage from "@/assets/professor-reviewing.jpg";

const AcademicDashboard = () => {
  const { toast } = useToast();
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [pendingExperiences, setPendingExperiences] = useState([
    {
      id: 1,
      title: "Software Engineer Interview - Google",
      student: "Alex Kumar",
      company: "Google",
      role: "Software Engineer",
      submittedAt: "2 hours ago",
      status: "pending",
      content: "The interview process consisted of 4 rounds including coding, system design, and behavioral questions. The coding round focused on data structures and algorithms...",
      details: {
        rounds: ["Online Assessment", "Technical Phone Screen", "Onsite - Coding", "Onsite - System Design", "Behavioral"],
        difficulty: "Hard",
        outcome: "Selected"
      }
    },
    {
      id: 2,
      title: "Product Manager Internship - Microsoft",
      student: "Sarah Chen",
      company: "Microsoft",
      role: "Product Manager Intern",
      submittedAt: "5 hours ago",
      status: "pending",
      content: "Applied through university career portal. The process included case study presentation and multiple behavioral interviews...",
      details: {
        rounds: ["Resume Screening", "Case Study", "Behavioral Interview", "Final Round"],
        difficulty: "Medium",
        outcome: "Selected"
      }
    },
    {
      id: 3,
      title: "Data Scientist Role - Amazon",
      student: "Priya Sharma",
      company: "Amazon",
      role: "Data Scientist",
      submittedAt: "1 day ago",
      status: "pending",
      content: "Challenging interview with focus on machine learning concepts, statistics, and practical problem solving...",
      details: {
        rounds: ["Phone Screen", "Technical Assessment", "ML Case Study", "Bar Raiser"],
        difficulty: "Hard",
        outcome: "Rejected"
      }
    }
  ]);

  const handleApprove = (experienceId: number) => {
    setPendingExperiences(experiences => 
      experiences.map(exp => 
        exp.id === experienceId 
          ? { ...exp, status: "approved" }
          : exp
      )
    );
  };

  const handleReject = (experienceId: number) => {
    setPendingExperiences(experiences => 
      experiences.map(exp => 
        exp.id === experienceId 
          ? { ...exp, status: "rejected" }
          : exp
      )
    );
  };

  const stats = [
    { label: "Pending Reviews", value: "12", icon: Clock, color: "text-warning" },
    { label: "Approved This Week", value: "28", icon: CheckCircle, color: "text-success" },
    { label: "Total Contributions", value: "156", icon: BookOpen, color: "text-primary" },
    { label: "Active Students", value: "89", icon: Users, color: "text-info" }
  ];

  return (
    <Layout userRole="academic">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Academic Dashboard</h1>
            <p className="text-muted-foreground">Review student submissions and manage platform content</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-accent border-accent">
              <Star className="h-3 w-3 mr-1" />
              Verified Academic
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex flex-col lg:flex-row items-center p-6">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-primary">Welcome, Professor!</h2>
              <p className="text-muted-foreground max-w-2xl">
                Your role is crucial in maintaining the quality and authenticity of student experiences. 
                Review submissions, verify information, and help build a trusted knowledge base for future students.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="btn-gradient">
                  <FileText className="h-4 w-4 mr-2" />
                  Review Submissions
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Answer Questions
                </Button>
              </div>
            </div>
            <div className="lg:w-80 mt-6 lg:mt-0">
              <img 
                src={professorImage} 
                alt="Academic reviewing submissions" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending Reviews
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Q&A Forum
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Pending Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Experience Submissions for Review</h3>
                <Badge variant="secondary">
                  {pendingExperiences.filter(exp => exp.status === "pending").length} Pending
                </Badge>
              </div>

              {pendingExperiences
                .filter(exp => exp.status === "pending")
                .map((experience) => (
                <Card key={experience.id} className="card-hover">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">{experience.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{experience.student[0]}</AvatarFallback>
                            </Avatar>
                            <span>By {experience.student}</span>
                          </div>
                          <span>•</span>
                          <span>{experience.submittedAt}</span>
                          <Badge 
                            variant={experience.details.difficulty === 'Hard' ? 'destructive' : 
                                   experience.details.difficulty === 'Medium' ? 'default' : 'secondary'}
                          >
                            {experience.details.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-success hover:bg-success/10"
                          onClick={() => handleApprove(experience.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleReject(experience.id)}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{experience.content}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Interview Rounds:</h4>
                          <div className="space-y-1">
                            {experience.details.rounds.map((round, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-success" />
                                <span>{round}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Company:</span>
                            <span className="text-sm">{experience.company}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Role:</span>
                            <span className="text-sm">{experience.role}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Outcome:</span>
                            <Badge variant={experience.details.outcome === "Selected" ? "default" : "destructive"}>
                              {experience.details.outcome}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs with placeholder content */}
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Q&A Forum Management</CardTitle>
                <p className="text-muted-foreground">Review and answer student questions</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Q&A management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resource Management</CardTitle>
                <p className="text-muted-foreground">Upload and manage official resources</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Resource management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <p className="text-muted-foreground">View engagement metrics and platform statistics</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AcademicDashboard;
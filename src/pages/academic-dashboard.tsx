import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileCheck, 
  MessageCircle, 
  Upload,
  BarChart3,
  Users,
  Building,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const AcademicDashboard = () => {
  const [stats] = useState({
    pendingReviews: 12,
    approvedExperiences: 45,
    pendingQuestions: 8,
    totalStudents: 230,
    thisWeekSubmissions: 18
  });

  const pendingExperiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      student: "Alex Rodriguez",
      submittedAt: "2 hours ago",
      status: "pending",
      rounds: 4
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Product Manager", 
      student: "Sarah Chen",
      submittedAt: "5 hours ago",
      status: "needs_review",
      rounds: 3
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE II",
      student: "John Kim",
      submittedAt: "1 day ago",
      status: "pending",
      rounds: 5
    }
  ];

  const pendingQuestions = [
    {
      id: 1,
      title: "How to prepare for system design rounds at FAANG?",
      student: "Anonymous",
      category: "Technical",
      submittedAt: "3 hours ago",
      urgency: "high"
    },
    {
      id: 2,
      title: "What should I expect in behavioral interviews?",
      student: "Emma Wilson",
      category: "Behavioral",
      submittedAt: "6 hours ago", 
      urgency: "medium"
    }
  ];

  const recentActivity = [
    {
      type: "approval",
      description: "Approved Google SWE experience by Alex Rodriguez",
      time: "1 hour ago"
    },
    {
      type: "answer",
      description: "Answered question about system design preparation",
      time: "3 hours ago"
    },
    {
      type: "upload",
      description: "Uploaded new CS fundamentals resource",
      time: "1 day ago"
    }
  ];

  const topCompanies = [
    { name: "Google", submissions: 15, approved: 12 },
    { name: "Microsoft", submissions: 12, approved: 10 },
    { name: "Amazon", submissions: 10, approved: 8 },
    { name: "Apple", submissions: 8, approved: 7 },
    { name: "Meta", submissions: 6, approved: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Academic Dashboard</h1>
          <p className="text-muted-foreground">Review and moderate student submissions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{stats.pendingReviews}</div>
              <div className="text-sm text-muted-foreground">Pending Reviews</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{stats.approvedExperiences}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">{stats.pendingQuestions}</div>
              <div className="text-sm text-muted-foreground">Pending Q&A</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">{stats.thisWeekSubmissions}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Pending Reviews</TabsTrigger>
            <TabsTrigger value="questions">Q&A Moderation</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Experience Submissions Awaiting Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingExperiences.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{exp.company} - {exp.role}</h3>
                          {exp.status === 'needs_review' && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Needs Review
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          By {exp.student} • {exp.submittedAt} • {exp.rounds} rounds
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          Review Later
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Questions Awaiting Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingQuestions.map((question) => (
                    <div key={question.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{question.title}</h3>
                        <Badge variant={question.urgency === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {question.urgency} priority
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        By {question.student} • {question.submittedAt} • {question.category}
                      </div>
                      <Button size="sm">
                        Answer Question
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col">
                    <Upload className="h-6 w-6 mb-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col">
                    <FileCheck className="h-6 w-6 mb-2" />
                    Create Resource Link
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Companies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topCompanies.map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{company.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {company.approved}/{company.submissions} approved
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Engagement Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Approval Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">4.2</div>
                    <div className="text-sm text-muted-foreground">Avg Response Time (hours)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">92%</div>
                    <div className="text-sm text-muted-foreground">Student Satisfaction</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AcademicDashboard;
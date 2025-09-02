import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContributionHeatmap from "@/components/heatmap/contribution-heatmap";
import ExperienceSharingForm from "@/components/forms/experience-sharing-form";
import AskQuestionModal from "@/components/forms/ask-question-modal";
import { 
  Share2, 
  MessageCircle, 
  BookOpen, 
  Trophy, 
  Gift, 
  Coins,
  Plus,
  TrendingUp,
  Users,
  Star,
  Award,
  FileText,
  Calendar,
  Target,
  Clock
} from "lucide-react";

const StudentDashboard = () => {
  const [walletBalance] = useState(1250);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [userStats] = useState({
    experiencesShared: 8,
    questionsAnswered: 24,
    helpfulVotes: 156,
    currentStreak: 7,
    totalPoints: 1250,
    level: 3,
    nextLevelPoints: 1500
  });

  // Mock contribution data for heatmap
  const contributionData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 365 + i);
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5) // 0-4 contributions per day
    };
  });

  const quickActions = [
    {
      title: "Share Experience",
      description: "Share your latest interview experience",
      icon: Share2,
      color: "bg-primary",
      action: () => setIsShareModalOpen(true),
      reward: "+50 coins"
    },
    {
      title: "Ask Question",
      description: "Get help from the community",
      icon: MessageCircle,
      color: "bg-secondary",
      action: () => setIsAskModalOpen(true),
      reward: "Free"
    },
    {
      title: "Browse Library",
      description: "Explore interview experiences",
      icon: BookOpen,
      color: "bg-accent",
      action: () => window.location.href = "/experiences",
      reward: "Learn"
    }
  ];

  const recentActivities = [
    {
      type: "experience",
      title: "Google Software Engineer Interview",
      description: "Shared 3-round interview experience",
      time: "2 hours ago",
      reward: "+50 coins",
      icon: Share2
    },
    {
      type: "answer",
      title: "Helped with DSA Question",
      description: "Answered about binary tree traversal",
      time: "5 hours ago",
      reward: "+5 coins",
      icon: MessageCircle
    },
    {
      type: "achievement",
      title: "Earned Helper Badge",
      description: "Received 10 helpful votes this week",
      time: "1 day ago",
      reward: "Badge",
      icon: Award
    }
  ];

  const upcomingGoals = [
    {
      title: "Share 5 more experiences",
      progress: 60,
      target: "Level 4",
      icon: Target
    },
    {
      title: "Answer 10 questions",
      progress: 30,
      target: "Helper Badge",
      icon: MessageCircle
    },
    {
      title: "Maintain 7-day streak",
      progress: 100,
      target: "Streak Master",
      icon: Calendar
    }
  ];

  const achievements = [
    { name: "First Share", description: "Shared your first experience", earned: true },
    { name: "Helper", description: "Answered 10 questions", earned: true },
    { name: "Streak Master", description: "7-day contribution streak", earned: true },
    { name: "Expert", description: "Received 100 helpful votes", earned: false },
    { name: "Mentor", description: "Guided 50 students", earned: false }
  ];

  return (
    <Layout userRole="student" walletBalance={walletBalance}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Level {userStats.level} Student • {userStats.currentStreak} day streak
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Card className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 coin-pulse" />
                <div>
                  <div className="font-semibold">{walletBalance} Coins</div>
                  <div className="text-xs text-muted-foreground">Wallet Balance</div>
                </div>
              </div>
            </Card>
            
            <Button className="btn-gradient" onClick={() => setIsShareModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Share Experience
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Start contributing and earning rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="card-hover cursor-pointer group" onClick={action.action}>
                      <CardContent className="p-4 text-center">
                        <div className={`inline-flex p-3 rounded-xl ${action.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {action.reward}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{userStats.experiencesShared}</div>
                  <div className="text-sm text-muted-foreground">Experiences</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-secondary">{userStats.questionsAnswered}</div>
                  <div className="text-sm text-muted-foreground">Answers</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-accent">{userStats.helpfulVotes}</div>
                  <div className="text-sm text-muted-foreground">Helpful Votes</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-coin-gold">{userStats.currentStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </CardContent>
              </Card>
            </div>

            {/* Contribution Heatmap */}
            <ContributionHeatmap data={contributionData} />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{activity.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {activity.reward}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">Level {userStats.level}</div>
                  <div className="text-sm text-muted-foreground">
                    {userStats.nextLevelPoints - userStats.totalPoints} points to Level {userStats.level + 1}
                  </div>
                </div>
                <Progress 
                  value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{userStats.totalPoints} pts</span>
                  <span>{userStats.nextLevelPoints} pts</span>
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Current Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <goal.icon className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{goal.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {goal.target}
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned ? 'bg-success text-white' : 'bg-muted'
                    }`}>
                      <Star className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${!achievement.earned && 'text-muted-foreground'}`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Experiences
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Q&A Forum
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  Leaderboard
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" size="sm">
                  <Gift className="h-4 w-4 mr-2" />
                  Rewards Store
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
            <ExperienceSharingForm onClose={() => setIsShareModalOpen(false)} />
          </DialogContent>
        </Dialog>

        <AskQuestionModal 
          isOpen={isAskModalOpen} 
          onClose={() => setIsAskModalOpen(false)} 
        />
      </div>
    </Layout>
  );
};

export default StudentDashboard;
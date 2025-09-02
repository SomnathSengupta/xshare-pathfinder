import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContributionHeatmap from "@/components/heatmap/contribution-heatmap";
import { 
  User, 
  Edit, 
  Bookmark, 
  Trophy, 
  Coins, 
  Settings,
  Share2,
  MessageCircle,
  Heart,
  Calendar,
  MapPin,
  Mail,
  Building
} from "lucide-react";

const Profile = () => {
  const [userProfile] = useState({
    name: "Alex Rodriguez",
    email: "alex.rodriguez@example.com",
    university: "MIT",
    graduation: "2024",
    location: "Boston, MA",
    bio: "Computer Science student passionate about AI and machine learning. Always eager to share experiences and help fellow students succeed.",
    joinDate: "January 2024",
    avatar: "/placeholder.svg"
  });

  const [stats] = useState({
    experiencesShared: 8,
    questionsAnswered: 24,
    helpfulVotes: 156,
    totalPoints: 1250,
    level: 3,
    currentStreak: 7,
    walletBalance: 1250
  });

  // Mock contribution data
  const contributionData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 365 + i);
    return {
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5)
    };
  });

  const recentExperiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      date: "2 days ago",
      views: 45,
      likes: 12
    },
    {
      id: 2,
      company: "Microsoft", 
      role: "Program Manager",
      date: "1 week ago",
      views: 32,
      likes: 8
    }
  ];

  const achievements = [
    { name: "First Share", description: "Shared your first experience", earned: true },
    { name: "Helper", description: "Answered 10 questions", earned: true },
    { name: "Streak Master", description: "7-day contribution streak", earned: true },
    { name: "Expert", description: "Received 100 helpful votes", earned: false },
    { name: "Mentor", description: "Guided 50 students", earned: false }
  ];

  const bookmarkedExperiences = [
    {
      id: 1,
      company: "Amazon",
      role: "SDE II",
      author: "Sarah Chen",
      bookmarkedDate: "3 days ago"
    },
    {
      id: 2,
      company: "Apple",
      role: "iOS Developer",
      author: "John Kim", 
      bookmarkedDate: "1 week ago"
    }
  ];

  return (
    <Layout userRole="student" walletBalance={stats.walletBalance}>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-2xl">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                    <p className="text-muted-foreground mb-2">{userProfile.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {userProfile.university} • Class of {userProfile.graduation}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {userProfile.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined {userProfile.joinDate}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.experiencesShared}</div>
              <div className="text-sm text-muted-foreground">Experiences Shared</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">{stats.helpfulVotes}</div>
              <div className="text-sm text-muted-foreground">Helpful Votes</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">{stats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{stats.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            <ContributionHeatmap data={contributionData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <Share2 className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium">Shared Google Software Engineer experience</div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50">
                    <MessageCircle className="h-5 w-5 text-secondary" />
                    <div className="flex-1">
                      <div className="font-medium">Answered "System Design Tips" question</div>
                      <div className="text-sm text-muted-foreground">5 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            <div className="space-y-4">
              {recentExperiences.map((exp) => (
                <Card key={exp.id} className="card-hover cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{exp.company} - {exp.role}</h3>
                        <p className="text-sm text-muted-foreground">{exp.date}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{exp.views} views</span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {exp.likes}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks" className="space-y-6">
            <div className="space-y-4">
              {bookmarkedExperiences.map((exp) => (
                <Card key={exp.id} className="card-hover cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{exp.company} - {exp.role}</h3>
                        <p className="text-sm text-muted-foreground">By {exp.author}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Bookmarked {exp.bookmarkedDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={achievement.earned ? 'border-success' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-success text-white' : 'bg-muted'
                      }`}>
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <div className={`font-semibold ${!achievement.earned && 'text-muted-foreground'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge variant="secondary" className="ml-auto">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
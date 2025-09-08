import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";
import studentProfile1 from "@/assets/student-profile-1.jpg";
import academicProfile1 from "@/assets/academic-profile-1.jpg";
import studentProfile2 from "@/assets/student-profile-2.jpg";
import studentProfile3 from "@/assets/student-profile-3.jpg";
import profileAvatar from "@/assets/profile-avatar.jpg";

const Leaderboard = () => {
  const leaders = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: studentProfile1,
      points: 2850,
      level: 5,
      badge: "Expert Contributor",
      experiencesShared: 12,
      helpfulAnswers: 45
    },
    {
      rank: 2,
      name: "Alex Rodriguez", 
      avatar: profileAvatar,
      points: 2650,
      level: 4,
      badge: "Top Helper",
      experiencesShared: 10,
      helpfulAnswers: 38
    },
    {
      rank: 3,
      name: "Priya Sharma",
      avatar: studentProfile3, 
      points: 2400,
      level: 4,
      badge: "Mentor",
      experiencesShared: 8,
      helpfulAnswers: 42
    },
    {
      rank: 4,
      name: "David Kim",
      avatar: studentProfile2,
      points: 2100,
      level: 3,
      badge: "Rising Star", 
      experiencesShared: 7,
      helpfulAnswers: 25
    },
    {
      rank: 5,
      name: "Emma Wilson",
      avatar: academicProfile1,
      points: 1950,
      level: 3,
      badge: "Contributor",
      experiencesShared: 6,
      helpfulAnswers: 28
    }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-warning" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Medal className="h-6 w-6 text-accent" />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent p-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Trophy className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">🏆 Leaderboard</h1>
                <p className="text-white/90 text-lg">Celebrating our top contributors and community champions</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">1,250+</div>
                <div className="text-white/80 text-sm">Active Contributors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">5,600+</div>
                <div className="text-white/80 text-sm">Experiences Shared</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">12,300+</div>
                <div className="text-white/80 text-sm">Questions Answered</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {leaders.slice(0, 3).map((leader, index) => (
            <Card key={leader.rank} className={`text-center transition-all duration-300 hover:scale-105 ${
              index === 0 ? 'ring-2 ring-primary shadow-2xl bg-gradient-to-b from-primary/5 to-transparent' : 
              index === 1 ? 'ring-1 ring-muted-foreground/20 shadow-lg' :
              'ring-1 ring-accent/20 shadow-lg'
            }`}>
              <CardHeader className="pb-2 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 rounded-t-lg"></div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className={`p-2 rounded-full ${
                      index === 0 ? 'bg-gradient-to-br from-warning to-warning/70 shadow-lg' :
                      index === 1 ? 'bg-gradient-to-br from-muted-foreground to-muted-foreground/70' :
                      'bg-gradient-to-br from-accent to-accent/70'
                    }`}>
                      {getRankIcon(leader.rank)}
                    </div>
                  </div>
                  <div className="relative">
                    <Avatar className="h-20 w-20 mx-auto mb-3 ring-4 ring-background shadow-xl">
                      <AvatarImage src={leader.avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-warning text-warning-foreground rounded-full p-1">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">{leader.name}</CardTitle>
                  <Badge variant={index === 0 ? "default" : "secondary"} className={`w-fit mx-auto mt-2 ${
                    index === 0 ? 'bg-primary text-primary-foreground shadow-lg' : ''
                  }`}>
                    {leader.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className={`text-4xl font-bold mb-2 ${
                  index === 0 ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : 'text-primary'
                }`}>
                  {leader.points.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Level {leader.level}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="font-bold text-lg text-primary">{leader.experiencesShared}</div>
                    <div className="text-muted-foreground text-xs">Experiences</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="font-bold text-lg text-secondary">{leader.helpfulAnswers}</div>
                    <div className="text-muted-foreground text-xs">Helpful Answers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaders.map((leader, index) => (
                <div key={leader.rank} className={`flex items-center justify-between p-6 transition-all duration-200 hover:bg-gradient-to-r hover:from-muted/30 hover:to-transparent border-l-4 ${
                  index < 3 ? 'border-l-primary' : 'border-l-transparent'
                } group cursor-pointer`}>
                  <div className="flex items-center gap-6">
                    <div className="w-16 flex justify-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        index < 3 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      } group-hover:scale-110 transition-transform`}>
                        {getRankIcon(leader.rank)}
                      </div>
                    </div>
                    <Avatar className="h-14 w-14 ring-2 ring-muted group-hover:ring-primary transition-all">
                      <AvatarImage src={leader.avatar} />
                      <AvatarFallback className="font-bold">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-lg group-hover:text-primary transition-colors">
                        {leader.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Star className="h-3 w-3" />
                        Level {leader.level}
                      </div>
                    </div>
                    <Badge variant="outline" className={`px-3 py-1 ${
                      index < 3 ? 'border-primary text-primary' : ''
                    } group-hover:border-primary group-hover:text-primary transition-colors`}>
                      {leader.badge}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold group-hover:scale-105 transition-transform ${
                      index < 3 ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent' : 'text-primary'
                    }`}>
                      {leader.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;
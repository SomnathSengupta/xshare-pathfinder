import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  const leaders = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "/placeholder.svg",
      points: 2850,
      level: 5,
      badge: "Expert Contributor",
      experiencesShared: 12,
      helpfulAnswers: 45
    },
    {
      rank: 2,
      name: "Alex Rodriguez", 
      avatar: "/placeholder.svg",
      points: 2650,
      level: 4,
      badge: "Top Helper",
      experiencesShared: 10,
      helpfulAnswers: 38
    },
    {
      rank: 3,
      name: "Priya Sharma",
      avatar: "/placeholder.svg", 
      points: 2400,
      level: 4,
      badge: "Mentor",
      experiencesShared: 8,
      helpfulAnswers: 42
    },
    {
      rank: 4,
      name: "David Kim",
      avatar: "/placeholder.svg",
      points: 2100,
      level: 3,
      badge: "Rising Star", 
      experiencesShared: 7,
      helpfulAnswers: 25
    },
    {
      rank: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg",
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Top contributors in our community</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaders.slice(0, 3).map((leader, index) => (
            <Card key={leader.rank} className={`text-center ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-2">
                  {getRankIcon(leader.rank)}
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src={leader.avatar} />
                  <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{leader.name}</CardTitle>
                <Badge variant={index === 0 ? "default" : "secondary"} className="w-fit mx-auto">
                  {leader.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{leader.points}</div>
                <div className="text-sm text-muted-foreground mb-4">Level {leader.level}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-semibold">{leader.experiencesShared}</div>
                    <div className="text-muted-foreground">Experiences</div>
                  </div>
                  <div>
                    <div className="font-semibold">{leader.helpfulAnswers}</div>
                    <div className="text-muted-foreground">Helpful Answers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaders.map((leader) => (
                <div key={leader.rank} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      {getRankIcon(leader.rank)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={leader.avatar} />
                      <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{leader.name}</div>
                      <div className="text-sm text-muted-foreground">Level {leader.level}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {leader.badge}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{leader.points}</div>
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
import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, Building, Calendar } from "lucide-react";

const ExperienceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const experiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      author: "Anonymous",
      rounds: 4,
      rating: 4.5,
      date: "2 days ago",
      preview: "Great experience with technical rounds focusing on DSA and system design...",
      tags: ["Technical", "On-site", "DSA"]
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Product Manager",
      author: "Alex K.",
      rounds: 3,
      rating: 4.2,
      date: "1 week ago",
      preview: "Behavioral rounds were challenging but fair. Focus on leadership scenarios...",
      tags: ["Behavioral", "Virtual", "Leadership"]
    },
    {
      id: 3,
      company: "Amazon",
      role: "SDE II",
      author: "Anonymous", 
      rounds: 5,
      rating: 3.8,
      date: "2 weeks ago",
      preview: "Multiple technical rounds with emphasis on scalability and system design...",
      tags: ["System Design", "On-site", "Scalability"]
    }
  ];

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Experience Library</h1>
          <p className="text-muted-foreground">Browse interview experiences shared by students</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company, role, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="microsoft">Microsoft</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sde">Software Engineer</SelectItem>
              <SelectItem value="pm">Product Manager</SelectItem>
              <SelectItem value="sde2">SDE II</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((experience) => (
            <Card key={experience.id} className="card-hover cursor-pointer">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      {experience.company} - {experience.role}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>By {experience.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {experience.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current text-warning" />
                        {experience.rating}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{experience.rounds} Rounds</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{experience.preview}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExperienceLibrary;
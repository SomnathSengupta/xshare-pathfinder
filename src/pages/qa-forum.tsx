import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Clock, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AskQuestionModal from "@/components/forms/ask-question-modal";

const QAForum = () => {
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const questions = [
    {
      id: 1,
      title: "How to prepare for Google's system design round?",
      content: "I have an upcoming interview at Google for SDE-2 position. Any tips for system design?",
      author: "Alex K.",
      avatar: "/placeholder.svg",
      timestamp: "2 hours ago",
      answers: 5,
      upvotes: 12,
      tags: ["Google", "System Design", "SDE-2"]
    },
    {
      id: 2,
      title: "What to expect in Microsoft's behavioral rounds?",
      content: "I'm preparing for Microsoft PM role. What kind of behavioral questions should I expect?",
      author: "Sarah M.",
      avatar: "/placeholder.svg", 
      timestamp: "4 hours ago",
      answers: 8,
      upvotes: 18,
      tags: ["Microsoft", "Behavioral", "PM"]
    },
    {
      id: 3,
      title: "Amazon coding interview difficulty level?",
      content: "How difficult are Amazon's coding rounds compared to other FAANG companies?",
      author: "John D.",
      avatar: "/placeholder.svg",
      timestamp: "1 day ago", 
      answers: 15,
      upvotes: 25,
      tags: ["Amazon", "Coding", "FAANG"]
    }
  ];

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Q&A Forum</h1>
            <p className="text-muted-foreground">Ask questions and get help from the community</p>
          </div>
          <Button className="btn-gradient" onClick={() => setIsAskModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
          />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <Card key={question.id} className="card-hover cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{question.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={question.avatar} />
                      <AvatarFallback>{question.author[0]}</AvatarFallback>
                    </Avatar>
                    <span>{question.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{question.timestamp}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{question.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{question.answers} answers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{question.upvotes} upvotes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AskQuestionModal 
          isOpen={isAskModalOpen} 
          onClose={() => setIsAskModalOpen(false)} 
        />
      </div>
    </Layout>
  );
};

export default QAForum;
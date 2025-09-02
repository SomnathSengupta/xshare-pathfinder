import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Upload, Building2, Users, MessageSquare, Lightbulb, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperienceSharingFormProps {
  onClose?: () => void;
}

const ExperienceSharingForm = ({ onClose }: ExperienceSharingFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    experienceLevel: "",
    interviewDate: "",
    rounds: [] as string[],
    questions: "",
    tips: "",
    difficulty: "",
    outcome: "",
    files: [] as File[]
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Company & Role", icon: Building2 },
    { id: 2, title: "Selection Rounds", icon: Users },
    { id: 3, title: "Questions Asked", icon: MessageSquare },
    { id: 4, title: "Tips & Feedback", icon: Lightbulb },
    { id: 5, title: "Final Review", icon: FileText }
  ];

  const rounds = [
    "Online Assessment", "Phone Screen", "Technical Round", "System Design", 
    "Behavioral Round", "HR Round", "Manager Round", "Panel Interview"
  ];

  const handleRoundToggle = (round: string) => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.includes(round)
        ? prev.rounds.filter(r => r !== round)
        : [...prev.rounds, round]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Experience Shared Successfully! 🎉",
      description: "You've earned 50 coins for sharing your interview experience.",
    });
    onClose?.();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g., Google, Microsoft, Amazon"
              />
            </div>
            <div>
              <Label htmlFor="role">Role/Position</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="e.g., Software Engineer, Product Manager"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Bangalore, Remote"
                />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="date">Interview Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.interviewDate}
                onChange={(e) => setFormData(prev => ({ ...prev, interviewDate: e.target.value }))}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label>Select Interview Rounds (Check all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {rounds.map((round) => (
                  <div
                    key={round}
                    onClick={() => handleRoundToggle(round)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.rounds.includes(round)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {formData.rounds.includes(round) ? (
                        <CheckCircle className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">{round}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Overall Difficulty</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="very-hard">Very Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="questions">Questions Asked</Label>
              <Textarea
                id="questions"
                value={formData.questions}
                onChange={(e) => setFormData(prev => ({ ...prev, questions: e.target.value }))}
                placeholder="Share the technical and behavioral questions you faced in each round. Be as detailed as possible to help others prepare."
                rows={8}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="tips">Tips & Feedback</Label>
              <Textarea
                id="tips"
                value={formData.tips}
                onChange={(e) => setFormData(prev => ({ ...prev, tips: e.target.value }))}
                placeholder="Share your preparation strategy, what worked well, what you'd do differently, and any advice for future candidates."
                rows={6}
              />
            </div>
            <div>
              <Label>Interview Outcome</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, outcome: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selected">Selected</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="waiting">Waiting for Result</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Upload Files (Optional)</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="file:mr-2 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can upload question papers, notes, or any relevant documents
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Review Your Experience</h3>
              <p className="text-muted-foreground">
                Please review all the information before submitting
              </p>
            </div>
            
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div><strong>Company:</strong> {formData.company}</div>
              <div><strong>Role:</strong> {formData.role}</div>
              <div><strong>Rounds:</strong> {formData.rounds.join(", ")}</div>
              <div><strong>Difficulty:</strong> {formData.difficulty}</div>
              <div><strong>Files:</strong> {formData.files.length} files uploaded</div>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">🎉 Reward Information</h4>
              <p className="text-sm">
                By sharing this detailed experience, you'll earn <strong>50 coins</strong> that can be used in the rewards store!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Share Your Interview Experience
        </CardTitle>
        
        {/* Status Bar */}
        <div className="space-y-3">
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStepContent()}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={
                (currentStep === 1 && (!formData.company || !formData.role)) ||
                (currentStep === 2 && formData.rounds.length === 0)
              }
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="btn-gradient">
              Submit Experience
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSharingForm;
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
import { useAuth } from "@/contexts/auth-context";

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
  const { updateWallet } = useAuth();

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
    // Update wallet balance
    updateWallet(50);
    
    // Trigger fireworks effect
    const triggerFireworks = async () => {
      const { default: confetti } = await import('canvas-confetti');
      
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
      }, 250);
    };

    triggerFireworks();
    
    toast({
      title: "🎉 Experience Shared Successfully!",
      description: "Congratulations! You've earned 50 coins for sharing your interview experience.",
      duration: 5000,
    });
    
    setTimeout(() => {
      onClose?.();
    }, 1000);
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

            <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6 rounded-xl border-2 border-primary/30 shadow-lg animate-pulse">
              <h4 className="font-bold text-primary mb-3 text-lg flex items-center gap-2">
                🎉 Amazing Reward Incoming!
              </h4>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-primary mb-2">+50 COINS</div>
                <p className="text-sm text-muted-foreground">
                  By sharing this detailed experience, you'll earn <strong className="text-primary">50 coins</strong> that can be used in the rewards store!
                </p>
                <div className="mt-3 p-2 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-xs text-success font-medium">🚀 Plus fireworks celebration on submit!</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="glass shadow-hero animate-scale max-h-[85vh] overflow-hidden flex flex-col">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-center text-gradient-primary flex items-center justify-center gap-2">
            <Building2 className="h-6 w-6" />
            Share Your Interview Experience
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Help fellow students by sharing your interview journey
          </p>
          
          {/* Status Bar */}
          <div className="space-y-4 mt-6">
            <Progress value={(currentStep / steps.length) * 100} className="h-3" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.id 
                      ? 'bg-primary text-primary-foreground shadow-button' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-center font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 flex-1 overflow-y-auto">
          <div className="bg-gradient-card p-6 rounded-lg">
            {renderStepContent()}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-6"
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
                className="btn-gradient px-6"
              >
                Next Step
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="btn-gradient px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                ✨ Share & Earn 50 Coins ✨
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceSharingForm;
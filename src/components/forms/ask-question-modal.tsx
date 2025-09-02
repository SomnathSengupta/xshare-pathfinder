import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AskQuestionModal = ({ isOpen, onClose }: AskQuestionModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [] as string[],
    isAnonymous: false,
    tagInput: ""
  });
  const { toast } = useToast();

  const categories = [
    "Interview Preparation",
    "Technical Questions", 
    "Behavioral Questions",
    "System Design",
    "Career Guidance",
    "Company Culture",
    "Salary & Negotiation",
    "General Discussion"
  ];

  const popularTags = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta",
    "Software Engineer", "Product Manager", "Data Scientist",
    "Frontend", "Backend", "Fullstack", "DevOps",
    "Fresher", "Experienced", "Remote", "Onsite"
  ];

  const handleAddTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: ""
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question Posted Successfully! 🎉",
      description: "Your question has been posted to the community forum.",
    });
    
    // Reset form
    setFormData({
      title: "",
      content: "",
      category: "",
      tags: [],
      isAnonymous: false,
      tagInput: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Ask a Question
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Title */}
          <div>
            <Label htmlFor="title">Question Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What's your question? Be specific and clear"
              className="mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Question Content */}
          <div>
            <Label htmlFor="content">Question Details *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Provide more details about your question. Include any context, specific scenarios, or examples that might help others understand and answer better."
              rows={6}
              className="mt-1"
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags (Optional)</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add relevant tags to help others find your question
            </p>
            
            {/* Popular Tags */}
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">Popular Tags:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={formData.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => 
                      formData.tags.includes(tag) 
                        ? handleRemoveTag(tag)
                        : handleAddTag(tag)
                    }
                  >
                    {tag}
                    {formData.tags.includes(tag) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Custom Tag Input */}
            <div className="flex gap-2">
              <Input
                value={formData.tagInput}
                onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                placeholder="Add custom tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(formData.tagInput);
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAddTag(formData.tagInput)}
                disabled={!formData.tagInput.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Selected Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <X 
                        className="h-3 w-3 ml-1 cursor-pointer" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked }))}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Post anonymously
            </Label>
          </div>

          {/* Info Box */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">💡 Tips for Better Answers</h4>
            <ul className="text-sm space-y-1">
              <li>• Be specific about your situation and background</li>
              <li>• Include relevant company names or role types</li>
              <li>• Mention what you've already tried or researched</li>
              <li>• Use appropriate tags to reach the right audience</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-gradient">
              Post Question
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionModal;
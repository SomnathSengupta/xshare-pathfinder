import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, ShoppingCart, Gift, Headphones, Backpack } from "lucide-react";
import waterBottleImage from "@/assets/water-bottle-headphones.jpg";
import bagsImage from "@/assets/bags-collection.jpg";

const RewardsStore = () => {
  const [walletBalance] = useState(1250);

  const rewards = [
    {
      id: 1,
      name: "XShare Water Bottle + Stickers",
      description: "Premium water bottle with XShare logo and exclusive sticker pack",
      price: 500,
      image: waterBottleImage,
      icon: Gift,
      inStock: true,
      category: "Merchandise"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones perfect for study sessions",
      price: 1000,
      image: waterBottleImage,
      icon: Headphones,
      inStock: true,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Premium Laptop Bag",
      description: "Durable and stylish laptop bag for professionals",
      price: 1500,
      image: bagsImage,
      icon: Backpack,
      inStock: true,
      category: "Accessories"
    },
    {
      id: 4,
      name: "XShare Backpack",
      description: "Spacious backpack with multiple compartments and XShare branding",
      price: 2000,
      image: bagsImage,
      icon: Backpack,
      inStock: false,
      category: "Merchandise"
    }
  ];

  const canAfford = (price: number) => walletBalance >= price;

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        {/* Energetic Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Rewards Store ✨
                    </h1>
                    <p className="text-muted-foreground text-lg">Transform your achievements into amazing rewards!</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Card className="px-4 py-3 bg-background/80 backdrop-blur-sm border-2 border-primary/20">
                    <div className="flex items-center space-x-3">
                      <Coins className="h-6 w-6 coin-pulse text-warning" />
                      <div>
                        <div className="text-2xl font-bold text-primary">{walletBalance}</div>
                        <div className="text-sm text-muted-foreground">Available Coins</div>
                      </div>
                    </div>
                  </Card>
                  <Button className="btn-gradient">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {rewards.map((reward) => {
            const affordable = canAfford(reward.price);
            const IconComponent = reward.icon;
            
            return (
              <Card key={reward.id} className={`card-hover group relative overflow-hidden ${!affordable && 'opacity-60'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="w-full h-48 bg-muted rounded-lg overflow-hidden mb-4 relative">
                    <img 
                      src={reward.image} 
                      alt={reward.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {!reward.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="w-fit">
                      {reward.category}
                    </Badge>
                    {reward.inStock && (
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">Available</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-sm mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-warning/10">
                      <Coins className="h-5 w-5 text-warning coin-pulse" />
                      <span className="text-xl font-bold text-warning">{reward.price}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full transition-all ${affordable && reward.inStock ? 'btn-gradient shadow-lg hover:shadow-xl' : ''}`}
                    disabled={!affordable || !reward.inStock}
                    variant={affordable && reward.inStock ? "default" : "secondary"}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {!reward.inStock ? 'Out of Stock' : 
                     !affordable ? 'Insufficient Coins' : 'Redeem Now'}
                  </Button>

                  {!affordable && reward.inStock && (
                    <div className="mt-3 p-2 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-xs text-accent font-medium text-center">
                        Need {reward.price - walletBalance} more coins to unlock!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How to Earn More Coins */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-gradient-to-br from-warning to-accent rounded-lg">
                  <Coins className="h-6 w-6 text-white coin-pulse" />
                </div>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Boost Your Earnings! 🚀
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/20 card-hover">
                  <div className="text-4xl font-bold text-primary mb-3 animate-pulse">+50</div>
                  <div className="font-semibold mb-2 text-lg">Share Experience</div>
                  <div className="text-sm text-muted-foreground">Share detailed interview experiences and help others succeed</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-secondary/20 card-hover">
                  <div className="text-4xl font-bold text-secondary mb-3 animate-pulse">+5</div>
                  <div className="font-semibold mb-2 text-lg">Answer Questions</div>
                  <div className="text-sm text-muted-foreground">Help fellow students in our Q&A community forum</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-accent/20 card-hover">
                  <div className="text-4xl font-bold text-accent mb-3 animate-pulse">+10</div>
                  <div className="font-semibold mb-2 text-lg">Daily Streak</div>
                  <div className="text-sm text-muted-foreground">Maintain daily activity and build your momentum</div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default RewardsStore;
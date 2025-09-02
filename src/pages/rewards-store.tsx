import Layout from "@/components/layout/layout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, ShoppingCart, Gift, Headphones, Backpack } from "lucide-react";

const RewardsStore = () => {
  const [walletBalance] = useState(1250);

  const rewards = [
    {
      id: 1,
      name: "XShare Water Bottle + Stickers",
      description: "Premium water bottle with XShare logo and exclusive sticker pack",
      price: 500,
      image: "/placeholder.svg",
      icon: Gift,
      inStock: true,
      category: "Merchandise"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "High-quality wireless headphones perfect for study sessions",
      price: 1000,
      image: "/placeholder.svg", 
      icon: Headphones,
      inStock: true,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Premium Laptop Bag",
      description: "Durable and stylish laptop bag for professionals",
      price: 1500,
      image: "/placeholder.svg",
      icon: Backpack,
      inStock: true,
      category: "Accessories"
    },
    {
      id: 4,
      name: "XShare Backpack",
      description: "Spacious backpack with multiple compartments and XShare branding",
      price: 2000,
      image: "/placeholder.svg",
      icon: Backpack,
      inStock: false,
      category: "Merchandise"
    }
  ];

  const canAfford = (price: number) => walletBalance >= price;

  return (
    <Layout userRole="student">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rewards Store</h1>
            <p className="text-muted-foreground">Redeem your coins for awesome rewards</p>
          </div>
          
          <Card className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <Coins className="h-8 w-8 coin-pulse" />
              <div>
                <div className="text-2xl font-bold">{walletBalance}</div>
                <div className="text-sm text-muted-foreground">Available Coins</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const affordable = canAfford(reward.price);
            const IconComponent = reward.icon;
            
            return (
              <Card key={reward.id} className={`card-hover ${!affordable && 'opacity-60'}`}>
                <CardHeader>
                  <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {reward.category}
                  </Badge>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Coins className="h-5 w-5 text-warning" />
                      <span className="text-xl font-bold">{reward.price}</span>
                    </div>
                    {reward.inStock ? (
                      <Badge variant="secondary" className="text-xs">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!affordable || !reward.inStock}
                    variant={affordable && reward.inStock ? "default" : "secondary"}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {!reward.inStock ? 'Out of Stock' : 
                     !affordable ? 'Insufficient Coins' : 'Redeem Now'}
                  </Button>

                  {!affordable && reward.inStock && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Need {reward.price - walletBalance} more coins
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How to Earn More Coins */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              How to Earn More Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">+50</div>
                <div className="font-medium mb-1">Share Experience</div>
                <div className="text-sm text-muted-foreground">Share detailed interview experiences</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-secondary mb-2">+5</div>
                <div className="font-medium mb-1">Answer Questions</div>
                <div className="text-sm text-muted-foreground">Help others in Q&A forum</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-accent mb-2">+10</div>
                <div className="font-medium mb-1">Daily Streak</div>
                <div className="text-sm text-muted-foreground">Maintain daily activity streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default RewardsStore;
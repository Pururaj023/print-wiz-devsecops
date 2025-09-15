import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Truck, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface OrderSummaryProps {
  hasModel: boolean;
  price: number;
  estimatedTime: number;
}

export const OrderSummary = ({ hasModel, price, estimatedTime }: OrderSummaryProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const shippingCost = 9.99;
  const tax = price * 0.08; // 8% tax
  const total = price + shippingCost + tax;

  const handlePayment = async () => {
  const newOrder = {
    orderId: `ORD-${Date.now().toString().slice(-6)}`,
    email: (document.getElementById("email") as HTMLInputElement).value,
    firstName: (document.getElementById("firstName") as HTMLInputElement).value,
    lastName: (document.getElementById("lastName") as HTMLInputElement).value,
    address: (document.getElementById("address") as HTMLInputElement).value,
    city: (document.getElementById("city") as HTMLInputElement).value,
    zip: (document.getElementById("zip") as HTMLInputElement).value,
    fileName: "uploaded_model.stl",
    price: total,
    orderDate: new Date().toISOString().split("T")[0],
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "pending",
  progress: 0,           // start at 0%
  };
   try {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (res.ok) {
      toast({
        title: "Order Placed Successfully!",
        description: `Order ${newOrder.orderId} has been saved.`,
      });
      navigate("/cart");
    } else {
      toast({
        title: "Error",
        description: "Something went wrong while saving the order.",
        variant: "destructive",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Could not connect to server.",
      variant: "destructive",
    });
  }


    // // Save to localStorage
    // const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    // toast({
    //   title: "Order Placed Successfully!",
    //   description: `Order ${newOrder.id} has been created and is pending processing.`,
    // });

    // // Navigate to cart page
    // navigate('/cart');
  };

  if (!hasModel) {
    return (
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Order Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Complete your customization to see the order summary
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Order Summary & Checkout
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Review your order details and proceed to secure checkout. 
            We'll keep you updated throughout the printing process.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Print cost:</span>
                  <span className="font-medium">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%):</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Estimated Timeline</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Printing: {estimatedTime.toFixed(1)} hours</p>
                      <p className="text-sm text-muted-foreground">Starts within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                    <div>
                      <p className="font-medium">Quality check & packaging</p>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                    <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                    <div>
                      <p className="font-medium">Shipping to you</p>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Shipping & Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handlePayment}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
                
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span>Fast Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Money Back</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
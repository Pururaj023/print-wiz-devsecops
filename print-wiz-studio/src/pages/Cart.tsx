import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  order_id: string;
  file_name: string;
  status: "pending" | "printing" | "quality-check" | "shipping" | "delivered";
  price: number;
  order_date: string;
  delivery_date: string;
}

const Cart = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders") // ✅ fix URL
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("❌ Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "printing": return "bg-blue-500";
      case "quality-check": return "bg-purple-500";
      case "shipping": return "bg-orange-500";
      case "delivered": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "printing": return "Printing";
      case "quality-check": return "Quality Check";
      case "shipping": return "Shipping";
      case "delivered": return "Delivered";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-muted-foreground">Track your 3D printing orders</p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading orders...</p>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground mt-4">No Orders Yet</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by uploading a 3D model and placing your first order
                </p>
                <Link to="/"><Button>Start Printing</Button></Link>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.order_id}>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    Order {order.order_id}
                  </CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p><strong>File:</strong> {order.file_name}</p>
                  <p><strong>Price:</strong> ${order.price}</p>
                  <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                  <p><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import dragonFigurine from "@/assets/dragon-figurine.jpg";
import phoneStand from "@/assets/phone-stand.jpg";
import miniatureHouse from "@/assets/miniature-house.jpg";
import gearMechanism from "@/assets/gear-mechanism.jpg";
import customVase from "@/assets/custom-vase.jpg";
import robotActionFigure from "@/assets/robot-action-figure.jpg";

interface GalleryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: 'Simple' | 'Medium' | 'Complex';
  printTime: string;
  material: string;
  image: string;
  rating: number;
  downloads: number;
}

const Gallery = () => {
  const galleryItems: GalleryItem[] = [
    {
      id: "1",
      name: "Dragon Figurine",
      description: "Detailed fantasy dragon with intricate scales and wings",
      category: "Figurines",
      complexity: "Complex",
      printTime: "8-12 hours",
      material: "PLA",
      image: dragonFigurine,
      rating: 4.8,
      downloads: 2547
    },
    {
      id: "2", 
      name: "Phone Stand",
      description: "Adjustable phone stand with cable management",
      category: "Accessories",
      complexity: "Simple",
      printTime: "2-3 hours",
      material: "PETG",
      image: phoneStand,
      rating: 4.6,
      downloads: 1823
    },
    {
      id: "3",
      name: "Miniature House",
      description: "Victorian-style dollhouse with removable roof",
      category: "Architecture",
      complexity: "Medium",
      printTime: "6-8 hours", 
      material: "PLA",
      image: miniatureHouse,
      rating: 4.9,
      downloads: 943
    },
    {
      id: "4",
      name: "Gear Mechanism",
      description: "Working gear system for educational purposes",
      category: "Mechanical",
      complexity: "Medium",
      printTime: "4-6 hours",
      material: "ABS",
      image: gearMechanism,
      rating: 4.7,
      downloads: 1654
    },
    {
      id: "5",
      name: "Custom Vase",
      description: "Spiral vase with modern geometric patterns",
      category: "Home Decor",
      complexity: "Simple",
      printTime: "3-4 hours",
      material: "PLA",
      image: customVase,
      rating: 4.5,
      downloads: 876
    },
    {
      id: "6",
      name: "Robot Action Figure",
      description: "Articulated robot with moveable joints",
      category: "Toys",
      complexity: "Complex",
      printTime: "10-14 hours",
      material: "PETG",
      image: robotActionFigure,
      rating: 4.8,
      downloads: 2103
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';  
      case 'Complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Model Gallery</h1>
            <p className="text-muted-foreground">Explore our collection of 3D printable models</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getComplexityColor(item.complexity)}>
                    {item.complexity}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Category: {item.category}</span>
                  <span>Material: {item.material}</span>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Print Time: {item.printTime}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {item.downloads} downloads
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
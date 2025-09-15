import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-sm font-bold text-primary-foreground">3D</span>
              </div>
              <span className="text-xl font-bold">PrintHub</span>
            </div>
            <p className="text-sm text-background/70">
              Professional 3D printing services with premium materials and fast turnaround times.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button variant="secondary" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <div className="space-y-2 text-sm text-background/70">
              <a href="#" className="block hover:text-background transition-colors">3D Printing</a>
              <a href="#" className="block hover:text-background transition-colors">Rapid Prototyping</a>
              <a href="#" className="block hover:text-background transition-colors">Custom Manufacturing</a>
              <a href="#" className="block hover:text-background transition-colors">Design Consultation</a>
              <a href="#" className="block hover:text-background transition-colors">Material Selection</a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <div className="space-y-2 text-sm text-background/70">
              <a href="#" className="block hover:text-background transition-colors">Help Center</a>
              <a href="#" className="block hover:text-background transition-colors">File Requirements</a>
              <a href="#" className="block hover:text-background transition-colors">Shipping & Returns</a>
              <a href="#" className="block hover:text-background transition-colors">Quality Guarantee</a>
              <a href="#" className="block hover:text-background transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@printhub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Maker St, Tech City, TC 12345</span>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-background/70 hover:text-background">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-background/70 hover:text-background">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-background/70 hover:text-background">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-background/70 hover:text-background">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <div>
            © 2024 PrintHub. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-3d-printing.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Bring Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Ideas </span>
              to Life
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Professional 3D printing services with premium materials, fast turnaround, 
              and competitive pricing. Upload your model and get instant quotes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="group"
              onClick={scrollToUpload}
            >
              <Upload className="w-5 h-5" />
              Upload Your Model
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/gallery')}>
              View Gallery
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Fast Turnaround</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Materials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
          <img 
            src={heroImage} 
            alt="Professional 3D printing services" 
            className="relative z-10 rounded-3xl shadow-large w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};
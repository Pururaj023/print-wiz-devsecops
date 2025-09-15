import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Settings, Palette, Layers, Clock, DollarSign } from "lucide-react";

interface Material {
  id: string;
  name: string;
  description: string;
  costMultiplier: number;
  color: string;
}

interface Quality {
  id: string;
  name: string;
  description: string;
  costMultiplier: number;
  timeMultiplier: number;
}

const materials: Material[] = [
  { id: 'pla', name: 'PLA', description: 'Biodegradable, easy to print', costMultiplier: 1, color: '#10b981' },
  { id: 'abs', name: 'ABS', description: 'Strong, heat resistant', costMultiplier: 1.2, color: '#f59e0b' },
  { id: 'petg', name: 'PETG', description: 'Clear, chemical resistant', costMultiplier: 1.4, color: '#3b82f6' },
  { id: 'resin', name: 'Resin', description: 'High detail, smooth finish', costMultiplier: 2, color: '#8b5cf6' },
  { id: 'nylon', name: 'Nylon', description: 'Very strong, flexible', costMultiplier: 2.5, color: '#ef4444' },
];

const qualities: Quality[] = [
  { id: 'draft', name: 'Draft', description: '0.3mm layer height', costMultiplier: 0.8, timeMultiplier: 0.6 },
  { id: 'standard', name: 'Standard', description: '0.2mm layer height', costMultiplier: 1, timeMultiplier: 1 },
  { id: 'fine', name: 'Fine', description: '0.15mm layer height', costMultiplier: 1.3, timeMultiplier: 1.5 },
  { id: 'ultra', name: 'Ultra Fine', description: '0.1mm layer height', costMultiplier: 1.8, timeMultiplier: 2.2 },
];

interface CustomizationPanelProps {
  hasModel: boolean;
  onPriceChange: (price: number) => void;
  onTimeChange: (hours: number) => void;
}

export const CustomizationPanel = ({ hasModel, onPriceChange, onTimeChange }: CustomizationPanelProps) => {
  const [selectedMaterial, setSelectedMaterial] = useState('pla');
  const [selectedQuality, setSelectedQuality] = useState('standard');
  const [scale, setScale] = useState([100]);
  
  const baseCost = 25; // Base cost in dollars
  const baseTime = 4; // Base time in hours

  const calculatePrice = () => {
    const material = materials.find(m => m.id === selectedMaterial);
    const quality = qualities.find(q => q.id === selectedQuality);
    const scaleMultiplier = Math.pow(scale[0] / 100, 2.5); // Volume scales with cube of linear scale
    
    return baseCost * (material?.costMultiplier || 1) * (quality?.costMultiplier || 1) * scaleMultiplier;
  };

  const calculateTime = () => {
    const quality = qualities.find(q => q.id === selectedQuality);
    const scaleMultiplier = Math.pow(scale[0] / 100, 2); // Time scales roughly with area
    
    return baseTime * (quality?.timeMultiplier || 1) * scaleMultiplier;
  };

  useEffect(() => {
    if (hasModel) {
      const price = calculatePrice();
      const time = calculateTime();
      onPriceChange(price);
      onTimeChange(time);
    }
  }, [selectedMaterial, selectedQuality, scale, hasModel]);

  if (!hasModel) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="py-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Settings className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Customization Options</p>
                  <p className="text-sm text-muted-foreground">
                    Upload a model to customize materials, quality, and size
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customize Your Print
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred material, quality settings, and size. 
            See real-time pricing and time estimates as you customize.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Customization Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Print Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Material Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Material
                </Label>
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material.id} value={material.id}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: material.color }}
                          />
                          <div>
                            <div className="font-medium">{material.name}</div>
                            <div className="text-sm text-muted-foreground">{material.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Print Quality
                </Label>
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualities.map((quality) => (
                      <SelectItem key={quality.id} value={quality.id}>
                        <div>
                          <div className="font-medium">{quality.name}</div>
                          <div className="text-sm text-muted-foreground">{quality.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size/Scale */}
              <div className="space-y-3">
                <Label>Size Scale: {scale[0]}%</Label>
                <Slider
                  value={scale}
                  onValueChange={setScale}
                  max={200}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>25% (Miniature)</span>
                  <span>100% (Original)</span>
                  <span>200% (Large)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Estimates */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-brand-blue" />
                    <div>
                      <p className="font-medium">Total Cost</p>
                      <p className="text-sm text-muted-foreground">Including materials & printing</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ${calculatePrice().toFixed(2)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      + shipping
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-brand-purple" />
                    <div>
                      <p className="font-medium">Print Time</p>
                      <p className="text-sm text-muted-foreground">Estimated production time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {calculateTime().toFixed(1)}h
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      + 1-2 days shipping
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Cost Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base cost:</span>
                    <span>${baseCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Material ({materials.find(m => m.id === selectedMaterial)?.name}):</span>
                    <span>×{materials.find(m => m.id === selectedMaterial)?.costMultiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality ({qualities.find(q => q.id === selectedQuality)?.name}):</span>
                    <span>×{qualities.find(q => q.id === selectedQuality)?.costMultiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Scale ({scale[0]}%):</span>
                    <span>×{(Math.pow(scale[0] / 100, 2.5)).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${calculatePrice().toFixed(2)}</span>
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
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ModelUploadAndViewer } from '@/components/ModelUploadAndViewer';
import { CustomizationPanel } from '@/components/CustomizationPanel';
import { OrderSummary } from '@/components/OrderSummary';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  const handlePriceChange = (price: number) => {
    setCurrentPrice(price);
  };

  const handleTimeChange = (time: number) => {
    setEstimatedTime(time);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ModelUploadAndViewer onFileUpload={handleFileUpload} />
      <CustomizationPanel 
        hasModel={!!uploadedFile} 
        onPriceChange={handlePriceChange}
        onTimeChange={handleTimeChange}
      />
      <OrderSummary 
        hasModel={!!uploadedFile} 
        price={currentPrice}
        estimatedTime={estimatedTime}
      />
      <Footer />
    </div>
  );
};

export default Index;

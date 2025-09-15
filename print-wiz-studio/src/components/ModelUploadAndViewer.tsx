import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage, Environment } from '@react-three/drei';
import { STLLoader } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import { PLYLoader } from 'three-stdlib';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File, CheckCircle, AlertCircle, Eye, RotateCw, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Box3, Vector3 } from 'three';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
  url?: string;
}

interface ModelUploadAndViewerProps {
  onFileUpload?: (file: File) => void;
}

// Component to load and display 3D models
const Model3D = ({ file }: { file: File }) => {
  const meshRef = useRef<any>();
  const [modelData, setModelData] = useState<any>(null);

  useEffect(() => {
    if (!file) return;

    const loadModel = async () => {
      try {
        const url = URL.createObjectURL(file);
        const extension = file.name.split('.').pop()?.toLowerCase();
        
        let loader;
        switch (extension) {
          case 'stl':
            loader = new STLLoader();
            break;
          case 'obj':
            loader = new OBJLoader();
            break;
          case 'ply':
            loader = new PLYLoader();
            break;
          default:
            console.error('Unsupported file format');
            return;
        }

        const geometry = await new Promise((resolve, reject) => {
          loader.load(
            url,
            (result: any) => {
              resolve(extension === 'obj' ? result.children[0].geometry : result);
            },
            undefined,
            reject
          );
        });

        setModelData(geometry);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, [file]);

  useEffect(() => {
    if (modelData && meshRef.current) {
      // Center and scale the model
      const box = new Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 5 / maxDim;
      
      meshRef.current.geometry.center();
      meshRef.current.scale.setScalar(scale);
      meshRef.current.position.set(0, 0, 0);
    }
  }, [modelData]);

  if (!modelData) return null;

  return (
    <mesh ref={meshRef} geometry={modelData}>
      <meshStandardMaterial color="hsl(262 83% 58%)" />
    </mesh>
  );
};

export const ModelUploadAndViewer = ({ onFileUpload }: ModelUploadAndViewerProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [currentModel, setCurrentModel] = useState<File | null>(null);

  const removeFile = useCallback((fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
    if (currentModel?.name === fileName) {
      setCurrentModel(null);
    }
  }, [currentModel]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);
    
    for (const file of acceptedFiles) {
      const newFile: UploadedFile = {
        file,
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        status: 'uploading'
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === file.name 
              ? { ...f, status: 'success' as const }
              : f
          )
        );
        setCurrentModel(file);
        onFileUpload?.(file);
        setIsUploading(false);
      }, 2000);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/ply': ['.ply'],
      'application/sla': ['.3mf']
    },
    maxFiles: 1,
    maxSize: 150 * 1024 * 1024 // 150MB
  });

  return (
    <div className="space-y-20">
      {/* Upload Section */}
      <section id="upload-section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Your 3D Model
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Drag and drop your 3D model files or click to browse. 
              We support STL, OBJ, PLY, and 3MF formats up to 150MB.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300",
                  isDragActive 
                    ? "border-primary bg-brand-blue-light" 
                    : "border-border hover:border-primary hover:bg-accent"
                )}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  {isDragActive ? (
                    <div>
                      <p className="text-lg font-medium text-primary">Drop your files here</p>
                      <p className="text-muted-foreground">Release to upload your 3D model</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Drag & drop your 3D model here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <Button variant="default">
                        Choose Files
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    Supported formats: STL, OBJ, PLY, 3MF (Max: 150MB)
                  </div>
                </div>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium text-foreground">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {file.status === 'uploading' && (
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        )}
                        {file.status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className="text-sm text-muted-foreground capitalize">
                          {file.status}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.name)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Viewer Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Interactive 3D Preview
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              View and inspect your model in our interactive 3D viewer. 
              Rotate, zoom, and examine every detail before printing.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                3D Model Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-card rounded-lg overflow-hidden border">
                {currentModel ? (
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <Suspense fallback={null}>
                      <Stage preset="rembrandt" intensity={1} environment="city">
                        <Model3D file={currentModel} />
                      </Stage>
                      <Environment preset="city" />
                      <OrbitControls 
                        enablePan={true} 
                        enableZoom={true} 
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={20}
                      />
                    </Suspense>
                  </Canvas>
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted/30">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Eye className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-2">No Model Uploaded</p>
                        <p className="text-sm text-muted-foreground">
                          Upload a 3D model to see the interactive preview
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {currentModel && (
                <div className="mt-4 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Click & drag to rotate
                  </div>
                  <div className="flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    Scroll to zoom
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

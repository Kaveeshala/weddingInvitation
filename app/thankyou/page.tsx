"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Camera, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouCardPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      // Ensure the generated image is high quality
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2, // higher resolution
        backgroundColor: "#ffffff",
      });
      
      const link = document.createElement("a");
      link.download = "thank-you-card.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("Failed to generate the card. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-md w-full mb-6 text-center space-y-2">
        <h1 className="text-3xl font-serif text-[#2f2a24]">Thank You</h1>
        <p className="text-[#7a6755]">
          Upload a photo from the event to complete this memory card, then download and share it!
        </p>
      </div>

      {/* Card Container - Aspect ratio 5:7 */}
      <div 
        ref={cardRef}
        className="w-full max-w-md bg-white shadow-2xl relative overflow-hidden"
        style={{ aspectRatio: "5/7" }}
      >
        <div className="flex flex-col h-full w-full">
          
          {/* Top: Couple Photo */}
          <div className="flex-[1.2] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" 
              alt="Couple"
              className="object-cover w-full h-full"
              crossOrigin="anonymous"
            />
          </div>

          {/* Middle: Names Divider */}
          <div className="bg-[#fcfaf8] py-2 flex flex-col justify-center border-y border-[#eadfce]">
            <div 
              className="text-[#2f2a24] text-3xl md:text-4xl flex flex-col items-center w-full leading-tight"
              style={{ fontFamily: "'Courgette', cursive" }}
            >
              <span className="pr-12">Isuru</span>
              <span className="text-[#b08d57] -mt-2 pl-16">& Dilma</span>
            </div>
          </div>

          {/* Bottom: Guest Upload Slot */}
          <div className="flex-1 relative bg-[#fcfaf8] flex flex-col items-center justify-center">
            {uploadedImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={uploadedImage} 
                  alt="Guest Photo"
                  className="object-cover w-full h-full"
                />
                {/* Re-upload button overlaid */}
                {!isGenerating && (
                  <label className="absolute bottom-3 right-3 bg-white/80 p-2.5 rounded-full cursor-pointer hover:bg-white shadow-sm transition">
                    <Camera className="w-5 h-5 text-[#2f2a24]" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f1eb] transition group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-[#b08d57]" />
                </div>
                <span className="text-[#8a7a6a] text-xs uppercase tracking-widest text-center px-4 leading-relaxed">
                  Tap to upload<br/>your photo
                </span>
                <input 
                  type="file" 
                  accept="image/*"
                  capture="environment"
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

        </div>
      </div>

      <div className="mt-8">
        <Button 
          size="lg" 
          onClick={handleDownload}
          disabled={!uploadedImage || isGenerating}
          className="rounded-full px-8 bg-[#b08d57] hover:bg-[#9a7847] text-white shadow-lg cursor-pointer transition-all"
        >
          {isGenerating ? (
            "Generating..."
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download Photo
            </>
          )}
        </Button>
        {!uploadedImage && (
          <p className="text-xs text-center text-[#8a7a6a] mt-3">
            Please upload a photo first to generate the card.
          </p>
        )}
      </div>
    </div>
  );
}

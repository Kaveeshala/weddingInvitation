"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Camera, Download, Upload, Image as ImageIcon, Camera as CameraIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ThankYouCardPage() {
  const [view, setView] = useState<'selection' | 'pre-made' | 'interactive'>('selection');

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex flex-col items-center justify-center p-4 md:p-8">
      {view === 'selection' && (
        <div className="max-w-2xl w-full text-center space-y-12 fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-[#2f2a24]">Thank You!</h1>
            <p className="text-[#7a6755] text-lg max-w-md mx-auto">
              Please choose a thank you card style below to save or share.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
            {/* Option 1: Pre-made Card */}
            <div 
              onClick={() => setView('pre-made')}
              className="group cursor-pointer flex flex-col items-center space-y-6"
            >
              <div className="w-full aspect-[5/7] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 relative bg-white border border-[#eadfce]">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 p-1">
                  <div className="col-span-2 row-span-1">
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90" alt="Couple" crossOrigin="anonymous" />
                  </div>
                  <div className="col-span-1 row-span-1">
                    <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90" alt="Couple" crossOrigin="anonymous" />
                  </div>
                  <div className="col-span-1 row-span-1">
                    <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90" alt="Couple" crossOrigin="anonymous" />
                  </div>
                </div>
                {/* Full card overlay for text readability without a harsh box */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-white p-4">
                    <p className="font-serif text-3xl drop-shadow-md" style={{ fontFamily: "'Courgette', cursive" }}>Thank You</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-[#2f2a24] flex items-center justify-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#b08d57]" />
                  Couple's Card
                </h3>
                <p className="text-sm text-[#8a7a6a]">A beautiful standard thank you card with our photos.</p>
              </div>
            </div>

            {/* Option 2: Interactive Card */}
            <div 
              onClick={() => setView('interactive')}
              className="group cursor-pointer flex flex-col items-center space-y-6"
            >
              <div className="w-full aspect-[5/7] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 relative bg-white flex flex-col border border-[#eadfce]">
                <div className="absolute inset-0 bg-[#2f2a24]/5 group-hover:bg-transparent transition-colors z-10" />
                <div className="flex-[1.2]">
                  <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-80" alt="Top Half" />
                </div>
                <div className="bg-[#fcfaf8] py-2 border-y border-[#eadfce] text-center">
                   <span className="text-[#b08d57] font-serif" style={{ fontFamily: "'Courgette', cursive" }}>Isuru & Dilma</span>
                </div>
                <div className="flex-1 bg-[#f5f1eb] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#b08d57]">
                    <CameraIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-medium text-[#2f2a24] flex items-center justify-center gap-2">
                  <CameraIcon className="w-5 h-5 text-[#b08d57]" />
                  Create Your Own
                </h3>
                <p className="text-sm text-[#8a7a6a]">Upload your own photo from the wedding to create a memory!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'pre-made' && (
        <PreMadeCard onBack={() => setView('selection')} />
      )}

      {view === 'interactive' && (
        <InteractiveCard onBack={() => setView('selection')} />
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// PRE-MADE CARD COMPONENT
// ----------------------------------------------------------------------
function PreMadeCard({ onBack }: { onBack: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "thank-you-isuru-dilma.png";
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
    <div className="w-full max-w-md flex flex-col items-center fade-in">
      <div className="w-full flex justify-start mb-6">
        <Button onClick={onBack} variant="ghost" className="text-[#8a7a6a] hover:text-[#2f2a24] hover:bg-[#f5f1eb]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
        </Button>
      </div>

      <div 
        ref={cardRef}
        className="w-full bg-white shadow-2xl relative overflow-hidden"
        style={{ aspectRatio: "5/7" }}
      >
        {/* 3 Photo Collage Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1.5 p-2 bg-white">
          <div className="col-span-2 row-span-1 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Photo 1" crossOrigin="anonymous" />
          </div>
          <div className="col-span-1 row-span-1 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Photo 2" crossOrigin="anonymous" />
          </div>
          <div className="col-span-1 row-span-1 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Photo 3" crossOrigin="anonymous" />
          </div>
        </div>

        {/* Global elegant overlay to make text pop without a solid box */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Text floating in the middle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none text-white text-center">
             <h2 className="text-5xl mb-3 drop-shadow-lg" style={{ fontFamily: "'Courgette', cursive" }}>
               Thank You
             </h2>
             <div className="w-16 h-px bg-white/70 mx-auto mb-5 drop-shadow-md"></div>
             <p className="text-sm leading-relaxed tracking-wide drop-shadow-md max-w-xs font-light">
               For sharing our joy and making our wedding day so special.
             </p>
             <p className="text-[#e2d5c3] mt-6 text-3xl drop-shadow-lg" style={{ fontFamily: "'Courgette', cursive" }}>
               Isuru & Dilma
             </p>
        </div>
      </div>

      <div className="mt-8">
        <Button 
          size="lg" 
          onClick={handleDownload}
          disabled={isGenerating}
          className="rounded-full px-8 bg-[#b08d57] hover:bg-[#9a7847] text-white shadow-lg cursor-pointer transition-all"
        >
          {isGenerating ? "Generating..." : <><Download className="w-4 h-4 mr-2" /> Download Card</>}
        </Button>
      </div>
    </div>
  );
}


// ----------------------------------------------------------------------
// INTERACTIVE CARD COMPONENT (Original UI)
// ----------------------------------------------------------------------
function InteractiveCard({ onBack }: { onBack: () => void }) {
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
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "my-thank-you-card.png";
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
    <div className="w-full max-w-md flex flex-col items-center fade-in">
      <div className="w-full flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="ghost" className="text-[#8a7a6a] hover:text-[#2f2a24] hover:bg-[#f5f1eb] -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <span className="text-sm text-[#7a6755] font-medium">Create Your Own</span>
      </div>

      <div 
        ref={cardRef}
        className="w-full bg-white shadow-2xl relative overflow-hidden border border-[#eadfce]"
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
          <div className="flex-1 relative bg-[#fcfaf8] flex flex-col items-center justify-center overflow-hidden">
            {uploadedImage ? (
              <div className="w-full h-full cursor-move">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={4}
                  centerOnInit
                >
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={uploadedImage} 
                      alt="Guest Photo"
                      className="object-cover w-full h-full pointer-events-none"
                    />
                  </TransformComponent>
                </TransformWrapper>
                {/* Overlay Hint */}
                {!isGenerating && (
                  <div className="absolute top-2 left-0 w-full flex justify-center pointer-events-none">
                    <span className="bg-black/50 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm">
                      Pinch & drag to adjust
                    </span>
                  </div>
                )}
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
              </div>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f1eb] transition group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-[#eadfce]">
                  <Upload className="w-6 h-6 text-[#b08d57]" />
                </div>
                <span className="text-[#8a7a6a] text-xs uppercase tracking-widest text-center px-4 leading-relaxed">
                  Tap to upload<br/>your photo
                </span>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <Button 
          size="lg" 
          onClick={handleDownload}
          disabled={!uploadedImage || isGenerating}
          className="rounded-full px-8 bg-[#b08d57] hover:bg-[#9a7847] text-white shadow-lg cursor-pointer transition-all"
        >
          {isGenerating ? "Generating..." : <><Download className="w-4 h-4 mr-2" /> Download Photo</>}
        </Button>
        {!uploadedImage && (
          <p className="text-xs text-center text-[#8a7a6a] mt-3 max-w-xs">
            Please upload a photo from the event first to generate your custom memory card.
          </p>
        )}
      </div>
    </div>
  );
}

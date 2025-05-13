
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FileUp, FilePlus2, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`p-6 border-2 border-dashed transition-all duration-300 ${
      isDragging ? 'border-resume-primary bg-resume-light/40 shadow-glow' : 'border-resume-light'
    } rounded-xl`}>
      <div 
        className="flex flex-col items-center justify-center py-10"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx"
        />

        <div className="mb-6">
          {selectedFile ? (
            <div className="h-20 w-20 bg-resume-light rounded-full flex items-center justify-center animate-pulse-soft">
              <FilePlus2 size={36} className="text-resume-primary" />
            </div>
          ) : (
            <div className="h-20 w-20 bg-resume-light rounded-full flex items-center justify-center group-hover:animate-bounce">
              <FileUp size={36} className="text-resume-primary" />
            </div>
          )}
        </div>

        {selectedFile ? (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Selected file:</p>
            <p className="font-medium text-resume-primary mb-4">{selectedFile.name}</p>
            {isProcessing ? (
              <div className="flex items-center gap-2 text-resume-primary">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing resume...</span>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={triggerFileInput}
                className="border-resume-light text-resume-primary hover:bg-resume-light/50 hover:text-resume-primary"
              >
                Change file
              </Button>
            )}
          </div>
        ) : (
          <>
            <p className="mb-2 text-xl font-semibold text-resume-primary">
              Drag and drop your resume
            </p>
            <p className="mb-4 text-sm text-gray-500">
              Support for PDF and Word documents
            </p>
            <Button 
              onClick={triggerFileInput}
              className="bg-resume-primary hover:bg-resume-dark transition-colors"
              disabled={isProcessing}
            >
              <FileUp size={18} className="mr-2" />
              Select file
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default FileUploader;

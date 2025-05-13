
import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import FileUploader from './FileUploader';
import ResumeAnalyzer from './ResumeAnalyzer';
import CandidateCard from './CandidateCard';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownToLine, ArrowUp, Download, Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { extractResumeData } from '@/lib/resumeParser';

const ResumeParser: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>('upload');
  const [savedResumes, setSavedResumes] = useState<ResumeData[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Simulate AI processing with a delay
      setTimeout(() => {
        const data = extractResumeData(file);
        setResumeData(data);
        toast.success("Resume parsed successfully!");
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      toast.error("Error parsing the resume");
      setIsProcessing(false);
    }
  };

  const handleSaveResume = () => {
    if (resumeData) {
      const newSavedResumes = [...savedResumes, resumeData];
      setSavedResumes(newSavedResumes);
      toast.success("Resume saved to candidates");
      setSelectedTab('candidates');
    }
  };

  const handleCandidateClick = (index: number) => {
    setSelectedCandidate(index);
    setResumeData(savedResumes[index]);
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-resume-primary mb-2">Resume Parser</h1>
        <p className="text-gray-600">Extract and organize information from resumes using AI</p>
      </header>

      <Tabs 
        defaultValue="upload" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-3 w-auto">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <ArrowUp size={16} />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2">
              <UserPlus size={16} />
              <span>Candidates</span>
              {savedResumes.length > 0 && (
                <span className="ml-1 text-xs bg-resume-primary text-white rounded-full px-1.5">
                  {savedResumes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download size={16} />
              <span>Export</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upload" className="space-y-6 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <FileUploader 
                onFileSelect={handleFileSelect} 
                isProcessing={isProcessing} 
              />
              
              {resumeData && (
                <div className="mt-6 animate-slide-up">
                  <Button 
                    className="w-full bg-resume-secondary hover:bg-resume-secondary/90"
                    onClick={handleSaveResume}
                  >
                    <UserPlus size={16} className="mr-2" />
                    Add to Candidates
                  </Button>
                </div>
              )}
            </div>
            
            {resumeData && <ResumeAnalyzer resumeData={resumeData} />}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="animate-fade-in">
          {savedResumes.length === 0 ? (
            <div className="text-center p-10 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No candidates yet</h3>
              <p className="text-gray-500 mb-4">Upload and save resumes to see them here</p>
              <Button onClick={() => setSelectedTab('upload')}>
                Upload Resume
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates..."
                    className="pl-9"
                  />
                </div>
                
                <div className="space-y-3">
                  {savedResumes.map((resume, index) => (
                    <CandidateCard 
                      key={index}
                      personalInfo={resume.personalInfo}
                      topSkills={resume.skills.slice(0, 3)}
                      matchScore={resume.matchPercentage || Math.floor(70 + Math.random() * 20)}
                      experience={resume.experience[0]?.position}
                      onClick={() => handleCandidateClick(index)}
                      isSelected={selectedCandidate === index}
                    />
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {selectedCandidate !== null ? (
                  <ResumeAnalyzer resumeData={savedResumes[selectedCandidate]} />
                ) : (
                  <Card className="flex items-center justify-center h-64">
                    <CardContent>
                      <p className="text-gray-500">Select a candidate to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="export" className="animate-fade-in">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Export Options</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="flex justify-start gap-2">
                <ArrowDownToLine size={18} />
                Export as CSV
              </Button>
              <Button variant="outline" className="flex justify-start gap-2">
                <ArrowDownToLine size={18} />
                Export as PDF
              </Button>
              <Button variant="outline" className="flex justify-start gap-2">
                <ArrowDownToLine size={18} />
                Export as JSON
              </Button>
            </div>
            
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Export Summary</h3>
              <p className="text-sm text-gray-600 mb-4">
                {savedResumes.length > 0
                  ? `Ready to export ${savedResumes.length} candidate records.`
                  : "No candidates available for export. Upload and save resumes first."}
              </p>
              
              <Button 
                className="bg-resume-primary hover:bg-resume-primary/90"
                disabled={savedResumes.length === 0}
              >
                <Download size={16} className="mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeParser;

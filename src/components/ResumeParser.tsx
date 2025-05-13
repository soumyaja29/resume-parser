
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
      <header className="mb-8 text-center">
        <div className="inline-block mb-2 px-4 py-1 bg-resume-light rounded-full text-resume-primary text-sm font-medium">
          AI-Powered Resume Parser
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Resume Analyzer</h1>
        <p className="text-gray-600 max-w-lg mx-auto">Extract and organize candidate information with precision using advanced AI algorithms</p>
      </header>

      <Tabs 
        defaultValue="upload" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <div className="flex justify-center items-center mb-6">
          <TabsList className="grid grid-cols-3 w-auto p-1 bg-resume-light rounded-lg">
            <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-resume-primary data-[state=active]:text-white rounded-md">
              <ArrowUp size={16} />
              <span>Upload</span>
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center gap-2 data-[state=active]:bg-resume-primary data-[state=active]:text-white rounded-md">
              <UserPlus size={16} />
              <span>Candidates</span>
              {savedResumes.length > 0 && (
                <span className="ml-1 text-xs bg-white text-resume-primary rounded-full h-5 min-w-5 inline-flex items-center justify-center px-1.5">
                  {savedResumes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2 data-[state=active]:bg-resume-primary data-[state=active]:text-white rounded-md">
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
                    className="w-full bg-resume-primary hover:bg-resume-dark transition-colors"
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
            <div className="text-center p-12 border rounded-xl bg-gradient-card">
              <div className="bg-resume-light h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <UserPlus size={24} className="text-resume-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No candidates yet</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">Upload and save resumes to build your candidate database</p>
              <Button onClick={() => setSelectedTab('upload')} className="bg-resume-primary hover:bg-resume-dark">
                Upload Resume
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="relative mb-6 bg-white rounded-lg shadow-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates..."
                    className="pl-9 border-resume-light focus-visible:ring-resume-primary"
                  />
                </div>
                
                <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-none">
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
                  <Card className="flex items-center justify-center h-64 bg-gradient-card border-resume-light">
                    <CardContent className="text-center">
                      <div className="mb-4 opacity-60">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="text-gray-500">Select a candidate to view their details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="export" className="animate-fade-in">
          <div className="bg-white p-8 rounded-xl border border-resume-light shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-resume-light p-1.5 rounded-md">
                <Download size={18} className="text-resume-primary" />
              </span>
              Export Options
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Button variant="outline" className="flex justify-start gap-2 card-hover text-resume-primary border-resume-light bg-white">
                <ArrowDownToLine size={18} />
                Export as CSV
              </Button>
              <Button variant="outline" className="flex justify-start gap-2 card-hover text-resume-primary border-resume-light bg-white">
                <ArrowDownToLine size={18} />
                Export as PDF
              </Button>
              <Button variant="outline" className="flex justify-start gap-2 card-hover text-resume-primary border-resume-light bg-white">
                <ArrowDownToLine size={18} />
                Export as JSON
              </Button>
            </div>
            
            <div className="mt-6 bg-gradient-card rounded-lg p-6">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-resume-accent"></span>
                Export Summary
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {savedResumes.length > 0
                  ? `Ready to export ${savedResumes.length} candidate records with full profile details.`
                  : "No candidates available for export. Upload and save resumes first."}
              </p>
              
              <Button 
                className="bg-resume-primary hover:bg-resume-dark transition-colors"
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


import React from 'react';
import { ResumeData } from '@/types/resume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Briefcase, Code, User2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ResumeAnalyzerProps {
  resumeData: ResumeData | null;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ resumeData }) => {
  if (!resumeData) return null;

  const { personalInfo, skills, education, experience, matchPercentage = 78 } = resumeData;

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Resume Analysis</CardTitle>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Match Score</span>
            <div className="flex items-center gap-2">
              <Progress value={matchPercentage} className="h-2 w-24" />
              <span className="font-semibold text-resume-primary">{matchPercentage}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skills">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User2 size={16} />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code size={16} />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <Book size={16} />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase size={16} />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <div className="grid gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Full Name</h4>
                <p className="text-base font-semibold">{personalInfo.name}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p className="text-sm">{personalInfo.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                  <p className="text-sm">{personalInfo.phone || "Not provided"}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                <p className="text-sm">{personalInfo.location || "Not provided"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Summary</h4>
                <p className="text-sm">{personalInfo.summary || "No summary provided"}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-resume-primary/10 text-resume-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Skills Analysis</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Skills</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="h-2 w-20" />
                      <span className="text-xs font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Required Keywords</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="h-2 w-20" />
                      <span className="text-xs font-medium">72%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education">
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <h4 className="font-medium">{edu.institution}</h4>
                  <p className="text-sm text-gray-600">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : "No date information"}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
              {education.length === 0 && <p>No education information found</p>}
            </div>
          </TabsContent>
          
          <TabsContent value="experience">
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h4 className="font-medium">{exp.position}</h4>
                  <p className="text-sm text-resume-primary">{exp.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : "No date information"}
                  </p>
                  {exp.description && exp.description.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm pl-4 relative">
                          <span className="absolute left-0 top-2 h-1 w-1 bg-resume-primary rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {experience.length === 0 && <p>No experience information found</p>}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeAnalyzer;

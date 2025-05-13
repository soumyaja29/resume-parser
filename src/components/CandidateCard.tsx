
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PersonalInfo } from '@/types/resume';
import { Mail, MapPin, Phone, Briefcase } from 'lucide-react';

interface CandidateCardProps {
  personalInfo: PersonalInfo;
  topSkills: string[];
  matchScore: number;
  experience?: string;
  onClick: () => void;
  isSelected: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  personalInfo,
  topSkills,
  matchScore,
  experience,
  onClick,
  isSelected
}) => {
  const initials = personalInfo.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <Card 
      className={`hover:shadow-md transition-all cursor-pointer ${
        isSelected ? 'border-resume-primary ring-1 ring-resume-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-resume-primary/10">
            <AvatarFallback className="text-resume-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{personalInfo.name}</h3>
                {experience && (
                  <div className="flex items-center text-sm text-gray-500 mt-0.5 gap-1">
                    <Briefcase size={13} />
                    <span>{experience}</span>
                  </div>
                )}
              </div>
              <Badge className="bg-resume-secondary hover:bg-resume-secondary/90">
                {matchScore}% match
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-3 grid gap-1.5">
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail size={14} className="text-gray-500" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone size={14} className="text-gray-500" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-gray-500" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {topSkills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-resume-primary/10 text-resume-primary rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;

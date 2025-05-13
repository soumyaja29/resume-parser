
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-resume-secondary';
    if (score >= 70) return 'bg-resume-accent';
    return 'bg-gray-500';
  };

  return (
    <Card 
      className={`card-hover cursor-pointer ${
        isSelected ? 'border-resume-primary ring-2 ring-resume-primary/20' : 'border-resume-light'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className={`h-14 w-14 border-2 ${isSelected ? 'border-resume-primary bg-resume-light' : 'border-transparent bg-resume-light/50'}`}>
            <AvatarFallback className="text-resume-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-base">{personalInfo.name}</h3>
                {experience && (
                  <div className="flex items-center text-xs text-gray-500 mt-0.5 gap-1">
                    <Briefcase size={12} />
                    <span>{experience}</span>
                  </div>
                )}
              </div>
              <Badge className={`${getScoreColor(matchScore)} text-white hover:opacity-90`}>
                {matchScore}% match
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-3 grid gap-1.5 text-sm px-1">
          {personalInfo.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={14} className="text-resume-primary/70" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={14} className="text-resume-primary/70" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={14} className="text-resume-primary/70" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {topSkills.map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-resume-light text-resume-primary rounded-full"
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

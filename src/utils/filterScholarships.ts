import { Scholarship } from '../types/scholarship';

export const filterScholarships = (
  scholarships: Scholarship[],
  searchTerm: string,
  audienceFilter: string
): Scholarship[] => {
  return scholarships.filter((scholarship) => {
    const matchesSearch = !searchTerm || 
      scholarship['Scholarship Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship['Target Audience'].toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship['Notes'].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAudience = !audienceFilter || 
      scholarship['Target Audience'] === audienceFilter;
    
    return matchesSearch && matchesAudience;
  });
};

export const getUniqueAudiences = (scholarships: Scholarship[]): string[] => {
  const audiences = scholarships.map(s => s['Target Audience']).filter(Boolean);
  return Array.from(new Set(audiences)).sort();
};
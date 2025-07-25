import { Scholarship } from '../types/scholarship';

export const filterScholarships = (
  scholarships: Scholarship[],
  searchTerm: string,
  audienceFilter: string
): Scholarship[] => {
  const normalizedSearch = searchTerm?.toLowerCase().trim() || '';
  const normalizedAudience = audienceFilter?.toLowerCase().trim() || '';

  return scholarships.filter((scholarship) => {
    const name = scholarship['Scholarship Name']?.toLowerCase() || '';
    const audience = scholarship['Target Audience']?.toLowerCase() || '';
    const notes = scholarship['Notes']?.toLowerCase() || '';

    const matchesSearch = !normalizedSearch || 
      name.includes(normalizedSearch) ||
      audience.includes(normalizedSearch) ||
      notes.includes(normalizedSearch);
    
    const matchesAudience = !normalizedAudience || 
      audience === normalizedAudience;

    return matchesSearch && matchesAudience;
  });
};

export const getUniqueAudiences = (scholarships: Scholarship[]): string[] => {
  const audiences = scholarships
    .map(s => s['Target Audience'])
    .filter((a): a is string => !!a); // loại bỏ null/undefined
  return Array.from(new Set(audiences)).sort();
};

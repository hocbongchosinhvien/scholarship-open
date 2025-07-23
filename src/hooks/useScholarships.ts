import { useState, useEffect } from 'react';
import { Scholarship } from '../types/scholarship';

const API_URL = 'https://opensheet.vercel.app/1TIB3k_yelPqLZ1euLrYEp0dxojCU_SnDtU8nXAg90hM/HocBong';

export const useScholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }
      
      setScholarships(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(`Failed to fetch scholarship data: ${errorMessage}`);
      console.error('Error fetching scholarships:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  return {
    scholarships,
    loading,
    error,
    refetch: fetchScholarships
  };
};
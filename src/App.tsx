import React, { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ScholarshipTable from './components/ScholarshipTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useScholarships } from './hooks/useScholarships';
import { filterScholarships, getUniqueAudiences } from './utils/filterScholarships';
import { Facebook, Instagram, Linkedin, Youtube, GraduationCap } from 'lucide-react';

function App() {
  const { scholarships, loading, error, refetch } = useScholarships();
  const [searchTerm, setSearchTerm] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');

  const audiences = useMemo(() => getUniqueAudiences(scholarships), [scholarships]);
  
  const filteredScholarships = useMemo(() => 
    filterScholarships(scholarships, searchTerm, audienceFilter),
    [scholarships, searchTerm, audienceFilter]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-600 to-pink-700 p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  Apply - Học Bổng Cho Sinh Viên
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Discover opportunities for your educational journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              audienceFilter={audienceFilter}
              onAudienceFilterChange={setAudienceFilter}
              audiences={audiences}
            />

            {filteredScholarships.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scholarships found</h3>
                <p className="text-gray-600">
                  {searchTerm || audienceFilter 
                    ? 'Try adjusting your search criteria' 
                    : 'No scholarships are currently available'}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredScholarships.length} of {scholarships.length} scholarships
                  </p>
                </div>
                <ScholarshipTable scholarships={filteredScholarships} />
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <a href="https://facebook.com/hocbongchosinhvien" target="_blank" rel="noopener noreferrer" title="Facebook Page">
          <Facebook className="h-6 w-6 text-gray-400 hover:text-pink-600 transition-colors duration-200" />
        </a>

        <a href="https://facebook.com/groups/1135419907607527" target="_blank" rel="noopener noreferrer" title="Facebook Group">
          <GraduationCap className="h-6 w-6 text-gray-400 hover:text-pink-600 transition-colors duration-200" />
        </a>

        <a href="https://www.tiktok.com/@hocbongchosinhvien" target="_blank" rel="noopener noreferrer" title="TikTok">
          <svg className="h-6 w-6 fill-gray-400 hover:fill-pink-600 transition-colors duration-200" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M223.9,88.5c-25.3,0-45.9-20.5-45.9-45.9V32h-40v135.6c0,10.1-3.9,19.6-11.1,26.8c-7.1,7.1-16.6,11-26.7,11c-20.9,0-37.9-17-37.9-37.9s17-37.9,37.9-37.9c4.4,0,8.6,0.7,12.6,2.2v-41.2c-4.1-0.6-8.3-0.9-12.6-0.9c-43.7,0-79.2,35.5-79.2,79.2s35.5,79.2,79.2,79.2c21.1,0,41-8.2,55.9-23.1c14.9-14.9,23.1-34.8,23.1-55.9V104.6c12.3,9.1,27.1,13.9,42.4,13.9v-30Z"/>
          </svg>
        </a>

        <a href="https://www.instagram.com/hocbongchosinhvien" target="_blank" rel="noopener noreferrer" title="Instagram">
          <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-600 transition-colors duration-200" />
        </a>

        <a href="https://www.threads.com/@hocbongchosinhvien" target="_blank" rel="noopener noreferrer" title="Threads">
          <svg className="h-6 w-6 fill-gray-400 hover:fill-pink-600 transition-colors duration-200" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M176,128c13.3,10.2,20.8,25.7,20.8,41.2c0,27.1-22.5,48.8-51.2,48.8c-31.1,0-53.6-21.3-53.6-54.8
              c0-25.4,10.7-46.7,26.5-61.4c14.6-13.5,31.8-20.8,47.2-20.8c24.7,0,46.3,15.4,57.6,38.2c2.5,4.9-1.2,10.6-6.7,10.6h-0.5
              c-3.4,0-6.4-2-8.1-5c-8.1-14.8-22.5-24.2-39-24.2c-10.3,0-20.9,4.3-30.2,12.1c-13.3,11.3-21.5,28.5-21.5,50.5
              c0,19.2,11.3,31.2,29.6,31.2c13.6,0,23.2-9.6,23.2-23.2c0-10.7-6.1-20.3-15.4-25.2c-3.2-1.7-4.8-5.4-3.7-9c1.3-4.4,5.9-6.7,10.2-4.7
              Z"/>
          </svg>
        </a>

        <a href="https://www.youtube.com/@hocbongchosinhvien" target="_blank" rel="noopener noreferrer" title="YouTube">
          <Youtube className="h-6 w-6 text-gray-400 hover:text-pink-600 transition-colors duration-200" />
        </a>

        <a href="https://www.linkedin.com/in/tnkietit/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <Linkedin className="h-6 w-6 text-gray-400 hover:text-pink-600 transition-colors duration-200" />
        </a>
      </div>

      <p className="text-gray-600 text-sm text-center">
        &copy; 2025 Học bổng cho Sinh viên. Một sáng kiến cộng đồng hướng tới chất lượng giáo dục xuất sắc.
      </p>
    </div>
  </div>
</footer>

    </div>
  );
}

export default App;

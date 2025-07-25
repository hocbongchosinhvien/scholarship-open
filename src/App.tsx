import React, { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ScholarshipTable from './components/ScholarshipTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useScholarships } from './hooks/useScholarships';
import { filterScholarships, getUniqueAudiences } from './utils/filterScholarships';

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
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Học bổng cho Sinh viên. Một sáng kiến cộng đồng hướng tới chất lượng giáo dục xuất sắc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

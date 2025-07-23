import React from 'react';
import { ExternalLink, Calendar, Users } from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipTableProps {
  scholarships: Scholarship[];
}

const ScholarshipTable: React.FC<ScholarshipTableProps> = ({ scholarships }) => {
  const openLink = (url: string) => {
    if (url && url !== 'N/A') {
      window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-pink-600 to-pink-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Scholarship Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Deadline</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Target Audience</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Link</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {scholarships.map((scholarship, index) => (
              <tr key={index} className="hover:bg-pink-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {scholarship['Scholarship Name']}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                    {scholarship['Deadline']}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                    <Users className="h-3 w-3 mr-1" />
                    {scholarship['Target Audience']}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {scholarship['Link'] && scholarship['Link'] !== 'N/A' ? (
                    <button
                      onClick={() => openLink(scholarship['Link'])}
                      className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Apply
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm max-w-xs">
                  <div className="truncate" title={scholarship['Notes']}>
                    {scholarship['Notes']}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-gray-100">
        {scholarships.map((scholarship, index) => (
          <div key={index} className="p-6 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {scholarship['Scholarship Name']}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2 text-pink-500" />
                <span className="text-sm">{scholarship['Deadline']}</span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-3">
                <Users className="h-3 w-3 mr-1" />
                {scholarship['Target Audience']}
              </span>
            </div>
            
            {scholarship['Notes'] && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">{scholarship['Notes']}</p>
              </div>
            )}
            
            {scholarship['Link'] && scholarship['Link'] !== 'N/A' && (
              <button
                onClick={() => openLink(scholarship['Link'])}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipTable;
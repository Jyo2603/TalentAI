import React from 'react';
import { CandidateCard } from './CandidateCard';
import { CandidateListItem } from './CandidateListItem';
import { Users } from 'lucide-react';
import type { Candidate } from '../../types';

interface CandidateListProps {
  candidates: Candidate[];
  viewMode: 'list' | 'grid';
  onCandidateSelect: (candidate: Candidate) => void;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  candidates,
  viewMode,
  onCandidateSelect,
  onStatusChange
}) => {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900">No candidates found</p>
        <p className="text-gray-600 mt-1">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Job Applied</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Scores</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applied Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <CandidateListItem
                  key={candidate.id}
                  candidate={candidate}
                  onSelect={onCandidateSelect}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onSelect={onCandidateSelect}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
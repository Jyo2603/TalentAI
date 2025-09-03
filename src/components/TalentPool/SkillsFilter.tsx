import React from 'react';
import { X } from 'lucide-react';

interface SkillsFilterProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const popularSkills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript', 'AWS', 
  'Docker', 'PostgreSQL', 'Machine Learning', 'GraphQL', 'Vue.js', 
  'Angular', 'TensorFlow', 'Express', 'MongoDB'
];

export const SkillsFilter: React.FC<SkillsFilterProps> = ({ 
  selectedSkills, 
  onSkillsChange 
}) => {
  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const clearAllSkills = () => {
    onSkillsChange([]);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-700">Filter by Skills</p>
        {selectedSkills.length > 0 && (
          <button
            onClick={clearAllSkills}
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear all ({selectedSkills.length})
          </button>
        )}
      </div>

      {selectedSkills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-full text-xs"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleSkillToggle(skill)}
                  className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {popularSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => handleSkillToggle(skill)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          );
        })}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2, User, Mail, Phone, Award, TrendingUp, Search, Eye, Settings, ChevronRight, Building, Target, Clock, X, Save, UserPlus } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  skills: string[];
  joinDate: Date;
  performance: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  department: string;
  leadId: string;
  leadName: string;
  members: TeamMember[];
  createdAt: Date;
  status: 'active' | 'inactive';
  projects: number;
  productivity: number;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Development',
    description: 'Building exceptional user interfaces and experiences',
    department: 'Engineering',
    leadId: '1',
    leadName: 'Jennifer Walsh',
    members: [
      {
        id: '1',
        name: 'Jennifer Walsh',
        email: 'jennifer.walsh@company.com',
        role: 'Senior Frontend Developer',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        skills: ['React', 'TypeScript', 'CSS'],
        joinDate: new Date('2022-03-15'),
        performance: 95
      },
      {
        id: '4',
        name: 'Robert Garcia',
        email: 'robert.garcia@company.com',
        role: 'Frontend Developer',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        skills: ['React', 'JavaScript', 'HTML'],
        joinDate: new Date('2023-01-08'),
        performance: 88
      },
      {
        id: '8',
        name: 'Emily Chen',
        email: 'emily.chen@company.com',
        role: 'UI Developer',
        avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
        skills: ['Vue.js', 'CSS', 'Figma'],
        joinDate: new Date('2023-06-12'),
        performance: 92
      }
    ],
    createdAt: new Date('2022-01-01'),
    status: 'active',
    projects: 4,
    productivity: 94
  },
  {
    id: '2',
    name: 'AI/ML Research',
    description: 'Advanced machine learning and artificial intelligence',
    department: 'AI/ML',
    leadId: '2',
    leadName: 'Michael Chen',
    members: [
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        role: 'Senior ML Engineer',
        avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
        skills: ['Python', 'TensorFlow', 'PyTorch'],
        joinDate: new Date('2021-09-20'),
        performance: 97
      },
      {
        id: '9',
        name: 'Anna Martinez',
        email: 'anna.martinez@company.com',
        role: 'Data Scientist',
        avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
        skills: ['Python', 'Statistics', 'R'],
        joinDate: new Date('2022-11-03'),
        performance: 89
      }
    ],
    createdAt: new Date('2021-08-01'),
    status: 'active',
    projects: 3,
    productivity: 91
  },
  {
    id: '3',
    name: 'Product Strategy',
    description: 'Product vision, strategy, and user experience',
    department: 'Product',
    leadId: '3',
    leadName: 'Lisa Thompson',
    members: [
      {
        id: '3',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@company.com',
        role: 'VP of Product',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        skills: ['Product Strategy', 'Agile', 'User Research'],
        joinDate: new Date('2020-11-10'),
        performance: 96
      },
      {
        id: '10',
        name: 'Kevin Park',
        email: 'kevin.park@company.com',
        role: 'Product Manager',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
        skills: ['Analytics', 'UX Design', 'Roadmapping'],
        joinDate: new Date('2023-02-14'),
        performance: 85
      }
    ],
    createdAt: new Date('2020-10-01'),
    status: 'active',
    projects: 5,
    productivity: 87
  },
  {
    id: '4',
    name: 'DevOps Infrastructure',
    description: 'Cloud infrastructure and deployment automation',
    department: 'Engineering',
    leadId: '6',
    leadName: 'David Park',
    members: [
      {
        id: '6',
        name: 'David Park',
        email: 'david.park@company.com',
        role: 'Principal Architect',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
        skills: ['Java', 'Spring Boot', 'Kubernetes'],
        joinDate: new Date('2021-05-20'),
        performance: 93
      }
    ],
    createdAt: new Date('2021-04-01'),
    status: 'active',
    projects: 2,
    productivity: 89
  }
];

export const Teams: React.FC = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | string>('all');
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    description: '',
    department: '',
    leadName: ''
  });
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    email: '',
    role: '',
    skills: ''
  });

  const filteredTeams = teams.filter(team => {
    const searchMatch = searchTerm === '' ||
                       team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       team.leadName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const departmentMatch = departmentFilter === 'all' || team.department === departmentFilter;
    
    return searchMatch && departmentMatch;
  });

  const getStatusColor = (status: Team['status']) => {
    return status === 'active' 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const teamStats = {
    totalTeams: teams.length,
    activeTeams: teams.filter(t => t.status === 'active').length,
    totalMembers: teams.reduce((sum, t) => sum + t.members.length, 0),
    avgProductivity: Math.round(teams.reduce((sum, t) => sum + t.productivity, 0) / teams.length)
  };

  const departments = Array.from(new Set(teams.map(t => t.department)));

  const handleCreateTeam = () => {
    if (!newTeamData.name.trim() || !newTeamData.department || !newTeamData.leadName.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamData.name.trim(),
      description: newTeamData.description.trim(),
      department: newTeamData.department,
      leadId: Date.now().toString(),
      leadName: newTeamData.leadName.trim(),
      members: [
        {
          id: Date.now().toString(),
          name: newTeamData.leadName.trim(),
          email: `${newTeamData.leadName.toLowerCase().replace(/\s+/g, '.')}@company.com`,
          role: 'Team Lead',
          skills: ['Leadership', 'Management'],
          joinDate: new Date(),
          performance: 90
        }
      ],
      createdAt: new Date(),
      status: 'active',
      projects: 0,
      productivity: 85
    };

    setTeams(prev => [newTeam, ...prev]);
    setShowCreateTeam(false);
    setNewTeamData({ name: '', description: '', department: '', leadName: '' });
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setNewTeamData({
      name: team.name,
      description: team.description,
      department: team.department,
      leadName: team.leadName
    });
    setShowEditTeam(true);
  };

  const handleUpdateTeam = () => {
    if (!editingTeam || !newTeamData.name.trim()) return;

    const updatedTeam: Team = {
      ...editingTeam,
      name: newTeamData.name.trim(),
      description: newTeamData.description.trim(),
      department: newTeamData.department,
      leadName: newTeamData.leadName.trim()
    };

    setTeams(prev => prev.map(t => t.id === editingTeam.id ? updatedTeam : t));
    setShowEditTeam(false);
    setEditingTeam(null);
    setNewTeamData({ name: '', description: '', department: '', leadName: '' });
  };

  const handleAddMember = () => {
    if (!selectedTeam || !newMemberData.name.trim() || !newMemberData.email.trim() || !newMemberData.role.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberData.name.trim(),
      email: newMemberData.email.trim(),
      role: newMemberData.role.trim(),
      skills: newMemberData.skills ? newMemberData.skills.split(',').map(s => s.trim()).filter(Boolean) : ['General'],
      joinDate: new Date(),
      performance: Math.floor(Math.random() * 20) + 80 // 80-100
    };

    const updatedTeam = {
      ...selectedTeam,
      members: [...selectedTeam.members, newMember]
    };

    setTeams(prev => prev.map(t => t.id === selectedTeam.id ? updatedTeam : t));
    setSelectedTeam(updatedTeam);
    setShowAddMember(false);
    setNewMemberData({ name: '', email: '', role: '', skills: '' });
  };

  const handleRemoveMember = (teamId: string, memberId: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      const updatedTeams = teams.map(team => {
        if (team.id === teamId) {
          const updatedMembers = team.members.filter(m => m.id !== memberId);
          return { ...team, members: updatedMembers };
        }
        return team;
      });
      
      setTeams(updatedTeams);
      
      if (selectedTeam?.id === teamId) {
        const updatedSelectedTeam = updatedTeams.find(t => t.id === teamId);
        setSelectedTeam(updatedSelectedTeam || null);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
            <p className="text-gray-600 mt-2">Manage team structure and performance</p>
          </div>
          
          <button 
            onClick={() => setShowCreateTeam(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
          >
            <Plus size={18} />
            <span>Create Team</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.totalTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Teams</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.activeTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Productivity</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.avgProductivity}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group">
            <div className="p-6">
              {/* Team Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-500">{team.department}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{team.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(team.status)}`}>
                    {team.status}
                  </span>
                  <button 
                    onClick={() => handleEditTeam(team)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Settings size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{team.members.length}</p>
                  <p className="text-xs text-gray-600">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{team.projects}</p>
                  <p className="text-xs text-gray-600">Projects</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-bold ${getPerformanceColor(team.productivity)}`}>
                    {team.productivity}%
                  </p>
                  <p className="text-xs text-gray-600">Productivity</p>
                </div>
              </div>

              {/* Team Lead */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    {team.members.find(m => m.id === team.leadId)?.avatar ? (
                      <img 
                        src={team.members.find(m => m.id === team.leadId)?.avatar} 
                        alt={team.leadName} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <User size={16} className="text-gray-600 mt-2 ml-2" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{team.leadName}</p>
                    <p className="text-xs text-gray-600">Team Lead</p>
                  </div>
                </div>
              </div>

              {/* Team Members Preview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-700">Team Members</p>
                  <span className="text-xs text-gray-500">{team.members.length} total</span>
                </div>
                <div className="flex -space-x-2">
                  {team.members.slice(0, 4).map((member) => (
                    <div key={member.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={16} className="text-gray-600 mt-2 ml-2" />
                      )}
                    </div>
                  ))}
                  {team.members.length > 4 && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">+{team.members.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedTeam(team)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <Eye size={16} />
                  <span>View Team</span>
                </button>
                <button 
                  onClick={() => handleEditTeam(team)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                  title="Edit Team"
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No teams found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || departmentFilter !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Create your first team to get started'}
          </p>
          <button
            onClick={() => setShowCreateTeam(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
          >
            Create First Team
          </button>
        </div>
      )}

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTeam.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedTeam.department} • {selectedTeam.members.length} members</p>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Team Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Target size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Productivity</p>
                      <p className="text-xl font-bold text-blue-800">{selectedTeam.productivity}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Building size={20} className="text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Active Projects</p>
                      <p className="text-xl font-bold text-green-800">{selectedTeam.projects}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Award size={20} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">Avg Performance</p>
                      <p className="text-xl font-bold text-purple-800">
                        {Math.round(selectedTeam.members.reduce((sum, m) => sum + m.performance, 0) / selectedTeam.members.length)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                  <button 
                    onClick={() => setShowAddMember(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm font-medium"
                  >
                    <UserPlus size={16} />
                    <span>Add Member</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <User size={24} className="text-gray-600 mt-3 ml-3" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs font-medium ${getPerformanceColor(member.performance)}`}>
                                {member.performance}% performance
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveMember(selectedTeam.id, member.id)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                              +{member.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handleEditTeam(selectedTeam)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors font-medium"
                >
                  Edit Team
                </button>
                <button 
                  onClick={() => setSelectedTeam(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Create New Team</h2>
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
                <input
                  type="text"
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Frontend Development Team"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTeamData.description}
                  onChange={(e) => setNewTeamData({ ...newTeamData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the team's purpose and responsibilities"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newTeamData.department}
                    onChange={(e) => setNewTeamData({ ...newTeamData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Lead *</label>
                  <input
                    type="text"
                    value={newTeamData.leadName}
                    onChange={(e) => setNewTeamData({ ...newTeamData, leadName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team Lead Name"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCreateTeam}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Create Team</span>
                </button>
                <button
                  onClick={() => setShowCreateTeam(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {showEditTeam && editingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Edit Team</h2>
                <button
                  onClick={() => setShowEditTeam(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
                <input
                  type="text"
                  value={newTeamData.name}
                  onChange={(e) => setNewTeamData({ ...newTeamData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newTeamData.description}
                  onChange={(e) => setNewTeamData({ ...newTeamData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newTeamData.department}
                    onChange={(e) => setNewTeamData({ ...newTeamData, department: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Team Lead *</label>
                  <input
                    type="text"
                    value={newTeamData.leadName}
                    onChange={(e) => setNewTeamData({ ...newTeamData, leadName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUpdateTeam}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Update Team</span>
                </button>
                <button
                  onClick={() => setShowEditTeam(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">Adding to {selectedTeam.name}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newMemberData.name}
                    onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newMemberData.email}
                    onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.smith@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                <input
                  type="text"
                  value={newMemberData.role}
                  onChange={(e) => setNewMemberData({ ...newMemberData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  value={newMemberData.skills}
                  onChange={(e) => setNewMemberData({ ...newMemberData, skills: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, CSS (comma separated)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddMember}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <UserPlus size={16} />
                  <span>Add Member</span>
                </button>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
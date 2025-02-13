import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiUsers, FiTag, FiMoreVertical } from 'react-icons/fi';
import KanbanBoard from '../kanban/KanbanBoard';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign and rebuild company website',
      status: 'in-progress',
      progress: 65,
      team: [
        { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
        { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' }
      ],
      deadline: '2024-03-30',
      priority: 'high',
      tasks: [
        { id: 1, title: 'Design Homepage', status: 'done' },
        { id: 2, title: 'Implement Backend API', status: 'in-progress' },
        { id: 3, title: 'User Testing', status: 'todo' }
      ]
    },
    // Add more sample projects here
  ]);

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // 'grid' or 'kanban'

  const renderProjectCard = (project) => (
    <div key={project.id} className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <p className="text-gray-600 mt-1">{project.description}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {project.team.map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
          </div>
          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">
            <FiPlus className="w-4 h-4" />
          </button>
        </div>

        {/* Project Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-1" />
            <span>{project.deadline}</span>
          </div>
          <div className="flex items-center">
            <FiTag className="w-4 h-4 mr-1" />
            <span className={`capitalize ${
              project.priority === 'high' ? 'text-red-600' :
              project.priority === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>{project.priority}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600">Manage and track your projects</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          New Project
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveView('grid')}
          className={`px-4 py-2 rounded-md ${
            activeView === 'grid'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setActiveView('kanban')}
          className={`px-4 py-2 rounded-md ${
            activeView === 'kanban'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Kanban View
        </button>
      </div>

      {/* Project Grid/Kanban View */}
      {activeView === 'grid' ? (
        <div className="grid grid-cols-2 gap-6">
          {projects.map(renderProjectCard)}
        </div>
      ) : (
        <KanbanBoard projects={projects} setProjects={setProjects} />
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
            {/* Add form fields here */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle project creation
                  setShowNewProjectModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;

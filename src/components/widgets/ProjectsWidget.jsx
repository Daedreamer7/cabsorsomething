import React, { useState } from 'react';
import { FiFolder, FiPlus, FiMoreVertical } from 'react-icons/fi';

const ProjectsWidget = () => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'Website Redesign', progress: 75, status: 'in-progress' },
    { id: 2, title: 'Mobile App Development', progress: 30, status: 'in-progress' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', status: 'not-started' });

  const handleAddProject = () => {
    if (newProject.title.trim()) {
      setProjects([...projects, { id: Date.now(), ...newProject, progress: 0 }]);
      setNewProject({ title: '', status: 'not-started' });
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FiFolder className="w-5 h-5 text-indigo-500 mr-2" />
          Projects
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-800">{project.title}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{project.status}</span>
              <span>{project.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Start a Project</h3>
            <input
              type="text"
              placeholder="Project title"
              className="w-full p-2 border rounded-lg mb-4"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-lg mb-4"
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="on-hold">On Hold</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsWidget;

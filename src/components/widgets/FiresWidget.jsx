import React, { useState } from 'react';
import { FiFire, FiPlus, FiX } from 'react-icons/fi';

const FiresWidget = () => {
  const [fires, setFires] = useState([
    { id: 1, title: 'Urgent Client Meeting', priority: 'high' },
    { id: 2, title: 'Server Maintenance', priority: 'medium' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFire, setNewFire] = useState({ title: '', priority: 'medium' });

  const handleAddFire = () => {
    if (newFire.title.trim()) {
      setFires([...fires, { id: Date.now(), ...newFire }]);
      setNewFire({ title: '', priority: 'medium' });
      setIsModalOpen(false);
    }
  };

  const handlePutOutFire = (id) => {
    setFires(fires.filter(fire => fire.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <FiFire className="w-5 h-5 text-red-500 mr-2" />
          Fires
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {fires.map((fire) => (
          <div
            key={fire.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                fire.priority === 'high' ? 'bg-red-500' :
                fire.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <span className="text-gray-700">{fire.title}</span>
            </div>
            <button
              onClick={() => handlePutOutFire(fire.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Start a Fire</h3>
            <input
              type="text"
              placeholder="Fire title"
              className="w-full p-2 border rounded-lg mb-4"
              value={newFire.title}
              onChange={(e) => setNewFire({ ...newFire, title: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-lg mb-4"
              value={newFire.priority}
              onChange={(e) => setNewFire({ ...newFire, priority: e.target.value })}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFire}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Fire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiresWidget;

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faClock,
  faUser,
  faTag
} from '@fortawesome/free-solid-svg-icons';

const KanbanCard = ({ item, index, onEdit, onDelete }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white p-4 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-gray-900 font-medium">{item.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="text-gray-400 hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-400" />
            <span>{item.dueDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded text-xs ${item.priority === 'High' ? 'bg-red-100 text-red-700' : item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
              {item.priority}
            </div>
            {item.assignee && (
              <img
                src={item.assignee.avatar}
                alt={item.assignee.name}
                className="w-6 h-6 rounded-full"
                title={item.assignee.name}
              />
            )}
          </div>
        </div>
      </div>
    )}
  </Draggable>
);

const KanbanColumn = ({ title, items, onAdd, onEdit, onDelete }) => (
  <div className="bg-gray-100 p-4 rounded-lg w-80">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <button
        onClick={onAdd}
        className="p-1 rounded hover:bg-gray-200"
        title="Add new item"
      >
        <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
      </button>
    </div>
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="min-h-[200px]"
        >
          {items.map((item, index) => (
            <KanbanCard
              key={item.id}
              item={item}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    'To Do': [
      {
        id: '1',
        title: 'Design new dashboard',
        description: 'Create wireframes and mockups for the new admin dashboard',
        priority: 'High',
        dueDate: '2023-08-01',
        assignee: {
          name: 'John Doe',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe'
        }
      },
      // Add more items...
    ],
    'In Progress': [
      {
        id: '2',
        title: 'Implement authentication',
        description: 'Add user authentication using Firebase',
        priority: 'Medium',
        dueDate: '2023-08-05',
        assignee: {
          name: 'Jane Smith',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
        }
      }
    ],
    'Review': [
      {
        id: '3',
        title: 'Bug fixes',
        description: 'Fix reported bugs in the production environment',
        priority: 'Low',
        dueDate: '2023-08-03',
        assignee: {
          name: 'Mike Johnson',
          avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson'
        }
      }
    ],
    'Done': []
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns[source.droppableId];
      const items = Array.from(column);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: items
      });
    } else {
      // Moving between columns
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn);
      const destItems = Array.from(destColumn);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    }
  };

  const handleAddCard = (columnTitle) => {
    // Implement add card functionality
    console.log('Add card to', columnTitle);
  };

  const handleEditCard = (card) => {
    // Implement edit card functionality
    console.log('Edit card', card);
  };

  const handleDeleteCard = (cardId) => {
    // Implement delete card functionality
    console.log('Delete card', cardId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-6 overflow-x-auto p-6">
        {Object.entries(columns).map(([columnTitle, items]) => (
          <KanbanColumn
            key={columnTitle}
            title={columnTitle}
            items={items}
            onAdd={() => handleAddCard(columnTitle)}
            onEdit={handleEditCard}
            onDelete={handleDeleteCard}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

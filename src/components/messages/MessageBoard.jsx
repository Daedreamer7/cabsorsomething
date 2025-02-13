import React, { useState } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';

const MessageBoard = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hey team, how's the new project coming along?',
      timestamp: '2 hours ago',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JD'
    },
    {
      id: 2,
      sender: 'Jane Smith',
      content: 'Making good progress! We should be ready for the demo next week.',
      timestamp: '1 hour ago',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JS'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage,
      timestamp: 'Just now',
      avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=ME'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)]">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Message Board</h2>
      </div>

      <div className="flex flex-col h-[calc(100%-13rem)]">
        {/* Messages List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4">
                <img
                  src={message.avatar}
                  alt={message.sender}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {message.sender}
                    </span>
                    <span className="text-sm text-gray-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-800">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600"
            >
              <FiPaperclip className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
            >
              <FiSend className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;

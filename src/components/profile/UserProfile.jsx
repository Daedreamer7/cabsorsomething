import React, { useState } from 'react';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase } from 'react-icons/fi';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    role: 'Senior Project Manager',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2022',
    department: 'Project Management',
    bio: 'Experienced project manager with a track record of delivering successful projects in tech and design.',
    skills: ['Project Management', 'Team Leadership', 'Agile', 'Scrum', 'Risk Management'],
    education: [
      {
        degree: 'MBA',
        school: 'Stanford University',
        year: '2018-2020'
      },
      {
        degree: 'BS in Computer Science',
        school: 'MIT',
        year: '2014-2018'
      }
    ],
    experience: [
      {
        title: 'Senior Project Manager',
        company: 'Tech Corp',
        period: '2020-Present',
        description: 'Leading multiple cross-functional teams in delivering enterprise software solutions.'
      },
      {
        title: 'Project Manager',
        company: 'Innovation Labs',
        period: '2018-2020',
        description: 'Managed agile development teams and implemented project management best practices.'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Profile Header */}
      <div className="relative h-48 rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${profile.name}&size=128`}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
            >
              <FiEdit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-8 pb-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="col-span-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600">{profile.role}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FiMail className="w-5 h-5 mr-3" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiPhone className="w-5 h-5 mr-3" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiMapPin className="w-5 h-5 mr-3" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCalendar className="w-5 h-5 mr-3" />
                <span>Joined {profile.joinDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBriefcase className="w-5 h-5 mr-3" />
                <span>{profile.department}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h4 className="text-gray-900 font-medium">{exp.title}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h4 className="text-gray-900 font-medium">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            {/* Add form fields here */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle profile update
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

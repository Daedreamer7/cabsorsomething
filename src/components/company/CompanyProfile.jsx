import React, { useState } from 'react';
import { FiEdit2, FiMapPin, FiGlobe, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi';

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: 'Concepts Plus',
    logo: 'https://ui-avatars.com/api/?name=Concepts+Plus&size=128',
    tagline: 'Innovating the Future of Business',
    founded: '2010',
    headquarters: 'San Francisco, CA',
    website: 'www.conceptsplus.com',
    size: '50-100 employees',
    industry: 'Technology & Design',
    about: `Concepts Plus is a leading technology and design company focused on delivering innovative solutions to businesses worldwide. Our team of experts combines creativity with technical excellence to transform ideas into reality.`,
    mission: 'To empower businesses through innovative technology and design solutions.',
    vision: 'To be the global leader in creating transformative digital experiences.',
    values: [
      {
        title: 'Innovation',
        description: 'Constantly pushing boundaries and embracing new technologies'
      },
      {
        title: 'Excellence',
        description: 'Delivering the highest quality in everything we do'
      },
      {
        title: 'Collaboration',
        description: 'Working together to achieve extraordinary results'
      }
    ],
    leadership: [
      {
        name: 'Sarah Johnson',
        role: 'CEO',
        image: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
      },
      {
        name: 'Michael Chen',
        role: 'CTO',
        image: 'https://ui-avatars.com/api/?name=Michael+Chen'
      },
      {
        name: 'Emily Rodriguez',
        role: 'Creative Director',
        image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez'
      }
    ],
    achievements: [
      {
        year: '2023',
        title: 'Innovation Award',
        description: 'Recognized for groundbreaking solutions in UX design'
      },
      {
        year: '2022',
        title: 'Best Workplace',
        description: 'Named one of the top companies to work for'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative">
              <img
                src={company.logo}
                alt={company.name}
                className="w-32 h-32 rounded-lg border-4 border-white bg-white"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <FiEdit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white">{company.name}</h1>
              <p className="text-white opacity-90">{company.tagline}</p>
            </div>
          </div>
        </div>
        <div className="pt-20 px-8 pb-8">
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FiMapPin className="w-5 h-5 mr-2" />
              <span>{company.headquarters}</span>
            </div>
            <div className="flex items-center">
              <FiGlobe className="w-5 h-5 mr-2" />
              <a href={`https://${company.website}`} className="hover:text-indigo-600">
                {company.website}
              </a>
            </div>
            <div className="flex items-center">
              <FiUsers className="w-5 h-5 mr-2" />
              <span>{company.size}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About & Mission */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-600">{company.about}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission & Vision</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Mission</h3>
              <p className="text-gray-600">{company.mission}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Vision</h3>
              <p className="text-gray-600">{company.vision}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-3 gap-6">
          {company.values.map((value, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Leadership Team</h2>
        <div className="grid grid-cols-3 gap-6">
          {company.leadership.map((leader, index) => (
            <div key={index} className="text-center">
              <img
                src={leader.image}
                alt={leader.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="font-medium text-gray-900">{leader.name}</h3>
              <p className="text-gray-600">{leader.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
        <div className="space-y-4">
          {company.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FiAward className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <span className="text-sm text-gray-500">({achievement.year})</span>
                </div>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Company Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Edit Company Profile</h2>
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
                  // Handle company profile update
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

export default CompanyProfile;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faUsers,
  faGlobe,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faBriefcase,
  faHandshake,
  faAward,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center space-x-4">
      <div className="p-3 rounded-lg bg-blue-100">
        <FontAwesomeIcon icon={icon} className="text-blue-500 text-xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className="text-lg font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const TeamMemberCard = ({ member }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center space-x-4">
      <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.position}</p>
        <div className="flex space-x-3 mt-2">
          <a href={member.linkedin} className="text-blue-500 hover:text-blue-600">
            <FontAwesomeIcon icon={faGlobe} />
          </a>
          <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-gray-600">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const NewsCard = ({ news }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-lg bg-purple-100">
        <FontAwesomeIcon icon={faNewspaper} className="text-purple-500 text-xl" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{news.date}</p>
        <p className="text-gray-700 mt-2">{news.content}</p>
        <a href={news.link} className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block">
          Read more →
        </a>
      </div>
    </div>
  </div>
);

const CompanyProfileDashboard = () => {
  const companyInfo = {
    name: 'TechCorp Solutions',
    founded: '2010',
    employees: '250+',
    locations: ['San Francisco', 'New York', 'London'],
    industry: 'Technology',
    website: 'www.techcorp.com'
  };

  const executiveTeam = [
    {
      name: 'John Smith',
      position: 'Chief Executive Officer',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith',
      linkedin: '#',
      email: 'john@techcorp.com'
    },
    {
      name: 'Sarah Johnson',
      position: 'Chief Technology Officer',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
      linkedin: '#',
      email: 'sarah@techcorp.com'
    },
    {
      name: 'Michael Chen',
      position: 'Chief Financial Officer',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen',
      linkedin: '#',
      email: 'michael@techcorp.com'
    }
  ];

  const companyNews = [
    {
      title: 'TechCorp Launches New AI Platform',
      date: 'June 15, 2023',
      content: 'TechCorp Solutions announced the launch of its new artificial intelligence platform, designed to revolutionize business analytics...',
      link: '#'
    },
    {
      title: 'Q2 2023 Financial Results',
      date: 'July 1, 2023',
      content: 'TechCorp Solutions reported strong Q2 2023 results, with revenue growth of 45% year-over-year...',
      link: '#'
    }
  ];

  return (
    <DashboardLayout title="Company Profile" user={{ name: 'Admin' }}>
      {/* Company Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 rounded-lg bg-blue-100">
            <FontAwesomeIcon icon={faBuilding} className="text-blue-500 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h1>
            <p className="text-gray-600">Leading provider of enterprise software solutions</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <InfoCard icon={faUsers} title="Employees" value={companyInfo.employees} />
          <InfoCard icon={faMapMarkerAlt} title="Locations" value={companyInfo.locations.join(', ')} />
          <InfoCard icon={faBriefcase} title="Industry" value={companyInfo.industry} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Company Mission */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At TechCorp Solutions, we're dedicated to transforming businesses through innovative technology solutions. 
              Our mission is to empower organizations with cutting-edge software that drives growth, efficiency, and success.
            </p>
            
            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Core Values</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faHandshake} className="text-blue-500" />
                  <span className="font-medium">Customer First</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={faAward} className="text-blue-500" />
                  <span className="font-medium">Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                <span className="text-gray-600">contact@techcorp.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faGlobe} className="text-gray-400" />
                <span className="text-gray-600">{companyInfo.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Team */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Team</h2>
          <div className="grid grid-cols-3 gap-6">
            {executiveTeam.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </div>
        </div>

        {/* Company News */}
        <div className="col-span-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Company News</h2>
          <div className="space-y-4">
            {companyNews.map((news, index) => (
              <NewsCard key={index} news={news} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfileDashboard;

import React from 'react';
import { FaBook, FaFileInvoice, FaList } from 'react-icons/fa';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sidebar ">
      <ul className="nav">
        <li className="nav-item  mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'addBook' ? 'active' : ''}`}
            onClick={() => setActiveTab('addBook')}
          >
            <FaBook className='text-primary fs-5'/>
            <span>Add Book</span>
          </button>
        </li>
        <li className="nav-item mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'allBooks' ? 'active' : ''}`}
            onClick={() => setActiveTab('allBooks')}
          >
            <FaList className='text-primary fs-5'/>
            <span>All Books</span>
          </button>
        </li>
        <li className="nav-item mt-2">
          <button
            className={`d-flex justify-content-center nav-link ${activeTab === 'ordersManage' ? 'active' : ''}`}
            onClick={() => setActiveTab('ordersManage')}
          >
            <FaFileInvoice className='text-primary fs-5' />
            <span>All Orders</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
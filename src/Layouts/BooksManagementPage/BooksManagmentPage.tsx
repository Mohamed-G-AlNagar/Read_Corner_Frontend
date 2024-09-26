import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import AddBookForm from './AddBookForm/AddBookForm';
import AllBooksTable from './AllBooksTable/AllBooksTable';
import OrderStatus from './OrderStatus/OrderStatus';

const BookManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('allBooks');

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar ">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <main className="col-md-9 col-lg-10 px-md-4 content">
          <div className="w-100 d-flex justify-content-center">
            {activeTab === 'addBook' && <AddBookForm />}
            {activeTab === 'allBooks' && <AllBooksTable />}
            {activeTab === 'ordersManage' && <OrderStatus />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookManagementPage;

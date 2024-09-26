import { useState } from 'react';
import Spinner from '../../../Components/spinner/Spinner';
import toast from 'react-hot-toast';
import { useOrders, useUpdateOrderStatus } from '../../../Hooks/orderHooks';

const ORDER_STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELED'];

interface OrderItem {
  quantity: number;
  book: {
    bookTitle: string;
  };
}

interface Order {
  orderId: number;
  userEmail: string;
  orderDate: string;
  orderStatus: string;
  totalPrice: number;
  orderItems: OrderItem[];
}

const OrderStatus: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('PAID');
  const { orders, error, isLoading:isLoadingOrders } = useOrders();
  const {mutate:updateOrderStatus} = useUpdateOrderStatus() ;

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateOrderStatus({ orderId, newStatus });
  };

  if (isLoadingOrders ) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p>Error: {error.message}</p>;
  }

  const filteredOrders = orders.filter((order:Order) => order.orderStatus === selectedStatus);

  return (
    <div className="mt-2 col-12 mb-1">
      <h2 className="mt-1">Order Status</h2>
      <div className="mb-1 d-flex justify-content-center align-items-center gap-2">
        <label htmlFor="statusFilter" className="form-label ">Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-select w-75"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {ORDER_STATUSES.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="table-responsive" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Email</th>
              <th>Order Date</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order: Order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.userEmail}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index}>{item.book.bookTitle} (x{item.quantity})</div>
                  ))}
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  >
                    {ORDER_STATUSES.map(status => (
                      <option disabled={status === "PENDING"}
                      key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatus;
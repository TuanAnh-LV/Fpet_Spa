import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://fpetspa.azurewebsites.net/api";

const BookingHistory = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // State để lưu trạng thái bộ lọc

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!currentUser || !currentUser.accessToken) {
          console.error("Bạn cần đăng nhập để xem thông tin đơn hàng.");
          setError("Bạn cần đăng nhập để xem thông tin đơn hàng.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        };

        const response = await axios.get(
          `${API_BASE_URL}/Order/GetAllOrderService?customerId=${currentUser.userId}`,
          config
        );

        const ordersData = response.data;

        setOrders(ordersData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
        setError("Đã xảy ra lỗi khi lấy dữ liệu đơn hàng. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      };

      await axios.delete(
        `${API_BASE_URL}/Order/DeleteOrderByOrderId?orderId=${orderId}`,
        config
      );

      setOrders(orders.filter((order) => order.orderId !== orderId));
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      setError("Đã xảy ra lỗi khi xóa đơn hàng. Vui lòng thử lại.");
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") {
      return true; // Hiển thị tất cả các đơn hàng nếu không có bộ lọc
    } else {
      return order.status === parseInt(filterStatus); // Lọc theo trạng thái đã chọn
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Đơn Hàng</h1>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold">Status:</label>
        <select
          id="filter"
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-2 py-1 border border-gray-300 rounded"
        >
          <option value="all">All</option>
          <option value="0">Pending</option>
          <option value="2">Completed</option>
        </select>
      </div>
      {filteredOrders.length === 0 ? (
        <div>Không có đơn hàng nào.</div>
      ) : (
        <div className="rounded-md border">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Order Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Required Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Transaction Id</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.orderId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.requiredDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {order.status === 0 ? (
                      <span className="text-xs font-semibold px-2 py-1 rounded text-yellow-600 bg-yellow-100">Pending</span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-1 rounded text-green-600 bg-green-100">Completed</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <button
                      onClick={() => handleDeleteOrder(order.orderId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;

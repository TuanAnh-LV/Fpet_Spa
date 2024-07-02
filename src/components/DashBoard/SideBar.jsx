// eslint-disable-next-line no-unused-vars
import React from "react";
import { assets } from "../../assets/assets";
import PropTypes from 'prop-types';
const Sidebar = ({ setActiveSection }) => {


  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="flex justify-center items-center gap-3 p-4 font-bold text-lg border-b border-gray-700">
        <img src={assets.logo} alt=""  className="w-16"/>
        <div>Dashboard</div>
      </div>
      <ul className="mt-2">
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("account-info")}>
          User
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("staff-info")}>
          Staff
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("product-info")}>
          Products
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("service-info")}>
          Booking List
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("order-management")}>
          Quản lý đơn hàng
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveSection("transaction")}>
          Transaction
        </li>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  setActiveSection: PropTypes.func.isRequired
};

export default Sidebar;

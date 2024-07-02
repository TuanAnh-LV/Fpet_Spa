// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Sidebar from "../../components/DashBoard/SideBar";
import User from "../../components/DashBoard/User";
import GetProduct from "../../components/DashBoard/ProductManage.jsx/GetProduct";
import GetService from "../../components/DashBoard/ServiceManagement.jsx/GetService"
import Staff from "../../components/DashBoard/Staff";


const DashBoard = () => {
  const [activeSection, setActiveSection] = useState("account-info");

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-8">
      {activeSection === "account-info" && (
          <User/>
        )}
        {activeSection === "staff-info" && (
          <Staff/>
        )}
        {activeSection === "product-info" && (
          <GetProduct/>
        )}
        {activeSection === "service-info" && (
          <GetService/>
        )}
        {activeSection === "order-management" && (
          <div>
            <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
            <p className="mt-4">Chi tiết về đơn hàng...</p>
          </div>
        )}
         {activeSection === "transaction" && (
          <div>
            <h1 className="text-2xl font-bold">Transaction</h1>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;

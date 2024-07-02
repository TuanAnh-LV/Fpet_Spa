// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const UserProfile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(user ? user.fullName : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        apiEndpoints.updateUserProfile(user._id), // Sử dụng endpoint từ cấu hình
        { fullName: newName },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );

      // Cập nhật thông tin người dùng trong Redux store
      dispatch(updateUserSuccess(response.data));
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h2 className="text-[24px] font-semibold">Your Information</h2>
      <div className="">
        <form action="">
          <div className="flex items-center gap-4 mt-10 ml-32">
            <label
              htmlFor=""
              className="block text-[16px] font-normal text-right">
              Họ Tên
            </label>
            <div>
              <input
                type="text"
                value={newName}
                onChange={handleChange}
                placeholder="Enter new name"
                className="border rounded-sm px-4 py-2 text-[16px] font-normal leading-6"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10 ml-32">
            <label
              htmlFor=""
              className=" block text-[16px] font-normal text-right">
              Số điện thoại
            </label>
            <div>
              <input
                type="text"
                className="border rounded-sm px-4 py-2 text-[16px] font-normal leading-6"
              />
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className=" bg-black text-white text-[14px] font-normal rounded-md border px-7 py-2.5">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

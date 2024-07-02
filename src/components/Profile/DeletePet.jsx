// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';

const DeletePet = ({ petId, handleDeletePet, handleCancelDelete }) => {
  const confirmDelete = () => {
    handleDeletePet(petId);
  };

  return (
    <div className="delete-pet-modal">
      <div className="delete-pet-content">
        <h2 className="text-xl font-semibold mb-4">Xác nhận xóa vật nuôi</h2>
        <p>Bạn có chắc chắn muốn xóa vật nuôi này không?</p>
        <div className="modal-actions mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
            onClick={confirmDelete}
          >
            Xóa
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={handleCancelDelete}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
DeletePet.propTypes = {
  petId: PropTypes.func.isRequired,
  handleCancelDelete: PropTypes.func.isRequired,
  handleDeletePet: PropTypes.func.isRequired,

};

export default DeletePet;

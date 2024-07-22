import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../../../assets/assets';

const UpdateProduct = ({ product, closeModal, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    productQuantity: product.productQuantity,
    price: product.price,
  });

  const [thumbnailUrl, setThumbnailUrl] = useState(product.pictureName || assets.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productQuantity', updatedProduct.productQuantity);
    formData.append('price', updatedProduct.price);

    try {
      await axios.put(`https://fpetspa.azurewebsites.net/api/products/${product.productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully!');
      onUpdate(updatedProduct);
      closeModal();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <div className="bg-[#FCFCFC] p-4 md:p-6 lg:p-8">
      <h1 className="text-[17.55px] font-semibold mb-4">Update Product</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/3 mb-4">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Thumbnail</h2>
            <div className="flex flex-col items-center">
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="w-40 h-40 border rounded-md shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border rounded-md shadow-sm w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="w-full border rounded-md shadow-sm p-2"
                value={product.productName}
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productDescription">
                Product Description
              </label>
              <textarea
                name="productDescription"
                id="productDescription"
                className="w-full border rounded-md shadow-sm p-2"
                value={product.productDescription}
                disabled
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productQuantity">
                Product Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="productQuantity"
                id="productQuantity"
                placeholder="Product Quantity"
                className="w-full border rounded-md shadow-sm p-2"
                value={updatedProduct.productQuantity}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Set the product quantity.</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="price">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                id="price"
                placeholder="Price"
                className="w-full border rounded-md shadow-sm p-2"
                value={updatedProduct.price}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Set the product price.</p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

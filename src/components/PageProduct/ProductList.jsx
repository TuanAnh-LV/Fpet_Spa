// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { getAllProduct, getProductsByCategory } from '../../api/apiService';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import '../PageProduct/ProductList.css';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [sortedProductList, setSortedProductList] = useState([]);
  const { addToCart } = useContext(ShopContext) || { addToCart: () => {} };
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortTitle, setSortTitle] = useState('Sort Options');
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    const sortedList = [...productList];
    sortedList.sort((a, b) => a.price - b.price);
    sortDefault();
    setSortedProductList(sortedList);
  }, [productList]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (selectedCategories.length === 0) {
          response = await getAllProduct(); 
        } else {
          const promises = selectedCategories.map(category => getProductsByCategory({ category }));
          // Wait for all promises to resolve
          const categoryResponses = await Promise.all(promises);
          // Flatten the array of responses into a single array of products
          const products = categoryResponses.flatMap(response => response.$values);
          response = products;
        }

        console.log("Fetched products:", response);
        setProductList(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts(); 
  }, [selectedCategories]);
  

  const sortAscending = () => {
    const sortedList = [...sortedProductList];
    sortedList.sort((a, b) => a.price - b.price);
    setSortedProductList(sortedList);
    setSortTitle('Sort By Price: Low to High');
    resetPagination();
  };

  const sortDescending = () => {
    const sortedList = [...sortedProductList];
    sortedList.sort((a, b) => b.price - a.price);
    setSortedProductList(sortedList);
    setSortTitle('Sort By Price: High to Low');
    resetPagination();
  };

  const sortDefault = () => {
    setSortedProductList([...productList]);
    setSortTitle('Default Sorting');
    resetPagination();
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProductList.slice(indexOfFirstProduct, indexOfLastProduct);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" mx-auto p-4">
      <div className="w-full mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <div className="relative mt-1">
            <button
              type="button"
              className="relative w-full cursor-default rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Select Categories'}
            </button>
            {dropdownOpen && (
              <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {['Dog Food', 'Cat Food', 'Balo', 'Toy', 'Cat Shampoo', 'Dog Shampoo'].map((item, index) => (
                  <li
                    key={index}
                    className="cursor-default select-none relative py-2 pl-10 pr-4"
                    onClick={() => {
                      if (selectedCategories.includes(item)) {
                        setSelectedCategories(selectedCategories.filter(category => category !== item));
                      } else {
                        setSelectedCategories([...selectedCategories, item]);
                      }
                    }}
                  >
                    <span className={`block truncate ${selectedCategories.includes(item) ? 'font-medium' : 'font-normal'}`}>
                      {item}
                    </span>
                    {selectedCategories.includes(item) && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <label className="mr-2">Sort:</label>
              <div className="relative">
                <button
                  type="button"
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                >
                  {sortTitle}
                </button>
                {sortDropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <li className="cursor-default select-none relative py-2 pl-3 pr-9" onClick={sortDefault}>
                      Default Sort
                    </li>
                    <li className="cursor-default select-none relative py-2 pl-3 pr-9" onClick={sortDescending}>
                      Sort By Price: High to Low
                    </li>
                    <li className="cursor-default select-none relative py-2 pl-3 pr-9" onClick={sortAscending}>
                      Sort By Price: Low to High
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.productId} className="shadow-md rounded-lg overflow-hidden h-full flex flex-col w-11/12">
            <div className="relative pb-5/4">
                <Link to={`/productdisplay/${product.productName}`}>
                  <img
                    src={product.pictureName}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    
                  />
                </Link>
              </div>
              <div className="p-2 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="font-bold text-gray-800">{product.productName}</h4>
                </div>
                <div className="flex justify-between items-center mt-3 ">
                  <span className="ordernow-text text-[#d13a3a] font-semibold group-hover:text-gray-800">${product.price * 2}</span>
                  <button
                    className="btun4 lg:inline-flex items-center gap-3 group-hover:bg-white/10 bg-[#abd373] shadow-[10px_10px_150px_#ff9f0d] cursor-pointer py-2 px-4 text-sm font-semibold rounded-full butn  h-6 "
                    onClick={() => addToCart(product.productId, 1)}
                  >
                        Order Now
                  </button>
                </div>
              </div>
             
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-center">
            <div className="w-64">
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-md"></div>
                <div className="mt-2 h-6 bg-gray-200 rounded-md"></div>
                <div className="mt-2 h-6 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: Math.ceil(sortedProductList.length / productsPerPage) }, (_, i) => (
            <button
              key={i}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                currentPage === i + 1 ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProductList;

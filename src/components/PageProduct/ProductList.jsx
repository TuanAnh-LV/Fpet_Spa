import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { getAllProduct, getProductsByCategory } from '../../api/apiService';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import '../PageProduct/ProductList.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const subCategories = [
  { name: 'Dog Food', value: 'Dog Food' },
  { name: 'Cat Food', value: 'Cat Food' },
  { name: 'Balo', value: 'Balo' },
  { name: 'Toy', value: 'Toy' },
  { name: 'Cat Shampoo', value: 'Cat Shampoo' },
  { name: 'Dog Shampoo', value: 'Dog Shampoo' },
];

const sortOptions = [
  { name: 'Default Sorting', value: 'default' },
  { name: 'Sort By Price: High to Low', value: 'desc' },
  { name: 'Sort By Price: Low to High', value: 'asc' },
];

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [sortedProductList, setSortedProductList] = useState([]);
  const { addToCart } = useContext(ShopContext) || { addToCart: () => {} };
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [sortOrder, setSortOrder] = useState('default');
  const productsSectionRef = useRef(null); // Thêm ref này

  const fetchProducts = useCallback(async () => {
    try {
      let response;
      if (selectedCategories.length === 0) {
        response = await getAllProduct();
      } else {
        const promises = selectedCategories.map((category) => getProductsByCategory({ category }));
        const categoryResponses = await Promise.all(promises);
        response = categoryResponses.flat();
      }
      setProductList(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [selectedCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let sortedList = [...productList];
    if (sortOrder === 'asc') {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      sortedList.sort((a, b) => b.price - a.price);
    }
    setSortedProductList(sortedList);
    setCurrentPage(1);
  }, [productList, sortOrder]);

  useEffect(() => {
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage, selectedCategories, sortOrder]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (value) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProductList.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sort Options');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value, name) => {
    setSortOrder(value);
    setSelectedOption(name);
    setIsOpen(false);
  };

  const updateProductQuantity = (productId, quantity) => {
    setProductList((prevProductList) =>
      prevProductList.map((product) =>
        product.productId === productId
          ? { ...product, productQuantity: product.productQuantity + quantity }
          : product
      )
    );
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    updateProductQuantity(productId, -1);
  };

  return (
    <div className="product-bg-white" ref={productsSectionRef}> {/* Thêm ref này */}
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</                h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.value}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category.value)}
                        className={`block px-2 py-3 ${selectedCategories.includes(category.value) ? 'text-indigo-600' : ''}`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {selectedOption}
                  <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                </button>

                {isOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleOptionClick(option.value, option.name)}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 w-full text-left"
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.value}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category.value)}
                        className={`block px-2 py-3 ${selectedCategories.includes(category.value) ? 'text-indigo-600' : ''}`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl py-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="-mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {currentProducts.length > 0 ? (
                        currentProducts.map((product) => (
                          <div
                            key={product?.productId || 'unknown-product'}
                            className="shadow-md rounded-lg overflow-hidden h-full flex flex-col w-full"
                          >
                            <div className="relative pb-5/4">
                              {product?.productId ? (
                                <Link to={`/productdisplay/${product.productId}`}>
                                  <LazyLoadImage
                                    src={product.pictureName}
                                    alt={product.productName}
                                    effect="blur"
                                    className="w-full h-full object-cover"
                                  />
                                </Link>
                              ) : (
                                <div className="w-full h-full bg-gray-200" />
                              )}
                            </div>
                            <div className="p-2 flex flex-col flex-grow justify-between">
                              <div>
                                <h4 className="font-bold text-gray-800">{product?.productName || 'Unknown Product'}</h4>
                                <p className={`mt-2 ${product?.productQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {product?.productQuantity > 0 ? 'Stocking' : 'Out of Stock'}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800">Quantity: {product?.productQuantity || 'Unknown Product'}</h4>
                              </div>
                              <div className="flex justify-between items-center mt-3">
                                <span className="ordernow-text text-[#d13a3a] font-semibold group-hover:text-gray-800">${product?.price}</span>
                                <button
                                  className="btun4 lg:inline-flex items-center gap-3 border border-transparent bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full animate-pulse"
                                  onClick={() => product?.productId && handleAddToCart(product.productId)}
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

                    <div className="mt-6 flex justify-center rounded">
                      <ul className="flex">
                        {Array.from({ length: Math.ceil(sortedProductList.length / productsPerPage) }).map((_, index) => (
                          <li key={index}>
                            <button
                              onClick={() => paginate(index + 1)}
                              className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-indigo-600 text-white rounded' : 'bg-white text-gray-500 rounded'}`}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

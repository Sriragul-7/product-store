import React from 'react'
import { useState } from 'react'
import { useProductStore } from '../../store/product';
import toast, { Toaster } from "react-hot-toast";




const CreatePage = () => {
   const createProduct = useProductStore((state) => state.createProduct);
  const [newProduct,setNewProduct]=useState({
    name:"",
    price:"",
    image:"",
  });
const handleAddProduct = async (e) => {
  e.preventDefault();
  try {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
      toast.success(" Product added successfully!");
    } else {
      toast.error(message || " Something went wrong!");
    }
  } catch (error) {
    toast.error("🚨 Server not responding!");
    console.error(error);
  }
};

  return (
  <div className='flex flex-col justify-center items-center'>
    <h1 className="text-4xl font-bold text-white cursor-pointer mb-4 display-block mt-3">
         Add New Product
    </h1>

  <form className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-lg w-1/3 justify-center my-8"
  onSubmit={handleAddProduct}
  >
    <input
      type="text"
      name='name'
      value={newProduct.name}
      onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
      placeholder="Product Name"
      className="border-2 border-gray-500 rounded px-4 py-2 w-full"
    />

    <input
      type="text"
      placeholder="Price"
      name='price'
      value={newProduct.price}
      onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
      className="border-2 border-gray-500 rounded px-4 py-2 w-full"
    />

    <input
      placeholder="Image URL"
      name='image'
      type='url'
      value={newProduct.image}
      onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}
      className="border-2 border-gray-500 rounded px-4 py-2 w-full"
    />

    <button
    type='submit'
    className='bg-blue-500 w-full rounded py-2 px-4 cursor-pointer hover:bg-blue-400'
    
    >
      Add Product
    </button>
  </form>
  </div>

  )
}

export default CreatePage
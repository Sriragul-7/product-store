import { useState } from "react";
import { useProductStore } from "../../store/product";
import { Edit, Trash, } from "lucide-react";
import toast from "react-hot-toast";


export default function Card({ product }) {
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDelete = () => {
    try{
    deleteProduct(product._id);
    toast.success("Product deleted successfully!");
    }
    catch(error){
      toast.error("Something went wrong");
    }
  };

  const handleUpdate = async () => {
    try{
    await updateProduct(product._id, form);
    setIsOpen(false); // close modal
    toast.success(" Product updated successfully!");
    }
    catch(error){
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* Product Card */}
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow transform transition duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-300 font-bold">₹{product.price}</p>
        </div>
        <div className="flex justify-between p-4 border-t">
       <button
    onClick={() => setIsOpen(true)} // open update overlay
    className="p-2 rounded hover:bg-yellow-600 bg-yellow-500 text-white"
  >
    <Edit size={20} />
  </button>

  <button
    onClick={() => handleDelete(product._id)}
    className="p-2 rounded hover:bg-red-600 bg-red-500 text-white"
  >
    <Trash size={20} />
  </button>
        </div>
      </div>

      {/* Overlay Modal */}
      {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
    <div className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-lg w-1/4 justify-center my-8 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-2">Update Product</h2>

      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Product Name"
        className="border-2 border-gray-500 rounded px-4 py-2 w-full text-white bg-gray-900"
      />

      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Price"
        className="border-2 border-gray-500 rounded px-4 py-2 w-full text-white bg-gray-900"
      />

      <input
        type="text"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL"
        className="border-2 border-gray-500 rounded px-4 py-2 w-full text-white bg-gray-900"
      />

      {/* Buttons */}
      <div className="flex w-full space-x-3 pt-2">
        <button
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-gray-600 text-white rounded py-2 px-4 hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="flex-1 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-400"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

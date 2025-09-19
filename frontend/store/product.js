import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  searchQuery: "",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Fill all the fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();

    // Make sure state.products is always an array
    set((state) => ({
      products: Array.isArray(state.products)
        ? [...state.products, data.data || data]
        : [data.data || data],
    }));

    return { success: true, message: "Product added" };
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log("API Response:", data);

      // data.data if your API returns { data: [...] }, else fallback to data
      const productsArray = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      set({ products: productsArray });
    } catch (err) {
      console.error("Error fetching products:", err);
      set({ products: [] });
    }
  },
 deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { success: res.ok };
      }

      if (res.ok) {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        }));
      }
      return data;
    } catch (err) {
      console.error("Delete failed:", err);
    }
  },
  updateProduct: async (id, updatedProduct) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();

    if (res.ok) {
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? data.data : p
        ),
      }));
    }
    return data;
  } catch (err) {
    console.error("Update failed:", err);
  }
},

}));


//   const deleteAndRefetch = async (id) => {
//   const res = await deleteProduct(id);
//   if (res.success) {
//     fetchProducts(); // refresh products from backend
//   }
// };
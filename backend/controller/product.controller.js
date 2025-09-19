import Product from "../models/Product.js";


// GET all
export const getProducts=async(req,res)=>{
  const items=await Product.find().sort({createdAt:-1});
  res.json(items);
};

// POST create
export const createProducts=async(req,res)=>{
  const {name,price,image}=req.body;

  if(typeof name!=="string" || name.trim()==="" || isNaN(Number(price))){
    return res.status(400).json({error:"Invalid payload"});
  }
  const doc = await Product.create({name: name.trim(), price:Number(price), image:image.trim() });
  res.status(201).json(doc);

};

// DELETE by id
export const deleteProduct=async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
};

// PUT update by id
export const updateProduct=async (req,res)=>{
  const{name,price,image}=req.body;
  const doc =await Product.findByIdAndUpdate(
    req.params.id,{name, price, image},
    {new:true, runValidators:true}
  );
  res.json({ success: true, data: doc });

};





// export const updateProduct = async (req, res) => {
//   try {
//     const { name, price, image } = req.body;
//     const doc = await Product.findByIdAndUpdate(
//       req.params.id,
//       { name, price, image },
//       { new: true, runValidators: true }
//     );

//     if (!doc) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, data: doc });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Update failed", error: err.message });
//   }
// };

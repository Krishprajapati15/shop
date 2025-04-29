import Product from "../Models/productModal.js";
import User from "../Models/userModel.js";

export const getProductsController = async (req, res) => {
    try {
        // get user
        const user = await User.findOne({ _id:req.user.userId }).populate("products");
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        return res.status(200).json({ status:true, data: user.products });
    } catch (error) {
        return res.status(404).json({ status:false, msessage: "failed to fetch product!",error })
    }
}
export const insertProductController = async (req, res) => {
    const obj = req.body;
    try {
        // get user
        const user = await User.findOne({ _id:req.user.userId });
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        
        const product = await Product.create({...obj,userId:req.user.userId});
        user.products.push(product._id);
        await user.save();

        return res.status(200).json({ status:true, msessage: "product inserted" })
    } catch (error) {
        return res.status(404).json({ status:false, msessage: "failed to insert product!",error })
    }
}
export const updateProductController = async(req, res) => {
    const { productId, newdata } = req.body;
    try {
        await Product.findOneAndUpdate({ "_id": productId }, newdata);
        return res.status(200).json({ status:true, msessage: "product updated" })
    } catch (error) {
        return res.status(404).json({ status:false, msessage: "failed to update product!",error })
    }
}
export const deleteProductController = async(req, res) => {
    const { productId } = req.body;
    try {
        // get user
        const user = await User.findOne({ _id:req.user.userId });
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        await Product.deleteOne({ "_id": productId });
        // delete product froom user products array as well:
        const index = user.products.indexOf(productId);
        user.products.splice(index,1)
        await user.save();

        return res.status(200).json({ status:true, msessage: "product deleted" })
    } catch (error) {
        return res.status(404).json({ status:false, msessage: "failed to delete product!",error })
    }
}
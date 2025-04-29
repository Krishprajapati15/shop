import User from '../Models/userModel.js';
import Sale from '../Models/salesModal.js';
import Product from '../Models/productModal.js';

export const getSalesController = async (req, res) => {
    try {
        // get user
        const user = await User.findOne({ _id:req.user.userId }).populate("sales");
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        // console.log("sales list:",user.sales);
        return res.status(200).json({ status:true, data: user.sales });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false,message: 'Failed getting sales data' });
    }
};
export const createNewSaleController = async (req, res) => {
    try {
        const { cust_name, cust_email, cust_contact, cartItems } = req.body;
        // get user
        const user = await User.findOne({ _id:req.user.userId });
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        // add sales id to user's sales list
        const sale = await Sale.create({cust_name, cust_email, cust_contact, cartItems,userId:req.user.userId});
        user.sales.push(sale._id);
        await user.save();
        
        console.log(cartItems);
        // update product stock for each cart items:
        for (let i = 0; i < cartItems.length; i++) {
            const product = await Product.findOne({ _id:cartItems[i].c_id });
            product.p_stock -= cartItems[i].c_quantity;
            await product.save();
            console.log("done",cartItems[i].c_id);
        }
        // cartItems.forEach(async (items) => {
        //     const product = await Product.findOne({ _id:items.c_id });
        //     product.p_stock -= items.c_quantity;
        //     await product.save();
        //     console.log("done",items.c_id);
        // });

        return res.status(200).json({ status:true, msessage: "sales created" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false,message: 'Failed to create sales' });
    }
};

export const deleteSaleController = async (req, res) => {
    try {
        const { salesId } = req.body;
        // get user
        const user = await User.findOne({ _id:req.user.userId });
        if (!user){ return res.status(404).json({ status:false, msessage: "unauthorized user",error })};
        await Sale.deleteOne({ "_id": salesId });
        // delete sale froom user sales array as well:
        const index = user.sales.indexOf(salesId);
        user.sales.splice(index,1)
        await user.save();

        return res.status(200).json({ status:true, msessage: "sales deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false,message: 'Failed to delete sales' });
    }
};

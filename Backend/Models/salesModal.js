import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cust_name: {
        type: String,
        required: true,
    },
    cust_email: {
        type: String,
        required: true,
        unique: true
    },
    cust_contact: {
        type: String,
    },
    cartItems: {
        type: Array,
        default: [],
    }
});

const Sale = mongoose.model('Sale', salesSchema);

export default Sale;
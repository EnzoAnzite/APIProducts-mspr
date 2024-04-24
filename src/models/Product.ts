import {Schema, model, Document} from 'mongoose';
import IProduct from '../interfaces/ProductInterface.ts';

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
}, {
    timestamps: true
});

const Product = model<IProduct & Document>('Product', productSchema);

export default Product;

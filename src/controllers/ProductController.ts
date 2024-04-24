import { Request, Response } from 'express';
import Product from '../models/Product.ts';

class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error: any) {
            return res.status(400).json({ message : error.message });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ message : error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error: any) {
            return res.status(500).json({ message : error.message });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error: any) {
            return res.status(400).json({ message : error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error: any) {
            return res.status(500).json({ message : error.message });
        }
    }
}

export default new ProductController();

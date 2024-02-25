const ProductModel = require("../models/product.model.js")

class ProductManager {

    async addProduct({title, description, price, img, code, stock, category, thumbnails}){
        try{
            if(!title || !description || !price || !code || !stock || !category){
                console.log("All fields are required");
                return;
            }

            const productExists = await ProductModel.findOne({code: code});

            if(productExists){
                console.log("The code is repeated, it must be unique");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch(error){
            console.log("Error add product", error);
            throw error; 
        }
    }

    async getProducts(){
        try{
            const products = await ProductModel.find();
            return products;
        } catch(error){
            console.log("Error getting products", error);
            throw error; 
        }
    }

    async getProductById(id){
        try{
            const product = await ProductModel.findById(id);

            if(product){
                console.error("Product found");
                return product;
            }else{
                console.error("Product not found");
                return null;
            }

        } catch(error){
            console.log("Error getting product by id", error);
            throw error; 
        }
    }

    async updateProduct(id, productUpdate){
        try{
            const updateProduct = await ProductModel.findByIdAndUpdate(id, productUpdate);

            if(updateProduct){
                console.log("Product update successfully");
                return updateProduct;
            }else{
                console.error("Product not found");
                return null;
            }
            
        } catch(error){
            console.log("Error updating product by id", error);
            throw error; 
        }
    }

    async deleteProduct(id){
        try{
            const deleteProduct = await ProductModel.findByIdAndDelete(id);

            if(deleteProduct){
                console.log("Product deleted");
                return deleteProduct;
            }else{
                console.error("Product not found");
                return null;
            }

        } catch(error){
            console.log("Error deleting product by id", error);
            throw error; 
        }
    }
}

module.exports = ProductManager;
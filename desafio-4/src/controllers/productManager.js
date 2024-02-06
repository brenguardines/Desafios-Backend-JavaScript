const fs = require("fs");
class ProductManager{
    static lastId = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProduct({tittle, description, price, code, stock, category, status = true, thumbnail = []}){
        try{
            const arrayProducts = await this.readFile();

            if(!tittle || !description || !price || !code || !stock || !category){
                console.log("All fields are required");
                return;
            }

            if(arrayProducts.some(item => item.code === code)){
                console.log("The code is repeated, it must be unique");
                return;
            }

            const newProduct = {
                id: ++ProductManager.lastId,
                tittle,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                thumbnail: thumbnails || []
            };

            arrayProducts.push(newProduct);
            await this.saveFile(arrayProducts);

        }catch(error){
            console.log("Error add product", error);
            throw error;
        }
    }

    async getProducts(){
        try {
            const arrayProducts = await this.readFile();
            return arrayProducts;
          } catch (error) {
            console.log("Error reading file", error);
          }
    }

    async getProductsById(id){
        try{
            const arrayProducts = await this.readFile();
            const product = arrayProducts.find(item => item.id === id);

            if(product){
                console.error("Product found");
                return product;
            }else{
                console.error("Not found");
                return null;
            }
        } catch (error){
            console.log("Error reading file", error);
        }

    }

    async updateProduct(id, productUpdate){
        try{
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);

            if(index !== -1){
                arrayProducts[index] = { ...arrayProducts[index], ...productUpdate };
                await this.saveFile(arrayProducts);
                console.log("Product update successfully");
            }else{
                console.error("Not found");
            } 
        } catch (error){
            console.log(`Error the ${id} doesn't exists`, error);
        }
    }

    async deleteProduct(id){
        try{
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);

            if(index !== -1){
                arrayProducts.splice(index,1);
                await this.saveFile(arrayProducts);
                console.log("Product deleted");
            }else{
                console.error("Not found");
            }
            
        } catch (error){
            console.log(`Error the ${id} doesn't exists`, error);
        }  
    }


    async saveFile(arrayProducts){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error){
            console.log("Error saving file", error);
        }
    }

    async readFile(){
        try{
            const answer = await fs.promises.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(answer);

            return arrayProducts;
        } catch (error){
            console.log("Error reading file", error);
        }
    }
}

module.exports = ProductManager;
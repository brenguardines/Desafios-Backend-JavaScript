const fs = require("fs");
class ProductManager{
    static lastId = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProduct(aProduct){
        let {tittle, description, price, thumbnail, code, stock} = aProduct;

        if(!tittle || !description || !price || !thumbnail || !code || !stock){
            console.log("All fields are required");
            return;
        }

        if(this.products.some(item => item.code === code)){
            console.log("The code is repeated, it must be unique");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            tittle,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
        await this.saveFile(this.products);
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

            product ? console.log(product) : console.error("Not found");
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



///////////////////////////////////////////////////////////////////////

//Testing:
//Para correrlo desde la terminal del vsc: node productManager.js

//1) Se creará una instancia de la clase “ProductManager”
const productTest = new ProductManager("./products.json");

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
productTest.getProducts();

//3) Se llamará al método “addProduct” con los campos:
/*  title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25        */

const oneProduct = {
    tittle: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:25
}

productTest.addProduct(oneProduct);


//4) El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.
const otherProduct = {
    tittle: "producto prueba 2",
    description: "Este es otro producto prueba",
    price: 400,
    thumbnail: "Sin imagen",
    code: "abc456",
    stock:25
}

productTest.addProduct(otherProduct);


//5) Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado.
productTest.getProducts();

//6) Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
productTest.getProductsById(5);
productTest.getProductsById(2);

//7) Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
const changeProduct = {
    id: 1,
    tittle: "producto cambiado",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock:25
}

productTest.updateProduct(1, changeProduct);

//8) Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

productTest.deleteProduct(3);
productTest.deleteProduct(1);

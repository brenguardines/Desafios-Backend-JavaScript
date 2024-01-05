class ProductManager{
    static lastId = 0;

    constructor(){
        this.products = [];
    }

    addProduct(tittle, description, price, thumbnail, code, stock){
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
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        const product = this.products.find(item => item.id === id);

        !product ? console.error("Not found") : console.log(product);
    }
}

///////////////////////////////////////////////////////////////////////

//Testing:
//Para correrlo desde la terminal del vsc: node main.js

//1) Se creará una instancia de la clase “ProductManager”
const productTest = new ProductManager();

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productTest.getProducts());

//3) Se llamará al método “addProduct” con los campos:
/*  title: “producto prueba”
    description:”Este es un producto prueba”
    price:200,
    thumbnail:”Sin imagen”
    code:”abc123”,
    stock:25        */

productTest.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//4) El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE.

//5) Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado.

console.log(productTest.getProducts());

//6) Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

productTest.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//Descomentar para ver que tira error si no se completan todos los datos
//productTest.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123");

//Descomentar para ver que se crea otro producto con el id incremental
//productTest.addProduct("producto prueba 2", "Este es otro producto prueba", 400, "Sin imagen", "abc456", 25);
//console.log(productTest.getProducts());

//7) Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo.

productTest.getProductsById(5);
productTest.getProductsById(1);

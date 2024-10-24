---------------------------------- Proyecto Final Backend 3 ----------------------------------

docker pull lautarobacega/server-coder:1.0.0



---------------------------------- Proyecto Final Backend 2 ----------------------------------
1. Creamos un usuario user y/o admin: 
  POST localhost:5000/api/auth/register

  {
    "first_name": "user",
    "last_name": "user",
    "email": "user@gmail.com",
    "age": 23,
    "role": "user",
    "password": "1234"
  }

  {
    "first_name": "admin",
    "last_name": "admin",
    "email": "admin@gmail.com",
    "age": 23,
    "role": "admin",
    "password": "1234"
  }

2. Creamos un producto (admin): 
  POST localhost:5000/api/products

  {
    "name": "Producto 1",
    "description": "descripcion",
    "price": 100,
    "stock": 10,
    "category": "Bicicleta",
    "image": "a"
  }

3. Creamos un carrito: 
  POST localhost:5000/api/carts

4. Agregagamos productos al Carrito:
  POST localhost:5000/carts/:idCart/products/:idProd

5. Finalizamos la compra: 
  POST localhost:5000/carts/:idCart/purchase

  {
    "code": "fe85ec73-7c26-446a-b57e-acb06dda7169",
    "purchase_datetime": "2024-08-17T01:48:40.783Z",
    "amount": 500,
    "purchaser": "66bffeee40e9c9729264e6a2",
    "_id": "66c0017840e9c9729264e6f3",
    "__v": 0
  }










---------------------------------- Pre-entrega Proyecto final ----------------------------------

npm i express mongoose jsonwebtoken passport passport-jwt passport-local bcrypt morgan cookie-parser
joi
uuidv4
express-session
nodemailer
twilio
npm run dev

---------- GET USERS ----------
localhost:5000/api/users

---------- REGISTER USER ----------
localhost:5000/api/auth/register
{
    "first_name": "Prueba1",
    "last_name": "Pruebita1",
    "email": "Prueba1@gmail.com",
    "age": 23,
    "role": "admin",
    "password": "1234"
}

---------- LOGIN USER ----------
localhost:5000/api/auth/login
{
    "email": "Prueba1@gmail.com",
    "password": "1234"
}

---------- GET CURRENT USER ----------
localhost:5000/api/auth/current










---------------------------------- Entrega Final Primer Parte Backend ----------------------------------


---------- Create Product ----------
POST localhost:8080/products

{
  "name": "Bicicleta 1",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_1.jpg",
  "code": "BIKE001",
  "stock": 30
}

{
  "name": "Bicicleta 2",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_2.jpg",
  "code": "BIKE002",
  "stock": 30
}

{
  "name": "Bicicleta 3",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_3.jpg",
  "code": "BIKE003",
  "stock": 30
}

{
  "name": "Bicicleta 4",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_4.jpg",
  "code": "BIKE004",
  "stock": 30
}

{
  "name": "Bicicleta 5",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_5.jpg",
  "code": "BIKE005",
  "stock": 30
}


---------- Get Product ----------
Get localhost:8080/products


---------- Get Product by ID ----------
GET localhost:8080/products/:idProd
GET localhost:8080/products/66706afede0328b92133aef1


---------- Update Product ----------
PUT localhost:8080/products/:idProd
PUT localhost:8080/products/66706afede0328b92133aef1

{
  "name": "Bicicleta 1 update",
  "description": "rodado 20",
  "price": 100,
  "thumbnail": "http://imagen_1.jpg",
  "code": "BIKE001",
  "stock": 10
}


---------- Delete Product ----------
DELETE localhost:8080/products/:idProd
DELETE localhost:8080/products/66706afede0328b92133aef1


---------- Obtener Productos con Filtros, Paginación y Ordenamiento ----------
localhost:8080/products?category=electronics&priceMin=100&priceMax=1000&page=1&limit=2&sortBy=price&order=asc




---------- Create Cart ----------
POST localhost:8080/carts

{
  "products": []
}


---------- Get Carts ----------
GET localhost:8080/carts


---------- Get Cart by ID ----------
GET localhost:8080/carts/:idCart
GET localhost:8080/carts/66706e0ade0328b92133af03


---------- Delete Cart ----------
DELETE localhost:8080/carts/:idCart
DELETE localhost:8080/carts/66706e0ade0328b92133af03


---------- Add Product To Cart ----------
POST localhost:8080/carts/:idCart/products/:idProd
POST localhost:8080/carts/66706eacde0328b92133af09/products/66706bccde0328b92133aef3


---------- Remove Product from Cart ----------
DELETE localhost:8080/:idCart/products/:idProd
DELETE localhost:8080/66706eacde0328b92133af09/products/66706bccde0328b92133aef3


---------- Update Product Quantity in Cart ----------
PUT localhost:8080/carts/:idCart/products/:idProd
PUT localhost:8080/carts/66706eacde0328b92133af09/products/66706bccde0328b92133aef3

{
  "quantity": 10
}



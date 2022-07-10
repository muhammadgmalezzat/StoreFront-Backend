# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products
- CREATE : ` POST  '/api/products/' (token)`
    - to create a new product
    > [`localhost:3000/api/products/`](http://localhost:3000/api/products/)

    Json Data

        {
            "id": "1",
            "name":"lap",
            "price":"3000",
            "category":"electronics"
        }


- Index : ` GET  '/api/products/' `
    
    - to view the list of products
    > [`localhost:3000/api/products/`](http://localhost:3000/api/products/
)

- Show : ` GET '/api/products/:id`
    - to view one product by its ID
    > [`localhost:3000/api/products/1`](http://localhost:3000/api/products/1)

- UPDATE : ` PATCH '/api/products' (token)`
    - to update the list of products
    > [`localhost:3000/api/products/1`](http://localhost:3000/api/products/1)

    Json Data

        {
            "id": "1",
            "name":"lap2",
            "price":"3800",
            "category":"electronics2"
        }

- Delete : ` DELETE '/api/products' (token)` 
    - to delete one product from list of products by id 
     > [`localhost:3000/api/products/1`](http://localhost:3000/api/products/1)




#### Users

- CREATE : ` POST '/api/users/' (token)`

    - to create a new user 
    > [`localhost:3000/api/users/`](http://localhost:3000/api/users/)

  Json Data

        {
            "id":"1",
            "user_name":"mohamed",
            "first_name":"mohamed",
            "last_name":"gmal",
            password:"password",
        }

- Index : `GET '/api/users/'`

    - to view the list of users
    > [`localhost:3000/api/users/`](http://localhost:3000/api/users/)


- Show : ` GET '/api/users/:id`

  - to view one user by its ID
    > [`localhost:3000/api/users/1`](http://localhost:3000/api/users/1)

- UPDATE : ` PATCH '/api/users' (token)`

  - to update the list of users
    > [`localhost:3000/api/users/1`](http://localhost:3000/api/users/1)

  Json Data

        {
            "id": "1",
            "user_name":"mohamed2",
            "first_name":"mohamed2",
            "last_name":"gmal2",
            password:"password",
        }

- Delete : ` DELETE '/api/users' (token)`
  - to delete one user from list of users by id
    > [`localhost:3000/api/users/1`](http://localhost:3000/api/users/1)


#### orders 

- CREATE : ` POST '/api/orders/' (token)`

  - to create a new order
    > [`localhost:3000/api/orders/`](http://localhost:3000/api/orders/)

  Json Data

        {
            "id":"1",
            "user_id":1, // make sure that user with id 1 exists
        }

- Index : `GET '/api/orders/'`

  - to view the list of orders
    > [`localhost:3000/api/orders/`](http://localhost:3000/api/orders/)

- Show : ` GET '/api/orders/:id`

  - to view one order by its ID
    > [`localhost:3000/api/orders/1`](http://localhost:3000/api/orders/1)

- UPDATE : ` PATCH '/api/orders' (token)`

  - to update the list of orders
    > [`localhost:3000/api/orders/1`](http://localhost:3000/api/users/1)

  Json Data

        {
            "id": "1",
            "user_id":2,
        }

- Delete : ` DELETE '/api/orders' (token)`
  - to delete one order from list of orders by id
    > [`localhost:3000/api/orders/1`](http://localhost:3000/api/orders/1)


#### Product order


- CREATE : ` POST '/api/orderproducts/' (token)`

  - to create a new orderproducts
    > [`localhost:3000/api/orderproducts/`](http://localhost:3000/api/orderproducts/)

  Json Data

        {
            "id":"1",
            "order_id": "2",// make sure that order with id 2 exists
            "product_id":"1" ,// make sure that product with id 1 exists
            "quantity": "7",
        }

- Index : `GET '/api/orderproducts/'`

  - to view the list of orderproducts
    > [`localhost:3000/api/orderproducts/`](http://localhost:3000/api/orderproducts/)

- Show : ` GET '/api/orderproducts/:id`

  - to view one orderproducts by its ID
    > [`localhost:3000/api/orderproducts/1`](http://localhost:3000/api/orderproducts/1)

- UPDATE : ` PATCH '/api/orderproducts' (token)`

  - to update the list of orderproducts
    > [`localhost:3000/api/orderproducts/1`](http://localhost:3000/api/orderproducts/1)

  Json Data

        {
            "id":"1",
            "order_id": "3",// make sure that order with id 3 exists
            "product_id":"3" ,// make sure that product with id 3 exists
            "quantity": "7",
        }

- Delete : ` DELETE '/api/orderproducts' (token)`
  - to delete one order-product from list of order-products by id
    > [`localhost:3000/api/orderproducts/1`](http://localhost:3000/api/orderproducts/1)


## Data Shapes

#### Product

    - id : number (SERIAL)
    - name : string (VARCHAR(150)) NOT NULL
    - price : VARCHAR(100) NOT NULL
    - category : string (VARCHAR(50))


#### User

    - id : SERIAL PRIMARY KEY 
    - user_name : VARCHAR(50) NOT NULL
    - first_name : VARCHAR(50) NOT NULL
    - last_name : VARCHAR(50) NOT NULL
    - password : VARCHAR(255) NOT NULL



#### Orders

    - id : SERIAL PRIMARY KEY 
    - user_id : INTEGER 
    - FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE


#### Product order

    - id : SERIAL PRIMARY KEY 
    - order_id : INTEGER
    - product_id : INTEGER 
    - quantity : INTEGER NOT NULL
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE



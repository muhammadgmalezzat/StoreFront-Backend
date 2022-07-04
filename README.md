# StoreFront-Backend

## first users 

1-create a new user
post
http://localhost:3000/api/users/?
enter json data
{
    "id":"1"
    "user_name":"a",
    "first_name":"a",
    "last_name":"a",
    password:"a"
}
=================

get all users
get
http://localhost:3000/api/users/?

================

get one user by id
get
http://localhost:3000/api/users/:?id=1

================

update a users table with id

patch
http://localhost:3000/api/users/:?
enter json data

{
"user_name":"mohamed",  //update user user_name
"first_name":"mohamed", //update user first_name
"last_name":"gmal",     //update user last_name
"password":"fhjkmsos",    //update user password
"id":"43"               //id of user you want to update
}

================
delete a user

Delete 
http://localhost:3000/api/users/:?id=44

================
## second products

1-create a new product
post
http://localhost:3000/api/products/?
enter json data
{
"name":"lap",
"price":"3000",
"category":"electronics"
}

================
get all products
get
http://localhost:3000/api/products/?

================
get one product by id
get
http://localhost:3000/api/products/:?id=4

================
update a product
patch
http://localhost:3000/api/products/:?
enter json data

{
"name":"lap",
"price":"3000",
"category":"electronics",
"id":"1"
}

================
delete a product

Delete
http://localhost:3000/api/products/:?id=4

================
## third orders

1-create a new orders
post
http://localhost:3000/api/orders/?
enter json data
{
"user_id":"1"
}
=================
get all orders
get
http://localhost:3000/api/orders/?

================
get one orders by id
get
http://localhost:3000/api/orders/:?id=4

==================
update a product
patch
http://localhost:3000/api/orders/:?
enter json data
{
    "user_id":"1",
    "id":"2"        //id of order you want to update
}
================
delete a orders

Delete
http://localhost:3000/api/products/:?id=4

================
## fourth order_products

create a new order_products

post
http://localhost:3000/api/orderproducts/?
enter json data
{
"order_id": "1",
"product_id":"2" ,
"quantity": "3"
}
=================
get all orderproducts

get
http://localhost:3000/api/orderproducts/?

================
get one orderproducts by id
get
http://localhost:3000/api/orderproducts/:?id=4

==================
update a orderproducts

patch
http://localhost:3000/api/orderproducts/:?
enter json data
{
"order_id": "1",
"product_id":"2" ,
"quantity": "3",
"id":"2"            //id of order you want to update
}
================
delete a orderproducts

Delete
http://localhost:3000/api/orderproducts/:?id=4

================




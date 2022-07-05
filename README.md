# StoreFront-Backend

## first users 

1-create a new user
post
http://localhost:3000/api/users/
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
http://localhost:3000/api/users/

================

get one user by id
get
http://localhost:3000/api/users/1

================

update a users table by id

patch
http://localhost:3000/api/users/1
enter json data

{
"id":"1"                //id of user you want to update
"user_name":"mohamed",  //update user user_name
"first_name":"mohamed", //update user first_name
"last_name":"gmal",     //update user last_name
"password":"fhjkmsos"   //update user password
}

================
delete a user

Delete 
http://localhost:3000/api/users/1

================
## second products

1-create a new product
post
http://localhost:3000/api/products/
enter json data
{
"id": "10"
"name":"lap",
"price":"3000",
"category":"electronics"
}

================
get all products
get
http://localhost:3000/api/products/

================
get one product by id
get
http://localhost:3000/api/products/4

================
update a product
patch
http://localhost:3000/api/products/10
enter json data

{
"name":"phone",
"price":"3090",
"category":"electronics",
"id":"10"
}

================
delete a product

Delete
http://localhost:3000/api/products/10

================
## third orders

1-create a new orders
post
http://localhost:3000/api/orders/
enter json data
{
    "id":"1",
"user_id":"1"
}
=================
get all orders
get
http://localhost:3000/api/orders/

================
get one orders by id
get
http://localhost:3000/api/orders/1

==================
update a product
patch
http://localhost:3000/api/orders/1
enter json data
{
    "user_id":"7",
    "id":"1"        //id of order you want to update
}
================
delete a orders

Delete
http://localhost:3000/api/products/1

================
## fourth order_products

create a new order_products

post
http://localhost:3000/api/orderproducts/
enter json data
{
    "id":"1",
"order_id": "2",
"product_id":"1" ,
"quantity": "7"
}
=================
get all orderproducts

get
http://localhost:3000/api/orderproducts/

================
get one orderproducts by id
get
http://localhost:3000/api/orderproducts/1

==================
update a orderproducts

patch
http://localhost:3000/api/orderproducts/1
enter json data
{
"order_id": "1",
"product_id":"2" ,
"quantity": "6",
"id":"1"            //id of order you want to update
}
================
delete a orderproducts

Delete
http://localhost:3000/api/orderproducts/1

================


export type User = {
id: number ;
user_name: string;
first_name: string;
last_name: string;
password: string;
};
export type Product = {
id?: number;
name: string;
price: number;
category?: string;
};
export type Order = {
id?: number;
user_id: number;
};
export type order_products = {
id?: number;
order_id: number;
product_id: number;
quantity: number;
};


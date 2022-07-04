# StoreFront-Backend

## first users 

1-create a new user
post
http://localhost:3000/api/users/?
enter json data
{
    "user_name":"mohamed",
    "first_name":"mohamed",
    "last_name":"gmal",
    password:"fhjkmsos"
}
=================

get all users
get
http://localhost:3000/api/users/?

================

get one user by username
get
http://localhost:3000/api/users/:?user_name=mohamed

================

update a user
patch
http://localhost:3000/api/users/:?
enter json data

{
"user_name":"mohamed",
"first_name":"mohamed",
"last_name":"gmal",
password:"fhjkmsos",
id=43
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

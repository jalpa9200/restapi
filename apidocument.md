>> Local api

//page1

> list of categories
* http://localhost:9800/category

> list of jewellery
* http://localhost:9800/product

> list of jewellery with respect to Categories
* http://localhost:9800/product?productId=12

> list of Allproduct Cateory
* http://localhost:9800/Allproduct


//Page2

> list of product wrt product id
* http://localhost:9800/filter/8

> list of product id wrt product price
* http://localhost:9800/filter/4?lcost=100000&&hcost=200000

>list of product wrt category id & price
* http://localhost:9800/filter/10?lcost=100000&&hcost=200000&&categoryId=10

>Sort on basis of Price
* http://localhost:9800/filter/9?sort=-1


//Page3

> Details of product
* http://localhost:9800/details/6


//Page4

> Place Order
* http://localhost:9800/placeOrder
* body
 {
        "name": "Adhya",
        "order_id":3,
        "email": "adhya52@gmail.com",
        "category_id":1,
        "product_id":1,
        "product_category":"bangle",
        "product_type": "Women",
        "phone": 7688677177,
        "product_price":266484
    }

//Page5

> List of orders
* http://localhost:9800/orders/

> List of orders wrt email
* http://localhost:9800/orders?email=b@a.com
* http://localhost:9800/orders?email=jalpa@gmail.com

> Update Payment Details (PUT)
* http://localhost:9800/updateOrder/1
* body
{
        "status":"TRANSACTION_SUCCESS",
        "bank_name":"SBI",
        "date":"15/11/2022"        
}

> Delete Order (DELETE)
* http://localhost:9800/deleteOrder/637da849cff23b8be5b8eb43



> Live api 
* https://jewelleryapi.onrender.com

>> Live api with routes
> list of categories
* https://jewelleryapi.onrender.com/category

> list of jewellery
* https://jewelleryapi.onrender.com/product

> list of jewellery with respect to Categories
* https://jewelleryapi.onrender.com/product?productId=12

> list of product wrt product id
* https://jewelleryapi.onrender.com/filter/8

> list of product id wrt product price
* https://jewelleryapi.onrender.com/filter/4?lcost=100000&&hcost=200000

>list of product wrt category id & price
* https://jewelleryapi.onrender.com/filter/10?lcost=100000&&hcost=200000&&categoryId=10

>Sort on basis of Price
* https://jewelleryapi.onrender.com/filter/9?sort=-1

> Details of product
* https://jewelleryapi.onrender.com/details/6

> List of orders
* https://jewelleryapi.onrender.com/orders

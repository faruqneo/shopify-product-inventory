const express = require('express')
const dotenv = require('dotenv').config()
const hbs = require('express-hbs')
const Shopify = require('shopify-api-node')
const path = require('path')
const bodyParser = require('body-parser')

// set shopify keys
const apiKey=process.env.SHOPIFY_PRIVATE_API_KEY;
const apiPass=process.env.SHOPIFY_PRIVATE_API_PASSWORD;
const apiSecret=process.env.SHOPIFY_PRIVATE_API_SECRET;
const shop = process.env.SHOPIFY_PRIVATE_API_SHOP;
const shopName = process.env.SHOPIFY_PRIVATE_API_SHOP_NAME;

//Init app
const app = express();

//set shopify api
const shopify = new Shopify({
    shopName: shopName,
    apiKey: apiKey,
    password: apiPass
});

//set view engine
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/',function(req, res){
    res.send('working...');
    shopify.product.list()
  .then(product => 
    //res.send(product)
    res.render('product',{
        title: "product list",
        product: product
    }))
  .catch(err => console.error(err));
});

app.get('/shopify_product',function(req, res){
    shopify.product.list()
  .then(product => 
    res.send(product)
    // res.render('product',{
    //     title: "product list",
    //     product: product
    // })
    )
  .catch(err => console.error(err));
});

app.get('/shopify',function(req, res){
    shopify.product.list()
  .then(product => 
    //res.send(product)
    res.render('product',{
        title: "product list",
        product: product
    })
    )
  .catch(err => console.error(err));
});

//Details views
app.get('/shopify_product/detail/:id',function(req, res){
    shopify.product.get(req.params.id)
    .then(product =>
        //res.send(product)
        res.render('details',{
            title: "detail view",
            product: product
        })
        )
    .catch(err => console.error(err));
});

//inventory views
app.get('/product/inventory_item_id/details/:id',function(req, res){
    shopify.inventoryItem.get(req.params.id)
    .then(inventoryItem =>
        res.send(inventoryItem)
        // res.render('inventory',{
        //     title: "inventory view",
        //     inventoryItem: inventoryItem
        // })
        )
    .catch(err => console.error(err));
});

app.listen(3000, function(req, res){
    console.log('server is running');
});
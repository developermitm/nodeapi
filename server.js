require('rootpath')();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const errorHandler = require('_middleware/error-handler');
const authorize = require('_middleware/authorize');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

// api routes

app.use('/api/users', require('./users/users.controller'));
app.use('/api/category',require('./router/category'));
app.use('/api/product',require('./router/product'));
app.use('/api/banners',require('./router/banner'));
app.use('/api/offers',require('./router/offers'));
app.use('/api/coupons',require('./router/coupon'));

global.appUrl = 'http://3.110.49.171/public/category/';
global.productUrl = 'http://3.110.49.171/public/product/';
global.bannerUrl = 'http://3.110.49.171/public/banner/';
// global error handler 
app.use(errorHandler);
app.use(authorize);
module.exports = router; 
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, () => console.log('Server listening on port ' + port));
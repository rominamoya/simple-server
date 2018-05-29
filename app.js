// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bb from 'express-busboy';
import SourceMapSupport from 'source-map-support';

// import routes
import contactsRoutes from './routes/contacts.server.route';
// define our app using express
const app = express();
// express-busboy to parse multipart/form-data

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
// allow-cors
app.use(function(req,res,next){
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

bb.extend(app);
// configure app

// set the port
const port = process.env.PORT || 3001;
// connect to database
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://@ds251179.mlab.com:51179/dbcontacs');

var mongoDB = "mongodb://admin:Rm030216@ds251179.mlab.com:51179/dbcontacs?replicaSet=rs-ds251179";

mongoose.connect(mongoDB, {});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// add Source Map Support
SourceMapSupport.install();
app.use('/api', contactsRoutes);
app.get('/', (req,res) => {
  return res.end('Api working');
})
// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});

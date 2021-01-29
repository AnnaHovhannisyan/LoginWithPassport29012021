var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
const cors = require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


dotenv.config();

const passport=require("./middlewares/auth");


const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/AdminRouter');
let chatRouter = require('./routes/loginChat');
const { checkSign } = require('./middlewares/checkSign');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on("connection",(socket)=>{
  console.log("connected user");
  console.log(socket.id);
  socket.on('chat message', function(msg){
    console.log(msg);
    io.emit('chat message',msg)
  });
  socket.on("disconnect", ()=>{
    console.log("user disconnected")
  })

});

mongoose.connect(process.env.mongoLink,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
});

const db=mongoose.connection;



db.on("error", (err)=>{
  console.log(err)
});

db.on("connected",()=>{
  console.log('connected')
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:process.env.sessionSecret,
  saveUninitialized:true,
  resave:true,
  cookie:{maxAge:500000,httpOnly:true,}
}));


app.use(passport.initialize);
app.use(passport.session);


app.use('/', [indexRouter,chatRouter]);
app.use('/auth', authRouter);
app.use('/admin',checkSign, adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});


module.exports = {app: app, server: server};



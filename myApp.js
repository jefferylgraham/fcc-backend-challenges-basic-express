var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");


/** 2) A first working Express Server */
// app.get('/',function(req, res) {
//   res.send('Hello Express');        
// });

/** 3) Serve an HTML file */
var absolutePath = __dirname + "/views/index.html";
app.get('/',function(req, res) {
  res.sendFile(absolutePath);        
});

/** 4) Serve static assets  */
var absoluteCSSPath = __dirname + "/public";
app.use(express.static(absoluteCSSPath));

/** 5) serve JSON on a specific route */
app.get('/json', (req, res) => {
  let message = 'Hello json'
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    return res.json({"message": message.toUpperCase()})
  }
  return res.status(200).json({"message": message})
})

/** 6) Use the .env file to configure the app */
var message ="Hello json";
var msgObj ={};
msgObj = {"message":message};
    if(process.env.MESSAGE_STYLE==="uppercase")
    {
      message = message.toUpperCase();
      msgObj.message = message;
    }
      
    app.get("/json", function(req, res) {
      return res.json(msgObj);
      });
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time} );
});

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function(req, res){
  res.json({"echo": req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get((req, res) => {
  let firstname = req.query.first;
  let lastname = req.query.last;
  
  let jsonObj = { name: `${firstname} ${lastname}` };
  
  res.send(jsonObj);
}).post();
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", function(req, res){
  let firstname = req.body.first;
  let lastname = req.body.last;
  
  let jsonObj = { name: `${firstname} ${lastname}` };
  
  res.send(jsonObj);
});



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

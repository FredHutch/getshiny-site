var express = require('express');
var serveStatic = require('serve-static');
const cors = require('cors');
var bodyParser = require('body-parser');
const sendmail = require('sendmail')();

var app = express()
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(cors({ origin: ['https://getshiny.fredhutch.org:8080', 'https://getshiny.fredhutch.org:3000', 'http://localhost:8080'] }));

app.use(bodyParser.urlencoded({
    limit: '1mb',
    extended: true
}));
app.use(bodyParser.json({limit: '1mb'}));

app.get('/hello', function (req, res) {
  res.send('hello world')
});
app.use('/', serveStatic('server/dist'));
// POST method route
app.post('/notify', function (req, res) {
    var request = req.body;
    var user_email = request.email;
    var message = "<html><h2>======= Ticket To Scientific Computing Team =======</h2><h3>" + request.name + " would like to deploy an application.</h3>" +
                  "<p>The GitHub Repo - " + request.github_repo + "</p>" + 
                  "<p>Potential DNS name - " + request.dns_name + "</p>" + 
                  "<p>The dependencies include - " + request.dependencies + "</p>" + 
                  "<p>Does the user require public access - " + request.require_public_access + "</p>" + 
                  "<p>Does the user require password protection - " + request.require_password_protection + "</p>" + 
                  "<p>Does the user confirm that the App does not contain any PHI?  - " + request.no_phi + "</p>" + 
                  "<p>Contact - " + request.email + " | " + request.phone + "</p>" + 
                  "<p>Is there other special note? - " + request.notes + "</p></html>";
    
    var mailOptions = {
        from: user_email,
        to: process.env.SERVICE_EMAIL,
        subject: 'Hutch Campus App Deployment Request',
        html: message
      };
    sendmail(mailOptions, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
        res.send('Email Sent. ' + err);
    });
    // res.send('Success!');
})

app.listen(8080, '0.0.0.0', function () {
    console.log('running...');
});



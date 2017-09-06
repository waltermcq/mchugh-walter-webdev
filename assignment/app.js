
var app = require('express');

app.get('/goodbye', sayHello);

function sayHello(){
    console.log('hello');
}

// module.exports = function(app){
//     require("./services/user.service.server.js")(app);
//     require("./services/website.service.server.js")(app);
//     require("./services/page.service.server.js")(app);
//     require("./services/widget.service.server.js")(app);
// };
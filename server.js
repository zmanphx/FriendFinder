//Server to setup listening port and npm packages i.e. express.

var express= require("express");

//our server is called app using express
var app= express();
//******************* our server configuration*********************** */
// our default port is 8080 , else hosting server will assign port
var PORT = process.env.PORT || 8080;

// Using Express app for data parsing.

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
//**********************Router Part Below**************************************** */

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//****************************************Listener Below******************************** */

app.listen(PORT, function(){

console.log("Server App listening on Port:" + PORT);

});


//Beolvassuk a szükséges csomagokat.
var express = require('express');
var fs = require('fs');
var itf = require('./my_modules/itf_module');

/*var str = 1;
itf.tu(str, function(err, newStr){
    if(err){
        console.error(err);
    } else{
        console.log('New string is ', newStr);
    }

});*/

//Globális változók.
var port = 3333;
var staticDir = 'build'

//Létrehozunk egy express server példányt.
var app = express();

//Statikus fájlok.
app.use(express.static(staticDir));

//Express use használat.
app.use(function(req, res, next){
   console.log('request url: ',req.url);
    next();
});

 
//Definiáljuk a server működését.
app.get('/', function (req, res) {
    fs.readFile('./' + staticDir + '/index.html','utf8', function(err, data) {
      res.send(data);
    });
});

//Felhasználó modell.
function handleUsers(req, res){
    fs.readFile('./users.json','utf8', function(err, data) {
    if (err) throw err;
        
        //var path = req.url.split('/');
        var users = JSON.parse(data);
        var _user = {};
        //Ha nem kaptunk id-t.
        if(!req.params.id){
            _user = users;
        }else {
            for (var k in users){
                if(req.params.id == users[k].id){
                    _user = users[k];
                }
            }    
        }
        
        
    res.send(JSON.stringify(_user)); 
    });    
}


//Felhasználó beolvasása
app.get('/users/:id*?', function(req, res){
   console.log(req.url);
    handleUsers(req, res);
});

 
//Megadjuk, hogy a server melyik portot figyelje.
app.listen(port);

console.log("Server running in localhost: " + port);

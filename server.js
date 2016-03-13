//Beolvassuk a szükséges csomagokat.
var express = require('express');
var fs = require('fs');
var itf = require('./models/itf');


//Kapcsolódás az adatbázishoz.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/superhero');

//itf tábla model.
var Users = require('./models/users');
Users.setConnection(mongoose);
//Users.create({
//      name: 'John Doe',
//      email: 'john.doe@gmail.com',
//      phone: '+3614567893',
//      address: '1122 Budapest, Kiss u. 10',
//      role: 3,
//      meta: {
//         birthsdate: new Date('1991-04-07'),
//         hobby: 'golf'
//      }
//}, function(saved){
//    console.info("Saved model: ", saved);
//});

//Dokumentum törlése.
Users.getModel().remove({'name': new RegExp('jack','i')}, function(err, removed){
   if(err)
       console.error(err);
    else{
        console.log(removed.result);
    }
});

//Dokumentum frissítése.
Users.getModel().update(
    {name: new RegExp('jason', 'i')},
    {girlFriend: 'Mariann'},
    function(err, user){
        if(err)
            console.error(err);
    }
);

//Első találat a feltételek alapján.
//read -> first.
//{'role': {$gte:5}}
Users.first({name: new RegExp('john','i')}, function(user){
    if(user !== null){
        console.info("User name: ", user.name);
    } else{
        console.info("No user!");
    }
});

//Adminok visszaadása.
Users.getModel().isAdmin(2,function(err, data){
    console.log(err);
    console.log(data);
});

//Rendelés mentése adott felhasználóhoz.
//Users.first({name: new RegExp('john','i')}, function(user){
//    if(user !== null){
//        var order = new Users.getModel('Orders');
//        order._creator = user._id;
//        order.insDate: new Date();
//        order.description= 'Ez az első rendelésed, gratulálunk.';
//        order.product='Vasaló';
//        order.amount= 9900;
//        order.deadLine= new Date('2016-04-10');
//        order.save();
//    } else{
//        console.info("No user!");
//    }
//});

/*var str = 'ItFactory MeetUp...';
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
app.set('view engine', 'jade');
app.set('views', './src/view');

//Statikus fájlok.
app.use(express.static(staticDir));

//Express use használat.
app.use(function(req, res, next){
    if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
        //console.log('AJAX kérés folyamatban!');
        Users.getModel().find({}, function(err, data){
            res.send(JSON.stringify(data));
        });
    }
    next();
});

 
//Definiáljuk a server működését.
app.get('/', function (req, res) {
    /*fs.readFile('./' + staticDir + '/index.html','utf8', function(err, data) {
      res.send(data);
    });*/
    handleUsers(req, res, false, function(allUsers){
        res.render('index', {
          title: 'ItFactory Web Superhero',
          message:'Hello there!',
          users: allUsers
        });
    })
});

//Felhasználó modell.
function handleUsers(req, res, next, callBack){
    fs.readFile('./users.json','utf8', function(err, data) {
    if (err) throw err;
        
        //var path = req.url.split('/');
        var users = JSON.parse(data);

        if  (callBack){
            callBack(users);
            return;
        }

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
        
        
    //res.send(JSON.stringify(_user));
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

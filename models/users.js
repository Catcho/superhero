//Függvény a kollekció adatainak kezelésének.
var Model = function(){
    //

};

//Mongodb adatmodell.
//Kezeli a megadott táblát. Users
var db,
    Users;

var mongoose = require('mongoose');

function setConnection(mongodb){
    db = mongodb;
    setModel();
}

function setModel(){
    //Kollekció modell.

    var Schema = mongoose.Schema;
    var userSchema = new Schema({
      name: String,
      email: String,
      phone: String,
      address: String,
      role: Number,
      meta: {
         birthsdate: Date,
         hobby: String
      }
    });

      userSchema.statics.isAdmin = function(r,cb){
          return this.find({role: {$lte: 2}}, cb)
      };

    Users = db.model('Users',userSchema , 'Users');
}

function getModel(){
    return Users;
}


//Adatok olvasása a táblából / kollekcióból.
function read(where, callBack){
    //Paraméter vizsgálata.
    if(!where){
        where = {};
    }

    //Adatbázis olvasása
    Users.find(where, function(err, data){
        if(err){
            console.error('Error in query: ', where);
            data= [];
        }
        if(callBack){
            callBack(data);
        }
    });
}

//Egy dokumentum lekérése.
function first(where, callBack){
    read(where, function(data){
       if(data.length > 0){
           callBack(data[0]);
       } else{
           callBack(null);
       }
    });
}


//Új dokumentum beszúrása az adatbázisba.
function create(document, callBack){

    var user = new Users(document);
    user.save(function(err){
        if(err){
            console.error('Save error: ', err);
            callBack({});
        } else{
            callBack(user);
        }
    });
}


//Publikus elemek
module.exports = {
    setConnection: setConnection,
    read: read,
    create: create,
    first: first,
    getModel: getModel
};

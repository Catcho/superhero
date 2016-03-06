//Függvény a kollekció adatainak kezelésének.
var Model = function(){
    //

};

//Mongodb adatmodell.
//Kezeli a megadott táblát. Users
var db,
    Users;
function setConnection(mongodb){
    db = mongodb;
    setModel();
}

function setModel(){
    //Kollekció modell.
    Users = db.model('Users', {
      name: String,
      email: String,
      phone: String,
      address: String,
      role: Number,
      meta: {
         birthsdate: Date,
         hobby: String
      }
    }, 'Users');
}


//Adatok olvasása a táblából / kollekcióból.
function read(where, callBack){
    if(!where)
        where = {};
    Users.find(where, function(err, data){
        if(err){
            console.error('Error in query: ', where);
            if(callBack)
                callBack({});
        } else{
            if(callBack)
                callBack(data);
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
    create: create
};

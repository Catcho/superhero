// Szövegek nagybetűssé alakítása.
//@param: str, string
function toUpper(str, callbackFn){
    if(!callbackFn){
        console.error('Not given callbackFn!');
        return;
    }
    try {
        str = str.toUpperCase();
        callbackFn(false,str);
    } catch (errorObject){
        callbackFn(errorObject, str);
    }

}

//Szükséges modulok.



//Publikus elemek.
module.exports = {
  tu: toUpper
};

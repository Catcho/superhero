//Factory létrehozása.
superhero.factory("userFactory", [
    "$http",
    "$q",
    function($http, $q){
        return {
            getAll: function(){

                    //Új defer példány.
                    var deferred = $q.defer();

                    $http.get('/users')
                        .then(function(serverData){
                            deferred.resolve(serverData.data);
                        }, function(err){
                            deferred.reject(err);
                        });

                    //Visszatérés a promise objektummal.
                    return deferred.promise;
            }
        };
    }
])

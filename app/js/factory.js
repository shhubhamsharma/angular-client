myapp.factory('$factories',function($http){
    var url="http://localhost:3100/";
    var factory={};
    factory.getPlatform=function(){
        return $http(
            {
                method:'GET',
                url:url+'getplatform'
            }
        );
    };
    factory.getData=function(payload){
        return $http(
            {
                data:payload,
                method:'POST',
                url:url+'getData'
            }
        );
    }
    
    factory.getData=function(payload){
        return $http(
            {
                data:payload,
                method:'POST',
                url:url+'getData'
            }
        );
    }
    factory.getGroup=function(payload){
        return $http(
            {
                data:payload,
                method:'POST',
                url:url+'getGroup'
            }
        );
    }
    factory.getUnique=function(payload){
        return $http(
            {
                data:payload,
                method:'POST',
                url:url+'getUnique'
            }
        );
    }
    return factory;
});
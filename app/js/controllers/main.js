myapp.controller("mainCtrl", function($scope, $factories) {
$scope.nfError=false;
$scope.seErr=false;
    $factories.getPlatform().then(
    function success(response) {
      if (response != undefined && response != null && response != "") {
        if (
          response.data != undefined &&
          response.data != null &&
          response.data != ""
        ) {
          if (
            response.data.data != undefined &&
            response.data.data != null &&
            response.data.data != ""
          ) {
            $scope.list = response.data.data;
          }
        }
      }
      console.log($scope.selectedItem);
    },
    function error(error) {
      console.log(error);
    }
  );
  $scope.labelsBar = ['Total',];
  $scope.series = ['Series A'];

  
  $scope.update=function(platform){
    $scope.nfError=false;
    $scope.seErr=false;
      console.log(platform.replace(/\s/g,''))
    var payload={
        data:{
            platform:platform.replace(/\s/g,'')
        }
    };
    $factories.getData(payload).then(
        function success(response){
            if (response != undefined && response != null && response != "") {
                if (
                  response.data != undefined &&
                  response.data != null &&
                  response.data != ""
                ) {
                  if (
                    response.data.data != undefined &&
                    response.data.data != null &&
                    response.data.data != ""
                  ) {
                      $scope.fields=Object.keys(response.data.data[0]).filter(function(item){
                          return item!='id';
                      });
                        $scope.data=response.data.data;
                        $scope.$watch('data',function(oldVal,newVal){
                            $scope.data=newVal;
                            $scope.length = [
                                [$scope.data.length]
                              ];
                        })
                        $scope.length = [
                            [$scope.data.length]
                          ];
                        console.log($scope.length)
                  }
                  else{
                    $scope.nfError=true;
                  }
                }else{
                    $scope.nfError=true;
                }
              }                    else{
                $scope.nfError=true;
              }
        },function error(error){
            $scope.seErr=true;
        }
        
);
if(!$scope.nfError && !$scope.seErr){
    $factories.getGroup(payload).then(
        function success(response){
            if (response != undefined && response != null && response != "") {
                if (
                  response.data != undefined &&
                  response.data != null &&
                  response.data != ""
                ) {
                  if (
                    response.data.data != undefined &&
                    response.data.data != null &&
                    response.data.data != ""
                  ) {
                    $scope.datapie=[];
                    $scope.labelspie=[];
                        $scope.groupData=response.data.data;
                    $scope.groupData.forEach(element => {
                            
                            $scope.datapie.push(element.fragcount);
                            $scope.labelspie.push(element.uid);
                        });
                        console.log($scope.datapie)
                           console.log( $scope.labelspie)
                        
                  }
                }
              }                    
        },function error(error){
            $scope.seErr=true;
        }
    );
    $factories.getUnique(payload).then(
        function success(response){
            if (response != undefined && response != null && response != "") {
                if (
                  response.data != undefined &&
                  response.data != null &&
                  response.data != ""
                ) {
                  if (
                    response.data.data != undefined &&
                    response.data.data != null &&
                    response.data.data != ""
                  ) {
                        $scope.users=response.data.data;
                  }
                }
              }                    
        },function error(error){
            $scope.seErr=true;
        }
    )
    
      }
}

});

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
    },
    function error(error) {
$scope.seErr=true;
    }
  );
  $scope.labelsBar = ['Total',];
  $scope.series = ['Series A'];

  
  $scope.update=function(platform){
    $scope.nfError=false;
    $scope.seErr=false;
    var payload={
        data:{
            platform:platform.replace(/\s/g,'')
        }
    };

    $factories.getData(payload).then(
        function success(response){
            // $scope.length=0;
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
                      $scope.length =[];
                        $scope.data=response.data.data;
                        $scope.length = [
                                [$scope.data.length]
                              ];
                        
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

$scope.downloadReport = function() {   
    var filename = "task.xlsx"

    alasql('SELECT uid,platform INTO xlsx("' + filename + '",{headers:true}) FROM ?', [$scope.data]);
}
$scope.downloadReportPDF=function(){
    var doc = new jsPDF();
    var col =Object.keys($scope.data[0]).filter(function(element){
        return element!='id' && element!='$$hashKey';
    });
    var rows = [];

    for(var key in $scope.data){
        if(key!='id' && key!='$$hasKey')
        var temp = [JSON.stringify($scope.data[key]['uid']), $scope.data[key]['platform']];
        rows.push(temp);
    }
    doc.autoTable(col, rows);    
    doc.save('task.pdf')
}
});


var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope','$http', function($scope,$http) {

  //console.log("Hello");
//Function to get all the realtions and redraw the diagram.
  var refresh = function(){
	  	$http.get('/relationList').success(function(response){
	  		//console.log("Got the data");
	  		$scope.relationList = response;
	  		$scope.relation={};
	  		$scope.currentRelation={};
	  		draw();
	  	});
  };
  //function to create the network diagram
  var draw = function(){

  	for (var i = 0; i < $scope.relationList.length; i++) {
  		//console.log($scope.relationList[i]);
  	}
  	var edges=[];
  	var unique = {};
	var distinct = [];
	for( var i in $scope.relationList ){
		var myEdge={};
		 if( typeof(unique[$scope.relationList[i].parent]) == "undefined"){
		  distinct.push($scope.relationList[i].parent);
		 }
	 	 unique[$scope.relationList[i].parent] = 0;
	 	 if( typeof(unique[$scope.relationList[i].child]) == "undefined"){
		  distinct.push($scope.relationList[i].child);
		 }
	 	 unique[$scope.relationList[i].child] = 0;
	 	 myEdge.from = $scope.relationList[i].parent;
	 	 myEdge.to = $scope.relationList[i].child;
	 	 myEdge.label= $scope.relationList[i].relation;
	 	 edges.push(myEdge);

	}
	console.dir(edges);
	var nodes=[];
	for (var i = 0; i < distinct.length; i++) {
		var myObj ={};
		myObj.id = distinct[i]
		myObj.label=distinct[i]
		nodes.push(myObj);
	}
	//console.log(nodes);

	

  	var data ={
  		nodes:nodes,
  		edges:edges,
  		options:{}
  	}

  	var container = document.getElementById('graph');
  	var network = new vis.Network(container,data,data.options);

  };

  refresh();
  
  	// Function which calls services to first check if the relation exist , then depending on that update the relation or create a new relation

  	$scope.addNewRelation = function(){
  		console.log($scope.relation);

  		$http.get('/getRelation',{params:{parent: $scope.relation.parent,child:$scope.relation.child}}).success(function(response){
	  		//console.log("back in single record req");
	  		//console.log(response);
	  		$scope.currentRelation = response;
	  		//console.log($scope.currentRelation);
	  		if($scope.currentRelation!=null){
		  		if($scope.currentRelation.parent == $scope.relation.parent && $scope.currentRelation.child == $scope.relation.child){
		  			//console.log('update');
		  			$http.put('/relationList/'+$scope.currentRelation._id,$scope.relation).success(function(response){
		  				//console.log(response);
		  				refresh();
		  			})
		  		}
	  		}
	  		else{
	  			$http.post('/relationList',$scope.relation).success(function(response){
	  				//console.log(response);
	  				refresh();
	  			});
	  		}
	  	});

  	};
	
}]);


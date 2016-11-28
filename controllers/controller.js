
var myApp = angular.module('myApp',[]);

myApp.controller('AppCtrl', ['$scope','$http', function($scope,$http) {

//Function to get all the realtions and redraw the diagram.
  var refresh = function(){
	  	$http.get('/relationList').success(function(response){
	  		$scope.relationList = response;
	  		$scope.relation={};
	  		$scope.currentRelation={};
	  		draw();
	  	});
  };
  //function to create the network diagram
  var draw = function(){

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

	var nodes=[];
	for (var i = 0; i < distinct.length; i++) {
		var myObj ={};
		myObj.id = distinct[i]
		myObj.label=distinct[i]
		nodes.push(myObj);
	}


	

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


  		$http.get('/getRelation',{params:{parent: $scope.relation.parent,child:$scope.relation.child}}).success(function(response){

	  		$scope.currentRelation = response;

	  		if($scope.currentRelation!=null){
		  		if($scope.currentRelation.parent == $scope.relation.parent && $scope.currentRelation.child == $scope.relation.child){

		  			$http.put('/relationList/'+$scope.currentRelation._id,$scope.relation).success(function(response){

		  				refresh();
		  			})
		  		}
	  		}
	  		else{
	  				
	  			$http.get('/getRelation',{params:{parent: $scope.relation.child, child:$scope.relation.parent}}).success(function(response){
	  				$scope.currentRelation = response;
	  				if($scope.currentRelation!=null){
				  		if($scope.currentRelation.parent == $scope.relation.child && $scope.currentRelation.child == $scope.relation.parent){
				  			var reverseRelation ={};
				  			reverseRelation.parent = $scope.relation.child;
				  			reverseRelation.child = $scope.relation.parent;
				  			reverseRelation.relation = $scope.relation.relation;
				  			$http.put('/relationList/'+$scope.currentRelation._id,$scope.relation).success(function(response){
				  				refresh();
				  			})
				  		}
			  		}
			  		else{	
				  			$http.post('/relationList',$scope.relation).success(function(response){
				  				refresh();
				  			});
				  	}

	  			});
	  			
	  		}
	  	});

  	};
	
}]);


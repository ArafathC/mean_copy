// The name of this module corresponds so the "ng-app" value in line 2 of the HTML
var todo = angular.module('todo', []);

// CREATE AN ANGULAR CONTROLLER CALLED TodoController 
// IT TAKES TWO ARGUMENTS, $scope and $http
todo.controller('TodoController', function($scope, $http){
  $scope.formData = {};

  // USE $HTTP GET REQUEST TO GATHER ALL TODOS FROM THE DATABASE
  // SEND A GET REQUEST TO '/api/todos'
  $http({
    method: 'GET',
    url: '/api/todos'
  }).then(function successCallback(response){
    // Invoked asyncronously when the response is available
    $scope.todos = response.data;
    console.log("response from server:", response);
  }, function errorCallback(response){
    // Called asyncronously if an error occurs or the server returns
    // a response with an error status
    console.log("error received from server:", error);
  });

  // WRITE A FUNCTION ON THE $SCOPE OBJECT THAT WILL CREATE A NEW TODO
  // IT WILL MAKE A POST REQUEST TO THE '/api/todos' ENDPOINT
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data){
        $scope.formData = {};
        $scope.todos = data;
      })
      .error(function(error){
        console.log("Error:", error);
      });
  };

  // WRITE A FUNCTION ON THE $SCOPE OBJECT THAT WILL DELETE A TODO
  // IT WILL MAKE A DELETE REQUEST TO THE '/api/todos/:todo_id' ENDPOINT
  $scope.deleteTodo = function(todo_id){
    $http.delete('/api/todos/' + todo_id)
      .success(function(data){
        $scope.todos = data;
        console.log("item", todo_id, "successfully deleted");
      })
      .error(function(error){
        console.log("Error deleting todo_id", todo_id, ": ", error);
      });
  };

};
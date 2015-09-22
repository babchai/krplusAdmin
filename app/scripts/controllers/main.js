'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position) {
  })

  .controller('LoginCtrl', function($scope,$position,$state) {
    console.log('login');
    $scope.user = {};
    var userRef = new Firebase("https://9lives.firebaseio.com");
    $scope.login  = function(){

      userRef.authWithPassword({
        email    : $scope.user.email,
        password : $scope.user.password
      }, function(error, authData) { 

        if( error )
        {

          $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Login Failed')
            .content("Couldn't sign in. The email or password is not correct.")
            .ok('Got it!')
          );
        }
        else
        {
          //console.log('succeeded');
          $state.go('dashboard.user');
        }

      }, {
        //remember: "sessionOnly"
      });
      }

  })
  .controller('LookbookCtrl' , function($scope, $position, $firebaseArray, $stateParams){
    console.log('LookbookCtrl');
    $scope.category = $stateParams.category;
    $scope.name = $stateParams.name;
    $scope.lookbooks = [];
    $scope.newTag = '';

    var dataRef = new Firebase("https://9lives.firebaseio.com/");

    //var lookbookRef = new Firebase("https://9lives.firebaseio.com/lookbook2/"+$stateParams.category);
    
    var lookbookRef = dataRef.child('lookbook2/'+$stateParams.category);


    $scope.lookbooks = $firebaseArray(lookbookRef);


    var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
    $scope.newFilename =TIMESTAMP+'.jpg';

     $scope.lookbooks.$loaded(function(data){
      console.log(data);
     });

     $scope.addNewPhoto = function()
     {

        var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
        $scope.newFilename =TIMESTAMP+'.jpg';
        $scope.addNew = true;
     }

     $scope.addTag = function(item)
     {
      var filename = item.filename.split('.');
      console.log(this.newTag);

      var tag = this.newTag
      
        var tagRef = dataRef.child('tags/'+tag).once('value', function(data){
         if(data.numChildren() > 0)
         {
            dataRef.child('tags/'+tag+'/Links').push({
              'category': $stateParams.category,
              'photo': filename[0]
            })  
         }
         else
         {
            dataRef.child('tags/'+tag).update({
              'Links' : [{
                'category':$stateParams.category,
                'photo':filename[0]
              }]
            })
         }
        })

        lookbookRef.child(item.$id+'/tags').push(tag);

     }

    $scope.remove = function(id)
    {
     
        console.log('removed', id);
        var items = lookbookRef.child(id);

        // items.on('value', function(snapshot){
        //   console.log(snapshot.val());
        // })

        items.remove(function(error){
              if (error) {
                console.log('remove failed');
              } else {
                console.log('remove succeeded');
              }
        });

    }

     $scope.submit = function(e) {
     
      $scope.addNew = false;
      lookbookRef.push({
        'filename':$scope.newFilename,
        'status' : 'active',
        'uploadtime' : TIMESTAMP
      })
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://localhost/file-upload/index.php',
            //fields: {'username': $scope.username},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    };

    $scope.onFileSelect = function(file)
    {
      console.log("upload");
      for (var i = 0; i < $files.length; i++) {
        Upload.upload({
          url: 'http://localhost/file-upload/index.php',
          file: file,
          progress: function(e){}
        }).then(function(data, status, headers, config) {
          // file is uploaded successfully
          console.log(data);
        }); 
      }
    }

  })
  .controller('UserCtrl', function($scope,$position, $firebaseArray) {
    console.log('UserCtrl');
    var profileRef = new Firebase("https://9lives.firebaseio.com/profile");

    $scope.profiles = $firebaseArray(profileRef);

  })
  .controller('CategoryCtrl', function($scope,$position, $firebaseArray) {
    console.log('CategoryCtrl');
    var categoriesRef = new Firebase("https://9lives.firebaseio.com/categories");

    $scope.categories = $firebaseArray(categoriesRef);

    $scope.save = function(data , category)
    {
        console.log(category);
        if(category.key == null)
        {
            var newItem  = {
                'name' : data,
                'key' : data
            }

            console.log(newItem);

            categoriesRef.push(newItem);
        }
        else
        {
           var cat = categoriesRef.child(category.$id);
           // cat.on('value' , function(data){
           //  console.log(data.val());
           // })
            cat.update({
               "name":  data
            });


        }
    }

    $scope.remove = function(category)
    {
     
        console.log('removed');
        var cat = categoriesRef.child(category.$id);

        cat.remove(function(error){
              if (error) {
                console.log('remove failed');
              } else {
                console.log('remove succeeded');
              }
        });

    }

    $scope.newItem = function()
    {
        $scope.categories.push({
            "name":null,
            "key":null,
        })
    }

  })
.controller('PromotionCtrl', function($scope,$position, $firebaseArray) {

    var promotionRef = new Firebase("https://9lives.firebaseio.com/promotions");

    $scope.promotions = $firebaseArray(promotionRef);

    $scope.save = function(data , promotion)
    {
      var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
        console.log(promotion);
        if(promotion.key == null)
        {
            var newItem  = {
                'title' : data,
                 'time' :  TIMESTAMP   
            }

            promotionRef.push(newItem);
        }
        else
        {
           var promo = promotionRef.child(promotion.$id);
      
            promo.update({
               "title":  data
            });


        }
    }

    $scope.remove = function(promotion)
    {
     
        console.log('removed');
        var promo = promotionRef.child(promotion.$id);

        promo.remove(function(error){
              if (error) {
                console.log('remove failed');
              } else {
                console.log('remove succeeded');
              }
        });

    }

    $scope.newItem = function()
    {
        $scope.promotions.push({
            "title":null,
        })
    }

  });


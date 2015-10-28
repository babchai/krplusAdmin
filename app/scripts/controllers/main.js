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

  .controller('tncCtrl', function($scope) {

    var tncRef = new Firebase("https://9lives.firebaseio.com/TNC");

   $scope.save = function()
   {

    console.log($scope.tnc);

     tncRef.set({
      'value' : $scope.tnc
     })

     alert('New Term & Condition Saved.')
   }

  })

  .controller('LoginCtrl', function($scope,$position,$state) {
   
    $scope.user = {};
    
    $scope.login  = function(){
      var userRef = new Firebase("https://9lives.firebaseio.com/");

     $scope.promisses = userRef.authWithPassword({
        email    : $scope.user.email,
        password : $scope.user.password
      }, function(error, authData) { 

        if( error )
        {

          // $mdDialog.show(
          // $mdDialog.alert()
          //   .parent(angular.element(document.querySelector('#popupContainer')))
          //   .clickOutsideToClose(true)
          //   .title('Login Failed')
          //   .content("Couldn't sign in. The email or password is not correct.")
          //   .ok('Got it!')
          // );
          alert(error);
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
  .controller('videoCtrl' , function($scope, $firebaseArray, $stateParams){
     $scope.video = {}
     var firebaseRef = new Firebase("https://9lives.firebaseio.com/");
     var videoRef = firebaseRef.child('videos');
     $scope.videos = $firebaseArray(videoRef);

     $scope.add = function(){
          var TIMESTAMP = Math.round((new Date()).getTime() / 1000);

        videoRef.push({
          'path':$scope.video.path,
          'description' : $scope.video.description,
          'time' : TIMESTAMP
        })
     }

  })
  .controller('LookbookCtrl' , function($scope, $position, $firebaseArray, $stateParams , Upload){
    console.log('LookbookCtrl');
    $scope.category = $stateParams.category;
    $scope.name = $stateParams.name;
    $scope.lookbooks = [];
    $scope.newTag = '';

    var dataRef = new Firebase("https://9lives.firebaseio.com/");

    
    var lookbookRef = dataRef.child('lookbook2/'+$stateParams.category);


    $scope.lookbooks = $firebaseArray(lookbookRef);


    var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
    $scope.newFilename =TIMESTAMP+'.jpg';

     $scope.lookbooks.$loaded(function(data){
      //console.log(data);
     });

     $scope.addNewPhoto = function()
     {

        var TIMESTAMP = Math.round((new Date()).getTime() / 1000);
        $scope.newFilename =TIMESTAMP+'.jpg';
        $scope.addNew = true;
     }





     $scope.submitUpload = function() {
      //if (form.file.$valid && $scope.file && !$scope.file.$error) {
        $scope.upload($scope.file);

      //}
    }

    $scope.removeTag = function(item , key , tag){
      var tagRef = lookbookRef.child(item.$id+'/tags/'+key).remove();

      var photo = item.filename.split('.');

      var tagsRef = dataRef.child("tags/"+tag+"/Links");

      tagsRef.on('value', function(data){
         data.forEach(function(child){
            if(child.val().photo == photo[0])
            {
              dataRef.child("tags/"+tag+"/Links/"+child.key()).remove();

            }
         })
      });



    }

     $scope.upload = function (file) {
      console.log(file);
        var TIMESTAMP = Math.round((new Date()).getTime() / 1000);

         $scope.newFilename = TIMESTAMP+'.jpg';
        Upload.upload({
           method: 'POST',
            url: '//www.krplus.com/lookbook/index.php',
            //data: {file: file},
            file: file,
            sendFieldsAs: 'form',
            fields: {
                'filename' : $scope.newFilename,
                'category' : $scope.category
              
            }
        }).progress(function (evt) {
          console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log(data);

            lookbookRef.push({
              'filename':$scope.newFilename,
              'status' : 'active',
              'uploadtime' : TIMESTAMP
            })

           // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
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
            dataRef.child('tags/'+tag).set({
              'Links' : [{
                'category':$stateParams.category,
                'photo':filename[0]
              }]
            })
         }
        })

        lookbookRef.child(item.$id+'/tags').push(tag);

     }



    $scope.saveStylist  = function(item)
    {

      if(item.desc === "")
        item.desc = "null"
      if(!item.love)
        item.love = ""
      if(!item.star)
        item.star = ""
      if(!item.passion)
        item.passion = ""
      

      var items = lookbookRef.child(item.$id);
        console.log(item);


       items.update({
         'name' : item.name,
         'desc' : item.desc,
         'love' : item.love,
         'star' : item.star,
         'passion' : item.passion
       })

       alert('Description Saved.');
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

    // $scope.upload = function (file) {
    //     Upload.upload({
    //         url: 'http://localhost/file-upload/index.php',
    //         //fields: {'username': $scope.username},
    //         file: file
    //     }).progress(function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    //     }).success(function (data, status, headers, config) {
    //         console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    //     }).error(function (data, status, headers, config) {
    //         console.log('error status: ' + status);
    //     })
    // };

    // $scope.onFileSelect = function(file)
    // {
    //   console.log("upload");
    //   for (var i = 0; i < $files.length; i++) {
    //     Upload.upload({
    //       url: 'http://localhost/file-upload/index.php',
    //       file: file,
    //       progress: function(e){}
    //     }).then(function(data, status, headers, config) {
    //       // file is uploaded successfully
    //       console.log(data);
    //     }); 
    //   }
    // }

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
.controller('PromotionCtrl', function($scope,$position, $firebaseArray , Upload) {

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

      // $scope.submitUpload = function(promotion) {
      //   console.log(promotion);
      //   $scope.upload(promotion.file);
      // }

      $scope.addIcon = function(promotion){
        //console.log(item);
        promotion.showUpload = true;
      }

      $scope.submitUpload = function (promotion) {
        
        var file = promotion.file;
        console.log(file);

        var TIMESTAMP = Math.round((new Date()).getTime() / 1000);

        $scope.newFilename = TIMESTAMP+'.jpg';
        Upload.upload({
           method: 'POST',
            url: 'https://www.krplus.com/app/promotion/icon.php',
            //data: {file: file},
            file: file,
            sendFieldsAs: 'form',
            fields: {
                'filename' : $scope.newFilename,
              
            }
        }).progress(function (evt) {
          console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          //console.log(data);
           promotion.showUpload = false;
           var promo = promotionRef.child(promotion.$id).update({
            'icon':$scope.newFilename
           });


            // lookbookRef.push({
            //   'filename':$scope.newFilename,
            //   'status' : 'active',
            //   'uploadtime' : TIMESTAMP
            // })

           // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        })
    }

    $scope.newItem = function()
    {
        $scope.promotions.push({
            "title":null,
        })
    }

  }
)
;




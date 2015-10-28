'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])

  .config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from outer templates domain.
    'https://www.youtube.com/**'
  ]); 
 })
     
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
   

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                    'scripts/directives/emptyToNull.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                }),
                $ocLazyLoad.load({
                  name:'firebase',
                  files:[
                    'bower_components/firebase/firebase.js',
                    'bower_components/angularfire/dist/angularfire.min.js'
                  ]
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            }),
             $ocLazyLoad.load({
                  name:'firebase',
                  files:[
                    'bower_components/firebase/firebase.js',
                    'bower_components/angularfire/dist/angularfire.min.js'
                  ]
                })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.category',{
        templateUrl:'views/dashboard/category.html',
        url:'/category',
        controller:'CategoryCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
              $ocLazyLoad.load({
                name:'xeditable',
                files:[
                'bower_components/angular-xeditable/dist/js/xeditable.js',
                'bower_components/angular-xeditable/dist/css/xeditable.css'
                ]
            }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                'scripts/controllers/main.js',
                'scripts/directives/confirmation/confirmation.js'
                ]
            })
            
          }
        }
      })
       .state('dashboard.promotion',{
        templateUrl:'views/dashboard/promotion.html',
        url:'/promotion',
        controller:'PromotionCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'ngFileUpload',
                files:[
                'bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js',
                'bower_components/ng-file-upload/ng-file-upload.min.js'
                ]
            }),
              $ocLazyLoad.load({
                name:'xeditable',
                files:[
                'bower_components/angular-xeditable/dist/js/xeditable.js',
                'bower_components/angular-xeditable/dist/css/xeditable.css'
                ]
            }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                'scripts/controllers/main.js',
                'scripts/directives/confirmation/confirmation.js'
                ]
            })
            
          }
        }
      })
      .state('dashboard.user',{
        templateUrl:'views/dashboard/user.html',
        url:'/user',
        controller:'UserCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                'scripts/controllers/main.js',
                ]
            })
            
          }
        }
      })
      .state('dashboard.lookbook',{
        templateUrl:'views/dashboard/lookbook.html',
        url:'/lookbook/:category/:name',
        controller:'LookbookCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'angular.filter',
                files:[
                'bower_components/angular-filter/dist/angular-filter.min.js',
                ]
            }),
             $ocLazyLoad.load({
                name:'ngFileUpload',
                files:[
                'bower_components/ng-file-upload-shim/ng-file-upload-shim.min.js',
                'bower_components/ng-file-upload/ng-file-upload.min.js'
                ]
            }),
            $ocLazyLoad.load({
                name:'ng-uploadcare',
                files:[
                'bower_components/angular-uploadcare/angular-uploadcare.js',
                ]
            }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                 'scripts/controllers/main.js',
                 'scripts/directives/confirmation/confirmation.js',
                 'scripts/directives/filereader.js'
                ]
            })
            
          }
        }
      })
      .state('dashboard.video',{
        templateUrl:'views/dashboard/video.html',
        url:'/video',
        controller:'videoCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
            $ocLazyLoad.load({
                name:'angular.filter',
                files:[
                'bower_components/angular-filter/dist/angular-filter.min.js',
                ]
            }),
            $ocLazyLoad.load({
                name:'ng-uploadcare',
                files:[
                'bower_components/angular-uploadcare/angular-uploadcare.js',
                ]
            }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                 'scripts/controllers/main.js',
                 'scripts/directives/confirmation/confirmation.js',
                 'scripts/directives/filereader.js'
                ]
            })
            
          }
        }
      })
      .state('dashboard.tnc',{
        url:'/tnc',
        controller: 'tncCtrl',
        templateUrl:'views/dashboard/tnc.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                 'scripts/controllers/main.js',
                 'scripts/directives/confirmation/confirmation.js',
                 'scripts/directives/filereader.js'
                ]
            }),
             $ocLazyLoad.load({
                  name:'firebase',
                  files:[
                    'bower_components/firebase/firebase.js',
                    'bower_components/angularfire/dist/angularfire.min.js'
                  ]
                })
          }
        }
      })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
        controller:'LoginCtrl',
         resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'firebase',
              files:[
                'bower_components/firebase/firebase.js',
                'bower_components/angularfire/dist/angularfire.min.js'
              ]
            }),
             $ocLazyLoad.load({
                name:'cgBusy',
                files:[
                  'bower_components/angular-busy/angular-busy.js'
                ]
             }),
             $ocLazyLoad.load({
                name:'sbAdminApp',
                files:[
                 'scripts/controllers/main.js'
                ]
            })
          }
        }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);

    

/*global requirejs*/
'use strict';
requirejs.config({
     baseUrl:"",
     shim : {
         'Phaser': {
            exports: 'Phaser'
         }
     },
     paths: {
        /*'Phaser': '../../bower_components/phaser/build/phaser'*/
        /*'Phaser': 'lib/phaser.min'*/ /*El usado originalmente. Version 2.4.4*/
          'Phaser': 'lib/phaser.min.2-8-1'
     }
});
require(['loader'],
 function (loader) {
    loader.start();
 });

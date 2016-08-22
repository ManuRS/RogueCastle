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
         'Phaser': 'lib/phaser.min'
     }
});
require(['loader'],
 function (loader) {
    loader.start();
 });

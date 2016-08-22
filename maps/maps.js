
define(['Phaser','../game'], function (Phaser,Game) {
    function Maps (niveles) {
       for (i=0; i<niveles.length; i++){
            Game.load.tilemap('map'+niveles[i], 'assets/tilemaps/pantalla'+niveles[i]+'.json', null,Phaser.Tilemap.TILED_JSON);
        }

    }
    //Inheritance
    Maps.prototype = Object.create(Phaser.Sprite.prototype);
    Maps.prototype.constructor = Maps;
    
    Maps.prototype.create = function (map) {
         // Create the tilemap
        this.map = Game.add.tilemap(map);
        // Add the tileset to the map
        if(Game.global.nivel==1){
            this.map.addTilesetImage('suelo', 'suelo1');
        }else if(Game.global.nivel==2){
            this.map.addTilesetImage('suelo', 'suelo2');
        }else if(Game.global.nivel==3){
            this.map.addTilesetImage('suelo', 'suelo3');
        }else if(Game.global.nivel==4){
            this.map.addTilesetImage('suelo', 'suelo4');
        }else{
            this.map.addTilesetImage('suelo', 'suelo');
        }
        // Create the layer, by specifying the name of the Tiled layer
        this.layer = this.map.createLayer('fondo');
        this.layerChoque = this.map.createLayer('choque');
        // Set the world size to match the size of the layer
        this.layer.resizeWorld();
        this.layerChoque.resizeWorld();
        // Enable collisions for the first element of our tileset (the blue wall)
        this.map.setCollisionBetween(0, 200);
        
        Game.world.sendToBack(this.map);
        
        return this.layerChoque;
    }; 
    
    return Maps;
});
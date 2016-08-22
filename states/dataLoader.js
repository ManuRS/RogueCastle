
define(['Phaser','../game'], function (Phaser,Game){
    
    function DataLoader() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    DataLoader.prototype = Object.create(Phaser.State.prototype);
    DataLoader.prototype.constructor = DataLoader;
    
    /* download assets code here */
    DataLoader.prototype.preload = function () {
        
        Game.scale.pageAlignHorizontally=true;

        //Video
        Game.load.video('videoh1','assets/videos/h1.mp4');

        //Imagenes
        Game.load.image('fondoMenu','assets/fondos/min_menu.jpg');
        Game.load.image('logo','assets/fondos/logo.png');
        Game.load.image('fade','assets/fondos/fade3.png');
        Game.load.image('load','assets/fondos/fade.png');
        Game.load.image('fondoHistoria','assets/fondos/fondo_historia1.jpg');
        Game.load.image('fondoHistoria2','assets/fondos/fondo_creditos.jpeg');
        Game.load.image('negro','assets/fondos/negro.png');
        Game.load.image('uam','assets/fondos/uam.png');
        Game.load.image('sloth','assets/fondos/sloth.png');
        Game.load.image('mando','assets/fondos/mando.png');
        Game.load.image('mandoR','assets/fondos/mandoR.png');
        Game.load.image('tienda','assets/fondos/tienda.png');
        
        //Run
        Game.load.image('grass','assets/fondos/grass.jpg');
        Game.load.image('runfondo','assets/fondos/fondo_persecution.png');
        Game.load.spritesheet('bomba', 'assets/characters/bomba.png', 121, 100, 2);
        Game.load.spritesheet('explosion', 'assets/characters/explosion-sprite.png', 96, 97, 15);
        Game.load.atlasXML('rundefensor', 'assets/characters/enemy_persecution.png', 'assets/characters/defensor.xml');
        Game.load.spritesheet('d', 'assets/buttons/d.png', 75, 75, 2);
        Game.load.image('corchete','assets/buttons/corchete.png');
        Game.load.image('corcheteB','assets/buttons/corcheteB.png');
        Game.load.spritesheet('corazon', 'assets/characters/corazon.png', 83, 70, 2);
        Game.load.atlasXML('runboss', 'assets/characters/FinalBoss.png', 'assets/characters/FinalBoss.xml');
        Game.load.image('blanco', 'assets/fondos/blanco.png');
        
        //Sprites
        Game.load.atlasXML('yuki', 'assets/characters/Draglade1_Yuki2.png', 'assets/characters/Yuki.xml');
        
        Game.load.atlasXML('oso', 'assets/characters/Bear.png', 'assets/characters/Bear.xml');
        Game.load.atlasXML('oso2', 'assets/characters/Bear2.png', 'assets/characters/Bear.xml'); 
        Game.load.atlasXML('oso3', 'assets/characters/Bear3.png', 'assets/characters/Bear.xml'); 
        Game.load.atlasXML('oso4', 'assets/characters/Bear4.png', 'assets/characters/Bear.xml'); 
        Game.load.atlasXML('esbirro1', 'assets/characters/Thuggle.png', 'assets/characters/Thuggle.xml'); 
        Game.load.atlasXML('esbirro2', 'assets/characters/esbirro2.png', 'assets/characters/Thuggle.xml');
        Game.load.atlasXML('esbirro3', 'assets/characters/esbirro3.png', 'assets/characters/esbirroB.xml');
        Game.load.atlasXML('esbirro4', 'assets/characters/esbirro4.png', 'assets/characters/esbirroB.xml');
        Game.load.atlasXML('esbirro5', 'assets/characters/esbirro5.png', 'assets/characters/esbirroB.xml');
        Game.load.atlasXML('rata', 'assets/characters/Rata.png', 'assets/characters/Rata.xml');
        Game.load.atlasXML('rata2', 'assets/characters/Rata2.png', 'assets/characters/Rata.xml');
        Game.load.atlasXML('rata3', 'assets/characters/Rata3.png', 'assets/characters/Rata.xml');
        Game.load.atlasXML('rata4', 'assets/characters/Rata4.png', 'assets/characters/Rata.xml');
        Game.load.atlasXML('defensor', 'assets/characters/Levit.png', 'assets/characters/Levit.xml');
        Game.load.atlasXML('torreta', 'assets/characters/torreta.png', 'assets/characters/torreta.xml');
        Game.load.atlasXML('zeke', 'assets/characters/ZekeBoss.png', 'assets/characters/Zeke.xml');
        
        Game.load.spritesheet('yukiHistory', 'assets/characters/Yuki_inicio.png', 100, 240, 52);
        Game.load.atlasXML('yukiGameOver', 'assets/characters/yukiGameOver.png', 'assets/characters/yukiGameOver.xml');
        
        //Lanzamientos
        Game.load.atlasXML('torretaDisparo', 'assets/characters/FinalBoss.png', 'assets/characters/disparoBola.xml');
        Game.load.atlasXML('torretaSound', 'assets/characters/NeonBit.png', 'assets/characters/neonBit.xml');
        Game.load.atlasXML('remolino', 'assets/characters/Draglade1_Yuki2.png', 'assets/characters/remolino.xml');
        Game.load.atlasXML('espadas', 'assets/characters/Draglade1_Yuki2.png', 'assets/characters/espadas.xml');
        
        //Botones
        Game.load.spritesheet('mute', 'assets/buttons/muteButton.png', 28, 22);
        Game.load.spritesheet('full', 'assets/buttons/fullscreen.png', 40, 40);
        Game.load.spritesheet('b_m1', 'assets/buttons/button_m1.png', 193, 71);
        Game.load.spritesheet('b_m2', 'assets/buttons/button_m2.png', 193, 71);
        Game.load.spritesheet('b_m3', 'assets/buttons/button_m3.png', 193, 71);
        Game.load.spritesheet('b_m4', 'assets/buttons/button_m4.png', 193, 71);
        Game.load.spritesheet('b_m5', 'assets/buttons/button_m5.png', 193, 71);
        Game.load.spritesheet('b_p1', 'assets/buttons/button_p1.png', 193, 71);
        Game.load.spritesheet('b_p2', 'assets/buttons/button_p2.png', 193, 71);
        Game.load.spritesheet('b_p3', 'assets/buttons/button_p3.png', 193, 71);
        Game.load.spritesheet('b_p4', 'assets/buttons/button_p4.png', 193, 71);
        Game.load.spritesheet('b_p5', 'assets/buttons/button_p5.png', 193, 71);
        Game.load.spritesheet('b_g', 'assets/buttons/button_guardar.png', 193, 71);
        Game.load.spritesheet('b_c', 'assets/buttons/button_cargar.png', 193, 71);
        Game.load.spritesheet('b_t', 'assets/buttons/button_tienda.png', 193, 71);
        Game.load.spritesheet('b_como', 'assets/buttons/button_como.png', 193, 71);
        Game.load.spritesheet('b_creditos', 'assets/buttons/button_creditos.png', 193, 71);
        Game.load.spritesheet('b_esta', 'assets/buttons/button_esta.png', 193, 71);
        
        //Utilidades
        Game.physics.startSystem(Phaser.Physics.ARCADE);      
        Game.load.json('version', 'assets/tilemaps/tilemaps.json');
        Game.load.image('suelo', 'assets/tilemaps/suelo.png');
        Game.load.image('suelo1', 'assets/tilemaps/suelo1.png');
        Game.load.image('suelo2', 'assets/tilemaps/suelo2.png');
        Game.load.image('suelo3', 'assets/tilemaps/suelo3.png');
        Game.load.image('suelo4', 'assets/tilemaps/suelo4.png');
        Game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        //Audio
        Game.load.audio('musicaMenu','assets/sound/02 Vario (Original Mix).ogg');
        Game.load.audio('musicaMenu2','assets/sound/16 Savant Thunderclout.ogg');   
        Game.load.audio('musica','assets/sound/13 Ism (Original Mix).ogg');
        Game.load.audio('musica2','assets/sound/01 Splinter (Original Mix).ogg');
        Game.load.audio('musica3','assets/sound/SEQ_dra20.ogg');
        Game.load.audio('musicaMas','assets/sound/SEQ_BGM_menu01.ogg');
        Game.load.audio('game_over','assets/sound/Game_over.ogg');
        Game.load.audio('musicaTienda','assets/sound/03 Living Ipod (Original Mix).ogg');
        Game.load.audio('musicaHistoria','assets/sound/SEQ_battle.ogg');
        Game.load.audio('fanfare','assets/sound/Final Fantasy XIV OST - Victory Fanfare.ogg');
        
        Game.load.audio('bossAg','assets/sound/bossAg.ogg');
        Game.load.audio('boss1','assets/sound/boss1.ogg');
        Game.load.audio('boss2','assets/sound/boss2.ogg');
        Game.load.audio('boss3','assets/sound/boss3.ogg');
        Game.load.audio('boss4','assets/sound/boss4.ogg');
    
        Game.load.audio('bomba','assets/sound/bomba.ogg');
        
        Game.load.audio('yuki_jump','assets/sound/yuki_jump.ogg');
        Game.load.audio('yuki_attack','assets/sound/yuki_attack.ogg');
        Game.load.audio('clin','assets/sound/clin.ogg');
        Game.load.audio('powerup','assets/sound/powerup.ogg');
        Game.load.audio('coin1','assets/sound/coin1.ogg');
        Game.load.audio('muerte1','assets/sound/muerte1.ogg');
        Game.load.audio('muerteH','assets/sound/muerteH.ogg');
        Game.load.audio('muerteR','assets/sound/muerteR.ogg');
        Game.load.audio('laser','assets/sound/laser.ogg');
        
        Game.load.audio('runMusic4', 'assets/sound/SEQ_BGM_staffroll.ogg'); //Dejarla la última
    };
    
    /* initialize persistent game objects here CREATE*************************************************/
    DataLoader.prototype.create = function () {
        this.enter=Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.cargado=false;
        this.on=false;
        this.onPunto=true;
        
        //Logo A
        this.a=Game.add.sprite(0,0, 'uam');
        this.a.alpha=0;
        this.b = Game.add.tween(this.a).to( { alpha: 1 }, 2500, Phaser.Easing.Linear.None, true, 0, 1000, false);
        this.b.repeat(0, 50);
        this.b.onComplete.add(logob, this); 
    };
    
    function logob () {
        this.a=Game.add.sprite(0,0, 'sloth');
        this.a.alpha=0;
        this.b = Game.add.tween(this.a).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, false);
        this.b.repeat(0, 50);
        this.b.onComplete.add(logoc, this); 
    }
    
    function logoc () {
        this.a=Game.add.sprite(0,0, 'load');
        this.a.alpha=0;
        this.b = Game.add.tween(this.a).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true, 0, 2000, false);
        this.b.repeat(0, 50);
        this.b.onComplete.add(carga, this); 
    }
    
    function carga (){
        this.nameLabel = Game.add.text(Game.world.centerX+175, Game.world.centerY+220, 'Cargando',
                                       { font: '50px MedievalSharp', fill: '#ffffff' });
        this.nameLabel.anchor.setTo(0, 0.5);
        this.nameLabel.alpha=0;
        Game.add.tween(this.nameLabel).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
        Game.add.tween(this.nameLabel.scale).to( { x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.None, true);
        /*Game.time.events.add(500, function() {
            Game.add.tween(this.nameLabel).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            Game.add.tween(this.nameLabel.scale).to( { x: 0.5, y: 0.5}, 500, Phaser.Easing.Linear.None, true);
        },this);*/
        this.puntos=0;
        this.on=true;
        
        this.logo = Game.add.sprite(500, 150, 'logo');
        this.logo.alpha=0;
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.15, 0.15);
        this.logo = Game.add.tween(this.logo).to( { alpha: 1 }, 5000, Phaser.Easing.Linear.None, true, 0, 2000, false);
        this.logo.repeat(0, 50);
        
        
    }
    
    /* update movements, collisions, score here UPDATE*******************************************************/
    DataLoader.prototype.update = function () {
        //##############################################################################   PARA QUITAR
        //if (this.enter.isDown){
                    //Game.state.start('Menu');
        //};
        //##############################################################################
        
        if(this.on){
            if(this.cache.isSoundDecoded('runMusic4') && this.cargado==false){
                this.nameLabel.destroy();
                this.nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY+50, 'Pulsa enter',
                                               { font: '50px MedievalSharp', fill: '#ffffff' });
                this.nameLabel.anchor.setTo(0.5, 0.5);
                this.nameLabel.alpha=0;
                Game.add.tween(this.nameLabel).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
                Game.add.tween(this.nameLabel.scale).to( { x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.None, true);
                this.cargado=true;
                Game.time.events.add(Phaser.Timer.SECOND * 1, enterFlash, this);

            }else if(this.cargado==true){
                if (this.enter.isDown){
                    Game.state.start('Menu');
                };
            }else if (this.onPunto){
                this.nameLabel.destroy();
                if(this.puntos==0){
                    this.nameLabel = Game.add.text(Game.world.centerX+175, Game.world.centerY+220, 'Cargando.',
                                                   { font: '50px MedievalSharp', fill: '#ffffff' });
                    this.nameLabel.anchor.setTo(0, 0.5);
                    this.puntos++;
                }else if(this.puntos==1){
                    this.nameLabel = Game.add.text(Game.world.centerX+175, Game.world.centerY+220, 'Cargando..',
                                                   { font: '50px MedievalSharp', fill: '#ffffff' });
                    this.nameLabel.anchor.setTo(0, 0.5);
                    this.puntos++;
                }
                else if(this.puntos==2){
                    this.nameLabel = Game.add.text(Game.world.centerX+175, Game.world.centerY+220, 'Cargando...',
                                                   { font: '50px MedievalSharp', fill: '#ffffff' });
                    this.nameLabel.anchor.setTo(0, 0.5);
                    this.puntos++;
                }else{ //Tres puntos
                    this.nameLabel = Game.add.text(Game.world.centerX+175, Game.world.centerY+220, 'Cargando',
                                                   { font: '50px MedievalSharp', fill: '#ffffff' });
                    this.nameLabel.anchor.setTo(0, 0.5);
                    this.puntos=0;
                }
                this.onPunto=false;
                Game.time.events.add(Phaser.Timer.SECOND * 0.5, onPuntof, this);
            }
            
        }

    };    
    
    function onPuntof(){
        this.onPunto=true;
    }
    
    function enterFlash(){
        if(this.nameLabel.alpha==0)
            this.nameLabel.alpha=1
        else
            this.nameLabel.alpha=0
        Game.time.events.add(Phaser.Timer.SECOND * 1, enterFlash, this);
    }
    
    return DataLoader;
});


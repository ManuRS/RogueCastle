
define(['Phaser','../game'], function (Phaser,Game){
    
    function Menu() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    Menu.prototype = Object.create(Phaser.State.prototype);
    Menu.prototype.constructor = Menu;
    
    /* download assets code here */
    Menu.prototype.preload = function () {
        
    };
    
    /* initialize persistent game objects here CREATE*************************************************/
    Menu.prototype.create = function () {
        
        Game.add.sprite(0,0, 'fondoMenu');
        var logo = Game.add.sprite(120,-350, 'logo');
        logo.scale.setTo(0.25, 0.25);
        Game.add.tween(logo).to({y: 35}, 2000).easing(Phaser.Easing.Bounce.Out).start();
                
        this.muteButton = Game.add.button(20, 15, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        if (Game.sound.mute) {
            // Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        this.fullButton = Game.add.button(80, 10, 'full', this.goFull, this);
        this.fullButton.input.useHandCursor = true;
        this.fullButton.scale.setTo(0.8, 0.8);
        
        this.botones();
    };
    
    /* update movements, collisions, score here UPDATE*******************************************************/
    Menu.prototype.update = function () {
        

    };
    
    Menu.prototype.botones = function () {
        this.b_m1 = Game.add.button(520, 50, 'b_m1', m1, this, 2, 1, 0);
        if(Game.global.nivelMax>0) this.b_p1 = Game.add.button(750, 50, 'b_p1', p1, this, 2, 1, 0);
        if(Game.global.nivelMax>1) this.b_m2 = Game.add.button(520, 150, 'b_m2', m2, this, 2, 1, 0);
        if(Game.global.nivelMax>2) this.b_p2 = Game.add.button(750, 150, 'b_p2', p2, this, 2, 1, 0);
        if(Game.global.nivelMax>3) this.b_m3 = Game.add.button(520, 250, 'b_m3', m3, this, 2, 1, 0);
        if(Game.global.nivelMax>4) this.b_p3 = Game.add.button(750, 250, 'b_p3', p3, this, 2, 1, 0);
        if(Game.global.nivelMax>5) this.b_m4 = Game.add.button(520, 350, 'b_m4', m4, this, 2, 1, 0);
        if(Game.global.nivelMax>6) this.b_p4 = Game.add.button(750, 350, 'b_p4', p4, this, 2, 1, 0);
        if(Game.global.nivelMax>7) this.b_m5 = Game.add.button(520, 450, 'b_m5', m5, this, 2, 1, 0);
        if(Game.global.nivelMax>7) this.b_p5 = Game.add.button(750, 450, 'b_p5', p5, this, 2, 1, 0);
        
        this.b_g = Game.add.button(35, 362, 'b_g', guardar, this, 2, 1, 0);
        this.b_g.scale.setTo(0.7, 0.7);
        this.b_c = Game.add.button(185, 362, 'b_c', cargar, this, 2, 1, 0);
        this.b_c.scale.setTo(0.7, 0.7);
        this.b_t = Game.add.button(335, 362, 'b_t', tienda, this, 2, 1, 0);
        this.b_t.scale.setTo(0.7, 0.7);
        
        this.b_como = Game.add.button(35, 462, 'b_como', guia, this, 2, 1, 0);
        this.b_como.scale.setTo(0.7, 0.7);
        this.b_creditos = Game.add.button(185, 462, 'b_creditos', creditos, this, 2, 1, 0);
        this.b_creditos.scale.setTo(0.7, 0.7);
        this.b_esta = Game.add.button(335, 462, 'b_esta', estadisticas, this, 2, 1, 0);
        this.b_esta.scale.setTo(0.7, 0.7);
        
        
    };
    
    function m1 () { 
        Game.global.nivel=1;
        Game.state.start('Intro', false, true, 'Mazmorra', 1); 
    }
    function m2 () { 
        Game.global.nivel=2;
        Game.state.start('Intro', false, true, 'Mazmorra', 2); 
    }
    function m3 () { 
        Game.global.nivel=3;
        Game.state.start('Intro', false, true, 'Mazmorra', 3); 
    }
    function m4 () { 
        Game.global.nivel=4;
        Game.state.start('Intro', false, true, 'Mazmorra', 4); 
    }
    function m5 () { 
        Game.global.nivel=5;
        Game.state.start('Intro', false, true, 'Mazmorra', 5); 
    }
    function p1 () { Game.state.start('Intro', false, true, 'Persecution', 1); }
    function p2 () { Game.state.start('Intro', false, true, 'Persecution', 2); }
    function p3 () { Game.state.start('Intro', false, true, 'Persecution', 3); }
    function p4 () { Game.state.start('Intro', false, true, 'Persecution', 4); }
    function p5 () { Game.state.start('Intro', false, true, 'Persecution', 5); }
    function tienda () { Game.state.start('Tienda', false, true); }
    function cargar () { Game.state.start('Mas', false, true, 'Cargar'); }
    function guardar () { Game.state.start('Mas', false, true, 'Guardar'); }
    function creditos () { Game.state.start('Mas', false, true, 'Creditos'); }
    function estadisticas () { Game.state.start('Mas', false, true, 'Estadisticas'); }
    function guia () { Game.state.start('Mas', false, true, 'Guia', 0); }
     
    Menu.prototype.goFull = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    Menu.prototype.toggleSound = function () {
        Game.sound.mute = ! Game.sound.mute;
        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
     };
    
    Menu.prototype.shutdown = function () {
        this.musica.stop(); 
        this.b_m1.destroy();
        if(Game.global.nivelMax>1) this.b_m2.destroy();
        if(Game.global.nivelMax>3) this.b_m3.destroy();
        if(Game.global.nivelMax>5) this.b_m4.destroy();
        if(Game.global.nivelMax>7) this.b_m5.destroy();
        if(Game.global.nivelMax>0) this.b_p1.destroy();
        if(Game.global.nivelMax>2) this.b_p2.destroy();
        if(Game.global.nivelMax>4) this.b_p3.destroy();
        if(Game.global.nivelMax>6) this.b_p4.destroy();
        if(Game.global.nivelMax>7) this.b_p5.destroy();
        this.b_g.destroy();
        this.b_c.destroy();
        this.b_t.destroy();
        this.b_como.destroy();
        this.b_creditos.destroy();
        this.b_esta.destroy();
     };
    
    Menu.prototype.init = function(){
        if(Math.random()>0.5){
            this.musica=Game.add.audio('musicaMenu');
        }else{
            this.musica=Game.add.audio('musicaMenu2');
        }
        this.musica.play();
    }
    
    return Menu;
});


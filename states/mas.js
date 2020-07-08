
define(['Phaser','../game'], function (Phaser,Game){
    
    function Mas() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    Mas.prototype = Object.create(Phaser.State.prototype);
    Mas.prototype.constructor = Mas;
    
    /* download assets code here */
    Mas.prototype.preload = function () {
        //Game.stage.backgroundColor = '#3498db'; this.oro.text = "Oro: " + Game.global.oro;
    };
    
    /* initialize persistent game objects here CREATE*************************************************/
    Mas.prototype.create = function () {
        this.enter=Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        if(this.param!="Guia")
            this.back = Game.add.text(850,520, ' Atras ',{ font: '50px MedievalSharp', fill: '#ffffff', backgroundColor: 'rgba(0,0,0,1.0)' });
        else
            this.back = Game.add.text(850,520, ' Siguiente ',{ font: '50px MedievalSharp', fill: '#ffffff', backgroundColor: 'rgba(0,0,0,1.0)' });
        this.back.anchor.setTo(0.5, 0.5);
        this.back.inputEnabled = true;
        this.back.events.onInputOver.add(this.overInstr, this.back);
        this.back.events.onInputOut.add(this.outInstr, this.back);
        if(this.param!="Guia")
            this.back.events.onInputDown.add(this.downInstr, this.back);
        else
            this.back.events.onInputDown.add(this.downInstr2, this);
        //Botones
        this.muteButton = Game.add.button(20, 15, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        if (Game.sound.mute) {
            // Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        
        this.fullButton = Game.add.button(950, 10, 'full', this.goFull, this);
        this.fullButton.input.useHandCursor = true;
        this.fullButton.scale.setTo(0.8, 0.8);
    };
    
    /* update movements, collisions, score here UPDATE*******************************************************/
    Mas.prototype.update = function () { 
        if(this.enableW && this.enter.isDown){
            Game.state.start('Menu');
        }
    };
    
    Mas.prototype.init = function(param, param1, param2) {
        this.param=param;
        this.musica=Game.add.audio('musicaMas');
        this.musica.loop=true;
        this.musica.play();
        Game.add.sprite(0,0, 'fondoHistoria2');
        this.font='60px MedievalSharp';
        this.fill='#ffffff';
        this.bg='rgba(0,0,0,1.0)';
        this.font2='45px MedievalSharp';
        this.bg2='rgba(255,0,0,1.0)';

        this.font3='30px MedievalSharp';
        this.fill3='#000000';
        this.bg3='rgba(0,0,0,0.0)';
        
        if(param=="Guardar"){
            this.label =Game.add.text(100, -200,
                                      'Guardando partida...',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.enableW=false;
           
            /*Variables a guardar*/
            localStorage.setItem("nivelMax", Game.global.nivelMax);
            localStorage.setItem("score", Game.global.score);
            localStorage.setItem("deads", Game.global.deads);
            localStorage.setItem("deadsR", Game.global.deadsR);
            localStorage.setItem("oro", Game.global.oro);
            localStorage.setItem("espada1", Game.global.espada1);
            localStorage.setItem("espada2", Game.global.espada2);
            localStorage.setItem("espada3", Game.global.espada3);
            localStorage.setItem("pocion1", Game.global.pocion1);
            localStorage.setItem("pocion2", Game.global.pocion2);
            localStorage.setItem("pocion3", Game.global.pocion3);
            localStorage.setItem("defensa1", Game.global.defensa1);
            localStorage.setItem("defensa2", Game.global.defensa2);
            localStorage.setItem("defensa3", Game.global.defensa3);
            localStorage.setItem("espadas", Game.global.espadas);
            localStorage.setItem("remolino", Game.global.remolino);
            localStorage.setItem("dash", Game.global.dash);   
            localStorage.setItem("gastado", Game.global.gastado);
            localStorage.setItem("dist", Game.global.dist);
            /********************/
            
            this.label.destroy();
            this.label =Game.add.text(100, -200,
                                      'Partida guardada',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.enableW=true;
            this.estadisticas();
            
        }else if(param=="Cargar"){
            this.label =Game.add.text(100, -200,
                                      'Cargando partida...',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.enableW=false;
        
            /*Revisar carga erronea*/
            this.label.destroy();
            if (localStorage.getItem("nivelMax")==undefined){
                this.label =Game.add.text(100, -200,
                                      'Error',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
                this.label3 =Game.add.text(100, 160,
                                      'Error al cargar la partida\n\nNo hay guardada información \nsobre el progreso en el juego\n\nNota: es tu navegador el que \nalmacena la informacion por medio \nde una cookie, no la elimines',
                                      {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
            }else{
                /*Variables a cargar*/
                Game.global.nivelMax = parseInt( localStorage.getItem("nivelMax") );
                Game.global.score    = parseInt( localStorage.getItem("score")    );
                Game.global.deads    = parseInt( localStorage.getItem("deads")    );
                Game.global.deadsR   = parseInt( localStorage.getItem("deadsR")   );
                Game.global.oro      = parseInt( localStorage.getItem("oro")      );
                Game.global.espada1  = parseInt( localStorage.getItem("espada1")  );
                Game.global.espada2  = parseInt( localStorage.getItem("espada2")  );
                Game.global.espada3  = parseInt( localStorage.getItem("espada3")  );
                Game.global.pocion1  = parseInt( localStorage.getItem("pocion1")  );
                Game.global.pocion2  = parseInt( localStorage.getItem("pocion2")  );
                Game.global.pocion3  = parseInt( localStorage.getItem("pocion3")  );
                Game.global.defensa1 = parseInt( localStorage.getItem("defensa1") );
                Game.global.defensa2 = parseInt( localStorage.getItem("defensa2") );
                Game.global.defensa3 = parseInt( localStorage.getItem("defensa3") );
                Game.global.espadas  = parseInt( localStorage.getItem("espadas")  );
                Game.global.remolino = parseInt( localStorage.getItem("remolino") );
                Game.global.dash     = parseInt( localStorage.getItem("dash")     );
                Game.global.gastado  = parseInt( localStorage.getItem("gastado")  );
                Game.global.dist     = parseInt( localStorage.getItem("dist")     );
                /***************************/
                
                this.label =Game.add.text(100, -200,
                                          'Partida cargada',
                                          {font:this.font, fill:this.fill, backgroundColor:this.bg });
                this.estadisticas();
            }
            this.enableW=true;
        }else if(param=="Estadisticas"){
            this.label =Game.add.text(100, -200,
                                      'Estadisticas',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.enableW=true;
            this.estadisticas();
        }else if(param=="Creditos"){

            this.label =Game.add.text(100, -200,
                                      ' Creditos ',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.label2 =Game.add.text(100, -600,
                                      ' ROGUE CASTLE ',
                                      {font:this.font2, fill:this.fill, backgroundColor:this.bg2 });
            this.label3 =Game.add.text(100, 215,
                                      'A Sloth Technologies production:\n\t\t\tJorge Guillén Alonso\n\t\t\tManuel Reyes Sánchez',
                                      {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
            this.label3.alpha=0;
            this.label4 =Game.add.text(100, 350,
                                      '2015-2016 \nVideojuegos \nGrado en Ingeniería Informática\nEPS - UAM',
                                      {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
            this.label4.alpha=0;
            
            
            var t = Game.add.tween(this.label2).to({y: 140}, 3000).easing(Phaser.Easing.Bounce.Out).start();
            t.onComplete.add(
                function(){
                    var t2 = Game.add.tween(this.label3).to( { alpha: 1 }, 6000, "Linear", true);
                    t2.onComplete.add(
                        function(){
                            Game.add.tween(this.label4).to( { alpha: 1 }, 6000, "Linear", true);
                        },this);
                },this);
            this.enableW=true;
        }
        else if(param=="Guia"){
            this.enableW=false;
            this.tipoG=param1;
            this.nivelG=param2;
            this.label =Game.add.text(100, -200,
                                      'Guia',
                                      {font:this.font, fill:this.fill, backgroundColor:this.bg });   
            this.tuto();
        }
        Game.add.tween(this.label).to({y: 50}, 2000).easing(Phaser.Easing.Bounce.Out).start();
    }
       
    Mas.prototype.goFull = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    Mas.prototype.toggleSound = function () {
        Game.sound.mute = ! Game.sound.mute;

        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
     };
    
    Mas.prototype.estadisticas = function(){
        this.font3='30px MedievalSharp';
        this.fill3='#000000';
        this.bg3='rgba(0,0,0,0.0)';
        this.label4 =Game.add.text(100, 200,
                                   'Enemigos eliminados en los Templos: '+Game.global.score+'\nVeces muerto en los Templos: '+Game.global.deads+'\nOro actual: '+Game.global.oro+'\nOro gastado: '+Game.global.gastado+'\nMetros corridos: '+Math.floor(Game.global.dist)+ '\nVeces muerto en la persecucion: '+Game.global.deadsR,
                                   {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
        this.label4.alpha=0;
        var t = Game.add.tween(this.label4).to( { alpha: 1 }, 6000, "Linear", true);
    }
    
    Mas.prototype.tuto = function(){
        this.font3='30px MedievalSharp';
        this.fill3='#000000';
        this.bg3='rgba(0,0,0,0.0)';
        this.labelT =Game.add.text(75, 150,
                                   'En los templos tu objetivo es avanzar hasta \nla ultima sala, si te quedas sin vida (barra \nverde) perderas. Elimina enemigos para \nconseguir oro y comprar armas y \nhabilidades en la tienda. \nCada templo tiene enemigos mas fuertes. \nLas habilidades consumen mana (barra azul). \nLos templos cambian la forma de sus salas \nen cada ocasion para probar a los guerreros \nque quieran su poder.',
                                   {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
        this.labelT.alpha=0;
        var t = Game.add.tween(this.labelT).to( { alpha: 1 }, 6000, "Linear", true); 
    }
    
    Mas.prototype.shutdown = function () {
        this.musica.stop();   
     };
    
    Mas.prototype.overInstr = function (item) { 
        item.fill = "#f00000";
    };
    
    Mas.prototype.outInstr = function (item) { 
        item.fill = "#ffffff";
    };
    
    Mas.prototype.downInstr = function (item) { 
        Game.state.start('Menu');
    };
    
    Mas.prototype.downInstr2 = function () { 
        this.font3='30px MedievalSharp';
        this.fill3='#000000';
        this.bg3='rgba(0,0,0,0.0)';
        this.labelT.destroy();
        this.label4 =Game.add.text(75, 150,
                                   'La persecucion cuenta con enemigos (atacales)\ny bombas (esquivalas). Si pierdes todas las \nvidas, quedas eliminado, si aguantas el \ntiempo necesario, vences. En la batalla final \nno hay tiempo, con tus ataques cargas la \nespada y con la carga completa debes \napretar D cuando se encuentre dentro de \nlos margenes para quitar una vida \nal señor oscuro.',
                                   {font:this.font3, fill:this.fill3, backgroundColor:this.bg3 });
        this.label4.alpha=0;
        var t = Game.add.tween(this.label4).to( { alpha: 1 }, 6000, "Linear", true);
        
        this.back.events.destroy();
        this.back.events.onInputDown.add(this.downInstr3, this);
        this.back.events.onInputOver.add(this.overInstr, this.back);
        this.back.events.onInputOut.add(this.outInstr, this.back);
    };
    
    Mas.prototype.downInstr3 = function () { 
        this.a=Game.add.sprite(0,0, 'mando');
        this.a.alpha=0;
        this.b = Game.add.tween(this.a).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, false);
        this.b.repeat(0, 50);
        
        Game.world.bringToTop(this.back);
        this.back.x=250;
        this.back.fill = "#ffffff";
        this.back.events.destroy();
        this.back.events.onInputDown.add(this.downInstr4, this);
        this.back.events.onInputOver.add(this.overInstr, this.back);
        this.back.events.onInputOut.add(this.outInstr, this.back);
    };
    
    Mas.prototype.downInstr4 = function () { 
        this.a=Game.add.sprite(0,0, 'mandoR');
        this.a.alpha=0;
        this.b = Game.add.tween(this.a).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0, 1000, false);
        this.b.repeat(0, 50);
        
        Game.world.bringToTop(this.back);
        this.back.events.destroy();
        this.back.events.onInputDown.add(this.downInstr5, this);
        this.back.events.onInputOver.add(this.overInstr, this.back);
        this.back.events.onInputOut.add(this.outInstr, this.back);
    };
    
    Mas.prototype.downInstr5 = function () { 
        if(this.tipoG==0)
            Game.state.start('Menu', false, true);
        else
            Game.state.start('Intro', false, true, this.tipoG, this.nivelG);
    
    }
    
    
    return Mas;
});



define(['Phaser','../game'], function (Phaser,Game){
    
    function Intro() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    Intro.prototype = Object.create(Phaser.State.prototype);
    Intro.prototype.constructor = Intro;
    
    /* download assets code here */
    Intro.prototype.preload = function () {
        //Game.stage.backgroundColor = '#3498db';
        
    };
    
    /* initialize persistent game objects here*/
    Intro.prototype.create = function () {
        this.enter=Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
    };
    
    /* update movements, collisions, score here*/
    Intro.prototype.update = function () { 
        if (this.enter.isDown && this.botonesOn){
            Game.state.start(this.tipo, false, true, this.nivel);
        }else if(this.enter.isDown && this.flagLast){
            Game.state.start('Intro', false, true, 'Menu', 10);
        }

        if(this.bossMove && this.moveBoss){
            if(this.runboss.up){
                //this.runboss.x+=0.4;
                this.runboss.y+=0.4;
                if(this.runboss.y>550)
                    this.runboss.up=false;
            }else{
                //this.runboss.x-=0.4;
                this.runboss.y-=0.4;
                if(this.runboss.y<500)
                    this.runboss.up=true;
            }
        }
    };
                             
    Intro.prototype.init = function(param1, param2) {
        this.musica=Game.add.audio('game_over');
        
        this.tipo=param1;
        this.nivel=param2;
        this.video = Game.add.video('videoh1');
        this.botonesOn=true;
        this.flagLast=false;
        
        //Finales de partida
        if(this.tipo=='Menu'){
            
            //Game over
            if(this.nivel==0){
                Game.add.sprite(0,0, 'negro');
                this.font='70px MedievalSharp';
                this.fill='#ff0000';
                this.bg='rgba(0,0,0,0.50)';
                this.label =Game.add.text(Game.world.centerX, 250,' Game Over ', 
                                          {font:this.font, fill:this.fill, backgroundColor:this.bg });
                this.label.alpha = 0;
                Game.add.tween(this.label).to( { alpha: 1 }, 4000, "Linear", true);
                this.label.anchor.setTo(0.5, 0.5);
                this.musica=Game.add.audio('game_over');
                this.musica.loop=true;
                this.musica.play();
                
                this.yukiOver = Game.add.sprite(Game.world.centerX-50, 360, 'yukiGameOver');
                this.yukiOver.anchor.setTo(0, 0.5);
                this.yukiOver.scale.setTo(2, 2);
                this.yukiOver.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7], 12, false);
                this.yukiOver.animations.play('start');
            }
            
            //Finales victoriosos
            else{
                Game.add.sprite(0,0, 'fondoHistoria2');
                this.font='60px MedievalSharp';
                this.fill='#000000';
                this.bg='rgba(0,0,0,0.0)';
                if (this.nivel<9){
                    this.musica=Game.add.audio('fanfare');
                    this.musica.loop=true;
                    this.musica.play();
                }
                //Mazmorras
                if (this.nivel==1){
                    this.label =Game.add.text(100, 120,
                                              'Nivel completado\n\nYuki ha obtenido\nel poder de la Tierra',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    if(Game.global.nivelMax<1){
                        Game.global.nivelMax=1;
                    }
                }else if(this.nivel==2){
                    this.label =Game.add.text(100, 120,
                                              'Nivel completado\n\nYuki ha obtenido\nel poder del Mar',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    if(Game.global.nivelMax<3){
                        Game.global.nivelMax=3;
                    }
                }else if(this.nivel==3){
                    this.label =Game.add.text(100, 120,
                                              'Nivel completado\n\nYuki ha obtenido\nel poder del Aire',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    if(Game.global.nivelMax<5){
                        Game.global.nivelMax=5;
                    }
                }else if(this.nivel==4){
                    this.label =Game.add.text(100, 120,
                                              'Nivel completado\n\nYuki ha obtenido\nel poder de la Luz',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    if(Game.global.nivelMax<7){
                        Game.global.nivelMax=7;
                    }
                }else if(this.nivel==5){
                    this.label =Game.add.text(100, 120,
                                              'Nivel completado\n\nEres un experto\nde Rogue Castle',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                }
                //Persecucion
                else if(this.nivel==6){
                    this.label =Game.add.text(100, 50,
                                              'Nivel completado\n\nYuki ha llegado\nal Templo del Mar\n\nNivel 1 *'+Game.global.vidasAuxRun+' Vidas =\n' +Game.global.vidasAuxRun+' Monedas de Oro',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    Game.global.oro+=Game.global.vidasAuxRun;
                    if(Game.global.nivelMax<2){
                        Game.global.nivelMax=2;
                    }
                }else if(this.nivel==7){
                    this.label =Game.add.text(100, 50,
                                              'Nivel completado\n\nYuki ha llegado\nal Templo del Aire\n\nNivel 2 * '+Game.global.vidasAuxRun+' Vidas =\n' +Game.global.vidasAuxRun*2+' Monedas de Oro',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    Game.global.oro+=Game.global.vidasAuxRun*2;
                    if(Game.global.nivelMax<4){
                        Game.global.nivelMax=4;
                    }
                }else if(this.nivel==8){
                    this.label =Game.add.text(100, 50,
                                              'Nivel completado\n\nYuki ha llegado\nal Templo de la Luz\n\nNivel 3 * '+Game.global.vidasAuxRun+' Vidas =\n' +Game.global.vidasAuxRun*3+' Monedas de Oro',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    Game.global.oro+=Game.global.vidasAuxRun*3;
                    if(Game.global.nivelMax<6){
                        Game.global.nivelMax=6;
                    }
                }else if(this.nivel==9){
                    this.musica=Game.add.audio('musicaHistoria');
                    this.musica.loop=true;
                    this.musica.play();
                    if(Game.global.nivelMax<8){
                        Game.global.nivelMax=8;
                    }
                    this.botonesOn=false;
                    this.flagLast=true;
                    this.nivel=10;
                    this.base();
                    this.fontEntrada='40px MedievalSharp';
                    this.fontDialogos='30px MedievalSharp';
                    this.fillW='#ffffff';
                    this.fillB='#000000';
                    this.fillR='#f00000';
                    this.bgEntrada='rgba(0,0,0,0.70)';
                    this.bgB='rgba(0,0,0,1.0)';
                    this.bgW='rgba(255,255,255,1.0)';

                    this.label2 =Game.add.text(100, 50,' Este es tu final señor oscuro! ',
                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                    this.label2.alpha = 0;
                    this.tween1 = Game.add.tween(this.label2).to( { alpha: 1 }, 2000, "Linear", true);
                    this.tween1.onComplete.add(finH1, this);
                    
                    this.label =Game.add.text(100, 100,' ',{font:this.font, fill:this.fill, backgroundColor:this.bg });
                    
                }else if(this.nivel==10){
                    this.musica=Game.add.audio('fanfare');
                    this.musica.loop=true;
                    this.musica.play();
                    this.label =Game.add.text(100, 50,
                                              'Nivel completado\n\nYuki ha liberado\nal pueblo del mal\n\nNivel 4 * '+Game.global.vidasAuxRun+' Vidas =\n' +Game.global.vidasAuxRun*4+' Monedas de Oro',
                                              {font:this.font, fill:this.fill, backgroundColor:this.bg });
                    Game.global.oro+=Game.global.vidasAuxRun*4;
                }
                this.label.alpha = 0;
                Game.add.tween(this.label).to( { alpha: 1 }, 4000, "Linear", true);
                
            }

        }
        
        //Historia de las mazmorras
        else if (this.tipo=="Mazmorra"){
            if(this.nivel==1){
                if(Game.global.videoVisto==0){
                    Game.global.videoVisto=1;
                    this.botonesOn=false;
                    sprite = this.video.addToWorld(0, 0, 0, 0);
                    this.video.onComplete.add(this.instrucciones1, this);
                    this.video.play();
                }else{
                    this.instrucciones1();
                }
                  
            }else{
                this.musica=Game.add.audio('musicaHistoria');
                this.musica.loop=true;
                this.musica.play();
                this.base();
                this.botonGuia();
                this.fontEntrada='40px MedievalSharp';
                this.fontDialogos='30px MedievalSharp';
                this.fillW='#ffffff';
                this.fillB='#000000';
                this.fillR='#f00000';
                this.bgEntrada='rgba(0,0,0,0.70)';
                this.bgB='rgba(0,0,0,1.0)';
                this.bgW='rgba(255,255,255,1.0)';
                
                
                if(this.nivel==2){
                    this.label1 =Game.add.text(200, 50,
                                              'Yuki solo ha podido resistir los\nataques del señor del mal, el poder\nde la Tierra no es suficiente, \npero ha llegado al Templo del Mar.',
                                              {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                    this.label2 =Game.add.text(100, 350,
                                              'Me haré todo lo fuerte que sea necesario',
                                              {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                    this.label3 =Game.add.text(450, 450,
                                              'Jamás me alcanzaras',
                                              {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
                    
                    
                }else if (this.nivel==3){
                    this.label1 =Game.add.text(200, 50,
                                              'Yuki no se rinde en su empeño de \nhacerse cada vez mas fuerte para \npoder vencer al señor oscuro, \ny entra en el Templo del Aire',
                                              {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                    this.label2 =Game.add.text(100, 350,
                                              'Tu fin esta cada vez mas cerca',
                                              {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                    this.label3 =Game.add.text(430, 450,
                                              'No ma hagas reir gusano',
                                              {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
                    
                }else if (this.nivel==4){
                    this.label1 =Game.add.text(200, 50,
                                              'Yuki entra en el Templo de la Luz,\nel señor oscuro teme que consiga \nel poder de la luz y ha enviado \na sus mejores esbirros para detenerle. \n¿Lo conseguirá?',
                                              {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                    this.label2 =Game.add.text(100, 350,
                                              'Con los 3 elementos reclamare el poder de la Luz',
                                              {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                    this.label3 =Game.add.text(480, 450,
                                              'No te lo permitiré',
                                              {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
                    
                }else if (this.nivel==5){
                    this.label1 =Game.add.text(250, 50,
                                              'Este es un nivel especial, \ncon muchas salas y enemigos\ncada vez mas fuertes.\nMucha suerte!',
                                              {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                    this.label2 =Game.add.text(100, 350,
                                              'Una nueva aventura, genial!',
                                              {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                    this.label3 =Game.add.text(360, 450,
                                              'Enviaré a mis mejores esbirros!',
                                              {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
                }
                
                this.label1.alpha = 0;
                Game.add.tween(this.label1).to( { alpha: 1 }, 4000, "Linear", true);
                this.label2.alpha = 0;
                Game.add.tween(this.label2).to( { alpha: 1 }, 10000, "Linear", true);
                this.label3.alpha = 0;
                Game.add.tween(this.label3).to( { alpha: 1 }, 14000, "Linear", true);
            }
            
        }
        
        //Historia de los run
        else {
            this.musica=Game.add.audio('musicaHistoria');
            this.musica.loop=true;
            this.musica.play();
            this.base();
            this.botonGuia();
            this.fontEntrada='40px MedievalSharp';
            this.fontDialogos='30px MedievalSharp';
            this.fillW='#ffffff';
            this.fillB='#000000';
            this.fillR='#f00000';
            this.bgEntrada='rgba(0,0,0,0.70)';
            this.bgB='rgba(0,0,0,1.0)';
            this.bgW='rgba(255,255,255,1.0)';
                
                
            if(this.nivel==1){
                this.label1 =Game.add.text(250, 50,
                                          'Yuki ha obtenido el poder de la \nTierra, y ahora se dirige a su \nsiguiente destino, pero el señor \noscuro no lo permitira',
                                          {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                this.label2 =Game.add.text(100, 350,
                                          'Aparta de mi camino!',
                                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                this.label3 =Game.add.text(450, 450,
                                          'Observa el poder oscuro',
                                          {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });


            }else if(this.nivel==2){
                this.label1 =Game.add.text(200, 50,
                                          'Yuki cada vez es mas poderoso, \npero todavía es incapaz de dañar al \nseñor oscuro, asi que debe poner \nrumbo al Templo del Aire. ',
                                          {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                this.label2 =Game.add.text(100, 350,
                                          'No podras pararme',
                                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                this.label3 =Game.add.text(400, 450,
                                          'Permiteme dudarlo mocoso',
                                          {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });


            }else if (this.nivel==3){
                this.label1 =Game.add.text(200, 50,
                                           'Con la fuerza de Tierra, Mar y Aire,\nYuki esta listo para ir al Templo de \nla Luz y reclamar su poder para \nderrotar a la oscuridad. \nEl señor oscuro no lo permitirá',
                                          {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                this.label2 =Game.add.text(100, 350,
                                          'La luz acabará contigo',
                                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                this.label3 =Game.add.text(410, 450,
                                          'No podrá con mi oscuridad',
                                          {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });

            }else if (this.nivel==4){
                this.label1 =Game.add.text(200, 50,
                                          'Yuki posee el poder de la Luz y cuando \nsu espada esta cargada de Luz puede \ndañar al señor oscuro. \nEste es el enfrentamiento final!!',
                                          {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                this.label2 =Game.add.text(100, 330,
                                          'Ha llegado tu final!',
                                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                this.label3 =Game.add.text(400, 420,
                                          'Esto ha llegado muy lejos',
                                          {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });

            }else if (this.nivel==5){
                this.label1 =Game.add.text(200, 50,
                                          'Este es un nivel especial, no \npuedes ganar. Cada vez que derrotes \nal señor oscuro sera mas fuerte. \nGanaras mucho oro cada vez!!.\nMucha suerte!',
                                          {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
                this.label2 =Game.add.text(100, 350,
                                          'Una nueva aventura, genial!',
                                          {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
                this.label3 =Game.add.text(360, 450,
                                          'Ahora soy inmortal, excelente',
                                          {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
            }

            this.label1.alpha = 0;
            Game.add.tween(this.label1).to( { alpha: 1 }, 4000, "Linear", true);
            this.label2.alpha = 0;
            Game.add.tween(this.label2).to( { alpha: 1 }, 10000, "Linear", true);
            this.label3.alpha = 0;
            Game.add.tween(this.label3).to( { alpha: 1 }, 14000, "Linear", true);
        }
    
    };
    
    Intro.prototype.instrucciones1 = function() {
        this.botonesOn=true;        
        this.musica=Game.add.audio('musicaHistoria');
        this.musica.loop=true;
        this.musica.play();
        this.base();
        this.botonGuia();
        this.fontEntrada='40px MedievalSharp';
        this.fontDialogos='30px MedievalSharp';
        this.fillW='#ffffff';
        this.fillB='#000000';
        this.fillR='#f00000';
        this.bgEntrada='rgba(0,0,0,0.70)';
        this.bgB='rgba(0,0,0,1.0)';
        this.bgW='rgba(255,255,255,1.0)';
        
        
        this.label1 =Game.add.text(200, 50,
                                  'Yuki llega al Templo de la Tierra.\nEl señor oscuro ya ha dispuesto\na sus esbirros para que le detengan',
                                  {font:this.fontEntrada, fill:this.fillW, backgroundColor:this.bgEntrada });
        this.label2 =Game.add.text(100, 250,
                                  'Yo sere quien te derrote!',
                                  {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
        this.label3 =Game.add.text(425, 300,
                                  'Muchos lo intentaron y murieron',
                                  {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
    }
    
    function finH1(){
        this.label2 =Game.add.text(475, 125,' Esto no puede estar pasando ',
                                    {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
        this.label2.alpha = 0;
        this.tween1 = Game.add.tween(this.label2).to( { alpha: 1 }, 2000, "Linear", true);
        this.tween1.onComplete.add(finH2, this);    
    }
    
    function finH2(){
        this.label2 =Game.add.text(100, 200,' Podeeeeer de la luuuuuz ',
                                    {font:this.fontDialogos, fill:this.fillB, backgroundColor:this.bgW });
        this.label2.alpha = 0;
        this.tween1 = Game.add.tween(this.label2).to( { alpha: 1 }, 2000, "Linear", true);
        this.tween1.onComplete.add(finH3, this);
        this.blanco = Game.add.sprite(Game.world.centerX, Game.world.centerY, 'blanco');
        this.blanco.anchor.setTo(0.5, 0.5);
        this.blanco.alpha = 0;
        this.tween = Game.add.tween(this.blanco).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.tween.repeat(3, 50);
        this.powerup=Game.add.audio('powerup');
        this.powerup.loop=false;
        this.powerup.volume=0.6;
        this.powerup.play();
    }
    
    function finH3(){
        this.label2 =Game.add.text(475, 275,' NOOOOOOOOOOOOOOOOOO ',
                                    {font:this.fontDialogos, fill:this.fillR, backgroundColor:this.bgB });
        this.label2.alpha = 0;
        this.tween1 = Game.add.tween(this.label2).to( { alpha: 1 }, 2000, "Linear", true);
        this.runboss.animations.stop('stay');
        this.fin=this.runboss.animations.play('hit');
        this.fin.onComplete.add(finH4, this);
        this.bossAg=Game.add.audio('bossAg');
        this.bossAg.loop=false;
        this.bossAg.volume=1;
        this.bossAg.play();
    }
    
    function finH4(){
        this.runboss.frame = 8;
        this.moveBoss=false;
    }
    
    Intro.prototype.botonGuia = function(){
        this.font='20px MedievalSharp';
        this.fill='#fff000';
        this.bg='rgba(0,0,0,0.0)';
        this.labelA =Game.add.text(525, 550,'Enter para comenzar',
                                          {font:this.font, fill:this.fill, backgroundColor:this.bg});
        this.labelB =Game.add.text(325, 550,'Como jugar',
                                          {font:this.font, fill:this.fill, backgroundColor:this.bg});
        this.labelB.inputEnabled = true;
        this.labelB.events.onInputDown.add(this.llamadaGuia, this);
    }
    
    Intro.prototype.llamadaGuia = function(){
        Game.state.start('Mas', false, true, 'Guia', this.tipo, this.nivel);
    }
    
    Intro.prototype.base = function(){
        Game.add.sprite(0,0, 'fondoHistoria');

        //Yuki
        this.runPlayer = Game.add.sprite(150, 500, 'yukiHistory');
        this.runPlayer.scale.setTo(-2, 2);
        this.ini=this.runPlayer.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 8, false);
        this.runPlayer.animations.add('stay', [48, 49, 50, 51], 8, true);
        this.runPlayer.anchor.setTo(0.5, 0.5);
        this.runPlayer.animations.play('start');
        this.ini.onComplete.add(loop, this); 
        
        //Boss
        this.runboss = Game.add.sprite(850, 500, 'runboss');
        this.runboss.scale.setTo(-2, 2);
        this.runboss.anchor.setTo(0.5, 0.9);
        this.runboss.animations.add('stay', [0, 1, 2, 3, 4, 3, 2, 1], 12, true);
        this.brazo=this.runboss.animations.add('brazo', [12,13,14,15,16,17,16,15,14,13,12], 7, false);
        this.caida=this.runboss.animations.add('hit', [5, 6, 7, 8], 6, false);
        //this.brazo.onComplete.add(finCaida, this);
        this.runboss.animations.play('stay');
        this.runboss.up=false;
        this.bossMove=true;
        this.moveBoss=true;
    }
        
    Intro.prototype.goFull = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    function loop(sprite, animation){
        this.runPlayer.animations.play('stay');
        this.runPlayer.scale.setTo(2, 2);
    };
    
    
    Intro.prototype.toggleSound = function () {
        Game.sound.mute = ! Game.sound.mute;

        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
     };
    
    Intro.prototype.shutdown = function () {
        this.musica.stop();  
        this.video.stop();
     };

    return Intro;
});


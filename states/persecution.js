
define(['Phaser','../game'], function (Phaser,Game){
    
    function Persecution() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    Persecution.prototype = Object.create(Phaser.State.prototype);
    Persecution.prototype.constructor = Persecution;
    
    /* download assets code here */
    Persecution.prototype.preload = function(){
        //Objetos
        this.bombas = [];
        this.enemigos = [];
        this.corazones = [];
        //Contadores
        this.bombaTimer=this.timer.ms;
        this.talkTimer=this.timer.ms;
        //Teclas
        this.a=Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.s=Game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.s1=Game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.d=Game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.d1=Game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        //Gamepad
        Game.input.gamepad.start();
        this.pad1 = Game.input.gamepad.pad1;
        //Variables de control
        this.cargas=0;
        this.attack=false;
        this.cargaEnable=true;
        this.bossEnable=false;
        this.lifeBoss=3;
        this.dist=0;
        //Informacion
        this.label =Game.add.text(50,30,' Vidas: '+this.vidas+' ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
        this.label4=Game.add.text(600,30,' Distancia: '+Math.floor(this.dist)+' m ',{font:this.font, fill:this.fill, backgroundColor:this.bg});
        if(this.nivel<4){
            this.label2=Game.add.text(50,80,' Tiempo restante: '+Math.floor((this.timeFin-this.timer.ms)/1000)+' ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
        }else{
           this.label2=Game.add.text(50,80,' Cargas de luz: '+this.cargas+'/3 ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
           this.label3=Game.add.text(600,80,' Energia oscura: '+this.lifeBoss+' ', {font:this.font, fill:this.fill, backgroundColor: this.bg}); 
        }
    };
    
    /* initialize persistent game objects here */
    Persecution.prototype.create = function(){
        
        //Fondo
        this.runbackground = Game.add.tileSprite(0, 0, 1000, 600, 'runfondo');
        this.runbackground.autoScroll(-5, 0);
        this.font='40px MedievalSharp';
        this.fill='#ffffff';
        this.bg='rgba(0,255,80,0.50)';
        
        //Suelo
        this.rungrass = Game.add.tileSprite(0, 530, 1000, 600, 'grass');
        this.rungrass.autoScroll(-140, 0);
        Game.physics.arcade.enable(this.rungrass);
        this.rungrass.body.immovable=true;
        
        //Jugador
        this.runPlayer = Game.add.sprite(-75, 350, 'yuki');
        Game.physics.arcade.enable(this.runPlayer);
        this.runPlayer.scale.setTo(1.5, 1.5);
        this.runPlayer.animations.add('right', [0, 1, 2, 3, 4, 5], 12, true);
        this.animDash=this.runPlayer.animations.add('dash',[50,51,52,53,54,55,56,57,58,59,60,61,62],12,false);//47a68
        this.runPlayer.body.gravity.y = 500;
        this.runPlayer.anchor.setTo(0.5, 0.5);
        this.runPlayer.animations.play('right');
        
        //Explosion
        this.explosion = Game.add.sprite(230, 540, 'explosion');
        this.explosion.anchor.setTo(0.5, 1);
        this.explosion.scale.setTo(3.5, 3.5);
        this.explosion.alpha = 0;
        this.explosionB=this.explosion.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, false);
        this.explosionB.onComplete.add(finExplosion, this);
        
        //Mas
        this.boton = Game.add.sprite(500, 150, 'd');
        this.boton.alpha = 0;
        this.boton.animations.add('pap', [0, 1], 4, true);
        this.shakeWorld=0;
        this.lifeTintCount=0;
        
        //Boss
        this.runboss = Game.add.sprite(825, 300, 'runboss');
        this.runboss.up=true;
        this.runboss.scale.setTo(-1.5, 1.5);
        this.runboss.anchor.setTo(0.5, 0.9);
        this.runboss.animations.add('stay', [0, 1, 2, 3, 4, 3, 2, 1], 12, true);
        this.caida=this.runboss.animations.add('hit', [5, 6, 7, 8, 9, 10, 11], 6, false);
        this.brazo=this.runboss.animations.add('brazo', [12,13,14,15,16,17,16,15,14,13,12], 8, false);
        this.caida.onComplete.add(finCaida, this);
        this.brazo.onComplete.add(finCaida, this);
        this.runboss.animations.play('stay');
        this.blanco = Game.add.sprite(Game.world.centerX, Game.world.centerY, 'blanco');
        this.blanco.anchor.setTo(0.5, 0.5);
        this.blanco.alpha = 0;
        
        //Audio
        this.musica=Game.add.audio('runMusic4');
        this.musica.loop=true;
        this.musica.play();
        this.musica.volume=0.9;
        
        this.bossAg=Game.add.audio('bossAg');
        this.bossAg.loop=false;
        this.bossAg.volume=1;
        
        this.boss1=Game.add.audio('boss1');
        this.boss1.loop=false;
        this.boss1.volume=1;
        
        this.boss2=Game.add.audio('boss2');
        this.boss2.loop=false;
        this.boss2.volume=1;
        
        this.boss3=Game.add.audio('boss3');
        this.boss3.loop=false;
        this.boss3.volume=1;
        
        this.boss4=Game.add.audio('boss4');
        this.boss4.loop=false;
        this.boss4.volume=1;
        
        this.bomba=Game.add.audio('bomba');
        this.bomba.loop=false;
        this.bomba.volume=0.5;
        
        this.yuki_attack=Game.add.audio('yuki_attack');
        this.yuki_attack.loop=false;
        this.yuki_attack.volume=0.3;
        
        this.yuki_jump=Game.add.audio('yuki_jump');
        this.yuki_jump.loop=false;
        this.yuki_jump.volume=0.3;
        
        this.clin=Game.add.audio('clin');
        this.clin.loop=false;
        this.clin.volume=0.6;
        
        this.powerup=Game.add.audio('powerup');
        this.powerup.loop=false;
        this.powerup.volume=0.6;
        
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
    Persecution.prototype.update = function(){
        
        //Colisiones e impactos
        this.hitObjetos();
        
        //Acciones del personaje
        this.acciones();
        
        //Añadir obstaculos
        if (this.timer.ms > this.bombaTimer) {
            this.bombaTimer = this.timer.ms + Math.floor((Math.random() * this.maxTimeObj) + this.minTimeObj);
            this.addObjetos();
        }
        
        //Sonido
        if (this.timer.ms > this.talkTimer) {
            this.talkTimer = this.timer.ms + Math.floor((Math.random() * 8000) + 5000);
            aleat = Math.random();
            if(aleat>0.75){
               this.boss1.play(); 
            }else if(aleat>0.5){
                this.boss2.play();
            }else if(0.25){
                this.boss3.play();
            }else{
                this.boss4.play();
            }
        }
                
        //Informacion
        this.dist=this.dist+0.04;
        Game.global.dist=Game.global.dist+0.04;
        this.label.destroy();
        this.label4.destroy();
        this.label =Game.add.text(50,30,' Vidas: '+this.vidas+' ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
        this.label4=Game.add.text(600,30,' Distancia: '+Math.floor(this.dist)+' m ',{font:this.font, fill:this.fill, backgroundColor:this.bg});
        if(this.nivel<4){
            this.label2.destroy();
            this.label2=Game.add.text(50,80,' Tiempo restante: '+Math.floor((this.timeFin-this.timer.ms)/1000)+' ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
        }else{
            this.label2.destroy();
            this.label3.destroy();
            this.label2=Game.add.text(50,80,' Cargas de luz: '+this.cargas+'/3 ', {font:this.font, fill:this.fill, backgroundColor:this.bg });
            this.label3=Game.add.text(600,80,' Energia oscura: '+this.lifeBoss+' ', {font:this.font, fill:this.fill, backgroundColor: this.bg});
        }
        
        //Fin
        if(this.vidas==0){
            //A estado de game over
            Game.global.deadsR=Game.global.deadsR+1;
            Game.state.start('Intro', false, true, 'Menu', 0);
        }else if(this.nivel==4 && this.lifeBoss<1){
            //A estado de victoria, te has pasado el juego
            Game.global.vidasAuxRun=this.vidas;
            Game.state.start('Intro', false, true, 'Menu', 9);
        }else if(this.nivel==5 && this.lifeBoss<1){
            //Añadir oro
            Game.global.oro=Game.global.oro+10+this.velObj;
            this.lifeBoss=3;
            this.velD+=3;
            this.velObj++;
        }else if(this.nivel<4 && this.timer.ms>this.timeFin){
            //A estado de victoria
            Game.global.vidasAuxRun=this.vidas;
            Game.state.start('Intro', false, true, 'Menu', this.nivel+5);
        }

        //Efectos
        if (this.shakeWorld > 0) {
            this.runPlayer.tint = 0xff0000;
            var rand1 = Game.rnd.integerInRange(-20,20);
            var rand2 = Game.rnd.integerInRange(-20,20);
            Game.world.setBounds(rand1, rand2, Game.width + rand1, Game.height + rand2);
            this.shakeWorld--;
            if (this.shakeWorld == 0) {
                this.runPlayer.tint = 0xffffff;
                Game.world.setBounds(0, 0, Game.width, Game.height);
            }
        }
    };
            
    Persecution.prototype.hitObjetos = function(){
        //Bombas
        for (i=0; i< this.bombas.length; i++){
            Game.physics.arcade.collide(this.bombas[i], this.rungrass);
            this.bombas[i].x-=this.velObj;
            if (Game.physics.arcade.overlap(this.bombas[i], this.runPlayer)){
                this.explosion.alpha = 1;
                this.explosion.x=this.bombas[i].x;
                this.explosion.animations.play('start');
                this.bombas[i].destroy();
                this.bombas.splice(this.i,1);
                this.vidas--;
                this.shakeWorld=35;
                this.bomba.play();
            }else if(this.bombas[i].x<-50){
                this.bombas[i].destroy();
                this.bombas.splice(this.i,1);
            }
        }
        //Enemigos
        for (i=0; i< this.enemigos.length; i++){
            Game.physics.arcade.collide(this.enemigos[i], this.rungrass);
            this.enemigos[i].x-=this.velObj;
            if (this.enemigos[i].on && Game.physics.arcade.overlap(this.enemigos[i], this.runPlayer)){
                if(this.attack==false){
                    this.explosion.alpha = 1;
                    this.explosion.x=this.enemigos[i].x-150;
                    this.explosion.animations.play('start');
                    this.enemigos[i].destroy();
                    this.enemigos.splice(this.i,1);
                    this.vidas--;
                    this.shakeWorld=35;
                    this.bomba.play();
                }else{
                    this.clin.play(); 
                    this.enemigos[i].animations.play('die');
                    this.enemigos[i].body.height=75;
                    this.enemigos[i].on=false;
                    if (this.cargas<3 && this.cargaEnable==true && this.nivel>3){
                        this.cargas++;
                        this.cargaEnable=false;
                    }
                }    
            }else if(this.enemigos[i].x<-10){
                this.enemigos[i].destroy();
                this.enemigos.splice(this.i,1);
            } 
        }  
        //Corazones
        if(this.lifeTintCount==0){
            this.runPlayer.tint = 0xffffff;
        }else{
            this.lifeTintCount--;
        }
        for (i=0; i< this.corazones.length; i++){
            Game.physics.arcade.collide(this.corazones[i], this.rungrass);
            this.corazones[i].x-=this.velObj;
            if (Game.physics.arcade.overlap(this.corazones[i], this.runPlayer)){
                this.vidas++;
                this.powerup.play();
                this.runPlayer.tint = 0x00ff00;
                this.lifeTintCount=40;
                this.corazones[i].destroy();
                this.corazones.splice(this.i,1);
            }else if(this.corazones[i].x<-10){
                this.corazones[i].destroy();
                this.corazones.splice(this.i,1);
            } 
        }

    }
    
    function finExplosion(){
        this.explosion.alpha = 0;
    }
    
    function finCaida(){
        this.runboss.animations.play('stay');
    }
    
    Persecution.prototype.addObjetos = function(){
        aleat = Math.random();
        if(aleat>0.7){
            this.runboss.animations.play('brazo');
        }
        aleat = Math.random();
        if(aleat>this.probBomba){
            //Bombas
            this.b=Game.add.sprite(1050, 300, 'bomba');
            this.b.animations.add('start', [0, 1], 4, true);
            this.b.animations.play('start');
            Game.physics.arcade.enable(this.b);
            this.b.body.gravity.y = 500;
            this.b.body.bounce.set(((Math.random() * 0.2) + 0.55));
            this.b.checkWorldBounds = true;
            this.b.scale.setTo(0.6, 0.6);
            this.bombas.push(this.b);
        }else if (aleat>this.probEnem){
            //Enemigos
            this.def=Game.add.sprite(1100, 340, 'rundefensor');
            aleat2 = Math.random();
            if(aleat2>0.5){
                this.def.animations.add('walk', [0, 1, 2, 3], 4, true);
            }
            else{
                this.def.animations.add('walk', [4, 5, 6, 7], 4, true);
            }
            this.def.animations.add('die', [8, 9], 4, false);
            this.def.animations.play('walk');

            Game.physics.arcade.enable(this.def);
            this.def.body.gravity.y = 700;
            this.def.body.bounce.set(0);
            this.def.checkWorldBounds = true;
            this.def.scale.setTo(-1.8, 1.8);
            this.def.body.width=-this.def.width;
            this.def.body.offset.x = this.def.width;
            this.def.on=true;
            this.enemigos.push(this.def);
        }else if (this.vidas<4){
            //Corazones
            this.cor=Game.add.sprite(1050, 300, 'corazon');
            this.cor.animations.add('cor', [0, 1], 4, true);
            Game.physics.arcade.enable(this.cor);
            this.cor.body.gravity.y = 450;
            this.cor.body.bounce.set(((Math.random() * 0.35) + 0.7));
            this.cor.checkWorldBounds = true;
            this.cor.scale.setTo(0.7, 0.7);
            this.cor.animations.play('cor');
            this.corazones.push(this.cor);
        }
        
    }
            
    Persecution.prototype.acciones = function(){
        Game.physics.arcade.collide(this.runPlayer, this.rungrass);
        //Ataque
        if (this.a.isDown && this.attack==false && this.runPlayer.y>450){
            this.yuki_attack.play(); 
            this.runPlayer.body.velocity.y = -250;
            this.runPlayer.animations.play('dash');
            this.attack=true;
            this.animDash.onComplete.add(finDash, this);
        }else if(this.pad1.connected==true){
            if (this.pad1._rawPad.buttons[0].value==1 && this.attack==false && this.runPlayer.y>450){
            this.yuki_attack.play(); 
            this.runPlayer.body.velocity.y = -250;
            this.runPlayer.animations.play('dash');
            this.attack=true;
            this.animDash.onComplete.add(finDash, this);
        }
        }
        
        //Salto
        if(this.pad1.connected==true){
            if ((this.s.isDown || this.s1.isDown || this.pad1._rawPad.axes[1]<=-0.5) && this.runPlayer.y>470 &&this.attack==false) {
                this.yuki_jump.play(); 
                this.runPlayer.body.velocity.y = -400;
                this.runPlayer.animations.stop();
                this.runPlayer.frame = 6;
            }
            else if (this.runPlayer.y>471 && this.attack==false){
                this.runPlayer.animations.play('right');
            }
             
        }else{
            if ((this.s.isDown || this.s1.isDown) && this.runPlayer.y>470 &&this.attack==false) {
                this.yuki_jump.play(); 
                this.runPlayer.body.velocity.y = -400;
                this.runPlayer.animations.stop();
                this.runPlayer.frame = 6;
            }
            else if (this.runPlayer.y>471 && this.attack==false){
                this.runPlayer.animations.play('right');
            }
        }
        
        //Golpe a boss
        if(this.cargas>=3 && this.bossEnable==false && this.nivel>3){
            this.bossEnable=true;
            this.boton.alpha = 1;
            this.boton.animations.play('pap');
            this.corchete=Game.add.sprite(400,150, 'corchete');
            this.corcheteB=Game.add.sprite(600,150, 'corcheteB');
            if(Math.random()>0.5){
                this.bontonDer=true;
            }
            else{
                this.bontonDer=false;
            }
            
        }
        if(this.bossEnable && this.nivel>3){
            if(this.boton.x<250){
                this.bontonDer=true;
            }else if(this.boton.x>750){
                this.bontonDer=false;
            }
            if(this.bontonDer==true){
                this.boton.x += this.velD;
            }else{
                this.boton.x -= this.velD;
            }
            if(this.d.isDown || this.d1.isDown){
                if (this.boton.x>400 && this.boton.x<600 ){
                    this.powerup.play();
                    this.tween = Game.add.tween(this.blanco).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
                    this.tween.repeat(3, 50);
                    this.tween.onComplete.add(finTween, this);  
                }
                this.bossEnable=false;
                this.cargas=0;
                this.boton.alpha = 0;
                this.boton.animations.stop();
                this.corchete.destroy();
                this.corcheteB.destroy();       
            }else if(this.pad1.connected==true){
                if(this.pad1._rawPad.axes[0]>=0.5){
                    if (this.boton.x>400 && this.boton.x<600 ){
                        this.powerup.play();
                        this.tween = Game.add.tween(this.blanco).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, 1000, true);
                        this.tween.repeat(3, 50);
                        this.tween.onComplete.add(finTween, this);  
                    }
                    this.bossEnable=false;
                    this.cargas=0;
                    this.boton.alpha = 0;
                    this.boton.animations.stop();
                    this.corchete.destroy();
                    this.corcheteB.destroy();       
                }
                
                
            }
        }
        
        //Aparicion personaje
        if (this.runPlayer.x < 150) {
            this.runPlayer.x += 1,25;
        }
        //Boss
        if(this.runboss.up){
            this.runboss.x+=0.4;
            this.runboss.y-=0.4;
            if(this.runboss.x>850)
                this.runboss.up=false;
        }else{
            this.runboss.x-=0.4;
            this.runboss.y+=0.4;
            if(this.runboss.x<800)
                this.runboss.up=true;
        }
    }
    
    function finTween(){
        this.lifeBoss--;
        this.runboss.animations.play('hit');
        this.bossAg.play();
    }
    
    function finDash(){
        this.attack=false;
        this.cargaEnable=true;
    }
    
    Persecution.prototype.handleCamera = function() {
         if (this.cursors.up.isDown) Game.camera.y -= 5;
         else if (this.cursors.down.isDown) Game.camera.y += 5;
         if (this.cursors.left.isDown) Game.camera.x -= 5;
         else if (this.cursors.right.isDown) Game.camera.x += 5;
    };
     
    Persecution.prototype.goFull = function() {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
    };
    
    Persecution.prototype.toggleSound = function() {
        Game.sound.mute = ! Game.sound.mute;

        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
    };
    
    Persecution.prototype.onComplete = function() {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
    };
    
    Persecution.prototype.render = function() {
        /*Game.debug.body(this.runPlayer);
        for (i=0; i< this.bombas.length; i++){
            Game.debug.body(this.bombas[i]);
        }
        for (i=0; i< this.enemigos.length; i++){
            Game.debug.body(this.enemigos[i]);
        }*/
        
    };
    
    Persecution.prototype.shutdown = function() {
        this.musica.stop();   
        Game.world.setBounds(0, 0, Game.width, Game.height);
    };
    
    Persecution.prototype.init = function(param) {
        //En funcion del param definimos variables de la dificualtad del nivel
        this.timer=Game.time.create(false);
        this.timer.start();
        
        console.log(param);
        if(param==1){
            //Nivel 1, 40 seg
            this.timeFin=this.timer.ms+40000;
            this.velObj=4.3;    
            this.maxTimeObj=2100;
            this.minTimeObj=1200;
            this.probBomba=0.5;
            this.probEnem=0.06;
            
            
        }else if(param==2){
            //Nivel 2, 50 seg
            this.timeFin=this.timer.ms+50000;
            this.velObj=4.6;    
            this.maxTimeObj=1800;
            this.minTimeObj=1200;
            this.probBomba=0.5;
            this.probEnem=0.06;
            
        }else if(param==3){
            //Nivel 3, 1 min
            this.timeFin=this.timer.ms+60000;
            this.velObj=5;    
            this.maxTimeObj=1600;
            this.minTimeObj=1250;
            this.probBomba=0.5;
            this.probEnem=0.06;
            
        }else if(param==4){
            //Sin tiempo
            this.velObj=5;    
            this.maxTimeObj=1800;
            this.minTimeObj=1250;
            this.probBomba=0.4;
            this.probEnem=0.06;
            this.velD=16;
            
        }else if(param==5){
            //Sin tiempo
            this.velObj=5;    
            this.maxTimeObj=1800;
            this.minTimeObj=1250;
            this.probBomba=0.35;
            this.probEnem=0.09;
            this.velD=16;
        }
        
        this.nivel=param;
        this.vidas=3;
    };

    return Persecution;
});


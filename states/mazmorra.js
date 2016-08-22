//mainScreen.js
define(['Phaser','../game', 'sprites/enemy', 'sprites/player', 'sprites/torreta', 'sprites/zeke', 'maps/maps'], function (Phaser,Game,Enemy,Player,Torreta,Zeke,Maps){
    
    function Mazmorra() {
        Phaser.State.call(this);      
    }
    
    //Inheritance
    Mazmorra.prototype = Object.create(Phaser.State.prototype);
    Mazmorra.prototype.constructor = Mazmorra;
    
    /* download assets code here */
    Mazmorra.prototype.preload = function () {   
        
        //this.niveles = this.shuffle([1,2,3,4,5]);
        //this.niveles = [24,1];
        console.log(this.niveles);
        this.nivelActual = 0;
        this.i=0;
        this.enemies = [];
        this.torretas = [];
        this.disparos = [];
        this.remolinos = [];
        this.espadasArray = [];
        this.disparosSound = [];
        this.flagSound=0;
        this.flagLanzar=0;
        this.flagEspadas=0;
        
        this.killDisparo = [];
        this.final=0;
        this.cambiando=0;
        
        this.damEspadas=200;
        this.damRemolino=300;
        this.costeEspadas=60;
        this.costeRemolino=80;
        
        this.maps=new Maps(this.niveles);
        
    };
    
    /* initialize persistent game objects here CREATE*************************************************/
    Mazmorra.prototype.create = function () {
        
        //JsonIndex
        this.phaserJSON = Game.cache.getJSON('version');

        this.createWorld();
        
        this.coin1=Game.add.audio('coin1');
        this.coin1.loop=false;
        this.coin1.volume=1;
        this.muerteH=Game.add.audio('muerteH');
        this.muerteH.loop=false;
        this.muerte1=Game.add.audio('muerte1');
        this.muerte1.loop=false;
        this.muerteR=Game.add.audio('muerteR');
        this.muerteR.loop=false;
        this.bomba=Game.add.audio('bomba');
        this.bomba.volume=0.6;
        this.bomba.loop=false;
        this.laser=Game.add.audio('laser');
        this.laser.loop=false;
        this.cursors = Game.input.keyboard.createCursorKeys();
        
        //PERSONAJES
        
        yukiData = this.phaserJSON.mazmorra[this.niveles[this.nivelActual]];
        
        this.player = new Player(yukiData.position.x,yukiData.position.y);
        
        this.picture = Game.add.sprite(0,0, 'fade');
        Game.world.bringToTop(this.picture);
        Game.add.tween(this.picture).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        
        this.estancia = Game.add.text(Game.world.centerX, 100, 'Sala '+ (this.nivelActual+1) + ' de ' + this.niveles.length,{ font: '60px MedievalSharp', fill: '#ffffff' });
        this.estancia.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.estancia).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        
        this.oroText = Game.add.text(880, 25, 'Oro:  '+ Game.global.oro,{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.oroText.anchor.setTo(0.5, 0.5);
        
        // Menu de pausa
        this.p=Game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.mando=Game.add.sprite(0,0, 'mando');
        this.mando.alpha=0;
        this.p.onDown.add(this.unpause, this);
    };
    
     Mazmorra.prototype.unpause = function(){
        // Only act if paused
        if(Game.paused){
            Game.paused = false;
            this.mando.alpha=0;
        }
    }
        
    /* update movements, collisions, score here UPDATE*******************************************************/
    Mazmorra.prototype.update = function () {
        
        //Menu de pausa
        if(this.p.isDown){
            Game.paused = true;
            Game.world.bringToTop(this.mando);
            this.mando.alpha=1;
        }
        
        Game.physics.arcade.collide(this.player, this.layerChoque);
        
        //Destruir al cabo del tiempo
        if(this.flagLanzar==1){
            this.flagLanzar=0;
            this.remolinos[0].destroy();
            this.remolinos.splice(0,1);
        }
        
        if(this.flagEspadas==1){
            this.flagEspadas=0;
            this.espadasArray[0].destroy();
            this.espadasArray.splice(0,1);
        }
        //Bucle colisión enemigos
        for (this.i=0; this.i< this.enemies.length; this.i++){
            Game.physics.arcade.overlap(this.remolinos, this.enemies[this.i], this.damageEnemRem, null, this);
            Game.physics.arcade.overlap(this.espadasArray, this.enemies[this.i], this.damageEnemEsp, null, this);

            Game.physics.arcade.collide(this.enemies[this.i], this.layerChoque);
            Game.physics.arcade.overlap(this.player, this.enemies[this.i], this.damage, null, this);   
        }
        
        //Bucle colisión torretas
        for (this.i=0; this.i< this.torretas.length; this.i++){
            Game.physics.arcade.overlap(this.remolinos, this.torretas[this.i], this.damageTorrRem, null, this);
            Game.physics.arcade.overlap(this.espadasArray, this.torretas[this.i], this.damageTorrEsp, null, this);
            
            Game.physics.arcade.collide(this.torretas[this.i], this.layerChoque);
            Game.physics.arcade.overlap(this.player, this.torretas[this.i], this.damageTorreta, null, this);
        }
        
        //Bucle colisión disparos
        for (this.i=0; this.i< this.disparos.length; this.i++){
            if(Game.physics.arcade.collide(this.disparos[this.i], this.layerChoque)==true){
                this.destroyDisparo();
            }
            if(this.player.flagBlock==0){
                if(Game.physics.arcade.overlap(this.player, this.disparos[this.i], this.damageYukiDisp, null, this)==true){
                    this.destroyDisparo();
                }
            }else if((this.player.scale.x==-1 && this.disparos[this.i].x>this.player.x) || (this.player.scale.x==1 && this.disparos[this.i].x<this.player.x)){
                if(Game.physics.arcade.overlap(this.player, this.disparos[this.i], this.damageYukiDisp, null, this)==true){
                    this.destroyDisparo();
                }
            }else{
                if(Game.physics.arcade.overlap(this.player, this.disparos[this.i], this.damageYukiBlockDisp, null, this)==true){
                    this.destroyDisparo();
                }
            }
        }
        
        //Bucle colisión soundtorretas
        if(this.flagSound==1){
            this.flagSound=0;
            this.disparosSound[0].destroy();
            this.disparosSound.splice(0,1);
        }
        
        for (this.i=0; this.i< this.disparosSound.length; this.i++){
            Game.physics.arcade.overlap(this.player, this.disparosSound[this.i], this.damageYukiSound, null, this);
        }
        
        //Si ha salido
        if (!this.player.inWorld) {
            if(this.player.x>=1000){
                this.salirDerecha();
                
            } else if(this.player.x<=0){
                this.salirIzquierda();
                
            } else if(this.player.y>=600){
                if(Game.global.nivel==5){
                    this.player.hitPlayer((60*Game.global.nivel)+(2*this.nivelActual),0);
                }else {
                    this.player.hitPlayer(60*Game.global.nivel,0);
                }
        
                if(this.player.life<1){
                    Game.global.deads=Game.global.deads+1;
                    this.nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY, 'Run Lost',{ font: '70px MedievalSharp', fill: '#ffffff' });
                    this.nameLabel.anchor.setTo(0.5, 0.5);
                    this.nameLabel.alpha=0;
                    Game.add.tween(this.nameLabel).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
                    Game.time.events.add(2000, function() {
                            Game.state.start('Intro', false, true, 'Menu', 0);
                    },this);
                }else {
                    this.player.body.velocity.y=0;
                    this.player.x=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.x;
                    this.player.y=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.y-10;
                }
            }
            for (i=0; i < this.enemies.length; i++){
                this.enemies[i].moveEnemy();
            }
        }else{
            //No mover entre cambios de nivel
            if(this.cambiando==0){
                //Movimientos
                this.player.movePlayer();
                if(this.player.flagRemolino==1){
                    this.player.flagRemolino=0;
                    this.remolinoAttack();
                }
                if(this.player.flagEspadas==1){
                    this.player.flagEspadas=0;
                    this.espadasAttack();
                }
                for (i=0; i < this.enemies.length; i++){
                    this.enemies[i].moveEnemy();
                }
                for (i=0; i < this.torretas.length; i++){

                    this.torretas[i].moveEnemy(this.player.x);

                    if(this.torretas[i].attackFlag==1){
                        this.torretas[i].attackFlag=0;
                        this.torretaAttack(this.torretas[i]);
                    }
                }
            }
        }

    };
    
    Mazmorra.prototype.shutdown = function () {
        this.limpieza();
        this.musica.stop();   
     };
    
    Mazmorra.prototype.limpieza = function () {
        this.arrayLen=this.enemies.length;
        for (i=0; i < this.arrayLen; i++){
            this.enemies[i].killEnem();
        }
        this.enemies=[];
        this.arrayLen=this.torretas.length;
        for (i=0; i < this.arrayLen; i++){
            this.torretas[i].killEnem();
        }
        this.torretas=[];
        this.arrayLen=this.remolinos.length;
        for (i=0; i < this.arrayLen; i++){
            this.remolinos[i].destroy();
        }
        this.remolinos=[];
        this.arrayLen=this.espadasArray.length;
        for (i=0; i < this.arrayLen; i++){
            this.espadasArray[i].destroy();
        }
        this.espadasArray=[];
        this.arrayLen=this.disparos.length;
        for (i=0; i < this.arrayLen; i++){
            this.disparos[i].destroy();
        }
        this.disparos=[];
        this.arrayLen=this.disparosSound.length;
        for (i=0; i < this.arrayLen; i++){
            this.disparosSound[i].destroy();
        }
        this.disparosSound=[];
        
     };
    
    /// creando el mundo desde un tilemap
    Mazmorra.prototype.createWorld = function () {
        this.layerChoque = this.maps.create("map" + this.niveles[this.nivelActual]);
        for (i=0; i<this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].numEnem; i++){
            enem = this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].enem[i];
            if(enem.tipo=="torreta"){
                this.torretas.push(new Torreta(enem.x,enem.y));
            }else if(enem.tipo=="zeke"){
                this.enemies.push(new Zeke(enem.x,enem.y,enem.minX,enem.maxX));
            }else{
                this.enemies.push(new Enemy(enem.x,enem.y,enem.tipo,enem.minX,enem.maxX));
            }
        }
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
    
    //Salir por la derecha del mapa
    Mazmorra.prototype.salirDerecha = function () {
        this.player.body.gravity.y = 0;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.play('stay');
        this.cambiando=1;
        
        this.limpieza();
        
        if(this.nivelActual==this.niveles.length-1){
            if(this.final==0){
                this.final=1;
                this.nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY, 'Victory',{ font: '70px MedievalSharp', fill: '#ffffff' });
                this.nameLabel.anchor.setTo(0.5, 0.5);
                this.nameLabel.alpha=0;
                Game.add.tween(this.nameLabel).to( { alpha: 1 }, 3000, Phaser.Easing.Linear.None, true);
                Game.time.events.add(3000, function() {
                    Game.state.start('Intro', false, true, 'Menu', this.nivel);
                },this);
            }
            return;
        }
        this.nivelActual=this.nivelActual+1;
        this.player.alpha=0;
        Game.add.tween(this.picture).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        this.estancia.setText('Sala '+ (this.nivelActual+1) + ' de ' + this.niveles.length);
        Game.add.tween(this.estancia).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        Game.time.events.add(1000, function() {
            Game.add.tween(this.picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            Game.add.tween(this.estancia).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.muteButton.destroy();
            this.fullButton.destroy();
            this.createWorld();
            this.player.x=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.x;
            this.player.y=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.y;
            this.player.alpha=1;
            this.player.updateStamina(0);
            this.player.updateMana(0);
            Game.world.bringToTop(this.player);
            Game.world.bringToTop(this.oroText);
            this.player.body.gravity.y = 750;
            Game.world.bringToTop(this.picture); 
            Game.world.bringToTop(this.estancia); 
        },this);
        Game.time.events.add(2000, function() {
            this.cambiando=0;
        },this);
        this.player.x=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.x;
        this.player.y=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.y;
        
     };
    
    //Salir por la izquierda del mapa
    Mazmorra.prototype.salirIzquierda = function () {
        this.player.body.gravity.y = 0;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        this.player.animations.play('stay');
        this.cambiando=1;
        
        this.limpieza();
        
        if(this.nivelActual==0){
            Game.state.start('Menu');
            return;
        }
        this.nivelActual=this.nivelActual-1;
        this.player.alpha=0;
        Game.add.tween(this.picture).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
        this.estancia.setText('Sala '+ (this.nivelActual+1) + ' de ' + this.niveles.length);
        Game.add.tween(this.estancia).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);

        Game.time.events.add(1000, function() {
            Game.add.tween(this.picture).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            Game.add.tween(this.estancia).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            this.muteButton.destroy();
            this.fullButton.destroy();
            this.createWorld();
            this.player.x=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].positionF.x;
            this.player.y=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].positionF.y;
            this.player.alpha=1;
            this.player.updateStamina(0);
            this.player.updateMana(0);
            Game.world.bringToTop(this.player);
            Game.world.bringToTop(this.oroText);
            this.player.body.gravity.y = 750;
            Game.world.bringToTop(this.picture);
            Game.world.bringToTop(this.estancia);
        },this);
        
        Game.time.events.add(2000, function() {
            this.cambiando=0;
        },this);

        this.player.x=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.x;
        this.player.y=this.phaserJSON.mazmorra[this.niveles[this.nivelActual]].position.y;
    };
    
    //Función de daño generica para enemigos
    Mazmorra.prototype.damage = function () {
        if(this.enemies[this.i].flagMove==1){
            return;
        }
        if(this.player.flagAttack==true){
            //Si es zeke
            if(this.enemies[this.i].nombre=='zeke' && this.enemies[this.i].flagAttack==1){
                if(this.enemies[this.i].flagBlock==1){
                    if(this.enemies[this.i].scale.x==1 && this.enemies[this.i].x>=this.player.x){
                        this.enemies[this.i].hitEnem(this.player.damage,this.player.scale.x,0);  
                    }else if(this.enemies[this.i].scale.x==-1 && this.enemies[this.i].x<=this.player.x){
                        this.enemies[this.i].hitEnem(this.player.damage,this.player.scale.x,0);  
                    }
                    if(this.enemies[this.i].life<0){
                        this.enemies[this.i].deadAnim();  
                        this.sonidoMuerte(this.enemies[this.i].nombre[0]);
                        Game.global.score=Game.global.score+1;
                        if(this.enemies[this.i].nombre=='zeke'){
                            this.coin1.play();
                            Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2)+2;
                            this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                        }else{
                            this.coin1.play();
                            Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
                            this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                        }
                        this.enemies.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
                    }
                }
                return;
            }
            //Si no
            else if(this.player.scale.x==1 && this.enemies[this.i].x>=this.player.x){
                if(this.player.flagDash==0){
                    this.enemies[this.i].hitEnem(this.player.damage,this.player.scale.x,0);
                }else{
                    this.enemies[this.i].hitEnem(this.player.damDash,this.player.scale.x,0);
                }           
                if(this.enemies[this.i].life<0){
                    this.enemies[this.i].deadAnim();
                    this.sonidoMuerte(this.enemies[this.i].nombre[0]);
                    Game.global.score=Game.global.score+1;
                    if(this.enemies[this.i].nombre=='zeke'){
                        this.coin1.play();
                        Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2)+2;
                        this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                    }else{
                        this.coin1.play();
                        Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
                        this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                    }
                    this.enemies.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
                }
            }else if(this.player.scale.x==-1 && this.enemies[this.i].x<=this.player.x){
                if(this.player.flagDash==0){
                    this.enemies[this.i].hitEnem(this.player.damage,this.player.scale.x,0);
                }else{
                    this.enemies[this.i].hitEnem(this.player.damDash,this.player.scale.x,0);
                }
                if(this.enemies[this.i].life<0){
                    this.enemies[this.i].deadAnim();
                    this.sonidoMuerte(this.enemies[this.i].nombre[0]);
                    Game.global.score=Game.global.score+1;
                    if(this.enemies[this.i].nombre=='zeke'){
                        this.coin1.play();
                        Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2)+2;
                        this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                    }else{
                        this.coin1.play();
                        Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
                        this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                    }
                    this.enemies.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
                }
            }
        //Si está bloqueado
        }else if(this.player.flagBlock==1){
            if(this.enemies[this.i].x>=this.player.x && this.player.scale.x==1){
                this.enemies[this.i].hitEnem(0,1,1);
                return;
            }else if(this.enemies[this.i].x<=this.player.x && this.player.scale.x==-1){
                this.enemies[this.i].hitEnem(0,-1,1);
                return;
            }else{
                if(this.enemies[this.i].x>=this.player.x){
                    this.damageYuki(this.enemies[this.i].damage,-1);
                }else{
                    this.damageYuki(this.enemies[this.i].damage,1);  
                }
                this.enemies[this.i].hitEnem(0,-this.player.scale.x,1);
            }
        //Si no daño
        }else{
            if(this.enemies[this.i].x>=this.player.x){
                this.damageYuki(this.enemies[this.i].damage,-1);
                this.enemies[this.i].hitPlayer();
            }else{
                this.damageYuki(this.enemies[this.i].damage,1);  
                this.enemies[this.i].hitPlayer();
            }      
        }
        
     };
    
    //Daño por habilidades
    Mazmorra.prototype.damageEnem = function (damage) {
        if(this.enemies[this.i].flagMove==1){
            return;
        }
        this.enemies[this.i].hitEnem(damage,this.player.scale.x,0);
        if(this.enemies[this.i].life<0){
            this.enemies[this.i].deadAnim();
            this.sonidoMuerte(this.enemies[this.i].nombre[0]);
            Game.global.score=Game.global.score+1;
            if(this.enemies[this.i].nombre=='zeke'){
                this.coin1.play();
                Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2)+2;
                this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
            }else{
                this.coin1.play();
                Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
                this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
            }
            this.enemies.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
        }
     };
    
    Mazmorra.prototype.damageEnemRem = function () {
        this.damageEnem(this.damRemolino);
     };
    
    Mazmorra.prototype.damageEnemEsp = function () {
        this.damageEnem(this.damEspadas);
     };
    
    //Daño por habilidades
    Mazmorra.prototype.damageTorr = function (damage) {
        this.torretas[this.i].life=this.torretas[this.i].life-this.player.damage;
        if(this.torretas[this.i].life<0){
            this.torretas[this.i].deadAnim();
            this.bomba.play();
            this.explosion = Game.add.sprite(this.torretas[this.i].x,this.torretas[this.i].y, 'explosion');
            this.explosion.anchor.setTo(0.4, 0.95);
            this.explosion.scale.setTo(1.1, 1.2);
            this.explosion.alpha = 0;
            this.explosionB=this.explosion.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, false);
            Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                this.explosion.alpha = 1;
                this.explosion.animations.play('start');
                this.explosionB.onComplete.add(finExplosion, this.explosion,this);
            },this);


            this.torretas.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
            Game.global.score=Game.global.score+1;
            this.coin1.play();
            Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
            this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
        }
     };
    
    Mazmorra.prototype.damageTorrRem = function () {
        this.damageTorr(this.damRemolino);
     };
    
    Mazmorra.prototype.damageTorrEsp = function () {
        this.damageTorr(this.damEspadas);
     };
    
    //Daño estandar torreta
    Mazmorra.prototype.damageTorreta = function () {
        console.log('hit');
        console.log(this.player.flagAttack);
        if(this.torretas[this.i].flagInmortal==0){
            if(this.player.flagAttack==true){
                if((this.player.scale.x==-1 && this.torretas[this.i].scale.x==1) || (this.player.scale.x==1 && this.torretas[this.i].scale.x==-1)){
                    if(this.player.flagDash==0){
                        this.torretas[this.i].hitEnem(this.player.damage);
                    }else{
                        this.torretas[this.i].hitEnem(this.player.damDash);
                    }
                    if(this.torretas[this.i].life<0){
                        this.torretas[this.i].deadAnim();
                        this.bomba.play();
                        this.explosion = Game.add.sprite(this.torretas[this.i].x,this.torretas[this.i].y, 'explosion');
                        this.explosion.anchor.setTo(0.4, 0.95);
                        this.explosion.scale.setTo(1.1, 1.2);
                        this.explosion.alpha = 0;
                        this.explosionB=this.explosion.animations.add('start', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 14, false);
                        Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                            this.explosion.alpha = 1;
                            this.explosion.animations.play('start');
                            this.explosionB.onComplete.add(finExplosion, this.explosion,this);
                        },this);


                        this.torretas.splice(this.i,1);  //(inicio desde el cual borrar, numero de elementos a borrar)
                        Game.global.score=Game.global.score+1;
                        this.coin1.play();
                        Game.global.oro=Game.global.oro+((Game.global.nivel+1)/2);
                        this.oroText.setText("Oro: " + Math.floor(Game.global.oro));
                    }
                }
            }else{
                this.damageYuki(this.torretas[this.i].damage,this.torretas[this.i].scale.x)

            }
        }
        
     };
     
     //Crear remolino
     Mazmorra.prototype.remolinoAttack = function () {
         
         if(this.player.poder-this.costeRemolino<0){
             return;
         }
         
         this.player.updateMana(this.costeRemolino);
         
        if(this.player.scale.x==1){          
            this.remolino = Game.add.sprite(this.player.x+30,this.player.y-20, 'remolino');
            Game.physics.arcade.enable(this.remolino);
            this.remolino.scale.setTo(1, 2);
            this.remolino.body.velocity.x = 300;
        }else{
            this.remolino = Game.add.sprite(this.player.x-40,this.player.y-20, 'remolino');
            Game.physics.arcade.enable(this.remolino);
            this.remolino.scale.setTo(-1, 2);
            this.remolino.body.velocity.x = -300;
        }        

        this.remolino.body.gravity.y = 0;
        this.remolino.checkWorldBounds = true;
        this.remolino.outOfBoundsKill = true;
        this.remolino.anchor.setTo(0.5, 0.7);

        this.remolino.animations.add('start', [0, 1, 2, 3, 4,5,6,7,8,9,10], 10, true);
        this.remolino.animations.play('start');

        
        Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            if(this.cambiando==0){
                this.flagLanzar=1;
            }
        },this);

        this.remolinos.push(this.remolino);
  
     };
    //Crear estocadas
    Mazmorra.prototype.espadasAttack = function () {
        
        if(this.player.poder-this.costeEspadas<0){
             return;
         }
        
        this.player.updateMana(this.costeEspadas);
        
        Game.time.events.add(Phaser.Timer.SECOND * 0.2, function() {
            if(this.cambiando==0){
                if(this.player.scale.x==1){          
                    this.espadas = Game.add.sprite(this.player.x+55,this.player.y-35, 'espadas');
                    Game.physics.arcade.enable(this.espadas);
                    this.espadas.scale.setTo(0.5, 0.3);        
                }else{
                    this.espadas = Game.add.sprite(this.player.x-55,this.player.y-35, 'espadas');
                    Game.physics.arcade.enable(this.espadas);
                    this.espadas.scale.setTo(-0.5, 0.3);
                    this.espadas.body.offset.x = this.espadas.width;
                }        

                this.espadas.body.velocity.x = 0;
                this.espadas.body.gravity.y = 0;

                this.espadas.checkWorldBounds = true;
                this.espadas.outOfBoundsKill = true;
                this.espadas.anchor.setTo(0, 0.5);

                this.espadas.animations.add('start', [0, 1, 2], 30, true);
                this.espadas.animations.play('start');
                this.espadasArray.push(this.espadas);
            }
        },this);


        Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            this.flagEspadas=1;
        },this);     
  
     };
    //Crear disparo o sound para torretas
    Mazmorra.prototype.torretaAttack = function (torreta) {
        if(Math.floor(Math.random()*(2)+1)==1){
            if(torreta.scale.x==1){          
                this.disparo = Game.add.sprite(torreta.x+30,torreta.y-20, 'torretaDisparo');
                Game.physics.arcade.enable(this.disparo);

                this.disparo.body.gravity.y = 0;
                this.disparo.checkWorldBounds = true;
                this.disparo.outOfBoundsKill = true;
                this.disparo.body.velocity.x = 200;
                this.disparo.anchor.setTo(0.5, 0.5);
                this.disparo.scale.setTo(1, 1);
                this.disparo.animations.add('start', [0, 1, 2, 3, 4], 10, true);
                this.disparo.animations.play('start');
                this.disparos.push(this.disparo);
                this.laser.play();

            }else{
                this.disparo = Game.add.sprite(torreta.x-40,torreta.y-20, 'torretaDisparo');
                Game.physics.arcade.enable(this.disparo);

                this.disparo.body.gravity.y = 0;
                this.disparo.checkWorldBounds = true;
                this.disparo.outOfBoundsKill = true;
                this.disparo.body.velocity.x = -200;
                this.disparo.anchor.setTo(0.5, 0.5);
                this.disparo.scale.setTo(1, 1);
                this.disparo.animations.add('start', [0, 1, 2, 3, 4], 10, true);
                this.disparo.animations.play('start');
                this.disparos.push(this.disparo);
                this.laser.play();
            }
        }else{
            torreta.moveFlag=1;
            if(torreta.scale.x==1){          

                Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                    if(this.cambiando==0){
                        this.disparoSound1 = Game.add.sprite(torreta.x+40,torreta.y-22, 'torretaSound');
                        Game.physics.arcade.enable(this.disparoSound1);

                        this.disparoSound1.body.gravity.y = 0;
                        this.disparoSound1.body.velocity.x = 0;
                        this.disparoSound1.checkWorldBounds = true;
                        this.disparoSound1.outOfBoundsKill = true;
                        this.disparoSound1.anchor.setTo(0.5, 0.5);
                        this.disparoSound1.scale.setTo(1, 0.55);
                        this.disparoSound1.animations.add('start', [0, 1, 2], 10, true);
                        this.disparoSound1.animations.play('start');
                        this.disparosSound.push(this.disparoSound1);
                    }
                },this);
                Game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    if(this.cambiando==0){
                        this.flagSound=1;
                        torreta.moveFlag=0;
                    }
                },this);

            }else{
                Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                    if(this.cambiando==0){
                        this.disparoSound2 = Game.add.sprite(torreta.x-40,torreta.y-22, 'torretaSound');
                        Game.physics.arcade.enable(this.disparoSound2);

                        this.disparoSound2.body.gravity.y = 0;
                        this.disparoSound2.body.velocity.x = 0;
                        this.disparoSound2.checkWorldBounds = true;
                        this.disparoSound2.outOfBoundsKill = true;
                        this.disparoSound2.anchor.setTo(0.5, 0.5);
                        this.disparoSound2.scale.setTo(-1, 0.55);
                        this.disparoSound2.animations.add('start', [0, 1, 2], 10, true);
                        this.disparoSound2.animations.play('start');
                        this.disparosSound.push(this.disparoSound2);
                    }
                },this);
                Game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                    if(this.cambiando==0){
                        this.flagSound=1;
                        torreta.moveFlag=0;
                    }
                },this);
                
            }
        }
        
        
     };
    
    Mazmorra.prototype.destroyDisparo = function () {    
        this.disparos[this.i].destroy();
        this.disparos.splice(this.i,1);
        
     };
    
    //Daño al player directo
    Mazmorra.prototype.damageYuki = function (damage,direction) {    
        
        if(this.player.flagInmortal==1){
            return;
        }        
        if(this.player.flagMove==1){
            return;
        }
        this.player.hitPlayer(damage,direction);
        
        if(this.player.life<1){
            Game.global.deads=Game.global.deads+1;
            this.nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY, 'Run Lost',{ font: '70px MedievalSharp', fill: '#ffffff' });
            this.nameLabel.anchor.setTo(0.5, 0.5);
            this.nameLabel.alpha=0;
            Game.add.tween(this.nameLabel).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            Game.time.events.add(2000, function() {
                    Game.state.start('Intro', false, true, 'Menu', 0);
            },this);
        }
     };
     
     Mazmorra.prototype.damageYukiDisp = function () {
        if(this.disparos[this.i].x>=this.player.x){
            this.damageYuki(40*Game.global.nivel,-1);
        }else{
            this.damageYuki(40*Game.global.nivel,1);   
        } 
     };
    
    Mazmorra.prototype.damageYukiBlockDisp = function () {
        if(this.disparos[this.i].x>=this.player.x){
            this.damageYuki(0,-1);
        }else{
            this.damageYuki(0,1);   
        } 
     };
 
    Mazmorra.prototype.damageYukiSound = function () {  
        if(this.player.flagBlock==1){
            if(this.disparosSound[this.i].x>=this.player.x && this.player.scale.x==1){
                return;
            }else if(this.disparosSound[this.i].x<=this.player.x && this.player.scale.x==-1){
                return;
            }
        }
        this.damageYuki(60*Game.global.nivel,this.disparosSound[this.i].scale.x);
     };
    
    function finExplosion(exp){
        exp.alpha = 0;
        exp.destroy();
    }
    
     Mazmorra.prototype.shuffle = function (array) {
         var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;        
     };
     
     Mazmorra.prototype.goFull = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    Mazmorra.prototype.toggleSound = function () {
        Game.sound.mute = ! Game.sound.mute;

        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
     };
    
    Mazmorra.prototype.onComplete = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    /*Mazmorra.prototype.render = function () {
        Game.debug.body(this.player);
        for (i in this.enemies){
            Game.debug.body(this.enemies[i]);
        }
        for (i in this.torretas){
            Game.debug.body(this.torretas[i]);
        }
        for (i in this.disparos){
            Game.debug.body(this.disparos[i]);
        }
    };*/
    
    Mazmorra.prototype.sonidoMuerte = function(enem){
            if (enem[0]=='e' || enem[0]=='z'){
                this.muerteH.play();
            }else if(enem[0]=='o' || enem[0]=='d'){
                this.muerte1.play();
            }else if(enem[0]=='r'){
                this.muerteR.play();
            }
    }
    
    Mazmorra.prototype.init = function(param) {
        //En funcion del param definimos variables de la dificualtad del nivel
        this.nivel=param;
        
        if(param==1){
            var tam=6;
        }else if(param==2){
            var tam=7;
        }else if(param==3){
            var tam=8;
        }else if(param==4){
            var tam=9;
        }else{
            this.niveles=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
            this.shuffle(this.niveles);
        }
        if(param<5){
            this.niveles=[];
            while(this.niveles.length<tam){
                var aleatorio = Math.round(Math.random()*31)+1 //Proporciona numeros entre 1 y 32
                var nuevo=true;
                for(i=0; i<this.niveles.length; i++){
                    if(this.niveles[i]==aleatorio)
                        nuevo=false;
                }
                if(nuevo)
                    this.niveles.push(aleatorio);
            }
        }
        
        var rand = Math.random()
        if(rand>0.65){
            this.musica=Game.add.audio('musica');
            this.musica.volume=0.6;
        }else if(rand>0.3){
            this.musica=Game.add.audio('musica2');
            this.musica.volume=0.7;
        }else{
            this.musica=Game.add.audio('musica3');
            this.musica.volume=0.9;
        }
        
        this.musica.loop=true;
        this.musica.play();
        
    }
    
    return Mazmorra;
});


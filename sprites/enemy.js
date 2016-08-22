
define(['Phaser','../game'], function (Phaser, Game) {
    function Enemy (x, y, nombre, minX, maxX) {
        //Selección de enemigos random y atributos
        this.nombre=nombre;
        if (this.nombre=="esbirro"){
            this.damage=60;
            this.life=100;
            this.rand=Math.floor(Math.random()*(5)+1);
            this.nombre=nombre+this.rand;
            if(this.rand==1 || this.rand==2){
                this.scaleX=-1;
            }else {
                this.scaleX=1;
            }
            this.velocity=1.3;
        }else{
            this.damage=60;
            this.life=100;
            this.scaleX=-1;
            this.velocity=1;
        }
        if(this.nombre=="oso"){
            this.damage=70;
            if(Game.global.nivel==1){
                this.nombre="oso";
            }else if(Game.global.nivel==2){
                this.nombre="oso2";
            }else if(Game.global.nivel==3){
                this.nombre="oso3";
            }else{
                this.nombre="oso4";
            }
        }else if(this.nombre=="rata"){
            if(Game.global.nivel==1){
                this.nombre="rata";
            }else if(Game.global.nivel==2){
                this.nombre="rata2";
            }else if(Game.global.nivel==3){
                this.nombre="rata3";
            }else{
                this.nombre="rata4";
            }
        }
        if(this.nombre=="defensor"){
            this.life=120;
        }
        Phaser.Sprite.call(this, Game, x, y, this.nombre);
        //sprite properties
        this.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
        this.animations.add('attack', [6, 7, 8, 9, 10, 11], 10, true);
        this.animations.add('dead', [12,13,14,15,16], 10, true);
        Game.physics.arcade.enable(this);
        
        this.body.gravity.y = 750;
        this.anchor.setTo(0.5, 0.9);
        this.scale.setTo(this.scaleX,1);
        this.body.bounce.x = 1;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.immovable = true;
        this.body.velocity.x = 0;
        this.vel=0;
        this.flag=0;
        this.deadFlag=0;
        this.flagMove=0;
        this.flagSuelo=0;
        this.flagHit=0;
        this.minX=minX;
        this.maxX=maxX;
        
        //Stats
        this.life=this.life*Game.global.nivel;
        this.damage=this.damage*Game.global.nivel;
        
        if (nombre=="esbirro"){
            if(this.rand==1 || this.rand==2){
                this.tamIni = -this.width;
            }else {
                this.tamIni = this.width;
            }
        }else{
            this.tamIni = -this.width;
        }
        
        this.timerAttack = Game.time.create(false);
        this.rand=Math.random()*(8-5)+5;
        
        //Evento de ataque
        this.myLoop=Game.time.events.loop(Phaser.Timer.SECOND * this.rand, function() {
            
            if(this.flagHit==0){
                this.rand=Math.random()*(5-3)+3;
                //this.y=this.y-1;
                this.body.velocity.x = this.body.velocity.x*2;
                this.body.gravity.y = 0;
                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start();
                
                //Fin de evento
                this.myLoop2=Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() { 
                    
                    if(this.body.velocity.x!=-100*this.velocity && this.body.velocity.x!=100*this.velocity){
                        this.body.velocity.x = this.body.velocity.x/2;
                    }

                    this.body.width = this.tamIni; 
                    this.animations.play('right');
                },this);
            }else {
                this.flagHit=0;
            }
            
        },this);
        
        Game.add.existing(this);
    }
    //Inheritance
    Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy.prototype.constructor = Enemy;
    
    Enemy.prototype.moveEnemy = function () {  
        
        //Si está muriendo
        if(this.deadFlag==1){
            return;
        }
        
        //Si está impactado
        if(this.flagMove==1){
            if(this.x<=this.minX){
                this.body.velocity.x = 0;
            } else if(this.x>=this.maxX){
                this.body.velocity.x = 0;
            }
            return;
        }
        
        if(this.x<=this.minX){
            this.scale.setTo(-this.scaleX,1);
            if (this.timerAttack.running){
                this.body.velocity.x = 200*this.velocity;
            }else{
                this.body.velocity.x = 100*this.velocity;
            }
        } else if(this.x>=this.maxX){
            this.scale.setTo(this.scaleX,1);
            if (this.timerAttack.running){
                this.body.velocity.x = -200*this.velocity;
            }else{
                this.body.velocity.x = -100*this.velocity;
            }
        }
        
        //Si está atacando
        if (this.timerAttack.running) {
            
            if (this.scale.x==1){
                this.body.width = this.width;  
                
            }else {
                this.body.width = -this.width;
            }
            
            this.animations.play('attack');
            return;
        }
        
        if (this.body.velocity.x>0) {
            this.scale.setTo(-this.scaleX,1);
        }else if (this.body.velocity.x<0){
            this.scale.setTo(this.scaleX,1);
        }else if (this.body.onFloor()){
            this.flagSuelo=1;
            this.animations.play('right');
            this.body.velocity.x = -100*this.velocity;
        }else if (this.body.velocity.x == 0 && this.flagSuelo==1){
            this.animations.play('right');
            this.body.velocity.x = -100*this.velocity*this.scaleX;
        }
        
    }; 
    
    Enemy.prototype.endTimer = function (timer) {
        // Stop the timer when the delayed event triggers
        timer.stop();
    };
    
    //Impacto sobre el enemy
    Enemy.prototype.hitEnem = function (damage,direction,block) {
        this.life=this.life-damage;
        this.flagMove=1;
        if(block==0){
            this.alpha=0.5;
        }
        if(this.timerAttack.running){
            this.vel=this.body.velocity.x/2;
        }else {
            this.vel=this.body.velocity.x;
        }
        
        this.body.velocity.x=500*direction;
        this.myLoop3=Game.time.events.add(150, function() {
            this.body.velocity.x=0;
         },this);
        this.myLoop4=Game.time.events.add(500, function() {
            this.flagMove=0;
            this.alpha=1;
            this.body.velocity.x=this.vel;
         },this);
    };
    
    //Impacto sobre el player
    Enemy.prototype.hitPlayer = function () {
        this.deadFlag=1;
        if(this.timerAttack.running){
            this.vel=this.body.velocity.x/2;
        }else {
            this.vel=this.body.velocity.x;
        }
        this.body.velocity.x=0;
        this.flagHit=1;
        
        this.myLoop5=Game.time.events.add(500, function() {
            this.body.velocity.x=this.vel;
            this.deadFlag=0;
         },this);
    };
    
    //Destrucciín del objeto
    Enemy.prototype.killEnem = function () {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        Game.time.events.remove(this.myLoop);
        Game.time.events.remove(this.myLoop2);
        Game.time.events.remove(this.myLoop3);
        Game.time.events.remove(this.myLoop4);
        Game.time.events.remove(this.myLoop5);
        this.destroy();
    };
    
    //Animación de muerte
    Enemy.prototype.deadAnim = function () {  
        this.deadFlag=1;
        Game.time.events.remove(this.myLoop);
        Game.time.events.remove(this.myLoop2);
        Game.time.events.remove(this.myLoop3);
        Game.time.events.remove(this.myLoop4);
        Game.time.events.remove(this.myLoop5);
        this.body.gravity.y = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.play('dead');
        Game.time.events.add(Phaser.Timer.SECOND * 0.25, function() {
            this.anchor.setTo(0.5, 0.79);
        },this);
        Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            this.animations.stop();
            this.frame=16;
            Game.add.tween(this).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                this.destroy();
            },this);
        },this);
        
    };
    
    Enemy.prototype.getTipo = function(){
        return this.nombre;
    }
    
    return Enemy;
});
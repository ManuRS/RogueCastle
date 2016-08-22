
define(['Phaser','../game'], function (Phaser, Game) {
    function Zeke (x, y, minX, maxX) {
        Phaser.Sprite.call(this, Game, x, y, 'zeke');
        //sprite properties
        this.animations.add('entra', [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 10, true);
        this.animations.add('dash', [13,14,15,16,17,18,19,20], 8, true);
        this.animations.add('giro', [6,7,8,9,10,11,12], 10, true);
        this.animations.add('suelo', [22,23,24,25,26,27,28,29,30,31,32,33,34], 10, true);
        this.animations.add('block', [35,35], 1, true);
        this.animations.add('intro', [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 10, true);
        this.animations.add('walk', [0,1,2,3,4,5], 10, true);
        this.animations.add('dead', [59,60,61,62,62,62,62,62,62,62,63,64,36,37,38,39,40,41,42,43,44,45], 10, true);
        Game.physics.arcade.enable(this);
        this.body.gravity.y = 750;
        this.anchor.setTo(0.5, 0.9);
        this.scale.setTo(-1,1);
        this.body.bounce.x = 1;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.body.velocity.x = 0;
        this.body.immovable = true;
        this.nombre='zeke';
        this.vel=0;
        this.flag=0;
        this.deadFlag=0;
        this.flagMove=0;
        this.flagBlock=0;
        this.flagAttack=0;
        this.flagSuelo=0;
        this.flagHit=0;
        this.minX=minX;
        this.maxX=maxX;
        this.tamIni = -this.width;
        this.timerAttack = Game.time.create(false);
        this.introTime = Game.time.create(false);
        this.rand=Math.random()*(10-5)+5;
        
        //Stats
        this.life=150*Game.global.nivel;
        this.damage=70*Game.global.nivel;
        
        this.introTime.add(Phaser.Timer.SECOND * 2, this.endTimer, this, this.introTime);
        this.introTime.start();
        
        //Evento de ataque
        this.myLoop=Game.time.events.loop(Phaser.Timer.SECOND * this.rand, function() {

            if(this.flagHit==0){
                this.flagHit=1;
                this.body.velocity.x = 200*this.scale.x;
                this.body.gravity.y = 0;

                this.atkRand=Math.random()*(5-1)+1;

                if(this.atkRand>4){
                    this.anim='giro';
                    this.tiempo=3;
                }else if(this.atkRand>3){
                    this.anim='dash';
                    this.tiempo=1;
                }else if(this.atkRand>2){
                    this.anim='suelo';
                    this.anchor.setTo(0.5, 0.8);
                    this.tiempo=1.2;
                }else{
                    this.body.velocity.x=0;
                    this.anim='block';
                    this.tiempo=3;
                    this.flagBlock=1;
                }
                this.flagAttack=1;

                this.timerAttack.add(Phaser.Timer.SECOND * this.tiempo, this.endTimer, this, this.timerAttack);
                this.timerAttack.start();

                this.myLoop2=Game.time.events.add(Phaser.Timer.SECOND * this.tiempo, function() {
                    if(this.body.velocity.x>0){
                        this.body.velocity.x = 100;
                    }else{
                        this.body.velocity.x = -100;
                    }
                    this.flagBlock=0;
                    this.flagAttack=0;
                    this.anchor.setTo(0.5, 0.9);
                    this.body.width = this.tamIni;
                    this.animations.play('walk');
                },this);
            }else{
                this.flagHit=0;
            }
            
        },this);
        
        Game.add.existing(this);
    }
    //Inheritance
    Zeke.prototype = Object.create(Phaser.Sprite.prototype);
    Zeke.prototype.constructor = Zeke;
    
    Zeke.prototype.moveEnemy = function () {  
        
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
            this.scale.setTo(1,1);
            if (this.timerAttack.running){
                this.body.velocity.x = 200;
            }else{
                this.body.velocity.x = 100;
            }
        } else if(this.x>=this.maxX){
            this.scale.setTo(-1,1);
            if (this.timerAttack.running){
                this.body.velocity.x = -200;
            }else{
                this.body.velocity.x = -100;
            }
        }
        
        if (this.introTime.running) {
            this.scale.setTo(1,1);
            this.animations.play('intro');
            return;
        }
            
        //Si está atacando
        if (this.timerAttack.running) {
            
            if (this.scale.x==1){
                this.body.width = this.width;  
                
            }else {
                this.body.width = -this.width;
                //this.body.offset.x = this.width;
            }
            if(this.anim=='block'){
                this.body.velocity.x=0;
            }
            this.animations.play(this.anim);
            return;
        }
        
        if (this.body.velocity.x>0) {
            this.scale.setTo(1,1);
        }else if (this.body.velocity.x<0){
            this.scale.setTo(-1,1);
        }else if (this.body.onFloor()){
            this.flagSuelo=1;
            this.animations.play('walk');
            this.body.velocity.x = -100;
        }else if (this.body.velocity.x == 0 && this.flagSuelo==1){
            this.animations.play('walk');
            this.body.velocity.x = 100*this.scale.x;
        }
    }; 
    
    Zeke.prototype.endTimer = function (timer) {
        // Stop the timer when the delayed event triggers
        timer.stop();
    };
    
    //Impacto sobre el enemy
    Zeke.prototype.hitEnem = function (damage,direction,block) {
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
        this.myLoop4=Game.time.events.add(300, function() {
            this.flagMove=0;
            this.alpha=1;
            this.body.velocity.x=this.vel;
         },this);
    };
    
    //Impacto sobre el player
    Zeke.prototype.hitPlayer = function () {
        this.deadFlag=1;
        if(this.timerAttack.running){
            this.vel=this.body.velocity.x/2;
        }else {
            this.vel=this.body.velocity.x;
        }
        this.flagHit=1;
        this.body.velocity.x=0;
        this.myLoop5=Game.time.events.add(300, function() {
            this.body.velocity.x=this.vel;
            this.deadFlag=0;
         },this);
    };
    
    //Destrucciín del objeto
    Zeke.prototype.killEnem = function () {
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
    Zeke.prototype.deadAnim = function () {  
        
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
        this.scale.setTo(-this.scale.x, 1);
        Game.time.events.add(Phaser.Timer.SECOND * 0.3, function() {
            this.anchor.setTo(0.5, 0.7);
        },this);
        Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            this.anchor.setTo(0.5, 0.95);
        },this);
        Game.time.events.add(Phaser.Timer.SECOND * 2.2, function() {
            this.animations.stop();
            this.alpha=1;
            this.frame=45;
        },this);
        
    };
    
    return Zeke;
});
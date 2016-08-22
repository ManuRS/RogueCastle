
define(['Phaser','../game'], function (Phaser, Game) {
    function Torreta (x, y) {
        Phaser.Sprite.call(this, Game, x, y, 'torreta');
        //sprite properties
        this.animations.add('sale', [9,8,7,6,5,4], 12, true);
        this.animations.add('entra', [4,5,6,7,8,9], 10, true);
        this.animations.add('attackEntra', [10,11,12,13,14], 10, true);
        this.animations.add('attackSale', [14,13,12,11,10], 10, true);
        this.animations.add('eyes', [0,1,2,3], 10, true);
        Game.physics.arcade.enable(this);
        this.body.gravity.y = 750;
        this.anchor.setTo(0.5, 0.9);
        this.scale.setTo(-1,1);
        this.checkWorldBounds = true;
        this.body.velocity.x = 0;
        this.body.immovable = true;
        this.flag=0;
        this.deadFlag=0;
        this.attackFlag=0;
        this.moveFlag=0;
        this.flagInmortal=0;
        this.tamIni = -this.width;
        this.timerAttack = Game.time.create(false);
        this.rand=Math.random()*(8-5)+5;
        
        //Stats
        this.life=100*(Game.global.nivel/2);
        this.damage=60*Game.global.nivel;
        
        //Evento de ataque
        this.myLoop=Game.time.events.loop(Phaser.Timer.SECOND * this.rand, function() {
            
            this.body.gravity.y = 0;
            this.timerAttack.add(Phaser.Timer.SECOND * 3.5, this.endTimer, this, this.timerAttack);
            this.timerAttack.start();
            
            this.rand=Math.random()*(6-5)+5;
                   
            this.animations.play('sale');

            this.myLoop3=Game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                //this.animations.stop();
                this.animations.play('attackEntra');
            },this);
            
            this.myLoop2=Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
                this.animations.stop();
                this.frame = 14;
                this.attackFlag=1;
            },this);
            
            this.myLoop7=Game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
                this.animations.stop();
                this.animations.play('attackSale');
            },this);
            
            this.myLoop4=Game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                this.animations.play('eyes');
            },this);
            
            this.myLoop5=Game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                this.animations.play('entra');
            },this);
            
            this.myLoop6=Game.time.events.add(Phaser.Timer.SECOND * 3.5, function() {
                this.body.width = this.tamIni; 
                this.frame = 9;
            },this);
            
        },this);
        
        Game.add.existing(this);
    }
    //Inheritance
    Torreta.prototype = Object.create(Phaser.Sprite.prototype);
    Torreta.prototype.constructor = Torreta;
    
    Torreta.prototype.moveEnemy = function (playerX) {  
            
        //Si está muriendo
        if(this.deadFlag==1){
            return;
        }
        
        //Si está impactado
        if(this.moveFlag==0){
            if(playerX<this.x){
                this.scale.setTo(-1,1);
                this.body.width = -this.width;
            }else{
                this.scale.setTo(1,1);
                this.body.width = this.width;
            }
        }

        //Si está atacando
        if (this.timerAttack.running) {
            
            
            if (this.scale.x==1){
                this.body.width = this.width;  
                
            }else {
                this.body.width = -this.width;
                //this.body.offset.x = this.width;
            }
            return;
        }
        
        this.frame = 9;
        
    }; 
    
    Torreta.prototype.endTimer = function (timer) {
        // Stop the timer when the delayed event triggers
        timer.stop();
    };
    
    //Impacto sobre el enemy
    Torreta.prototype.hitEnem = function (damage) {
        this.life=this.life-damage;
        this.alpha=0.5;
        this.flagInmortal=1;

        this.myLoop8=Game.time.events.add(300, function() {
            this.alpha=1;
            this.flagInmortal=0;
         },this);
    };
    
    //Destrucciín del objeto
    Torreta.prototype.killEnem = function (timer) {
        Game.time.events.remove(this.myLoop);
        Game.time.events.remove(this.myLoop2);
        Game.time.events.remove(this.myLoop3);
        Game.time.events.remove(this.myLoop4);
        Game.time.events.remove(this.myLoop5);
        Game.time.events.remove(this.myLoop6);
        Game.time.events.remove(this.myLoop7);
        Game.time.events.remove(this.myLoop8);
        this.destroy();
    };
    
    //Animación de muerte
    Torreta.prototype.deadAnim = function () {  
        this.deadFlag=1;
        this.body.gravity.y = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        Game.time.events.remove(this.myLoop);
        Game.time.events.remove(this.myLoop2);
        Game.time.events.remove(this.myLoop3);
        Game.time.events.remove(this.myLoop4);
        Game.time.events.remove(this.myLoop5);
        Game.time.events.remove(this.myLoop6);
        Game.time.events.remove(this.myLoop7);
        Game.time.events.remove(this.myLoop8);
        this.animations.play('eyes');
        Game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            this.destroy();
        },this);
        
    };
    
    return Torreta;
});
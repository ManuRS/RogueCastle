
define(['Phaser','../game'], function (Phaser, Game) {
    function Player (x,y) {
        Phaser.Sprite.call(this,Game,x,y,'yuki');
        //sprite properties
        this.animations.add('left', [0, 1, 2, 3, 4, 5], 12, true);
        this.animations.add('right', [0, 1, 2, 3, 4, 5], 12, true);
        this.animations.add('stay', [8,9,10,11], 7, true);
        this.animations.add('attack', [16,17,18,19,18,17,16], 15, true);
        this.animations.add('attackup', [28,29,30,31,32,32], 20, true);
        this.dash1=this.animations.add('dash1', [47,48,49,50,51,52,53,54,55,56,57,58,59], 12, false);
        this.dash2=this.animations.add('dash2', [60,61], 12, false);
        this.animations.add('dash3', [62,63,64,65,66], 12, false);
        this.animations.add('dash4', [67,68], 12, false);
        this.animations.add('lanzar', [42,43,44,45,46], 12, true);
        this.animations.add('block', [24,25], 5, true);
        this.animations.add('rapido', [35,36,37,38,39,40,41], 12, true);
        this.animations.add('dead', [20,21,22,23], 10, false);
        Game.physics.arcade.enable(this);
        this.body.gravity.y = 750;
        this.anchor.setTo(0.5, 0.9);
        
        //Gamepad
        Game.input.gamepad.start();
        
        this.pad1 = Game.input.gamepad.pad1;
        
        //Salto y texto debug
        //this.textLeft = Game.add.text(20, 20, "Left was pressed 250 ms ago? NO", { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.JumpCount=0;
        this.stopPlayer=0;
        this.flagRemolino=0;
        this.flagEspadas=0;
        this.timer = Game.time.create(false);
        this.timerAttack = Game.time.create(false);
        this.flagAttack=false;
        this.flagBlock=0;
        this.flagMove=0;
        this.flagInmortal=0;
        this.flagDash=0;
        this.flagPad=0;
        
        //Stats
        this.life=200;
        this.poder=200;
        
        this.damage=60;
        
        this.gastoDash=60;
        this.damDash=120;
        
        if(Game.global.espada1==1){
            this.damage=this.damage+40;
        }
        if(Game.global.espada2==1){
            this.damage=this.damage+50;
        }
        if(Game.global.espada3==1){
            this.damage=this.damage+60;
        }
        if(Game.global.pocion1==1){
            this.poder=this.poder+100;
        }
        if(Game.global.pocion2==1){
            this.poder=this.poder+170;
        }
        if(Game.global.pocion3==1){
            this.poder=this.poder+280;
        }
        if(Game.global.defensa1==1){
            this.life=this.life+100;
        }
        if(Game.global.defensa2==1){
            this.life=this.life+170;
        }
        if(Game.global.defensa3==1){
            this.life=this.life+280;
        }
        
        this.medM=100;
        this.minM=50;
        
        if(this.poder>469){
            this.medM=235;
            this.minM=117;
        }else if(this.poder>299){
            this.medM=150;
            this.minM=75;
        }
        
        this.medL=100;
        this.minL=50;
        
        if(this.life>469){
            this.medL=235;
            this.minL=117;
        }else if(this.life>299){
            this.medL=150;
            this.minL=75;
        }
        
        //Permitimos utilizar las teclas WASD
        this.cursor = Game.input.keyboard.createCursorKeys();
        this.wasd = {
            up: Game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: Game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: Game.input.keyboard.addKey(Phaser.Keyboard.D),
            down: Game.input.keyboard.addKey(Phaser.Keyboard.S),
            m: Game.input.keyboard.addKey(Phaser.Keyboard.M),
            n: Game.input.keyboard.addKey(Phaser.Keyboard.N),
            b: Game.input.keyboard.addKey(Phaser.Keyboard.B),
            v: Game.input.keyboard.addKey(Phaser.Keyboard.V),
            coma: Game.input.keyboard.addKey(Phaser.Keyboard.COMMA),
            space: Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };
        
        this.yuki_jump=Game.add.audio('yuki_jump');
        this.yuki_jump.loop=false;
        this.yuki_jump.volume=0.75;
        
        this.createStaminaMana();
        
        Game.add.existing(this);
    }
    //Inheritance
    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    
    Player.prototype.movePlayer = function () {
        /*
        Botones:
        0=Cuadrado (this.pad1._rawPad.buttons[0].value)
        1=Equis
        2=Circulo
        3=Triangulo
        12=up
        13=down
        15=der
        14=izq
        this.pad1._rawPad.axes[0] der 1 izq -1
        this.pad1._rawPad.axes[1] down 1 up -1
        */
        
        if(this.flagMove==1){
            return;
        }
        
        //Attack module Gamepad conectado
        if(this.pad1.connected==true){
            //Ataque básico
            if (((this.wasd.space.isDown && this.wasd.space.duration==0) || (this.pad1._rawPad.buttons[0].value==1 && this.pad1.justPressed(0, 0)==true)) && this.body.onFloor() && !this.timerAttack.running) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('attack');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque rapido
            if (((this.wasd.m.isDown && this.wasd.m.duration==0) || (this.pad1._rawPad.buttons[1].value==1 && this.pad1.justPressed(1, 0)==true)) && this.body.onFloor() && !this.timerAttack.running) {
                this.anchor.setTo(0, 0.95);
                this.body.gravity.y = 0;
                this.damage=this.damage-20;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(300, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.damage=this.damage+20;
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('attackup');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.3, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Bloqueo
            if ((this.wasd.coma.isDown || this.pad1._rawPad.buttons[2].value==1) && this.body.onFloor() && !this.timerAttack.running) {
                this.anchor.setTo(0.5, 0.9);
                this.flagBlock=1;

                this.animations.play('block');

                this.body.velocity.x = 0;

                return;

            }
            this.flagBlock=0;
            //Ataque remolino
            if (((this.wasd.b.isDown && this.wasd.b.duration==0) || (this.pad1._rawPad.buttons[5].value==1 && this.pad1.justPressed(5, 0)==true)) && this.body.onFloor() && !this.timerAttack.running  && Game.global.remolino==1) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                this.flagRemolino=1;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('lanzar');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque estocadas
            if (((this.wasd.v.isDown && this.wasd.v.duration==0) || (this.pad1._rawPad.buttons[4].value==1 && this.pad1.justPressed(4, 0)==true)) && this.body.onFloor() && !this.timerAttack.running  && Game.global.espadas==1) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                this.flagEspadas=1;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('rapido');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque dash
            if (((this.wasd.n.isDown && this.wasd.n.duration==0) || (this.pad1._rawPad.buttons[3].value==1 && this.pad1.justPressed(3, 0)==true)) && !this.timerAttack.running  && Game.global.dash==1) {

                if(this.poder-this.gastoDash<0){
                    return;
                }
                this.updateMana(this.gastoDash);

                this.flagDash=1;

                this.anchor.setTo(0, 0.95);
                this.body.gravity.y = 0;
                this.body.velocity.y = 0;

                if (this.scale.x==1){
                    this.x=this.x-30; 

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.body.velocity.x = 300;

                    }else {
                        this.body.velocity.x = -300;
                    }
                 },this);

                this.dash1.onComplete.add(function() {
                        this.anchor.setTo(0, 0.9);
                        this.animations.play('dash2');
                     }, this);

                this.dash2.onComplete.add(function() {
                        this.anchor.setTo(0, 0.95);
                        this.body.velocity.x = 0;
                        this.body.gravity.y = 750;
                        this.animations.play('dash3');
                     }, this);

                Game.time.events.add(1500, function() {
                        this.anchor.setTo(0, 0.98);
                 },this);

                Game.time.events.add(2000, function() {
                        this.anchor.setTo(0, 0.9);
                        if (this.scale.x==1){
                            this.x=this.x-30;
                        }else {
                            this.x=this.x+30;
                        }
                        this.animations.play('dash4');
                 },this);

                Game.time.events.add(2400, function() {
                    this.animations.stop();
                    if (this.scale.x==1){
                        this.x=this.x+60;
                    }else {
                        this.x=this.x-60;
                        this.body.offset.x = 0;
                    }
                    this.body.velocity.x = 0;
                    this.flagDash=0;
                 },this);



                this.flagAttack=true;
                this.animations.play('dash1');
                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 2.4, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            if (this.timerAttack.running) {
                if (this.scale.x==1){
                    this.body.width = this.width;  

                }else {
                    this.body.width = -this.width;
                    this.body.offset.x = this.width;
                }

                return;
            }

            this.flagAttack=false;
            this.body.width = 42;
            this.body.height = 76;
            this.anchor.setTo(0.5, 0.9);

            // If the left arrow or the A key is pressed
            if ((this.cursor.left.isDown || this.wasd.left.isDown || this.pad1._rawPad.axes[0]<=-0.5) && this.stopPlayer==0 ) {
                this.body.velocity.x = -200;
                this.animations.play('left');
                this.scale.setTo(-1,1);
            }
            // If the right arrow or the D key is pressed
            else if ((this.cursor.right.isDown || this.wasd.right.isDown || this.pad1._rawPad.axes[0]>=0.5) && this.stopPlayer==0) {
                this.body.velocity.x = 200;
                this.animations.play('right');
                this.scale.setTo(1,1);
            }
            //Agacharse
            else if (this.cursor.down.isDown || this.wasd.down.isDown || this.pad1._rawPad.axes[1]>=0.5) {
                this.body.velocity.x = 0;
                this.frame = 7;
                this.body.height = 50;
            }
            else if (!this.body.onFloor()) {
                this.frame = 6;
                this.body.velocity.x = 0; 
            }
            else {

                this.body.velocity.x = 0;
                //this.animations.stop();
                this.anchor.setTo(0.5, 0.9);
                this.animations.play('stay');
            }
            
            if(this.pad1._rawPad.axes[1]>=-0.5){
                this.flagPad=0;
            }


            //Salto
            if(this.JumpCount==1 && this.body.onFloor()){
                this.JumpCount=0;
                this.timer.add(Phaser.Timer.SECOND * 0.2, this.endTimer, this, this.timer);
                this.timer.start();
            }
            else if (this.cursor.up.isDown  && this.body.onFloor() && this.stopPlayer==0 && this.cursor.up.duration==0) {
                this.yuki_jump.play();     
                this.JumpCount=1;
                this.animations.stop();
                this.body.velocity.y = -490;  
            }
            else if (this.wasd.up.isDown  && this.body.onFloor() && this.stopPlayer==0 && this.wasd.up.duration==0) {   
                this.JumpCount=1;
                this.animations.stop();
                this.body.velocity.y = -490;  
            } 
            else if (this.pad1._rawPad.axes[1]<=-0.5  && this.body.onFloor() && this.stopPlayer==0 && this.flagPad==0) {  
                this.JumpCount=1;
                this.flagPad=1;
                this.animations.stop();
                this.body.velocity.y = -490;  
            }
            // If the up arrow or the W key is pressed
            else if ((this.cursor.up.isDown || this.wasd.up.isDown || this.pad1._rawPad.axes[1]<=-0.5) && !this.body.onFloor() ) {
                this.frame = 6;
            }
            else if ((this.cursor.right.isDown || this.wasd.right.isDown || this.pad1._rawPad.axes[0]>=0.5) && !this.body.onFloor()) {
                this.body.velocity.x = 200;
                this.frame = 6;
                this.scale.setTo(1,1);
            }
            else if ((this.cursor.left.isDown || this.wasd.left.isDown || this.pad1._rawPad.axes[0]<=-0.5) && !this.body.onFloor()) {
                this.body.velocity.x = -200;
                this.frame = 6;
                this.scale.setTo(-1,1);
            }

            if (this.timer.running && this.body.onFloor()){
                this.stopPlayer=1;
                this.frame = 7;
            }else{
                this.stopPlayer=0;
            }
        }else{
            //Attack module sin Gamepad
            //Ataque básico
            if (this.wasd.space.isDown && this.wasd.space.duration==0 && this.body.onFloor() && !this.timerAttack.running) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('attack');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque rápido
            if (this.wasd.m.isDown && this.body.onFloor() && this.wasd.m.duration==0 && !this.timerAttack.running) {
                this.anchor.setTo(0, 0.95);
                this.body.gravity.y = 0;
                this.damage=this.damage-20;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(300, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.damage=this.damage+20;
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('attackup');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.3, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Bloqueo
            if (this.wasd.coma.isDown && this.body.onFloor() && !this.timerAttack.running) {
                this.anchor.setTo(0.5, 0.9);
                this.flagBlock=1;

                this.animations.play('block');

                this.body.velocity.x = 0;

                return;

            }
            this.flagBlock=0;
            //Ataque remolino
            if (this.wasd.b.isDown && this.body.onFloor() && this.wasd.b.duration==0 && !this.timerAttack.running  && Game.global.remolino==1) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                this.flagRemolino=1;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('lanzar');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque estocadas
            if (this.wasd.v.isDown && this.body.onFloor() && this.wasd.v.duration==0 && !this.timerAttack.running  && Game.global.espadas==1) {
                this.anchor.setTo(0, 0.9);
                this.body.gravity.y = 0;

                this.flagEspadas=1;

                if (this.scale.x==1){
                    this.x=this.x-30;     

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.x=this.x+30;
                    }else {
                        this.x=this.x-30;
                        this.body.offset.x = 0;
                    }
                    this.body.gravity.y = 750;
                 },this);

                this.flagAttack=true;
                this.animations.play('rapido');

                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 0.5, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            //Ataque dash
            if (this.wasd.n.isDown && this.wasd.n.duration==0 && !this.timerAttack.running  && Game.global.dash==1) {

                if(this.poder-this.gastoDash<0){
                    return;
                }
                this.updateMana(this.gastoDash);

                this.flagDash=1;

                this.anchor.setTo(0, 0.95);
                this.body.gravity.y = 0;
                this.body.velocity.y = 0;

                if (this.scale.x==1){
                    this.x=this.x-30; 

                }else {
                    this.x=this.x+30;
                }

                Game.time.events.add(500, function() {
                    if (this.scale.x==1){
                        this.body.velocity.x = 300;

                    }else {
                        this.body.velocity.x = -300;
                    }
                 },this);

                this.dash1.onComplete.add(function() {
                        this.anchor.setTo(0, 0.9);
                        this.animations.play('dash2');
                     }, this);

                this.dash2.onComplete.add(function() {
                        this.anchor.setTo(0, 0.95);
                        this.body.velocity.x = 0;
                        this.body.gravity.y = 750;
                        this.animations.play('dash3');
                     }, this);

                Game.time.events.add(1500, function() {
                        this.anchor.setTo(0, 0.98);
                 },this);

                Game.time.events.add(2000, function() {
                        this.anchor.setTo(0, 0.9);
                        if (this.scale.x==1){
                            this.x=this.x-30;
                        }else {
                            this.x=this.x+30;
                        }
                        this.animations.play('dash4');
                 },this);

                Game.time.events.add(2400, function() {
                    this.animations.stop();
                    if (this.scale.x==1){
                        this.x=this.x+60;
                    }else {
                        this.x=this.x-60;
                        this.body.offset.x = 0;
                    }
                    this.body.velocity.x = 0;
                    this.flagDash=0;
                 },this);



                this.flagAttack=true;
                this.animations.play('dash1');
                this.body.velocity.x = 0;

                this.timerAttack.add(Phaser.Timer.SECOND * 2.4, this.endTimer, this, this.timerAttack);
                this.timerAttack.start(); 
            }
            if (this.timerAttack.running) {
                if (this.scale.x==1){
                    this.body.width = this.width;  

                }else {
                    this.body.width = -this.width;
                    this.body.offset.x = this.width;
                }

                return;
            }

            this.flagAttack=false;
            this.body.width = 42;
            this.body.height = 76;
            this.anchor.setTo(0.5, 0.9);

            // If the left arrow or the A key is pressed
            if ((this.cursor.left.isDown || this.wasd.left.isDown) && this.stopPlayer==0 ) {
                this.body.velocity.x = -200;
                this.animations.play('left');
                this.scale.setTo(-1,1);
            }
            // If the right arrow or the D key is pressed
            else if ((this.cursor.right.isDown || this.wasd.right.isDown) && this.stopPlayer==0) {
                this.body.velocity.x = 200;
                this.animations.play('right');
                this.scale.setTo(1,1);
            }
            //Agacharse
            else if (this.cursor.down.isDown || this.wasd.down.isDown) {
                this.body.velocity.x = 0;
                this.frame = 7;
                this.body.height = 50;
            }
            else if (!this.body.onFloor()) {
                this.frame = 6;
                this.body.velocity.x = 0; 
            }
            else {

                this.body.velocity.x = 0;
                //this.animations.stop();
                this.anchor.setTo(0.5, 0.9);
                this.animations.play('stay');
            }


            //Salto
            if(this.JumpCount==1 && this.body.onFloor()){
                this.JumpCount=0;
                this.timer.add(Phaser.Timer.SECOND * 0.2, this.endTimer, this, this.timer);
                this.timer.start();
            }
            else if (this.cursor.up.isDown  && this.body.onFloor() && this.stopPlayer==0 && this.cursor.up.duration==0) {
                this.yuki_jump.play();    
                this.JumpCount=1;
                this.animations.stop();
                this.body.velocity.y = -490;  
            }
            else if (this.wasd.up.isDown  && this.body.onFloor() && this.stopPlayer==0 && this.wasd.up.duration==0) {  
                this.JumpCount=1;
                this.animations.stop();
                this.body.velocity.y = -490;  
            } 
            // If the up arrow or the W key is pressed
            else if ((this.cursor.up.isDown || this.wasd.up.isDown) && !this.body.onFloor() ) {
                this.frame = 6;
            }
            else if ((this.cursor.right.isDown || this.wasd.right.isDown) && !this.body.onFloor()) {
                this.body.velocity.x = 200;
                this.frame = 6;
                this.scale.setTo(1,1);
            }
            else if ((this.cursor.left.isDown || this.wasd.left.isDown) && !this.body.onFloor()) {
                this.body.velocity.x = -200;
                this.frame = 6;
                this.scale.setTo(-1,1);
            }

            if (this.timer.running && this.body.onFloor()){
                this.stopPlayer=1;
                this.frame = 7;
            }else{
                this.stopPlayer=0;
            }
        }

    };
    
    Player.prototype.createStaminaMana = function (daño) {
        // just a property we can tween so the bar has a progress to show
        this.barProgressLife = this.life;
        this.barProgressMana = this.poder;
        
        // the bar itself
        this.barLife = Game.add.bitmapData(this.life, 15);
        this.barMana = Game.add.bitmapData(this.poder, 15);
        
        this.stamina=Game.add.sprite(60, 5, this.barLife);
        this.mana=Game.add.sprite(60, 24, this.barMana);
        
        this.stamina.alpha=0.9;
        this.mana.alpha=0.8;
        
        this.updateStamina(0);
        this.updateMana(0);
    };
    
    Player.prototype.updateStamina = function (damage) {
        this.life=this.life-damage;
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.barLife.context.clearRect(0, 0, this.barLife.width, this.barLife.height);
        
        this.barProgressLife = this.barProgressLife-damage;
        
        // some simple colour changing to make it look like a health bar
        if (this.barProgressLife < this.minL) {
           this.barLife.context.fillStyle = '#f00';   
        }
        else if (this.barProgressLife < this.medL) {
            this.barLife.context.fillStyle = '#ff0';
        }
        else {
            this.barLife.context.fillStyle = '#0f0';
        }
        
        // draw the bar
        this.barLife.context.fillRect(0, 0, this.barProgressLife, 15);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.barLife.dirty = true;
        
        Game.world.bringToTop(this.stamina);
    };
    
    Player.prototype.updateMana = function (gasto) {
        this.poder=this.poder-gasto;
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.barMana.context.clearRect(0, 0, this.barMana.width, this.barMana.height);
        
        this.barProgressMana = this.barProgressMana-gasto;
        
        // some simple colour changing to make it look like a health bar
        if (this.barProgressMana < this.minM) {
           this.barMana.context.fillStyle = '#cceeff';   
        }
        else if (this.barProgressMana < this.medM) {
            this.barMana.context.fillStyle = '#6698ff';
        }
        else {
            this.barMana.context.fillStyle = '#3212bb';
        }
        
        // draw the bar
        this.barMana.context.fillRect(0, 0, this.barProgressMana, 15);
        
        // important - without this line, the context will never be updated on the GPU when using webGL
        this.barMana.dirty = true;
        
        Game.world.bringToTop(this.mana);
    };
    
    Player.prototype.hitPlayer = function (damage,direction) {
        this.updateStamina(damage);
        this.animations.stop();
        
        if(direction==0){
            this.frame = 69;
            this.alpha=0.5;
            this.scale.setTo(-1,1);
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.flagMove=1;
            Game.time.events.add(1000, function() {
                this.flagMove=0;
                this.scale.setTo(1,1);
                this.alpha=1;
             },this);
            return;
        }
        else if(this.life<1){
            this.animations.play('dead');
            this.flagMove=1; 
            this.body.height=36;
            this.body.width=75;
            this.body.velocity.x = 0;
            this.y=this.y-2;
            Game.time.events.add(200, function() {
                if(this.scale.x==-1){
                    this.body.offset.x=-75;
                }
                this.anchor.setTo(0, 0.95);
             },this);
        }else{   
            this.body.velocity.x = 700*direction;
            this.flagMove=1;
            this.frame = 69;
            if(damage!=0){
                this.alpha=0.5;
            }
            this.scale.setTo(direction,1);
            Game.time.events.add(100, function() {
                this.body.velocity.x = 0;
             },this);

            Game.time.events.add(200, function() {
                this.scale.setTo(-direction,1);
                this.animations.play('block');
             },this);

            Game.time.events.add(300, function() {
                this.flagMove=0;
                this.flagInmortal=1;
             },this);

            Game.time.events.add(500, function() {
                this.flagInmortal=0;
                this.alpha=1;
             },this);
        }
    };
    
    Player.prototype.endTimer = function (timer) {
        // Stop the timer when the delayed event triggers
        timer.stop();
    };
    
    return Player;
});
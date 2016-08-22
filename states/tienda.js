
define(['Phaser','../game'], function (Phaser,Game){
    
    function Tienda() {
        Phaser.State.call(this);
    }
    
    //Inheritance
    Tienda.prototype = Object.create(Phaser.State.prototype);
    Tienda.prototype.constructor = Tienda;
    
    /* download assets code here */
    Tienda.prototype.preload = function () {
        //Game.stage.backgroundColor = '#3498db'; this.oro.text = "Oro: " + Game.global.oro;
    };
    
    /* initialize persistent game objects here CREATE*************************************************/
    Tienda.prototype.create = function () {
        
        //Crear textos y botones
        
        this.bg='rgba(0,0,0,0.0)';
        
        Game.add.sprite(0,0, 'tienda');
        this.nameLabel = Game.add.text(200, 60, ' Tienda ',{ font: '70px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(0,0,0,1.0)' });
        this.nameLabel.anchor.setTo(0.5, 0.5);
        
        this.move = Game.add.text(20, 20, ' Aumentos de daño: ',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(255,0,0,0.5)' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 150}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.move = Game.add.text(20, 20, 'Espada mellada: ',{ font: '30px MedievalSharp', fill: '#ffffff', backgroundColor:this.bg });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 210}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto1 = Game.add.text(400,210, '  9 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto1.anchor.setTo(0.5, 0.5);
        this.objeto1.inputEnabled = true;
        this.objeto1.precio = 9;
        this.objeto1.nombre='espada1';
        this.objeto1.disponible=Game.global.espada1;
        this.objeto1.events.onInputOver.add(this.verdeRojo, this.objeto1);
        this.objeto1.events.onInputOut.add(this.outInstr, this.objeto1);
        this.objeto1.events.onInputDown.add(this.comprar, this.objeto1);
        
        this.attack = Game.add.text(20, 20, 'Espada de acero:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 260}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto2 = Game.add.text(400,260, '  18 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto2.anchor.setTo(0.5, 0.5);
        this.objeto2.inputEnabled = true;
        this.objeto2.precio = 18;
        this.objeto2.nombre='espada2';
        this.objeto2.disponible=Game.global.espada2;
        this.objeto2.events.onInputOver.add(this.verdeRojo, this.objeto2);
        this.objeto2.events.onInputOut.add(this.outInstr, this.objeto2);
        this.objeto2.events.onInputDown.add(this.comprar, this.objeto2);
        
        this.attack = Game.add.text(20, 20, 'Espada maestra: ',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 310}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 202}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto3 = Game.add.text(400,310, '  40 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto3.anchor.setTo(0.5, 0.5);
        this.objeto3.inputEnabled = true;
        this.objeto3.precio = 40;
        this.objeto3.nombre='espada3';
        this.objeto3.disponible=Game.global.espada3;
        this.objeto3.events.onInputOver.add(this.verdeRojo, this.objeto3);
        this.objeto3.events.onInputOut.add(this.outInstr, this.objeto3);
        this.objeto3.events.onInputDown.add(this.comprar, this.objeto3);
        
        this.move = Game.add.text(20, 580, ' Aumentos de vida: ',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(0,255,0,0.5)' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 375}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 200}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.move = Game.add.text(20, 580, 'Ropa de cuero:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 435}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 192}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto4 = Game.add.text(380,435, '  8 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto4.anchor.setTo(0.5, 0.5);
        this.objeto4.inputEnabled = true;
        this.objeto4.precio = 8;
        this.objeto4.nombre='defensa1';
        this.objeto4.disponible=Game.global.defensa1;
        this.objeto4.events.onInputOver.add(this.verdeRojo, this.objeto4);
        this.objeto4.events.onInputOut.add(this.outInstr, this.objeto4);
        this.objeto4.events.onInputDown.add(this.comprar, this.objeto4);
        
        this.attack = Game.add.text(20, 580, 'Cota  de malla:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 485}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 190}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto5 = Game.add.text(380,485, '  19 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto5.anchor.setTo(0.5, 0.5);
        this.objeto5.inputEnabled = true;
        this.objeto5.precio = 19;
        this.objeto5.nombre='defensa2';
        this.objeto5.disponible=Game.global.defensa2;
        this.objeto5.events.onInputOver.add(this.verdeRojo, this.objeto5);
        this.objeto5.events.onInputOut.add(this.outInstr, this.objeto5);
        this.objeto5.events.onInputDown.add(this.comprar, this.objeto5);
        
        this.attack = Game.add.text(20, 580, 'Traje de kevlar:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 535}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 195}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto6 = Game.add.text(380,535, '  45 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto6.anchor.setTo(0.5, 0.5);
        this.objeto6.inputEnabled = true;
        this.objeto6.precio = 45;
        this.objeto6.nombre='defensa3';
        this.objeto6.disponible=Game.global.defensa3;
        this.objeto6.events.onInputOver.add(this.verdeRojo, this.objeto6);
        this.objeto6.events.onInputOut.add(this.outInstr, this.objeto6);
        this.objeto6.events.onInputDown.add(this.comprar, this.objeto6);
        
        this.move = Game.add.text(980, 20, ' Aumentos de mana: ',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(0,0,255,0.5)' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 150}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 700}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.move = Game.add.text(980, 20, 'Fragmento antiguo:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 210}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 700}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto7 = Game.add.text(910,210, '  7 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto7.anchor.setTo(0.5, 0.5);
        this.objeto7.inputEnabled = true;
        this.objeto7.precio = 7;
        this.objeto7.nombre='pocion1';
        this.objeto7.disponible=Game.global.pocion1;
        this.objeto7.events.onInputOver.add(this.verdeRojo, this.objeto7);
        this.objeto7.events.onInputOut.add(this.outInstr, this.objeto7);
        this.objeto7.events.onInputDown.add(this.comprar, this.objeto7);
        
        this.attack = Game.add.text(980, 20, 'Libro de hechizos:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 260}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 692}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto8 = Game.add.text(900,260, '   15 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto8.anchor.setTo(0.5, 0.5);
        this.objeto8.inputEnabled = true;
        this.objeto8.precio = 15;
        this.objeto8.nombre='pocion2';
        this.objeto8.disponible=Game.global.pocion2;
        this.objeto8.events.onInputOver.add(this.verdeRojo, this.objeto8);
        this.objeto8.events.onInputOut.add(this.outInstr, this.objeto8);
        this.objeto8.events.onInputDown.add(this.comprar, this.objeto8);
        
        this.attack = Game.add.text(980, 20, 'Bastón de poder:',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 310}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 685}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto9 = Game.add.text(898,310, '  38 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto9.anchor.setTo(0.5, 0.5);
        this.objeto9.inputEnabled = true;
        this.objeto9.precio = 38;
        this.objeto9.nombre='pocion3';
        this.objeto9.disponible=Game.global.pocion3;
        this.objeto9.events.onInputOver.add(this.verdeRojo, this.objeto9);
        this.objeto9.events.onInputOut.add(this.outInstr, this.objeto9);
        this.objeto9.events.onInputDown.add(this.comprar, this.objeto9);
        
        this.move = Game.add.text(980, 580, ' Habilidades: ',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(0,255,255,0.5)' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 375}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 630}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.move = Game.add.text(980, 580, 'Estocadas (v):',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.move.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.move).to({y: 435}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.move).to({x: 670}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto10 = Game.add.text(870,435, '  11 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto10.anchor.setTo(0.5, 0.5);
        this.objeto10.inputEnabled = true;
        this.objeto10.precio = 11;
        this.objeto10.nombre='espadas';
        this.objeto10.disponible=Game.global.espadas;
        this.objeto10.events.onInputOver.add(this.verdeRojo, this.objeto10);
        this.objeto10.events.onInputOut.add(this.outInstr, this.objeto10);
        this.objeto10.events.onInputDown.add(this.comprar, this.objeto10);
        
        this.attack = Game.add.text(980, 580, 'Remolino (b):',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 485}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 670}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto11 = Game.add.text(870,485, '  19 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto11.anchor.setTo(0.5, 0.5);
        this.objeto11.inputEnabled = true;
        this.objeto11.precio = 19;
        this.objeto11.nombre='remolino';
        this.objeto11.disponible=Game.global.remolino;
        this.objeto11.events.onInputOver.add(this.verdeRojo, this.objeto11);
        this.objeto11.events.onInputOut.add(this.outInstr, this.objeto11);
        this.objeto11.events.onInputDown.add(this.comprar, this.objeto11);
        
        this.attack = Game.add.text(980, 580, 'Dash (n):',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.attack.anchor.setTo(0.5, 0.5);
        Game.add.tween(this.attack).to({y: 535}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        Game.add.tween(this.attack).to({x: 640}, 1000).easing(Phaser.Easing.Bounce.Out).start();
        
        this.objeto12 = Game.add.text(870,535, '  23 monedas',{ font: '30px MedievalSharp', fill: '#ffffff' });
        this.objeto12.anchor.setTo(0.5, 0.5);
        this.objeto12.inputEnabled = true;
        this.objeto12.precio = 23;
        this.objeto12.nombre='dash';
        this.objeto12.disponible=Game.global.dash;
        this.objeto12.events.onInputOver.add(this.verdeRojo, this.objeto12);
        this.objeto12.events.onInputOut.add(this.outInstr, this.objeto12);
        this.objeto12.events.onInputDown.add(this.comprar, this.objeto12);
        
        this.back = Game.add.text(500,580, ' Atras ',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(0,0,0,1.0)' });
        this.back.anchor.setTo(0.5, 0.5);
        this.back.inputEnabled = true;
        this.back.events.onInputOver.add(this.overInstr, this.back);
        this.back.events.onInputOut.add(this.outInstr, this.back);
        this.back.events.onInputDown.add(this.downInstr, this.back);
        
        
        this.enter=Game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.musica=Game.add.audio('musicaTienda');
        this.musica.loop=true;
        this.musica.play();
        
        this.muteButton = Game.add.button(20, 15, 'mute', this.toggleSound, this);
        this.muteButton.input.useHandCursor = true;
        if (Game.sound.mute) {
            // Change the frame to display the speaker with no sound
            this.muteButton.frame = 1;
        }
        this.fullButton = Game.add.button(950, 10, 'full', this.goFull, this);
        this.fullButton.input.useHandCursor = true;
        this.fullButton.scale.setTo(0.8, 0.8);
        
        this.oroText = Game.add.text(760, 60, 'Oro: '+Math.floor(Game.global.oro)+' monedas',{ font: '40px MedievalSharp', fill: '#ffffff', backgroundColor:'rgba(255,235,0,0.5)'});
        this.oroText.anchor.setTo(0.5, 0.5);
        
        this.a = Game.add.text(370, 20, 'Tienes el producto',{ font: '20px MedievalSharp', fill: '#0000ff', backgroundColor:'rgba(255,255,255,0.5)'});
        this.a = Game.add.text(370, 49, 'Dinero insuficiente',{ font: '20px MedievalSharp', fill: '#ff0000', backgroundColor:'rgba(255,255,255,0.5)'});
        this.a = Game.add.text(370, 78, 'Producto disponible',{ font: '20px MedievalSharp', fill: '#00ff00', backgroundColor:'rgba(255,255,255,0.5)'});
        
        //Game.input.onDown.add(this.goFull, Game);
    };
    
    /* update movements, collisions, score here UPDATE*******************************************************/
    Tienda.prototype.update = function () { 
        this.oroText.setText("Oro: " + Math.floor(Game.global.oro)+' monedas');
    };
    
    Tienda.prototype.overInstr = function (item) { 
        item.fill = "#bdb76b";
    };
    
    Tienda.prototype.outInstr = function (item) { 
        item.fill = "#ffffff";
    };
    
    Tienda.prototype.downInstr = function (item) { 
        Game.state.start('Menu');
    };
    
    Tienda.prototype.comprar = function (item) { 
        if((Game.global.oro-item.precio)>=0){
            if(item.nombre=='espada1' && Game.global.espada1==0){
                console.log('espada1');
                Game.global.espada1=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='espada2' && Game.global.espada2==0){
                console.log('espada2');
                Game.global.espada2=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='espada3' && Game.global.espada3==0){
                console.log('espada3');
                Game.global.espada3=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='pocion1' && Game.global.pocion1==0){
                console.log('pocion1');
                Game.global.pocion1=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='pocion2' && Game.global.pocion2==0){
                console.log('pocion2');
                Game.global.pocion2=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='pocion3' && Game.global.pocion3==0){
                console.log('pocion3');
                Game.global.pocion3=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='defensa1' && Game.global.defensa1==0){
                console.log('defensa1');
                Game.global.defensa1=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='defensa2' && Game.global.defensa2==0){
                console.log('defensa2');
                Game.global.defensa2=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='defensa3' && Game.global.defensa3==0){
                console.log('defensa3');
                Game.global.defensa3=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='remolino' && Game.global.remolino==0){
                console.log('remolino');
                Game.global.remolino=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='espadas' && Game.global.espadas==0){
                console.log('espadas');
                Game.global.espadas=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }else if(item.nombre=='dash' && Game.global.dash==0){
                console.log('dash');
                Game.global.dash=1;
                item.disponible=1;
                Game.global.gastado=Game.global.gastado+item.precio;
                Game.global.oro=Game.global.oro-item.precio;
            }
        }
    };
    
    Tienda.prototype.verdeRojo = function (item) { 
        if((Game.global.oro-item.precio)>=0 && item.disponible==0){
            item.fill = "#00FF00";
        }else if(item.disponible==1){
            item.fill = "#0000FF";
        }else{
            item.fill = "#FF0000";
        }
    };
    
    Tienda.prototype.goFull = function () {
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen();
        }
        else{
            Game.scale.startFullScreen(false);
        }       
     };
    
    Tienda.prototype.toggleSound = function () {
        Game.sound.mute = ! Game.sound.mute;

        if (Game.sound.mute) {
            this.muteButton.frame = 1;
        }
        else {
            this.muteButton.frame = 0;
        }      
     };
    
    Tienda.prototype.shutdown = function () {
        this.musica.stop();   
     };

    
    return Tienda;
});


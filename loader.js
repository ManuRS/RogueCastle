define(['game','states/mazmorra','states/dataLoader','states/menu','states/tienda','states/persecution', 'states/intro', 'states/mas'], function (Game,Mazmorra,DataLoader,Menu,Tienda,Persecution,Intro,Mas) {
    return {
        start: function () {
            Game.state.add('DataLoader', new DataLoader());
            Game.state.add('Menu', new Menu());
            Game.state.add('Tienda', new Tienda());
            Game.state.add('Intro', new Intro());
            Game.state.add('Persecution', new Persecution());
            Game.state.add('Mazmorra', new Mazmorra());
            Game.state.add('Mas', new Mas());
            Game.forceSingleUpdate=true;
            Game.global = {
                nivelMax: 0, //Debe estar a cero en la entrega
                score: 0,
                deads: 0,
                deadsR: 0,
                oro: 0, // A cero
                espada1: 0,
                espada2: 0,
                espada3: 0,
                pocion1: 0,
                pocion2: 0,
                pocion3: 0,
                defensa1: 0,
                defensa2: 0,
                defensa3: 0,
                espadas: 0,
                remolino: 0,
                dash: 0,
                gastado: 0,
                dist: 0,
                //No es necesario almacenar
                videoVisto: 0,
                nivel: 0, 
                vidasAuxRun: 0
            };
            Game.state.start('DataLoader');
        }
    };
});

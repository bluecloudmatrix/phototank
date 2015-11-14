/**
 *
 *
**/
var gameObj = null;

function GogameObj() {	

	var srcObj = {
		ground: "photo/ground.png",
		wall: "photo/wall4.png"
	};
	
	gameObj = {
		initialize: function() {
		    this.map = new cnGame.Map(mapMatrix, { //draw graph
		        cellSize: [8, 8],
				beginX:0,		   
				beginY:0
		    });
		},

        draw: function() {
	
		    this.map.draw({
				"0": {
		            src: srcObj.ground
		        },
		        "2": {
		            src: srcObj.wall
		        }
		    });

		}
	};

	cnGame.init("output", {
		width: 1000,
		height: 640
	});

	cnGame.loader.start(gameObj, {
		srcArray: [srcObj.ground, srcObj.wall]
	});

}

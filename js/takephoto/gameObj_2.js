/**
 *
 *
**/
var gameObj = null;

function GogameObj_2() {	

	var srcObj = {
		ground: "photo/ground.png",
		wall: "photo/wall4.png"
	};
	
	gameObj = {
		initialize: function() {
		    this.map = new cnGame.Map(mapMatrix, { //draw graph
		        cellSize: [4, 4],
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

	cnGame.init("output_2", {
		width: 500,
		height: 320
	});

	cnGame.loader.start(gameObj, {
		srcArray: [srcObj.ground, srcObj.wall]
	});

}

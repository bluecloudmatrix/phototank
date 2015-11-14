/**
 * turn mapMatrix into 3D scene via three.js
 * 2013/7/13
**/
var keyArr;
var bDirection;
var sphere;
var scene;
var dir = 6; 
function to3D() {
	
	var stats;
	//App.video.pause();
	//App.stream.stop();
	$('#scen2').hide();
	$('#scen5').hide();
	$('#scen6').hide();
	$('#cube').hide();
	$('#fff').hide();
	$('#scen7').fadeIn();
	var bullet;
	
	var camera;
	bDirection = new Array();
	var keepDirection = new Array();
	
	function InitCamera(){
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
		//camera.position.x = 0;
		//camera.position.z = 0;
		camera.position.x = 100;
		camera.position.z = -100;
		camera.position.y = 50;
		camera.lookAt( {x:500, y:0, z:100 } );
	}

	function InitScene(){
		//scene = new THREE.Scene();
		scene = new THREE.Scene();
	}
	
	
	function InitSphere(){
		sphere = new THREE.Mesh(
			new THREE.SphereGeometry(5, 16, 16),
			new THREE.MeshLambertMaterial({color: 0xff0000})
		);
		
		sphere.position.x = 500;
		sphere.position.z = 100;
		sphere.position.y = 0;
		//scene.add(sphere);
	}
		
	var boom;
	function InitBullet(){
		bullet = new THREE.Object3D();
		
		var hand1 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand1.position.x = -1;
		hand1.position.y = 0;
		hand1.position.z = 0;
		bullet.add(hand1);
		
		var hand2 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand2.position.x = 1;
		hand2.position.y = 0;
		hand2.position.z = 0;
		bullet.add(hand2);
		
		var hand3 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand3.position.x = 0;
		hand3.position.y = 1;
		hand3.position.z = 0;
		bullet.add(hand3);
		
		var finger1 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger1.position.x = -1.2;
		finger1.position.y = 4.1;
		finger1.position.z = 0;
		bullet.add(finger1);
		
		var finger2 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger2.position.x = 1.2;
		finger2.position.y = 4.1;
		finger2.position.z = 0;
		bullet.add(finger2);
		
		var finger3 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger3.position.x = 3.1;
		finger3.position.y = 2.5;
		finger3.position.z = 0;
		bullet.add(finger3);
		
		var finger4 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger4.position.x = -3.1;
		finger4.position.y = 2.5;
		finger4.position.z = 0;
		bullet.add(finger4);
		
		bDirection[0] = 0;
		bDirection[1] = 0;
		bDirection[2] = 0;
		bDirection[3] = 0;
		boom = 0;
	}
	
	var light;
	function InitLight() { 
		light = new THREE.DirectionalLight(0x9fcef4, 1.0, 0);
		light.position.set(10, 300, -130);
		light.intensity = 2;
		light.castShadow = true;		//鍚敤闃村奖
		scene.add(light);	
	}

	var floor;
	function InitFloor(){
		var textureFloor = new THREE.ImageUtils.loadTexture('images/gameView/maps/floor_skin.png');				
	for (var i = 0; i < 20; i++){
		for (var j = 0; j < 20; j++) {				
			var floor = new THREE.Mesh(
				//new THREE.PlaneGeometry(200, 200), 
				new THREE.PlaneGeometry(200, 200), 
				new THREE.MeshBasicMaterial({map: textureFloor})//the wooden
				//new THREE.MeshLambertMaterial({map: textureFloor, color: 0x00fffc})
			);
			floor.position.y = -5;
			//floor.position.x = (j-10) * 200;
			floor.position.x = (j-10) * 200;
			//floor.position.z = (i-10) * 200;
			floor.position.z = (i-10) * 200;
			floor.receiveShadow = true;		
			scene.add(floor);				
		}
	}
	}
	
	var blocks;
	function InitBlocks(){
		var bMat = new THREE.MeshPhongMaterial({
			color: 0xFFFFFF
		});

		blocks = new Array();
		console.log(threeDHeight);
		console.log(threeDWidth);
		for (var i = 0; i < threeDHeight; i++)
			for (var j = 0; j < threeDWidth; j++) {
				if (mapMatrix[i][j] == 2) {
					//console.log("a");
					var b1 = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), bMat);
					b1.position.y = 0;
					b1.position.x = i * 10;
					b1.position.z = j * 10;
					b1.receiveShadow = true;
					b1.castShadow = true;
					scene.add(b1);
					blocks[i*threeDHeight + j] = b1; 
				}
			}
	}
	
	function InitRender(){
		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		document.body.appendChild(renderer.domElement);
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		document.body.appendChild( stats.domElement );
		THREEx.WindowResize(renderer, camera);
		THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	}
	
	
	keyArr = new Array();
	
	/*function moveBall(event) {
		accel_x =  Math.sin(event.gamma / 180 * Math.PI); //right-->accel_x>0
		accel_y =  Math.sin(event.beta  / 180 * Math.PI); //up-->accel_y<0
		if(accel_x > 0) { //right
			keyArr[37] = 0;	
			keyArr[39] = 1;
			bDirection[0] = 1;
			bDirection[1] = 0;
			bDirection[2] = 0;
			bDirection[3] = 0;
		} else if(accel_x < 0) { //left
			keyArr[39] = 0;
			keyArr[37] = 1;			
			bDirection[0] = 0;
			bDirection[1] = 1;
			bDirection[2] = 0;
			bDirection[3] = 0;
		}
		
		if(accel_y < 0) { //right
			keyArr[40] = 0;
			keyArr[38] = 1;	
			bDirection[0] = 0;
			bDirection[1] = 0;
			bDirection[2] = 1;
			bDirection[3] = 0;
		} else if(accel_y > 0) { //down
			keyArr[38] = 0;
			keyArr[40] = 1;
			bDirection[0] = 0;
			bDirection[1] = 0;
			bDirection[2] = 0;
			bDirection[3] = 1;
		}
		
	}*/

	/*document.onkeydown=function(e){
		var e = event || window.event;     
		var keycode = e.which ? e.which : e.keyCode;
		if(keycode == 37){//left
			keyArr[37] = 1;			
			bDirection[0] = 0;
			bDirection[1] = 1;
			bDirection[2] = 0;
			bDirection[3] = 0;
			
		}else if(keycode == 39){//right
			keyArr[39] = 1;
			
			bDirection[0] = 1;
			bDirection[1] = 0;
			bDirection[2] = 0;
			bDirection[3] = 0;
			
		}else if(keycode == 38){//up
			keyArr[38] = 1;
			
			bDirection[0] = 0;
			bDirection[1] = 0;
			bDirection[2] = 1;
			bDirection[3] = 0;
			
		}else if(keycode == 40){//down
			keyArr[40] = 1;

			bDirection[0] = 0;
			bDirection[1] = 0;
			bDirection[2] = 0;
			bDirection[3] = 1;
				
		}else 
		if(keycode == 87){//w
			boom = 1;
			keyArr[87] = 1;
		}else if(keycode == 83){//s
			keyArr[83] = 1;
		}else if(keycode == 65){//a			
			keyArr[65] = 1;
		}else if(keycode == 68){//d
			keyArr[68] = 1;
		}
	}
	
	document.onkeyup=function(e){
		var e = event || window.event;     
		var keycode = e.which ? e.which : e.keyCode;
		
		if(keycode == 37){//left
			keyArr[37] = 0;
		}else if(keycode == 39){//right
			keyArr[39] = 0;
		}else if(keycode == 38){//up
			keyArr[38] = 0;
		}else if(keycode == 40){//down
			keyArr[40] = 0;
		}else 
		if(keycode == 87){//w
			keyArr[87] = 0;
			//bDirection[0] = 0;
		}else if(keycode == 83){//s
			keyArr[83] = 0;
		}else if(keycode == 65){//a			
			keyArr[65] = 0;
		}else if(keycode == 68){//d
			keyArr[68] = 0;
		}
	}*/
	
	var nextX;
	var nextZ;
	function HandleKey(){
		if(keyArr[38]){ //up
			nextX = sphere.position.x;
			nextZ = sphere.position.z + 1;
			//纰版挒妫�祴锛侊紒锛侊紒
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ+9)/10)] == 0 && mapMatrix[Math.ceil(nextX/10)][parseInt((nextZ+9)/10)] == 0){	
				
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
				
			}else{
				
			}
			camera.position.x = sphere.position.x ;
			camera.position.z = sphere.position.z - 100;
			camera.lookAt( {x:sphere.position.x, y:0, z:sphere.position.z } );
			
			/*********************/
			if(dir == 7){
				console.log("down up");
				scene.remove(tank2);
				scene.add(tank1);
				dir = 6;
			}else if(dir == 8){
				console.log("left up");
				scene.remove(tank3);
				scene.add(tank1);
				dir = 6;
			}else if(dir == 9){
				console.log("right up");
				scene.remove(tank4);
				scene.add(tank1);
				dir = 6;
			}
			for(i = 0; i < 10; i++){
				wheelArr1[i].rotation.set(t/10, 0, 0);
			}
			
			tank1.position.x = sphere.position.x;
			tank1.position.y = sphere.position.y;
			tank1.position.z = sphere.position.z;
			tank2.position.x = sphere.position.x;
			tank2.position.y = sphere.position.y;
			tank2.position.z = sphere.position.z;
			tank3.position.x = sphere.position.x;
			tank3.position.y = sphere.position.y;
			tank3.position.z = sphere.position.z;
			tank4.position.x = sphere.position.x;
			tank4.position.y = sphere.position.y;
			tank4.position.z = sphere.position.z;
			/*********************/
			
		}
		if(keyArr[40]){ //down
			nextX = sphere.position.x;
			nextZ = sphere.position.z - 1;
					
			//纰版挒妫�祴锛侊紒锛侊紒 
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ)/10)] == 0 && mapMatrix[Math.ceil((nextX)/10)][parseInt((nextZ)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
				
			}
		
			camera.position.x = sphere.position.x ;
			camera.position.z = sphere.position.z - 100;
			camera.lookAt( {x:sphere.position.x, y:0, z:sphere.position.z } );

			if(dir == 6){
				console.log("up down");				
				scene.remove(tank1);
				scene.add(tank2);
				dir = 7;
			}else if(dir == 8){
				console.log("left down");
				scene.remove(tank3);
				scene.add(tank2);
				dir = 7;
			}else if(dir == 9){
				console.log("right down");
				scene.remove(tank4);
				scene.add(tank2);
				dir = 7;
			}
			for(i = 0; i < 10; i++){
				wheelArr2[i].rotation.set(-t/10, 0, 0);
			}
			
			tank1.position.x = sphere.position.x;
			tank1.position.y = sphere.position.y;
			tank1.position.z = sphere.position.z;	
			tank2.position.x = sphere.position.x;
			tank2.position.y = sphere.position.y;
			tank2.position.z = sphere.position.z;	
			tank3.position.x = sphere.position.x;
			tank3.position.y = sphere.position.y;
			tank3.position.z = sphere.position.z;
			tank4.position.x = sphere.position.x;
			tank4.position.y = sphere.position.y;
			tank4.position.z = sphere.position.z;
		}		
		if(keyArr[37]){ //left
			nextX = sphere.position.x + 1;
			nextZ = sphere.position.z;
	
			//纰版挒妫�祴锛侊紒锛侊紒 
			if(mapMatrix[Math.ceil(nextX/10)][parseInt((nextZ)/10)] == 0 && mapMatrix[Math.ceil((nextX)/10)][parseInt((nextZ+9)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
			}
			camera.position.x = sphere.position.x ;
			camera.position.z = sphere.position.z - 100;
			camera.lookAt( {x:sphere.position.x, y:0, z:sphere.position.z } );
			
			if(dir == 6){
				console.log("up left");
				scene.remove(tank1);
				scene.add(tank3);
				dir = 8;
			}else if(dir == 7){
				console.log("down left");
				scene.remove(tank2);
				scene.add(tank3);
				dir = 8;
			}else if(dir == 9){
				console.log("right left");
				scene.remove(tank4);
				scene.add(tank3);
				dir = 8;
			}
			for(i = 0; i < 10; i++){
				wheelArr3[i].rotation.set(0, 0, -t/10);
			}
			
			tank1.position.x = sphere.position.x;
			tank1.position.y = sphere.position.y;
			tank1.position.z = sphere.position.z;
			tank2.position.x = sphere.position.x;
			tank2.position.y = sphere.position.y;
			tank2.position.z = sphere.position.z;
			tank3.position.x = sphere.position.x;
			tank3.position.y = sphere.position.y;
			tank3.position.z = sphere.position.z;
			tank4.position.x = sphere.position.x;
			tank4.position.y = sphere.position.y;
			tank4.position.z = sphere.position.z;
		}
			
		if(keyArr[39]){ //right
			nextX = sphere.position.x - 1;
			nextZ = sphere.position.z;
			//纰版挒妫�祴锛侊紒锛侊紒 
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ+9)/10)] == 0 && mapMatrix[parseInt((nextX)/10)][parseInt((nextZ)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
			}
			camera.position.x = sphere.position.x ;
			camera.position.z = sphere.position.z - 100;
			camera.lookAt( {x:sphere.position.x, y:0, z:sphere.position.z } );
			
			if(dir == 6){
				console.log("up right");
				scene.remove(tank1);
				scene.add(tank4);
				dir = 9;
			}else if(dir == 7){
				console.log("down right");
				scene.remove(tank2);
				scene.add(tank4);
				dir = 9;
			}else if(dir == 8){
				console.log("left right");
				scene.remove(tank3);
				scene.add(tank4);
				dir = 9;
			}
			for(i = 0; i < 10; i++){
				wheelArr4[i].rotation.set(0, 0, t/10);
			}
			
			tank1.position.x = sphere.position.x;
			tank1.position.y = sphere.position.y;
			tank1.position.z = sphere.position.z;			
			tank2.position.x = sphere.position.x;
			tank2.position.y = sphere.position.y;
			tank2.position.z = sphere.position.z;
			tank3.position.x = sphere.position.x;
			tank3.position.y = sphere.position.y;
			tank3.position.z = sphere.position.z;			
			tank4.position.x = sphere.position.x;
			tank4.position.y = sphere.position.y;
			tank4.position.z = sphere.position.z;
		}
		
		if(keyArr[87]){
			bullet.position.x = sphere.position.x;
			bullet.position.z = sphere.position.z;
			bullet.position.y = sphere.position.y;
			keepDirection[0] = bDirection[0];
			keepDirection[1] = bDirection[1];
			keepDirection[2] = bDirection[2];
			keepDirection[3] = bDirection[3];
			scene.add(bullet);
		}		
	}

	/*
	 * 0 --> right
	 * 1 --> left
	 * 2 --> up
	 * 3 --> down
	*/ 
	var t = 0;
	function BulletRun(){
	
		if(boom == 1){
			if(keepDirection[0] == 1){
				t++;
				if(t <= 300){
					bullet.position.x--;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet);
				}
			}else if(keepDirection[1] == 1){
				t++;
				if(t <= 300){
					bullet.position.x++;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet);
				}
			}else if(keepDirection[2] == 1){
				t++;
				if(t <= 300){
					bullet.position.z++;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet);
				}
			}else if(keepDirection[3] == 1){
				t++;
				if(t <= 300){
					bullet.position.z--;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet);
				}
			}
		}
	}
	
	function Boom(){
		boom = 0;
		t = 0;
		scene.remove(bullet);
		scene.remove(blocks[(parseInt((bullet.position.x)/10))*threeDHeight + (parseInt((bullet.position.z)/10))]);
		scene.remove(blocks[(parseInt((bullet.position.x+9)/10))*threeDHeight + (parseInt((bullet.position.z)/10))]);
		mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z)/10))] = 0;
		mapMatrix[(parseInt((bullet.position.x+9)/10))][(parseInt((bullet.position.z)/10))] = 0;
	}
	
	function Boom2(){
		boom = 0;
		t = 0;
		scene.remove(bullet);
		scene.remove(blocks[(parseInt((bullet.position.x)/10))*threeDHeight + (parseInt((bullet.position.z)/10))]);
		scene.remove(blocks[(parseInt((bullet.position.x)/10))*threeDHeight + (parseInt((bullet.position.z+9)/10))]);
		mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z)/10))] = 0;
		mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z+9)/10))] = 0;
	}
	function animate() {
		
		stats.update();
		
		if(keepDirection[2] == 1 || keepDirection[3] == 1){
			if(mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z)/10))] == 2
			|| mapMatrix[(parseInt((bullet.position.x+9)/10))][(parseInt((bullet.position.z)/10))] == 2 ){
				Boom();
			}
		}else if(keepDirection[0] == 1 || keepDirection[1] == 1){
			if(mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z)/10))] == 2
			|| mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z + 9)/10))] == 2 ){
				Boom2();
			}
		}

		BulletRun();
		HandleKey();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}
	
	function start(){
		//alert("welcome to 3d!");
		InitCamera();
		InitScene();
		InitBullet();
		InitSphere();
		InitTank();
		InitLight();	
		InitFloor();
		InitBlocks();
		InitRender();
		//window.addEventListener('deviceorientation', moveBall, true);
		
		var videoInput = document.createElement('video');
		var overlay = control.getContext('2d');		
		document.addEventListener("facetrackingEvent", function( event ) {
			if (event.detection == "CS") {		
				overlay.beginPath();
                overlay.arc(event.x, event.y+10, event.width*0.1, 0, Math.PI * 2, true);
                overlay.closePath();
				overlay.fillStyle = "#FF0000";
                overlay.fill();
				overlay.translate(event.x, event.y)
				overlay.rotate(event.angle-(Math.PI/2));
				overlay.strokeStyle = "#00CC00";
				overlay.strokeRect((-(event.width/2)) >> 0, (-(event.height/2)) >> 0, event.width, event.height);
				overlay.rotate((Math.PI/2)-event.angle);
				overlay.translate(-event.x, -event.y);
				GAMEVIEW.faceControl.faceTriggerThird(event.x, event.y);	
			}		
		});
		htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, calcAngles : true, ui : false, headPosition : false, debug : false});
		htracker.init(videoInput, control); 
		htracker.start();
		
		animate();
	}
	start();
}
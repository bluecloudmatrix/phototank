/**
 * turn mapMatrix into 3D scene via three.js
 * 2013/7/13
**/
var sphere;
var scene;
var dir = 6; 
var boom;
var usingBullet = 0;
var camera;
var view = 1;
var bullet, bullet2;
var bDirection = new Array();
var keepDirection = new Array();

var enemy;

var date1, date2, date3;
var booms = 0;
var score;
function to3D_2() {
	//App.video.pause();
	//App.stream.stop();
	$('#scen2').hide();
	$('#scen5').hide();
	$('#scen6').hide();
	$('#scen7').hide();
	$('#cube').hide();
	$('#fff').hide();
	$('#imageSource').hide();
	$('#bbg1').show();
	$('#bbg2').show();
	$('#eye').show();
	$('#aim').show();
	$('#reload').show();
	
	
	function InitCamera(){
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
		//camera.position.x = 0;
		//camera.position.z = 0;
		camera.position.x = sphere.position.x ;
		camera.position.z = sphere.position.z - 100;
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
	
	function InitEnemy(){
		texture1 = new THREE.ImageUtils.loadTexture('images/gameView/enemy.png');
		enemy = new THREE.Object3D();
		
		var down = new THREE.Mesh(
			new THREE.SphereGeometry(5, 16, 16), 
			new THREE.MeshLambertMaterial({map: texture1})
		);
		down.position.x = 0;
		down.position.z = 0;
		down.position.y = -10;
		enemy.add(down);
		
		var midCol = new THREE.Mesh(
			new THREE.CubeGeometry(2, 10, 2),
			new THREE.MeshLambertMaterial({map: texture1})
		);
		midCol.position.x = 0;
		midCol.position.z = 0;
		midCol.position.y = 0;
		enemy.add(midCol);
		
		var upSphere = new THREE.Mesh(
			new THREE.SphereGeometry(5, 10, 10),
			new THREE.MeshLambertMaterial({map: texture1})
		);
		upSphere.position.x = 0;
		upSphere.position.z = 0;
		upSphere.position.y = 10;
		enemy.add(upSphere);
		
		enemy.position.x = 700;
		enemy.position.z = 500;
		enemy.position.y = 0;
		scene.add(enemy);
	}

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
		
		bullet2 = new THREE.Object3D();		
		var hand2_1 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand2_1.position.x = 0;
		hand2_1.position.y = 0;
		hand2_1.position.z = -1;
		bullet2.add(hand2_1);
		
		var hand2_2 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand2_2.position.x = 0;
		hand2_2.position.y = 0;
		hand2_2.position.z = 1;
		bullet2.add(hand2_2);
		
		var hand2_3 = new THREE.Mesh(
			new THREE.SphereGeometry(2,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		hand2_3.position.x = 0;
		hand2_3.position.y = 1;
		hand2_3.position.z = 0;
		bullet2.add(hand2_3);
		
		var finger2_1 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger2_1.position.x = 0;
		finger2_1.position.y = 4.1;
		finger2_1.position.z = -1.2;
		bullet2.add(finger2_1);
		
		var finger2_2 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger2_2.position.x = 0;
		finger2_2.position.y = 4.1;
		finger2_2.position.z = 1.2;
		bullet2.add(finger2_2);
		
		var finger2_3 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger2_3.position.x = 0;
		finger2_3.position.y = 2.5;
		finger2_3.position.z = 3.1;
		bullet2.add(finger2_3);
		
		var finger2_4 = new THREE.Mesh(
			new THREE.SphereGeometry(1,10,10),
			new THREE.MeshLambertMaterial({color: 0x0000ff})
		);
		finger2_4.position.x = 0;
		finger2_4.position.y = 2.5;
		finger2_4.position.z = -3.1;
		bullet2.add(finger2_4);
		
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
		light.castShadow = true;		//启用阴影
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
					console.log("a");
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
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		document.body.appendChild(renderer.domElement);
	}
	
	var keyArr;
	keyArr = new Array();
	
	document.onkeydown=function(e){
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
	}
	
	var nextX;
	var nextZ;
	function HandleKey(){
		if(keyArr[38]){ //up
			nextX = sphere.position.x;
			nextZ = sphere.position.z + 1;
			//碰撞检测！！！！
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ+9)/10)] == 0 && mapMatrix[Math.ceil(nextX/10)][parseInt((nextZ+9)/10)] == 0){	
				
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
				
			}else{
				
			}
			if(view == 1){
				camera.position.x = sphere.position.x ;
				camera.position.z = sphere.position.z - 100;
				camera.position.y = 50;
				camera.lookAt( {x:sphere.position.x, y:sphere.position.y, z:sphere.position.z } );
			}else if(view == 2){
				camera.position.x = sphere.position.x;
				camera.position.z = sphere.position.z-1;
				camera.position.y = 250;
				camera.lookAt({x:sphere.position.x, y:0, z:sphere.position.z});		
			}			
			
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
					
			//碰撞检测！！！！ 
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ)/10)] == 0 && mapMatrix[Math.ceil((nextX)/10)][parseInt((nextZ)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
				
			}
		
			if(view == 1){
				camera.position.x = sphere.position.x ;
				camera.position.z = sphere.position.z - 100;
				camera.position.y = 50;
				camera.lookAt( {x:sphere.position.x, y:sphere.position.y, z:sphere.position.z } );
			}else if(view == 2){
				camera.position.x = sphere.position.x;
				camera.position.z = sphere.position.z-1;
				camera.position.y = 250;
				camera.lookAt({x:sphere.position.x, y:0, z:sphere.position.z});		
			}	

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
	
			//碰撞检测！！！！ 
			if(mapMatrix[Math.ceil(nextX/10)][parseInt((nextZ)/10)] == 0 && mapMatrix[Math.ceil((nextX)/10)][parseInt((nextZ+9)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
			}
			if(view == 1){
				camera.position.x = sphere.position.x ;
				camera.position.z = sphere.position.z - 100;
				camera.position.y = 50;
				camera.lookAt( {x:sphere.position.x, y:sphere.position.y, z:sphere.position.z } );
			}else if(view == 2){
				camera.position.x = sphere.position.x;
				camera.position.z = sphere.position.z-1;
				camera.position.y = 250;
				camera.lookAt({x:sphere.position.x, y:0, z:sphere.position.z});		
			}	
			
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
			//碰撞检测！！！！ 
			if(mapMatrix[parseInt(nextX/10)][parseInt((nextZ+9)/10)] == 0 && mapMatrix[parseInt((nextX)/10)][parseInt((nextZ)/10)] == 0){
				sphere.position.x = nextX;
				sphere.position.z = nextZ;
			}else{
			}
			if(view == 1){
				camera.position.x = sphere.position.x ;
				camera.position.z = sphere.position.z - 100;
				camera.position.y = 50;
				camera.lookAt( {x:sphere.position.x, y:sphere.position.y, z:sphere.position.z } );
			}else if(view == 2){
				camera.position.x = sphere.position.x;
				camera.position.z = sphere.position.z-1;
				camera.position.y = 250;
				camera.lookAt({x:sphere.position.x, y:0, z:sphere.position.z});		
			}	
			
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
			if(dir == 6 || dir == 7){
				bullet.position.x = sphere.position.x;
				bullet.position.z = sphere.position.z;
				bullet.position.y = sphere.position.y;
				if(usingBullet == 2){
					scene.remove(bullet2);
				}
				scene.add(bullet);
				usingBullet = 1;
			}else{
				bullet2.position.x = sphere.position.x;
				bullet2.position.z = sphere.position.z;
				bullet2.position.y = sphere.position.y;			
				scene.add(bullet2);
				if(usingBullet == 1){
					scene.remove(bullet);
				}
				usingBullet = 2;
			}
			keepDirection[2] = bDirection[2];
			keepDirection[3] = bDirection[3];
			keepDirection[0] = bDirection[0];
			keepDirection[1] = bDirection[1];
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
			console.log("boom!");
			if(keepDirection[0] == 1){
				console.log("keepD0 = 1");
				t++;
				if(t <= 300){
					bullet2.position.x-=3;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet2);
				}
			}else if(keepDirection[1] == 1){
				console.log("keepD1 = 1");
				t++;
				if(t <= 300){
					bullet2.position.x+=3;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet2);
				}
			}else if(keepDirection[2] == 1){
				console.log("keepD2 = 1");
				t++;
				if(t <= 300){
					bullet.position.z+=3;
				}else{
					t = 0;
					boom = 0;
					scene.remove(bullet);
				}
			}else if(keepDirection[3] == 1){
				console.log("keepD3 = 1");
				t++;
				if(t <= 300){
					bullet.position.z-=3;
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
		booms++;
		scene.remove(bullet);
		scene.remove(blocks[(parseInt((bullet.position.x)/10))*threeDHeight + (parseInt((bullet.position.z)/10))]);
		scene.remove(blocks[(parseInt((bullet.position.x+9)/10))*threeDHeight + (parseInt((bullet.position.z)/10))]);
		mapMatrix[(parseInt((bullet.position.x)/10))][(parseInt((bullet.position.z)/10))] = 0;
		mapMatrix[(parseInt((bullet.position.x+9)/10))][(parseInt((bullet.position.z)/10))] = 0;
		keepDirection[0] = 0;
		keepDirection[1] = 0;
		keepDirection[2] = 0;
		keepDirection[3] = 0;
	}
	
	function Boom2(){
		boom = 0;
		t = 0;
		booms++;
		scene.remove(bullet2);
		scene.remove(blocks[(parseInt((bullet2.position.x)/10))*threeDHeight + (parseInt((bullet2.position.z)/10))]);
		scene.remove(blocks[(parseInt((bullet2.position.x)/10))*threeDHeight + (parseInt((bullet2.position.z+9)/10))]);
		mapMatrix[(parseInt((bullet2.position.x)/10))][(parseInt((bullet2.position.z)/10))] = 0;
		mapMatrix[(parseInt((bullet2.position.x)/10))][(parseInt((bullet2.position.z+9)/10))] = 0;
		keepDirection[0] = 0;
		keepDirection[1] = 0;
		keepDirection[2] = 0;
		keepDirection[3] = 0;
	}
	
	var enemyDir = 0;
	var step = 0;
	/*
	 * 0 --> right
	 * 1 --> left
	 * 2 --> up
	 * 3 --> down
	*/ 
	function EnemyMove(time){
		if(step <= 200){
			if(enemyDir==0){//right
				enemy.rotation.set(0, 0, t/10);
				enemy.position.x--;
				step++;
			}else if(enemyDir==1){//left
				enemy.rotation.set(0, 0, -t/10);
				enemy.position.x++;
				step++;
			}else if(enemyDir==2){//up
				enemy.rotation.set(t/10, 0, 0);
				enemy.position.z++;
				step++;
			}else{//down
				enemy.rotation.set(-t/10, 0, 0);
				enemy.position.z--;
				step++;
			}
		}else{
			enemyDir = parseInt(4*Math.random())-1;
			step = 0;
		}
	}
	var t = 0;
	function animate() {
		t++;
		if(Math.sqrt((sphere.position.x-enemy.position.x)*(sphere.position.x-enemy.position.x)+(sphere.position.z-enemy.position.z)*(sphere.position.z-enemy.position.z)) <= 16){
			alert("Over!");
			window.location.href="index.html";
		}
	
	
	
		var bx = (parseInt((bullet.position.x)/10));
		var bx2 =(parseInt((bullet.position.x+9)/10));
		var bz = (parseInt((bullet.position.z)/10));
		
		var b2x = (parseInt((bullet2.position.x)/10));
		var b2z = (parseInt((bullet2.position.z)/10));
		var b2z2 = (parseInt((bullet2.position.z + 9)/10));
		
		if(keepDirection[2] == 1 || keepDirection[3] == 1){
			if(mapMatrix[bx][bz] == 2
			|| mapMatrix[bx2][bz] == 2 ){
				Boom();
			}
		}else if(keepDirection[0] == 1 || keepDirection[1] == 1){
			if(mapMatrix[b2x][b2z] == 2
			|| mapMatrix[b2x][b2z2] == 2 ){
				Boom2();
			}
		}
		if(Math.sqrt((bullet.position.x-enemy.position.x)*(bullet.position.x-enemy.position.x)+(bullet.position.z-enemy.position.z)*(bullet.position.z-enemy.position.z)) <= 32
		){
			date2 = new Date();
			date3 = date2.getTime()-date1.getTime();
			score = date3 + booms * 10000;
			scene.remove(enemy);
			alert("所用时间--" + date3 + "ms 爆破次数--" + booms + "次");
			if(score <= 30000){
				alert("S");
			}else if(score >30000 && score <= 100000){
				alert("A");
			}else if(score > 100000 && score < 200000){
				alert("B");
			}else{
				alert("C");
			}
			window.location.href="index.html";
		}
		if(Math.sqrt((bullet2.position.x-enemy.position.x)*(bullet2.position.x-enemy.position.x)+(bullet2.position.z-enemy.position.z)*(bullet2.position.z-enemy.position.z)) <= 16
		){
			date2 = new Date();
			date3 = date2.getTime()-date1.getTime();
			score = date3 + booms * 10000;
			scene.remove(enemy);
			alert("所用时间--" + date3 + "ms 爆破次数--" + booms + "次");
			if(score <= 30000){
				alert("S");
			}else if(score >30000 && score <= 100000){
				alert("A");
			}else if(score > 100000 && score < 200000){
				alert("B");
			}else{
				alert("C");
			}
			window.location.href="index.html";
		}
		EnemyMove(t);
		BulletRun();
		HandleKey();
		renderer.render(scene, camera);
		window.requestAnimationFrame(animate);
	}
	
	function start(){
		InitSphere();
		InitCamera();
		InitScene();
		InitBullet();		
		InitTank();
		InitLight();	
		InitFloor();
		InitBlocks();
		InitEnemy();
		InitRender();
		date1 = new Date();
		animate();
	}
	start();
}
function changeView(){
	if(view == 1){
		camera.position.x = sphere.position.x;
		camera.position.z = sphere.position.z-1;
		camera.position.y = 250;
		camera.lookAt({x:sphere.position.x, y:0, z:sphere.position.z});
		view = 2;
	}else if(view == 2){
		camera.position.x = sphere.position.x ;
		camera.position.z = sphere.position.z - 100;
		camera.position.y = 50;
		camera.lookAt( {x:sphere.position.x, y:sphere.position.y, z:sphere.position.z } );
		view = 1;
	}
}
function shoot(){
	boom = 1;
	if(dir == 6 || dir == 7){
		bullet.position.x = sphere.position.x;
		bullet.position.z = sphere.position.z;
		bullet.position.y = sphere.position.y;
		if(usingBullet == 2){
			scene.remove(bullet2);
		}
		scene.add(bullet);
		usingBullet = 1;
	}else{
		bullet2.position.x = sphere.position.x;
		bullet2.position.z = sphere.position.z;
		bullet2.position.y = sphere.position.y;
		if(usingBullet == 1){
			scene.remove(bullet);
		}
		scene.add(bullet2);
		usingBullet = 2;
	}
	keepDirection[2] = bDirection[2];
	keepDirection[3] = bDirection[3];
	keepDirection[0] = bDirection[0];
	keepDirection[1] = bDirection[1];
}		

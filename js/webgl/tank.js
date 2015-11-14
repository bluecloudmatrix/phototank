var tank1, tank2, tank3, tank4;
var wheelArr1 = new Array(10);
var wheelArr2 = new Array(10);
var wheelArr3 = new Array(10);
var wheelArr4 = new Array(10);
function InitTank(){
	var texture = new THREE.ImageUtils.loadTexture('images/gameView/maps/texture.png');
	var texture2 = new THREE.ImageUtils.loadTexture('images/gameView/maps/wheel.png');
	tank1 = new THREE.Object3D();	
	tank1.position.x = sphere.position.x;
	tank1.position.z = sphere.position.z;
	tank1.position.y = 0;
	
	var wheels = new THREE.Mesh(
		new THREE.CubeGeometry(8,2,10),
		new THREE.MeshLambertMaterial({map: texture})
	);
	wheels.position.x = 0;
	wheels.position.z = 2;
	wheels.position.y = 0;
	
	for(i = 0; i < 10; i++){
		var wheel = new THREE.Mesh(
			new THREE.SphereGeometry(1, 16, 16), 
			new THREE.MeshLambertMaterial({map: texture2})
		);
		wheel.position.y = 0;
		
		if(i > 4){
			wheel.position.x = -4;
			wheel.position.z = 5 - 2*(i-5) + 1;
		}else{
			wheel.position.x = 4;
			wheel.position.z = 5 - 2*i + 1;
		}
		tank1.add(wheel);
		wheelArr1[i] = wheel;
	}
	
	var box1 = new THREE.Mesh(
		new THREE.CubeGeometry(5,2,5),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box1.position.x = 0;
	box1.position.z = 0;
	box1.position.y = 2;
	
	var box2 = new THREE.Mesh(
		new THREE.CubeGeometry(3,2,1),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box2.position.x = 0;
	box2.position.z = 3;
	box2.position.y = 2;
	
	var gun = new THREE.Mesh(
		new THREE.CubeGeometry(1,1,6),
		new THREE.MeshLambertMaterial({map: texture})
	);
	gun.position.x = 0;
	gun.position.y = 2;
	gun.position.z = 4;
		
	tank1.castShadow = true;
	tank1.add(wheels);
	tank1.add(box1);
	tank1.add(box2);
	tank1.add(gun);
	scene.add(tank1);
	
	//the tank facing down
	tank2 = new THREE.Object3D();	
	tank2.position.x = sphere.position.x;
	tank2.position.z = sphere.position.z;
	tank2.position.y = 0;
	
	wheels2 = new THREE.Mesh(
		new THREE.CubeGeometry(8,2,10),
		new THREE.MeshLambertMaterial({map: texture})
	);
	wheels2.position.x = 0;
	wheels2.position.z = 2;
	wheels2.position.y = 0;
	
	for(i = 0; i < 10; i++){
		var wheel2 = new THREE.Mesh(
			new THREE.SphereGeometry(1, 16, 16), 
			new THREE.MeshLambertMaterial({map: texture2})
		);
		wheel2.position.y = 0;
		
		if(i > 4){
			wheel2.position.x = -4;
			wheel2.position.z = 5 - 2*(i-5) + 1;
		}else{
			wheel2.position.x = 4;
			wheel2.position.z = 5 - 2*i + 1;
		}
		tank2.add(wheel2);
		wheelArr2[i] = wheel2;
	}
	
	var box2_1 = new THREE.Mesh(
		new THREE.CubeGeometry(5,2,5),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box2_1.position.x = 0;
	box2_1.position.z = 0;
	box2_1.position.y = 2;
	
	box2_2 = new THREE.Mesh(
		new THREE.CubeGeometry(3,2,1),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box2_2.position.x = 0;
	box2_2.position.z = -3;
	box2_2.position.y = 2;
	
	var gun2 = new THREE.Mesh(
		new THREE.CubeGeometry(1,1,6),
		new THREE.MeshLambertMaterial({map: texture})
	);
	gun2.position.x = 0;
	gun2.position.y = 2;
	gun2.position.z = -4;
		
	tank2.castShadow = true;
	tank2.add(wheels2);
	tank2.add(box2_1);
	tank2.add(box2_2);
	tank2.add(gun2);
	
	//the tank facing left
	tank3 = new THREE.Object3D();	
	tank3.position.x = sphere.position.x;
	tank3.position.z = sphere.position.z;
	tank3.position.y = 0;
	
	wheels3 = new THREE.Mesh(
		new THREE.CubeGeometry(10,2,8),
		new THREE.MeshLambertMaterial({map: texture})
	);
	wheels3.position.x = 2;
	wheels3.position.z = 0;
	wheels3.position.y = 0;
	
	for(i = 0; i < 10; i++){
		var wheel3 = new THREE.Mesh(
			new THREE.SphereGeometry(1, 16, 16), 
			new THREE.MeshLambertMaterial({map: texture2})
		);
		wheel3.position.y = 0;
		
		if(i > 4){
			wheel3.position.x = 5 - 2*(i-5) + 1;
			wheel3.position.z = -4;
		}else{
			wheel3.position.x = 5 - 2*i + 1;
			wheel3.position.z = 4;
		}
		tank3.add(wheel3);
		wheelArr3[i] = wheel3;
	}
	
	var box3_1 = new THREE.Mesh(
		new THREE.CubeGeometry(5,2,5),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box3_1.position.x = 2;
	box3_1.position.z = 0;
	box3_1.position.y = 2;
	
	box3_2 = new THREE.Mesh(
		new THREE.CubeGeometry(1,2,3),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box3_2.position.x = 5;
	box3_2.position.z = 0;
	box3_2.position.y = 2;
	
	var gun3 = new THREE.Mesh(
		new THREE.CubeGeometry(6,1,1),
		new THREE.MeshLambertMaterial({map: texture})
	);
	gun3.position.x = 7;
	gun3.position.y = 2;
	gun3.position.z = 0;
		
	tank3.castShadow = true;
	tank3.add(wheels3);
	tank3.add(box3_1);
	tank3.add(box3_2);
	tank3.add(gun3);
	
	//the tank facing right
	tank4 = new THREE.Object3D();	
	tank4.position.x = sphere.position.x;
	tank4.position.z = sphere.position.z;
	tank4.position.y = 0;
	
	wheels4 = new THREE.Mesh(
		new THREE.CubeGeometry(10,2,8),
		new THREE.MeshLambertMaterial({map: texture})
	);
	wheels4.position.x = 2;
	wheels4.position.z = 0;
	wheels4.position.y = 0;
	
	for(i = 0; i < 10; i++){
		var wheel4 = new THREE.Mesh(
			new THREE.SphereGeometry(1, 16, 16), 
			new THREE.MeshLambertMaterial({map: texture2})
		);
		wheel4.position.y = 0;
		
		if(i > 4){
			wheel4.position.x = 5 - 2*(i-5) + 1;
			wheel4.position.z = -4;
		}else{
			wheel4.position.x = 5 - 2*i + 1;
			wheel4.position.z = 4;
		}
		tank4.add(wheel4);
		wheelArr4[i] = wheel4;
	}
	
	var box4_1 = new THREE.Mesh(
		new THREE.CubeGeometry(5,2,5),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box4_1.position.x = 3;
	box4_1.position.z = 0;
	box4_1.position.y = 2;
	
	box4_2 = new THREE.Mesh(
		new THREE.CubeGeometry(1,2,3),
		new THREE.MeshLambertMaterial({map: texture})
	);
	box4_2.position.x = 0;
	box4_2.position.z = 0;
	box4_2.position.y = 2;
	
	var gun4 = new THREE.Mesh(
		new THREE.CubeGeometry(6,1,1),
		new THREE.MeshLambertMaterial({map: texture})
	);
	gun4.position.x = -3;
	gun4.position.y = 2;
	gun4.position.z = 0;
		
	tank4.castShadow = true;
	tank4.add(wheels4);
	tank4.add(box4_1);
	tank4.add(box4_2);
	tank4.add(gun4);
}
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

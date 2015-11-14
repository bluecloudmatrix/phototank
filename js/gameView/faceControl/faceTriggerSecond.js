/**
 * 人脸控制小球的方式二
 * 2013/8/31
 **/
(function() {

	var namespace = GAMEVIEW.namespace('GAMEVIEW.faceControl');
	
	if(namespace.faceTriggerSecond === undefined) {
	
		namespace.faceTriggerSecond = function(face_center_x, face_center_y) {
		
			var controlCanvas = document.getElementById("control");
			
			//建立中心圆形区域
			var width = controlCanvas.width;
			var height = controlCanvas.height;
			
			var center_point_x = width / 2;
			var center_point_y = height*(2/3);
			
			var radius = 20;
			
			var ctx = controlCanvas.getContext('2d');
			ctx.strokeStyle = "#0080FF";
			ctx.beginPath();
			ctx.arc(center_point_x, center_point_y, radius, 0, Math.PI*2, false);
			ctx.stroke();
			
			var distance = Math.sqrt(Math.pow(face_center_x-center_point_x, 2) + Math.pow(face_center_y-center_point_y, 2));
			
			//根据人脸中心坐标相对于圆形区域的位置来控制小球
			if(distance > radius && face_center_y == center_point_y && face_center_x > center_point_x) { //向左
				keyArr[37] = 1;
				keyArr[39] = 0;
				keyArr[38] = 0;
				keyArr[40] = 0;
			} else if(distance > radius && face_center_y == center_point_y && face_center_x < center_point_x) { //向右
				keyArr[39] = 1;
				keyArr[38] = 0;
				keyArr[40] = 0;
				keyArr[37] = 0;
			} else if(distance > radius && face_center_y < center_point_y && face_center_x == center_point_x) { //向上
				keyArr[38] = 1;
				keyArr[37] = 0;
				keyArr[39] = 0;
				keyArr[40] = 0;
			} else if(distance > radius && face_center_y > center_point_y && face_center_x == center_point_x) { //向下
				keyArr[40] = 1;
				keyArr[38] = 0;
				keyArr[37] = 0;
				keyArr[39] = 0;
			} else if(distance > radius && face_center_y < center_point_y && face_center_x > center_point_x) { //左上
				keyArr[37] = 1;
				keyArr[38] = 1;
				keyArr[39] = 0;
				keyArr[40] = 0;
			} else if(distance > radius && face_center_y > center_point_y && face_center_x > center_point_x) { //左下
				keyArr[37] = 1;
				keyArr[40] = 1;
				keyArr[39] = 0;
				keyArr[38] = 0;
			} else if(distance > radius && face_center_y < center_point_y && face_center_x < center_point_x) { //右上
				keyArr[39] = 1;
				keyArr[38] = 1;
				keyArr[40] = 0;
				keyArr[37] = 0;
			} else if(distance > radius && face_center_y > center_point_y && face_center_x < center_point_x) { //右下
				keyArr[39] = 1;
				keyArr[40] = 1;
				keyArr[38] = 0;
				keyArr[37] = 0;
			} else if(distance <= radius) {
				keyArr[39] = 0;
				keyArr[40] = 0;
				keyArr[38] = 0;
				keyArr[37] = 0;
			}
		
		}
		
	}

}) ();
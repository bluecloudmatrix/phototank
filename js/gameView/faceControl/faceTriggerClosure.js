/**
 * 人脸动作触发小球的运动
 * 应用闭包保存之前数据
 * 2013/8/30
 **/
(function() {

	var namespace = GAMEVIEW.namespace('GAMEVIEW.faceControl');
	
	if(namespace.faceTriggerClosure === undefined) {
	
		namespace.faceTriggerClosure = function() {
		
			var pre_position_x;
			var pre_position_y;
			
			function faceTrigger(now_x, now_y) {
			
				var threshold = 15; //只有前后距离相差到一定数值时，才触发事件（灵敏性）
			
				if(now_x - pre_position_x > threshold) { //letf
					keyArr[37] = 1;
					keyArr[39] = 0;
					keyArr[38] = 0;
					keyArr[40] = 0;
				} 
					
				if(now_x - pre_position_x < -threshold) { //right
					keyArr[39] = 1;
					keyArr[38] = 0;
					keyArr[40] = 0;
					keyArr[37] = 0;
				} 

				if(now_y - pre_position_y < -threshold) { //up
					keyArr[38] = 1;
					keyArr[37] = 0;
					keyArr[39] = 0;
					keyArr[40] = 0;
				} 
					
				if(now_y - pre_position_y > threshold) { //down
					keyArr[40] = 1;
					keyArr[38] = 0;
					keyArr[37] = 0;
					keyArr[39] = 0;
				}
					
					
				//记录坐标，作为下一次的对比坐标
				pre_position_x = now_x;
				pre_position_y = now_y;
			
			}
			
			return faceTrigger;
		
		}
	
	}

}) ();
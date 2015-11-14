/**
 * 用于玩家出现在3D场景中的初始代码
 * 2013/8/29
 **/
(function() {
	
	var namespace = GAMEVIEW.namespace('GAMEVIEW.faceControl');
	
	if(namespace.App === undefined) {
	
		namespace.App = {
			start: function(stream) {
			
				namespace.App.stream = stream;
				
				namespace.App.video.addEventListener('canplay',
					function() {
						namespace.App.video.removeEventListener('canplay');
						setTimeout(function() {
								namespace.App.video.play();
								namespace.App.backCanvas.width = namespace.App.video.videoWidth / 4;
								namespace.App.backCanvas.height = namespace.App.video.videoHeight / 4;

								namespace.App.backContext = namespace.App.backCanvas.getContext('2d');

								var w = 300 / 4 * 0.8,
									h = 270 / 4 * 0.8;

								namespace.App.comp = [{
									x: (namespace.App.video.videoWidth / 4 - w) / 2,
									y: (namespace.App.video.videoHeight / 4 - h) / 2,
									width: w,
									height: h
								}];
					
								//namespace.App.faceTrigger = GAMEVIEW.faceControl.faceTriggerClosure();
								namespace.App.animate();
								
							},
							500);
					},
					true);

				var domURL = window.URL || window.webkitURL;
				namespace.App.video.src = domURL ? domURL.createObjectURL(stream) : stream;

			},
			denied: function() {

			},
			error: function(e) {
				if (e) {
					console.error(e);
				}
			},
			drawToCanvas: function() {

				var video = namespace.App.video,
					ctx = namespace.App.context,
					backCtx = namespace.App.backContext,
					m = 4,
					w = 4,
					i, comp;

					
				ctx.drawImage(video, 0, 0, namespace.App.canvas.width, namespace.App.canvas.height);

				/*var canvasContent = headtrackr.getWhitebalance(namespace.App.canvas);
				if (canvasContent > 0) {
					run = true;
					track();
				} else {
					window.setTimeout(starter, 100);
				}*/
				
				backCtx.drawImage(video, 0, 0, namespace.App.backCanvas.width, namespace.App.backCanvas.height);	
					
				comp = ccv.detect_objects(namespace.App.ccv = namespace.App.ccv || {
					canvas: namespace.App.backCanvas,
					cascade_face: cascade_face,
					interval: 4,
					min_neighbors: 1
				});
				
				//comp = headtrackr.ccv.detect_objects(
				//	headtrackr.ccv.grayscale(namespace.App.backCanvas), headtrackr.cascade, 5, 1
				//);
					
				if (comp.length) {
					namespace.App.comp = comp;
					//获得人脸中心坐标
					var face_x = (namespace.App.comp[0].x - w / 2) * m + (namespace.App.comp[0].width + w) * m * 0.5;
					var face_y = (namespace.App.comp[0].y - w / 2) * m + (namespace.App.comp[0].height + w) * m * 0.5;
					//namespace.App.faceTrigger(face_x, face_y);
					//GAMEVIEW.faceControl.faceTriggerSecond(face_x, face_y);
					GAMEVIEW.faceControl.faceTriggerThird(face_x, face_y);
				}

				for (i = namespace.App.comp.length; i--;) {
					//ctx.drawImage(namespace.App.glasses, (namespace.App.comp[i].x - w / 2) * m, (namespace.App.comp[i].y - w / 2) * m, (namespace.App.comp[i].width + w) * m, (namespace.App.comp[i].height + w) * m);
					ctx.drawImage(namespace.App.glasses02, face_x, face_y, (namespace.App.comp[i].width + w) * m * 0.1, (namespace.App.comp[i].height + w) * m * 0.1);
				}
	

			}
		};
		
		namespace.App.stream = null;
		
		//namespace.App.glasses = new Image();
		//namespace.App.glasses.src = '../photo/glasses.png';
		namespace.App.glasses02 = new Image();
		namespace.App.glasses02.src = '../photo/glasses01.png';


		namespace.App.init = function(animate) {
			
			namespace.App.animate = animate;
			
			namespace.App.video = document.createElement('video');
			namespace.App.backCanvas = document.createElement('canvas');

			namespace.App.canvas = document.querySelector('#control');
			namespace.App.context = namespace.App.canvas.getContext('2d');
			//namespace.App.context.translate(320, 0);
			//namespace.App.context.translate(640, 0);
			namespace.App.context.scale(-1, 1);
		
			// background color if no video present
			//namespace.App.context.fillStyle = '#005337';
			//namespace.App.context.fillRect( 0, 0, namespace.App.canvas.width, namespace.App.canvas.height );			

			navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			try {
				navigator.getUserMedia_({
						video: true,
						audio: false
					},
					namespace.App.start, namespace.App.denied);
			} catch(e) {
				try {
					navigator.getUserMedia_('video', namespace.App.start, namespace.App.denied);
				} catch(e) {
					namespace.App.error(e);
				}
			}

		};
	
	}

}) ();
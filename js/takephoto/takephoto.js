
window.onload = function() {
	$('#cube').hide();
	$('#scen1').hide();
	$('#scen2').hide();
	$('#scen4').hide();
	$('#scen5').hide();
	$('#scen6').hide();
	$('#fff').hide();
	$('#3d').hide();
	$('#3d_02').hide();

	var stream=null;
	var video=null;	
	
	var canvas;
	var context;
	var width;
	var height;
	
	canvas = document.getElementById("output");
	context = canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	
	document.getElementById("snap").addEventListener("click", function() {
		var image = document.getElementById("imageSource");    
		context.drawImage(image, 0, 0, width, height);
		$('#scen1').hide();
		$('#scen2').fadeIn();
	});
	
		document.getElementById("face").addEventListener("click", function() {
		$('#imageSource').hide();
		$('#scen3').hide();
		$('#cube').fadeIn();
		$('#scen4').fadeIn();

		navigator.getMedia = (navigator.getUserMedia ||
	                       navigator.webkitGetUserMedia ||
	                       navigator.mozGetUserMedia ||
	                       navigator.msGetUserMedia);
	 
		navigator.getMedia (
		   {
		      	video: true,
		      	audio: false
		   },
		 
		   function(localMediaStream) {
		      	video = document.getElementById("video_2");
				video.src = window.URL.createObjectURL(localMediaStream);
				stream = localMediaStream;
		   },

		   function(err) {
		    	console.log("The following error occured: " + err);
		   }
		 
		);
		
	});
	
	document.getElementById("snap_2").addEventListener("click", function() {
		$('#scen4').hide();
		$('#snap_2').hide();
		$('#mymaze_2').fadeIn();
		$('#scen5').fadeIn();

		var canvas = document.getElementById("output_2");
		var context = canvas.getContext("2d");
		//alert(context);
		var width = canvas.width;
		var height = canvas.height;
		//alert(width);
		context.drawImage(video_2, 0, 0, width, height);
		video.pause();
		stream.stop();

	});

};


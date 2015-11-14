/**
 * canny edge generate
 *
**/

var mapMatrix;
var threeDWidth;
var threeDHeight;

function tomaze() {
	
	$('#b2').hide();
	$('#fff').fadeIn();
	//$('#scen6').fadeIn();
	
	var img_u8;
	
	var gCanvas = document.getElementById("output");

	img_u8 = new jsfeat.matrix_t(gCanvas.width, gCanvas.height, jsfeat.U8C1_t);
	
	var gContext = gCanvas.getContext("2d");    
	
	
	var gCanvasDataBuffer = new ArrayBuffer(gCanvas.width * gCanvas.height);
	var gCanvasData = new Int8Array(gCanvasDataBuffer);
	
    gCanvasData = gContext.getImageData(0, 0, gCanvas.width, gCanvas.height);
	
	jsfeat.imgproc.grayscale(gCanvasData.data, img_u8.data);
	
	//var r = options.blur_radius|0;
	var r = 2;
    var kernel_size = (r+1) << 1;
	
    jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);
 
    //jsfeat.imgproc.canny(img_u8, img_u8, options.low_threshold|0, options.high_threshold|0);
	jsfeat.imgproc.canny(img_u8, img_u8, 20, 70);
     
    // render result back to canvas
    var data_u32 = new Uint32Array(gCanvasData.data.buffer);
	var alpha = (0xff << 24);
    var i = img_u8.cols*img_u8.rows, pix = 0;
    while(--i >= 0) {
        pix = img_u8.data[i];
        data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
	}
	  
	
	// convert to mapMatrix
	var bytearray = gCanvasData.data;
	var canvasWidth = gCanvas.width;
	var canvasHeight = gCanvas.height;
	threeDWidth = gCanvas.width;
	threeDHeight = gCanvas.height;

	mapMatrix = new Array(canvasHeight);
	for (var i = 0; i < canvasHeight; i++) {
		mapMatrix[i] = new Array(canvasWidth);
		for(var j = 0; j < canvasWidth; j++) {
			if(bytearray[(i * canvasWidth + j) * 4] == 255)
				mapMatrix[i][j] = 2; //wall
			else
				mapMatrix[i][j] = 0; //ground
		}
	}
	
	GogameObj();
   
}

function tomaze_2() {
	
	$('#mymaze_2').hide();
	$('#3d').fadeIn();
	$('#3d_02').fadeIn();
	//$('#scen6').fadeIn();
	
	var img_u8;
	
	var gCanvas = document.getElementById("output_2");

	img_u8 = new jsfeat.matrix_t(gCanvas.width, gCanvas.height, jsfeat.U8C1_t);
	
	var gContext = gCanvas.getContext("2d");    
	
	
	var gCanvasDataBuffer = new ArrayBuffer(gCanvas.width * gCanvas.height);
	var gCanvasData = new Int8Array(gCanvasDataBuffer);
	
    gCanvasData = gContext.getImageData(0, 0, gCanvas.width, gCanvas.height);
	
	jsfeat.imgproc.grayscale(gCanvasData.data, img_u8.data);
	
	//var r = options.blur_radius|0;
	var r = 2;
    var kernel_size = (r+1) << 1;
	
    jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);
 
    //jsfeat.imgproc.canny(img_u8, img_u8, options.low_threshold|0, options.high_threshold|0);
	jsfeat.imgproc.canny(img_u8, img_u8, 20, 70);
     
    // render result back to canvas
    var data_u32 = new Uint32Array(gCanvasData.data.buffer);
	var alpha = (0xff << 24);
    var i = img_u8.cols*img_u8.rows, pix = 0;
    while(--i >= 0) {
        pix = img_u8.data[i];
        data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
	}
	  
	
	// convert to mapMatrix
	var bytearray = gCanvasData.data;
	var canvasWidth = gCanvas.width;
	var canvasHeight = gCanvas.height;
	threeDWidth = gCanvas.width;
	threeDHeight = gCanvas.height;

	mapMatrix = new Array(canvasHeight);
	for (var i = 0; i < canvasHeight; i++) {
		mapMatrix[i] = new Array(canvasWidth);
		for(var j = 0; j < canvasWidth; j++) {
			if(bytearray[(i * canvasWidth + j) * 4] == 255)
				mapMatrix[i][j] = 2; //wall
			else
				mapMatrix[i][j] = 0; //ground
		}
	}
	
	GogameObj_2();
   
}
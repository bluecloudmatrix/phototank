/**
 * upload located photos
 **/
function upload() {
	$('#scen3').hide();
	$('#scen1').fadeIn();
	var image = document.getElementById("imageSource");    

	var str = document.getElementById('textfield').value;

	image.src = "media/"+str[12]+".jpg";
	
}
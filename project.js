$(document).ready(function() {
	$("#imageForm").submit(function (event) {
	
	// Write your jQuery code in this area !
	// You must use 3 APIs which is FileReader, FormData and jQuery.ajax() !
	event.preventDefault();
	var i=0;
	var len=$("#images")[0].files.length;
	var img, reader, file;
	if(window.FormData){
		formdata=new FormData();
	}
	for(;i<len; i++){
		file=$("#images")[0].files[i];
		if(file.type.match(/image.*/)){
			if(window.FileReader){
				reader=new FileReader();
				reader.onloadend=function (e) {showUploadedItem(e.target.result);};
				reader.readAsDataURL(file);
			}
			if (formdata){
				formdata.append("images[]",file);
			}
		}
		
	}
	if(formdata){
		$.ajax({
			url:"upload.php",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function(res){
				$("#response").html("Uploading Done.")
			}
		})
	}
	});
});  
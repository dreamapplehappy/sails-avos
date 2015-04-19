$(function(){
	var bPopup;
    $('#addUserBtn').click(function(){
    	bPopup = $('.addUserForm').bPopup({
    		modalClose: false
    	});
    });
    $('#formClose').click(function(e){
    	e.preventDefault(); 
    	bPopup.close();
    });
});
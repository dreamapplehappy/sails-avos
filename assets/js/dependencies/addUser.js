$(function(){
	var bPopup;
    $('#addUserBtn').click(function(){
    	bPopup = $('.addUserForm').bPopup({
    		modalClose: false,
            speed: 450,
            transition: 'slideDown'
    	});
    });
    $('#formClose').click(function(e){
    	e.preventDefault(); 
    	bPopup.close();
    });
});

$(function(){
	$('ul.right .right-menu').click(function(e){
		e.preventDefault();
		$('.rightValue').val($(this).text());
	});
});
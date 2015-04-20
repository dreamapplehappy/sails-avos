$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
});

$(function(){
    $('.addUserBtn[depth="first"]').click(function(){
        $(this).parent().children('ul').append(
            '<li>'+
            '<span>'+
            '<i class="icon-minus-sign"></i> Child</span>'+
            '<i class="glyphicon glyphicon-plus-sign addUserBtn" depth="second" aria-hidden="true"></i>'+
            '<ul>'+
            '</ul>'+
            '</li>');
    });
    /*$('.addUserBtn[depth="second"]').click(function(){
        $(this).parent().children('ul').append(
            '<li>'+
            '<span><i class="icon-leaf"></i> Grand Child</span>'+
            '</li>');
    });*/
    $('.addUserBtn[depth="second"]').on('click',function(){
        $(this).parent().children('ul').append(
            '<li>'+
            '<span><i class="icon-leaf"></i> Grand Child</span>'+
            '</li>');
    });
});
// alert("connected")
$("ul").on("click", "li",function(){
    $(this).toggleClass("done");
});

$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function()
    {
        this.remove();
    });
    event.stopPropagation();
});

$("input[type ='text'").keypress(function(event){
    if (event.which === 13){
        var newTodoItem = $(this).val();
        $(this).val(""); //reset input to empty
        var iconTrash = "<span><i class=\"fa fa-trash\"></i></span>"

        $("ul").append("<li>" +iconTrash + newTodoItem + "</li>");
    }
});

$(".fa-plus").click(function(){
    $("input[type='text'").fadeToggle();
});
// alert("connected")
$("li").click(function(){
    $(this).toggleClass("done");
});

$("li span").click(function(event){
    $(this).parent().fadeOut(500, function()
    {
        this.remove();
    });
    event.stopPropagation();
})

$("input[type ='text'").keypress(function(event){
    if (event.which === 13){
        var newTodoItem = $(this).val();
        $("ul").append("<li>" + newTodoItem + "</li>");
    }
});

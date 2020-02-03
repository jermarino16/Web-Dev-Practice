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
        console.log($(this).val());
        $("ul").append("<li>" + $(this).val() + "</li>");
    }
});

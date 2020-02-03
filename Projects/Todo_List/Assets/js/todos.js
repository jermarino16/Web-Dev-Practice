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

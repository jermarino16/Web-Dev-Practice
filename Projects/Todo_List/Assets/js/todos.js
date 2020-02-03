// alert("connected")
$("li").click(function(){
    $(this).toggleClass("done");
});

$("li span").click(function(){
    $(this).parents("li").fadeOut();
})

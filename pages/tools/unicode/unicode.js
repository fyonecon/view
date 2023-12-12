
$(document).on("click", ".trans-encode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html(view.string_to_unicode(text_value1));
})

$(document).on("click", ".trans-decode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html(view.unicode_to_string(text_value1));
})


// 页面起始函数
function run_tools_content(text, data){
    //
    $("#textarea-2").html('<div style="opacity: 0.5;">空结果</div>');

}
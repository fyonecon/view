
$(document).on("click", ".trans-encode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html("");
    $("#textarea-2").text(view.string_to_hex16(text_value1));
})

$(document).on("click", ".trans-decode", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").html("");
    $("#textarea-2").text(view.hex16_to_string(text_value1));
})


// 组件起始函数
function run_parts(text, data){
    //
    $("#textarea-2").html('<div style="opacity: 0.5;">空结果</div>');

}
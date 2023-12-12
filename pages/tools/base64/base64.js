

$(document).on("click", ".trans-encode_base64", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").val(function (){
        return view.base64_encode(text_value1);
    });
})

$(document).on("click", ".trans-decode_base64", function (){
    let that = $(this);
    let text_value1 = $("#textarea-1").val();
    $("#textarea-2").val(function (){
        return view.base64_decode(text_value1);
    });
})

// 页面起始函数
function run_tools_content(text, data){
    //
}
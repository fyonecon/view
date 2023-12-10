//
const kws = {
    load: function (word){
        let url = "";
        switch (word){
            case "kwshl":
                url = "aHR0cHM6Ly96enR0MTUuY29t";
                break;
            case "kws9p":
                url = "aHR0cHM6Ly85MXBvcm4uY29t";
                break;
            case "kwsqp":
                url = "aHR0cHM6Ly85MXBvcm4uY29t";
                break;
            default:
                url = "";
                break;
        };
        if (url.length > 7){
            view.hide_loading();
            url = view.base64_decode(url);
            view.window_open(url, "_blank");
        } else {
            view.hide_loading();
            view.alert_txt("关键词口令匹配错误，<br/>当前关键词："+word, 5000);
            setTimeout(function (){
                view.window_open("./", "_self");
            }, 6000);
        }
    },
};
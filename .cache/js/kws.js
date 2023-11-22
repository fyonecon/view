//
const kws = {
    load: function (word){
        let url = "";
        switch (word){
            case "kws5g":
                url = "aHR0cHM6Ly81MWFha3AudG9wLw==";
                break;
            case "kws8x":
                url = "aHR0cHM6Ly84MXhha3IudG9wLw==";
                break;
            case "kwshl":
                url = "aHR0cHM6Ly96enR0MTUuY29t";
                break;
            case "kws9p":
                url = "aHR0cHM6Ly85MXBvcm4uY29t";
                break;
            default:
                url = "";
                break;
        };
        if (url.length>7){
            url = view.base64_decode(url);
            window.open(url, "_self");
        }
        else {
            view.hide_loading();
            view.alert_txt("关键词口令匹配错误，<br/>当前关键词："+word, 5000);
            setTimeout(function (){
                window.open("./", "_self");
            }, 6000);
        }
    },
};
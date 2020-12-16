// 实现文字转语音+自动播放音频功能
// 推荐使用Edge浏览器

/*
* 百度语音：
tex	必填	合成的文本，使用UTF-8编码。小于2048个中文字或者英文数字。（文本在百度服务器内转换为GBK后，长度必须小于4096字节）
tok	必填	开放平台获取到的开发者access_token（见上面的“鉴权认证机制”段落）
cuid	必填	用户唯一标识，用来计算UV值。建议填写能区分用户的机器 MAC 地址或 IMEI 码，长度为60字符以内
ctp	必填	客户端类型选择，web端填写固定值1
lan	必填	固定值zh。语言选择,目前只有中英文混合模式，填写固定值zh
spd	选填	语速，取值0-15，默认为5中语速
pit	选填	音调，取值0-15，默认为5中语调
vol	选填	音量，取值0-15，默认为5中音量
per（基础音库）	选填	度小宇=1，度小美=0，度逍遥=3，度丫丫=4
per（精品音库）	选填	度博文=106，度小童=110，度小萌=111，度米朵=103，度小娇=5
aue	选填	3为mp3格式(默认)； 4为pcm-16k；5为pcm-8k；6为wav（内容同pcm-16k）; 注意aue=4或者6是语音识别要求的格式，但是音频内容不是语音识别要求的自然人发音，所以识别效果会受影响。
tex字段2次urlencode
由于urlencode有两个标准 RFC 1738和RFC 3986. 百度为了更好地兼容，支持1次及2次urlencode， 其中2次urlencode可以覆盖全部的特殊字符。因而推荐传递tex 参数时做2次urlencode编码。

* */

let read_txt = "-未设置文字-";
let read_time = "";
function mp3_play(){
    // 文字生成语音源
    let make_mp3 = "https://tts.baidu.com/text2audio?cuid=baike&lan=zh&ctp=1&spd=3&pdt=301&vol=9&rate=32&per=0&tex=" + encodeURI(read_txt);

    view.log([read_txt, read_time, make_mp3]);

    // 自动播放音频
    // 文档https://github.com/haima16/MPlayer
    let player = new MPlayer(make_mp3, {
        loop: false,
        volume: 1,
        auto: true,
        index: 1,
        analyser: {
            size: 1024,
        }
    });
    player.onload = function() {
        let that = this;
        view.log("=开始播放=");
        that.play();

    };
    player.onended = function() {
        let that = this;
        view.log("=播放完成=");

    };

}
function voice_text(txt, time){
    // let make_mp3 = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(str);
    // let make_mp3 = "https://tts.baidu.com/text2audio?cuid=baike&lan=zh&ctp=1&pdt=301&vol=9&rate=32&per=0&tex=" + encodeURI(str);

    read_txt = txt;
    read_time = time;
    view.write_js([file_url + "static/js/mplayer.js"], mp3_play());

}

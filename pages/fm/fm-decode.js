/* js */


/* js */


const title = "红杏出墙FM";
const bug = false;
function console_log(txt) { bug === true?console.info(txt):""}
let db_num = 0;
let timer;
function time() {
    timer = setInterval(function () {
        document.getElementsByClassName("kd-mp3-now_time")[0].innerHTML = getNowDate()[1];
    }, 1000);
}
let title_tag = document.getElementsByTagName("title")[0];

let the_file = "public/img/";

let null_fm_cover = the_file+"fm/fm_null_cover.png";

let mp3 = document.createElement("audio");
mp3.classList.add("hide");
mp3.volume = 1.0;
mp3.autoplay = "autoplay";
mp3.controls = "controls";

/*电台数据*/
const live_list = [
    {
        "language": "English | World News", /*语言*/
        "class": "bbc", /*类别*/
        "name": "BBC World Service", /*名称*/
        "cover": the_file+"fm/bbcworldnews.jpg", /*封面*/
        "stream": "http://bbcwssc.ic.llnwd.net/stream/bbcwssc_mp1_ws-einws", /*流地址*/
    },
    {
        "language": "English | Top 40,Pop",
        "class": "bbc",
        "name": "BBC 1",
        "cover": the_file+"fm/bbc1.jpg",
        "stream": "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_p",
    },
    {
        "language": "English | Pop",
        "class": "bbc",
        "name": "BBC 2",
        "cover": the_file+"fm/bbc2.jpg",
        "stream": "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio2_mf_q",
    },
    {
        "language": "English | Talk,News",
        "class": "bbc",
        "name": "BBC 4",
        "cover": the_file+"fm/bbc4-0.png",
        "stream": "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4fm_mf_p",
    },
    {
        "language": "English | Play",
        "class": "bbc",
        "name": "BBC 4Extra",
        "cover": the_file+"fm/bbc4extra.jpg",
        "stream": "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4extra_mf_p",
    },
    {
        "language": "English | USA News",
        "class": "voa",
        "name": "VOA USA",
        "cover": the_file+"fm/voausa.jpg",
        "stream": "http://voa-17.ng.akacast.akamaistream.net/7/315/322029/v1/ibb.akacast.akamaistream.net/voa-17",
    },
    {
        "language": "English | VOA English",
        "class": "voa",
        "name": "VOA English",
        "cover": the_file+"fm/voaenglish.jpg",
        "stream": "http://voa-28.ng.akacast.akamaistream.net/7/54/322040/v1/ibb.akacast.akamaistream.net/voa-28",
    },
    {
        "language": "Zh-cn | 新闻",
        "class": "china",
        "name": "中国之声",
        "cover": the_file+"fm/zgzs.jpg",
        "stream": "http://lhttp.qingting.fm/live/386/64k.mp3?app_id=web",
    },
    /*{
        "language": "zh-cn | Music Singapore",
        "class": "singapore",
        "name": "933 YES (Singapore)",
        "cover": the_file+"fm/933yes.png",
        "stream": "http://19443.live.streamtheworld.com/YES933_SC?dist=radiosingapore",
    },*/
];


/*
* 处理时间
* */
function getNowDate() {
    let timestamp = Date.parse(new Date())/1000; // 精确到秒的时间戳
    let date = new Date();
    let sign1 = "-";
    let sign2 = ":";
    let year = date.getFullYear();      // 年
    let month = date.getMonth() + 1;    // 月
    let day  = date.getDate();          // 日
    let hour = date.getHours();         // 时
    let minutes = date.getMinutes();    // 分
    let seconds = date.getSeconds();    // 秒
    let milli = date.getMilliseconds(); // 毫秒
    let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    let week = weekArr[date.getDay()];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    let currentdate = [year + sign1 + month + sign1 + day, hour + sign2 + minutes + sign2 + seconds, week, timestamp];
    return currentdate;
}




/*
    * 给播放封面添加动态效果
    * */
function live_cover(live) {
    if (live === 1){
        for (let i=0; i<document.getElementsByClassName("live-cover").length; i++){
            document.getElementsByClassName("live-cover")[i].classList.add("rotate");
        }
    }else {
        for (let i=0; i<document.getElementsByClassName("live-cover").length; i++){
            document.getElementsByClassName("live-cover")[i].classList.remove("rotate");
        }
    }
}

/*
* 播放
* */
function mp3_play(src) {
    console_log("播放");
    mp3.src = src;
    document.getElementById("audio-div").innerHTML = mp3;
    mp3.play();
    document.getElementsByClassName("kd-mp3-state")[0].innerHTML = "播放中";
    document.getElementsByClassName("kd-player-start")[0].classList.add("hide");
    document.getElementsByClassName("kd-player-stop")[0].classList.remove("hide");
    time();
    live_cover(1);
    db_num = 0;
}

/*
* 暂停
* */
function mp3_stop() {
    console_log("暂停");
    mp3.pause();
    document.getElementById("audio-div").innerHTML = "0";
    document.getElementsByClassName("kd-mp3-state")[0].innerHTML = "暂停中";
    document.getElementsByClassName("kd-player-start")[0].classList.remove("hide");
    document.getElementsByClassName("kd-player-stop")[0].classList.add("hide");
    clearInterval(timer);
    live_cover(0);
    db_num = 1;
}

/*
* 播放栏控制播放
* */
function db_player(src) {
    if (!src){
        console_log("src为空");
        return;
    }
    console_log(src);
    if(db_num === 0){
        mp3_stop();
    }else if (db_num === 1){
        mp3_play(src);
    }else {
        console_log("报错标识："+db_num);
    }

}

/*
* 关闭折叠
* */
function hide_player_page() {
    console_log("点击了-折叠-关闭折叠页");
    document.getElementsByClassName("kd-player-page")[0].classList.add("animated");
    document.getElementsByClassName("kd-player-page")[0].classList.remove("fadeInUpBig");
    document.getElementsByClassName("kd-player-page")[0].classList.add("fadeOutDown");

    setTimeout(function () {
        document.getElementsByClassName("kd-player-page")[0].classList.add("hide");
    }, 200);
}

/*
* 打开折叠
* */
function this_page(num) {
    console_log("打开-播放页-"+num);
    console_log(live_list[num]["stream"]);
    document.getElementsByClassName("kd-player-page")[0].classList.add("animated");
    document.getElementsByClassName("kd-player-page")[0].classList.remove("fadeOutDown");
    document.getElementsByClassName("kd-player-page")[0].classList.add("fadeInUpBig");

    document.getElementsByClassName("kd-player-page")[0].classList.remove("hide");
}

/*
* 选择哪个电台
* */
function this_item(num, open) {
    console_log(num);

    let cover = live_list[num]["cover"];
    let name = live_list[num]["name"];
    let language = live_list[num]["language"];
    let src = live_list[num]["stream"];

    // 播放栏
    let player_div = document.getElementsByClassName("kd-item-player")[0];
    player_div.innerHTML = '<div class="kd-item-cell player-bg"><img class="kd-item-cover live-cover" onclick="db_player(\''+src+'\')" src="'+cover+'" alt="cover"/><div class="kd-item-font btn open-player-page" onclick="this_page('+num+')"><div class="item-title live-title">'+name+'</div><div class="item-explanation live-explanation">'+language+'</div></div><div class="kd-item-more" onclick="this_page('+num+')">︿</div><div class="clear"></div></div>';

    // 折叠页
    let player_page = document.getElementsByClassName("kd-player-page")[0];
    player_page.innerHTML = '<div class="control-div"><img class="kd-mp3-cover block-center live-cover" src="'+cover+'" alt="cover"/><div class="kd-mp3-state">-未开始-</div><div class="kd-mp3-name live-title">'+name+'</div><div class="kd-mp3-time"><div class="kd-mp3-now_time timer-style">12:00:00</div>/<div class="kd-mp3-before_time timer-style">12:00:00</div></div><div><div class="kd-player-stop kd-player-btn btn hide" onclick="mp3_stop()">暂停</div><div class="kd-player-start kd-player-btn btn" onclick="mp3_play(\''+src+'\')">播放</div></div></div><div class="control-div-btn btn hide-player" onclick="hide_player_page()"><!--折叠-->﹀</div>';

    title_tag.innerHTML = name+"·"+title; // 更新title

    if(open === 1){
        setTimeout(function () { // 展示折叠
            document.getElementsByClassName("kd-player-page")[0].classList.add("animated");
            document.getElementsByClassName("kd-player-page")[0].classList.remove("fadeOutDown");
            document.getElementsByClassName("kd-player-page")[0].classList.add("fadeInUpBig");

            document.getElementsByClassName("kd-player-page")[0].classList.remove("hide");
        }, 200);
    }

    // 更新时间指示
    document.getElementsByClassName("kd-mp3-now_time")[0].innerHTML = getNowDate()[1];
    document.getElementsByClassName("kd-mp3-before_time")[0].innerHTML = getNowDate()[1];

    mp3_play(src);
}

(function (e) {

    title_tag.innerHTML = "请先选择电台·"+title;

    // 电台列表
    let item_div = document.getElementsByClassName("kd-item-div")[0];
    let append = [];
    for (let i=0; i<live_list.length; i++){
        let tag = '<div class="kd-item-cell"><img class="kd-item-cover" src="'+live_list[i]["cover"]+'" alt="cover"/><div class="kd-item-font btn" onclick="this_item('+i+')"><div class="item-title">'+live_list[i]["name"]+'</div><div class="item-explanation">'+live_list[i]["language"]+'</div></div><div class="kd-item-more"><!--==--></div><div class="clear"></div></div>';
        append.push(tag);
    }
    item_div.innerHTML = append.join("");

    // 播放栏
    let player_div = document.getElementsByClassName("kd-item-player")[0];
    player_div.innerHTML = '<div class="kd-item-cell player-bg"><img class="kd-item-cover live-cover" src="'+null_fm_cover+'" alt="cover"/><div class="kd-item-font btn"><div class="item-title live-title" onclick="this_item(0, 1)">前先选择电台</div><div class="item-explanation live-explanation">红杏出墙FM</div></div><div class="kd-item-more"  onclick="this_item(0, 1)">︿</div><div class="clear"></div></div>';

})("渲染数据");


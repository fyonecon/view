/*自定义全局函数，公用js*/
/*建议放公共函数*/

// 生成分页
// make_paging(对用放置id的div, 数据总条数, 每页条数, 当前第几页, #page=1, 回调函数[会返回新页码])
function make_paging(id, total, limit, page, page_hash, call_func){
    layui.use('laypage', function(){
        let laypage = layui.laypage;
        laypage.render({
            elem: id, // id
            count: total, // 数据总数
            limit: limit, // 每页数量
            curr: page, // 初始当前页
            jump: function(obj, first){
                if(!first){ // 点击分页执行
                    view.log(["新page=", obj.curr]);
                    window.location.hash = "#" + page_hash + "=" +obj.curr;
                    try {
                        call_func(obj.curr);
                    }catch (e){
                        view.error("make_paging()无调函数");
                    }
                }else { // 第一次就执行
                    view.log(["初始page=", page]);
                }
            }
        });
    });

}

// 清除所有配置记录、数据库记录
function clear_all_data(){
    view.alert_confirm("⚠️", "清除全部配置数据 ？", function (state){
        if (state){ // yes
            view.show_mask(3000);
            view.clear_data();
            view.clear_iDb();
            view.refresh_page(1000);
        }else { // no
            //
        }
    });

}

// 绑定跳转
$(document).on("click", ".a-click", function (){
    let that = $(this);
    view.show_mask(1200);
    let href = that.attr("data-href");
    let target = that.attr("data-target");
    target = target?target:"_self";
    if (href){
        window.open(href, target);
    }else {
        view.notice_txt("未设置data-href", 2000);
    }
});


var oBtns = document.getElementById('btns');
var aLi = oBtns.getElementsByTagName('input');
var aLiLength = aLi.length;
var oCal = document.getElementById('calculator');
var aDiv = oCal.getElementsByClassName('calculator_con');


function start_this_page() {

    for (var i = 0; i < aLiLength; i++) {
        (function (idx) {
            aLi[idx].onclick = function () {
                document.getElementById('resultIpt').value = 0;
                document.getElementById('gaoji').value = 0;
                for (var j = 0; j < aLiLength; j++) {
                    aLi[j].className = 'btnss';
                    aDiv[j].className = 'calculator_con';
                }
                this.className = 'qiehuankuang_1_dq';
                aDiv[idx].className = 'calculator_con current';
            }
        })(i);
    }

    jisuanqi_run();

}

/**
 * Created by CNY on 2016/10/7.
 */
window.onload = function () {

};
$(function () {
    //导航栏切换及搜索框切换
    (function () {
        var aData = [
            '例如：荷棠鱼坊烤鱼 或 樱花日本料理',
            '例如：东街，西街，北街',
            '例如：优惠券，折扣券，代金券，礼券',
            '例如：樱花日本料理',
            '例如：饮食视频，食疗视频'
        ];
        var aLi = $('.search_nav li');
        var oSearch = $('.search_con form input[type="text"]');
        aLi.each(function (index) {
            $(this).click(function () {
                aLi.removeClass('active');
                $(this).addClass('active');
                oSearch.attr('placeholder', aData[index]);
            });
        });

    })();

    //播放器
    (function () {
        var oV = document.getElementById('video1');
        var oWatch = document.getElementById('watch_hot');
        var aInput = oWatch.getElementsByTagName('input');
        var timer = null;
        var oProOut = document.getElementById('progresser_out');
        var oProIn = document.getElementById('progresser_in');

        aInput[0].onclick = function () {
            if (oV.paused) {
                oV.play();
                this.value = '‖';
                nowTime();
                timer = setInterval(nowTime, 1000);
            }
            else {
                oV.pause();
                this.value = '▶';
                clearInterval(timer);
            }
        };

        function nowTime() {
            aInput[1].value = changeTime(oV.currentTime);

            var scale = oV.currentTime / oV.duration;

            oProIn.style.left = scale * (oProOut.offsetWidth - oProIn.offsetWidth) + 'px';

        }

        aInput[2].value = changeTime(oV.duration);

        function changeTime(iNum) {
            //console.log(iNum);

            var iH = Math.floor(iNum / 3600);
            var iM = Math.floor(iNum % 3600 / 60);
            var iS = Math.floor(iNum % 60);

            return toZero(iH) + ':' + toZero(iM) + ':' + toZero(iS);

        }

        function toZero(iNum) {
            if (iNum < 10) {
                return '0' + iNum;
            }
            else {
                return '' + iNum;
            }
        }

        aInput[3].onclick = function () {
            if (!oV.muted) {
                oV.muted = true;
                this.style.backgroundImage = 'url(images/mute_bg2.jpg)';
                //this.value = '取消静音';
            }
            else {
                oV.muted = false;
                this.style.backgroundImage = 'url(images/mute_bg.jpg)';
                //this.value = '静音';
            }
        };

        var disX = 0;
        oProIn.onmousedown = function (ev) {
            disX = ev.clientX - oProIn.offsetLeft;
            document.onmousemove = function (ev) {
                var L = ev.clientX - disX;
                if (L < 0) {
                    L = 0;
                }
                else if (L > oProOut.offsetWidth - oProIn.offsetWidth) {
                    L = oProOut.offsetWidth - oProIn.offsetWidth;
                }
                oProIn.style.left = L + 'px';

                var scale = L / (oProOut.offsetWidth - oProIn.offsetWidth);

                oV.currentTime = scale * oV.duration;

            };
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        };
    })();
});
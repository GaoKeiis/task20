var router = angular.module("router", ["ui.router"]);

router.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("","/home");
    $stateProvider
//                点击首页
        .state("home", {
            url: "/home",
            templateUrl: 'sum/song.html',
            controller:function($scope,$http) {
                var swiper1 = new Swiper(".swiper-container1", {
                    autoplay: 1000,
                    pagination: ".swiper-pagination",
                    paginationClickable: true
                });
                var myIScroll = new iScroll("wrapper1");
                //  新歌中的渲染数据
                function init() {
                    $.ajax({
                        url: 'data/data.json',
                        success: function (data) {
                            var str = "";
                            $.each(data, function (i, val) {
                                str += "<li>" + val.music + " <i class='iconfont icon-xiazaidaoru'></i></li>"

                            });
                            $(".readen ul").append(str);
                            myIScroll.refresh();
                        }
                    })
                }
                //  点击加载更多 渲染新的数据
                $(".pullUp").on("click", function () {
                    init();
                    myIScroll.refresh();
                });
                $http.get("data/data.json")
                    .then(function(date){
                        $scope.date = date.data

                    });
                return $scope.date
            }
        })
//                点击排行页
        .state("ranking", {
            url: "/ranking",
            templateUrl: 'sum/home.html',
            controller:function($scope,$http) {
                function loadedinit() {
                    $.ajax({
                        url: 'data/music.json',
                        success: function (data) {
                            var stcr = "";
                            $.each(data, function (i, val) {
                                stcr += '<dl>' +
                                    '<dt><img src="'+val.src+'" alt="imgs1"></dt>' +
                                    '<dd>' +
                                    '<h3>'+val.title+'</h3>' +
                                    '<div class="liepan-icon">' +
                                    '<i class="iconfont icon-gengduo1 f20"></i>' +
                                    '</div>' +
                                    '</dd>' +
                                    '</dl>'

                            });
                            $(".liepan").append(stcr);
                        }
                    });
                    myScroll.refresh();
                }
                //设置手指滑动和离开时的各种效果
                function loaded() {
                    var pullDownEl = document.getElementById("pullDown1"),
                        pullDownOffset = pullDownEl.offsetHeight,
                        pullUpEl = document.getElementById("pullUp1");
                    myScroll = new iScroll("wrapper2", {
                        topOffset: pullDownOffset,
                        momentum: false,//关闭惯性滑动
                        fadeScrollbars: true,//滚动条渐隐
                        onScrollMove: function () {
                            if (this.y > 5 && !pullDownEl.className.match("flip")) {
                                pullDownEl.className = "flip";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "释放刷新";
                            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match("flip")) {
                                pullUpEl.className = "flip";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "释放刷新";
                            }

                        },
                        onScrollEnd: function () {
                            if (pullDownEl.className.match("flip")) {
                                pullDownEl.className = "loading";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "加载中";
                                pullDownScroll()
                            } else if (pullUpEl.className.match("flip")) {
                                pullUpEl.className = "loading";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "加载中";
                                pullUpScroll()
                            }
                            setTime()
                        },
                        onRefresh: function () {
                            if (pullDownEl.className.match("loading")) {
                                pullDownEl.className = "";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "下拉刷新";
                            } else if (pullUpEl.className.match("loading")) {
                                pullUpEl.className = "";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "上拉加载更多";
                            }
                        }
                    })

                }
                loaded();
                //刷新iScroll滚动条的函数
                function setTime() {
                    setTimeout(function () {
                        myScroll.refresh();
                    }, 1000)
                }
                function pullDownScroll() {
                    alert("刷新成功");
                    myScroll.refresh();
                }
                //下拉加载时添加数据 渲染到页面上
                function pullUpScroll() {
                    loadedinit();
                }
                $http.get("data/music.json")
                    .then(function(data){
                        $scope.arr = data.data
                    });
                return $scope.arr
            }
        })
//                点击歌单页
        .state("sheet", {
            url: "/sheet",
            templateUrl: 'sum/sheet.html',
            controller:function($scope,$http) {

                function loadedin() {
                    $.ajax({
                        url: 'data/singer.json',
                        success: function (data) {
                            var stcr = "";
                            $.each(data, function (i, val) {
                                stcr += '<dl>' +
                                    '<dt><img src="'+val.src+'" alt="imgs1"></dt>' +
                                    '<dd>' +
                                    '<h3>'+val.title+'</h3>' +
                                    '<div class="liepan-icon">' +
                                    '<i class="iconfont icon-gengduo1 f20"></i>' +
                                    '</div>' +
                                    '<div class="liepan-icons">'+
                                    '<i class="iconfont icon-xihuan-xianxing"></i>'+
                                    '"'+val.ion+'"'+
                                    '</div>'+
                                    '</dd>' +
                                    '</dl>'
                            });
                            $(".liep").append(stcr);
                        }
                    });
                    myScroll.refresh();
                }
                //设置手指滑动和离开时的各种效果
                function loaded1() {
                    var pullDownEl = document.getElementById("pullDown2"),
                        pullDownOffset = pullDownEl.offsetHeight,
                        pullUpEl = document.getElementById("pullUp2");
                    myScroll = new iScroll("wrapper3", {
                        topOffset: pullDownOffset,
                        momentum: false,//关闭惯性滑动
                        fadeScrollbars: true,//滚动条渐隐
                        onScrollMove: function () {
                            if (this.y > 5 && !pullDownEl.className.match("flip")) {
                                pullDownEl.className = "flip";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "释放刷新";
                            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match("flip")) {
                                pullUpEl.className = "flip";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "释放刷新";
                            }

                        },
                        onScrollEnd: function () {
                            if (pullDownEl.className.match("flip")) {
                                pullDownEl.className = "loading";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "加载中";
                                pullDownS()
                            } else if (pullUpEl.className.match("flip")) {
                                pullUpEl.className = "loading";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "加载中";
                                pullUpS()
                            }
                            setTime()
                        },
                        onRefresh: function () {
                            if (pullDownEl.className.match("loading")) {
                                pullDownEl.className = "";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "下拉刷新";
                            } else if (pullUpEl.className.match("loading")) {
                                pullUpEl.className = "";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "上拉加载更多";
                            }
                        }
                    })

                }
                loaded1();

                //刷新iScroll滚动条的函数
                function setTime() {
                    setTimeout(function () {
                        myScroll.refresh();
                    }, 1000)
                }
                function pullDownS() {
                    alert("刷新成功");
                    myScroll.refresh();
                }
                //下拉加载时添加数据 渲染到页面上
                function pullUpS() {
                    loadedin();
                }

                $http.get("data/singer.json")
                    .then(function(data){
                        $scope.date = data.data
                    });
                return $scope.date
            }
        })
//                点击歌手页
        .state("singer", {
            url: "/singer",
            templateUrl: 'sum/singer.html',
            controller:function($scope,$http) {
                function loadedinit() {
                    $.ajax({
                        url: 'data/list.json',
                        success: function (data) {
                            var stcrs = "";
                            $.each(data, function (i, val) {
                                stcrs += '<ul class="list">' +
                                    '<li>'+val.male+ '<i class="iconfont icon-gengduo1"></i></li>'+
                                    '<li>'+val.female+ '<i class="iconfont icon-gengduo1"></i></li>'+
                                    '<li>'+val.name+ '<i class="iconfont icon-gengduo1"></i></li>'+
                                    '</ul>'
                            });
                            $(".lisp").append(stcrs);
                        }
                    });
                    myScroll.refresh();
                }
                //设置手指滑动和离开时的各种效果
                function loaded() {
                    var pullDownEl = document.getElementById("pullDown3"),
                        pullDownOffset = pullDownEl.offsetHeight,
                        pullUpEl = document.getElementById("pullUp3");
                    myScroll = new iScroll("wrapper4", {
                        topOffset: pullDownOffset,
                        momentum: false,//关闭惯性滑动
                        fadeScrollbars: true,//滚动条渐隐
                        onScrollMove: function () {
                            if (this.y > 5 && !pullDownEl.className.match("flip")) {
                                pullDownEl.className = "flip";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "释放刷新";
                            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match("flip")) {
                                pullUpEl.className = "flip";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "释放刷新";
                            }

                        },
                        onScrollEnd: function () {
                            if (pullDownEl.className.match("flip")) {
                                pullDownEl.className = "loading";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "加载中";
                                pullDownScroll()
                            } else if (pullUpEl.className.match("flip")) {
                                pullUpEl.className = "loading";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "加载中";
                                pullUpScroll()
                            }
                            setTime()
                        },
                        onRefresh: function () {
                            if (pullDownEl.className.match("loading")) {
                                pullDownEl.className = "";
                                pullDownEl.querySelector(".pullDownLabel").innerHTML = "下拉刷新";
                            } else if (pullUpEl.className.match("loading")) {
                                pullUpEl.className = "";
                                pullUpEl.querySelector(".pullUpLabel").innerHTML = "上拉加载更多";
                            }
                        }
                    })

                }
                loaded();
                //刷新iScroll滚动条的函数
                function setTime() {
                    setTimeout(function () {
                        myScroll.refresh();
                    }, 1000)
                }
                function pullDownScroll() {
                    alert("刷新成功");
                    myScroll.refresh();
                }
                //下拉加载时添加数据 渲染到页面上
                function pullUpScroll() {
                    loadedinit();
                }
                $http.get("data/list.json")
                    .then(function(lst){
                        $scope.lt = lst.data
                    });
                return $scope.lt
            }
        })
//            点击搜索按钮跳转页面
        .state("search",{
            url:"/search",
            templateUrl:"sum/search.html",
            controller:function($scope,$http) {
                $scope.add = function(vague){
                    if(vague){
                        var num = [];
                        $scope.txt.forEach(function(val,i){

                            if(val.name.indexOf(vague)!=-1){
                                num.push(val);
                            }
                        });

                        return $scope.txt=num;
                    }
                    return $scope.txt
                };
                $http.get("data/search.json")
                    .then(function(date){
                        $scope.txt = date.data
                    });
                return $scope.txt;

            }
        })

});
router.filter("filte", function () {
    return function (data,vague) {
        if(vague){
            var num = [];
            data.forEach(function(val,i){
                if(val.name.indexOf(vague)!=-1){
                    num.push(val);
                }
            });
            return num;
        }
        return data;

    }
});
router.controller("cont",function($scope,$http){

});
$(function() {
    var pagecount = 0;
    var currentpage = 0;
    var param = {
        start: 0,
        count: 10
    }

    function showmore() {
        if (currentpage == pagecount) {
            $("#more").html("没有更多了");
            return;
        }
        param.start += param.count;
        getData();
    }
    $("#more").click(function() {
        showmore();
    })

    function getData() {
        $("#more").html("加载中.....");
        $.ajax({
            url: apiUrl+'/v2/movie/in_theaters',
            type: 'get',
            dataType: 'json',
            data: param,

            success: function(data) {
                $("#more").html("加载更多");
                pagecount = Math.ceil(data.total / param.count);
                currentpage++;

                // 排序
                function sortFun() {
                    var liArrp = $("#movelist").children().find(".rating").html;
                    alert(liArrp.length);

                    for (var i = 0; i < liArrp.length; i++) {
                        for (var j = 0; j < liArrp.length-i; j++) {
                            var temp = 0;
                            if (liArrp[j] > liArrp[j + 1]) {
                                temp = liArrp[j];
                                liArrp[j] = liArrp[j + 1];
                                liArrp[j + 1] = temp;
                            }
                        }
                    }
                }
                $(".sort").click(function() {
                    sortFun();
                })

                var cdata = data.subjects;
                var html = '';
                for (var i = 0; i < cdata.length; i++) {
                    var directorsArr = cdata[i].directors;
                    var directors = [];
                    var castsArr = cdata[i].casts;
                    var casts = [];
                    for (var j = 0; j < directorsArr.length; j++) {
                        directors.push(directorsArr[j].name);
                    }
                    for (var y = 0; y < castsArr.length; y++) {
                        casts.push(castsArr[y].name);
                    }
                    html += ['<li>',
                        '    			<a href="detail.html?subjectsId=' + cdata[i].id + '" class="movie_img"><img src=" ' + cdata[i].images.small + ' "></a>',
                        '    			<div class="movie_info">',
                        '    				<h5>' + cdata[i].title + '</h5>',
                        '    				<h5>' + cdata[i].id + '</h5>',
                        '    				<p class="rating">' + cdata[i].rating.average + '</p>',
                        '    				<p>导演：' + directors.join(" / ") + '</p>',
                        '    				<p>演员：' + casts.join(" / ") + '</p>',
                        '    			</div>',
                        '    		</li>'
                    ].join("");


                }
                $("#movelist").append(html);
            },
            error: function() {
                alert("请求失败");
            }
        })
    }
    getData();
})
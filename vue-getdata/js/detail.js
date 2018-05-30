$(function() {
    
    //详情页数据
    function getDetailData() {
        $.ajax({
            url: apiUrl+'/v2/movie/subject/'+id,
            type: 'get',
            dataType: 'json',
            success: function(res) {
              $("#header").html(res.title);
              // var detailimg=['<img src="'+res.images.large+'">'].join("");
              $(".detail_img").html('<img src="'+res.images.small+'" />');
              var motype=[];
              var county=[];
              //影片类型
              for(var i=0;i<res.genres.length;i++){
                motype.push(res.genres[i]);
              }
              //制片国家
              for(var i=0;i<res.countries.length;i++){
                county.push(res.countries[i]);
              }
              var movieinfo=['<h4>'+res.title+'</h4>',
'            <p>原名：'+res.original_title+'</p>',
'            <p>'+res.year+'/'+county.join(" / ")+'</p>',
'            <p>'+motype.join(" / ")+'</p>'].join("");
              $(".movieinfo").html(movieinfo);
              $(".move_sumary").html(res.summary);
              //影人
              var castcon="";
              for(var i=0;i<res.casts.length;i++){
                console.log(res.casts[i].avatars.small);
                castcon+='<li><img src="'+res.casts[i].avatars.small+'"></li>';
              }
              $(".castlist").html(castcon);
            },
            error: function() {
              // alert("获取失败");
            }
        })
    }
    getDetailData();
})
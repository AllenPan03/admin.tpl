/**
 * Created by panjunlin on 2016/10/27 0027.
 */
$(function(){
  $(".nav-list li").on("click",function(){
    var index = $(this).index();
    $(".outInfo ul").eq(index).show().siblings().hide();
  })
})

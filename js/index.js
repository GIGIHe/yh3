$(function(){
    $(".mfol li").click(function(){
        $(this).addClass('hover').siblings('li').removeClass('hover');
        $(".mfexa_type").eq($(this).index()).stop().slideDown(600).siblings(".mfexa_type").hide();
    })

    $(".point1").click(function(){
        $("html , body").animate({scrollTop:$(".m1").offset().top},400);
    });

    $(window).scroll(function(){
        // 注入ht
        var top = $(".zgm1").offset().top;//获取指定位置
        var scrollTop = $(window).scrollTop();
        if(scrollTop>top){
            $(".navbar").addClass('active');
        }else{
            $(".navbar").removeClass('active');
        }
    })

    $(".hjul li").each(function(index){
        $(this).click(function(){
            $(this).addClass('hover').siblings('li').removeClass('hover');
             $(".hjul_inner").hide().eq(index).fadeIn(200);
        })
    })
    $(".tabdl dd").each(function(index){
        $(this).click(function(){
            $(this).addClass('hover').siblings('dd').removeClass('hover');
             $(".table").hide().eq(index).fadeIn(200);
        })
    })


     var timer = setInterval(function(){
        var num = Math.floor(Math.random()*32);
        $(".calenda .course").hide()
        $(".calenda .course").eq(num).fadeIn()
        $(".calenda h4").removeClass("cur")
        $(".calenda h4").eq(num).addClass("cur")
        // console.log("num1",num)
    },1500)
   // $(".calenda td").each(function(index){
   //  $(this).hover(function(){
   //      // console.log(index)
   //      clearInterval(timer)
   //      $(".calenda h4").eq(index).hide()
   //      $(".calenda .course").hide()
   //      $(".calenda .course").eq(index).fadeIn()
   //      },function(){
   //              $(".calenda h4").eq(index).show()
   //              $(".calenda .course").hide()
   //               clearInterval(timer)
   //               timer = setInterval(function(){
   //              var num1 = Math.floor(Math.random()*32);
   //              // console.log("num2",num)
   //              $(".calenda .course").hide()
   //              $(".calenda .course").eq(num1).fadeIn()
   //              $(".calenda h4").removeClass("cur")
   //              $(".calenda h4").eq(num1).addClass("cur")
   //  },1500)
   //      });
   //  })
$(".calenda td").each(function(index){
    $(this).hover(function(){
        // console.log(index)
        clearInterval(timer)
       $(".calenda h4").removeClass("cur")
       $(".calenda h4").eq(index).addClass("cur")
        $(".calenda .course").hide()
        $(".calenda .course").eq(index).fadeIn()
         }
    // ,function(){
    //              clearInterval(timer)
    //              timer = setInterval(function(){
    //             var num1 = Math.floor(Math.random()*32);
    //             $(".calenda .course").hide()
    //             $(".calenda .course").eq(num1).fadeIn()
    //             $(".calenda h4").removeClass("cur")
    //             $(".calenda h4").eq(num1).addClass("cur")
    // },1500)
    //     }
    );
    })
    $(".pointer").click(function(){
        // var index = [-120,240,600,960]
        // var index = [1,2,3]
        // var i = Math.floor(Math.random()*4);
          $(".mask,.f_w").fadeIn()
        // var turntable = document.getElementById('plate');
        // turntable.style.transform = "rotate("+960+"deg)";
        // turntable.style.transform = "rotate("+index[i]+"deg)";
        // turntable.style.transform = "rotate("+240*index[i]+"deg)";
    })
    $('#dosubmit').click(function(){
        var info = {};
        info.name=$('#name').val()
        info.tel=$('#tel').val()
        info.xx=$('#xx').val()
        info.zy=$('#zy').val()
        info.yzm=$('#yzm').val()
        if(info.tel == '') { //验证手机号是否为空
            alert('请填写手机号');
            return false;
        }
        var reg = /^0?1[3465789]\d{9}$/; //手机号正则
        if(!reg.test(info.tel)) { //验证手机号是否正确
            alert('请填写正确的手机号!');
            return false;
        }
        $.ajax({
            url:"http://bj.offcn.com/index.php?m=formguide&c=forms&a=show&formid=321&action=jsonp&siteid=1&verify=true",
            data: {info},
            dataType:"jsonp",
            type:"GET",
            success:function(json){
                if(json.status == 1){
                    alert("提交成功");
                    $('#getyzm').show();
                    $('#daojishi').hide();
                     $(".f_w").hide();
                     $(".mask").hide()
                     setTimeout(function(){
                    var turntable = document.getElementById('plate');
                        turntable.style.transform = "rotate("+960+"deg)";
                     },1000)
                }else if(json.status == -1){
                    alert("已参与");
                      $('#getyzm').show();
                     $('#daojishi').hide();
                     $(".f_w").hide();
                     $(".mask").hide()
                }else if(json.status==-2){
                    alert("验证码错误");
                    $('#getyzm').show();
                    $('#daojishi').hide();
                }
            }
        })
    });
     function runcount(t) {
     if(t>0){
        document.getElementById('daojishi').innerHTML = t + 'S后重新获取';
          t--;
          setTimeout(function() {
            runcount(t)
          }, 1000)
        $('#getyzm').hide()
        $('#daojishi').show();
     }else{
         $('#getyzm').show();
         $('#daojishi').hide();
         }
      }
     $(".zg_close").click(function(){
       $(".mask,.f_w").hide()
    });
     // 发送验证码
    $("#getyzm").click(function(event) {
        var phone = $("#tel").val();
            $.ajax({
              url: 'http://bj.offcn.com/index.php?m=formguide&c=forms&a=send_sms&formid=321&siteid=1',
              type: 'GET',
              dataType: 'jsonp',
              data: {phone: phone},
              success: function(json) {
                if (json.status == 1) {
                    // $('#daojishi').css('display','inline-block')
                    // $('#getyzm').css('display','none')
                    $('#daojishi').show()
                    $('#getyzm').hide()
                    runcount(60)
                    alert('发送成功')
                }else {
                    alert(json.msg);

                }
            }
        })
    })
     $(".zg_close").click(function(){
       $(".mask,.f_w").hide()
    });
})
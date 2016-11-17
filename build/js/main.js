$(function(){
		 var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    pagination: '.swiper-pagination',
	    paginationClickable: true,
	    onSlideChangeEnd: function(swiper){
	        var i = swiper.activeIndex;
	        $('.swiper-slide').eq(i).addClass('current').siblings('.swiper-slide').removeClass('current');
    }
	  }) 
	  var index=0;
	  setInterval(timer,1000);
        function timer()  
            {  
                var ts = (new Date(2018, 11, 11, 9, 0, 0)) - (new Date()); 
                var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);
                var mm = parseInt(ts / 1000 / 60 % 60, 10); 
                var ss = parseInt(ts / 1000 % 60, 10);
                var timer= [checkTime(hh), checkTime(mm),checkTime(ss)];  
                $('.timer p').each(function(index){
                	$(this).attr('index',index)
                	.text(timer[$(this).attr('index')]);
                })
  
            }  
            function checkTime(i)    
            {    
               if (i < 10) {    
                   i = "0" + i;    
                }    
               return i;    
            }
	  	$(window).on('scroll',function(){			
				var scrollTop = $(window).scrollTop();
               console.log(scrollTop)
				var docHeight = $(document).height();
				var winHeight = $(window).height();
				if(scrollTop >= docHeight - winHeight){
						if(index==3){
							$('.all_buy').show();
							$('footer').show();
						return;
					}
					else{
					index++;
	
					ajax(showGoods);
					}

				}
		     if(scrollTop>=1022){
                	$('.icon-huidaodingbu').show();
                }
		     else{
		     	$('.icon-huidaodingbu').hide();
		     }
	
			});
		function ajax(fn){
			var i = (index == 1) ? index : index * 15;
				$.ajax({
						url:'http://diviner.jd.com/diviner?p=610009&uuid=12396477&lid='+i+'&lim=15&cb=tempGuessLikeCallback',
						dataType:'jsonp',
						scriptCharset:'gb2312',
						success:function(res){				
							var data = res.data;
							console.log(data);
							$.each(data,function(idx,obj){
							var clonde=$('.goods').eq(0).clone(true);
							
						     clonde.find('img').attr('src','http://img13.360buyimg.com/n1/s200x200_'+obj.img)
						     .next().text(obj.t).next().find('span').text(obj.jp);
						     clonde.appendTo('.like');
							if (typeof callback == 'function') {
								fn();
							}
                          })
						}
					});
		}
		function showGoods () {
				$('.goods:gt(1)').each(function (){
					$(this).animate({opacity:0.3}, 5000, function() {
						$(this).attr('src', $(this).attr('data-lazy-img')).animate({opacity: 1}, 5000);
					});
				})
			}
	})
	   
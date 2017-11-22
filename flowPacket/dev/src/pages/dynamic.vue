<template>
  <div class='warp'>
    <div class='content'>
      <div class='headbox'>
        <div class='headimg' :style='headimgStyle'></div>
        <div class='headDsc'>{{headDsc}}</div>
        <div class='headPv'>{{headPv}}</div>
      </div>
      <div class="dynamic_none" v-if='emptyNotice'>快来参加活动吧</div>
      <div class='dynamic_area' v-if='!emptyNotice'>
          <!-- 单条动态 -->
          <div class="dynamic-info">
            <div class="dynamic-main" :data-index='dynamicLong[index]' v-for='(data,index) in dynamicLong'>
              <div class="dynamic-tit">
                <div class="img-box">
                  <img :src='dynamicHeadArr[index]' :editor-index='dynamicUserId[index]'>
                </div>
                <div class="name">{{dynamicNameArr[index]}}</div>
              </div>
              <div class="dynamic-content">
                <p>
                  <span class="dynamicTag">{{actTag}}</span>
                  {{dynamicContentArr[index]}}
                </p>
                <div class='listBox' v-html='dynamicPicArr[index]'></div>
              </div>
              <div class="dynamic-date">
                <span>{{dynamicTimeArr[index]}}</span>
              </div>
              <div class="get_good">
                <a href="javascript:;" :class='{ active : commendedArr[index] }' @click='getGood(dynamicDataId[index],dynamicGoodNumArr[index],commendedArr[index],index)'>
                  {{dynamicGoodNumArr[index]}}
                </a>
              </div>
              <div class="division_bg"></div>
            </div>
          </div>

          <p class="load_tip" v-if='loadTip'>
            <div class="load_bg" v-if='loadTip'>
              <span></span>
            </div>
            <p class="gifload_2" v-if='loadTip'>加载中...<p>
          </p>
          <p class="load_end" v-if='loadEnd'>没有更多评论了</p>
        </div>

      </div>
      <div class="common-layer">
          <div class="layer-bg"></div>
          <div class="picture-browse">
              <div class="picture-browse-content swiper-container">
                  <ul class="swiper-wrapper">
                  </ul>
              </div>
          </div>
          <div class="img-page">
              (<span></span>/<em></em>)
          </div>
          <a href="javascript:;" class="close_2">关闭</a>
      </div>
      <a class="join_btn" @click='publishDynamic' :style='joinBtnStyle'>参加活动</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'init',
    data () {
      return {
        json : {
          sess_token: this.$common.common.$_GET('sess_token'),
          act_id: this.$common.common.$_GET('id'),
          model_idfa: this.$common.common.$_GET('model_idfa'),
        },
        pageTitle : '',
        href : 'https://www.hxsapp.com/download',
        loading : false,
        editorId : [60391],
        editorHref : 'https://hxsapp_user_info#',
        actId : '',
        actTag : '',
        actTagId : '',
        actType : '',
        joinBtnHref : '',
        joinBtnText : '',
        joinBtnStyle : null,
        emptyNotice : false,
        loadTip : false,
        loadEnd : false,
        headimgStyle : null,
        headDsc : '',
        headPv : '',

        //动态数组
        dynamicLong : [],
        dynamici : 0,
        dynamicHeadArr : [],
        dynamicNameArr : [],
        dynamicContentArr : [],
        dynamicTimeArr : [],
        dynamicGoodNumArr : [],
        dynamicPicArr : [],
        dynamicDataId : [],
        dynamicUserId : [],
        commendedArr : [],
        imgUrlArr : [],
      }
    },
    mounted(){
      var _this = this
      this.$common.actjs.resizeWindow();
      this.$common.actjs.init();
      this.$common.common.preLoading( "stressing" );

      this.headimgStyle = {
        'width' : '100%',
        'height' : '10.666667rem',
        'background' : '#f2f2f2',
      }

      this.$nextTick( function () {
        _this.shareFun();//分享数据
        _this.pv();//pv数据
        _this.listDynamic(_this.json);//加载动态
        _this.headbox();
        _this.init();
        _this.toEditor();
      })
    },
    methods: {
      init () {
        var _this = this
        this.showDynamic('.dynamic-content p img');
		    this.showDynamic('.dynamic-content .list-img-box span');

        //滑动加载10条动态
        $(window).scroll(function(){
          if($(window).scrollTop() + $(window).height() >= $('.headbox').height() + $('.dynamic_area').height()){
            var dataId = _this.dynamicDataId[_this.dynamicDataId.length - 1];
            if(!_this.loading && dataId){
              _this.loading = true;
              var listDynamicJson = {
                'act_id': _this.actId,
                type: 1,
                'last_id': dataId
              }
              _this.listDynamic(listDynamicJson);
            }
          }
        });

      },
      channelHref () {
        var _this = this
        this.$nextTick( function () {
          var ua = window.navigator.userAgent;
          var IsAndroid = new RegExp('Android').test(ua);
          var isAndroidQQ = new RegExp('Mobile MQQBrowser').test(ua);
          var MicroMessenger = new RegExp('MicroMessenger').test(ua);
          var isIos = new RegExp('iPhone').test(ua);
          var isIpad = new RegExp('iPad').test(ua);
          var isIosQQ = new RegExp(' QQ/').test(ua);
          this.href = ((IsAndroid && isAndroidQQ && !MicroMessenger) || (isIos && isIosQQ) || (isIpad && isIosQQ)) ? 'https://www.hxsapp.com/download' : this.href;
          $('.d_foot a').attr( 'href', this.href );
        })
      },
      shareFun () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/actInfo' , {params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              this.$common.actjs.shareFun(data.data.data);
              _this.actId = data.data.data.id
              _this.pageTitle = data.data.data.title
              document.title = data.data.data.title
            }
          })
      },
      headbox () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/tagInfo' , {params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.headDsc = data.data.data[0].desc
              _this.headimgStyle = {
                'width' : '100%',
                'height' : '10.666667rem',
                'background' : 'url(' + data.data.data[0].ico + ') top left no-repeat',
                'background-size' : '100% 100%'
              }
            }
          })
      },
      pv () {
        var _this = this
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/pv',{params:_this.json})
          .then(function(data){
            if( data.data.code == 200 ){
              _this.pvshow = true
              _this.pvnum = data.data.data.sum + '人参加'
              _this.headPv = data.data.data.sum + '人参加'
            }
          })
      },
      publishDynamic () {
        var _this = this
        if(this.$common.actjs.checklogin(this.href) == false){
          return false
        }
        if(!_this.actType){
          return false
        }
        if(_this.actType == 1){
          this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/checkEditorInfo',{params:_this.json})
            .then(function(data){
              if( data.data.code == 200 ){
                window.location.href = this.joinBtnHref
              }else{
                _this.$common.common.toastTip('.toast_tip', '活动还未开始呢', 1500);
              }
            })
        }else{
          window.location.href = this.joinBtnHref
        }
      },
      toEditor () {
        var _this = this
        $(document).on('click','.img-box img',function(){
          if(_this.$common.common.$_GET('shareType')){
            toastTip('.toast_tip', '快来下载好享瘦参加活动吧！', 2500);
            setTimeout(function () {
                window.location.href = _this.href;
            }, 500)
          }else{
            window.location.href = _this.editorHref + $(this).attr('editor-index')
          }
        })
      },
      listDynamic (json) {
        // $('.load_bg').show(); //dom操作
        var _this = this;
        if(_this.loadEnd){
          return
        }
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/getList',{params:json})
          .then(function(data){
            if(data.data.code == 200){
              var html = '';
              var _this = this;

              //loading数据
              _this.loading = true;
              _this.loadTip = true;

              _this.actTag = '#' + data.data.data.actList.tag + '#'
              _this.actTagId = data.data.data.actList.tag_Id

              //"act_status" // 活动状态  -1 活动结束 0 活动未开始 1 未参加活动 2 已参加活动
              _this.actType = parseInt(data.data.data.actList.act_status) + 1;
              var actStatus = parseInt(data.data.data.actList.act_status) + 1;
              var result = data.data.data.actList;
              var data = data.data.data.dynamicList;
              var actTimeText = '';

              this.joinBtnHref = 'https://hxsapp_newdynamic#' + _this.actId + '#' + result.tag + '#1'
              //参加按钮处理
              switch(actStatus){
                case 0:
                _this.joinBtnStyle = {
                  'background': '#c9c9c9'
                }
                _this.joinBtnText = '活动已结束'
                break;
                case 1:
                _this.joinBtnStyle = {
                  'background': '#00d092'
                }
                _this.joinBtnText = '敬请期待！'
                break;
                case 2:
                _this.joinBtnStyle = {
                  'background': '#00d092'
                }
                _this.joinBtnText = '参加活动'
                break;
                case 3:
                _this.joinBtnStyle = {
                  'background': '#00d092'
                }
                _this.joinBtnText = '参加活动'
                break;
              }

              //动态渲染
              if(data.length > 0){
                for(var i = 0;i < data.length;i++){
                  _this.dynamicLong.push(_this.dynamici)
                  _this.dynamici++
                  _this.imgUrlArr.push(data[i].images);
                  _this.dynamicHeadArr.push(data[i].head_img)
                  _this.dynamicNameArr.push(_this.subStlength(data[i].nickname, 6, 5))
                  _this.dynamicTimeArr.push(_this.TimeInfo(data[i].create_time, 1))
                  _this.dynamicGoodNumArr.push(_this.strShow(data[i].commend_num))
                  _this.dynamicPicArr.push(_this.pictureFormat(data[i].images))
                  _this.dynamicDataId.push(data[i].id)
                  _this.dynamicUserId.push(data[i].user_id)

                  //去除空格正则
                  var reg = data[i].content.replace(/\s/g,'');
                  var str = '#'+ reg.match(/#(\S*)#/)[1] +'#';
                  _this.dynamicContentArr.push(reg.substring(str.length))
                  var have = '';
                  if(data[i].is_commend == 'yes'){
                    _this.commendedArr.push(true);
                  }else{
                    _this.commendedArr.push(false);
                  }
                }

                // 无可奈何的Dom操作
                $('.get_good a').css({
                  'margin-left': - ($('.get_good a').width()/2 + 26/2)
                });

                //图片大图预览计算滑动容器父宽度 子高宽度
                var pictureBrowseLi = $('.common-layer .picture-browse li');
                  pictureBrowseLi.css({
                      width: $(window).width(),
                      height: $(window).height() - 120
                  });
                _this.showDynamic('.dynamic-content p img');
		            _this.showDynamic('.dynamic-content .list-img-box span');
              }else{
                _this.loadEnd = true
                _this.loading = false
                _this.loadTip = false
              }
              //loading结束
              _this.loading = false
              _this.loadTip = false
            }
          })
      },
      getGood (dataId,goodnum,type,index) {
        var _this = this
        var json = {
          'sess_token' : this.$common.common.$_GET('sess_token'),
          'act_id' : _this.actId,
          'data_id' : dataId,
        }
        if(this.$common.actjs.checklogin(_this.href) == false){
          return false
        }

        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userActCommend/doCommend',{params:json})
          .then(function(data){
            if(data.data.code == 200){
              var number = 0;
              number = parseInt(goodnum);

              if(!number){number = 0}
              number = number + parseInt(data.data.num);

              //Vue.set会报错因为在这个模板没有import Vue
              //Vue.set(_this.commendedArr, 0, false);
              if(!type){
                _this.$set(_this.dynamicGoodNumArr, index, number);
                _this.$set(_this.commendedArr, index, true);
              }else{
                _this.$set(_this.dynamicGoodNumArr, index, number);
                _this.$set(_this.commendedArr, index, true);
              }

            }

            _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500);
          })
      },
      //创建图片展示格式
      pictureFormat(res){
        var _this = this
        var pictureHtml = ''
        var picHeight = ''
        if(res){
          if(res.length == 1 || res.length == 2){
            var model1 = '';
            for(var i = 0; i < res.length;i++){
              model1 += '<span class="mpic" data-index="' + i + '" style="background:url(' + res[i]  + ') center center no-repeat; background-size:180%;"></span>';
            }
            model1 = '<p class="list-img-box">' + model1+ '</p>';
            pictureHtml = model1
          }else if(res.length >= 2){
            var model1 = '';
            var model2 = '';
            var model3 = '';
            for(var i = 0;i < res.length;i++){
              if(i < 3){
                model1 += '<span class="spic" data-index="' + i + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
              }else if(i >= 3 && i <= 5){
                model2 += '<span class="spic" data-index="' + i + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
              }else if(i > 5){
                model3 += '<span class="spic" data-index="' + i + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
              }
            }
            model1 = '<p class="list-img-box">' + model1+ '</p>';
            if(model2)model2 = '<p class="list-img-box">' + model2 + '</p>';
            if(model3)model3 = '<p class="list-img-box">' + model3 + '</p>';
            pictureHtml = model1 + model2 + model3;
          }
        }
        return pictureHtml;
      },
      showDynamic (obj) {
        var _this = this
        var swiperOuterHTML = '';
		    var Now = 0;
        var UserAgent = window.navigator.userAgent;
		    $(document).on('click', obj, function(){
          $('.picture-browse ul').empty();
          //九宫格补全
          var parentsIndex = $(this).parents('.dynamic-main').attr('data-index');
          var imgUrl = _this.imgUrlArr[parentsIndex];
          if(imgUrl){
            var pictureBrowseLiWidth = imgUrl.length * $(window).width();
            $('.common-layer .picture-browse ul').css('width', pictureBrowseLiWidth);
            //放大图片预览
            var pictureHTML = '';
            for(var i = 0;i < imgUrl.length;i++){
              pictureHTML += '<li class="swiper-slide"><div class="swiper-zoom-container"><img src="' + _this.bigImagesUrl(imgUrl[i]) + '"></div></li>';
            }
            $('.picture-browse ul').html(pictureHTML);
          }

		    	var imgIndex = $(this).attr('data-index');
		    	if(imgIndex || imgIndex == 0){
			      $('.common-layer').css('height','100%');
			    	//滑动图片
			    	if(swiperOuterHTML){
			    		$('.picture-browse').prepend(swiperOuterHTML);
			    	}

            var pictureBrowseLiWidth = imgUrl.length * $(window).width();
            $('.common-layer .picture-browse ul').css('width', pictureBrowseLiWidth);
            $('.picture-browse ul').html(pictureHTML);
            //滑动图片时显示的图片总数
            $('.common-layer .img-page em').text(imgUrl.length);
            $('.img-page span').text(parseInt(imgIndex) + 1);

				    swiperOuterHTML = $('.picture-browse-content').prop('outerHTML');
	    			if(UserAgent.indexOf('iPhone') !=-1 || UserAgent.indexOf('iPad') !=-1){
					    var swiper = new Swiper('.swiper-container', {
                zoom: true,
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoHeight: true,
                initialSlide : imgIndex,
                onSlideChangeStart: function(swiper){
                    $('.img-page span').text(parseInt(swiper.activeIndex) + 1);
                }
					    });
				    }else{
					    var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoHeight: true,
                initialSlide : imgIndex,
                onSlideChangeStart: function(swiper){
                    $('.img-page span').text(parseInt(swiper.activeIndex) + 1);
                }
					    });
				    }
		    	}
		    });
        //隐藏图片预览
        $(document).on('click', '.common-layer .close_2', function(){
        $('.picture-browse-content').remove();
            $('.common-layer').css('height','0%');
        });

        //
        $(document).on('click','.common-layer .picture-browse li',function(){
        $('.picture-browse-content').remove();
            $('.common-layer').css('height','0%');
        });
		  },
      //图片预览转大图
      bigImagesUrl (url) {
        var result = url.split('?');
        result = result[0]+'?x-oss-process=style/medium';
        return result;
      },
      TimeInfo(str,state){
        var date = str.substring(5);
        var hour = str.substring(0,str.length-5);
        if(state){
          var arr = date.split('-');
        }else{
          var arr = date.split('.');
        }
        var time = arr[0] + '-' + arr[1];
        arr = time.split(' ');
        if(state){
          time = arr[0] + ' ' + arr[1].substring(0, arr[1].length-3);
        }else{
          time = arr[0] + ' ' + arr[1];
        }
        return time;
      },
      //字符串超出部分显示省略号
      subStlength (str, maxLength, targetLength) {
        if(str){
        var reg= /^[A-Za-z]+$/;
        var re =  /^[0-9a-zA-Z]*$/g;
        if (reg.test(str) || re.test(str)){
          if(str.length > 2 * maxLength )str = str.substring(0, 2 * targetLength) + '...';
        }else{
          if(str.length > maxLength )str = str.substring(0,targetLength) + '...';
        }

        }
        return str;
      },
      //点赞为0隐藏数字
      strShow(nun){
        var strText=nun==0?'':nun;
        return strText;
      },
    },
  }
</script>
<style lang="less">
  @import './../assets/common/reset.less';
  @import './../assets/common/dynamicOld.css';
  @import './../assets/common/dynamic.less';
</style>
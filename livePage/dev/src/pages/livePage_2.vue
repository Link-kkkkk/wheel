<template>
  <div class='warp'>
    <div class='content'>
      <div class='headbox'>
        <!-- <div class='headimg' :style='headimgStyle'></div> -->
        <!-- <div class='headDsc'>{{headDsc}}</div>
                <div class='headPv'>{{headPv}}</div> -->
        <div class="rightBox">
          <div class='headimg' :style='headimgStyle'></div>
        </div>
        <div class="leftBox">
          <div class="headTextBox">
            <p>万圣节，糖果大作战，让肥肉见“鬼”去吧！好享瘦要您DIY最健康的万圣节糖果</p>
          </div>
          <div class="headBoxFoot">
            <div class='headBoxFootBtn' @click='showRule()'>查看规则</div>
            <div class="headBoxFootPv" @click='notice()'>{{headPv}}</div>
          </div>
        </div>
      </div>

      <ul class="editorBox" v-infinite-scroll="editorLoadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check='false'>
        <!-- 单条编辑动态 -->
        <!-- <transition name="liveEditorLine">
                                        <div class="editorloadingIcon" v-show='editorReloading'></div>
                                      </transition> -->
        <!-- <div class="emptyNotice" v-if="editorEmpty">
                              <p>没有更多动态了</p>
                            </div> -->
        <transition name="liveEditorLine">
          <li class="dynamic-info" v-show='!editorReloading'>
            <div class="dynamic-main" :data-index='eddynamicLong[index]' v-for='(data,index) in eddynamicLong' :key='index'>
              <div class="dynamic-tit">
                <div class="img-box">
                  <img :src='eddynamicHeadArr[index]' :editor-index='eddynamicUserId[index]'>
                </div>
                <div class="name">{{eddynamicNameArr[index]}}</div>
              </div>
              <div class="dynamic-content">
                <p>
                  <span class="dynamicTag">{{actTag}}</span>
                  {{eddynamicContentArr[index]}}
                </p>
                <div class='listBox' v-html='eddynamicPicArr[index]'></div>
              </div>
              <div class="dynamic-date">
                <span>{{eddynamicTimeArr[index]}}</span>
              </div>
            </div>
          </li>
        </transition>

        <div class="loadingNotice" v-show='editorloading'>
          <mt-spinner type="double-bounce" color='#00d092'></mt-spinner>
          <p>加载中...</p>
        </div>
        <div class="load_end loadingNotice" v-if="editorend">
          <p>没有更多动态了</p>
        </div>
      </ul>

      <div class="dynamic_none" v-if='emptyNotice'>{{emptyNoticeText}}</div>
      <div class='dynamic_area' v-if='!emptyNotice'>
        <!-- 单条动态 -->
        <div class="dynamic_area_title" :style="dynamicAreaTitlePosi">
          <p>直播粉丝专区</p>
        </div>
        <div class="dynamic-info">
          <div class="dynamic-main" :data-index='dynamicLong[index]' v-for='(data,index) in dynamicLong' :key='index'>
            <div class="dynamic-tit">
              <div class="userHead img-box">
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
        <div class="load_end loadingNotice" v-show="loadTip">
          <mt-spinner type="double-bounce" color='#00d092'></mt-spinner>
          <p>加载中...</p>
        </div>
        <div class="load_end loadingNotice" v-if="loadEnd">
          <p>没有更多评论了</p>
        </div>
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
        (
        <span></span>/
        <em></em>)
      </div>
      <a href="javascript:;" class="close_2">关闭</a>
    </div>

    <a class="join_btn" @click='publishDynamic' :style='joinBtnStyle'>{{joinBtnText}}</a>
    <transition name='fade'>
      <div class='layerBack' v-show='layerblack'></div>
    </transition>
    <transition name='down'>
      <div class="ruleBox" v-show='ruleBox'>
        <div class='close' @click='clearLayer'></div>
        <div class="rule">
          <p>1.点击底部“我有话要说”按钮，参与发表动态。</p>
          <p>2.直播过程中，我们将会随机提出5条问题。</p>
          <p>3.每个问题我们将会在回答正确的用户中抽出一名，送出体脂称一个。</p>
          <p>4.获奖礼品：工作人员在活动结束后3个工作日内以电话形式与中奖者联系确认，确认信息后3个工作日内邮寄</p>
        </div>
      </div>
    </transition>
    <share :actData='actData'></share>
    <down></down>
  </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import com from './../util/common'
import share from './../components/shareInfo'
import down from './../components/down'
export default {
  name: 'init',
  components: {
    share,
    down
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      json: {
        sess_token: this.$common.common.$_GET('sess_token'),
        act_id: this.$common.common.$_GET('id'),
        model_idfa: this.$common.common.$_GET('model_idfa')
      },
      pageTitle: '',
      href: 'https://www.hxsapp.com/download',
      editorHref: 'https://hxsapp_user_info#',
      actData: {
        act_id: com.$_GET('id')
      },
      actId: '',
      actTag: '',
      actTagId: '',
      actType: '',
      joinBtnHref: '',
      joinBtnText: '',
      joinBtnStyle: null,
      emptyNotice: false,
      loadTip: false,
      loadEnd: false,
      headimgStyle: null,
      headDsc: '',
      headPv: '',
      ruleBox: false,
      layerblack: false,
      emptyNoticeText: '快来参加活动吧',
      dynamicAreaTitlePosi: {
        'position': 'relative'
      },
      // 动态数组
      dynamicLong: [],
      dynamici: 0,
      dynamicHeadArr: [],
      dynamicNameArr: [],
      dynamicContentArr: [],
      dynamicTimeArr: [],
      dynamicGoodNumArr: [],
      dynamicPicArr: [],
      dynamicDataId: [],
      dynamicUserId: [],
      commendedArr: [],
      imgUrlArr: [],
      // 小编数组
      firstLoad: true,
      editorEmpty: false,
      newEditorDataid: '',
      editorReloading: false,
      editorloading: false,
      editorend: false,
      eddynamicLong: [],
      eddynamici: 0,
      eddynamicHeadArr: [],
      eddynamicNameArr: [],
      eddynamicContentArr: [],
      eddynamicTimeArr: [],
      eddynamicGoodNumArr: [],
      eddynamicPicArr: [],
      eddynamicDataId: [],
      eddynamicUserId: [],
      edimgUrlArr: [],
    }
  },
  mounted() {
    var _this = this
    this.$common.actjs.resizeWindow();
    this.$common.actjs.init();
    this.$common.common.preLoading("stressing");

    this.headimgStyle = {
      'width': '6.5rem',
      'height': '6.5rem',
      'background': '#dedede',
    }

    this.$nextTick(function() {
      _this.shareFun();//分享数据
      _this.pv();//pv数据
      _this.getEditorList(_this.json); //加载小编动态
      _this.hotEditorList() //实时刷新
      _this.listDynamic(_this.json); //加载动态
      _this.headbox();
      _this.init();
      _this.toEditor();

    })
  },
  methods: {
    init() {
      var _this = this
      this.showDynamic('.dynamic-content p img');
      this.showDynamic('.dynamic-content .list-img-box span');
      //滑动加载10条动态
      // var e = $('.dynamic_area_title').offset().top
      $(window).scroll(function() {
        if ($(window).scrollTop() / 25 > 19) {
          _this.dynamicAreaTitlePosi = {
            'position': 'fixed',
            'top': '0',
            'z-index': '5'
          }
        } else {
          _this.dynamicAreaTitlePosi = {
            'position': 'relative',
            'top': 'auto',
            'z-index': '5'
          }
        }

        if ($(window).scrollTop() + $(window).height() >= $('.headbox').height() + $('.dynamic_area').height()) {
          var dataId = _this.dynamicDataId[_this.dynamicDataId.length - 1];
          if (!_this.loading && dataId) {
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
    clearLayer() {
      this.layerblack = false;
      this.ruleBox = false;
    },
    showRule() {
      this.$common.common.buriedPoint('查看规则', '查看规则');
      this.layerblack = true;
      this.ruleBox = true;
    },
    shareFun() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/actInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            // this.$common.actjs.shareFun(data.data.data);
            _this.actId = data.data.data.id
            _this.pageTitle = data.data.data.title
            document.title = data.data.data.title
          }
        })
    },
    headbox() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/userDynamic/tagInfo', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.headDsc = data.data.data[0].desc
            _this.headimgStyle = {
              'width': '6.5rem',
              'height': '6.5rem',
              'background': 'url(' + data.data.data[0].ico + ') top left no-repeat',
              'background-size': '100% 100%'
            }
          }
        })
    },
    pv() {
      var _this = this
      this.$http.jsonp(_this.$common.common._ACTHOST + '/base/Api/pv', { params: _this.json })
        .then(function(data) {
          if (data.data.code == 200) {
            _this.pvshow = true
            _this.pvnum = data.data.data.sum + '人参加'
            _this.headPv = data.data.data.sum + '人参加'
          }
        })
    },
    publishDynamic() {
      var _this = this
      if (this.$common.actjs.checklogin(this.href) == false) {
        console.log('未登录')
        return false
      }
      // if (!_this.actType) {
      //   return false
      // }
      if (_this.actType == 1) {
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/Clive/isEditor', { params: _this.json })
          .then(function(data) {
            if (data.data.code == 200) {
              if (data.data.data.flag == 1) {
                _this.$common.common.buriedPoint('小编发表动态', '小编发表动态');
                window.location.href = this.joinBtnHref
              } else {
                _this.$common.common.toastTip('.toast_tip', '活动还未开始呢', 1500);
              }
            } else {
              _this.$common.common.toastTip('.toast_tip', '活动还未开始呢', 1500);
            }
          })
      } else if (_this.actType == 0) {
        _this.$common.common.toastTip('.toast_tip', '活动已结束', 1500);
      } else {
        _this.$common.common.buriedPoint('用户发表评论', '用户发表评论');
        window.location.href = this.joinBtnHref
      }
    },
    //小编动态下拉加载
    editorLoadMore() {
      var _this = this
      if (this.editorend || this.editorReloading) {
        return
      }
      this.editorloading = true;
      setTimeout(() => {
        var dataId = _this.eddynamicDataId[_this.eddynamicDataId.length - 1];
        if (dataId) {
          var editorJson = {
            'act_id': _this.actId,
            type: 1,
            'last_id': dataId
          }
          _this.getEditorList(editorJson);
        }
        this.editorloading = false;
      }, 1000);
    },
    toEditor() {
      var _this = this
      $(document).on('click', '.userHead img', function() {
        if (_this.$common.common.$_GET('shareType')) {
          toastTip('.toast_tip', '快来下载好享瘦参加活动吧！', 2500);
          setTimeout(function() {
            window.location.href = _this.href;
          }, 500)
        } else {
          window.location.href = _this.editorHref + $(this).attr('editor-index')
        }
      })
    },
    notice() {
      let notice = Toast({
        message: '有新的动态',
        position: 'top',
        duration: 1500
      });
    },
    hotEditorList() {
      var _this = this
      var timer = setInterval(() => {
        // 监测数据是否变动
        this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/Clive/editorList', { params: _this.json })
          .then(function(data) {
            if (data.data.code == 200) {
              var data = data.data.data.dynamicList;
              if (data.length > 0) {
                if (data[0].id === _this.newEditorDataid) {
                  return false
                } else {
                  //刷新数组
                  _this.editorReloading = true
                  _this.editorend = false

                  // 插入第一条
                  var html = '';
                  if (data.length > 0) {
                    _this.eddynamicLong.unshift(_this.eddynamici)
                    _this.eddynamici++
                    _this.edimgUrlArr.unshift(data[0].images);
                    _this.eddynamicHeadArr.unshift(data[0].head_img)
                    _this.eddynamicNameArr.unshift(_this.subStlength(data[0].nickname, 6, 5))
                    _this.eddynamicTimeArr.unshift(_this.TimeInfo(data[0].create_time, 1))
                    _this.eddynamicGoodNumArr.unshift(_this.strShow(data[0].commend_num))
                    _this.eddynamicPicArr.unshift(_this.pictureFormat(data[0].images, 'editor'))
                    _this.eddynamicDataId.unshift(data[0].id)
                    _this.eddynamicUserId.unshift(data[0].user_id)
                    _this.newEditorDataid = data[0].id
                    //去除空格正则
                    var reg = data[0].content.replace(/\s/g, '');
                    var str = '#' + reg.match(/#(\S*)#/)[1] + '#';
                    _this.eddynamicContentArr.unshift(reg.substring(str.length))

                    // let notice = Toast({
                    //   message: 'Upload Complete',
                    //   position: 'top',
                    //   duration: 1500
                    // });
                    _this.notice()
                  } else {
                    clearInterval(timer)
                  }

                  // 重载结束
                  setTimeout(() => {
                    _this.editorReloading = false
                  }, 100)
                }
              }
            }
          })

      }, 5000)
    },
    getEditorList(json) {
      var _this = this;
      if (_this.editorend) {
        return
      }

      this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/Clive/editorList', { params: json })
        .then(function(data) {
          if (data.data.code == 200) {
            var html = '';
            var _this = this;

            var data = data.data.data.dynamicList;

            //动态渲染
            if (data.length > 0) {
              // 最新的小编文章ID
              _this.newEditorDataid = data[0].id
              for (var i = 0; i < data.length; i++) {
                _this.eddynamicLong.push(_this.eddynamici)
                _this.eddynamici++
                _this.edimgUrlArr.push(data[i].images);
                _this.eddynamicHeadArr.push(data[i].head_img)
                _this.eddynamicNameArr.push(_this.subStlength(data[i].nickname, 6, 5))
                _this.eddynamicTimeArr.push(_this.TimeInfo(data[i].create_time, 1))
                _this.eddynamicGoodNumArr.push(_this.strShow(data[i].commend_num))
                _this.eddynamicPicArr.push(_this.pictureFormat(data[i].images, 'editor'))
                _this.eddynamicDataId.push(data[i].id)
                _this.eddynamicUserId.push(data[i].user_id)

                //去除空格正则
                var reg = data[i].content.replace(/\s/g, '');
                var str = '#' + reg.match(/#(\S*)#/)[1] + '#';
                _this.eddynamicContentArr.push(reg.substring(str.length))
              }
            } else {
              _this.editorend = true
            }

            // if (_this.eddynamicLong.length == 0) {
            //   _this.editorEmpty = true
            // }
          }
        })
    },
    listDynamic(json) {
      // $('.load_bg').show(); //dom操作
      var _this = this;
      if (_this.loadEnd) {
        return
      }
      this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/Clive/userList', { params: json })
        .then(function(data) {
          if (data.data.code == 200) {
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
            switch (actStatus) {
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
                _this.emptyNoticeText = '活动尚未开始，敬请期待！'
                break;
              case 2:
                _this.joinBtnStyle = {
                  'background': '#00d092'
                }
                _this.joinBtnText = '我有话要说'
                break;
              case 3:
                _this.joinBtnStyle = {
                  'background': '#00d092'
                }
                _this.joinBtnText = '我有话要说'
                break;
            }

            //动态渲染
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                _this.dynamicLong.push(_this.dynamici)
                _this.dynamici++
                _this.imgUrlArr.push(data[i].images);
                _this.dynamicHeadArr.push(data[i].head_img)
                _this.dynamicNameArr.push(_this.subStlength(data[i].nickname, 6, 5))
                _this.dynamicTimeArr.push(_this.TimeInfo(data[i].create_time, 1))
                _this.dynamicGoodNumArr.push(_this.strShow(data[i].commend_num))
                _this.dynamicPicArr.push(_this.pictureFormat(data[i].images, 'user'))
                _this.dynamicDataId.push(data[i].id)
                _this.dynamicUserId.push(data[i].user_id)

                //去除空格正则
                var reg = data[i].content.replace(/\s/g, '');
                var str = '#' + reg.match(/#(\S*)#/)[1] + '#';
                _this.dynamicContentArr.push(reg.substring(str.length))
                var have = '';
                if (data[i].is_commend == 'yes') {
                  _this.commendedArr.push(true);
                } else {
                  _this.commendedArr.push(false);
                }
              }

              // 无可奈何的Dom操作
              $('.get_good a').css({
                'margin-left': - ($('.get_good a').width() / 2 + 26 / 2)
              });

              //图片大图预览计算滑动容器父宽度 子高宽度
              var pictureBrowseLi = $('.common-layer .picture-browse li');
              pictureBrowseLi.css({
                width: $(window).width(),
                height: $(window).height() - 120
              });
              _this.showDynamic('.dynamic-content p img');
              _this.showDynamic('.dynamic-content .list-img-box span');
            } else {
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
    getGood(dataId, goodnum, type, index) {
      var _this = this
      var json = {
        'sess_token': this.$common.common.$_GET('sess_token'),
        'act_id': _this.actId,
        'data_id': dataId,
      }
      if (this.$common.actjs.checklogin(_this.href) == false) {
        return false
      }
      _this.$common.common.buriedPoint('用户点赞', '用户点赞');
      this.$http.jsonp(_this.$common.common._ACTHOST + '/dynamic/Clive/commend', { params: json })
        .then(function(data) {
          if (data.data.code == 200) {
            var number = 0;
            number = parseInt(goodnum);

            if (!number) { number = 0 }
            number = number + parseInt(data.data.num);

            //Vue.set会报错因为在这个模板没有import Vue
            //Vue.set(_this.commendedArr, 0, false);
            if (!type) {
              _this.$set(_this.dynamicGoodNumArr, index, number);
              _this.$set(_this.commendedArr, index, true);
            } else {
              _this.$set(_this.dynamicGoodNumArr, index, number);
              _this.$set(_this.commendedArr, index, true);
            }

          }
          _this.$common.common.toastTip('.toast_tip', data.data.msg, 1500);
        })
    },
    //创建图片展示格式
    pictureFormat(res, type) {
      var _this = this
      var pictureHtml = ''
      var picHeight = ''
      if (res) {
        if (res.length == 1 || res.length == 2) {
          var model1 = '';
          for (var i = 0; i < res.length; i++) {
            model1 += '<span class="mpic" data-index="' + i + '" data-type="' + type + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
          }
          model1 = '<p class="list-img-box">' + model1 + '</p>';
          pictureHtml = model1
        } else if (res.length >= 2) {
          var model1 = '';
          var model2 = '';
          var model3 = '';
          for (var i = 0; i < res.length; i++) {
            if (i < 3) {
              model1 += '<span class="spic" data-index="' + i + '" data-type="' + type + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
            } else if (i >= 3 && i <= 5) {
              model2 += '<span class="spic" data-index="' + i + '" data-type="' + type + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
            } else if (i > 5) {
              model3 += '<span class="spic" data-index="' + i + '" data-type="' + type + '" style="background:url(' + res[i] + ') center center no-repeat; background-size:180%;"></span>';
            }
          }
          model1 = '<p class="list-img-box">' + model1 + '</p>';
          if (model2) model2 = '<p class="list-img-box">' + model2 + '</p>';
          if (model3) model3 = '<p class="list-img-box">' + model3 + '</p>';
          pictureHtml = model1 + model2 + model3;
        }
      }
      return pictureHtml;
    },
    showDynamic(obj) {
      var _this = this
      var swiperOuterHTML = '';
      var Now = 0;
      var UserAgent = window.navigator.userAgent;
      $(document).on('click', obj, function() {
        $('.picture-browse ul').empty();
        //九宫格补全
        var parentsIndex = $(this).parents('.dynamic-main').attr('data-index');
        var parentsType = $(this).attr('data-type');
        if (parentsType == 'user') {
          var imgUrl = _this.imgUrlArr[parentsIndex];
        } else if (parentsType == 'editor') {
          var imgUrl = _this.edimgUrlArr[parentsIndex];
        }

        if (imgUrl) {
          var pictureBrowseLiWidth = imgUrl.length * $(window).width();
          $('.common-layer .picture-browse ul').css('width', pictureBrowseLiWidth);
          //放大图片预览
          var pictureHTML = '';
          for (var i = 0; i < imgUrl.length; i++) {
            pictureHTML += '<li class="swiper-slide"><div class="swiper-zoom-container"><img src="' + _this.bigImagesUrl(imgUrl[i]) + '"></div></li>';
          }
          $('.picture-browse ul').html(pictureHTML);
        }

        var imgIndex = $(this).attr('data-index');
        if (imgIndex || imgIndex == 0) {
          $('.common-layer').css('height', '100%');
          //滑动图片
          if (swiperOuterHTML) {
            $('.picture-browse').prepend(swiperOuterHTML);
          }

          var pictureBrowseLiWidth = imgUrl.length * $(window).width();
          $('.common-layer .picture-browse ul').css('width', pictureBrowseLiWidth);
          $('.picture-browse ul').html(pictureHTML);
          //滑动图片时显示的图片总数
          $('.common-layer .img-page em').text(imgUrl.length);
          $('.img-page span').text(parseInt(imgIndex) + 1);

          swiperOuterHTML = $('.picture-browse-content').prop('outerHTML');
          if (UserAgent.indexOf('iPhone') != -1 || UserAgent.indexOf('iPad') != -1) {
            var swiper = new Swiper('.swiper-container', {
              zoom: true,
              pagination: '.swiper-pagination',
              paginationClickable: true,
              autoHeight: true,
              initialSlide: imgIndex,
              onSlideChangeStart: function(swiper) {
                $('.img-page span').text(parseInt(swiper.activeIndex) + 1);
              }
            });
          } else {
            var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              autoHeight: true,
              initialSlide: imgIndex,
              onSlideChangeStart: function(swiper) {
                $('.img-page span').text(parseInt(swiper.activeIndex) + 1);
              }
            });
          }
        }
      });
      //隐藏图片预览
      $(document).on('click', '.common-layer .close_2', function() {
        $('.picture-browse-content').remove();
        $('.common-layer').css('height', '0%');
      });

      //
      $(document).on('click', '.common-layer .picture-browse li', function() {
        $('.picture-browse-content').remove();
        $('.common-layer').css('height', '0%');
      });
    },
    //图片预览转大图
    bigImagesUrl(url) {
      var result = url.split('?');
      result = result[0] + '?x-oss-process=style/medium';
      return result;
    },
    TimeInfo(str, state) {
      var date = str.substring(5);
      var hour = str.substring(0, str.length - 5);
      if (state) {
        var arr = date.split('-');
      } else {
        var arr = date.split('.');
      }
      var time = arr[0] + '-' + arr[1];
      arr = time.split(' ');
      if (state) {
        time = arr[0] + ' ' + arr[1].substring(0, arr[1].length - 3);
      } else {
        time = arr[0] + ' ' + arr[1];
      }
      return time;
    },
    //字符串超出部分显示省略号
    subStlength(str, maxLength, targetLength) {
      if (str) {
        var reg = /^[A-Za-z]+$/;
        var re = /^[0-9a-zA-Z]*$/g;
        if (reg.test(str) || re.test(str)) {
          if (str.length > 2 * maxLength) str = str.substring(0, 2 * targetLength) + '...';
        } else {
          if (str.length > maxLength) str = str.substring(0, targetLength) + '...';
        }

      }
      return str;
    },
    //点赞为0隐藏数字
    strShow(nun) {
      var strText = nun == 0 ? '' : nun;
      return strText;
    },
  },
}
</script>
<style lang="less">
@import './../assets/common/reset.less';
@import './../assets/common/dynamicOld.css';
@import './../assets/common/dynamic.less';
@import './../assets/common/live.less';
.headbox {
  // height: 7.666667rem;
  background: #dedede;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  .rightBox{
    width: calc(~'28%' - 20px);
    padding: 20px;
  }
  .leftBox {
    width: 72%;
    .headTextBox {
      padding: 20px 12.5px;
      p {
        font-size: .933333rem;
        color: #6a6156;
      }
    }
    .headBoxFoot {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      font-size: .933333rem;
      padding: 0 12.5px 20px 12.5px;
      .headBoxFootBtn {
        color: #FFF;
        background: #f28416;
        padding: 4px 10px;
        margin-top: -4px;
        border-radius: 20px;
        cursor: pointer;
      }
      .headBoxFootPv {
        color: #6a6156;
      }
    }
  }
}

.dynamic_area_title {
  border-bottom: 1px solid #ccc;
  padding: 15px 0 15px 20px;
  background-color: #FFF;
  width: calc(~'100%' - 30px);
  p {
    border-left: 3px solid #39d9ab;
    padding-left: .4rem;
    font-weight: 600;
  }
}

.ruleBox {
  font-size: .866667rem;
  .rule {
    padding: 5rem 1rem 1rem 1rem;
    line-height: 1.75em;
    overflow: hidden;
  }
}

.editorBox {
  height: 18rem;
  position: relative;
  width: 100%;
  background: #f2f2f2;
  overflow: auto;
  .dynamic-main {
    padding: 10px 0 5px 0;
  }
  .dynamic-date {
    padding: 12px 10px 10px 63px;
  }
  .dynamic-info .dynamic-main {
    background: #f2f2f2;
  }
  .dynamic-content p {
    line-height: 21.5px;
  }
  .emptyNotice {
    text-align: center;
    margin: 5rem 0 0 0;
    font-size: 14px;
    color: #666;
  }
}

.editorBox::-webkit-scrollbar {
  display: none
}

.load_tip {
  text-align: center;
  .icon {
    display: inline;
  }
}

.dynamic_none {
  margin: 20px 0;
}
</style>
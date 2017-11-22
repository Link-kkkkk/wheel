
function jPrismPlayerStyle(obj) {
  $('.playerDiv_none').css({
    height: playerHeight,
    display: 'block'
  });

  $('.prism-play-btn').css({
    'float': 'left',
    'margin-left': '12px',
    'margin-right': '10px',
    'margin-top': '15px'
  });

  $('.new-prism-play-btn').css({
    'width': '35px',
    'height': '35px',
    'position': 'absolute',
    'left': '12px',
    'margin-right': '10px',
    'top': '15px'
  });

  $('.prism-play-btn.playing').css({
    'float': 'left',
    'margin-left': '12px',
    'margin-right': '10px',
    'margin-top': '15px'
  });

  $('.prism-time-display').css({
    'float': 'left',
    'margin-left': '0',
    'margin-top': '15px'
  });

  $('.prism-fullscreen-btn').css({
    'float': 'right',
    'margin-right': '11px',
    'margin-left': '11px',
    'margin-top': '21px'
  });

  //播放按钮居中
  $('.prism-big-play-btn').css({
    left: '50%',
    top: '50%',
    bottom: 'auto',
    'margin-left': '-30px',
    'margin-top': '-30px'
  });

  //时间容器变长
  var playerHeight = $(window).width() * 0.5625;
  var prismTimeWidth = $(window).width() - ($('.prism-play-btn').width() + 12 + 10) - ($('.prism-fullscreen-btn').width() + 11 + 11);
  prismTimeWidth = prismTimeWidth;
  $('.prism-time-display').css({
    width: prismTimeWidth
  });
  $('.playerDiv_none').css({
    height: playerHeight
  });

  var prismControlbarWidth = $('.prism-time-display').width() - (30 + 7 + 30 + 7 + 2);
  prismControlbarWidth = prismControlbarWidth;
  $('.prism-progress').css({
    width: prismControlbarWidth
  });

  $('.prism-player .prism-progress').css({
    left: ($('.prism-play-btn').width() + 12 + 10 + 39 - 4),
    top: '29px'
  });

  $('.time-bound').html('');
  $('.time-bound').css({
    display: 'none'
  });
}

//非wifi网络,展示网络提示 wifi other none
function netWorkState(State) {
  if (State == 'other') {
    $('.netWork').show();
  } else {
    $('.new-prism-play-btn').hide();
    player.play();
    $('.prism-player .prism-fullscreen-btn').show();
    if (clickTrue && !type) {
      $('#J_prismPlayer,.jPlayer').attr('state', '1');
      $.getJSON(_HOST + '/base/media/incrMediaPlay?callback=?', playerJson, function (data) { });
      clickTrue = false;
    }
  }
}

function netWorkPlay(moreMyUserAgent, player, playerHeight, playerJson, clickTrue, type) {
  moreMyUserAgent(function (Version) {
    if (Version >= 2.8 && Version) {
      $('.prism-controlbar').append('<a href="javascript" class="new-prism-play-btn"></a>');
      $('.network-tip').css('height', playerHeight);

      $('.new-prism-play-btn').click(function () {
        setTimeout(function () {
          window.location.href = 'https://hxsapp_get_network_state';
        }, 30);
        window.location.href = 'https://hxsapp_set_audio_info#pause';
      });

      $('.network-tip').click(function () {
        $('.new-prism-play-btn').hide();
        $('.prism-player .prism-fullscreen-btn').show();
        $('.netWork').hide();
        player.play();
      });
    }
  })
}
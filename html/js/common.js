// 모바일때 클래스 추가하기
$(document).ready(function() {
  function checkWindowSize() {
    if ($(window).width() <= 480) {
      $('body').addClass('mo_mode');
      $('body').removeClass('pc_mode');
    } else {
      $('body').removeClass('mo_mode');
      $('body').addClass('pc_mode');
    }
  }
  // 페이지 로드 시 및 창 크기 변경 시 실행
  checkWindowSize();
  $(window).resize(function() {
    checkWindowSize();
  });
});

// 탑버튼
$(document).ready(function() {
  var lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수

  // 'top' 버튼 클릭 시 화면 최상단으로 스크롤
  $('#top').click(function() {
    window.scroll({
       top: 0,
       left: 0,
       behavior: "smooth"
     });
  });

  // 스크롤 위치에 따라 'top' 버튼 표시/숨김
  $(window).scroll(function() {
    var currentScrollTop = $(this).scrollTop();

    // 스크롤 위치가 상위 100 이하인 경우 버튼 숨김
    if (currentScrollTop <= 100) {
      $('#top').fadeOut();
    } else {
      // 스크롤 내리기: 버튼 숨김
      if (currentScrollTop > lastScrollTop) {
        $('#top').fadeOut();
      } else { // 스크롤 올리기: 버튼 보임
        $('#top').fadeIn();
      }
    }

    // 현재 스크롤 위치를 마지막 스크롤 위치로 업데이트
    lastScrollTop = currentScrollTop;
  });
});

// 모달 레이어
// 모달 레이어
function modalControl(type, id, size) { // type: 열기(o), 닫기(c) / id: 열 모달의 id / size: 모달 가로 사이즈
    var $html = $("html");
    
    if (type == "o") { // 모달 열기
        $html.addClass("modal-open"); // 모달 열리면 스크롤 방지

        // keep 클래스가 없는 모달들만 닫음
        $(".modal_new").not(".keep").not(id).removeClass("modal_on");
        
        var $modalOn = $(id).addClass("modal_on");

        // 모달에 modal_overlay 클래스가 있을 때만 오버레이 클릭 시 닫기
        if ($modalOn.hasClass("modal_overlay")) {
            $modalOn.on("click", function(e) {
                // 클릭한 부분이 .modal_n_wrap 내부가 아니라면 (즉, 오버레이 클릭 시)
                if (!$(e.target).closest('.modal_n_wrap').length) {
                    $modalOn.removeClass("modal_on");
                    if ($(".modal_new.modal_on").length === 0) {
                        $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
                    }
                }
            });
        }
    } else if (type == "c") { // 모달 닫기
        // 모든 모달을 닫음 (keep 클래스가 있어도 닫음)
        $(".modal_new.modal_on").removeClass("modal_on");

        if ($(".modal_new.modal_on").length === 0) {
            $html.removeClass("modal-open"); // 모든 모달이 닫히면 스크롤 해제
        }
    }
}



// 상세검색 열기
$(document).ready(function(){
  // search_cont_detail 안의 btn_search 버튼 클릭 시 on 클래스 추가
  $('.btn_search_detail').on('click', function() {
    $('.search_cont_detail').addClass('on');
  });

  // search_cont_detail 안의 btn_close 버튼 클릭 시 on 클래스 제거
  $('.search_cont_detail .btn_close').on('click', function() {
    $(this).closest('.search_cont_detail').removeClass('on');
  });
});

// 커스텀 스크롤 속도
$(document).ready(function(){
  $(".mCustomScrollbar").mCustomScrollbar({
      theme: "dark",
      scrollInertia: 100, // Adjust the scroll speed (lower values mean faster scroll)
      mouseWheel: {
          scrollAmount: 80 // Adjust this value to control scroll speed (higher values for faster scroll)
      }
  });
});

// 셀렉트 박스
$(document).ready(function() {
  $('.select_box .select').on('click', function() {
    var $currentSelectBox = $(this).closest('.select_box');
    var $currentOption = $currentSelectBox.find('.option');

    // 모든 select_box의 옵션 목록을 숨기고, on 클래스를 제거
    $('.select_box').not($currentSelectBox).each(function() {
      var $otherOption = $(this).find('.option');
      $otherOption.hide();
      $(this).removeClass('on');
    });

    // 현재 클릭된 select_box의 옵션 목록을 토글
    if ($currentOption.is(':visible')) {
      $currentOption.hide();
      $currentSelectBox.removeClass('on');
    } else {
      $currentOption.show();
      $currentSelectBox.addClass('on');
    }
  });

  $('.select_box .option ul li').on('click', function() {
    var $selectBox = $(this).closest('.select_box');
    var selectedText = $(this).text();
    
    // 선택된 항목 텍스트 업데이트
    $selectBox.find('.select').text(selectedText);
    $selectBox.find('.option').hide();
    $selectBox.removeClass('on');
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest('.select_box').length) {
      $('.select_box .option').hide();
      $('.select_box').removeClass('on');
    }
  });
});

// 셀렉트 박스 select_box option 에 마우스가 올라가면 페이지 scroll 생기지 않게 막기
// $(document).ready(function() {
//   var scrollTop = 0; // 현재 스크롤 위치를 저장할 변수

//   $('.pc_mode .select_box .option').hover(
//     function() {
//       // 마우스가 .select_box 위에 있을 때
//       scrollTop = $(window).scrollTop(); // 현재 스크롤 위치 저장
//       $('html').css({
//         'overflow-y': 'scroll',
//         'position': 'fixed',
//         'top': -scrollTop + 'px', // 현재 스크롤 위치 유지
//         'left': '0px',
//         'width': '100%'
//       });
//     },
//     function() {
//       // 마우스가 .select_box 밖으로 나갔을 때
//       $('html').css({
//         'overflow-y': '',
//         'position': '',
//         'top': '',
//         'left': '',
//         'width': ''
//       });
//       $(window).scrollTop(scrollTop); // 원래 위치로 스크롤 복원
//     }
//   );

//   // .option 영역 내에서 클릭했을 때도 CSS 초기화
//   $('.pc_mode .select_box .option').on('click', function() {
//     $('html').css({
//       'overflow-y': '',
//       'position': '',
//       'top': '',
//       'left': '',
//       'width': ''
//     });
//     $(window).scrollTop(scrollTop); // 원래 위치로 스크롤 복원
//   });
// });

// 모바일에서 select_box 눌렀을때
// $(document).ready(function() {
//   var scrollTop = 0; // 현재 스크롤 위치를 저장할 변수

//   // .select_box에 on 클래스가 추가될 때 처리
//   $('.select_box').on('classChange', function() {
//     if ($('body').hasClass('mo_mode') && $(this).hasClass('on')) {
//       // 현재 스크롤 위치 저장
//       scrollTop = $(window).scrollTop();
//       // 스크롤 및 위치 고정
//       $('html').css({
//         'overflow-y': 'scroll',
//         'position': 'fixed',
//         'top': -scrollTop + 'px', // 현재 스크롤 위치 유지
//         'left': '0px',
//         'width': '100%'
//       });
//     } else {
//       // .select_box에서 on 클래스가 제거될 때 스크롤 및 위치 초기화
//       $('html').css({
//         'overflow-y': '',
//         'position': '',
//         'top': '',
//         'left': '',
//         'width': ''
//       });
//     }
//   });

//   // MutationObserver를 사용하여 .select_box의 클래스 변화를 감지
//   var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//       if (mutation.attributeName === 'class') {
//         $(mutation.target).trigger('classChange');
//       }
//     });
//   });

//   // .select_box 요소들에 대해 MutationObserver를 적용
//   $('.select_box').each(function() {
//     observer.observe(this, { attributes: true });
//   });
// });

// 모바일 상세검색 레이어 searchlayer
function searchLayer() {
  // .searchlayer 요소에 left: 0; 스타일 적용
  $('.searchlayer').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function searchClose() {
  // .searchlayer 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.searchlayer').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 모바일 마이페이지 레이어 mypagelayer
function mypagelayer() {
  // .mypagelayer 요소에 left: 0; 스타일 적용
  $('.mypagelayer').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function mypageClose() {
  // .mypagelayer 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.mypagelayer').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 모바일 상세검색 레이어 gnbLayer01
function gnbLayer01() {
  // .gnbLayer01 요소에 left: 0; 스타일 적용
  $('.gnbLayer01').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function gnbLayer01Close() {
  // .gnbLayer01 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.gnbLayer01').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}
// 모바일 상세검색 레이어 gnbLayer02
function gnbLayer02() {
  // .gnbLayer02 요소에 left: 0; 스타일 적용
  $('.gnbLayer02').css('left', '0');
  // body에 leftmode 클래스 추가
  $('body').addClass('leftmode');
}
function gnbLayer02Close() {
  // .gnbLayer02 요소의 left 값을 -100%로 초기화하여 숨기기
  $('.gnbLayer02').css('left', '-100%');
  // body에서 leftmode 클래스 제거
  $('body').removeClass('leftmode');
}

// 검색결과 x 버튼 누를때
$(document).ready(function() {
  // .btn_del 버튼 클릭 시 해당 li 삭제
  $('.search_total').on('click', '.btn_del', function() {
    $(this).closest('li').remove();
  });
});

// pc 검색영역 마우스 포커스 일때
$(document).ready(function() {
  let isMouseInSearchTotal = false;

  // input 요소에 포커스가 가면 active 클래스 추가
  $('.search_box .ico_search').on('focus', function() {
    $('.search_total').addClass('active');
  });

  // input 요소에서 포커스가 빠지면 active 클래스 제거 (단, 마우스가 search_total에 없을 때만)
  $('.search_box .ico_search').on('blur', function() {
    if (!isMouseInSearchTotal) {
      $('.search_total').removeClass('active');
    }
  });

  // search_total에 마우스가 들어오면 active 클래스 유지
  $('.search_total').on('mouseenter', function() {
    isMouseInSearchTotal = true;
    $(this).addClass('active');
  });

  // search_total에서 마우스가 나가면 active 클래스 제거 (단, input이 포커스 상태가 아닐 때만)
  $('.search_total').on('mouseleave', function() {
    isMouseInSearchTotal = false;
    if (!$('.search_box .ico_search').is(':focus')) {
      $(this).removeClass('active');
    }
  });
});

// 탭
$(document).ready(function() {
  $('.tab-menu li a').click(function(e) {
    e.preventDefault(); // 링크 기본 동작 방지

    var index = $(this).parent().index(); // 클릭한 탭의 인덱스 가져오기

    // 탭 메뉴 활성화 클래스 전환
    $('.tab-menu li').removeClass('active');
    $(this).parent().addClass('active');

    // 탭 콘텐츠 활성화 클래스 전환 (인덱스 기준으로 매칭)
    $('.tab').removeClass('active');
    $('.tab').eq(index).addClass('active');
  });
});

// 테이블에 체크박스 중복눌림 제어
$(document).ready(function() {
  // tr 클릭 시 data-href로 이동
  $('.clickable-row').on('click', function() {
    window.location.href = $(this).data('href');
  });

  // 체크박스 클릭 시 이벤트 전파를 막음
  $('.no-click').on('click', function(event) {
    event.stopPropagation();  // 부모 tr의 클릭 이벤트 전파를 막음
  });
});

// input del btn
$(document).ready(function() {
  // input에 내용이 있을 때 'on' 클래스 추가
  $('.input_del input').on('input', function() {
    if ($(this).val().length > 0) {
      $(this).closest('.input_del').addClass('on');
    } else {
      $(this).closest('.input_del').removeClass('on');
    }
  });

  // 삭제 버튼 클릭 시 input 내용 지우기
  $('.input_del .del').on('click', function() {
    $(this).siblings('input').val(''); // input 내용 지우기
    $(this).closest('.input_del').removeClass('on'); // 'on' 클래스 제거
  });
});

// input view
$(document).ready(function() {
  // input에 내용이 있을 때 'on' 클래스 추가, 없으면 제거
  $('.input_view input').on('input', function() {
    if ($(this).val().length > 0) {
      $(this).closest('.input_view').addClass('on');
    } else {
      $(this).closest('.input_view').removeClass('on');
    }
  });
  // 비밀번호 보기/숨기기 버튼 클릭 시
  $('.input_view .view').on('click', function(e) {
    e.preventDefault(); // 버튼의 기본 동작 방지
    var $input = $(this).siblings('input'); // 형제 input 요소 선택

    // 비밀번호 필드 타입이 'password'이면 'text'로 바꿔서 보여주기, 아니면 다시 'password'로 바꿈
    if ($input.attr('type') === 'password') {
      $input.attr('type', 'text');
      $(this).addClass('active'); // 버튼에 active 클래스 추가 (눈 모양 바꾸기 등 시각 효과)
    } else {
      $input.attr('type', 'password');
      $(this).removeClass('active'); // active 클래스 제거
    }
  });
});

// 파일첨부
$(document).ready(function () {
  var $dropArea = $(".file-drop");
  var $fileInput = $(".file-input");

  // 파일 드래그 앤 드롭 이벤트 처리
  $dropArea.on("dragover", function (e) {
      e.preventDefault();
      $(this).addClass("drag-over");
  });

  $dropArea.on("dragleave", function () {
      $(this).removeClass("drag-over");
  });

  $dropArea.on("drop", function (e) {
      e.preventDefault();
      $(this).removeClass("drag-over");

      var files = e.originalEvent.dataTransfer.files;
      var $fileList = $(this).find(".file-list");
      handleFiles(files, $fileList);
  });

  // 파일 선택 시 처리
  $fileInput.on("change", function () {
      var files = this.files;
      var $fileList = $(this).closest(".file-drop").find(".file-list");
      handleFiles(files, $fileList);
  });

  // 파일 처리 함수
  function handleFiles(files, $fileList) {
      for (var i = 0; i < files.length; i++) {
          var file = files[i];
          var listItem = $("<li class='file-item'></li>");
          var fileNameSpan = $("<span class='file-info'>" + file.name + "</span>");
          var fileSizeSpan = $("<span class='file-info'> (" + formatBytes(file.size) + ")</span>");
          var deleteBtn = $("<span class='delete-btn'>&times;</span>");

          listItem.append(fileNameSpan);
          listItem.append(fileSizeSpan);
          listItem.append(deleteBtn);

          deleteBtn.on("click", function () {
              $(this).parent().remove();
          });

          $fileList.append(listItem);
      }
  }

  // 파일 크기 포맷팅 함수
  function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
});


// 설문조사 상세 아코디언
$(document).ready(function () {
  $(".accordion button").click(function () {

    // 클릭한 버튼의 부모인 li에서만 다음 sibling인 depth2를 빠르게 보이거나 감춤
    $(this).parent().find(".accordion-detail").slideToggle(150);
    // 클릭한 버튼의 부모인 li에 on 클래스를 토글
    $(this).parent().toggleClass("on");

    // 다른 depth1 항목들의 on 클래스 제거 및 각 항목의 depth2 감추기
    // $(".accordion .on").not($(this).parent()).removeClass("on");
    // $(".accordion .accordion-detail").not($(this).parent().find(".accordion-detail")).slideUp(300);
  });
});

// view_check 안에 input check 에 check 가 되면 view 를 보여주는 제이쿼리
$(document).ready(function () {
  $('.view_check input[type="checkbox"]').on('change', function () {
    if ($(this).is(':checked')) {
      $('.view').addClass('on'); // 체크되면 'on' 클래스 추가
    } else {
      $('.view').removeClass('on'); // 체크 해제되면 'on' 클래스 제거
    }
  });
});

// 피씨 GNB 메뉴
$(document).ready(function() {
  // .menu_layer 클릭 시
  $('.menu_layer').on('click', function() {
    // 모든 .menu_layer에서 'on' 클래스 제거
    $('.menu_layer').removeClass('on');
    // 클릭한 항목에 'on' 클래스 추가
    $(this).addClass('on');
  });

  // .btn_layer_close 클릭 시 모든 .menu_layer에서 'on' 클래스 제거
  $('.btn_layer_close').on('click', function() {
    $('.menu_layer').removeClass('on');
  });
});

// 피씨 GNB 메뉴 메뉴 열렸을떄 동작
$(document).ready(function() {
  // 클릭 핸들러
  function handleClick(depthClass, nextClass) {
    $(depthClass + ' > a').click(function(e) {
      // 클릭한 항목 안에 ul이 있는지 확인
      if ($(this).siblings('ul').length > 0) {
        e.preventDefault(); // ul이 있을 때만 a 태그의 기본 동작을 막음
        // 모든 해당 depth에서 'on' 클래스 제거
        $(depthClass).removeClass('on');
        // 클릭한 항목에 'on' 클래스 추가
        $(this).parent().addClass('on');
        // list_box > ul의 클래스를 변경
        $('.list_box > ul').removeClass('on_depth01 on_depth02 on_depth03').addClass(nextClass);
      }
      // ul이 없으면 기본 동작이 가능하므로 e.preventDefault()를 호출하지 않음
    });
  }

  // depth 클릭 핸들러 설정
  handleClick('.depth01', 'on_depth02');
  handleClick('.depth02', 'on_depth03');

  // depth03 클릭 시
  $('.depth03 > a').click(function(e) {
    // 클릭한 항목 안에 ul이 있는지 확인
    if ($(this).siblings('ul').length > 0) {
      e.preventDefault(); // ul이 있을 때만 a 태그의 기본 동작을 막음
      // 모든 depth03에서 'on' 클래스 제거
      $('.depth03').removeClass('on');
      // 클릭한 depth03에 'on' 클래스 추가
      $(this).parent().addClass('on');
      // list_box > ul의 클래스를 on_depth03으로 변경
      $('menu_layer.on .list_box > ul').removeClass('on_depth01 on_depth02').addClass('on_depth03');
    }
    // ul이 없으면 기본 동작이 가능하므로 e.preventDefault()를 호출하지 않음
  });

  // btn_layer_close 버튼 클릭 시 초기화
  $('.btn_layer_close').click(function() {
    // 모든 depth 메뉴에서 'on' 클래스 제거
    $('.depth01, .depth02, .depth03').removeClass('on');
    // list_box > ul의 클래스를 on_depth01으로 초기화
    $('.list_box > ul').removeClass('on_depth02 on_depth03').addClass('on_depth01');
  });
});







































// //javascript
// function openWindowPop(url, name){
//     var options = 'top=10, left=10, width=500, height=555, status=no, menubar=no, toolbar=no, resizable=no';
//     window.open(url, name, options);
// }

// // 탭
// $(document).ready(function() {
//     $(".input_btn_area button").on("click", function() {
//       $(".input_btn_area button").removeClass("on"); // input_btn_area 버튼에서 on 클래스 제거
//       $(this).addClass("on"); // 클릭한 버튼에 on 클래스 추가
//     });

//     $(".table_btn_area button").on("click", function() {
//       $(this).parent().find("button").removeClass("on"); // table_btn_area 안에서 버튼들의 on 클래스 제거
//       $(this).addClass("on"); // 클릭한 버튼에 on 클래스 추가
//     });
// });


// // 메인 레이어 공지 팝업
// function imgNotiShow(action) {
//   if (action === 'c') {
//     $('.img_noti_show').hide(); // 해당 클래스를 감추는 방법을 사용합니다. show()를 사용하면 다시 보일 수 있습니다.
//   }
// }
// // 메인 배너 sub 레이어 닫기
// function imgShow(action) {
//   if (action === 'c') {
//     $('.img_show').hide(); // 해당 클래스를 감추는 방법을 사용합니다. show()를 사용하면 다시 보일 수 있습니다.
//   }
// }

// // tooltip
// $(document).ready(function() {
//     const button = $('.tooltipBtn');
//     const tooltip = $('.tooltip');
//     const close = $('.tooltip_cont .close');

//     button.on('click', function() {
//       // 현재 버튼과 연결된 툴팁만 조작합니다.
//       const thisButton = $(this);
//       const thisTooltip = thisButton.next('.tooltip');

//       // 이미 열려있는 툴팁인지 확인하여 토글 동작을 수행합니다.
//       if (thisTooltip.hasClass('on')) {
//         thisTooltip.removeClass('on');
//       } else {
//         // 모든 툴팁을 일단 닫은 후에 클릭한 버튼에 연결된 툴팁만 엽니다.
//         tooltip.removeClass('on');
//         thisTooltip.addClass('on');
//       }
//     });

//     close.on('click', function() {
//       // 현재 닫기 버튼과 연결된 툴팁만 닫습니다.
//       const thisTooltip = $(this).closest('.tooltip');
//       thisTooltip.removeClass('on');
//     });

//     $(document).on('click', function(event) {
//       // 열려있는 툴팁들 중에서 클릭 이벤트가 발생한 대상이 툴팁이 아니며 버튼도 아닌 경우 닫습니다.
//       const openTooltips = $('.tooltip.on');
//       if (!openTooltips.is(event.target) && openTooltips.has(event.target).length === 0 &&
//           !button.is(event.target)) {
//         openTooltips.removeClass('on');
//       }
//     });
// });

// // 카테고리
// $(document).ready(function () {
//   var $overlay = $(".overlay");
//   var $menuContainer = $(".menu-container");
//   var $btnCategory = $(".btn_category");

//   $btnCategory.click(function () {
//     // Toggle the overlay and menu container
//     $overlay.toggle();
//     $menuContainer.toggleClass("active");

//     // Prevent body scrolling when the menu is open
//     $("body").toggleClass("no-scroll");
//   });

//   $overlay.click(function () {
//     // Close the menu when clicking on the overlay
//     $overlay.hide();
//     $menuContainer.removeClass("active");
//     $("body").removeClass("no-scroll");
//   });
// });

// // 즐겨찾기
// $(document).ready(function() {
//   // link_wish 클래스가 있는 a 태그를 클릭했을 때
//   $("a.link_wish").click(function(e) {
//     e.preventDefault(); // 기본 클릭 이벤트 방지

//     // 클릭된 요소에 active 클래스 추가 및 제거
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//     } else {
//       $(this).addClass("active"); // 클릭된 요소에 active 클래스 추가
//     }
//   });
// });
// // 추천상품 더보기
// $(document).ready(function() {
//   $('.more_btn').click(function() {
//       var $recomendList = $('.recomend_list');

//       if ($(this).hasClass('show')) {
//           $(this).removeClass('show');
//           $recomendList.removeClass('show');
//       } else {
//           $(this).addClass('show');
//           $recomendList.addClass('show');
//       }
//   });
// });
// // 이 상품을 찾으셨나요?
// $(document).ready(function() {
//   // btn arrow를 클릭하면 find_box에 on 클래스 추가
//   $('.find_product_cont .btn.arrow').click(function() {
//       $('.find_product_cont .find_box').addClass('on');
//   });

//   // btn_close를 클릭하면 find_box의 on 클래스 제거
//   $('.find_product_cont .btn_close').click(function() {
//       $('.find_product_cont .find_box').removeClass('on');
//   });
// });

// // GNB 메뉴 스크립트
// $(document).ready(function() {
//   // Add mouseenter event handler to .menu-item .more within .menu-container
//   $('.menu-container .menu-item > .more').mouseenter(function() {
//     // Add class 'on' to the corresponding sub_menu
//     $(this).closest('.menu-item').find('.sub_menu').addClass('on');
//   });

//   // Add mouseleave event handler to .menu-item .more within .menu-container
//   $('.menu-container .menu-item > .more').mouseleave(function() {
//     // Remove class 'on' from the corresponding sub_menu
//     $(this).closest('.menu-item').find('.sub_menu').removeClass('on');
//   });

//   // Add mouseenter event handler to .sub_menu
//   $('.menu-container .sub_menu').mouseenter(function() {
//     // Add class 'on' to the corresponding sub_menu
//     $(this).addClass('on');
//   });

//   // Add mouseleave event handler to .sub_menu
//   $('.menu-container .sub_menu').mouseleave(function() {
//     // Remove class 'on' from the corresponding sub_menu
//     $(this).removeClass('on');
//   });

//   // Add mouseenter event handler to .menu-container
//   $('.menu-container').mouseenter(function() {
//     // Remove class 'on' from all sub_menu elements
//     $('.menu-container .sub_menu').removeClass('on');
//   });
// });

// // 퀵메뉴
// $(document).ready(function() {
//   // 버튼 클릭 이벤트 핸들러
//   $(document).on("click", ".btn_group, .btn_quick_open, .btn_quick_close", function() {
//     var i = $(this).attr("data-target");
//     var g = $(i).attr("data-group");

//     $("[data-group='" + g + "']").not(i).removeClass("on");
//     $(i).toggleClass("on");

//     // 퀵메뉴 클릭 시 컨텐츠 왼쪽으로 밀림
//     if ($(i).hasClass("on")) {
//       $(".move").addClass("on");
//       $(".left_cont_area").addClass("on");
//       adjustMarginRight();
//     } else {
//       $(".move").removeClass("on");
//       $(".left_cont_area").removeClass("on");
//       adjustMarginRight();
//     }
//   });

//   // 퀵메뉴 닫기 버튼 클릭 이벤트
//   $('.btn_quick_close').click(function() {
//     $('.btn_quick_open').removeClass('on');
//     $('.quick_menu_area').removeClass('on');
//   });

//   // 퀵메뉴 열기 버튼 클릭 이벤트
//   $(document).ready(function() {
//     // btn_quick_open 버튼 클릭 이벤트
//     $('.btn_quick_open').click(function() {
//       $(this).toggleClass('on'); // btn_quick_open에 on 클래스 토글
//       if ($(this).hasClass('on')) {
//         // on 클래스가 추가될 때 rnb_list에도 on 클래스 추가
//         $('.rnb_list').addClass('on');
//         $('.quick_menu_area').removeClass('on');
//       } else {
//         // on 클래스가 제거될 때 rnb_list에서도 on 클래스 제거
//         $('.rnb_list').removeClass('on');
//         $('.move').removeClass('on');
//         $('.left_cont_area').removeClass('on');
//       }
//     });

//     // rnb_list에서 on 클래스가 제거될 때, 관련 클래스에서도 on 클래스 제거
//     $('.rnb_list').on('classChange', function() {
//       if (!$(this).hasClass('on')) {
//         $('.move').removeClass('on');
//         $('.left_cont_area').removeClass('on');
//       }
//     });

//     // rnb_list 클래스 변경 감지
//     var observer = new MutationObserver(function(mutations) {
//       mutations.forEach(function(mutation) {
//         if (mutation.attributeName === 'class') {
//           $(mutation.target).trigger('classChange');
//         }
//       });
//     });

//     $('.rnb_list').each(function() {
//       observer.observe(this, {
//         attributes: true
//       });
//     });
//   });

// // 퀵 메뉴 열렸을때 content_wrap 이 좌측으로 밀리는 코드
//   function adjustMarginRight() {
//     var windowWidth = $(window).width();
//     var newMarginRight = -(windowWidth - 2550); // 음수 값으로 설정

//     $('.content_wrap').each(function() {
//       if ($(this).hasClass('on')) {
//         $(this).css('margin-right', newMarginRight + 'px');
//       } else {
//         $(this).css('margin-right', '0'); // on 클래스가 없을 때 0으로 설정
//       }
//     });
//   }

//   // 페이지 로드 시 초기 설정
//   adjustMarginRight();

//   // on 클래스가 추가될 때 마진을 조정
//   $('.content_wrap').on('classChange', function() {
//     adjustMarginRight();
//   });

//   // 창 크기 변경 시 마진을 재조정
//   $(window).resize(function() {
//     adjustMarginRight();
//   });

//   // left_cont_area 클릭 시 처리
//   /*$('.left_cont_area').click(function() {
//     var contentWrap = $('.content_wrap');

//     // toggle the class on content_wrap
//     contentWrap.toggleClass('on');

//     // trigger the custom classChange event
//     contentWrap.trigger('classChange');
//   });*/
// });

// // 탭 hover 이벤트
// $(document).ready(function() {
//   // Function to handle tab item hover
//   $('.tab_list .tab-menu .tab-item').mouseenter(function() {
//     var $tabMenu = $(this).closest('.tab-menu');
//     var index = $(this).index();

//     // Add active class to hovered tab item and corresponding tab pane
//     $tabMenu.find('.tab-item').removeClass('active');
//     $(this).addClass('active');
//     $tabMenu.siblings('.tab-content').children('.tab-pane').removeClass('active');
//     $tabMenu.siblings('.tab-content').children('.tab-pane').eq(index).addClass('active');
//   });
// });

// $(document).ready(function() {
//   // 탭 항목 클릭 이벤트 처리
//   $('.tab_list_click .tab-menu .tab-item').click(function() {
//     var $tabMenu = $(this).closest('.tab-menu'); // 현재 탭 메뉴 찾기
//     var index = $(this).index(); // 현재 탭 항목의 인덱스 찾기

//     // 모든 탭 항목에서 active 클래스 제거
//     $tabMenu.find('.tab-item').removeClass('active');
//     // 현재 탭 항목에 active 클래스 추가
//     $(this).addClass('active');

//     // 모든 탭 내용에서 active 클래스 제거
//     $tabMenu.siblings('.tab-content').children('.tab-pane').removeClass('active');
//     // 현재 탭 항목에 대응하는 탭 내용에 active 클래스 추가
//     $tabMenu.siblings('.tab-content').children('.tab-pane').eq(index).addClass('active');
//   });
// });

// // 카테고리 펼침, 닫힘
// $(document).ready(function() {
//   $('.ico_category').click(function() {
//     // Toggle the 'on' class for ico_category
//     $(this).toggleClass('on');

//     // Find the target element with data-target="tab-category"
//     var target = $('[data-target="tab-category"]');

//     // Check if the 'on' class is added or removed
//     if ($(this).hasClass('on')) {
//       // If 'on' class is added, change the text to "카테고리 닫힘"
//       $(this).text("카테고리 닫힘");
//       // Add 'on' class to the target element
//       target.addClass('on');
//     } else {
//       // If 'on' class is removed, change the text to "카테고리 펼침"
//       $(this).text("카테고리 펼침");
//       // Remove 'on' class from the target element
//       target.removeClass('on');
//     }
//   });
// });

// $(document).ready(function (){
//   // Entire menu (over)
//   function navOn(){
//     $(this).siblings(".nav").find("[data-depth='1']").addClass("on");
//   };
//   $(document).on("mouseenter", ".nav_wrap > a", navOn);

//   // Entire menu (leave)
//   function navOff(){
//     $(this).find(".on").removeClass("on");
//   };
//   $(document).on("mouseleave", ".nav_wrap", navOff);

//   // menu depth (over)
//   function depthOn(){
//     var n = 1;
//     var depth = $(this).parents("[data-depth]"); //Current selection - depth 'selection'
//     var depthNumber = parseInt(depth.attr("data-depth")); //Current selection - depth 'value'
//     var depthLength = $(this).closest(".nav_wrap").find("[data-depth]").length; //Total depth 'number'
//     var group = $(this).parent().attr("data-group"); //Current selection - data-group 'value'
//     var childGroup = $(this).closest(".nav_wrap").find("ul[data-group='" + group + "']"); // Current selection - connected child ul 'selection'

//     // current selection li
//     $(this).parent().addClass("on").siblings().removeClass("on");

//     // Current selection - connected child ul
//     childGroup.addClass("on").siblings().removeClass("on").parent().addClass("on");
//     childGroup.parents("[data-depth]").addClass("on");

//     // Current selection - child children (condition)
//     for( i=n; i<=depthLength; i++ ){
//       //Current selection - If there are no children (all lower children are turned off)
//       if(childGroup.length == 0){
//         n = 0;
//       }

//       var closeDepth = $(this).closest(".nav_wrap").find("[data-depth='" + (depthNumber + i + n) + "']"); //Current selection - connected child depth 'selection'

//       closeDepth.removeClass("on").find(".on").removeClass("on");
//     };
//   };
//   $(document).on("mouseenter", ".nav_wrap .nav li > a", depthOn);
// });

// // 퀵메뉴 장바구니 미리보기 (중복되는 경우)
// // $(document).ready(function(){
// //   $(".btn_sub_cont").click(function(){
// //       // 클릭된 버튼의 부모 요소 중에서 st_body_cont 클래스를 찾아서 on 클래스를 추가하거나 제거함
// //       $(this).closest(".st_body_cont").toggleClass("on");
// //       // 클릭된 버튼의 클래스 on을 추가하거나 제거함
// //       $(this).toggleClass("on");
// //   });
// // });

// // 퀵메뉴 장바구니 미리보기 (중복되지 않는 경우)
// // $(document).ready(function(){
// //   $(".btn_sub_cont").click(function(){
// //       var stBodyCont = $(this).closest(".st_body_cont");
// //       var btnSubCont = $(this);

// //       if (!btnSubCont.hasClass("on")) {
// //           // 다른 .st_body_cont 요소에서 on 클래스 제거
// //           $(".st_body_cont").removeClass("on");
// //           // 현재 클릭된 버튼의 부모 요소에만 on 클래스 추가
// //           stBodyCont.addClass("on");
// //           // 모든 btn_sub_cont 요소에서 on 클래스 제거
// //           $(".btn_sub_cont").removeClass("on");
// //           // 현재 클릭된 버튼에만 on 클래스 추가
// //           btnSubCont.addClass("on");
// //       } else {
// //           // 현재 클릭된 버튼의 부모 요소에만 on 클래스 제거
// //           stBodyCont.removeClass("on");
// //           // 현재 클릭된 버튼에만 on 클래스 제거
// //           btnSubCont.removeClass("on");
// //       }
// //   });
// // });


// // 레이어팝업
// $(document).ready(function(){
//   // data-target="btn_close" 속성을 가진 요소 클릭 시 foot_banner_cont 클래스에서 on 클래스 제거
//   $(document).on("click", "[data-target='btn_close']", function(){
//       $(".foot_banner_cont").removeClass("on");
//   });

//   // btn_fixed_up 버튼 클릭 시 foot_banner_cont 클래스에 on 클래스 추가
//   $(".btn_fixed_up").click(function(){
//       $(".foot_banner_cont").addClass("on");
//   });
  
//   // 하단 팝업(foot_banner_cont)의 외부영역 클릭시 팝업 닫기
//   $("#main_new").on("mouseup", function(e) {
//       var footBannerSwiper = $('.foot_banner_cont');
//       if (!$("#main_layer_pop").hasClass("modal_on") && $(".foot_banner_cont").hasClass("on") && footBannerSwiper.has(e.target).length === 0) {
//         $(".foot_banner_cont").removeClass("on");
//       }
//   });
// });

// // 탑버튼
// $(document).ready(function() {
//   // 'top' 버튼 클릭 시 화면 최상단으로 스크롤
//   $('#top').click(function() {
//     $('html, body').animate({ scrollTop: 0 }, 'slow');
//   });
// });

// // 슬라이드 1장일때 버튼 숨김
// // $(document).ready(function() {
// //   // swiper_wrap 중에 swiper-button-lock 클래스를 포함하는 요소 찾기
// //   $('.swiper_wrap').each(function() {
// //     if ($(this).find('.swiper-button-lock').length > 0) {
// //       // swiper-button-lock 클래스가 있으면 해당 swiper_wrap에 no_btn 클래스 추가
// //       $(this).addClass('no_btn');
// //     }
// //   });
// // });

// // 슬라이드 위에  슬라이드
// $(document).ready(function() {
//   // sw 클래스 요소에 hover 이벤트 추가
//   $('.brand_content .sw').hover(
//     function() {
//       // 마우스가 올라갔을 때
//       $(this).addClass('hover');
//       $(this).siblings('.banner_cont').addClass('none');
//     },
//     function() {
//       // 마우스가 빠졌을 때
//       $(this).removeClass('hover');
//       $(this).siblings('.banner_cont').removeClass('none');
//     }
//   );
// });

// // gnb 메뉴 스크롤 동작시 클래스 hover 가 되는 쿼리
// $(document).ready(function() {
//   // header 또는 fixed_box에 마우스가 올라갈 때
//   $('.header, .fixed_box').mouseenter(function() {
//     $('.fixed_box').addClass('hover');
//   });

//   // header 또는 fixed_box에서 마우스가 벗어날 때
//   $('.header, .fixed_box').mouseleave(function() {
//     if ($(window).scrollTop() !== 0 && !$('.header:hover').length && !$('.fixed_box:hover').length) {
//       $('.fixed_box').removeClass('hover');
//     }
//   });

//   // 스크롤할 때 상태 체크
//   $(window).scroll(function() {
//     if ($(window).scrollTop() === 0) {
//       $('.fixed_box').addClass('hover');
//     } else {
//       if (!$('.header:hover').length && !$('.fixed_box:hover').length) {
//         $('.fixed_box').removeClass('hover');
//       }
//     }
//   });

//   // 페이지 로드 시 상태 체크
//   if ($(window).scrollTop() === 0) {
//     $('.fixed_box').addClass('hover');
//   } else {
//     $('.fixed_box').removeClass('hover');
//   }
// });

// // 장바구니 담기 영역 footer 위로 올리기
// $(document).ready(function() {
//   $(window).scroll(function() {
//     var footerOffset = $('#footer').offset().top;
//     var windowHeight = $(window).height();
//     var scrollPos = $(window).scrollTop() + windowHeight;
//     var orderFloatingBottom = $('.order_floating_bottom');

//     // 조건을 만족하면 스타일 추가
//     if (scrollPos >= footerOffset) {
//       orderFloatingBottom.css({
//         'position': 'absolute',
//         'bottom': '-80px'
//       });
//     } else {
//       // 조건을 만족하지 않으면 원래 스타일로 복원
//       orderFloatingBottom.css({
//         'position': '',
//         'bottom': ''
//       });
//     }
//   });
// });

// // floating_cont 영역 footer 위로 올리기
// $(document).ready(function() {
//   $(window).scroll(function() {
//     var footerOffset = $('#footer').offset().top;
//     var windowHeight = $(window).height();
//     var scrollPos = $(window).scrollTop() + windowHeight;
//     var orderFloatingBottom = $('.floating_wrap');

//     // 조건을 만족하면 스타일 추가
//     if (scrollPos >= footerOffset) {
//       orderFloatingBottom.css({
//         'position': 'absolute',
//         'bottom': '-80px'
//       });
//     } else {
//       // 조건을 만족하지 않으면 원래 스타일로 복원
//       orderFloatingBottom.css({
//         'position': '',
//         'bottom': ''
//       });
//     }
//   });
// });

// // floating_wrap 동작
// $(document).ready(function() {
//   $('.floating_wrap .floating_btn').click(function() {
//     $(this).closest('.floating_wrap').toggleClass('close');
//   });
// });

// // 퀵메뉴 열림시 컨텐츠 밀리는 move가 있을 시 동작하는 코드
// $(document).ready(function() {
//   if ($('.content_wrap').hasClass('move')) {
//       $('.side_menu_cont').addClass('move');
//   }
// });

// // 커스텀 스크롤 속도
// $(document).ready(function(){
//   $(".mCustomScrollbar").mCustomScrollbar({
//       theme: "dark",
//       scrollInertia: 100, // Adjust the scroll speed (lower values mean faster scroll)
//       mouseWheel: {
//           scrollAmount: 80 // Adjust this value to control scroll speed (higher values for faster scroll)
//       }
//   });
// });

// // 퀵메뉴 열릴때 백그라운드 스크롤 제어
// var scroll = {
//   disable: function() {
//       var scrollTop = $(window).scrollTop();
//       $('html').css('overflow-y', 'scroll');
//       $('html').css({
//           'position': 'fixed',
//           'top': -scrollTop,
//           'left': 0,
//           'width': '100%'
//       });
//   },
//   enable: function() {
//       var scrollPosition = Math.abs($('html').css('top').split('px')[0]);
//       $('html').removeAttr('style');
//       $(window).scrollTop(scrollPosition);
//       $('html').removeAttr('style');
//   }
// };

// $(document).ready(function() {
//   $('.quick_menu_area').hover(
//       function() {
//           scroll.disable();
//       },
//       function() {
//           scroll.enable();
//       }
//   );
// });

// // 이미지 추출 top_banner 코드
// /*
// $(document).ready(function() {
//   function updateBackgroundColor() {
//       var activeSlideImg = $('.swiper-slide-active img')[0];
//       if (activeSlideImg) {
//           var img = new Image();
//           img.crossOrigin = "Anonymous"; // CORS 설정
//           img.src = activeSlideImg.src;
//           img.onload = function() {
//               var canvas = document.createElement('canvas');
//               canvas.width = img.width;
//               canvas.height = img.height;
//               var context = canvas.getContext('2d');
//               context.drawImage(img, 0, 0);

//               // Get the color data of the first pixel
//               var imageData = context.getImageData(0, 0, 1, 1).data;
//               var rgb = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';

//               // Set the background color
//               $('.top_banner_cont').css('background-color', rgb);
//           };
//           img.onerror = function() {
//               console.error("Failed to load image:", img.src);
//           };
//       }
//   }

//   // Initialize Swiper
//   var swiper = new Swiper('.swiper-container', {
//       autoplay: {
//           delay: 1000, // 슬라이드 자동 전환 시간 설정
//           disableOnInteraction: false, // 사용자 상호작용 후에도 autoplay 계속
//       },
//       on: {
//           slideChange: function () {
//               updateBackgroundColor();
//           }
//       }
//   });

//   // Initial background color update
//   updateBackgroundColor();

//   // Set interval to update background color every 3 seconds
//   setInterval(updateBackgroundColor, 0);
// });*/

// // 슬라이드 input 드래그 막음, 드래그 되면 간헐적으로 슬라이드 오휴생김
// $(document).ready(function() {
//   $('.over input').on('focus', function() {
//       $(this).blur();
//   });
// });

// // 검색영역 search_input 에 on 이 있으면 search_txt_banner 안보여지게 하는 코드
// $(document).ready(function() {
//   $('.txt_list').hover(
//       function() {
//           // 마우스가 올라갔을 때
//           if ($('.search_input').hasClass('on')) {
//               $('.txt_list .search_txt_banner').css('display', 'none');
//           } else {
//               $('.txt_list .search_txt_banner').css('display', '');
//           }
//       }
//   );
// });
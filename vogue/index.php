<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="컬렉션부터 스타일, 쇼핑, 뷰티, 라이프스타일, 셀러브리티까지 지금 가장 핫한 트렌드 소개"
    />
    <title>보그 코리아 (Vogue Korea) 2024</title>
    <link
      rel="shortcut icon"
      href="https://img.vogue.co.kr/vogue/common/vogue-favicon.ico?v=0.2"
      type="image/x-icon"
    />
    <!-- 아이콘 CSS -->
    <link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/fontisto@v3.0.4/css/fontisto/fontisto.min.css"
    />
    <!-- 메인 CSS : #main-css -->
    <link id = "main-css" rel="stylesheet" href="./css/main.css" />
    
     <!-- 스와이퍼용 CSS  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
     <!-- 스와이퍼 JS  -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
    
    <!-- 제이쿼리 라이브러리 -->
    <script src="./js/jquery-3.7.1.min.js"></script>
    <script src="./js/jquery-ui.min.js"></script>


    <!-- 1.리액트 기본 라이브러리 -->
    <script
      src="https://unpkg.com/react@18/umd/react.production.min.js"
      crossorigin
    ></script>
    <!-- 2.리액트 가상돔 라이브러리 -->
    <script
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    
    <!-- 3.리액트 바벨 라이브러리 -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- 아이템 카테고리 데이터 JS -->
    <script
      src="./js/data/category.js"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

    <!-- 유효성 검사 JS : 회원가입용 -->
    <script
      src="./js/validation.js"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

    <!-- 유효성 검사 JS : 로그인용 -->
    <script
      src="./js/vaild_login.js"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

    
    <!-- 갤러리 모듈 JS -->
    <script
      src="./js/components/Gallery.jsx"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script> 
    
    <!-- 로그인 모듈 JS -->
    <script
    src="./js/components/Login.jsx"
    data-plugins="transform-es2015-modules-umd"
    type="text/babel"
  ></script> 
    
    <!-- 회원가입 모듈 JS -->
    <script
    src="./js/components/Member.jsx"
    data-plugins="transform-es2015-modules-umd"
    type="text/babel"
  ></script> 

    <!-- 상단영역 모듈 JS -->
    <script
      src="./js/components/TopArea.jsx"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>
    
    <!-- 메인영역 모듈 JS -->
    <script
      src="./js/components/MainArea.jsx"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

    <!-- 아이템영역 모듈 JS -->
    <script
      src="./js/components/ItemsArea.jsx"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>


    <!-- 하단영역 모듈 JS -->
    <script
      src="./js/components/FooterArea.jsx"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

    <!-- 공통모듈 JS =>> 순서 중요 -->
    <script
      src="./js/main.js"
      data-plugins="transform-es2015-modules-umd"
      type="text/babel"
    ></script>

  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

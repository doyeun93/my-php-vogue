// 보그 PJ 메인 JS - main.js

// 상단영역 불러오기
import TopArea from "./components/TopArea";

// 메인영역 불러오기
import MainArea from "./components/MainArea";

// 아이템 영역 불러오기
import ItemsArea from "./components/ItemsArea";

// 하단영역 불러오기
import FooterArea from "./components/FooterArea";

// 갤러리 불러오기
import Gallery from "./components/Gallery";

// 로그인 불러오기
import Login from "./components/Login";

// 회원가입 불러오기
import Member from "./components/Member";
import { useLayoutEffect } from "react";



// [1] 메인페이지 전체 레이아웃 로딩 컴포넌트
function Layout() {
  // 상태관리변수 설정구역
  // [1] 메뉴 변경 상태변수
  const [menu, setMenu] = React.useState("home");

  // 화면 렌더링 직전에 css 로딩 변경하기
  React.useLayoutEffect(() => {
    // menu 상태변수에 의존시킨다
    // 메인 css 대상 요소 : #main-css
    document.querySelector("#main-css").href =
      menu == "home"
        ? "./css/main.css"
        : menu == "gallery"
        ? "./css/gallery.css"
        : menu == "login"
        ? "./css/login.css"
        : menu == "member"
        ? "./css/member.css"
        : "./css/items.css";
    // menu값이 "home"인 경우 main.css를 로딩하고 기타 메뉴인 경우 main.css를 로딩한다
    // menu값이 "gallery"인 경우 gallery.css를 로딩하고 기타 메뉴인 경우 item.css를 로딩한다

    // 페이지 최상단이동코드
    window.scrollTo(0, 0);
  }, [menu]);

  

  // 로그인시 필요한 사용자 확인박스 만들기
  // 처음 화면 랜더링 바로 직전 한번만 실행코드 구역에 구현
  React.useLayoutEffect(() => {
    // 1. 상단영역(#top-area)에 로그인 박스넣기
    $("#top-area").append('<div id="loginMsg"></div>');
    // 2. 로그인 박스 CSS 디자인하기
    $("#loginMsg").css({
      position: "absolute",
      width: "400px",
      top: "5%",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "14px",
      fontWeight: "bold",
      textAlign: "center",
      whiteSpace: "nowrap",
      zIndex: -1,
    }); ////// css //////////
  }, []); // []를 사용하여 처음 한번만 실행


  React.useLayoutEffect(()=>{
    // 로그인 처리함수 호출
    loginSet(login_msg, login_auth) 
  },[]); // 처음 한번만 로그인 처리 함수 호출



  // 리턴 코드구역
  return (
    <React.Fragment>
      {/* 1. 상단영역 컴포넌트 */}
      <TopArea changeMenu={setMenu} />
      {/* 2. 메인영역 컴포넌트 */}
      {menu == "home" ? (
        <MainArea />
      ) : menu == "gallery" ? (
        <Gallery />
      ) : menu == "login" ? (
        <Login changeMenu={setMenu} />
      ) : menu == "member" ? (
        <Member changeMenu={setMenu} />
      ) : (
        <ItemsArea catName={menu} />
      )}

      {/* 3. 하단영역 컴포넌트 */}
      <FooterArea />
    </React.Fragment>
  );
} ////// layout 컴포넌트

// 메인 페이지 전체 출력하기
ReactDOM.render(<Layout />, document.querySelector("#root"));

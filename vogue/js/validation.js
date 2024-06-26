// 회원가입 유효성 검사 JS

export default function validateFn(changeMenu) {
    // changeMenu : 상태변수메서드 setMenu 전달
  console.log("검사해");




  /////////// 이메일 관련 대상선정 /////////////
  // 이메일 앞주소
  const eml1 = $('#email1');
  // 이메일 뒷주소
  const eml2 = $('#email2');
  // 이메일 뒷주소 선택박스
  const seleml = $('#seleml');
////////////////////////////////////////////



  /********************************************** 
    [ 사용자 입력폼 유효성 검사 ]
    - 이벤트 종류 : blur(포커스가 빠질때 발생)
    - 제이쿼리 이벤트 메서드 :  blur()
    - 이벤트 대상: 
    ->입력요소 중 text(아이디email2제외),password
        form.logF input[type=text][id!=email2],
        form.logF input[type=password],
    -> 요소뒤 대괄호는 속성선택자(CSS원래문법)
    [id!=email2] !=은 같지않다(제이쿼리용 문법)

**********************************************/

// 대상요소 변수 할당 ///
const tgInput = `form.logF input[type=text][id!=email2],
    form.logF input[type=password]`

  $(tgInput).blur(function () {
    /****************************************** 
        1. 현재 블러가 발생한 요소의 아이디는?
    ******************************************/
    let cid = $(this).attr("id");
    // cid : current id 즉, 현재 아이디
    // attr(속성명) : 속성값 불러오기 
 

    /****************************************** 
        2. 현재 블러가 발생한 요소의 값은?
    ******************************************/
    let cv = $(this).val();
    // val() : 입력값 읽어오기
    // trim() : 앞뒤 공백 제거(중간 공백 제거는 못함) 모든 공백을 제거하는 함수를 만들어쓴다 
    const groSpace = x => x.replace(/\s/g,"");
    //  gro : get read of space -> 공백제거 함수
    // 정규식은 슬래쉬(/)사이에 쓰며 \s : 스페이스기호 이고, g: 전역(global) 플래그(flag: 처리표시기호)다

    // 이름(#mnm)일 경우 중간공백을 있어야하므로 삼항연산자로 trim()을 함께 사용한다
    cv =  cid == "mnm"? cv.trim() : groSpace(cv);
    // cv : current value 즉, 현재값

    // 공백 제거 후 입력창에 반영시켜준다
    $(this).val(cv);

    console.log("현재아이디:",cid, "\n값:",cv);

    /************************************* 
        3. 빈값 여부 검사하기 (필수입력항목)
    *************************************/
    if(cv==""){
        // 메시지 출력하기
        $(this).siblings(".msg").text("필수입력");
        // 현재 요소들 중 .msg인 요소에 글자를 출력함
        // 형제 요소 선택은 siblings(특정 이름)

        // [불통과 pass 변수 업데이트]
        pass = false;

    } //// if /////


    /**************************************** 
        4. 아이디일 경우 유효성 검사
        - 검사기준: 
        영문자로 시작하는 6~20글자 영문자/숫자
    ****************************************/
   else if(cid == "mid"){
        // 검사 결과
        // console.log(vReg(cv,cid));
    if(!vReg(cv,cid)){// 아이디 검사 불통과시
        // false 결과시 들어와야 하므로 Not(!)연산자사용
        

        // 메시지 지우기
        $(this).siblings(".msg").text("영문자로 시작하는 6~20글자 영문자/숫자").removeClass("on"); 

        // [불통과 pass 변수 업데이트]
        pass = false;

    } // if //

    else{ // 아이디 검사 통과시

        // 1. DB에 조회하여 같은 아이디가 있다면
        // '이미 사용중인 아이디입니다' 와 같은 메시지출력
        // 2. 만약 DB조회하여 같은 아이디가 없다면
        // '멋진 아이디네요~!'와 같은 메시지출력
        

        /* 
            [ Ajax로 중복아이디 검사하기! ]
            ajax 처리 유형 2가지

            1) post 방식 처리 메서드
            - $.post(URL,data,callback)

            2) get 방식 처리 메서드
            - $.get(URL,callback)
            -> get방식은 URL로 키=값 형식으로 데이터전송함!

            3) 위의 2가지 유형 중 처리선택 메서드
            - $.ajax({
                전송할페이지,
                전송방식,
                보낼데이터,
                전송할데이터타입,
                비동기옵션,
                성공처리,
                실패처리
            })
            -> 보내는 값은 하나(객체데이터)
            -> ajax 메서드안에 하나의 객체만 보내고 객체안에 7가지 유형의 데이터를 보냄!
        */



        $.ajax({
            // 1. 전송할페이지, -> url()
            url : "./process/chkID.php",
            // 2. 전송방식, -> type()
            type: "post",
            // 3. 보낼데이터, -> data
            data : {"mid":$('#mid').val()},
            // 4. 전송할데이터타입, -> dataType
            dataType:"html",
            // 5. 비동기옵션, -> async(false는 동기)
            async : false,
            // pass 변수 업데이트를 동기적으로 
            // 처리하기 위해 비동기옵션을 false로 처리해야함

            // 6. 성공처리, -> success
            success :function(res){
                // res : 리턴된 결과값
                if(res == "ok"){ // 아이디 중복 통과시
                $("#mid").siblings(".msg").text("멋진 아이디네요!").addClass("on");
                }/// if ///// 
                // 아이디 중복일 경우
                else{
                $("#mid").siblings(".msg").text("이미 사용중인 아이디입니다").removeClass("on");

                // [불통과 pass 변수 업데이트]
                pass = false;
                console.log("중복ID pass", pass);
                } //// else ///////
            },
            
            // 7. 실패처리 -> error
                // xhr - XMLHttpRequest객체
                // status - 실패상태코드
                // error - 에러결과값
            error : function(xhr,status,error){
                alert("연결처리 실패:"+error);
            },///// error /////
         })
        
        // 클래스 on을 넣으면 녹색글자임 
        } //// else ///
   } ///// else if ////

    /**************************************** 
        5. 비밀번호일 경우 유효성 검사
        - 검사기준: 
        특수문자,문자,숫자포함 형태의 5~15자리
    ****************************************/
    else if(cid == "mpw"){
        // 검사 결과
        console.log("비번:", vReg(cv,cid));

        if(!vReg(cv,cid)){// 비번 검사 불통과시
            // false 결과시 들어와야 하므로 Not(!)연산자사용
            // 메시지 지우기
            $(this).siblings(".msg").text(" 특수문자,문자,숫자포함 형태의 5~15자리").removeClass("on"); 
        
            // [불통과 pass 변수 업데이트]
            pass = false;


        } // if //
        else{ // 맞으면 메시지 삭제
            // $(this).siblings(".msg").text("");
            $(this).siblings(".msg").empty("");
            // empty()는 내용 지우기
        }
    } ///// else if ///

    /**************************************** 
        6. 비밀번호확인일 경우 유효성 검사
        - 검사기준: 비빌번호 항목과 일치여부
    ****************************************/
    else if(cid == "mpw2"){

        if(cv!=$("#mpw").val()){// 비밀번호 검사 불통과시
            // false 결과시 들어와야 하므로 Not(!)연산자사용
            // 메시지 지우기
            $(this).siblings(".msg").text("비밀번호가 일치하지 않습니다.").removeClass("on"); 
        
            // [불통과 pass 변수 업데이트]
            pass = false;
        
        }
        else{ // 맞으면 메시지 삭제
            // $(this).siblings(".msg").empty("");
            $(this).siblings(".msg").text("비밀번호가 일치합니다").addClass("on");
            // empty()는 내용 지우기
        }
    } ///// else if ////

    /**************************************** 
        7. 이메일 유효성 검사
        - 검사기준: 이메일 형식에 맞는지 여부
    ****************************************/
    else if(cid == "email1"){
        // 1. 이메일 주소 만들기 : 앞 주소 @ 뒷 주소
        let comp = eml1.val() + "@" + (seleml.val()=="free" ? eml2.val() : seleml.val());
        // 이메일 뒷주소는 직접입력("free")이면 뒷주소 입력창
        // 아니면 선택박스 option value를 가져온다
        console.log("이메일:", comp);

        // 2. 이메일 검사 함수 호출하기
        resEml(comp);
    } ///// else if ////
   
   /**************************************** 
       8. 모두 통과일 경우 메시지 지우기
   ****************************************/
    else{
        // 메시지 지우기
        $(this).siblings(".msg").text("");  
    } /////  else ///

  }); ////////////// blur 함수 /////////////


  /******************************************** 
    선택박스 변경시 이메일 검사하기
    ______________________________

    검사시점 : 선택박스에 change이벤트가 발생할때
    제이쿼리 메서드 : change()
    이벤트 대상 : #seleml -> seleml변수
  ********************************************/
 seleml.change(function(){
    // 1. 선택박스 변경된 값 읽어오기
    let cv = seleml.val();
    console.log("선택된 값:", cv);

    // 2. 선택옵션별 분기
    // 2-1."선택해주세요"일 경우
    if (cv == "init") {
        // 1. 메시지 출력
        eml1.siblings(".msg").text("이메일 옵션선택 필수").removeClass("on");
        // 2. 직접 입력창 숨기기
        eml2.fadeOut(300);
        // fadeOut(시간, 이징, 함수) -> 페이드아웃 효과 메서드
    } /////// if : 선택해주세요 ///////

    // 2-2.'직접입력'일 경우
    else if (cv == "free") {
        // 1. 직접입력창 보이기 + 값 지우기
        eml2.fadeIn(300).val("").focus();
        // fadeIn(시간, 이징, 함수) -> 페이드인 효과 메서드

        // 2. 메시지 지우기
        eml1.siblings(".msg").empty();

        
    } ////// else if : 직접입력 //////

    // 2-3. 기타 이메일주소 선택일 경우
    else {
        // 1. 직접 입력창 숨기기
        eml2.fadeOut(300);

         // 2. 메시지 지우기
        eml1.siblings(".msg").empty();
        

        // 3. 이메일 전체 주소 만들기
        let comp = eml1.val() + "@" + cv;

        // 이메일 뒷주소는 이미 cv에 담겨있음

        // 4. 이메일 유효성 검사함수 호출
        resEml(comp);

    } ////// else : 기타 이메일주소 ////

 }); /////////////// change ///////////////





/*********************************************** 
    키보드 입력시 이메일 체크하기
    _______________________________

    - 키보드 관련 이벤트 : keypress, keyup, keydown
    1. keypress : 키가 눌려졌을때
    2. keyup : 키가 눌렸다가 올라올때
    3. keydown : 키가 눌려져서 내려가 있을때
    -> 과연 글자가 입력되는 순간은 어떤 키보드 이벤트를
    사용해야할까? ->>> keyup

    - 이벤트 대상 : #email1, #email2
    -> 모든 이벤트함수와 연결하는 제이쿼리 메서드는?
    on(이벤트명,함수)
 ***********************************************/
$("#email1, #email2").on("keyup", function(){
    // 1. 현재 이벤트 발생 대상 아이디 읽어오기
    let cid = $(this).attr("id");
    // console.log("입력창 id:", cid);


    // 2. 이메일 뒷주소 세팅하기(선택)
    let backEml = 
    cid == "email2" ? eml2.val() : seleml.val() != "free" ? seleml.val() : eml2.val();
    // 현재 입력 아이디가 이메일2면 직접입력 창을 읽고 아니면 선택박스 값이
    // "free"가 아닌 경우 선택박스 값 읽고, 아니면 직접입력창 값을 뒷 주소로 설정함


    // 이메일 전체주소 만들기
    let comp = eml1.val() + "@" +backEml; 
    
    // 이메일 유효성 검사 함수 호출하기
    resEml(comp);


    // console.log($(this).val());

}); ////////////// keyup ///////////////////



   /****************************************** 
    함수명 : resEml (result Email)
    기능 : 이메일 검사결과 처리
  ******************************************/
 const resEml = comp => { // comp - 이메일주소
    console.log('이메일주소:',comp);
    // console.log('이메일검사결과:',vReg(comp,'eml'));

    // 이메일 정규식 검사에 따른 메시지 보이기
    if(vReg(comp,'eml')){
        eml1.siblings('.msg')
        .text('적합한 이메일 형식입니다!')
        .addClass('on');

    } //////// if : 통과시 //////////
    else{
        eml1.siblings('.msg')
        .text('맞지않는 이메일 형식입니다!')
        .removeClass('on');

        
        // [불통과 pass 변수 업데이트]
        pass = false;

      
    } //////// else : 불통과시 ////////

 }; ///////////// resEml /////////////////




/*********************************************** 
    비밀번호 글자 보이기 / 숨기기 세팅
***********************************************/
$(".eye")
.css({
    textDecoration: "line-through",
    opacity: 0.5,
    cursor: "pointer",
})
.click(e=>{
    // 투명도값 읽기
    let opa = $(e.target).css("opacity");
    console.log(opa);
    // 1. 글자 보이기 전환
    $("#mpw").attr("type", opa=="0.5"? "text" : "password");
    // 2. CSS 디자인 전환
    $(e.target).css({
        textDecoration: opa=="0.5"? "none" : "line-through",
        opacity: opa=="0.5"? "1" : "0.5",
    });  /// click
});


/********************************************* 
    가입하기(submit) 버튼 클릭시 처리하기 
    __________________________________

    - form요소 내부의 submit버튼을 클릭하면
    기본적으로 form요소에 설정된 action속성값인
    페이지로 전송된다! 전체검사를 위해 이를 중지해야함!
    -> 중지방법은? event.preventDefault()!!!

    전체검사의 원리 : 
    전역변수 pass를 설정하여 true를 할당하고
    검사중간에 불통과 사유발생시 false로 변경!
    유효성 검사 통과여부를 판단한다!

    검사방법 :
    기존 이벤트 blur 이벤트를 강제로 발생시킨다!
    이벤트를 강제로 발생시키는 제이쿼리 메서드는?
    ->>> trigger(이벤트명)

  *********************************************/
 // 통과 여부 변수(true / false값)
    let pass;


$("#btnj").click((e)=>{
    console.log("가입해");

    // 1. 기본 이동(서브밋) 막기
    e.preventDefault();

    // 2. pass 통과여부 변수에 true 할당하기
    pass = true;

    // 3. 입력창 blur 이벤트 강제발생하기
    $(tgInput).trigger("blur");

    console.log(" 통과여부 : ", pass);

    // 4. 검사결과에 따라 메시지 보이기
  if (pass) {
    

    // 메서드로 서브밋하기 -> 동기적 처리(그 페이지로 이동함)
    // $(".logF").submit();


    
     /*  비동기 처리
        [ Ajax를 이용한 POST방식으로 DB에 데이터 입력하기 ]

        AJAX = Asyncronous Javascript and XML

        - 비동기통신이란? 쉽게 말해서 페이지가 새로 고쳐지지 않고 
          그대로 있으면서 일부분만 서버통신을 하는 것을 말한다!
        - 제이쿼리는 POST방식으로 ajax를 처리하는 메서드를 제공한다!

        [ POST방식 Ajax 메서드 ]
        $.post(URL,data,callback)
        $.post(전송할페이지,전송할데이터,전송후콜백함수)
    
    */
    // 

    $.post(
        // 1. 전송할 페이지
        " process/ins.php ",
        // 2. 전송할 데이터 : 객체로 보냄
        {
            // 1.아이디
            "mid":$("#mid").val(),
            // 2.비번
            "mpw":$("#mpw").val(),
            // 3.이름
            "mnm":$("#mnm").val(),
            // 4.성별 : 라디오태그에 value속성필수!
            "gen":$(":radio[name=gen]:checked").val(),
            // 5-1.이메일 앞주소
            "email1":$("#email1").val(),
            // 5-2.이메일 뒷주소
            "seleml":$("#seleml").val(),
            // 5-3.직접입력 이메일 뒷주소
            "email2":$("#email2").val()
        },
        // 3. 전송 후 콜백 함수
        function(res){ // res : 백엔드 ins.php의 리턴값
            console.log("서버 리턴값:",res);

            // 1. 서버리턴 값이 "ok"이면 성공
            if(res == "ok"){
                alert("회원가입을 축하드립니다! 짝짝짝!");
                // 리액트 메뉴 변경 상태변수 업데이트로 페이지 이동
                changeMenu("login");
            }
            // 2. 서버 리턴 값이 "ok"가 아니면 실패
            else{
                alert("회원가입에 실패하였습니다!" + res);
            } ////// else 
        } ///// 콜백 함수 //////
    ); ///////////// 제이쿼리 post메서드 //////////////////
   
     

  } //////// if : 통과시 ///////////
  else {
    ///// 불통과시 //////
    alert("입력을 수정하세요~!");
  } //////// else : 불통과시 //////

}); ///// click //////




} ///////////////////// validateFn 함수 //////////////////////



/*//////////////////////////////////////////////////////
    함수명: vReg (validation with Regular Expression)
    기능: 값에 맞는 형식을 검사하여 리턴함
    (주의: 정규식을 따옴표로 싸지말아라!-싸면문자가됨!)
*///////////////////////////////////////////////////////
function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////
///////////////////////////////////////////////////////


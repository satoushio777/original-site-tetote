$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".toggle_btn").on("click", function () {
        // toggleClassを使用することで、hamburgerクラスにactiveクラスが存在する場合は削除、
        // 存在しない場合を追加する処理を自動で行ってくれる
        $("#header").toggleClass("open");

        // 背景のスクロールを停止・解除する
        $("body").toggleClass("menu-open");
    });

    /*=================================================
    ナビゲーションリンクをクリックした時
    =================================================*/
    $(".header__nav-link").on("click", function () {

        // メニューを閉じる
        $("#header").removeClass("open");

        // スクロール停止を解除する
        $("body").removeClass("menu-open");

    });

    // ヘッダーに対してopenクラスを付与
    // openクラスがついているときはopenクラスを削除
    // toogleClassメソッドはその両方を行う
    // $("#nav a").on("click", function () {
    //     $("header").toggleClass("open");
    // });

    /*=================================================
        下部CTAをクリックした時
    =================================================*/

    $(".header__phone-link, .header__mail-link").on(
        "click",
        function () {

            // メニューを閉じる
            $("#header").removeClass("open");

            // スクロール停止を解除する
            $("body").removeClass("menu-open");

        }
    );

    /*=================================================
    背景をクリックした時
    =================================================*/

    $("#mask").on("click", function () {

        // メニューを閉じる
        $("#header").removeClass("open");

        // スクロール停止を解除する
        $("body").removeClass("menu-open");

    });


    /*=================================================
    ABOUT  Inview（画面に表示されたタイミングで処理を実行）
    ===================================================*/

    /* チャット：左から表示 */
    $(window).on("scroll load", function () {

        $(".inview-slide-left").each(function () {

            const scroll = $(window).scrollTop();
            const target = $(this).offset().top;
            const windowHeight = $(window).height();

            if (scroll > target - windowHeight + 50) {
                $(this).addClass("slide-left");
            }

        });

    });


    /* チャット：右から表示 */
    $(window).on("scroll load", function () {

        $(".inview-slide-right").each(function () {

            const scroll = $(window).scrollTop();
            const target = $(this).offset().top;
            const windowHeight = $(window).height();

            if (scroll > target - windowHeight + 50) {
                $(this).addClass("slide-right");
            }

        });

    });

    /*=================================================
    SUPPORT モーダル
    =================================================*/
    // 画像をクリックしてモーダルを開く
    $(".js-open-teacher-modal").on("click", function () {

        // クリックした画像と同じliの中にあるモーダルを取得
        const $modal = $(this)
            .closest("li")
            .find(".js-teacher-modal");

        $modal.addClass("is-active");
        $("body").addClass("is-modal-open");
    });


    // × closeボタンで閉じる
    $(".js-close-teacher-modal").on("click", function () {

        $(this)
            .closest(".js-teacher-modal")
            .removeClass("is-active");

        $("body").removeClass("is-modal-open");
    });


    // 黒い背景部分をクリックしたときに閉じる
    $(".js-teacher-modal").on("click", function (e) {

        // モーダルの白い部分ではなく、
        // 黒い背景そのものがクリックされたか確認
        if (e.target === this) {
            $(this).removeClass("is-active");
            $("body").removeClass("is-modal-open");
        }
    });


    // Escキーで閉じる
    $(document).on("keydown", function (e) {

        if (e.key === "Escape") {
            $(".js-teacher-modal").removeClass("is-active");
            $("body").removeClass("is-modal-open");
        }
    });


    /*=================================================
    BLOG Slickスライダー
    =================================================*/

    if ($(".blog__slider").length) {

        $(".blog__slider").slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 600,

            centerMode: true,
            centerPadding: "28%",

            slidesToShow: 1,
            slidesToScroll: 1,

            infinite: true,
            arrows: true,
            dots: true,

            pauseOnHover: true,
            pauseOnFocus: true,

            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        centerPadding: "45px",
                        arrows: false
                    }
                }
            ]
        });
    }


    /* これより下にCONTACTの処理 */
    // const contactForm = document.getElementById("contact-form");

    // CONTACTページ以外では処理しない
    // if (!contactForm) {
    //     return;
    // }

    /*=================================================
    FAQ  アコーディオンの開閉
    =================================================*/
    // 最初はすべての回答を閉じておく
    $(".faq__answer").hide();

    $(".faq__question").on("click", function () {

        // クリックした質問の次にある回答を取得
        const $answer = $(this).next(".faq__answer");

        // 開いているかどうかを確認
        const isOpen = $(this).hasClass("is-open");

        // 質問にis-openを付け外し
        $(this).toggleClass("is-open");

        // アクセシビリティ用の状態を変更
        $(this).attr("aria-expanded", !isOpen);

        // 回答をゆっくり開閉
        $answer.stop(true, true).slideToggle(300);
    });



    /*=================================================
    ページトップボタン--スムーズスクロールの設定
    ===================================================*/
    // 最初は非表示
    const $pageTop = $("#page-top");

    $pageTop.hide();

    $(window).on("scroll load resize", function () {

        const scrollTop = $(window).scrollTop();
        const windowBottom = scrollTop + $(window).height();

        let showPageTop = false;

        /*
        TOPページ
        .about__bodyの下端付近まで来たら表示
        */
        if ($(".about__body").length) {

            const aboutBodyBottom =
                $(".about__body").offset().top
                + $(".about__body").outerHeight();

            showPageTop = windowBottom > aboutBodyBottom - 100;

            /*
            下層ページ
            footerが画面内に入ったら表示
            */
        } else if ($("footer").length) {

            const footerTop = $("footer").offset().top;

            showPageTop = windowBottom > footerTop;
        }

        // 判定結果に応じて表示・非表示
        if (showPageTop) {
            $pageTop.stop(true, true).fadeIn(300);
        } else {
            $pageTop.stop(true, true).fadeOut(300);
        }


        //(aboutのボトムから表示バージョン)
        // 最初は非表示
        // $("#page-top").hide();

        // スクロールしたときの表示・非表示
        // $(window).on("scroll", function () {

        // ABOUTセクションの下端位置を取得
        // const aboutBodyBottom =
        //     $(".about__body").offset().top + $(".about__body").outerHeight();

        // 現在表示している画面の下端位置
        // const windowBottom =
        //     $(this).scrollTop()
        //     + $(window).height();

        // about__bodyの下端付近まで来たら表示
        // if (windowBottom > aboutBodyBottom - 100) {
        //     $("#page-top").fadeIn();
        // } else {
        //     $("#page-top").fadeOut();
        // }

        // if ($(this).scrollTop() > aboutBottom - 100) {
        //     $("#page-top").fadeIn();
        // } else {
        //     $("#page-top").fadeOut();
        // }
    });


    //(300進んでから表示バージョン)
    // 最初は非表示
    // $("#page-top").hide();


    /*=================================================
    スムーススクロール
    ===================================================*/
    // ページ内のリンクをクリックした時に動作する
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 600, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });


    // スクロールしたときの表示・非表示
    // $(window).on("scroll", function () {
    //     if ($(this).scrollTop() > 300) {
    //         $("#page-top").fadeIn();
    //     } else {
    //         $("#page-top").fadeOut();
    //     }
    // });

    // ページトップへスムーズスクロール
    //$("#page-top").on("click", function (e) {
    //    e.preventDefault(); // リンクのデフォルト動作（瞬間ジャンプ）を止める

    //    $("html, body").animate(
    //        { scrollTop: 0 },  // 一番上まで
    //        400,               // 時間：400ミリ秒（0.4秒）
    //600,               // 時間：600ミリ秒（0.6秒）
    //        "linear"            // 動き:  常に同じ速さで動く
    //"swing"            // 動き: 始めはゆっくり動いて、途中は速め、最後ゆっくり
    //    );
    //});


    const contactForm = document.getElementById("contact-form");

    // CONTACTページ以外では処理しない
    if (!contactForm) {
        return;
    }

    const webAppUrl =
        "https://script.google.com/macros/s/AKfycbxj3VeYiGmsGPUH0A747Kh_x65P46mH7Vz2pvINa1VqRpK9WiVc6o7FhcjE8my3Zfdi/exec";

    const submitButton =
        contactForm.querySelector(".contact__submit");

    const messageElement =
        document.getElementById("contact-message");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // HTMLの入力チェックを行う
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "送信中…";

        messageElement.textContent = "";
        messageElement.className = "contact__message";

        try {
            const formData = new FormData(contactForm);

            await fetch(webAppUrl, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });

            // 送信完了メッセージ
            messageElement.textContent =
                "お問い合わせを送信しました。";

            messageElement.classList.add(
                "contact__message--success"
            );

            // ボタンを送信完了表示に変更
            submitButton.textContent = "✓ 送信完了";
            submitButton.classList.add("is-complete");

            // 入力内容を空にする
            contactForm.reset();

        } catch (error) {
            console.error(error);

            messageElement.textContent =
                "送信できませんでした。時間をおいて再度お試しください。";

            messageElement.classList.add(
                "contact__message--error"
            );

            // 失敗時は再送信できる状態に戻す
            submitButton.disabled = false;
            submitButton.textContent = "送信";
            submitButton.classList.remove("is-complete");
        }

    });




});
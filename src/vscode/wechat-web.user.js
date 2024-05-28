// ==UserScript==
// @name         WeChat Web App with VS Code Style
// @namespace    https://github.com/bensgith/tampermonkey-scripts
// @version      0.7.6
// @description  Change style to VS Code-alike
// @author       Benjamin L
// @match        https://wx2.qq.com/*
// @icon         https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico
// @grant        GM_addStyle
// @grant        GM_addElement
// ==/UserScript==

(function() {
    'use strict';

    let vscode_favico = 'https://code.visualstudio.com/favicon.ico';
    let vscode_name = 'VS Code';


    // change tab tittle and icon
    var shortcut_icon = document.getElementsByTagName('link')[0];
    shortcut_icon.href = vscode_favico;
    // set title every 0.5 second, never end
    setInterval(function() {
        var titleNode = document.getElementsByTagName('title')[0];
        titleNode.innerHTML = vscode_name;
    }, 500);


    // login page
    if (document.getElementsByClassName('login').length > 0) {
        var loginAvatarInterval = setInterval(function() {
            var association_img = document.getElementsByClassName('association')[0].firstElementChild;
            association_img.src = vscode_favico;
        }, 500);
    }


   var headerAvatarInterval = setInterval(function() {
        var nickname = document.getElementsByClassName('nickname')[0].firstElementChild;
        var avatarImg = document.querySelector(".header .avatar .img");
        if (avatarImg.src != vscode_favico && nickname.innerHTML === vscode_name) {
            // if successfully changed, show avatar and name
            GM_addStyle('.header .avatar .img{display:block;width:27px;height:27px}');
            GM_addStyle('.header .info .nickname .display_name{display:inline-block;width:auto}');
        }
        avatarImg.src = vscode_favico;
        nickname.innerHTML = vscode_name;
    }, 500);


    var css = `
        /* Common elements */
        .main {
            min-height:100%;
            padding-top:0px;
        }
        .main .copyright {
            display:none;
        }
        .main_inner {
            max-width:100%;
        }
        .button_primary {
            background-color:#0E639C !important;
            border-color:#0E639C !important;
        }
        .button_default,
        .waiting_confirm  {
            background-color:#333333 !important;
            color:white !important;
        }


        /* Login Page */
        .lang,
        .copyright,
        .sub_title,
        .sub_desc,
        .web_wechat_login_logo {
            display:none;
        }
        .login {
            background-color:#333333;
        }
        .login_box {
            background-color:#1E1E1E;
        }
        .login_box .avatar .action {
            background-color:#333333 !important;
            color:white !important;
        }


        /* Chatting Page */
        /* left panel */
        #search_bar,
        .tab,
        .download_entry,
        .header .avatar .img,
        .header .info .nickname .display_name,
        .chat_item .avatar .img,
        .chat_item .info .msg,
        .chat_item .ext,
        .chat_item .nickname .emoji {
            display: none;
        }
        .panel{
            background-color:#252526;
            width:220px;
        }
        .dropdown_menu {
            background-color:#333333;
            border-color:#414141;
        }
        .dropdown_menu li a {
            border-bottom-color:#414141;
            color:white;
        }
        .dropdown_menu li a:hover {
            background-color:#37373D;
        }
        .chat_item {
            padding:6px 20px 6px;
            border-bottom: none;
        }
        .chat_item .avatar {
            height: 15px;
            width: 15px;
            float: left;
            margin-right: 5px;
            position: relative;
            background: url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position: -224px -170px;
            background-size: 478px 462px;
        }
        .chat_item.active {
            background:#37373D;
        }
        .nav_view {
            top:64px !important;
        }
        .web_wechat_reddot {
            background:url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position:-473px -380px;
        }
        .web_wechat_reddot_middle {
            background:url(https://img2.imgtp.com/2024/04/18/vNEgsIni.png) no-repeat;
            background-position: -451px -380px;
        }


        /* message panel */
        .web_wechat_nomes_icon,
        .bubble_cont .app .cover,
        .box_hd .title .title_name .emoji,
        .message .avatar,
        .message .nickname .emoji,
        .message .message_system .content .emoji {
            display:none;
        }
        #chatArea {
            background-color:#1E1E1E;
            color:white;
        }
        .box_hd {
            text-align: left;
        }
        .box_hd .title_wrap {
            border-bottom-color: #414141;
            background-color: #1E1E1E;
        }
        .box_hd .title .title_name {
            color: white;
        }
        .members_wrp {
            box-shadow: none;
            -moz-box-shadow: none;
            -webkit-box-shadow: none;
        }
        .members {
            background-color: #252526;
            border-bottom-color: #414141;
        }
        .bubble {
            background-color:#1E1E1E !important;
            margin:3px 10px;
            max-width: none;
        }
        .bubble.bubble_primary.right.arrow_primary:before,
        .bubble.bubble_primary.right:after {
            border-left-color:#0E639C;
        }
        .bubble_cont .app {
            background-color:#2D2D2D;
            padding: 2px 6px;
            margin:0 4px;
            max-width: none;
        }
        .bubble_cont .app .title {
            color:white;
            margin-bottom: 2px;
        }
        .bubble_cont .plain {
            padding: 2px 6px;
        }
        .bubble_cont .picture {
            padding:0 8px;
        }
        .bubble:after,
        .bubble:before {
            top: 7px;
        }
        .message {
            margin-bottom:0;
        }
        .message_system {
            margin:0 auto;
            text-align: left;
            max-width: none;
        }
        .message_system .content {
            padding: 1px 16px;
        }
        .content .masked {
            color: #6A9955;
        }


        /* reply panel */
        .btn_send,
        .chat .box_ft .desc {
            display:none;
        }
        .chat .box_ft {
            border-top-color:#414141;
        }
        .chat .box_ft .action {
            background-color:#1E1E1E !important;
        }
        .exp_hd,
        .exp_hd_item {
            background-color:#333333;
        }
        .exp_bd,
        .exp_hd_item.active {
            background-color:#252526;
        }
        .exp_hd_item a {
            color:white;
        }
        .expression {
            border-color:#414141;
        }
        .expression:after {
            border-top-color:#252526;
        }
        .qq_face a,
        .emoji_face a {
            border-bottom-color:#414141;
            border-right-color:#414141;
        }


        /* dialog */
        .ngdialog.default .ngdialog-content {
            background-color:#252526;
            color:white;
        }
        .add_chatroom .dialog_hd .title,
        .create_chatroom_dlg .dialog_hd .title,
        .transpond-dialog .dialog_hd .title,
        .selector,
        .chooser .contact_title {
            background-color:#252526;
        }
        .transpond-dialog .dialog_ft .button_primary {
            background-color:#0E639C;
        }
        .nav_tab,
        .selector .input_box .input {
            background-color:#252526;
            color:white;
        }
        .chooser .contact_item {
            background-color:#252526;
            border-bottom-color:#414141;
        }
        .chooser .active .contact_item {
            background-color:#2D2D2D;
            border-bottom-color:#414141;
        }
        .nav_tabs {
            background-color:#252526;
            border-bottom-color:#414141;
            color:white;
        }
        .dialog_ft {
            border-top-color:#414141;
        }
        .rooms .contact_list .contact_item {
            border-bottom-color:#414141;
        }
        .rooms .contact_list .info .nickname {
            color:white;
        }
    `;
    GM_addStyle(css);

    // clear intervals after 10 mins
    setTimeout(function() {
        clearInterval(loginAvatarInterval);
        console.log('cleared interval: loginAvatarInterval');
        clearInterval(headerAvatarInterval);
        console.log('cleared interval: headerAvatarInterval');
    }, 600000);

    // mask chat item name on the side panel
    maskChatItemNames();
    // mask media content like pictures, videos
    maskMessageMediaContent();
    // mask emojis, qq emojis, custom emojis
    maskMessageEmojis();

    maskSystemMessages();


    //////////////////////////////
    // functions
    //////////////////////////////
    function maskChatItemNames() {
        var maskedNames = ['Algorithm', 'Database', 'Binary', 'Compiler', 'Encryption', 'Firewall', 'Cloud Computing', 'Kernel', 'Network', 'Protocol',
        'Cache', 'Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Big Data', 'Virtualization', 'Debugging', 'API', 'Recursion', 'Syntax'];
        setInterval(function() {
            var names = document.querySelectorAll(".chat_item .info .nickname_text");
            for (let i = 0; i < names.length; i++) {
                names[i].innerHTML = maskedNames[i];
            }
        }, 1000);
    }

    function maskMessageEmojis() {
        setInterval(function() {
            var emojis = document.querySelectorAll(".content .bubble .bubble_cont .plain .emoji");
            var qqEmojis = document.querySelectorAll(".content .bubble .bubble_cont .plain .qqemoji");
            var customEmojis = document.querySelectorAll(".content .emoticon .custom_emoji");

            var maskContent = "";
            for (let i = 0; i < emojis.length; i++) {
                if (i == 0) {
                    maskContent += "// emoji";
                } else {
                    maskContent += " emoji ";
                }

                GM_addElement(emojis[i].parentElement, 'span', {
                    class: 'masked',
                    textContent: maskContent
                });
                emojis[i].remove();
            }

            maskContent = "";
            for (let i = 0; i < qqEmojis.length; i++) {
                if (i == 0) {
                    maskContent += "// " + qqEmojis[i].getAttribute("text");
                } else {
                    maskContent += qqEmojis[i].getAttribute("text");
                }

                GM_addElement(qqEmojis[i].parentElement, 'span', {
                    class: 'masked',
                    textContent: maskContent
                });
                qqEmojis[i].remove();
            }

            maskContent = "// custom_emoji";
            for (let i = 0; i < customEmojis.length; i++) {
                GM_addElement(customEmojis[i].parentElement, 'span', {
                    class: 'masked',
                    textContent: maskContent
                });
                customEmojis[i].remove();
            }
        }, 1000);
    }

    function maskMessageMediaContent() {
        setInterval(function() {
            // mask images
            var pictures = document.querySelectorAll(".content .bubble .bubble_cont .picture");
            for (let i = 0; i < pictures.length; i++) {
                pictures[i].parentElement.innerHTML = getMaskHtml('IMAGE');
            }
            // mask videos
            var videos = document.querySelectorAll(".content .bubble .bubble_cont .video");
            for (let i = 0; i < videos.length; i++) {
                videos[i].parentElement.innerHTML = getMaskHtml('VIDEO');
            }
            // mask location
            var locations = document.querySelectorAll(".content .bubble .bubble_cont .location");
            for (let i = 0; i < locations.length; i++) {
                locations[i].parentElement.innerHTML = getMaskHtml('LOCATION');
            }
            // mask unsupported message hints
            var plainMsgs = document.querySelectorAll(".content .bubble .bubble_cont .plain pre");
            for (let i = 0; i < plainMsgs.length; i++) {
                if (plainMsgs[i].innerHTML.includes("收到一条网页版微信暂不支持的消息类型")) {
                    plainMsgs[i].innerHTML = '<p class="masked">// UNSUPPORTED MESSAGE</p>';
                } else if (plainMsgs[i].innerHTML.includes("Send an emoji, view it on mobile")) {
                    plainMsgs[i].innerHTML = '<p class="masked">// EMOJI</p>';
                }
            }
            // mask name cards
            var cards = document.querySelectorAll(".content .bubble .bubble_cont .card");
            for (let i = 0; i < cards.length; i++) {
                var name = cards[i].querySelectorAll(".card_bd .info h3")[0];
                cards[i].parentElement.innerHTML = getMaskHtml('CARD: ' + name.innerText);
            }
        }, 1000);
    }

    function maskSystemMessages() {
        setInterval(function() {
            var sysMsgs = document.querySelectorAll(".message .message_system .content");
            var sysMsgsStr;
            for (let i = 0; i < sysMsgs.length; i++) {
                sysMsgsStr = sysMsgs[i].innerHTML;
                if (!sysMsgsStr.includes("//")) {
                    sysMsgs[i].innerHTML = "";
                    GM_addElement(sysMsgs[i], 'p', {
                        class: 'masked',
                        textContent: '// ' + sysMsgsStr
                    });
                }

            }
        }, 1000);
    }

    function getMaskHtml(maskText) {
        return `<div class="plain">
                    <pre class="js_message_plain masked">// ${maskText}</pre>
                    <img ng-show="message.MMStatus == 1" class="ico_loading ng-hide" src="//res.wx.qq.com/t/wx_fed/webwx/res/static/img/xasUyAI.gif" alt="">
                    <i class="ico_fail web_wechat_message_fail ng-hide" ng-click="resendMsg(message)" ng-show="message.MMStatus == 5" title="Resend"></i>
                </div>`;
    }

})();
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenuButton = document.getElementById("closeMenuButton");


// ===== 開啟選單 =====

function openMenu() {
    sideMenu.classList.add("open");
    menuOverlay.classList.add("show");

    document.body.classList.add("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );
}


// ===== 關閉選單 =====

function closeMenu() {
    sideMenu.classList.remove("open");
    menuOverlay.classList.remove("show");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );
}


// 點擊右上 ☰

menuButton.addEventListener(
    "click",
    openMenu
);


// 點擊 X

closeMenuButton.addEventListener(
    "click",
    closeMenu
);


// 點擊黑色背景

menuOverlay.addEventListener(
    "click",
    closeMenu
);


// 按 Esc 也可以關閉

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);


// 點選選單中的連結後自動關閉

const menuLinks =
    document.querySelectorAll(
        ".side-menu-nav a"
    );

menuLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        closeMenu
    );

});

// ===== 捲動時控制 Header 顯示 / 隱藏 =====

const header = document.querySelector(".header");

let lastScrollY = window.scrollY;

const hideHeaderAfter = 120;


window.addEventListener("scroll", function () {

    const currentScrollY = window.scrollY;

    // 側邊選單開啟時，不隱藏 Header
    if (document.body.classList.contains("menu-open")) {

        header.classList.remove("header-hidden");

        lastScrollY = currentScrollY;

        return;
    }


    // 接近頁面最上方時，永遠顯示 Header
    if (currentScrollY <= 20) {

        header.classList.remove("header-hidden");

    }

    // 往下滑，而且已經離開首頁頂端一段距離
    else if (
        currentScrollY > lastScrollY &&
        currentScrollY > hideHeaderAfter
    ) {

        header.classList.add("header-hidden");

    }

    // 往上滑
    else if (currentScrollY < lastScrollY) {

        header.classList.remove("header-hidden");

    }


    lastScrollY = currentScrollY;

});

// ===== 外觀設定 =====

const appearanceButton =
    document.getElementById("appearanceButton");

const appearancePanel =
    document.getElementById("appearancePanel");

const backgroundDots =
    document.querySelectorAll(".background-dot");

const textDots =
    document.querySelectorAll(".text-dot");

const resetThemeButton =
    document.getElementById("resetThemeButton");


// ===== 預設配色 =====

const backgrounds = {

    purple:
        "radial-gradient(circle at top, #24113d 0%, #12091f 45%, #09060f 100%)",

    black:
        "linear-gradient(180deg, #111111 0%, #050505 100%)",

    blue:
        "radial-gradient(circle at top, #102a4d 0%, #08182d 45%, #040b15 100%)",

    green:
        "radial-gradient(circle at top, #16382d 0%, #0b211a 45%, #050e0b 100%)",

    light:
        "linear-gradient(180deg, #f4f0f6 0%, #ddd6e4 100%)"

};


const textColors = {

    white: "#f4efff",

    purple: "#d9a7ff",

    yellow: "#ffe89c",

    green: "#a8f0c6",

    black: "#15121a"

};


// ===== 哪些文字適合哪些背景 =====

const allowedTextColors = {

    purple: [
        "white",
        "purple",
        "yellow",
        "green"
    ],

    black: [
        "white",
        "purple",
        "yellow",
        "green"
    ],

    blue: [
        "white",
        "purple",
        "yellow",
        "green"
    ],

    green: [
        "white",
        "yellow",
        "green"
    ],

    light: [
        "black"
    ]

};


// ===== 目前選擇 =====

let selectedBackground =
    localStorage.getItem("bzhouse-background")
    || "purple";

let selectedText =
    localStorage.getItem("bzhouse-text")
    || "white";


// ===== 展開 / 收起外觀設定 =====

appearanceButton.addEventListener(
    "click",
    function () {

        appearancePanel.classList.toggle("open");

    }
);


// ===== 套用主題 =====

function applyTheme() {

    const allowed =
        allowedTextColors[selectedBackground];

    // 如果現在的文字顏色不能搭新背景
    // 就自動換成第一個安全顏色
    if (!allowed.includes(selectedText)) {

        selectedText = allowed[0];

    }


    document.documentElement.style.setProperty(
        "--page-background",
        backgrounds[selectedBackground]
    );

    document.documentElement.style.setProperty(
        "--text-main",
        textColors[selectedText]
    );


    localStorage.setItem(
        "bzhouse-background",
        selectedBackground
    );

    localStorage.setItem(
        "bzhouse-text",
        selectedText
    );


    updateThemeButtons();

}


// ===== 更新按鈕狀態 =====

function updateThemeButtons() {

    backgroundDots.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.background
                === selectedBackground
        );

    });


    const allowed =
        allowedTextColors[selectedBackground];


    textDots.forEach(function (button) {

        const color =
            button.dataset.text;

        button.disabled =
            !allowed.includes(color);

        button.classList.toggle(
            "active",
            color === selectedText
        );

    });

}


// ===== 選背景 =====

backgroundDots.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            selectedBackground =
                button.dataset.background;

            applyTheme();

        }
    );

});


// ===== 選文字 =====

textDots.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            if (button.disabled) {
                return;
            }

            selectedText =
                button.dataset.text;

            applyTheme();

        }
    );

});


// ===== 恢復 Bzhouse 預設 =====

resetThemeButton.addEventListener(
    "click",
    function () {

        selectedBackground = "purple";
        selectedText = "white";

        applyTheme();

    }
);


// 網頁一開啟就套用之前的設定

applyTheme();


// ========================================
// 複製 Email
// ========================================

const copyEmailButton = document.getElementById("copyEmail");

if (copyEmailButton) {

    copyEmailButton.addEventListener("click", async (event) => {

        event.preventDefault();

        const email = copyEmailButton.dataset.email;

        try {

            await navigator.clipboard.writeText(email);

            copyEmailButton.textContent = "已複製";

            setTimeout(() => {
                copyEmailButton.textContent = "Email";
            }, 1500);

        } catch (error) {

            const tempInput = document.createElement("textarea");

            tempInput.value = email;
            tempInput.style.position = "fixed";
            tempInput.style.opacity = "0";

            document.body.appendChild(tempInput);

            tempInput.select();
            document.execCommand("copy");

            document.body.removeChild(tempInput);

            copyEmailButton.textContent = "已複製";

            setTimeout(() => {
                copyEmailButton.textContent = "Email";
            }, 1500);

        }

    });

}
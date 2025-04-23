// Simon Says Game

let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "teal"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// (step - 1) keypress --> gamestart

document.addEventListener("keypress", function () {
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});






// (step - 2) btnflash + level 1 + updating value on h2

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random btn choose

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);    
};






// (step - 3) btn press[event listeners for each btn] -->  check that user pressed btn is align to the game sequence (if sequence is match then game will levelup and if that sequence dosen't match then the game will over)

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any kay to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress () {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
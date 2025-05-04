let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "grey", "purple", "red"];

let started = false;
let level = 0;
let highscore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

// Function to play sound for a specific button color
function playSound(color) {
    const sound = document.getElementById(`${color}-sound`);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// Function to play level up sound
function playLevelUpSound() {
    const sound = document.getElementById("level-up-sound");
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play();
}

// Function to play game over different sounds
function playGameOverSound() {
    const sound = document.getElementById("game-over-sound");
    sound.currentTime = 0;
    sound.volume = 0.3;
    sound.play();
}

function btnFlash(btn) {
    const color = btn.getAttribute("id");
    playSound(color);

    btn.classList.add("flashBtn");
    setTimeout(function () {
        btn.classList.remove("flashBtn");
    }, 500);
}

function userFlash(btn) {
    const color = btn.getAttribute("id");
    playSound(color);

    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 500);
}

function levelUp() {
    userSeq = [];
    level++;
    if (level > highscore) {
        highscore = level;
    }
    h2.innerText = `Level ${level}`;

    // Play level up sound for levels after the first one
    if (level > 1) {
        playLevelUpSound();
    }

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        playGameOverSound();
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any Key to Start.`;
        h3.innerHTML = `Highest Score =  ${highscore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}


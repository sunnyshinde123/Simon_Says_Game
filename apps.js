let gameSeq=[];
let userSeq=[];

let h3=document.querySelector('h3');

let startedGame=false;

let level=0;

let score=0;
let highestScore;
let finalScore=0;

let btn=['yellow','red','green','purple'];

document.addEventListener('keypress', function(){
    if(startedGame==false){
        levelUp();
        startedGame=true;
    }

})

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btn[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add("flashColor");
    setTimeout(function(){
        btn.classList.remove("flashColor");
    }, 250)

}

function userFlash(btn){
    btn.classList.add("flashColor");
    setTimeout(function(){
        btn.classList.remove("flashColor");
    }, 250)

}

function check(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            score+=5;
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(highestScore>score){
            finalScore=highestScore;
        }
        h3.innerHTML=`Game Over! Your Score was <u>${score}</u><br>But Your previous highest score was <u>${finalScore}</u> <br>Press Any Key to Start Again...`;
        let body=document.querySelector('body');
        body.classList.add('danger');
        setTimeout(function(){
            body.classList.remove('danger');
        }, 150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute('id');
    userSeq.push(userColor);
    check(userSeq.length-1);
}

let allBtn=document.querySelectorAll('.btn-box');
for(btns of allBtn){
    btns.addEventListener('click', btnPress);
}

function reset(){
    startedGame=false;
    level=0;
    gameSeq=[];
    highestScore=score;
    score=0;
}
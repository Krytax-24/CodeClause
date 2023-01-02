buttonColors = ["red", "blue", "green", "yellow"]
let randomNum
gamePatten = [];
userPatten = [];
gameState = false
levelCounter = 0
let clickState = true



//GAME START
$(document).keypress(function(e) {
    if (gameState === false) {
        nextSequence();
    }
    gameState = true
});

function nextSequence() {

    userPatten = []
        //RANDOM NUMBER GENERATOR
    var randomNum = Math.floor(Math.random() * 4)
    randomColor = buttonColors[randomNum]
    gamePatten.push(randomColor)
    console.log(`gamePatten:${gamePatten}`);
    //AUDIO JS
    audioPlayer(randomColor);
    // ANIMATION
    animation(`#${randomColor}`)
        //HEADING CHANGER
    levelCounter++
    $('h1').html(`Level ${levelCounter}`);


}

function animation(button) {
    $(button).fadeOut(200).fadeIn(200);
    $(button).addClass("pressed")
    setTimeout(() => {
        $(button).removeClass("pressed")
    }, 100);

}

//USER INPUTS
if (clickState === true) {
    $(".btn").click(function(e) {
        //ANIMATION
        animation(this);
        // BUTTON PUSH
        clickBtn = this.id
        userPatten.push(clickBtn);
        console.log(`userPatten:${userPatten}`);
        audioPlayer(clickBtn);
        answerChecker()
    });
}


function answerChecker() {
    if (userPatten[userPatten.length - 1] === gamePatten[userPatten.length - 1]) {
        console.log('sucessfull');
        if (userPatten.length === gamePatten.length) {
            gamePattenRepeter();
        }
    } else {
        clickState = false
        console.log('wrong');
        audioPlayer(`wrong`);
        $("body").addClass('game-over');
        setTimeout(() => {
            $('body').removeClass(`game-over`)
        }, 100)
        $(`#level-title`).html(`Game Over, Press Any Key to Restart`)
        gameRestarter();
    }

}

function gameRestarter() {
    userPatten = []
    gamePatten = []
    levelCounter = 0
    gameState = false
    clickState = true
}



function audioPlayer(audioFile) {
    let audio = new Audio(`sounds/${audioFile}.mp3`)
    audio.play();
}



function gamePattenRepeter() {
    console.log(`function works`);
    let timeOutAnimationValue = 1000;
    let timeOutNextSeqValue1 = 1500;
    for (const elements of gamePatten) {

        timeOutAnimationValue += 500
        timeOutNextSeqValue1 += 500
        setTimeout(() => {
            console.log(elements);
            animation(`#${elements}`);
            audioPlayer(elements)

        }, timeOutAnimationValue);




    }
    setTimeout(() => {

        nextSequence();

    }, timeOutNextSeqValue1);

}
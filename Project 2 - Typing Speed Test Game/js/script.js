let startBtn = document.querySelector("#start-btn");
let wordList = document.querySelector(".word-list");
let wordCount = 10;
wordList.textContent = "Click on start to check your typing.";

let isGameOver = true;
console.log(startBtn)

startBtn.addEventListener("click",function(e){
    if(startBtn.innerText === "START"){
        startBtn.innerText = "NEW TEXT";
        // startGame();      
    }else{
        startBtn.innerText = "START";
    }
});



function startGame(){
    let road = document.querySelector(".road");
    let roadWidth = road.getBoundingClientRect().width;
    let carSpeed = Math.floor(roadWidth/wordCount);
    let date = new Date();
    var startTime = date.getTime();
    let obj = document.getElementById("obj");
    let typingSpeed = 0;
    let randomWordList = randomWordGenerator(wordCount);
    let typedWord = document.getElementById("typed-word");
    let attempt = 0;
    
    
    // Display randow word on the screen
    wordList.textContent = randomWordList.join(" ");
    typedWord.autofocus = true;
    console.log(typedWord.autofocus);
    typedWord.addEventListener("keypress",function(e){
        // if(isGameOver){

        // }
        // else if(attempt < wordCount){
        //     isGameOver = false;
        //     start.textContain = "Stop";
        // }

        if(e.key == 'Enter' || e.code == 'Space'){
            console.log(typedWord.value);
            console.log(randomWordList[attempt])

            if(attempt < wordCount){
                if(typedWord.value.trim() === randomWordList[attempt]){
                    typingSpeed = typingSpeedCal(startTime);
                    document.querySelector(".typing-speed").textContent = `Speed: ${typingSpeed}wpm`
                    obj.style.translate = `${carSpeed * (attempt+1)}px`; //because attepmt is zero so, in the first attempt it wont't move.
                    console.log(`${carSpeed * (attempt+1)}px`);
                    
                }
                attempt++;
            }if(attempt >= wordCount){
                startBtn.innerText = "NEW TEXT";
                alert(`Game Over!! Your Speed is ${typingSpeed}`)
            }
            typedWord.value = "";
        }
    });
}

function typingSpeedCal(startTime){
    date = new Date();
    let endTime = date.getTime();
    let totalTime = ((endTime - startTime) /1000);
    return Math.round((wordCount/totalTime) * 60);
}


function randomWordGenerator(wordCount = 1){
    const wordsList = ['Rock', 'Paper', 'Scissor', 'army', 'beautiful', 'became', 'if', 'actually','became', 'arrow', 'article', 'therefore','beside', 'between', 'salt', 'practical', 'also', 'brief', 'country', 'muscle', 'neighborhood', 'beyond', 'grew', 'pig','equator', 'variety', 'salt', 'usually', 'importance', 'becoming', 'stream', 'several', 'goes', 'fight', 'HAVING', 'LOAD', 'LOST', 'PINE', 'GAME', 'SLOPE', 'SECRET', 'GIANT', 'INDEED', 'LOCATION', 'Until', 'smoke', 'Year', 'strength', 'Pay', 'knew', 'Fallen', 'must', 'Chief', 'arrow' ];
    let result = [];
    for(let i = 0; i < wordCount; i++){
        var word = wordsList[Math.floor(Math.random()*wordsList.length)];
        result.push(word);
    }
    return result;
}





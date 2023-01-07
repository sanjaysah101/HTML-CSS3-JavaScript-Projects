let startBtn = document.querySelector("#start-btn");
let wordList = document.querySelector(".word-list");
let wordCount = 10;
wordList.textContent = "Click on start to check your typing.";
let corectAns = 0;
let attempt = 0;
let randomWordList = randomWordGenerator(wordCount);
let isGameOver = true;
let typingSpeed = 0;
// console.log(startBtn)

startBtn.addEventListener("click",function(e){
    if(startBtn.innerText === "START"){
        startBtn.innerText = "NEW TEXT";
        startGame();      
        console.log("start")
    }else{
        newGame();
    }
});

function newGame(){
    corectAns = 0;
    obj.style.translate = `0px`;
    startBtn.innerText = "START";
    attempt = 0;
    randomWordList = randomWordGenerator(wordCount);
    typingSpeed = 0;
    document.querySelector(".typing-speed").textContent = `Speed: ${typingSpeed} wpm`;
    highlight(randomWordList, randomWordList[attempt]);
}

function startGame(){
    let road = document.querySelector(".road");
    let roadWidth = road.getBoundingClientRect().width;
    let carSpeed = Math.floor(roadWidth/wordCount);
    let date = new Date();
    var startTime = date.getTime();
    let obj = document.getElementById("obj");
    
    
    let typedWord = document.getElementById("typed-word");
    
    
    
    // Display randow word on the screen
    // const textString = randomWordList.join(" ");
    // wordList.textContent = textString;
    // typedWord.autofocus = true;

    highlight(randomWordList, randomWordList[attempt]);

    console.log("randomWordList[attempt] "+randomWordList[attempt]);
    typedWord.addEventListener("keypress",function(e){
        // if(isGameOver){

        // }
        // else if(attempt < wordCount){
        //     isGameOver = false;
        //     start.textContain = "Stop";
        // }

        if(e.key == 'Enter' || e.code == 'Space'){
            console.log("aFTER ENTER PRESSED");
            // highlight(textString, randomWordList[1]);
            // console.log(randomWordList[1]);
            // highlight(textString, randomWordList[0]);
            // console.log(typedWord.value);
            // console.log(randomWordList[attempt])
            // highlight(randomWordList, 1);
            console.log("aFTER ENTER PRESSED END");
            if(attempt < wordCount -1 ){
                highlight(randomWordList, randomWordList[attempt+1]);
                if(typedWord.value.trim() === randomWordList[attempt]){
                    typingSpeed = typingSpeedCal(startTime);
                    document.querySelector(".typing-speed").textContent = `Speed: ${typingSpeed}wpm`;
                    obj.style.translate = `${carSpeed * (corectAns+1)}px`; //because attepmt is zero so, in the first attempt it wont't move.
                    // console.log(`${carSpeed * (attempt+1)}px`);
                    corectAns++;
                    
                }
            }if(attempt >= (wordCount - 1) ){
                startBtn.innerText = "NEW TEXT";
                alert(`Game Over!! Your Speed is ${typingSpeed} and total corret words are ${corectAns}`)
            }
            attempt++;
            typedWord.value = "";
        }
    });
}


function highlight(randomWordList, word){
    console.log("inSDE HIGHLIST FNC")
    let textString = randomWordList.join(" ");
    let inputText = document.querySelector(".word-list");;
    console.log("word "+word)
    let index =  textString.indexOf(word);
    // console.log("textString.length "+textString.length);
    let innerHTMLText = textString.substring(0,index) + "<span class='highlight'>" + textString.substring(index,index+word.length) + "</span>" + textString.substring(index + textString.length);
    inputText.innerHTML = innerHTMLText;
    // console.log(text.substring(index,index+word.length) +" sanjay");
    console.log("tEXT sTRING "+textString);
    // console.log(word+" found at "+index);
    
    // let wordList = document.querySelector(".word-list");
    // let innerHTML = wordList.innerHTML;
    // innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + text + "</span>" + innerHTML.substring(index + text.length);
    // console.log("innerHtml"+innerHTML.substring(index,index+text.length));
    // console.log("sfs");
    // console.log(innerHTML);
    // wordList.innerHTML = "";
    // wordList.innerHTML = innerHTML;
    
    
    console.log("inSDE HIGHLIST FNC END")
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





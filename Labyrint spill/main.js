//Deffiner spiller
class Man{
    x=0;
    y=0;
    w=20;
    h=20;
    vx=5;
    vy=5;
    harSverd = false
    harShield = false
    div = undefined;
    setMan(){
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.w + "px";
        this.div.style.height = this.h + "px";
    }
}

const divBrett = document.getElementById("brett");

const m = new Man();
m.x = 1200
m.y = 120
m.h = 40
m.w = 40
m.y = 560;
m.vx = 10;
m.vy = -10;
m.div = document.createElement("div");
divBrett.append(m.div);
m.div.className = "Man";
// m.div.style.backgroundColor = "blue";
m.div.style.backgroundImage = "url(AvatarFsverd.png)";
m.setMan();

let antForsøk = document.getElementById("forsøk");
let forsøk = 0;
antForsøk.innerHTML = "Your tries: ";

//Deffiner trusler
class Trussel{
    x=0;
    y=0;
    w=20;
    h=20;
    vx=5;
    vy=5;
    div = undefined;
    setTrussel(){
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.w + "px";
        this.div.style.height = this.h + "px";
    }
}

//Sverd
class Sverd{
    x=0;
    y=0;
    w=20;
    h=20;
    vx=5;
    vy=5;
    div = undefined;
    setSverd(){
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.w + "px";
        this.div.style.height = this.h + "px";
    }
}
const s = new Sverd;
s.x = 680;
s.y = 530;
s.h = 40;
s.w = 40;
s.div = document.createElement("div");
divBrett.append(s.div),
s.div.className = "sword";
s.div.style.backgroundImage = "url(sword.png)"
s.setSverd();

//sh er shield
const sh = new Sverd;
sh.x = 930;
sh.y = 180;
sh.h = 40;
sh.w = 40;
sh.div = document.createElement("div");
divBrett.append(sh.div),
sh.div.className = "sword";
sh.div.style.backgroundImage = "url(shield.png)"
sh.setSverd();

const fire = new Sverd;
fire.x = 730;
fire.y = 305;
fire.h = 75;
fire.w = 75;
fire.div = document.createElement("div");
divBrett.append(fire.div),
fire.div.className = "fire";
fire.div.style.backgroundImage = "url(fire.gif)";
// fire.div.style.backgroundColor = "blue";
fire.setSverd();

class Brett{
    x=0;
    y=0;
    w=40;
    h=20;
    div;
    setBrett(){
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.w + "px";
        this.div.style.height = this.h + "px";
    }
}

const b1 = new Brett;
b1.x = 1010;
b1.y = 502.5;
b1.h = 30;
b1.w = 235;
b1.div = document.createElement("div");
divBrett.append(b1.div),
b1.div.className = "brett";
b1.div.style.backgroundColor = "red";
b1.setBrett();

const b2 = new Brett;
b2.x = 875;
b2.y = 130;
b2.h = 30;
b2.w = 283;
b2.div = document.createElement("div");
divBrett.append(b2.div),
b2.div.className = "brett";
b2.div.style.backgroundColor = "red";
b2.setBrett();

const b3 = new Brett;
b3.x = 745;
b3.y = 382;
b3.h = 30;
b3.w = 283;
b3.div = document.createElement("div");
divBrett.append(b3.div),
b3.div.className = "brett";
b3.div.style.backgroundColor = "red";
b3.setBrett();

const b4 = new Brett;
b4.x = 625;
b4.y = 489;
b4.h = 30;
b4.w = 283;
b4.div = document.createElement("div");
divBrett.append(b4.div),
b4.div.className = "brett";
b4.div.style.backgroundColor = "red";
b4.setBrett();

const b5 = new Brett;
b5.x = 140;
b5.y = 490;
b5.h = 30;
b5.w = 265;
b5.div = document.createElement("div");
divBrett.append(b5.div),
b5.div.className = "brett";
b5.div.style.backgroundColor = "red";
b5.setBrett();

const b6 = new Brett;
b6.x = 130;
b6.y = 256;
b6.h = 30;
b6.w = 399;
b6.div = document.createElement("div");
divBrett.append(b6.div),
b6.div.className = "brett";
b6.div.style.backgroundColor = "red";
b6.setBrett();

const b7 = new Brett;
b7.x = 30;
b7.y = 382;
b7.h = 30;
b7.w = 120;
b7.div = document.createElement("div");
divBrett.append(b7.div),
b7.div.className = "brett";
b7.div.style.backgroundColor = "red";
b7.setBrett();

const b8 = new Brett;
b8.x = 372;
b8.y = 370;
b8.h = 30;
b8.w = 158;
b8.div = document.createElement("div");
divBrett.append(b8.div),
b8.div.className = "brett";
b8.div.style.backgroundColor = "red";
b8.setBrett();

const b9 = new Brett;
b9.x = 130;
b9.y = 130;
b9.h = 30;
b9.w = 142;
b9.div = document.createElement("div");
divBrett.append(b9.div),
b9.div.className = "brett";
b9.div.style.backgroundColor = "red";
b9.setBrett();

const b10 = new Brett;
b10.x = 1123;
b10.y = 256;
b10.h = 30;
b10.w = 125;
b10.div = document.createElement("div");
divBrett.append(b10.div),
b10.div.className = "brett";
b10.div.style.backgroundColor = "red";
b10.setBrett();

const b11 = new Brett;
b11.x = 624;
b11.y = 256;
b11.h = 30;
b11.w = 156;
b11.div = document.createElement("div");
divBrett.append(b11.div),
b11.div.className = "brett";
b11.div.style.backgroundColor = "red";
b11.setBrett();

const b12 = new Brett;
b12.x = 497;
b12.y = 131;
b12.h = 30;
b12.w = 284;
b12.div = document.createElement("div");
divBrett.append(b12.div),
b12.div.className = "brett";
b12.div.style.backgroundColor = "red";
b12.setBrett();

const by1 = new Brett;
by1.x = 130;
by1.y = 160;
by1.h = 95;
by1.w = 30;
by1.div = document.createElement("div");
divBrett.append(by1.div),
by1.div.className = "brett";
by1.div.style.backgroundColor = "yellow";
by1.setBrett();

const by2 = new Brett;
by2.x = 377;
by2.y = 32;
by2.h = 130;
by2.w = 30;
by2.div = document.createElement("div");
divBrett.append(by2.div),
by2.div.className = "brett";
by2.div.style.backgroundColor = "yellow";
by2.setBrett();

const by3 = new Brett;
by3.x = 245;
by3.y = 285;
by3.h = 115;
by3.w = 30;
by3.div = document.createElement("div");
divBrett.append(by3.div),
by3.div.className = "brett";
by3.div.style.backgroundColor = "yellow";
by3.setBrett();

const by4 = new Brett;
by4.x = 750;
by4.y = 520;
by4.h = 95;
by4.w = 30;
by4.div = document.createElement("div");
divBrett.append(by4.div),
by4.div.className = "brett";
by4.div.style.backgroundColor = "yellow";
by4.setBrett();

const by5 = new Brett;
by5.x = 498;
by5.y = 500;
by5.h = 117;
by5.w = 30;
by5.div = document.createElement("div");
divBrett.append(by5.div),
by5.div.className = "brett";
by5.div.style.backgroundColor = "yellow";
by5.setBrett();

const by6 = new Brett;
by6.x = 876;
by6.y = 412;
by6.h = 75;
by6.w = 30;
by6.div = document.createElement("div");
divBrett.append(by6.div),
by6.div.className = "brett";
by6.div.style.backgroundColor = "yellow";
by6.setBrett();

const by7 = new Brett;
by7.x = 627;
by7.y = 394;
by7.h = 95;
by7.w = 30;
by7.div = document.createElement("div");
divBrett.append(by7.div),
by7.div.className = "brett";
by7.div.style.backgroundColor = "yellow";
by7.setBrett();

const by8 = new Brett;
by8.x = 998;
by8.y = 160;
by8.h = 220;
by8.w = 30;
by8.div = document.createElement("div");
divBrett.append(by8.div),
by8.div.className = "brett";
by8.div.style.backgroundColor = "yellow";
by8.setBrett();

const by9 = new Brett;
by9.x = 875;
by9.y = 160;
by9.h = 110;
by9.w = 30;
by9.div = document.createElement("div");
divBrett.append(by9.div),
by9.div.className = "brett";
by9.div.style.backgroundColor = "yellow";
by9.setBrett();

const by10 = new Brett;
by10.x = 627;
by10.y = 160;
by10.h = 96;
by10.w = 30;
by10.div = document.createElement("div");
divBrett.append(by10.div),
by10.div.className = "brett";
by10.div.style.backgroundColor = "yellow";
by10.setBrett();

const by11 = new Brett;
by11.x = 498;
by11.y = 130;
by11.h = 270;
by11.w = 30;
by11.div = document.createElement("div");
divBrett.append(by11.div),
by11.div.className = "brett";
by11.div.style.backgroundColor = "yellow";
by11.setBrett();

const by12 = new Brett;
by12.x = 1125;
by12.y = 255;
by12.h = 145;
by12.w = 30;
by12.div = document.createElement("div");
divBrett.append(by12.div),
by12.div.className = "brett";
by12.div.style.backgroundColor = "yellow";
by12.setBrett();

const by13 = new Brett;
by13.x = 748;
by13.y = 30;
by13.h = 130;
by13.w = 30;
by13.div = document.createElement("div");
divBrett.append(by13.div),
by13.div.className = "brett";
by13.div.style.backgroundColor = "yellow";
by13.setBrett();

const by14 = new Brett;
by14.x = 375;
by14.y = 370;
by14.h = 150;
by14.w = 30;
by14.div = document.createElement("div");
divBrett.append(by14.div),
by14.div.className = "brett";
by14.div.style.backgroundColor = "yellow";
by14.setBrett();


const t = new Trussel();
t.x = 240
// t.y = 400
t.h = 45
t.w = 45
t.y = 420;
t.vx = 5;
t.vy = -5;
t.div = document.createElement("div");
divBrett.append(t.div);
t.div.className = "Trussel";
// t.div.style.backgroundColor = "red";
t.div.style.backgroundImage = "url(monster.png)"
// t.div.innerHTML = "<h3>G</h3>";
t.setTrussel();

//Startknapp og enter trykk
var startKnapp = document.getElementById("start");
startKnapp.addEventListener("click", startSpillet);
document.onkeydown = clickToStart;
/**
 * @param {KeyboardEvent} e
 */
function clickToStart(e){
    if (e.key === "Enter"){
        startSpillet();
    }
};

//Lager ame score:
let gameScore = 4000;
var highScoreDIV = document.getElementById("highScoreLI");

//Lagre high score i en array;
let highScoreArray = [];

//Timer som teller hvor lang tid du bruker
var timer = document.getElementById("timer");
let tidBrukt = 90;
timer.innerHTML = "Time: ";

//Mørke ut bakrgunnen
var blackOut = document.getElementById("blackout");

//Spillebrett
var labyrint = document.getElementById("labyrint")

//Setter inn scoren din når du vinner eller taper;
var scoreList = document.getElementById("scoreListLi");

//Finne high score og lagre den slik at den vises 
function finnHighScore(score){
    let maxScore = highScoreArray[0];
    for (let i=0; i<score.length; i+=1){
        const hs = score[i];
        if (maxScore < hs){maxScore = hs};
    }
    return maxScore
}

//Lage en array som skal lagres i localStorrage
//Denne skal sorters slik at jeg enkelt kan hente ut første verdi
let storrageScore = [];
storrageScore.sort((a,b) => a-b).reverse();
storrageScore[0];

//Henter ut highscore;
//Ting fungerer nesten nå, men den henter alle localStorrage items
//Må få den til å kun huske den største, kanskje lage en forLoop
if (localStorage.length > 0){
    highScoreDIV.innerHTML += `<h2 id="highScore"> High score: ${localStorage.getItem("myScore")}`;
    header.style.marginLeft = "250px";
}   else{
    highScoreDIV.innerHTML += `<div id="noShow"`;
}

//Etter spiller har trykker på denne starter spillet,
//og nedtellingen starter.
function startSpillet(){
    startKnapp.style.display = "none";
    blackOut.style.display = "none";

    //Regner ut tiden
    setInterval(function(){
        tidBrukt -= 1;
        timer.innerHTML = "Time: " + tidBrukt + "s";
    },1000)

    //Redusere score for hvert sekund
        setInterval(function(){
            gameScore -= 15;
        },1000)

    //Trusselen starter å bevege seg.
    setInterval(flyttTrussel,25);
    function flyttTrussel(){
        t.x += t.vx;
        //Når trusselen treffer en vegg så snur den
        if (t.x > 325){
            t.vx = -t.vx;
        }
        if (t.x < 35){
            t.vx = -t.vx;
        }
        t.setTrussel();
    }

    //Her starter flyttPaaMannen funskjonen (spillet starter);
    setInterval(flyttPaaMannen,20);
    function flyttPaaMannen(){
        // De jeg bruker til å gi "fart" på ballen
        // m.x += m.vx;
        // m.y += m.vy;



        //Du må holde inne en av piltastene for å bevege mannen.
        document.onkeydown = checkKey;
        function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            // up arrow
            m.y += m.vy;
        }
        else if (e.keyCode == '40') {
            // down arrow
            m.y -= m.vy;
        }
        else if (e.keyCode == '37') {
            // left arrow
            m.x -= m.vx;
        }
        else if (e.keyCode == '39') {
            // right arrow
            m.x += m.vx
        }
        m.setMan();
        }

        //Hvis den treffer en del av veggene rundt:
        if (m.x > 1195){ // vegg mot høyre
            m.x = 1195;
        }
        if (m.y > 570){ // vegg nederst
            m.y = 570;
        }
        if (m.y < 10){  // vegg øverst
            m.y = 10;
        }
        if (m.x < 40){ // vegg mot venstre
            m.x = 40;
        }

        // Hvis du kommer i mål
        if ((m.x > 600 && m.x < 680) && (m.y < 20 && m.y > 0)){
            alert("Victory");
            m.x = 1200;
            m.y = 560;
            m.setMan();
            s.div.style.display = "block";
            t.div.style.backgroundColor = "";
            t.div.style.opacity = "1";
            m.harSverd = false;
            m.harShield = false;
            m.div.style.backgroundImage = "url(AvatarFsverd.png)"
            t.vx = 5;
            sh.div.style.display = "block";
            t.div.style.transform = "rotate(0deg)";
            t.div.style.transition = "0s";
            /*
            Pusher scoren.
            Fungerer kanskje men er veldig viktig at det det bare
            holdes 2-1 verdier inni arrayen
            **/
            highScoreArray.push(gameScore);
            storrageScore.push(gameScore);
            storrageScore.sort((a,b) => a-b);
            if (storrageScore[0] < gameScore){
                localStorage.setItem("myScore",gameScore);
            }
            //Setter inn scoren din når du vinner eller taper;
            scoreList.innerHTML = `<div id="noShow">${String(0)}`; //Denner bare ekststerer for å holde den slik at verdiene blir endret, ikke lagt til.
            scoreList.innerHTML += `<h2 id="Score">Score: ${gameScore}`;
            scoreList.innerHTML += `<h2 id="Time">Time: ${90-tidBrukt}s`;
            scoreList.innerHTML += `<h2 id="Attempts">Attempts: ${forsøk}`;
            highScoreDIV.innerHTML = `<div id="noShow"> ${String(0)}`;
            highScoreDIV.innerHTML += `<h2 id="highScore"> High score: ${finnHighScore(highScoreArray)}`;
            //Flytter på header
            var header = document.getElementById("header");
            header.style.marginLeft = "250px";
            //Tidbrukt og tid
            tidBrukt = 90;
            timer.innerHTML = "Time: ";
            forsøk = 0;
            antForsøk.innerHTML = "Your tries: ";
            gameScore = 4000;
            //Setter highscore i localStorrage
        }

        //Hvis forsøk overstiger 5
        if (forsøk >= 5){
            alert("You loose, try again");
            m.x = 1200;
            m.y = 580;
            m.setMan();
            m.div.style.backgroundImage = "url(AvatarFsverd.png)";
            m.harSverd = false;
            t.div.style.backgroundColor = "";
            t.vx = 5;
            m.harShield = false;
            sh.div.style.display = "block";
            s.div.style.display = "block";
            //Pusher scoren.
            highScoreArray.push(gameScore);
            storrageScore.push(gameScore);
            storrageScore.sort((a,b) => a-b);
            if (localStorage.length = 0){
                localStorage.setItem("myScore",gameScore);
            }   else if (storrageScore[0] < gameScore){
                localStorage.setItem("myScore",gameScore);
            }
            t.div.style.transform = "rotate(0deg)";
            t.div.style.transition = "0s";
           
            //Setter inn scoren din når du vinner eller taper;
            scoreList.innerHTML = `<div id="noShow">${String(0)}`; //Denner bare ekststerer for å holde den slik at verdiene blir endret, ikke lagt til.
            scoreList.innerHTML += `<h2 id="Score">Score: ${gameScore}`;
            scoreList.innerHTML += `<h2 id="Time">Time: ${90-tidBrukt}s`;
            scoreList.innerHTML += `<h2 id="Attempts">Attempts: ${forsøk}`;
            highScoreDIV.innerHTML = `<div id="noShow"> ${String(0)}`;
            highScoreDIV.innerHTML += `<h2 id="highScore"> High score: ${finnHighScore(highScoreArray)}`;
            //Flytter på header
            var header = document.getElementById("header");
            header.style.marginLeft = "250px";
            //Forsøk og tid og sånn
            tidBrukt = 90;
            timer.innerHTML = "Time: ";
            forsøk = 0;
            antForsøk.innerHTML = "Your tries: ";
            gameScore = 4000;
            localStorage.setItem("myScore",storrageScore);
            // localStorage.removeItem("myScore");
        }// Lage det slik at når forsøk overstiger 5 så vises start skjerm i gjen og spillet stopper.

        //Hvis tid blir til 0 sekund;
        if (tidBrukt <= 0){
            alert("Time's up");
            m.x = 1200;
            m.y = 560;
            m.setMan();
            tidBrukt = 90;
            gameScore -= 300;
            timer.innerHTML = "Time: ";
            antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
            m.harSverd = false;
            m.div.style.backgroundImage = "url(AvatarFsverd.png)";
            s.div.style.display = "block";
            sh.div.style.display = "block";
            t.div.style.backgroundColor = "";
            t.vx = 5;
            t.div.style.opacity = "1";
            harShield = false;
            harSverd = false;
            t.div.style.transform = "rotate(0deg)";
            t.div.style.transition = "0s";
        }

        //Hvis spiller treffer trusselen
        if ((m.x == t.x || m.x == (t.x+20) || m.x == (t.x-20)) && (m.y == t.y || m.y == (t.y-10) || m.y == (t.y+10))){
            if (m.harSverd === true && m.harShield === true){
                t.div.style.backgroundColor = "red";
                t.div.style.opacity = "0.5";
                t.vx = 0;
                gameScore += 40;
                t.div.style.transform = "rotate(90deg)";
                t.div.style.transition = "0.25s";
            }   else{
                alert("Fail, the guard killed you");
                m.x = 1200;
                m.y = 560;
                m.setMan();
                // tidBrukt = 90;
                timer.innerHTML = "Time: ";
                antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
                gameScore -= 400;
                m.div.style.backgroundImage = "url(AvatarFsverd.png)";
                sh.div.style.display = "block";
                m.harShield = false;
                m.harSverd = false;
            }
        }

        //Hvis den treffer en av veggene som er brede i x lengden
        if (
            (m.x > b1.x && m.x < (b1.x+b1.w)) && (m.y > b1.y && m.y < (b1.y+35) || m.y < b1.y && m.y > (b1.y-45))
            ||(m.x > b2.x && m.x < (b2.x+b2.w)) && (m.y > b2.y && m.y < (b2.y+35) || m.y < b2.y && m.y > (b2.y-45))
            ||(m.x > b3.x && m.x < (b3.x+b3.w)) && (m.y > b3.y && m.y < (b3.y+35) || m.y < b3.y && m.y > (b3.y-45))
            ||(m.x > b4.x && m.x < (b4.x+b4.w)) && (m.y > b4.y && m.y < (b4.y+35) || m.y < b4.y && m.y > (b4.y-45))
            ||(m.x > b5.x && m.x < (b5.x+b5.w)) && (m.y > b5.y && m.y < (b5.y+35) || m.y < b5.y && m.y > (b5.y-45))
            ||(m.x > b6.x && m.x < (b6.x+b6.w)) && (m.y > b6.y && m.y < (b6.y+35) || m.y < b6.y && m.y > (b6.y-32.5))
            ||(m.x > b7.x && m.x < (b7.x+b7.w)) && (m.y > b7.y && m.y < (b7.y+35) || m.y < b7.y && m.y > (b7.y-45))
            ||(m.x > b8.x && m.x < (b8.x+b8.w)) && (m.y > b8.y && m.y < (b8.y+35) || m.y < b8.y && m.y > (b8.y-45))
            ||(m.x > b9.x && m.x < (b9.x+b9.w)) && (m.y > b9.y && m.y < (b9.y+35) || m.y < b9.y && m.y > (b9.y-45))
            ||(m.x > b10.x && m.x < (b10.x+b10.w)) && (m.y > b10.y && m.y < (b10.y+35) || m.y < b10.y && m.y > (b10.y-45))
            ||(m.x > b11.x && m.x < (b11.x+b11.w)) && (m.y > b11.y && m.y < (b11.y+35) || m.y < b11.y && m.y > (b11.y-45))
            ||(m.x > b12.x && m.x < (b12.x+b12.w)) && (m.y > b12.y && m.y < (b12.y+35) || m.y < b12.y && m.y > (b12.y-45))
        ){
            alert("Fail, you hit the wall");
            m.x = 1200;
            m.y = 560;
            m.setMan();
            // tidBrukt = 90;
            // timer.innerHTML = "Time: ";
            antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
            gameScore -= 300;
            m.harSverd = false;
            m.harShield = false;
            sh.div.style.display = "block";
            m.div.style.backgroundImage = "url(AvatarFsverd.png)";
            s.div.style.display = "block";
            t.div.style.backgroundColor = "";
            t.vx = 5;
            t.div.style.opacity = "1";
            t.div.style.transform = "rotate(0deg)";
            t.div.style.transition = "0s";
        }

        //Hvis den treffer en av veggene som er høye i y lengden
        if (
            ((m.x > by1.x && m.x < (by1.x+by1.w) || (m.x < (by1.x+by1.w) && m.x) && (m.x > (by1.x-45))) && (m.y > by1.y && m.y < (by1.y+by1.h)))
            ||((m.x > by2.x && m.x < (by2.x+by2.w) || (m.x < (by2.x+by2.w) && m.x) && (m.x > (by2.x-45))) && (m.y > by2.y && m.y < (by2.y+by2.h)))
            ||((m.x > by3.x && m.x < (by3.x+by3.w) || (m.x < (by3.x+by3.w) && m.x) && (m.x > (by3.x-45))) && (m.y > by3.y && m.y < (by3.y+by3.h)))
            ||((m.x > by4.x && m.x < (by4.x+by4.w) || (m.x < (by4.x+by4.w) && m.x) && (m.x > (by4.x-45))) && (m.y > by4.y && m.y < (by4.y+by4.h)))
            ||((m.x > by5.x && m.x < (by5.x+by5.w) || (m.x < (by5.x+by5.w) && m.x) && (m.x > (by5.x-45))) && (m.y > by5.y && m.y < (by5.y+by5.h)))
            ||((m.x > by6.x && m.x < (by6.x+by6.w) || (m.x < (by6.x+by6.w) && m.x) && (m.x > (by6.x-45))) && (m.y > by6.y && m.y < (by6.y+by6.h)))
            ||((m.x > by7.x && m.x < (by7.x+by7.w) || (m.x < (by7.x+by7.w) && m.x) && (m.x > (by7.x-45))) && (m.y > by7.y && m.y < (by7.y+by7.h)))
            ||((m.x > by8.x && m.x < (by8.x+by8.w) || (m.x < (by8.x+by8.w) && m.x) && (m.x > (by8.x-45))) && (m.y > by8.y && m.y < (by8.y+by8.h)))
            ||((m.x > by9.x && m.x < (by9.x+by9.w) || (m.x < (by9.x+by9.w) && m.x) && (m.x > (by9.x-45))) && (m.y > by9.y && m.y < (by9.y+by9.h)))
            ||((m.x > by10.x && m.x < (by10.x+by10.w) || (m.x < (by10.x+by10.w) && m.x) && (m.x > (by10.x-45))) && (m.y > by10.y && m.y < (by10.y+by10.h)))
            ||((m.x > by11.x && m.x < (by11.x+by11.w) || (m.x < (by11.x+by11.w) && m.x) && (m.x > (by11.x-45))) && (m.y > by11.y && m.y < (by11.y+by11.h)))
            ||((m.x > by12.x && m.x < (by12.x+by12.w) || (m.x < (by12.x+by12.w) && m.x) && (m.x > (by12.x-45))) && (m.y > by12.y && m.y < (by12.y+by12.h)))
            ||((m.x > by13.x && m.x < (by13.x+by13.w) || (m.x < (by13.x+by13.w) && m.x) && (m.x > (by13.x-45))) && (m.y > by13.y && m.y < (by13.y+by13.h)))
            ||((m.x > by14.x && m.x < (by14.x+by14.w) || (m.x < (by14.x+by14.w) && m.x) && (m.x > (by14.x-45))) && (m.y > by14.y && m.y < (by14.y+by14.h)))
        ){
            alert("Fail, you hit the wall");
            m.x = 1200;
            m.y = 560;
            m.setMan();
            // tidBrukt = 90;
            timer.innerHTML = "Time: ";
            antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
            gameScore -= 300;
            m.harSverd = false;
            m.harShield = false;
            m.div.style.backgroundImage = "url(AvatarFsverd.png)";
            s.div.style.display = "block";
            t.div.style.backgroundColor = "";
            t.vx = 5;
            t.div.style.opacity = "1";
            sh.div.style.display = "block";
            t.div.style.transform = "rotate(0deg)";
            t.div.style.transition = "0s";
        }

        //Hvis du finner sverdet
        if ((m.x > s.x && m.x < (s.x+s.w) || (m.x < (s.x+s.w) && m.x) && (m.x > (s.x-45))) && (m.y > s.y && m.y < (s.y+40))){
            if (m.harShield === true){
                m.harSverd = true;
                m.div.style.backgroundImage = "url(AvatarEsverd.png)";
                s.div.style.display = "none";
            }else{
                m.harSverd = true;
                m.div.style.backgroundImage = "url(AvatarKunSverd.png)";
                s.div.style.display = "none";
            }
        }

        //Hvis du finner shield
        if ((m.x > sh.x && m.x < (sh.x+sh.w) || (m.x < (sh.x+sh.w) && m.x) && (m.x > (sh.x-45))) && (m.y > sh.y && m.y < (sh.y+40))){
            m.harShield = true;
            m.div.style.backgroundImage = "url(AvatarKunShield.png)";
            sh.div.style.display = "none";
        }

        //Hvis du kommer borti flammen
        if((m.x > fire.x && m.x < (fire.x+30) || (m.x < (fire.x+30) && m.x) && (m.x > (fire.x-25))) && (m.y > fire.y && m.y < (fire.y+85) || fire.y-85)){
            if (m.harShield === false){
                alert("Fail, you burned up");
                m.x = 1200;
                m.y = 560;
                m.setMan();
                // tidBrukt = 90;
                timer.innerHTML = "Time: ";
                antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
                gameScore -= 400;
            }
        }
    } //Her slutter flyttPaaMannen funskjonen (spillet sluter her)
} //Her slutter funsjonen startSpillet() (etter du har tyrkket start)

//DET SOM SOM SKJER NÅR DU TREFFER EN AV VEGGENE
//     alert("Fail, you hit the wall");
//     m.x = 1200;;
//     m.y = 560;
//     m.setMan();
//     antForsøk.innerHTML = "Your tries: " + (forsøk += 1);
//     tidBrukt = 90;
//     timer.innerHTML = "Time: ";
//     gameScore -= 300;
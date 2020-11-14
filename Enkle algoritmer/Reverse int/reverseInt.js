let int = 1534236469;

var reverse = function(x) {
    let tall = String(x);
    let strTall = tall.split("");
    let revTall = strTall.reverse();
    let minus = false;
    let ferdigTall;
    if(revTall.includes("-")){
        indexOfM = revTall.indexOf("-");
        revTall.splice(indexOfM);
        minus = true;
    }
    if(minus === true){
        ferdigTall = "-" + revTall.join("");
    }
    else{
        ferdigTall = revTall.join("");
    }

    if((ferdigTall.length > 11 && ferdigTall.includes("-")) ||ferdigTall.length > 9 && ferdigTall > 0){
        ferdigTall = 0;
    }

    return ferdigTall;
};

console.log(reverse(int));
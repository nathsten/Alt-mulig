const settning = "Hei jeg er 17år jeg har en bror på 12år. Min far er 44år og min mor er 32år, min bestemor er 112 år jeg har også en bror på 1år";

function finnTall(a){
    let output = [];
    let tall = "0123456789"

    for(let i=0; i<a.length; i++){
        let index = i+1;
        if(tall.includes(a[i])){
            if(isNaN(Number(a[i] + a[index])) === false){
                let numbers = String(a[i] + a[index]);
                output.push(Number(numbers));
            }
        }
    }
    return output;
}

const findNumbers = ord => {
    const tall = [];
    for(let i=0; i<ord.length; i++){
        let ts = "";
        if(Number(ord[i])){
            let j=i;
            while(Number(ord[j])){
                ts += ord[j];
                i = j;
                j++
                if(!Number(ord[j])){
                    break;
                }
            }
            if(ts){
                tall.push(Number(ts));
            }
        }
    }
    return tall;
}
console.log(findNumbers(settning))

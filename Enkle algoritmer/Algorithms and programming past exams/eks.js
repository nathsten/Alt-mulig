// Algorithms and programming NHH assignments...
// Find odd numbers
const a = [1,4,9,16,25,36,49,64,81,100];
const odd = [];
a.forEach(t => t%2 !== 0 ? odd.push(t):0);
console.log(odd);

const ord = "Hei jeg heter ole jeg er 12 år jeg har en bror på 1 år, min mor er 42år, min bestemor er 182 år";
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
console.log(tall);
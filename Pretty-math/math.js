/**
 * @param {string} ids 
 * @returns {HTMLElement[]}
 */
const $ = ids => ids.split(" ").map(id => document.getElementById(id));

class PrettyMath{

    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    check(str){
        if(str.includes("^(") && !str.includes("{")){
            return this.check(this.power(str).split("$$").join(""));
        }
        if(str.includes("/") && !str.includes("frac")){
            return this.check(this.frac(str).split("$$").join(""));
        }
        return str;
    }


    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    power(str){
        var formatted = "$$";
        formatted += str.replaceAll("(", "{").replaceAll(")", "}");
        formatted += "$$ ";
        return formatted;
    }

    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    frac(str){
        var formatted = "$$";
        const [u, v] = str.split("/");
        formatted += `\\frac{${this.check(u)}}{${this.check(v)}}$$`;
        return formatted;
    }

    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    derived(str){
        var formatted = "$$";
        var func = "";
        str.replace(/\[(.+?)\]/g, (a,u) => {
            func = u;
        });
        func = this.check(func);
        formatted += "\\frac{dy}{dx} = (";
        formatted += func + ")$$ ";
        return formatted;
    }

    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    lim(str){
        var formatted = "$$";
        var lim = "\\infty"
        str.replace(/\((.+?)\)/g, (a,b) => {
            if(b) lim = b;
        });
        formatted += `\\lim_{dx \\to ${lim}}`;
        return formatted;
    }

    /**
     * @param {string} str flat math string
     * @returns {string} formatted MathJax
     */
    integral(str){
        var formatted = "$$";
        var func = "";
        var args = [];
        str.replace(/\[(.+?)\]/g, (a,u) => {
            u.split(",").map((l,i) => i===0 ? func = l : args.push(l));
        });
        func = this.check(func);
        formatted += `\\int${args[0] ? '_'+args[0] : ""}^${args[1] || "\\"} (${func})\dx $$`;
        return formatted;
    }

    sum(str){
        var formatted = "$$";
        var args = [];
        str.replace(/\[(.+?)\]/g, (a,u) => {
            u.split(",").map(l=> args.push(l));
        });
        args.map((e,i) => args[i] = this.check(e));
        formatted += `\\sum_{${args[0]}}^{${args[1]}}$$`;
        return formatted;
    }
}

/**
 * @type {PrettyMath} PrettyMath object
 */
const PM = new PrettyMath();

/**
 * @param {string} i 
 * @returns {void}
 */
const main = (i = i.toLocaleLowerCase()) => {
    const n = i.split(" ");
    if(n.length > 1) {
        outptField.innerHTML = "";
        i.split(" ").map(n => main(n));
        outptField.innerHTML = `${outptField.innerHTML.split("<br>").map(e => `$$${e.split("$$").join("")}$$`).join("<br>")}`;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'outptField']);
    }
    else{
        if(i.length === 1 && (i.includes("+") || i.includes("-") || i.includes("*") || i.includes("="))){
            outptField.innerHTML += i;
            return;
        }
        if(i.includes("<=>")){
            outptField.innerHTML += "$$\\iff$$";
            return;
        }
        if(i.includes("=>")){
            outptField.innerHTML += "$$\\implies$$";
            return;
        }
        if(i.includes("<=")){
            outptField.innerHTML += "$$\\if$$";
            return;
        }
        if(i.includes("nl")){
            outptField.innerHTML += "<br>";
            return;
        }
        if(i.includes("derived[")){
            outptField.innerHTML += PM.derived(i);
            return;
        }
        if(i.includes("lim")){
            outptField.innerHTML += PM.lim(i);
            return;
        }
        if(i.includes("integral[")){
            outptField.innerHTML += PM.integral(i);
            return;
        }
        if(i.includes("sum[")){
            outptField.innerHTML += PM.sum(i);
            return;
        }
        if(i.includes("/")){
            outptField.innerHTML += PM.frac(i);
            return;
        }
        if(i.includes("^(")){
            outptField.innerHTML += PM.power(i);
            return;
        }
        outptField.innerHTML += i;
    }
}

const [ inptField, outptField ] = $("inptField outptField");

inptField.addEventListener("input", () => main(inptField.value));
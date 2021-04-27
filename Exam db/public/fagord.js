const fagord = async () => {
    const getFagord = await fetch('./fagord.txt');
    const text = await getFagord.text();
    const parsed = await String(text).split("\n\n").filter(e => e || e !== " ")
    .map(e => e.split("\n")[0]).filter(e => !e.includes("(") || !e.includes(")") || !e.includes("=") || !e.includes("+") || !e.includes("-"))
    .filter(e => e.split(" ").length <= 3)
    .filter(e => e !== "Listebilde").filter(e => !e.includes("Eksemp"));
    document.getElementById("emner").innerHTML = parsed.map(e => `<option>${e}</option>`).join("");
}

export default fagord;
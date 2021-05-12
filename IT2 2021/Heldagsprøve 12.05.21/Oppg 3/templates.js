const leggTilAnsatt = `<form id="gui">
<label>Navn på ansatt: <br><input type="text" id="ansatt"></input><br>
<input type="submit" value="legg til">
</form>`;


const leggTilArbeid = `<form id="gui">
<label>Navn på arbeid: <br><input type="text" id="arbeid"></label><br>
<input type="submit" value="legg til">
</form>`;


const fordelArbeid = `<form id="gui">
<label>Navn på ansatt: <br><select id="ansatt"></select></label><br>
<label>Navn på arbeid: <br><select id="arbeid"></select><br>
<input type="submit" value="legg til">
</form>`;


const merkArbeid = `<form id="gui">
<label>Navn på ansatt som har gjort arbeidet: <br><select id="ansatt"></select></label><br>
<label>Navn på arbeid: <br><select type="text" id="arbeid"></select></label><br>
<input type="submit" value="merk som ferdig">
</form>`;

export { leggTilAnsatt, leggTilArbeid, fordelArbeid, merkArbeid };
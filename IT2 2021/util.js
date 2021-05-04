/**
 * @param {string} ids
 * @returns {HTMLElement[]}
*/
const $ = ids => ids.split(" ").map(id => document.getElementById(id));
/**
 * @param {string} el 
* @returns {HTMLElement}
*/
const new$ = el => document.createElement(el);

export {$, new$};
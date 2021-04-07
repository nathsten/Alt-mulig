// @ts-check

class InputForm extends HTMLElement {

    constructor() {
      super();
      this._root = this.attachShadow({ mode: "open" });
      this._root.innerHTML = `
        <div id="main">
          <div id="title"></div>
          <div id="header"></div>
          <div id="list"></div>
          <div id="footer"></div>
        </div>
        <style>
            #title {
              padding:8px;
              text-align:center;
              color:blue;
              font-size:1.2rem;
            }
            #main {
              width: 42rem;
              background-color: rgba(0,80,80,0.2);
              border-radius: 5px;
              box-shadow: 2px 2px 2px black;
              margin:4px;
            }
            #header {
              color:blue;
              fornt-size:1.2rem;
            }
            #list,#footer,#header {
              margin:5px;
              padding:10px;
            }
            #footer > div,
            #list > div {
                width: 40rem;
                margin:3px;
            }
            #list > div > label {
                display: grid;
                grid-template-columns: 2fr 2fr;
            }
        </style>`;
    }
  
    // dispatch a custom event with payload
    /**
     * @param {string} eventname
     * @param {any} detail
     */
    event(eventname, detail) {
      this.dispatchEvent(new CustomEvent(eventname, {
        bubbles: true,
        composed: true,
        detail
      }));
    }
  
    get info() {
      // @ts-ignore  tscheck not updated to latest ecma
      return Object.fromEntries(Array.from(this._root.querySelectorAll("input")).map(e => [e.id, e.value]));
      // return {};  // {username,firstname,lastname,password,email};
    }
  
    /**
     * @param {object} settings
     */
    set info(settings) {
      const {options = {title:"Form"}, ...obj } = settings;
      const fields = Object.keys(obj);
      const header = this._root.querySelector("#header");
      const footer = this._root.querySelector("#footer");
      const form = this._root.querySelector("#list");
      fields.forEach(f => {
        const lead = f.charAt(0).toUpperCase() + f.substr(1).toLowerCase(); // nice label
        const div = document.createElement("div");
        div.innerHTML = `<label>${lead}<input type="text" id="${f}"></label>`;
        form.append(div);
      });
      const div = document.createElement("div");
      div.innerHTML = `<button id="save">Save</button>  <button id="cancel">Cancel</button>`;
      footer.append(div);
      header.innerHTML = options.title;
      Array.from(this._root.querySelectorAll("input")).filter(e => fields.includes(e.id)).forEach(e => e.value = obj[e.id]);
      this._root.querySelector("#save").addEventListener("click", () => this.event("useraccount", "ok"));
      this._root.querySelector("#cancel").addEventListener("click", () => this.event("useraccount", "cancel"));
    }
  
    static get observedAttributes() {
      return ["width", "tint"];
    }
  
    /**
     * @param {string} name
     * @param {string} oldValue
     * @param {unknown} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "width" && Number.isInteger(newValue)) {
        // @ts-ignore
        this._root.querySelector("#userinfo").width = newValue + "rem";
      }
      if (name === "tint") {
        // @ts-ignore
        this._root.querySelector("#userinfo").backgroundColor = newValue;
      }
    }
  }
  
  window.customElements.define("input-form", InputForm);
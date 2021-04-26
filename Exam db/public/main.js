const main = () => {
    const app = new Vue({
        el: '#app',
        data: {
            fag: "",
            sokeord: "",
            exams: []
        },
        methods: {
            /**
             * @param {MouseEvent} event 
             */
            hentEksamensOppg: async event => {
                event.preventDefault();
                const getEksamenssett = await fetch(`finnEksamensOppgaver/${app.fag}/${app.sokeord}`);
                app.exams = await getEksamenssett.json();
            }
        }
      })

}

export default main
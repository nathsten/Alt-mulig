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
                if(!app.fag || !app.sokeord) return;
                const getEksamenssett = await fetch(`finnEksamensOppgaver/${app.fag}/${app.sokeord}`);
                app.exams = await getEksamenssett.json();
            }
        },
        created: async () => {
            const month = new Date().getUTCMonth();
            const year = new Date().getUTCFullYear();
            // sjekker om databasen må oppdateres. 
            const checkDb = await fetch(`/oppdaterEksamensoppgaver`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({month, year}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const status = await checkDb.json();
            console.log(status.status);
        }
      })

}

export default main
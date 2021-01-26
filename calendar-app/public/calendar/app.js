const select = value => document.querySelector(value);
const today = String(new Date()).split(" ")[0];
const month = String(new Date()).split(" ")[1];
const numMonth = new Date().getMonth();
const date = new Date().getDate();
const year = new Date().getFullYear();
const daysInMonth = new Date(year, numMonth, 0).getDate();
const firstDayInMonth = new Date(year, numMonth, 0).getDay();
const allDays = "Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" ");

class renderHeigth{
    height = 0;
    div = undefined;
    render(){
        try{
            this.div.style.height = `${this.height}%`;
        } catch(e){}
    }
}

const setup = async () => {
    const fetchEvents = await fetch('/open/calendarApp/getUserEvents');
    const events = await fetchEvents.json();

    if(events.status === "Not autorized"){
        window.open('/open/calendarApp/signIn', '_self');
    }

    const gUN = async () => {
        const getUserName = await fetch('/open/calendarApp/getUserName');
        const userName = await getUserName.json();
        return userName;
    }

    const userName = await gUN();
    
    const calendar = new Vue({
        el: "#calendarRoot",
        data: {
            days: [],
            dates: [],
            classObject: {
                isActive: true,
                isMobile: false,
                isDesktop: false
            },
            eventHeader: {text: `Evens on `},
            selectedDay: `${month} ${date}:`,
            selectedDayKey: month+date,
            selectedDayEvents: [],
            allEvents: events,
            eventDivActive: false
        },
        methods: {
            setSelectedDay: (date, month) => {
                calendar.selectedDay = `${month} ${date}:`;
                calendar.selectedDayKey = month+date;
                if(events[calendar.selectedDayKey]){
                    calendar.selectedDayEvents = calendar.allEvents[(month+date)];
                    eventList_desktop.height = Math.min(calendar.selectedDayEvents.length * 20, 85);
                    eventList_desktop.render();
                }
                else{
                    calendar.selectedDayEvents = [];
                }
            },
            sendEventToDB: () => {
                const eventNameInput = select("#eventName");
                const eventTimeInput = select("#eventTime");
                const eventName = eventNameInput.value;
                const eventTime = eventTimeInput.value;
                fetch(`/open/calendarApp/addNewEvent/eventName/${eventName}/eventTime/${eventTime}/eventKey/${calendar.selectedDayKey}`)
                .then(res => res.json())
                .then(events =>{
                    if(events[calendar.selectedDayKey]){
                        calendar.selectedDayEvents = events[(calendar.selectedDayKey)];
                        eventList_desktop.height = Math.min(calendar.selectedDayEvents.length * 20, 85);
                        calendar.allEvents = events;
                        eventList_desktop.render();
                        eventNameInput.value = "";
                        eventTimeInput.value = "";
                        addNewEventDiv.classList.remove("moveDownNewEventDiv", "moveUpAddNewEventDiv");
                        void addNewEventDiv.offsetWidth;
                        addNewEventDiv.classList.add("moveDownNewEventDiv");
                        setTimeout(() => {addNewEventDiv.style.display = "none"}, 500);
                        calendar.eventDivActive = false;
                        displayNewEventBtn.style.transform = "rotate(0deg)";
                    }
                    else{
                        calendar.selectedDayEvents = [];
                    } 
                })
                .catch(e => console.log(e));
            },
            deleteEvent: event_id => {
                fetch(`/open/calendarApp/deleteEvent/${event_id}`)
                .then(res => res.json())
                .then(events => {
                    if(events[calendar.selectedDayKey]){
                        calendar.selectedDayEvents = events[(calendar.selectedDayKey)];
                        eventList_desktop.height = Math.min(calendar.selectedDayEvents.length * 20, 85);
                        calendar.allEvents = events;
                        eventList_desktop.render();
                    }
                    else{
                        calendar.selectedDayEvents = [];
                    }
                })
            },
            displayNewEvent: () => {
                const displayNewEventBtn = select("#displayNewEventBtn");
                const addNewEventDiv = select("#addNewEventDiv");
                if(!calendar.eventDivActive){
                    addNewEventDiv.classList.remove("moveUpAddNewEventDiv", "moveDownNewEventDiv");
                    void addNewEventDiv.offsetWidth;
                    addNewEventDiv.classList.add("moveUpAddNewEventDiv");
                    calendar.eventDivActive = true;
                    displayNewEventBtn.style.transform = "rotate(45deg)";
                    addNewEventDiv.style.display = "block"
                }
                else{
                    addNewEventDiv.classList.remove("moveDownNewEventDiv", "moveUpAddNewEventDiv");
                    void addNewEventDiv.offsetWidth;
                    addNewEventDiv.classList.add("moveDownNewEventDiv");
                    calendar.eventDivActive = false;
                    displayNewEventBtn.style.transform = "rotate(0deg)";
                    setTimeout(() => {addNewEventDiv.style.display = "none"}, 500);
                }
            }
        }
    })

    const header = new Vue({
        el: "#headerRoot",
        data: {
            userName: userName,
            classObject: {
                isMobile: false,
                isDesktop: false
            },
            selectedElementPosition: 0
        },
        methods: {
            logout: () => {
                fetch('/open/calendarApp/logout', {method: "POST"}).then(() => location.reload());
            },
            scrollDown: () => {
                window.scrollTo(0, header.selectedElementPosition);
            }
        }
    });

    allDays.map(dag => calendar.days.push({text: dag}));

    const eventList_desktop = new renderHeigth();
    eventList_desktop.div = select("#eventList");

    if(events[calendar.selectedDayKey]){
        calendar.selectedDayEvents = events[calendar.selectedDayKey];
    }
    else{
        calendar.selectedDayEvents = [];
    }

    eventList_desktop.height = Math.min(calendar.selectedDayEvents.length * 20, 85);
    eventList_desktop.render();

    for(let i=0; i<firstDayInMonth; i++){
        const emptyDay = {
            activeDay: false
        }
        calendar.dates.push(emptyDay);
    }

    for(let i=1; i<=daysInMonth; i++){
        const day = {
            date: i,
            month: month,
            activeDay: true
        }
        calendar.dates.push(day);
    }

    if (screen.width < 700){
        calendar.classObject.isMobile = true;
        header.classObject.isMobile = true;
    }
    else{
        calendar.classObject.isDesktop = true;
        header.classObject.isDesktop = true;
    }

    if(calendar.classObject.isMobile){
        setTimeout(() => {
            const calendarDatesDiv = select("#calendarDatesDiv");
            calendarDatesDiv.childNodes.forEach(n => n.className.includes("selectedDay") ? 
            header.selectedElementPosition = Array.from(calendarDatesDiv.childNodes).indexOf(n)*50:0);
            header.scrollDown();
        }, 100);
    }

}
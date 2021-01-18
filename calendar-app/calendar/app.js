const select = value => document.querySelector(value);
const today = String(new Date()).split(" ")[0];
const month = String(new Date()).split(" ")[1];
const numMonth = new Date().getMonth();
const date = new Date().getDate();
const year = new Date().getFullYear();
const daysInMonth = new Date(year, numMonth, 0).getDate();
const firstDayInMonth = new Date(year, numMonth, 0).getDay();
const allDays = "Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" ");

// alle render klasser utenfor setup();
class renderHeigth{
    height = 0;
    div = undefined;
    render(){
        this.div.style.height = `${this.height}%`;
    }
}

const sendEventToDB = (form) => {
    console.log(form.test.value);
}

const setup = async () => {
    const getTestDates = await fetch('/getTestDates');
    let testObject = await getTestDates.json();

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
            allEvents: [testObject]
        },
        methods: {
            setSelectedDay: (date, month) => {
                calendar.selectedDay = `${month} ${date}:`;
                calendar.selectedDayKey = month+date;
                if(testObject[calendar.selectedDayKey]){
                    const events = [];
                    Object.keys(testObject[calendar.selectedDayKey]).map(event => events.push(testObject[calendar.selectedDayKey][event]));
                    calendar.selectedDayEvents = events;
                    eventList_desktop.height = events.length * 10;
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
                fetch(`/addNewEvent/eventName/${eventName}/eventTime/${eventTime}/eventKey/${calendar.selectedDayKey}`)
                .then(res => res.json())
                .then((msg) => console.log(msg))
                .catch(e => console.log(e));
            }
        }
    })

    const header = new Vue({

    });

    allDays.map(dag => calendar.days.push({text: dag}));

    const eventList_desktop = new renderHeigth();
    eventList_desktop.div = select("#eventList");
    if(testObject[calendar.selectedDayKey]){
        const events = [];
        Object.keys(testObject[calendar.selectedDayKey]).map(event => events.push(testObject[calendar.selectedDayKey][event]));
        calendar.selectedDayEvents = events;
    }
    else{
        calendar.selectedDayEvents = []; 
    }

    eventList_desktop.height = calendar.selectedDayEvents.length * 10;
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

    window.onload = () => {
        if (screen.width < 700){
            calendar.classObject.isMobile = true;
        }
        else{
            calendar.classObject.isDesktop = true;
        }
    }
}
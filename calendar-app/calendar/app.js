const element = React.createElement;
const select = value => document.querySelector(value);

const test = select("#test");

const days = "Mandag Tirsdag Onsdag Torsdag Fredag Lørdag Søndag".split(" ");

class TestJSX extends React.Component {
    render() {
        return (
            <div className="daysMain">{days.map(day => 
                <div 
                key={day.split("").splice(0,3).join("")} 
                id={day.split("").splice(0,3).join("")}
                className="days">
                    {day}
                </div>)}
            </div>
        );
    }
}

ReactDOM.render(
    <TestJSX />,
    test
);
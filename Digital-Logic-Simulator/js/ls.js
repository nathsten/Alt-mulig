// All localStorrage handling

// Check if exsisting simulators exist:
if(localStorage.getItem("simulatorList")){
    /**@type {Simulator[]} */
    const simuLatorList = JSON.parse(localStorage.getItem("simulatorList"));
    
    (simuLatorList.length ? simuLatorList.forEach(sim => {
        const newSim = new Bit(sim);
        allSimulators.push(newSim);
    }) : null);
}

if(localStorage.getItem("savedProjects")){
    /**@type {{name: String, desc: String, lastEdt: String}[]} */
    const savedProjects = JSON.parse(localStorage.getItem("savedProjects"));

    savedProjects.forEach(pjct => main.allProjects.push(pjct));
}
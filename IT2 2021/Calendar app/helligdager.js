const dager = `1. jan	fredag	Første nyttårsdag	Helligdag	
21. jan	torsdag	Prinsesse Ingrid Alexandras fødselsdag	Flaggdag	
6. feb	lørdag	Samefolkets dag	Flaggdag	
14. feb	søndag	Fastelavn	Merkedag	 
14. feb	søndag	Morsdag	Merkedag	 
14. feb	søndag	Valentinsdagen	Merkedag	 
21. feb	søndag	Kong Harald V	Flaggdag	
20. mar	lørdag	Vårjevndøgn	Jevndøgn / solverv	 
28. mar	søndag	Sommertid starter	Overgang til / fra sommertid	 
28. mar	søndag	Palmesøndag	Merkedag	 
1. apr	torsdag	Skjærtorsdag	Helligdag	 
2. apr	fredag	Langfredag	Helligdag	 
3. apr	lørdag	Påskeaften	Merkedag	 
4. apr	søndag	Første påskedag	Helligdag	
5. apr	mandag	Andre påskedag	Helligdag	 
1. mai	lørdag	Arbeidernes dag	Offentlig høytidsdag	
8. mai	lørdag	Frigjøringsdagen 1945	Merkedag, Flaggdag	
13. mai	torsdag	Kristi himmelfartsdag	Helligdag	 
17. mai	mandag	Grunnlovsdag	Offentlig høytidsdag	
22. mai	lørdag	Pinseaften	Merkedag	 
23. mai	søndag	Første pinsedag	Helligdag	
24. mai	mandag	Andre pinsedag	Helligdag	 
7. jun	mandag	Unionsoppløsningen	Flaggdag	
21. jun	mandag	Sommersolverv	Jevndøgn / solverv	 
23. jun	onsdag	Sankthansaften	Merkedag	 
24. jun	torsdag	Sankthans	Merkedag	 
4. jul	søndag	Dronning Sonja	Flaggdag	
20. jul	tirsdag	Kronprins Haakon	Flaggdag	
29. jul	torsdag	Olsok	Flaggdag	
19. aug	torsdag	Kronprinsesse Mette-Marit	Flaggdag	
13. sep	mandag	Stortingsvalg	Flaggdag	
22. sep	onsdag	Høstjevndøgn	Jevndøgn / solverv	 
24. okt	søndag	FN-dagen	Merkedag	 
31. okt	søndag	Sommertid slutter	Overgang til / fra sommertid	 
31. okt	søndag	Halloween	Merkedag	 
31. okt	søndag	Bots- og bededag	Merkedag	 
7. nov	søndag	Allehelgensdag	Merkedag	 
14. nov	søndag	Farsdag	Merkedag	 
28. nov	søndag	Første søndag i advent	Merkedag	 
5. des	søndag	Andre søndag i advent	Merkedag	 
12. des	søndag	Tredje søndag i advent	Merkedag	 
19. des	søndag	Fjerde søndag i advent	Merkedag	 
21. des	tirsdag	Vintersolverv	Jevndøgn / solverv	 
24. des	fredag	Julaften	Merkedag (mange banker stengt)	 
25. des	lørdag	Første juledag	Helligdag	
26. des	søndag	Andre juledag	Helligdag	 
31. des	fredag	Nyttårsaften	Merkedag`;

/**
 * @param {string} s 
 * @returns 
 */
const makeDate = s => {
    const date = +(s.split(".")[0]);
    const mon = s.split(/\d+./)[1].replace("s", "c").replace("k", "c")
    .replace("i", "y").split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("");
    return {d: date, m: new Date(date + mon + ' 2021').getMonth()};
}

const helligdager = dager.split("\n").map(e => e.split("\t").filter(e => e && e !== " ")
.map(e => e.includes("/") ? e.split(" /")[0] : e || e.includes("(") ? e.split(" (")[0] : e))
.map(([dt, dy, e, dc]) => [makeDate(dt), dc]).filter(([dt, dc]) => dc === 'Offentlig høytidsdag' || dc === 'Merkedag' || dc === 'Helligdag').map(([dt, dc]) => dt);
export {helligdager};
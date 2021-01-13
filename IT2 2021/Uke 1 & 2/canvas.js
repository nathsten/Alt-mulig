const setup = () => {
    const ctx = document.getElementById("teining").getContext('2d');
    const π = Math.PI;   // kjekk å ha

    // Lage sirkel.
    ctx.beginPath();
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.arc(350,350,30,0,2*π);
    ctx.stroke();
    ctx.fill();

    // Lage rektangel
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(50, 50, 100,100);
    ctx.stroke();

    // Lage trekant.
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.moveTo(300, 150);
    ctx.lineTo(300, 0);
    ctx.lineTo(100, 150);
    ctx.fill();
    ctx.stroke();

    // Tenger sirkler med musepeker og bestemme radien med avstand fra center.
    let centerFound = false;
    let cX,cY,rX,rY;
    document.getElementById("teining").addEventListener("click", event => {

        if(centerFound === false){
            cX = event.clientX;
            cY = event.clientY; 
            centerFound = true;
        }
        else{
            rX = event.clientX;
            rY = event.clientY;

            const dx = Math.abs(cX - rX);
            const dy = Math.abs(cY - rY);
            const a = Math.sqrt(dx**2 + dy**2);
    
            ctx.beginPath();
            ctx.fillStyle = 'rgb(200,0,0)';
            ctx.arc(cX,cY,a,0,2*π,);
            ctx.stroke();
            ctx.fill();
            centerFound = false;
            cX=0; cY=0; rX=0; rY=0;
        }
    })

    // Tegne på drawBoard
    const db = document.getElementById("drawBoard").getContext('2d');
    const b = document.getElementById("drawBoard");
    let drawing = false;
    let dX, dY;

    b.addEventListener("mousedown", e => {
        dX = e.offsetX;
        dY = e.offsetY;
        drawing = true;
    })

    b.addEventListener("mousemove", e => {
        if(drawing === true){
            db.beginPath();
            db.strokeStyle = 'rgb(200,0,0)';
            db.lineWith = 1;
            db.moveTo(dX,dY);
            db.lineTo(e.offsetX, e.offsetY)
            db.stroke();
            db.closePath();
            dX = e.offsetX; dY=e.offsetY;
        }
    });
    
    window.addEventListener("mouseup", e => {
        if(drawing === true){
            dX=0; dY=0;
            drawing = false;
        }
    })
}
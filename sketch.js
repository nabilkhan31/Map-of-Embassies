let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
let data, p, flags, embassies;
function preload() {
    data = loadTable('embassy.csv','csv','header');
    flags = [];
    flags.push(loadImage('images/albania.jpeg'));
    flags.push(loadImage('images/algeria.webp'));
    flags.push(loadImage('images/angola.png'));
    flags.push(loadImage('images/antigua.png'));
    flags.push(loadImage('images/argentina.webp')); 
    flags.push(loadImage('images/armenia.webp'));
    flags.push(loadImage('images/australia.webp'));
    flags.push(loadImage('images/austria.svg'));
    flags.push(loadImage('images/azerbaijan.svg'));
    flags.push(loadImage('images/bahamas.webp'));
    flags.push(loadImage('images/bangladesh.png'));
    flags.push(loadImage('images/barbados.webp'));
    flags.push(loadImage('images/burundi.webp'));
    flags.push(loadImage('images/canada.webp'));
    flags.push(loadImage('images/china.webp'));
    flags.push(loadImage('images/france.png'));
    flags.push(loadImage('images/germany.webp'));
    flags.push(loadImage('images/iceland.webp'));
    flags.push(loadImage('images/india.webp'));
    flags.push(loadImage('images/iran.webp'));
    flags.push(loadImage('images/italy.webp'));
    flags.push(loadImage('images/japan.jpeg'));
    flags.push(loadImage('images/kazakhstan.webp'));
    flags.push(loadImage('images/newzealand.webp'));
    flags.push(loadImage('images/northkorea.webp'));
    flags.push(loadImage('images/russia.webp'));
    flags.push(loadImage('images/southafrica.webp'));
    flags.push(loadImage('images/southkorea.webp'));
    flags.push(loadImage('images/ukraine.webp'));
    flags.push(loadImage('images/unitedstates.webp'));
    flags.push(loadImage('images/zimbabwe.webp'));
}

// Lets put all our map options in a single object
const options = {
  lat: 51.509865,
  lng: -0.118092,
  zoom: 11,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(800,400); 
  // Create a tile map with the options declared
    myMap = mappa.tileMap(options); 
    
    myMap.overlay(canvas);

    embassies = [];
    for (let i = 0; i < data.getRowCount(); i++) {
        embassies.push(new Embassy(
        data.getNum(i,'Longitude'),
        data.getNum(i,'Latitude'),
        data.getString(i,'Embassy')));
    }
    p = createP('Embassy');

}

function draw(){
    clear();
    fill(255,0,0,150);
    noStroke();
    for (let i = 0; i < data.getRowCount(); i++) {
        embassies[i].draw();
        embassies[i].mouseOver(i);
    }
}

function Embassy(long,lat,country){
    
    this.country = country;
    this.draw = function(){
        coords = myMap.latLngToPixel(long,lat);
        ellipse(coords.x,coords.y,1.5 *  (myMap.getZoom() * 1.2));
    }
    this.mouseOver = function(index){
        let d = dist(mouseX,mouseY,coords.x,coords.y);
        if (d < (1.5 * (myMap.getZoom() * 1.2)/2) && (myMap.getZoom() > 9)) {
            p.elt.innerText = 'Embassy of ' + this.country;
            flags[index].resize(128,80);
            image(flags[index],width - flags[index].width,0);        
            console.log("hello");
        }
    }
}

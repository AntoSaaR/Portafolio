function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240); // Color gris muy claro
  
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(ITALIC);
  fill(0);
  text("¡Bienvenido a mi portafolio de Imagen Escrita 2023!", width/2, height/3);
  
  stroke(50, 205, 50); // Color verde lima
  strokeWeight(5);
  line(0, 2*height/3, width, 2*height/3);
}

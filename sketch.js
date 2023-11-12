let particles = [];
let input;
let userName = "Visitante"; // Valor predeterminado
let bgColor;
let welcomeMessage = false;
let inputVisible = true;
let inputResultShown = false;

// Información de encargos
let encargos = ["Encargo 1", "Encargo 2", "Encargo 3", "Encargo 4", "Encargo 5", "Encargo 6"];

function setup() {
  createCanvas(1980, 1080);
  
  // Crear partículas blancas
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  
  // Crear input en el centro de la pantalla
  createInputAndPosition();
  
  bgColor = color(0); // Color inicial de fondo negro
}

function createInputAndPosition() {
  input = createInput();
  input.position(width / 2 - input.width / 2, height / 2 - 10);
  input.attribute('placeholder', '¿Quién eres?');
  input.style('color', 'black'); // Color del texto negro
}

function draw() {
  // Cambiar gradualmente el fondo después de ingresar el nombre
  if (userName !== "Visitante") {
    bgColor = lerpColor(bgColor, color(245), 0.05);
    background(bgColor);
    if (bgColor.levels[0] > 200) {
      // Cambiar el mensaje a true después del cambio de color
      welcomeMessage = true;
    }
  } else {
    background(bgColor); // Fondo negro inicial
  }
  
  // Mover y mostrar partículas
  for (let particle of particles) {
    particle.move();
    particle.display(bgColor.levels[0]);
  }

  // Mostrar bienvenida, nombre del usuario y resultado del input después del cambio de color
  if (welcomeMessage) {
    fill(0); // Color de texto negro
    textAlign(CENTER, TOP);
    textSize(16);
    let welcomeText = "Bienvenido a mi portafolio de Imagen Escrita 2023, ";
    let inputResult = input.value();
    text(welcomeText + inputResult, width / 2, 10);

    if (inputVisible) {
      createInputAndPosition();
      inputVisible = false;
    }

    if (!inputResultShown) {
      fill(0); // Color de texto negro
      textAlign(LEFT, TOP);
      text(inputResult, width / 2 - input.width / 2, height / 2 - 10);
      inputResultShown = true;
    }

    // Dibujar la línea de color debajo del mensaje
    stroke(136, 255, 117); // Color de la línea 88FF75
    strokeWeight(2);
    let lineY = height / 12 + 15; // Posición de la línea 5 píxeles más abajo del mensaje
    line(10, lineY, width - 10, lineY);

    // Ajustar la posición vertical del rectángulo
    let rectY = lineY + 10; // Puedes ajustar el valor según sea necesario

    // Dibujar el rectángulo blanco debajo de la línea
    fill(255); // Color blanco
    noStroke();
    rect(10, rectY, 872, 716); // Rectángulo de dimensiones 872x716 debajo de la línea

    // Dibujar el texto dentro del rectángulo
    fill(0); // Color de texto negro
    textSize(18);
    textAlign(LEFT, TOP);
    let infoText = "Mi nombre es Antonella Saa, nací un 24 de diciembre de 2004 e ingresé a la carrera de Diseño el año 2023. Estoy cursando Imagen Escrita en mi segundo semestre y actualmente soy parte del Taller de Objetos Materiales.\n\nMis metas para el final de esta asignatura es poder aprender un poco más de p5js, hacer códigos simples y aprender sobre los elementos gráficos del diseño para poder aplicarlo en otras materias.";
    text(infoText, 10, rectY + 10, 872, 716 - 20);

    // Dibujar el título "Mis Encargos" al lado del rectángulo
    fill(0); // Color de texto negro
    textSize(32);
    textAlign(LEFT, TOP);
    text("Mis Encargos", 900, rectY + 10);

    // Dibujar la línea verde debajo del título
    stroke(136, 255, 117); // Color de la línea 88FF75
    strokeWeight(2);
    let greenLineY = rectY + 60; // Posición de la línea verde 5 píxeles más abajo del título
    line(900, greenLineY, width - 10, greenLineY);

    // Dibujar los rectángulos blancos con texto de encargos
    let rectHeight = 80; // Altura de los rectángulos aumentada
    for (let i = 0; i < encargos.length; i++) {
      let encargoRectY = greenLineY + (i * rectHeight);
      fill(255); // Color blanco
      rect(900, encargoRectY, 150, rectHeight); // Rectángulo blanco de 150x80
      fill(0); // Color de texto negro
      textAlign(CENTER, CENTER);
      textSize(14);
      text(encargos[i], 975, encargoRectY + rectHeight / 2);
    }
  }
}

function keyPressed() {
  // Cambiar el nombre del usuario cuando se presiona Enter
  if (keyCode === ENTER && inputVisible) {
    userName = input.value();
    // Ocultar el input después de obtener el nombre
    input.hide();
    inputVisible = false;
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2, height); // Partículas solo hasta la mitad
    this.speed = random(0.5, 1.5); // Velocidad más lenta
    this.size = 8; // Aumentar tamaño de partículas
    this.color = color(255); // Color inicial blanco
  }

  move() {
    this.y -= this.speed;

    // Desaparecer las partículas después de llegar a la mitad
    if (this.y < height / 2) {
      this.color.setAlpha(map(this.y, height / 2, 0, 255, 0));
    }

    // Reiniciar la partícula cuando llega arriba
    if (this.y < 0) {
      this.y = random(height / 2, height);
      this.x = random(width);
      this.color.setAlpha(255); // Restablecer opacidad
    }
  }

  display(bgBrightness) {
    // Cambiar el color de las partículas según el brillo del fondo
    if (bgBrightness > 200) {
      fill(0, this.color.levels[3]);
    } else {
      fill(255, this.color.levels[3]);
    }
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}


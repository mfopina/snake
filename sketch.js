// tamanho tela
let canvaW = 400;
let canvaH = 400;

// variáveis da snake
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;

//velocidade da movimentação
let velocidadeMovimentacao = 2;

let direcao = "right";

let partes = 1;
let rabo = [];

posicaoXcomida = randomIntFromInterval(11, canvaW - 20);
posicaoYcomida = randomIntFromInterval(11, canvaH - 20);

let colidiu =  false;
let comeu = false;

//paredes
// esquerda | Direita
let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;

// cima | baixo
let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;

//pontos
let meusPontos = 0;

function preload(){
  corpocobra = loadImage("imagens/corpocobra.png");
  cabecacobra = loadImage("imagens/cabecacobra.png");
}

function setup() {
  createCanvas(canvaW, canvaH);
}

function draw() {
  background(220);
  desenhaCobra();
  controleMovimentacao();
  desenhaParedes();
  desenhaComida();
  comer();
  pegarPosicaoAtual();
  colisaoNasParedes();
  incluirPontos();
}

function desenhaCobra(){
  let c = color(222,218,22);
  fill(c);
  image(cabecacobra, xCobra, yCobra, wCobra, hCobra);
  //rect(xCobra, yCobra, wCobra, hCobra);
  
  if(rabo.length > 0){
  for(var i = 0; i < rabo.length; i++){
  //let r = color(222,118,22);
  //fill(r); 
  image(corpocobra,rabo[i][0], rabo[i][1],wCobra, hCobra);
  //rect(rabo[i][0], rabo[i][1],wCobra, hCobra);  
    
  }    
    
      }
  
  
  
}

function controleMovimentacao(){
  
  if (controleCobra()){
      direcao = controleCobra();
      }
  
   if (direcao == "left"){
    xCobra -= velocidadeMovimentacao;
  }
  if (direcao == "right"){
      xCobra += velocidadeMovimentacao;
      }
  if (direcao == "down"){
      yCobra += velocidadeMovimentacao;
      }
    if (direcao == "up"){
      yCobra -= velocidadeMovimentacao;
      }
}

function controleCobra(){
  
  if(keyIsDown(LEFT_ARROW)){
  return "left";
}
   if(keyIsDown(RIGHT_ARROW)){
  return "right";
}
  
   if(keyIsDown(UP_ARROW)){
  return "up";
}
   if(keyIsDown(DOWN_ARROW)){
  return "down";
}
  
}

function randomIntFromInterval(min, max){
 return Math.floor(Math.random() * (max - min + 1) + min); 
  
}
function desenhaParedes(){
  let Par = color(2,218,22);
  fill(Par);
  rect(posXParE, posYParE, wParED, hParED);
  rect(posXParD, posYParD,  wParED, hParED);
  rect(posXParC, posYParC, wParCB, hParCB);
  rect(posXParB, posYParB, wParCB, hParCB);
}

function desenhaComida(){
  rect(posicaoXcomida, posicaoYcomida, 10, 10);
}

function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXcomida, posicaoYcomida, 10, 10, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXcomida = randomIntFromInterval(11, canvaW - 10);
    posicaoYcomida = randomIntFromInterval(11, canvaW - 10);
    partes += 1
    meusPontos += 1;
    velocidadeMovimentacao += 0.2;
  }
}

function pegarPosicaoAtual() {
  
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}

function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
    meusPontos = 0;
    velocidadeMovimentacao = 2;
  }
}

function incluirPontos(){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(2,218,22));
  rect(190, 3, 20, 20);
  fill(255);
  text(meusPontos, 200, 19.5);
}


let livello = 0; // Variabile che tiene traccia del livello attuale del gioco
let startImage; // Immagine per lo schermo di avvio
let selezione; // Immagine per la selezione dei livelli
let gioco; // Immagine per lo schermo di gioco
let vittoria; // Immagine per lo schermo di vittoria
let sconfitta; // Immagine per lo schermo di sconfitta
let livello_gioco = 0; // Livello di gioco selezionato
let pausa; // Immagine per lo schermo di pausa
let pallina; // Oggetto che rappresenta la pallina nel gioco
let rettangolo; // Oggetto che rappresenta il rettangolo nel gioco
let inPausa = false; // Variabile booleana che indica se il gioco è in pausa
let conteggioCollisioni = 0; // Conteggio delle collisioni tra la pallina e il rettangolo
const numeroMassimoCollisioni = 10; // Numero massimo di collisioni per il livello 1
const numeroMassimoCollisioni2 = 15; // Numero massimo di collisioni per il livello 2 e 3
let vittoriaRaggiunta = false; // Variabile che indica se è stata raggiunta la vittoria
let sconfittaRaggiunta = false; // Variabile che indica se è stata raggiunta la sconfitta
let punteggio=0; //Variabile che serve per il punteggio di ogni livello

function preload() {
    // Caricamento delle immagini necessarie per il gioco
    startImage = loadImage('./img/schermata_principale.png');
    selezione = loadImage('./img/selezione_livelli.png');
    gioco = loadImage('./img/gioco.png');
    pausa = loadImage('./img/pausa.png');
    vittoria = loadImage('./img/vittoria.png');
    sconfitta = loadImage('./img/sconfitta.png');
}

function setup() {
    rectMode(CENTER);
    createCanvas(600, 600);
    // Inizializzazione della pallina e del rettangolo
    pallina = new Pallina();
    rettangolo = new Rettangolo();
}

function draw() {
    // Gestione del disegno in base al livello del gioco
    if (livello == 0) {
        background(startImage); // Schermata di avvio
    } else if (livello == 1) {
        background(selezione); // Schermata di selezione dei livelli
        punteggio=0;
        pallina.velX = 5;
        pallina.velY = 5;
        pallina.x = 250;
        pallina.y = 100;
    } else if (livello == 2) {
        // Schermata di gioco o pausa a seconda dello stato di inPausa
        if (inPausa) {
            background(pausa); // Schermata di pausa
            rettangolo.nascosto = true;
            pallina.nascosto = true;
        } else {
            // Schermata di gioco
            if (livello_gioco === 1) {
                if (vittoriaRaggiunta) {
                    background(vittoria); // Schermata di vittoria
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = 5;
                    pallina.velY = 5;
                    pallina.x = 250;
                    pallina.y = 100;
                } else if (sconfittaRaggiunta) {
                    background(sconfitta); // Schermata di sconfitta
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = 5;
                    pallina.velY = 5;
                    pallina.x = 250;
                    pallina.y = 100;
                } else {
                    background(gioco); // Schermata di gioco
                    pallina.muovi();
                    pallina.mostra();
                    rettangolo.mostra();

                    // Controlla la collisione tra la pallina e il rettangolo
                    if (pallina.y + pallina.diametro / 2 >= rettangolo.y - rettangolo.height / 2 &&
                        pallina.y - pallina.diametro / 2 <= rettangolo.y + rettangolo.height / 2 &&
                        pallina.x + pallina.diametro / 2 >= rettangolo.x - rettangolo.width / 2 &&
                        pallina.x - pallina.diametro / 2 <= rettangolo.x + rettangolo.width / 2) {
                        pallina.rimbalza(); // Inverte la direzione della pallina
                        conteggioCollisioni++;
                        punteggio++;
                        if (conteggioCollisioni > numeroMassimoCollisioni) {
                            vittoriaRaggiunta = true; // Imposta lo stato di vittoria
                            punteggio=0;
                            pallina.velX = random(-5, 5);
                            pallina.velY = random(-5, 5);
                            pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                            pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                        }
                    }

                    // Controlla se la pallina ha toccato il margine inferiore del canvas
                    if (pallina.y + pallina.diametro / 2 >= height && pallina.visible) {
                        sconfittaRaggiunta = true; // Imposta lo stato di sconfitta
                        punteggio=0;
                        pallina.velX = random(-5, 5);
                        pallina.velY = random(-5, 5);
                        pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                        pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                    }
                }
            } else if (livello_gioco === 2) {
                if (vittoriaRaggiunta) {
                    background(vittoria); // Schermata di vittoria
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = random(-5, 5);
                    pallina.velY = random(-5, 5);
                    pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                    pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                } else if (sconfittaRaggiunta) {
                    background(sconfitta); // Schermata di sconfitta
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = random(-5, 5);
                    pallina.velY = random(-5, 5);
                    pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                    pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                } else {
                    background(gioco); // Schermata di gioco
                    pallina.muovi();
                    pallina.mostra();
                    rettangolo.mostra();

                    // Controlla la collisione tra la pallina e il rettangolo
                    if (pallina.y + pallina.diametro / 2 >= rettangolo.y - rettangolo.height / 2 &&
                        pallina.y - pallina.diametro / 2 <= rettangolo.y + rettangolo.height / 2 &&
                        pallina.x + pallina.diametro / 2 >= rettangolo.x - rettangolo.width / 2 &&
                        pallina.x - pallina.diametro / 2 <= rettangolo.x + rettangolo.width / 2) {
                        pallina.rimbalza(); // Inverte la direzione della pallina
                        conteggioCollisioni++;
                        punteggio++;
                        if (conteggioCollisioni >= numeroMassimoCollisioni2) {
                            vittoriaRaggiunta = true; // Imposta lo stato di vittoria
                            punteggio=0;
                            pallina.velX = random(-5, 5);
                            pallina.velY = random(-5, 5);
                            pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                            pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                        }
                        // Moltiplica la velocità della pallina per 1.5 ad ogni collisione con il rettangolo
                        pallina.velX *= 1.5;
                        pallina.velY *= 1.5;
                    }

                    // Controlla se la pallina ha toccato il margine inferiore del canvas
                    if (pallina.y + pallina.diametro / 2 >= height && pallina.visible) {
                        sconfittaRaggiunta = true; // Imposta lo stato di sconfitta
                        punteggio=0;
                        pallina.velX = random(-5, 5);
                        pallina.velY = random(-5, 5);
                        pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                        pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                    }
                }
            } else if (livello_gioco === 3) {
                if (vittoriaRaggiunta) {
                    background(vittoria); // Schermata di vittoria
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = random(-5, 5);
                    pallina.velY = random(-5, 5);
                    pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                    pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                } else if (sconfittaRaggiunta) {
                    background(sconfitta); // Schermata di sconfitta
                    rettangolo.nascosto = true;
                    pallina.nascosto = true;
                    punteggio=0;
                    pallina.velX = random(-5, 5);
                    pallina.velY = random(-5, 5);
                    pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                    pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                } else {
                    background(gioco); // Schermata di gioco
                    pallina.muovi();
                    pallina.mostra();
                    rettangolo.mostra();

                    // Controlla la collisione tra la pallina e il rettangolo
                    if (pallina.y + pallina.diametro / 2 >= rettangolo.y - rettangolo.height / 2 &&
                        pallina.y - pallina.diametro / 2 <= rettangolo.y + rettangolo.height / 2 &&
                        pallina.x + pallina.diametro / 2 >= rettangolo.x - rettangolo.width / 2 &&
                        pallina.x - pallina.diametro / 2 <= rettangolo.x + rettangolo.width / 2) {
                        pallina.rimbalza(); // Inverte la direzione della pallina
                        conteggioCollisioni++;
                        punteggio++;
                        if (conteggioCollisioni >= numeroMassimoCollisioni2) {
                            vittoriaRaggiunta = true; // Imposta lo stato di vittoria
                            punteggio=0;
                            pallina.velX = random(-5, 5);
                            pallina.velY = random(-5, 5);
                            pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                            pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                        }
                        // Moltiplica la velocità della pallina per 1.5 ad ogni collisione con il rettangolo
                        pallina.velX *= 2;
                        pallina.velY *= 2;
                        //diminuisce le dimensioni del rettangolo ad ogni collisione della pallina
                        rettangolo.diminuisci();
                    }

                    // Controlla se la pallina ha toccato il margine inferiore del canvas
                    if (pallina.y + pallina.diametro / 2 >= height && pallina.visible) {
                        sconfittaRaggiunta = true; // Imposta lo stato di sconfitta
                        punteggio=0;
                        pallina.velX = random(-5, 5);
                        pallina.velY = random(-5, 5);
                        pallina.x = random(pallina.diametro / 2, width - pallina.diametro / 2);
                        pallina.y = random(pallina.diametro / 2, height - pallina.diametro / 2);
                    }
                }
            }
        }
        //per il punteggio
        fill(255);
        textSize(20);
        textAlign(RIGHT, TOP);
        text('Punteggio: ' + punteggio, width - 10, 10);
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        if (livello == 0) {
            livello = 1; // Passa al livello 1 quando si preme ENTER
        }
    } else if (livello == 1) {
        if (key === '1' || key === '2' || key === '3') {
            if (livello_gioco === int(key)) { // Se si seleziona lo stesso livello già completato
                conteggioCollisioni = 0; // Resetta il conteggio delle collisioni
                sconfittaRaggiunta = false; // Resetta lo stato di sconfitta
                vittoriaRaggiunta = false; // Resetta lo stato di vittoria
                pallina.nascosto = false; // Riporta la pallina a essere visibile
                rettangolo.nascosto = false; // Riporta il rettangolo a essere visibile
            }
            livello_gioco = int(key); // Converte il carattere premuto in un numero intero
            livello = 2; // Passa al livello 2 quando si preme un tasto numerico
        }
    } else if (livello == 2) {
        if (keyCode === ESCAPE) {
            if (livello_gioco !== 0) {
                inPausa = !inPausa; // Cambia lo stato della pausa quando si preme ESC nel livello 2
                pallina.nascosto = false; // Riporta la pallina a essere visibile
                rettangolo.nascosto = false; // Riporta il rettangolo a essere visibile
            } else {
                livello = 1; // Torna al livello 1 quando si preme ESC nella schermata di sconfitta
                sconfittaRaggiunta = false; // Reimposta lo stato di sconfitta
            }
        } else if (inPausa && keyCode === DELETE) {
            livello = 0; // Torna al livello 0 quando si è in pausa e si preme DELETE
            inPausa = false; // Assicurati che inPausa sia impostato su false
            sconfittaRaggiunta = false; // Resetta lo stato di sconfitta
            vittoriaRaggiunta = false; // Resetta lo stato di vittoria
            conteggioCollisioni = 0; // Resetta il conteggio delle collisioni
            pallina.nascosto = false; // Riporta la pallina a essere visibile
            rettangolo.nascosto = false; // Riporta il rettangolo a essere visibile
        }
    }

    // Ritorna alla selezione dei livelli premendo il tasto "canc"
    if (keyCode === DELETE) {
        livello = 1;
        sconfittaRaggiunta = false; // Resetta lo stato di sconfitta
        vittoriaRaggiunta = false; // Resetta lo stato di vittoria
        conteggioCollisioni = 0; // Resetta il conteggio delle collisioni
        pallina.nascosto = false; // Riporta la pallina a essere visibile
        rettangolo.nascosto = false; // Riporta il rettangolo a essere visibile
    }
}

function mouseMoved() {
    if (livello == 2 && livello_gioco === 1 || livello_gioco===2||livello_gioco===3) {
        rettangolo.muovi(mouseX);
    }
}

// Classe Pallina che rappresenta la pallina nel gioco
class Pallina {
    constructor() {
        this.diametro = 20; // Diametro della pallina
        this.x = 250; // Posizione orizzontale iniziale della pallina
        this.y = 100; // Posizione verticale iniziale della pallina
        this.velX = 5; // Velocità orizzontale iniziale della pallina
        this.velY = 5; // Velocità verticale iniziale della pallina
        this.visible = true; // Indica se la pallina è visibile
        this.nascosto = false; // Indica se la pallina è nascosta
    }

    // Metodo per muovere la pallina
    muovi() {
        this.x += this.velX; // Aggiorna la posizione orizzontale
        this.y += this.velY; // Aggiorna la posizione verticale
        // Inverte la direzione se la pallina colpisce i bordi del canvas
        if (this.x - this.diametro / 2 <= 0 || this.x + this.diametro / 2 >= width) {
            this.velX *= -1;
        }
        if (this.y - this.diametro / 2 <= 0 || this.y + this.diametro / 2 >= height) {
            this.velY *= -1;
        }
    }

    // Metodo per mostrare la pallina
    mostra() {
        if (this.visible && !this.nascosto) {
            fill(255);
            ellipse(this.x, this.y, this.diametro);
        }
    }

    // Metodo per far sparire la pallina
    sparisci() {
        this.visible = false;
    }

    // Metodo per far rimbalzare la pallina
    rimbalza() {
        this.velY *= -1; // Inverte la direzione verticale della pallina
    }
}

// Classe Rettangolo che rappresenta il rettangolo nel gioco
class Rettangolo {
    constructor() {
        this.width = 200; // Larghezza del rettangolo
        this.height = 20; // Altezza del rettangolo
        this.x = width / 2; // Posizione orizzontale iniziale del rettangolo
        this.y = height - this.height / 2 - 10; // Posizione verticale iniziale del rettangolo (sopra il fondo)
        this.nascosto = false; // Indica se il rettangolo è nascosto
    }

    // Metodo per mostrare il rettangolo
    mostra() {
        if (!this.nascosto) {
            fill(255);
            rectMode(CENTER);
            rect(this.x, this.y, this.width, this.height);
        }
    }

    // Metodo per muovere il rettangolo
    muovi(newX) {
        // Assicura che il rettangolo rimanga all'interno del canvas
        if (newX - this.width / 2 >= 0 && newX + this.width / 2 <= width) {
            this.x = newX;
        }
    }

    // Metodo per diminuire la larghezza del rettangolo
    diminuisci() {
        // Riduce la larghezza del rettangolo di un piccolo valore
        this.width -= 5;
        // Assicura che la larghezza non diventi mai negativa
        if (this.width < 0) {
            this.width = 0;
        }
    }
}

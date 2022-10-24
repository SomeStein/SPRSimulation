const GRID_WIDTH = 100
const GRID_HEIGHT = 100
const PR = {
  "players": ["red", "green", "blue"],
  "red": [[0, 1, 0], [255, 0, 0, 255],0],
  "green": [[0, 0, 1], [0, 255, 0, 255],1],
  "blue": [[1, 0, 0], [0, 0, 255, 255],2]
}
let canvas
let grid

class Grid {
  constructor(w, h, PR) {
    this.width = w
    this.height = h
    this.cellWidth = width/w
    this.cellHeight = height/h
    this.playerRules = PR
    this.graphics = createGraphics(this.width, this.height)
    this.graphics.loadPixels()
    this.grid = []
    const gp = this.graphics
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.height; j++) {
        const player = random(this.playerRules["players"])
        this.grid[i][j] = player
        const vals = this.playerRules[player][1]
        let index = (this.width * i + j) * 4;
        gp.pixels[index + 0] = vals[0]
        gp.pixels[index + 1] = vals[1]
        gp.pixels[index + 2] = vals[2]
        gp.pixels[index + 3] = vals[3]
      }
    }
    gp.drawingContext.imageSmoothingEnabled = false;
    gp.updatePixels();
  }

  update(){
    let newGrid = []
    const playerNum = this.playerRules["players"].length
    for (let i = 0; i < this.width; i++){
      newGrid[i] = []
      for(let j = 0; j < this.height; j++){
        let neighbors = []
        for(let k = -1; k <= 1; k++){
          for(let l = -1; l <= 1; l++){
            const x = i+k
            const y = j+l
            if(x < GRID_WIDTH && x >= 0 && y < GRID_HEIGHT && y >= 0 && (k != 0 || l != 0)){
              neighbors.push(this.grid[x][y])
            }
          }
        }
        const thisIndex = this.playerRules[this.grid[i][j]][2]
        let chances = new Array(playerNum).fill(0)
        for(let other of neighbors){
          const otherIndex = this.playerRules[other][2]
          chances[otherIndex] += (this.playerRules[other][0][thisIndex]/neighbors.length)
        }
        
        //text(str(chances),(i+0.5)*this.cellWidth,(j+0.5)*this.cellHeight)
        newGrid[i][j] = 0 //assign winner
      }
    }
  }

  show() {
    image(this.graphics, 0, 0, width, height)
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.drawingContext.imageSmoothingEnabled = false;
  background(51)
  grid = new Grid(GRID_WIDTH, GRID_HEIGHT, PR)
  textAlign(CENTER, CENTER)
  //frameRate(1)
}

function draw() {
  grid.show()
  grid.update()
}
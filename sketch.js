const CELL_NUM = 1000
let cells

class Cell{
  constructor(x,y,full){
    this.x = x
    this.y = y
    this.full = full
  }
  show(){
    this.full ? fill(255) : fill(0)
    stroke(0,255,0)
    rect(this.x,this.y,this.w,this.h)
  }
}

function setup() {
  createCanvas(500,500);
    background(51)
    for (let i = 0; i < CELL_NUM; i++){
      cells[i] = []
      for(let j = 0; j < CELL_NUM; j++){
        cells[i][j] = new Cell
      }
    }
}

function draw() {
  // put drawing code here and there
}
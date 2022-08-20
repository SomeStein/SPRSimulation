const CELL_NUM = 20
let cells = []

class Cell {
  constructor(x, y, s, full = false) {
    this.x = x
    this.y = y
    this.size = s
    this.full = full
    this.changed = false
  }

  update() {
    if (this.changed) {
      this.full ? fill(255) : fill(0)
      noStroke()
      rect(this.x, this.y, this.size)
    }
  }

  show() {
    this.full ? fill(255) : fill(0)
    noStroke()
    rect(this.x, this.y, this.size+1)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51)
  const CELL_SIZE = Math.min(width, height) / CELL_NUM
  for (let i = 0; i < CELL_NUM; i++) {
    cells[i] = []
    for (let j = 0; j < CELL_NUM; j++) {
      cells[i][j] = new Cell(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, (random() < 0.8))
      cells[i][j].show()
    }
  }

}

function draw() {
  for (let cell_array of cells) {
    for (let cell of cell_array) {
      cell.update()
    }
  }
}
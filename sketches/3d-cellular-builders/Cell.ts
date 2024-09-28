export class Cell {
  state: number;
  prevState: number;
  life: number;
  maxLife: number;

  constructor(state = 0, maxLife = 3) {
    this.state = state;
    this.prevState = state;
    this.life = state === 1 ? maxLife : 0;
    this.maxLife = maxLife;
    this.update();
  }

  get visible() {
    return this.life > 0;
  }

  update() {
    this.life--;
  }

  setState(state: number) {
    this.state = state;
    if (state === 1) {
      this.life = this.maxLife;
    }
  }
}

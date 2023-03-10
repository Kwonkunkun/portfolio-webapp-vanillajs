import { getRandomArbitrary } from '@/utils';
import { Particle } from '@/src/canvas/particles/particles.interface';

/**
 * @description 눈 class
 */
export class Snow implements Particle {
  active: boolean = true;
  x!: number;
  y!: number;
  radius!: number;
  speedX!: number;
  speedY!: number;
  opacity!: number;
  opacityMinus!: number;
  pixelRatio!: number;
  stageWidth!: number;
  stageHeight!: number;

  constructor(stageWidth: number, stageHeight: number) {
    this.resize(stageWidth, stageHeight);
  }

  resize(stageWidth: number, stageHeight: number): void {
    this.x = getRandomArbitrary(0, stageWidth);
    this.y = getRandomArbitrary(0, stageHeight / 10);
    this.radius = getRandomArbitrary(3, 7);
    this.speedX = getRandomArbitrary(-1, 1);
    this.speedY = getRandomArbitrary(1, 5);
    this.opacity = getRandomArbitrary(0.8, 1);
    this.opacityMinus = getRandomArbitrary(0.001, 0.005);
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= this.opacityMinus;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    //눈이 화면 밖으로 나가던가 opacity 가 0 이하면 다시 init 해줘야함
    if (this.isDead()) {
      //ratio 에 따라 다르게 넣어주었기 때문에.. 이렇게 해야함
      this.resize(
        ctx.canvas.width / this.pixelRatio,
        ctx.canvas.height / this.pixelRatio,
      );
    }

    //active 가 false 면 update 를 하지 않음
    if (this.active) this.update();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  //보이지 않거나 시야에서 벗어나면 true
  isDead(): boolean {
    return (
      this.x < 0 ||
      this.x > this.stageWidth ||
      this.y < 0 ||
      this.y > this.stageHeight ||
      this.opacity <= 0
    );
  }

  pause(): void {
    this.active = false;
  }

  resume(): void {
    this.active = true;
  }
}

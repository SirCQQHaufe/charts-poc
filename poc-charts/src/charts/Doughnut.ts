class DoughnutChart {
  private canvasId: string;
  private canvas: HTMLCanvasElement | null;
  private context: CanvasRenderingContext2D | null;
  private error: boolean | null | undefined;
  constructor(canvasId: string) {
    this.canvasId = canvasId;
    this.canvas = null;
    this.context = null;
    this.init();
  }

  private init(notFirstInit?: boolean) {
    if (!this.canvasId) {
      return;
    }
    this.canvas = document.getElementById(
      this.canvasId
    ) as HTMLCanvasElement | null;
    if (this.canvas) {
      this.context = this.canvas.getContext("2d");
    } else if (notFirstInit) {
      this.error = true;
    }
  }

  draw(data: number[], colors: string[], customRadius?: number) {
    if (this.error) {
      return;
    }
    if (!this.canvas || !this.context) {
      this.init(true);
      if (!this.canvas || !this.context) {
        return;
      }
    }
    // Draw the doughnut chart here
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = customRadius ?? Math.min(centerX, centerY) - 10;
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = -0.5 * Math.PI;
    let endAngle = 0;
    this.context.lineWidth = 20;
    for (let i = 0; i < data.length; i++) {
      const dataValue = data[i];
      const color = colors[i];

      const sliceAngle = (2 * Math.PI * dataValue) / total;
      endAngle = startAngle + sliceAngle;
      this.context.beginPath();
      this.context.strokeStyle = color;
      this.context.arc(centerX, centerY, radius, startAngle, endAngle);
      this.context.stroke();
      startAngle = endAngle;
    }
  }
}

export default DoughnutChart;

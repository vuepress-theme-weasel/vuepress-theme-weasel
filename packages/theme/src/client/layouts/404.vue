<template>
  <div class="container demo-1">
    <div class="content">
      <div id="large-header" ref="largeHeader" class="large-header" style="height: 917px;">
        <canvas id="demo-canvas" ref="canvas" width="1920" height="917"></canvas>
        <h1 class="main-title">404<br><span class="STYLE3">{{ getMsg() }}</span></h1>
      </div>
      <div id="Layer1">
        <nav class="codrops-demos">
          <a href="javascript:void(0);" @click.native="() => { router.go(-1) }">{{ themeLocale.routeLocales.back }}</a>
          <a href="javascript:void(0);" @click="navigate">{{ themeLocale.routeLocales.home }}</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TweenLite, Elastic } from 'gsap'
import { useRouteLocale } from '@vuepress/client';
import { useThemeLocaleData } from '../composables';
import { useLink, useRouter } from 'vue-router';

type PointItem = {
  x: number
  originX: number
  y: number
  originY: number
  closest?: PointItem[]
  circle?: Circle
  active?: number
}

type Target = {
  x: number
  y: number
}

const largeHeader = ref<HTMLDivElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

const points = ref<PointItem[]>([]);
const active = ref(0)
const animateHeader = ref(true)
const width = ref(0)
const height = ref(0)

const router = useRouter()

/**
 * 计算距离
 */
function getDistance(p1: PointItem, p2: PointItem) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

/**
 * 创建圆形粒子
 * @param pos
 * @param rad
 * @param color
 */
class Circle {
  public active = 0
  constructor(public pos: PointItem, public radius: number, public color: string, public ctx: CanvasRenderingContext2D) {}
  draw() {
    if (!active.value) return
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = 'rgba(156,217,249,' + active.value + ')';
    this.ctx.fill();
  }
}

/**
 * 初始化粒子
 * @param width
 * @param height
 */
const initPoints = (width: number, height: number, context: CanvasRenderingContext2D) => {
  for (let x = 0; x < width; x = x + width / 20) {
    for (let y = 0; y < height; y = y + height / 20) {
      const px = x + Math.random() * width / 20;
      const py = y + Math.random() * height / 20;
      const p = {
        x: px,
        originX: px,
        y: py,
        originY: py
      };
      points.value.push(p)
    }
  }
  findClosestPoints(points.value, context)
}

/**
 * 找出邻近的粒子
 * @param points 。
 */
const findClosestPoints = (points: PointItem[], context: CanvasRenderingContext2D) => {
  // for each point find the 5 closest points
  for (var i = 0; i < points.length; i++) {
    var closest = [];
    var p1 = points[i];
    for (var j = 0; j < points.length; j++) {
      var p2 = points[j]
      if (!(p1 == p2)) {
        var placed = false;
        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (closest[k] == undefined) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
        for (var k = 0; k < 5; k++) {
          if (!placed) {
            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
              closest[k] = p2;
              placed = true;
            }
          }
        }
      }
    }
    p1.closest = closest;
  }

  // assign a circle to each point
  for (let i in points) {
      const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)', context);
      points[i].circle = c
  }
}

// Event handling
function addListeners(target: Target, height: number) {
  if (!('ontouchstart' in window)) {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouseMove(e, target)
    });
  }
  window.addEventListener('scroll', () => {
    scrollCheck(height)
  });
  window.addEventListener('resize', resize);
}

/**
 * 鼠标移动
 * @param e
 * @param target
 */
function mouseMove(e: MouseEvent, target: Target) {
  let posx = 0
  let posy = 0
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  target.x = posx;
  target.y = posy;
}

function scrollCheck(height: number) {
  if (document.body.scrollTop > height) animateHeader.value = false;
  else animateHeader.value = true;
}

function resize() {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  largeHeader.value!.style.height = height + 'px';
  canvas.value!.width = width.value;
  canvas.value!.height = height.value;
}

// animation
function initAnimation(ctx: CanvasRenderingContext2D, target: PointItem) {
  animate(ctx, target);
  for (const i in points.value) {
    shiftPoint(points.value[i]);
  }
}

function animate(ctx: CanvasRenderingContext2D, target: PointItem) {
  if (animateHeader) {
    ctx.clearRect(0, 0, width.value, height.value);
    for (var i in points.value) {
      // detect points in range
      if (Math.abs(getDistance(target, points.value[i])) < 4000) {
        points.value[i].active = 0.3;
        points.value[i].circle!.active = 0.6;
      } else if (Math.abs(getDistance(target, points.value[i])) < 20000) {
        points.value[i].active = 0.1;
        points.value[i].circle!.active = 0.3;
      } else if (Math.abs(getDistance(target, points.value[i])) < 40000) {
        points.value[i].active = 0.02;
        points.value[i].circle!.active = 0.1;
      } else {
        points.value[i].active = 0;
        points.value[i].circle!.active = 0;
      }
      drawLines(ctx, points.value[i]);
      points.value[i].circle!.draw();
    }
  }
  requestAnimationFrame(() => {
    animate(ctx, target)
  });
}

// Canvas manipulation
function drawLines(ctx: CanvasRenderingContext2D, p: PointItem) {
  if (!p.active) return;
  for (var i in p.closest) {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    // @ts-ignore
    ctx.lineTo(p.closest[i].x, p.closest[i].y);
    ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
    ctx.stroke();
  }
}

function shiftPoint(p: PointItem) {
  TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Elastic.easeInOut,
      onComplete: function () {
          shiftPoint(p);
      }
  });
}

onMounted(() => {
  width.value = window.innerWidth
  height.value = window.innerHeight

  if (canvas.value) {
    const context = canvas.value.getContext('2d')!
    const target: PointItem = {
      x: width.value / 2,
      originX: width.value / 2,
      y: height.value / 2,
      originY: height.value / 2
    }

    // Main
    initPoints(width.value, height.value, context);
    initAnimation(context!, target);
    addListeners(target, height.value);

    console.log(points.value)
  }
})

const routeLocale = useRouteLocale();
const themeLocale = useThemeLocaleData();

const getMsg = (): string => {
  const messages = themeLocale.value.routeLocales!["404msg"] || 'sorry!网页不见了...';
  return messages[Math.floor(Math.random() * messages.length)];
};

const { navigate } = useLink({
  to: themeLocale.value.home ?? routeLocale.value,
});
</script>

<style lang="scss" scoped>
/* Header */
.large-header {
  position: relative;
  width: 100%;
  background: #333;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 1;
}

.main-title {
  position: absolute;
  margin: 0;
  padding: 0;
  color: #f9f1e9;
  text-align: center;
  top: 40%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
}
.demo-1 .main-title, .demo-3 .main-title {
  text-transform: uppercase;
  font-size: 4.2em;
  letter-spacing: 0.1em;
}

.main-title .thin {
  font-weight: 200;
}
@media only screen and (max-width : 768px) {
  .demo-1 .main-title, .demo-3 .main-title, .demo-4 .main-title {
    font-size: 3em;
  }
}
.STYLE3 {
  font-size: medium;
}
#Layer1 {
  position: absolute;
  width: 100%;
  z-index: 2;
  top: 60%;
}
.codrops-demos {
  padding-top: 1em;
  font-size: 0.8em;
  text-align: center;
  a {
    display: inline-block;
    margin: 0.35em 0.1em;
    padding: 0.5em 1.2em;
    outline: none;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    border-radius: 2px;
    font-size: 110%;
    border: 2px solid transparent;
    color: #fff;
    border-color: #fff;
    &:hover {
      box-shadow: 0 0 9px 1px rgba(255, 255, 255, 0.4);
    }
  }
}
</style>

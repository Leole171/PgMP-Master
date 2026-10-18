import Matter from 'matter-js';

export type Ball = { id: number; x: number; y: number; r: number; color: string };

const COLORS = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc'];

export function createWorld(width: number, height: number) {
  const engine = Matter.Engine.create();
  const wall = { isStatic: true };
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(width / 2, height + 25, width, 50, wall),
    Matter.Bodies.rectangle(-25, height / 2, 50, height, wall),
    Matter.Bodies.rectangle(width + 25, height / 2, 50, height, wall),
  ]);
  return engine;
}

export function spawnBall(engine: Matter.Engine, x: number, y: number) {
  const r = 12 + Math.random() * 18;
  const body = Matter.Bodies.circle(x, y, r, { restitution: 0.6 });
  body.plugin = { r, color: COLORS[body.id % COLORS.length] };
  Matter.Composite.add(engine.world, body);
}

export function readBalls(engine: Matter.Engine): Ball[] {
  return Matter.Composite.allBodies(engine.world)
    .filter((b) => !b.isStatic)
    .map((b) => ({ id: b.id, x: b.position.x, y: b.position.y, ...b.plugin }));
}

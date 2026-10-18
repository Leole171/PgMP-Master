import { Canvas, Circle } from '@shopify/react-native-skia';
import * as Haptics from 'expo-haptics';
import Matter from 'matter-js';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { useGameLoop } from '../engine/useGameLoop';
import { Ball, createWorld, readBalls, spawnBall } from '../engine/physics';
import { useGameStore } from '../store/useGameStore';

// Demo: tap anywhere to drop a ball. Replace with your own game.
export function GameScreen() {
  const { width, height } = useWindowDimensions();
  const engine = useMemo(() => createWorld(width, height), [width, height]);
  const [balls, setBalls] = useState<Ball[]>([]);
  const { score, highScore, addPoint, reset } = useGameStore();

  useGameLoop((dt) => {
    Matter.Engine.update(engine, dt);
    setBalls(readBalls(engine));
  });

  const onTap = (x: number, y: number) => {
    spawnBall(engine, x, y);
    addPoint();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const restart = () => {
    const dynamic = Matter.Composite.allBodies(engine.world).filter((b) => !b.isStatic);
    Matter.Composite.remove(engine.world, dynamic);
    reset();
  };

  return (
    <View
      style={styles.root}
      onTouchStart={(e) => onTap(e.nativeEvent.locationX, e.nativeEvent.locationY)}
    >
      <Canvas style={StyleSheet.absoluteFill}>
        {balls.map((b) => (
          <Circle key={b.id} cx={b.x} cy={b.y} r={b.r} color={b.color} />
        ))}
      </Canvas>
      <View style={styles.hud} pointerEvents="box-none">
        <Text style={styles.text}>Score {score}</Text>
        <Text style={styles.text}>Best {highScore}</Text>
        <Pressable onPress={restart} onTouchStart={(e) => e.stopPropagation()} style={styles.button}>
          <Text style={styles.text}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0a0f' },
  hud: { flexDirection: 'row', gap: 16, alignItems: 'center', padding: 16, paddingTop: 56 },
  text: { color: '#e8e6f0', fontSize: 18, fontWeight: '600' },
  button: { marginLeft: 'auto', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: '#2a2a3a' },
});

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface TreeConfig {
  height: number;
  radius: number;
  count: number;
  color: string;
}

export enum AnimationState {
  IDLE,
  ACTIVE,
}
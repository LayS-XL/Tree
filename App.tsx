import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import { LuxuryTree } from './components/LuxuryTree';
import { EnvironmentScene } from './components/EnvironmentScene';
import { Effects } from './components/Effects';
import { UIOverlay } from './components/UIOverlay';

const App: React.FC = () => {
  const [mounted, setMounted
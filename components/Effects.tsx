import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';

export const Effects: React.FC = () => {
  return (
    <EffectComposer disableNormalPass>
      {/* Cinematic Depth of Field - focusing on the tree center */}
      <DepthOfField 
        focusDistance={0} // 0 means camera? No, usually normalized. 
        focalLength={0.02} // Camera focal length
        bokehScale={5} // Blur intensity
        height={480} // Resolution
        target={[0, 0, 0]} // Focus on the origin (tree center)
      />

      {/* High intensity bloom for the "Gold" shine */}
      <Bloom 
        luminanceThreshold={0.8} 
        mipmapBlur 
        intensity={1.2} 
        radius={0.4}
      />

      {/* Subtle noise for film grain texture - slightly increased for 'luxury film' feel */}
      <Noise opacity={0.05} />

      {/* Stronger Vignette for intimate feeling */}
      <Vignette eskil={false} offset={0.1} darkness={0.8} />
    </EffectComposer>
  );
};
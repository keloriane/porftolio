varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform float time;
uniform float hoverState;
uniform float uProgress;  // Controls the appearance of the element
uniform float uTexture;

// Noise function (for the noise mask)
float noise(vec2 uv) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec2 newUV = vUv;

    // Fetch the texture based on UV coordinates
  vec4 imageColor = texture2D(uImage, newUV);

    // Create a noise pattern based on UV coordinates
  float mask = noise(newUV * 10.0 + time * 0.1);  // Scale UV for finer noise detail

    // Use uProgress to control the reveal of the texture
  float revealFactor = smoothstep(0.0, 1.0, uProgress);

    // Apply the mask by comparing the noise value to the progress
  mask = smoothstep(0.0, 1.0, mask - revealFactor);

    // Combine the mask with the texture color
  vec4 finalColor = mix(vec4(0.0), imageColor, mask);  // Use mask to reveal the image

    // Apply fade-in effect by gradually increasing opacity
  finalColor.a *= revealFactor;

    // Optional: Add a subtle blur effect during the reveal based on progress
  float blurAmount = 1.0 - revealFactor;
  vec4 blurredColor = texture2D(uImage, newUV + vec2(blurAmount * 0.01));  // Adjust blur scaling as needed
  finalColor = mix(blurredColor, finalColor, revealFactor);

    // --------------- Hover Enhancements ---------------

    // 1. Apply a distortion based on hoverState (warp the UV coordinates)
  float distortionStrength = hoverState * 0.02;  // Strength of the distortion based on hover
  vec2 distortedUV = newUV + distortionStrength * vec2(sin(time + newUV.y * 10.0), cos(time + newUV.x * 10.0));

    // Re-fetch the texture with distorted UV for subtle warping effect
  vec4 distortedColor = texture2D(uImage, distortedUV);

    // 2. Introduce dynamic noise based on hoverState (increase noise intensity on hover)
  float dynamicNoise = hoverState * 0.1 * noise(newUV * 20.0 + time * 0.5);  // Stronger noise on hover
  finalColor.rgb += dynamicNoise;

    // 3. Apply a color shift when hovering (shift color to warmer tones on hover)
  vec3 hoverColorShift = vec3(0.1, 0.05, -0.1) * hoverState;  // A subtle red/yellow shift
  finalColor.rgb += hoverColorShift;

    // 4. Increase brightness during hover for better interaction feedback
  finalColor.rgb = mix(finalColor.rgb, finalColor.rgb * 1.2, hoverState);  // 20% brighter on hover

    // --------------- Final Color Output ---------------

    // Output the final color
  gl_FragColor = mix(finalColor, distortedColor, hoverState);  // Blend distorted and final color based on hoverState

    // Optionally add subtle noise to the final color for additional texture
  gl_FragColor.rgb += 0.05 * vec3(vNoise);
}

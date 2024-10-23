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
    // More blur when revealFactor is lower, less blur when fully revealed
  float blurAmount = 1.0 - revealFactor;
  vec4 blurredColor = texture2D(uImage, newUV + vec2(blurAmount * 0.01));  // Adjust blur scaling as needed
  finalColor = mix(blurredColor, finalColor, revealFactor);

    // Output the final color with noise for additional texture
  gl_FragColor = finalColor;

    // Optionally add subtle noise to the final color
  gl_FragColor.rgb += 0.05 * vec3(vNoise);
}

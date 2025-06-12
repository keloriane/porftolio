uniform float u_time;
uniform sampler2D displacement;

varying vec2 vUv;

vec4 rgb(float r, float g, float b) {
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

void main() {
    vec2 uv = vUv;

    // Create a moving pattern using sine and cosine functions
    float pattern1 = sin(uv.x * 10.0 + u_time * 2.0) * cos(uv.y * 10.0 + u_time * 2.0);
    float pattern2 = sin(uv.y * 15.0 + u_time * 1.5) * cos(uv.x * 15.0 + u_time * 1.5);

    // Combine patterns with displacement
    vec2 point = fract(uv * 0.1 + u_time * 0.05 + pattern1 * 0.1 + pattern2 * 0.1);
    vec4 dispColor = texture2D(displacement, point);

    // Define colors
    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0.0, 255.0, 224.0);
    vec4 bl = rgb(255.0, 255.0, 0.0);
    vec4 br = rgb(231.0, 244.0, 255.0);

    // Apply displacement
    float dispX = mix(-0.5, 0.5, dispColor.r);
    float dispY = mix(-0.5, 0.5, dispColor.r);

    // Mix colors with patterns
    vec4 color = mix(mix(tl, tr, uv.x + dispX + pattern1 * 0.1), mix(bl, br, uv.x - dispX + pattern2 * 0.1), uv.y + dispY);

    gl_FragColor = color;
}
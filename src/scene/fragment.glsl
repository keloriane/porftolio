#version 150

precision highp float;
uniform float u_time;
uniform sampler2D displacement;
in VertexData {

    vec2 v_texcoord;
} inData;
out vec4 fragColor;

vec4 rgb(float r, float g, float b) {
    return vec4(r / 255.0, g / 255.0, b / 255.0, 1.0);
}

void main(void) {
    vec2 uv = inData.v_texcoord;
    vec2 point = fract(uv * 0.1 + u_time * 0.05);
    vec4 dispColor = texture(displacement, point);

    vec4 tl = rgb(251.0, 41.0, 212.0);
    vec4 tr = rgb(0.0, 255.0, 224.0);
    vec4 bl = rgb(255.0, 255.0, 0.0);
    vec4 br = rgb(231.0, 244.0, 255.0);

    float dispX = mix(-0.5, 0.5, dispColor.r);
    float dispY = mix(-0.5, 0.5, dispColor.r);

    vec4 color = mix(mix(tl, tr, uv.x + dispX), mix(bl, br, uv.x - dispX), uv.y + dispY);

    fragColor = color;
}
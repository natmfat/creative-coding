precision highp float;

uniform float u_time;
varying vec2 v_uv;

void main() {
  gl_FragColor = vec4(vec3(v_uv.x), 1.0);
}
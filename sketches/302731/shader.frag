precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

#include noise;

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 center = v_uv - 0.5;
  center.x *= aspect;

  vec3 noise = vec3(noise(vec3(center * 2.0, u_time * 0.25)));
  vec3 color = noise.x < 0.5 ? vec3(noise.x + 1.0, 0.0, 0.0) : vec3(0.9, 0.8, 0.0);
  
  gl_FragColor = vec4(color, 1.0 - smoothstep(0.35, 0.4, length(center)));
}
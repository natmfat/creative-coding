precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

#include random;

void main() {
  // ensure circle maintains the same radius regardless of resolution
  float aspect = u_resolution.x / u_resolution.y;
  vec2 center = (v_uv - 0.5);
  center.x *= aspect;
  
  float dist = length(center);

  // create a gradient
  vec3 color_a = vec3(1.0, 0.0, 0.0);
  vec3 color_b = vec3(0.0, 1.0, 0.0);
  vec3 color = mix(color_a, color_b, v_uv.x + v_uv.y);

  // only show color within a certain radius
  // dist < 0.3 ? 1.0 : 0.0
  // step(dist, 0.3)
  float alpha = 1.0 - smoothstep(0.25, 0.75, dist);

  // @resource
  // https://thebookofshaders.com/10/
  vec3 noise_overlay = vec3(random(gl_FragCoord.xy / u_resolution.xy));
  gl_FragColor = vec4(color + noise_overlay / 2.0, alpha);

  // monochrome gradient:
  // gl_FragColor = vec4(v_uv.x, 1.0);
}
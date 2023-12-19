varying vec2 v_uv;

uniform float u_time;

// https://github.com/nathanoffline/ffa-website-minimal/blob/main/components/Scenes/FlagScene/Flag.js

void main() {
  v_uv = uv;

  float amplitude = 20.;
  float frequency = 0.0125;
  vec3 pos = position;
  pos.z = amplitude * sin(frequency * pos.x + u_time);


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

// ---------------- Setup Scene, Camera, Renderer ----------------
const scene = new THREE.Scene();

// A normal camera, just so we can see the plane
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('myCanvas') // Use a specific canvas, or omit this to let Three.js create one
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// -------------- Handle Window Resize --------------
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ---------------- Define the Shader ----------------
// We’ll have a uniform for the virtual camera position (uCameraPos).
// The vertex shader just passes the mesh's position to the fragment shader.
const vertexShader = `
  varying vec3 vPosition;
  
  void main() {
    vPosition = position;
    // Standard transform:
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uCameraPos;
  varying vec3 vPosition;

  void main() {
    // Calculate distance from each fragment to the "camera" position in XY(Z).
    float dist = distance(vPosition, uCameraPos);

    // We'll mix two simple colors based on distance,
    // so near = red, far = black. 
    float intensity = 1.0 - clamp(dist / 5.0, 0.0, 1.0);

    gl_FragColor = vec4(intensity, 0.0, 0.0, 1.0);
  }
`;

// ---------------- Create Plane Geometry ----------------
const planeGeometry = new THREE.PlaneBufferGeometry(10, 10, 100, 100);

// Create the ShaderMaterial with a uniform for the "camera" position
const uniforms = {
  uCameraPos: { value: new THREE.Vector3(0, 0, 0) }
};

const planeMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  wireframe: false // set true if you'd like to see the grid lines
});

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// Rotate the plane so it's oriented upright
planeMesh.rotation.x = -Math.PI * 0.5;
scene.add(planeMesh);

// ---------------- Navigate the "Camera" via Arrow Keys ----------------
const keys = {};
window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});
window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// We'll treat uCameraPos like a camera, so the user can move left-right, forward-back.
function updateVirtualCameraPosition() {
  const speed = 0.05;
  if (keys['ArrowUp'])    uniforms.uCameraPos.value.z -= speed;
  if (keys['ArrowDown'])  uniforms.uCameraPos.value.z += speed;
  if (keys['ArrowLeft'])  uniforms.uCameraPos.value.x -= speed;
  if (keys['ArrowRight']) uniforms.uCameraPos.value.x += speed;
}

// ---------------- Animation Loop ----------------
function animate() {
  requestAnimationFrame(animate);

  // Move our "virtual camera"
  updateVirtualCameraPosition();

  renderer.render(scene, camera);
}
animate();

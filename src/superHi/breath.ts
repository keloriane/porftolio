import * as THREE from "three";
import displacement from "./displacement1.jpg";
//@ts-ignore
import fragment from "./fragment.glsl";
//@ts-ignore
import vertex from "./vertex.glsl";

export default class BreathScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private material: THREE.ShaderMaterial;
  private geometry: THREE.PlaneGeometry;
  private mesh: THREE.Mesh;
  private clock: THREE.Clock;

  constructor(private canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 1;

    this.clock = new THREE.Clock();

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Load the displacement texture
    const displacementTexture = new THREE.TextureLoader().load(
      displacement.src,
      () => this.renderScene(), // Render the scene once the texture is loaded
      undefined,
      (err) => console.error("Failed to load displacement texture:", err)
    );

    // Geometry and Shader Material
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial({
      vertexShader: `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
  `,
      fragmentShader: fragment,
      uniforms: {
        u_time: { value: 0.0 },
        displacement: {
          value: new THREE.TextureLoader().load(displacement.src),
        },
      },
    });

    // Create a mesh and add it to the scene
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    // Set up resize handling
    window.addEventListener("resize", this.handleResize.bind(this));
    this.animate();

    // Render the scene initially
    this.renderScene();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Update time uniform
    this.material.uniforms.u_time.value = this.clock.getElapsedTime();

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  private renderScene() {
    // Update the MVP uniform
    // this.material.uniforms.mvp.value.multiplyMatrices(
    //   this.camera.projectionMatrix,
    //   this.camera.matrixWorldInverse
    // );

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  private handleResize() {
    const { innerWidth, innerHeight } = window;

    // Update renderer size
    this.renderer.setSize(innerWidth, innerHeight);

    // Update camera aspect ratio and projection matrix
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();

    // Update resolution uniform
    this.material.uniforms.resolution.value.set(innerWidth, innerHeight);

    // Re-render the scene
    this.renderScene();
  }

  public dispose() {
    // Cleanup resources
    this.renderer.dispose();
    this.material.dispose();
    this.geometry.dispose();

    // Remove event listeners
    window.removeEventListener("resize", this.handleResize);
  }
}

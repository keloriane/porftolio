import * as THREE from "three";
//@ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//@ts-ignore
import vertex from "./vertex.glsl";
//@ts-ignore
import fragment from "./fragment.glsl";

//@ts-ignore

import imagesLoaded from "imagesloaded";

import gsap from "gsap";

//@ts-ignore
import * as dat from "dat.gui";

interface SketchOptions {
  container: HTMLElement;
  images: HTMLImageElement[]; // Add image to the options interface
}

export default class Sketch {
  time: number;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  mesh!: THREE.Mesh;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  width: number;
  height: number;
  container: HTMLElement;
  controls: OrbitControls;
  images: HTMLImageElement[]; // Store image path
  imageStore: any[];
  currentScroll: number;
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;
  materials: any[];
  settings: { progress: 0 };

  constructor(options: SketchOptions) {
    this.time = 0;
    this.currentScroll = 0;
    this.imageStore = [];
    this.container = options.container;
    this.images = options.images;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.materials = [];
    this.settings = {
      progress: 0,
    };

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      100,
      2000
    );

    this.camera.fov = 2 * Math.atan(this.height / 2 / 600) * (180 / Math.PI);
    this.camera.position.z = 600;
    // Create scene
    this.scene = new THREE.Scene();

    // Create renderer and attach to the DOM
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    // Create OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.images = [...document.querySelectorAll("img")];
    const preloadImages = new Promise((resolve, reject) => {
      imagesLoaded(
        document.querySelectorAll("img"),
        { background: true },
        resolve
      );
    });
    preloadImages.then(() => {
      console.log("Images loaded successfully");
    });

    let allDone = [preloadImages];

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Ensure images are loaded before rendering scene
    Promise.all(allDone).then(() => {
      this.addImages();
      this.setPosition();

      this.mouseMovement();

      this.resize();
      this.setupResize();

      this.setupSettings();
      this.render();
      window.addEventListener("scroll", () => {
        console.log(window.scrollY);
        this.currentScroll = window.scrollY;
        this.setPosition();
      });
    });
  }

  setupSettings() {
    this.settings = {
      progress: 0,
    };

    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.001);
  }

  resize(): void {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);

    this.imageStore.forEach((i) => {
      let bounds = i.img.getBoundingClientRect();
      let aspectRatio = i.aspectRatio; // Retrieve stored aspect ratio

      // Update top, left, width, and height based on new image bounds
      i.top = bounds.top + window.scrollY;
      i.left = bounds.left + window.scrollX;
      i.width = bounds.width;
      i.height = bounds.height;

      // Only update geometry, do not recreate the material or event listeners
      if (bounds.width / bounds.height > aspectRatio) {
        i.mesh.geometry.dispose(); // Dispose old geometry
        i.mesh.geometry = new THREE.PlaneGeometry(
          bounds.height * aspectRatio,
          bounds.height,
          10,
          10
        );
      } else {
        i.mesh.geometry.dispose(); // Dispose old geometry
        i.mesh.geometry = new THREE.PlaneGeometry(
          bounds.width,
          bounds.width / aspectRatio,
          10,
          10
        );
      }

      // Update the position of the mesh
      this.setPosition();
    });
  }

  addImages() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uImage: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: { value: 0 },
        uProgress: { value: 0 }, // Start at 0 (normal size)
        uCorners: { value: new THREE.Vector4(0, 0, 0, 0) },
        uResolution: { value: new THREE.Vector2(this.width, this.height) },
        uQuadSize: { value: new THREE.Vector2(300, 300) }, // Initial size
      },
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    this.materials = [];

    this.imageStore = this.images.map((img) => {
      let bounds = img.getBoundingClientRect();
      let texture = new THREE.Texture(img);
      texture.needsUpdate = true;

      let aspectRatio = img.naturalWidth / img.naturalHeight;

      let geometry;
      if (bounds.width / bounds.height > aspectRatio) {
        geometry = new THREE.PlaneGeometry(
          bounds.height * aspectRatio,
          bounds.height,
          10,
          10
        );
      } else {
        geometry = new THREE.PlaneGeometry(
          bounds.width,
          bounds.width / aspectRatio,
          10,
          10
        );
      }

      let material = this.material.clone();
      material.uniforms.uImage.value = texture;

      let mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);

      gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: 2.5, // Duration of the appearance effect
        ease: "expo.out", // Smooth easing for the appearance
        onStart: () => {
          gsap.fromTo(
            mesh.scale,
            { x: 1.1, y: 1.1, z: 1.1 }, // Start with slight scaling
            { x: 1, y: 1, z: 1, duration: 2.5, ease: "expo.out" } // Zoom in slightly during the transition
          );
        },
      });

      // Add hover effects
      img.addEventListener("mouseenter", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
          ease: "power3.out",
        });
      });

      img.addEventListener("mouseout", () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0,
          ease: "power3.out",
        });
      });

      // Add click event to expand to full screen
      img.addEventListener("click", () => {
        gsap.to(material.uniforms.uProgress, {
          duration: 1,
          value: 1, // Set uProgress to 1 to trigger the full-screen effect
          ease: "power3.out",
        });
      });

      this.materials.push(material);

      return {
        img: img,
        mesh: mesh,
        aspectRatio: aspectRatio,
        top: bounds.top + window.scrollY,
        left: bounds.left + window.scrollX,
        width: bounds.width,
        height: bounds.height,
      };
    });

    console.log(this.imageStore);
  }

  setupResize(): void {
    window.addEventListener("resize", this.resize.bind(this));
  }

  mouseMovement() {
    window.addEventListener(
      "mousemove",
      (event) => {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;

        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
          // console.log(intersects[0]);
          let obj = intersects[0].object;
          //@ts-ignore
          obj.material.uniforms.hover.value = intersects[0].uv;
        }
      },
      false
    );
  }

  render(): void {
    this.time += 0.05;

    // Update uniform time
    this.material.uniforms.time.value = this.time;
    this.material.uniforms.uProgress.value = this.settings.progress;

    this.materials.forEach((m) => {
      m.uniforms.time.value = this.time;
    });
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }

  setPosition() {
    this.imageStore.forEach((o) => {
      const y = this.currentScroll - o.top + this.height / 2 - o.height / 2;
      const x = o.left - this.width / 2 + o.width / 2;

      o.mesh.position.set(x, y, 0);
    });
  }
}

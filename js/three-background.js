/**
 * three-background.js
 * Ambient Three.js scene: a slowly rotating field of glowing "data cubes"
 * connected by faint network lines, drifting with gentle parallax as the
 * cursor moves. Purely decorative — sits behind all page content.
 */
(function () {
  const canvas = document.getElementById("three-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 34;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const group = new THREE.Group();
  scene.add(group);

  const NODE_COUNT = window.innerWidth < 700 ? 26 : 46;
  const nodes = [];
  const cyan = new THREE.Color(0x00d4ff);
  const white = new THREE.Color(0xffffff);

  const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);

  for (let i = 0; i < NODE_COUNT; i++) {
    const useCube = i % 3 === 0;
    const color = i % 2 === 0 ? cyan : white;
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: useCube,
      transparent: true,
      opacity: useCube ? 0.55 : 0.8,
    });

    const mesh = useCube
      ? new THREE.Mesh(cubeGeo, material)
      : new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), material);

    mesh.position.set(
      (Math.random() - 0.5) * 46,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 26
    );
    mesh.userData.speed = 0.05 + Math.random() * 0.12;
    mesh.userData.offset = Math.random() * Math.PI * 2;
    group.add(mesh);
    nodes.push(mesh);
  }

  // connecting lines between nearby nodes (network effect)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.12 });
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < 9) {
        linePositions.push(
          nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
          nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
        );
      }
    }
  }
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);

  let mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let scrollY = 0;
  window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    nodes.forEach((n) => {
      n.rotation.x += 0.002;
      n.rotation.y += 0.003;
      n.position.y += Math.sin(t * n.userData.speed + n.userData.offset) * 0.003;
    });

    if (!reduceMotion) {
      group.rotation.y = t * 0.02 + mouseX * 0.15;
      group.rotation.x = mouseY * 0.08;
    }
    group.position.y = -scrollY * 0.01;

    renderer.render(scene, camera);
  }

  animate();
})();

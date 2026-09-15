import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// ------------------------------------------------------------
// CONFIGURACIÓN
// ------------------------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document
    .getElementById("game-container")
    .appendChild(renderer.domElement);

// ------------------------------------------------------------
// LUCES
// ------------------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(
    20,
    30,
    20
);

scene.add(directionalLight);

// ------------------------------------------------------------
// SUELO
// ------------------------------------------------------------

const groundGeometry = new THREE.PlaneGeometry(
    100,
    100
);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x4caf50
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;

scene.add(ground);

// ------------------------------------------------------------
// JUGADOR
// ------------------------------------------------------------

const playerGeometry = new THREE.BoxGeometry(
    1,
    1.5,
    1
);

const playerMaterial = new THREE.MeshStandardMaterial({
    color: 0x3366ff
});

const player = new THREE.Mesh(
    playerGeometry,
    playerMaterial
);

player.position.set(
    0,
    0.75,
    0
);

scene.add(player);

// ------------------------------------------------------------
// CÁMARA
// ------------------------------------------------------------

camera.position.set(
    0,
    12,
    12
);

// ------------------------------------------------------------
// MOVIMIENTO DEL JUGADOR
// ------------------------------------------------------------

const keys = {};

window.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

window.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

const playerSpeed = 8;

function updatePlayer(delta) {

    const direction = new THREE.Vector3();

    if (keys["KeyW"]) {
        direction.z -= 1;
    }

    if (keys["KeyS"]) {
        direction.z += 1;
    }

    if (keys["KeyA"]) {
        direction.x -= 1;
    }

    if (keys["KeyD"]) {
        direction.x += 1;
    }

    if (direction.length() > 0) {

        direction.normalize();

        player.position.x +=
            direction.x * playerSpeed * delta;

        player.position.z +=
            direction.z * playerSpeed * delta;
    }
}

camera.lookAt(
    player.position
);

// ------------------------------------------------------------
// BUCLE PRINCIPAL
// ------------------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    const delta = 0.016;

    updatePlayer(delta);

    camera.lookAt(
        player.position
    );

    renderer.render(
        scene,
        camera
    );
}

animate();

// ------------------------------------------------------------
// REDIMENSIONAR VENTANA
// ------------------------------------------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

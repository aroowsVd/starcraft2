var scene, sceneLight, portalLight, cam, renderer, clock, portalParticles = [], smokeParticles = [];
let camStartZ = 8000;
let camEndZ = 3000;
let camSpeed = 10;

const url = 'https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png';
const url2 = 'https://rawgit.com/marcobiedermann/playground/master/three.js/smoke-particles/dist/assets/images/clouds.png';

function initScene() {
    scene = new THREE.Scene();

    // 메인 portal light, DirectionalLight(색상, 깊이)
    sceneLight = new THREE.DirectionalLight(0xffffff, 0.1);
    sceneLight.position.set(0, 0, 1);
    scene.add(sceneLight);

    // 서브 portal light, PointLight( color : 정수, intensity : Float, 거리 : 숫자, decay : Float )
    portalLight = new THREE.PointLight(0x062d89, 30, 500, 6.7);
    portalLight.position.set(0, 0, 250);
    scene.add(portalLight);

    // cam perspective, PerspectiveCamera( fov : Number(수직시야), aspect : Number, near(거리) : Number, far(거리) : Number )
    cam = new THREE.PerspectiveCamera(800, window.innerWidth/window.innerHeight, 1, 10000);
    cam.position.y = -100;
    cam.position.z = 2000;
    scene.add(cam);

    // render setting, 캔버스 color, WebGLRenderer에 alpha값을 켜서 배경 투명화
    renderer = new THREE.WebGLRenderer({
        alpha: true,
    });
    // renderer.setClearColor(0x000000, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    particleSetup();
}
function particleSetup() {
    let loader = new THREE.TextureLoader();

    loader.load(url, function(texture) {
        portalGeo = new THREE.PlaneBufferGeometry(350, 350);
        portalMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        });
        smokeGeo = new THREE.PlaneBufferGeometry(1000, 1000);
        smokeMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        });

        for(let p=880;p>250;p--) {
            let particle = new THREE.Mesh(portalGeo, portalMaterial);
            particle.position.set(
                0.5 * p  * Math.cos((4 * p * Math.PI) / 180),
                0.5 * p  * Math.sin((4 * p * Math.PI) / 180),
                0.1 * p
            );
            particle.rotation.z = Math.random() * 360;
            portalParticles.push(particle);
            scene.add(particle);
        }
        for(let p=0;p<40;p++) {
            let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
            particle.position.set(
                Math.random() * 1000-500,
                Math.random() * 400-200,
                25
            );
            particle.rotation.z = Math.random() * 360;
            particle.material.opacity = 0.4;
            portalParticles.push(particle);
            scene.add(particle);
        }
        clock = new THREE.Clock();
        animate();
        // renderer.render(scene, cam);
    });
}
function animate() {
    let delta = clock.getDelta();
    portalParticles.forEach(p => {
        p.rotation.z -= delta * 1.5;
    });
    smokeParticles.forEach(p => {
        p.rotation.z -= delta * 0.2;
    });
    if(Math.random() > 0.9) {
        portalLight.power = 350 + Math.random() * 500;
    }

    // camera perspective animation
    // if (cam.position.z > camEndZ) {
    //     cam.position.z -= camSpeed * delta * 300;
    //     if (cam.position.z < camEndZ) {
    //         cam.position.z = camEndZ;
    //     }
    // }

    let intensityTarget = 0.6;  // 목표 세기
    let intensitySpeed = 0.001;  // 세기 변경 속도
    if (sceneLight.intensity < intensityTarget) {
        sceneLight.intensity += intensitySpeed;  // 목표 세기까지 점진적으로 증가
        if (sceneLight.intensity > intensityTarget) {
            sceneLight.intensity = intensityTarget;  // 목표 세기 초과 방지
        }
    } else if (sceneLight.intensity > 0.1) {
        sceneLight.intensity -= intensitySpeed;  // 다시 0.3으로 줄이기
        if (sceneLight.intensity < 0.1) {
            sceneLight.intensity = 0.1;
        }
    }

    let portalLightTarget = 1.7;
    let portalLightSpeed = 0.05;
    if (portalLight.decay > portalLightTarget) {
        portalLight.decay -= portalLightSpeed;
        if (portalLight.decay < portalLightTarget) {
            portalLight.decay = portalLightTarget;
        }
    } else if (portalLight < 6.7) {
        portalLight .decay += portalLightSpeed;
        if (portalLight.decay > 6.7) {
            portalLight.decay = 6.7;
        }
    }
    
    renderer.render(scene, cam);
    requestAnimationFrame(animate);
}
setTimeout(() => {
    initScene();
}, 5500);
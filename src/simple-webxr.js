import * as THREE from 'three';
import Ahivadh from "./models/gltf/Ahivadh/Ahivadh.gltf";
import Croc from "./models/gltf/Croc/croc.gltf";
import Narasimha from "./models/gltf/narasimha/narasimha.gltf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
const canvas = document.querySelector("#c");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.xr.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( VRButton.createButton( renderer ) );

// {
//     const planeSize = 50;

//     const loader = new THREE.TextureLoader();
//     const texture = loader.load(
//         "https://threejsfundamentals.org/threejs/resources/images/checker.png"
//     );
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.magFilter = THREE.NearestFilter;
//     const repeats = planeSize / 2;
//     texture.repeat.set(repeats, repeats);

//     const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
//     const planeMat = new THREE.MeshPhongMaterial({
//         map: texture,
//         side: THREE.DoubleSide,
//     });
//     const mesh = new THREE.Mesh(planeGeo, planeMat);
//     mesh.rotation.x = Math.PI * -0.5;
//     mesh.position.y = -0.065;

//     scene.add(mesh);
// }

const skyColor = 0xb1e1ff; // light blue
const groundColor = 0xb97a20; // brownish orange
const intensity = 1;
const hemisphereLight = new THREE.HemisphereLight(
                            skyColor,
                            groundColor,
                            intensity
                        );
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 10, -5);
scene.add(pointLight);

const gltfLoader = new GLTFLoader();
// let ahivadh;
// gltfLoader.load(Ahivadh, (gltf) => {
//     ahivadh = gltf.scene;
//     ahivadh.scale.set(50,50,50);
//     ahivadh.position.z = -2;
//     ahivadh.position.y = 1.5;

//     scene.add(ahivadh);
// });

// let croc;
// gltfLoader.load(Croc, (gltf) => {
//     croc = gltf.scene;
//     croc.scale.set(5,5,5);
//     croc.position.z = -2;
//     croc.position.y = 0.2;

//     scene.add(croc);
// });


let narasimha;
gltfLoader.load(Narasimha, (gltf) => {
    const scale = 6;
    narasimha = gltf.scene;
    narasimha.scale.set(scale,scale,scale);
    narasimha.position.z = -1;
    narasimha.position.y = -1;

    scene.add(narasimha);
});


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 2, 6 );

renderer.setAnimationLoop( function () {
    // ahivadh.rotation.y += 0.002;
    // croc.rotation.y += 0.002;
    narasimha.rotation.y += 0.002;
	renderer.render( scene, camera );
});

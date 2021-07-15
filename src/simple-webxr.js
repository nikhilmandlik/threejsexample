import * as THREE from 'three';
import Ahivadh from "./models/gltf/Ahivadh/Ahivadh.gltf";
import Croc from "./models/gltf/Croc/croc.gltf";
import Narasimha from "./models/gltf/narasimha/narasimha.gltf";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x999999);
const canvas = document.querySelector("#container");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.xr.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(VRButton.createButton(renderer));

// Lights
// HemisphereLight
const skyColor = 0xb1e1ff; // light blue
const groundColor = 0xb97a20; // brownish orange
const intensity = 1;
const hemisphereLight = new THREE.HemisphereLight(
    skyColor,
    groundColor,
    intensity
);
scene.add(hemisphereLight);

// PointLight
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 10, -5);
scene.add(pointLight);

// Load Models using GLTFLoader
const gltfLoader = new GLTFLoader();
// let ahivadh;
// gltfLoader.load(Ahivadh, (gltf) => {
//     ahivadh = gltf.scene;
//     ahivadh.name = 'ahivadh';
//     ahivadh.scale.set(50,50,50);
//     ahivadh.position.z = -2;
//     ahivadh.position.y = 1.5;

//     scene.add(ahivadh);
// });

let croc;
gltfLoader.load(Croc, (gltf) => {
    croc = gltf.scene;
    croc.name = 'croc';
    croc.scale.set(5,5,5);
    croc.position.z = -2;
    croc.position.y = 0.2;

    scene.add(croc);
});

// let narasimha;
// gltfLoader.load(Narasimha, (gltf) => {
//     const scale = 6;
//     narasimha = gltf.scene;
//     narasimha.name = 'narasimha';
//     narasimha.scale.set(scale,scale,scale);
//     narasimha.position.z = -1;
//     narasimha.position.y = -1;

//     scene.add(narasimha);
// });


// Add Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

// OrbitControls for non VR mode
const controls = new OrbitControls(camera, canvas);
controls.update();

// Animate
renderer.setAnimationLoop(function () {
    const ahivadh = scene.getObjectByName('ahivadh');
    if (ahivadh) {
        ahivadh.rotation.y += 0.002;
    }

    const croc = scene.getObjectByName('croc');
    if (croc) {
        croc.rotation.y += 0.002;
    }

    const narasimha = scene.getObjectByName('narasimha');
    if (narasimha) {
        narasimha.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
});

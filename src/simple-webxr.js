import * as THREE from 'three';
import Ahivadh from "./models/gltf/Ahivadh/Ahivadh.gltf";
import Croc from "./models/gltf/Croc/croc.gltf";
import Narasimha from "./models/gltf/narasimha/narasimha.gltf";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

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

// Add Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// OrbitControls for non VR mode
const controls = new OrbitControls(camera, canvas);

// Load Models using GLTFLoader
const gltfLoader = new GLTFLoader();

let ahivadh;

const loading = document.createElement('div');
loading.classList.add('loading-text');
loading.textContent = 'Loading Model...';

gltfLoader.load(Ahivadh,
    (gltf) => {
        loading.remove();
        ahivadh = gltf.scene;
        ahivadh.name = 'ahivadh';
        ahivadh.scale.set(50,50,50);
        ahivadh.position.z = -2;
        ahivadh.position.y = 1.5;

        camera.position.set(0, 0, 6);
        controls.target.set(0, 0, -2);
        controls.update();

        scene.add(ahivadh);
    },
    (xhr) => {
        document.body.append(loading);
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        loading.remove();
        console.log('An error happened');
    }
);

// let croc;
// gltfLoader.load(Croc,
//     (gltf) => {
//         loading.remove();
//         croc = gltf.scene;
//         croc.name = 'croc';
//         croc.scale.set(5,5,5);
//         croc.position.z = -3;
//         croc.position.y = 0.2;

//         camera.position.set(0, 2, 3);
//         controls.target.set(0, 1, -3);
//         controls.update();

//         scene.add(croc);
//     },
//     (xhr) => {
//         document.body.append(loading);
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     },
//     (error) => {
//         loading.remove();
//         console.log('An error happened');
//     }
// );

// let narasimha;
// gltfLoader.load(Narasimha,
//     (gltf) => {
//         loading.remove();
//         const scale = 6;
//         narasimha = gltf.scene;
//         narasimha.name = 'narasimha';
//         narasimha.scale.set(scale,scale,scale);
//         narasimha.position.z = -1;
//         narasimha.position.y = -1;

//         camera.position.set(0, 2, 3);
//         controls.target.set(0, 0.5, -1);
//         controls.update();

//         scene.add(narasimha);
//     },
//     (xhr) => {
//         document.body.append(loading);
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     },
//     (error) => {
//         loading.remove();
//         console.log('An error happened');
//     }
// );

// Show VR controllers
const controller1 = renderer.xr.getController(0);
controller1.addEventListener('selectstart', onSelectStart1);
// controller1.addEventListener('selectend', onSelectEnd1);
scene.add(controller1);

const controller2 = renderer.xr.getController(1);
controller2.addEventListener('selectstart', onSelectStart2);
// controller2.addEventListener('selectend', onSelectEnd2);
scene.add(controller2);

const controllerModelFactory = new XRControllerModelFactory();

const controllerGrip1 = renderer.xr.getControllerGrip(0);
controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
scene.add(controllerGrip1);

const controllerGrip2 = renderer.xr.getControllerGrip(1);
controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
scene.add(controllerGrip2);

// Animate
renderer.setAnimationLoop(function () {
    const ahivadh = scene.getObjectByName('ahivadh');
    if (ahivadh && play) {
        ahivadh.rotation.y += 0.002;
    }

    const croc = scene.getObjectByName('croc');
    if (croc && play) {
        croc.rotation.y += 0.002;
    }

    const narasimha = scene.getObjectByName('narasimha');
    if (narasimha && play) {
        narasimha.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
});

let play = true;
let vrCamera;
function onSelectStart1(event) {
    play = !play;
}

function onSelectStart2(event) {
    play = !play;
}
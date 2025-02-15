import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PencilLinesPass } from './PencilLinesPass'

const scene = new THREE.Scene()
const camera: THREE.Camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 10),
	new THREE.MeshStandardMaterial({ color: 0xffffff })
)
plane.rotation.x = -Math.PI / 2
plane.position.y = -0.75
plane.receiveShadow = true
scene.add(plane)

camera.position.z = 5
camera.position.y = 2

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.position.set(2, 2, 2)
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0x7a3114, 0x48c3ff, 0.5)
scene.add(hemisphereLight)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#eee')
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1.75
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
const pencilLinePass = new PencilLinesPass({
	width: renderer.domElement.clientWidth,
	height: renderer.domElement.clientHeight, scene, camera
})

composer.addPass(renderPass)
composer.addPass(pencilLinePass)

const controls = new OrbitControls(camera, renderer.domElement)


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  controls.update()
	composer.render()
}

animate()

import * as THREE  from 'three';
import * as dat from 'dat.gui'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';

const gui = new dat.GUI()

//scene
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//geometry
const geometry = new THREE.SphereGeometry(21,64,64);
const material = new THREE.MeshStandardMaterial( { color: '#00ff83', roughness:0.2, } );

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//lights
const light = new THREE.DirectionalLight( 0xffffff, 1, );
light.position.x = 50 
light.position.y = 150
light.position.z = 10
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0
camera.position.y = 0
camera.position.z = 100
scene.add(camera);



//render
const canvas = document.querySelector('canvas.webgl');
const renderer = new THREE.WebGLRenderer({canvas : canvas});
// renderer.setSize(800,600);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene,camera);

//resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

const tick = () =>
{

    // const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
const t1 = gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1} )
t1.fromTo('nav', {y:"-100%"},{y:"0%"} )
t1.fromTo('.title', {opacity:0},{opacity:1})

//mouse animations

let mouseDown = false
let rgb = []

window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [Math.round((e.pageX / sizes.width)*255),Math.round((e.pageY / sizes.height)*255),150]
    let nColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r:nColor.r, g:nColor.g, b:nColor.b,})
  }
})
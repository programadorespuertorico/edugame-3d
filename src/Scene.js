import React, { Component } from 'react'
import  ReactTouchEvents from "react-touch-events";
import  TrackballControls from "three-trackballcontrols";
import OrbitControls from 'three-orbitcontrols'
 
import { connect } from 'react-redux';
import { moveRight } from './actions'
import * as THREE from 'three'

const mapState = state => {
  return {
    posX: state.cube.posX
  };
};

const mapDispatch = dispatch => ({
  moveRight: (payload) => dispatch(moveRight(payload))
});

class _scene extends Component {
	constructor(props) {
		super(props)

			this.start = this.start.bind(this)
			this.stop = this.stop.bind(this)
			this.animate = this.animate.bind(this)
			this._createCube = this._createCube.bind(this)
			this.drawSphere = this.drawSphere.bind(this)
	}

	componentDidMount() {
		//const width = this.mount.clientWidth
		//	const height = this.mount.clientHeight
		const width = window.innerWidth
			const height = window.innerHeight

			const scene = new THREE.Scene()
			/*const camera = new THREE.PerspectiveCamera(
					75,
					width / height,
					0.1,
					1000
					)*/
  			const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const renderer = new THREE.WebGLRenderer({ antialias: true })
			const geometry = new THREE.BoxGeometry(1, 1, 1)
                        const geometryColor = new THREE.BoxGeometry(100, 100, 100);
			const material = new THREE.MeshBasicMaterial({ color: '#34A497' })

			  const materialColor = new THREE.MeshBasicMaterial({
			    color: 0xffffff,
			    vertexColors: THREE.FaceColors
			  });

			const cube = this._createCube(geometry, material)
			const ball = this.drawSphere()	

//
  
  const red = new THREE.Color(1, 0, 0);
  const green = new THREE.Color(0, 1, 0);
  const blue = new THREE.Color(0, 0, 1);
  const colors = [red, green, blue];
  
  for (let i = 0; i < 3; i++) {
    geometryColor.faces[4 * i].color = colors[i];
    geometryColor.faces[4 * i + 1].color = colors[i];
    geometryColor.faces[4 * i + 2].color = colors[i];
    geometryColor.faces[4 * i + 3].color = colors[i];
  }

			const box = this._createCube(geometryColor, materialColor)
//

			camera.position.z = 1000
//  camera.position.set(0, 0, 1000);
			//scene.add(cube)
			const ambient = new THREE.AmbientLight( 0x101030 );
				scene.add( ambient );
			scene.add(box)
			scene.add(ball)
			renderer.setClearColor('#000000')
			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(width, height)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = false
			/*const controls = new TrackballControls(camera, renderer.domElement)
controls.rotateSpeed = 2.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
controls.noPan = false;

				controls.staticMoving = false;
				controls.dynamicDampingFactor = 0.3;*/
			this.controls = controls	
			this.scene = scene
			this.camera = camera
			this.renderer = renderer
			this.material = material
			this.cube = cube
			this.materialColor = materialColor
			this.box = box
			this.ball = ball

			this.mount.appendChild(this.renderer.domElement)
			this.start()
	}

	componentWillUnmount() {
		this.stop()
			this.mount.removeChild(this.renderer.domElement)
	}

	start() {
//		alert(this.props.posX)
		if (!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate)
		}
	}

	stop() {
		cancelAnimationFrame(this.frameId)
	}

	animate() {
		this.cube.rotation.x = this.props.posX
			this.cube.rotation.y += 0.01
			this.box.rotateY += 0.01
			this.box.rotation.x = Math.PI / 2;

			this.renderScene()
			this.frameId = window.requestAnimationFrame(this.animate)
			this.controls.update()
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera)
	}
	handleTap () {
    
		this.props.moveRight(0.1)
    
    }
	handleSwipe (direction) {
	    
		switch (direction) {
		    case "top":
		    case "bottom":
		    case "left":
		    case "right":
		    
		//	alert(`you swiped ${direction}`)
		
		}
	    }
	drawSphere(){
		const sphereMaterial =
		  new THREE.MeshLambertMaterial(
		    {
		      color: 0xCC0000
		    });
		
		
		// Set up the sphere vars
		const RADIUS = 50;
		const SEGMENTS = 16;
		const RINGS = 16;

		// Create a new mesh with
		// sphere geometry - we will cover
		// the sphereMaterial next!
		const sphere = new THREE.Mesh(

		  new THREE.SphereGeometry(
		    RADIUS,
		    SEGMENTS,
		    RINGS),

		  sphereMaterial);

		// Move the Sphere back in Z so we
		// can see it.
		sphere.position.z = -300;

		// Finally, add the sphere to the scene.
		return sphere
	}
 

            //onSwipe={ this.handleSwipe.bind(this) }
	render() {
		return (
				<div
				ref={(mount) => { this.mount = mount }}
				/>
		)
		/*return (
				<ReactTouchEvents
            onTap={ this.handleTap.bind(this) }
            onSwipe={ this.handleSwipe.bind(this) }
            >
				<div
				ref={(mount) => { this.mount = mount }}
				/>
		</ReactTouchEvents>
		       )*/
	}
	_createCube(geometry, material) {
			const cube = new THREE.Mesh(geometry, material)
			return cube

        }
}

const Scene = connect(mapState, mapDispatch)(_scene)
export default Scene

/*
// three.js shape to line

var renderer, scene, camera;

var line;
var MAX_POINTS = 500;
var drawCount;
var value = 1;
var delta = -0.01;

init();
animate();

function init() {

  // info
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '30px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.style.color = '#fff';
  info.style.fontWeight = 'bold';
  info.style.backgroundColor = 'transparent';
  info.style.zIndex = '1';
  info.style.fontFamily = 'Monospace';
  info.innerHTML = "three.js - change colors of faces";
  document.body.appendChild(info);

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 100, 500);

  // material
  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors
  });

  // geometry
  geometry = new THREE.BoxGeometry(100, 100, 100);

  // colors
  red = new THREE.Color(1, 0, 0);
  green = new THREE.Color(0, 1, 0);
  blue = new THREE.Color(0, 0, 1);
  var colors = [red, green, blue];
  
  for (var i = 0; i < 3; i++) {
    geometry.faces[4 * i].color = colors[i];
    geometry.faces[4 * i + 1].color = colors[i];
    geometry.faces[4 * i + 2].color = colors[i];
    geometry.faces[4 * i + 3].color = colors[i];
  }

  // mesh
  box = new THREE.Mesh(geometry, material);
  scene.add(box);
}

// render
function render() {
  renderer.render(scene, camera);
}

function animateBox() {
  angle = 0.02;
  box.rotateY(angle);
}

function changeFaceColors() {
  if (value <= 0) {
    delta = 0.01;
  }
  else if(value >= 1) {
    delta = -0.01;
  }
  red.r = green.g = blue.b = value += delta;
  geometry.colorsNeedUpdate = true;
}

// animate
function animate() {
  animateBox();
  changeFaceColors();
  requestAnimationFrame(animate);
  render();
}
*/

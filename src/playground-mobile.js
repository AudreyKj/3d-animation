import React, { Component } from "react";
import * as THREE from "three";
//import * as Physijs from "physijs-webpack/webpack";
import DragControls from "three-dragcontrols";
import "./App.css";

export default class PlaygroundMobile extends Component {
  componentDidMount() {
    this.setUp();
    this.addObjects();
    this.animation();
    this.updateDimensions();
    this.generateTexture();

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
  }

  setUp = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //scene
    // this.scene = new Physijs.Scene();
    // this.scene.setGravity(new THREE.Vector3(0, -30, 0));

    this.scene = new THREE.Scene();

    //camera
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.set(
      10.50606167271692,
      -83.64728895415534,
      9.630873208028522
    );

    this.camera.rotation.x = 1.456164381734687;
    this.camera.rotation.y = -20;
    this.camera.rotation.z = -0.8217009061000422;

    this.camera.lookAt(this.scene.position);

    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;

    this.scene.add(this.camera);

    //renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    this.renderer.setClearColor(0xffffff, 0);
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.mount.appendChild(this.renderer.domElement);
  };

  addObjects = () => {
    //lights
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    const Ambientlight = new THREE.AmbientLight(0x404040);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
    this.scene.add(Ambientlight);

    //Ground Plane
    const groundPlaneGeo = new THREE.PlaneGeometry(1000, 1000, 20, 20);
    const groundMat = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0
    });

    const groundPlane = new THREE.Mesh(groundPlaneGeo, groundMat);

    groundPlane.visible = false;

    // const physMat = Physijs.createMaterial(groundMat);
    // const physMesh = new Physijs.BoxMesh(groundPlane, physMat, 0);
    groundPlane.position.y = 12;
    groundPlane.rotation.x = -0.5 * Math.PI;
    this.scene.add(groundPlane);

    //boxes
    const boxes = [];

    //initial planes
    const addBox = () => {
      const cubeGeometry = new THREE.BoxGeometry(0.1, 7, 7);

      //gradient texture
      const texture = new THREE.Texture(this.generateTexture());
      texture.needsUpdate = true;

      // material
      const cubeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });

      //const box_material = Physijs.createMaterial(cubeMaterial, 0.5, 0.9);

      //const box = new Physijs.BoxMesh(cubeGeometry, box_material, 10);

      const box = new THREE.Mesh(cubeGeometry, cubeMaterial);

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }

      box.name = "box";
      box.position.x = getRandomInt(0, 44) - 20;
      box.position.y = getRandomInt(12, 70) + 17;
      box.position.z = Math.random() * 10 - 10;

      box.rotation.z = Math.PI / 2;

      this.scene.add(box);
      boxes.push(box);
    };

    addBox();
    addBox();
    addBox();
    addBox();

    addBox();
    addBox();
    addBox();
    addBox();

    const addBox2 = () => {
      const cubeGeometry2 = new THREE.BoxGeometry(0.1, 7, 7);

      //gradient texture
      const texture2 = new THREE.Texture(this.generateTexture());
      texture2.needsUpdate = true;

      // material
      const cubeMaterial2 = new THREE.MeshBasicMaterial({
        map: texture2,
        transparent: true,
        opacity: 0.8
      });

      //const box_material2 = Physijs.createMaterial(cubeMaterial2, 1, 0.9);

      //const box2 = new Physijs.BoxMesh(cubeGeometry2, box_material2, 10);

      const box2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        min += 5;
        max += 5;
        return Math.floor(Math.random() * (max - min)) + min;
      }

      box2.name = "box2";
      box2.position.x = getRandomInt(-35, 0);
      box2.position.y = getRandomInt(12, 50);
      box2.position.z = getRandomInt(-1, 10);

      box2.rotation.z = Math.PI / 2;

      this.scene.add(box2);
      boxes.push(box2);
    };

    addBox2();
    addBox2();
    addBox2();
    addBox2();
    addBox2();
    addBox2();

    // FRICTION PLANES
    // const addBoxFriction = () => {
    //   const cubeGeometryFriction = new THREE.BoxGeometry(0.1, 7, 7);
    //
    //   //gradient texture
    //   const texture3 = new THREE.Texture(this.generateTexture());
    //   const textureImage3 = texture3.image;
    //   texture3.needsUpdate = true;
    //
    //   // material
    //   const cubeMaterialFriction = new THREE.MeshBasicMaterial({
    //     map: texture3,
    //     overdraw: 0.5,
    //     transparent: true,
    //     opacity: 0.8
    //   });
    //
    //   const boxFriction = new THREE.Mesh(
    //     cubeGeometryFriction,
    //     cubeMaterialFriction
    //   );
    //
    //   function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min)) + min;
    //   }
    //
    //   boxFriction.name = "box";
    //   boxFriction.position.x = getRandomInt(0, 44) - 10;
    //   boxFriction.position.y = getRandomInt(12, 70) + 15;
    //   boxFriction.position.z = Math.random() * 10 - 5;
    //
    //   boxFriction.rotation.z = Math.PI / 2;
    //
    //   this.scene.add(boxFriction);
    //   boxes.push(boxFriction);
    // };
    //
    // addBoxFriction();
    // addBoxFriction();
    // addBoxFriction();
    // // addBoxFriction();
    // // addBoxFriction();
    // // addBoxFriction();

    var dragControls = new DragControls(
      boxes,
      this.camera,
      this.renderer.domElement
    );

    dragControls.addEventListener("dragstart", function(e) {});

    dragControls.addEventListener("drag", function(e) {});

    dragControls.addEventListener("dragend", function(e) {
      console.log("e.object.position - drag", e.object.position);
    });
  };

  animation = () => {
    //this.scene.simulate();
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.animation);
  };

  generateTexture = () => {
    const size = 512;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");

    //gradient
    context.rect(0, 0, size, size);
    const gradient = context.createLinearGradient(0, 0, size, size);

    gradient.addColorStop(0, "#548DAD"); //blue
    gradient.addColorStop(0.5, "#ffffff"); // white
    gradient.addColorStop(1, "#548DAD"); // blue

    context.fillStyle = gradient;
    context.fill();

    return canvas;
  };

  handleWindowResize = () => {
    if (this.mount !== null) {
      const width = this.mount.clientWidth;
      const height = this.mount.clientHeight;

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;

      this.camera.updateProjectionMatrix();
    }
  };

  updateDimensions = () => {
    if (this.mount !== null) {
      this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
      this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.render(this.scene, this.camera);
    }
  };

  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vw" }}
        id="boardCanvas2"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

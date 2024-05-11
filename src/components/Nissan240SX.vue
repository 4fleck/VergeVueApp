n<template>
    <div :id="containerId">
      <div
        :id="fsButtonId"
        class="fullscreen-button fullscreen-open"
        title="Toggle fullscreen mode"
      ></div>
    </div>
  </template>
  
  <script>
  import { createApp } from '../v3dApp/app';
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    name: 'Nissan240',
  
    created() {
      this.app = null;
      this.PL = null,
  
      this.uuid = uuidv4() ; //uuidv4() window.crypto.randomUUID()
      this.containerId = `v3d-container-${this.uuid}`;
      this.fsButtonId = `fullscreen-button-${this.uuid}`;
      this.sceneURL = '240SX/240SX.gltf';
  
      this.loadApp = async function() {
        ({ app: this.app, PL: this.PL } = await createApp({
          containerId: this.containerId,
          fsButtonId: this.fsButtonId,
          sceneURL: this.sceneURL,
        }));
      }
  
      this.disposeApp = function() {
        this.app?.dispose();
        this.app = null;
  
        // dispose Puzzles' visual logic
        this.PL?.dispose();
        this.PL = null;
      }
  
      this.reloadApp = function() {
        this.disposeApp();
        this.loadApp();
      }
    },
  
    mounted() {
      this.loadApp();
    },
  
    beforeUnmount() {
      this.disposeApp();
    },
  }
  </script>
  
  <style>
  @import '../v3dApp/app.css';
  </style>
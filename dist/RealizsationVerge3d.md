# Verge3D
***
Verge3D — это игровой движок, предназначенный для создания интерактивного 3D-контента с помощью WebGL и JavaScript. Verge3D предлагает широкий спектр возможностей для разработки 3D-приложений и игр, включая создание сложных 3D-интерфейсов без программирования, поддержку экспорта из различных 3D-программ (Blender, Maya, 3ds Max и SketchUp), встроенную поддержку PBR (Physically Based Rendering) для реалистичного рендеринга, интеграцию с NVIDIA PhysX для физического взаимодействия между объектами, работу с аудиобиблиотекой Web Audio API для создания звуковых эффектов и многое другое.

Verge3D предоставляет удобный и мощный инструментарий для разработчиков, позволяющий создавать впечатляющие 3D-опыты прямо в браузере. Он идеально подходит для проектов, требующих интерактивности и визуальной привлекательности, таких как симуляторы, обучающие приложения, архитектурные визуализации и даже игры.


 #### Verge3D обладает рядом преимуществ перед другими игровыми движками:

- Позволяет создавать сложные 3D-интерфейсы без программирования.

- Поддерживает экспорт из Blender, Maya, 3ds Max и SketchUp.

- Имеет встроенную поддержку PBR (Physically Based Rendering) для реалистичного рендеринга.

- Поддерживает NVIDIA PhysX для физического взаимодействия между объектами.

- Может работать с аудиобиблиотекой Web Audio API для создания звуковых эффектов.

- Позволяет интегрировать 3D-контент в веб-страницы и приложения.

## Код APP.js рендер 3d 

```
/* eslint-disable */

import * as v3d from 'verge3d';
import { createPL } from './visual_logic.js';

/**
 * @param {Object} options App initialization options.
 * @param {String|HTMLElement} options.containerId The id of the app's container
 * element or the element itself.
 * @param {?String} [options.fsButtonId=null] The id of the app's
 * fullscreen button. Drop this parameter to disable fullscreen functionality.
 * @param {!String} options.sceneURL URL of a .gltf scene to load.
 * @return {Object} Object containing the newly created app and the loaded
 * puzzles logic.
 */
async function createApp({ containerId, fsButtonId = null, sceneURL }) {
    // some puzzles can benefit from cache
    v3d.Cache.enabled = true;

    /**
     * Support of the Puzzles Editor is limited and done indirectly. See:
     * https://www.soft8soft.com/docs/manual/en/programmers_guide/Integration-with-Reactjs-Vuejs.html#using_the_puzzles_editor
     */
    const PE = null;

    let PL = null;

    // comment the following lines to disable the puzzles logic
    PL = createPL(v3d);
    await PL?.loadPhysics?.();

    let initOptions = { useFullscreen: true };
    if (PL) {
        initOptions = PL.execInitPuzzles({ container: containerId }).initOptions;
    }
    sceneURL = initOptions.useCompAssets ? `${sceneURL}.xz` : sceneURL;

    const disposeFullscreen = prepareFullscreen(containerId, fsButtonId,
            initOptions.useFullscreen);
    const preloader = createPreloader(containerId, initOptions, PE);

    const app = createAppInstance(containerId, initOptions, preloader, PE);
    app.addEventListener('dispose', () => disposeFullscreen?.());

    if (initOptions.preloaderStartCb) initOptions.preloaderStartCb();
    app.loadScene(sceneURL, () => {
        app.enableControls();
        app.run();

        if (PE) PE.updateAppInstance(app);
        if (PL) PL.init(app, initOptions);

        runCode(app, PL);
    }, null, () => {
        console.log(`Can't load the scene ${sceneURL}`);
    });

    return { app, PL };
}


function createPreloader(containerId, initOptions, PE) {
    const preloader = initOptions.useCustomPreloader
            ? createCustomPreloader(initOptions.preloaderProgressCb,
            initOptions.preloaderEndCb)
            : new v3d.SimplePreloader({ container: containerId });

    if (PE) puzzlesEditorPreparePreloader(preloader, PE);

    return preloader;
}

function createCustomPreloader(updateCb, finishCb) {
    function CustomPreloader() {
        v3d.Preloader.call(this);
    }

    CustomPreloader.prototype = Object.assign(Object.create(v3d.Preloader.prototype), {
        onUpdate: function(percentage) {
            v3d.Preloader.prototype.onUpdate.call(this, percentage);
            if (updateCb) updateCb(percentage);
        },
        onFinish: function() {
            v3d.Preloader.prototype.onFinish.call(this);
            if (finishCb) finishCb();
        }
    });

    return new CustomPreloader();
}

/**
 * Modify the app's preloader to track the loading process in the Puzzles Editor.
 */
function puzzlesEditorPreparePreloader(preloader, PE) {
    const _onUpdate = preloader.onUpdate.bind(preloader);
    preloader.onUpdate = function(percentage) {
        _onUpdate(percentage);
        PE.loadingUpdateCb(percentage);
    }

    const _onFinish = preloader.onFinish.bind(preloader);
    preloader.onFinish = function() {
        _onFinish();
        PE.loadingFinishCb();
    }
}


function createAppInstance(containerId, initOptions, preloader, PE) {
    const ctxSettings = {};
    if (initOptions.useBkgTransp) ctxSettings.alpha = true;
    if (initOptions.preserveDrawBuf) ctxSettings.preserveDrawingBuffer = true;

    const app = new v3d.App(containerId, ctxSettings, preloader);
    if (initOptions.useBkgTransp) {
        app.clearBkgOnLoad = true;
        if (app.renderer) {
            app.renderer.setClearColor(0x000000, 0);
        }
    }

    // namespace for communicating with code generated by Puzzles
    app.ExternalInterface = {};
    prepareExternalInterface(app);
    if (PE) PE.viewportUseAppInstance(app);

    return app;
}


function prepareFullscreen(containerId, fsButtonId, useFullscreen) {
    const container = document.getElementById(containerId);
    const fsButton = document.getElementById(fsButtonId);

    if (!fsButton) {
        return null;
    }
    if (!useFullscreen) {
        if (fsButton) fsButton.style.display = 'none';
        return null;
    }

    const fsEnabled = () => document.fullscreenEnabled
            || document.webkitFullscreenEnabled
            || document.mozFullScreenEnabled
            || document.msFullscreenEnabled;
    const fsElement = () => document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullScreenElement
            || document.msFullscreenElement;
    const requestFs = elem => (elem.requestFullscreen
            || elem.mozRequestFullScreen
            || elem.webkitRequestFullscreen
            || elem.msRequestFullscreen).call(elem);
    const exitFs = () => (document.exitFullscreen
            || document.mozCancelFullScreen
            || document.webkitExitFullscreen
            || document.msExitFullscreen).call(document);
    const changeFs = () => {
        const elem = fsElement();
        fsButton.classList.add(elem ? 'fullscreen-close' : 'fullscreen-open');
        fsButton.classList.remove(elem ? 'fullscreen-open' : 'fullscreen-close');
    };

    function fsButtonClick(event) {
        event.stopPropagation();
        if (fsElement()) {
            exitFs();
        } else {
            requestFs(container);
        }
    }

    if (fsEnabled()) fsButton.style.display = 'inline';

    fsButton.addEventListener('click', fsButtonClick);
    document.addEventListener('webkitfullscreenchange', changeFs);
    document.addEventListener('mozfullscreenchange', changeFs);
    document.addEventListener('msfullscreenchange', changeFs);
    document.addEventListener('fullscreenchange', changeFs);

    const disposeFullscreen = () => {
        fsButton.removeEventListener('click', fsButtonClick);
        document.removeEventListener('webkitfullscreenchange', changeFs);
        document.removeEventListener('mozfullscreenchange', changeFs);
        document.removeEventListener('msfullscreenchange', changeFs);
        document.removeEventListener('fullscreenchange', changeFs);
    }

    return disposeFullscreen;
}


function prepareExternalInterface(app) {
    /**
     * Register functions in the app.ExternalInterface to call them from
     * Puzzles, e.g:
     * app.ExternalInterface.myJSFunction = function() {
     *     console.log('Hello, World!');
     * }
     */

}

function runCode(app, puzzles) {
    // add your code here, e.g. console.log('Hello, World!');

}

export { createApp };


```
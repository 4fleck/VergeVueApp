# Verge3D
***
Интеграция с React.js/Vue.js
Один из самых простых способов интегрировать сцену «Вердж3Д» в ваш проект это загрузить ее отдельно через элемент iframe. Но если вы хотите использовать ее непосредственно в своем приложении, то могут возникнуть некоторые трудности. Существует множество возможных конфигураций проекта со своими специфическими проблемами и особенностями. Данное руководство не может охватить их все и ориентировано только на такие популярные javascript-фреймворки, как React.js и Vue.js.

«Вердж3Д» предлагает пример того, как сделать простой проект "Hello, world!" на React или Vue и интегрировать в него стандартное приложение «Вердж3Д». Файлы примеров находятся в manager/templates/Embeddable внутри дистрибутива «Вердж3Д».

## Использование редактора пазлов

Пример приложения «Вердж3Д» на React.js
Вот простая инструкция о том, как создать базовое приложение React.js + «Вердж3Д» с помощью утилиты Create React App. Вы можете найти копию этой инструкции в manager/templates/Embeddable/README.md внутри дистрибутива «Вердж3Д».

1) Создайте приложение React.js с помощью утилиты Create React App:
npx create-react-app react_v3d_app
2) Удалите все файлы в директории react_v3d_app/src.

3) Скопируйте содержимое manager/templates/Embeddable/public из директории «Вердж3Д» в react_v3d_app/public.

Скопируйте содержимое manager/templates/Embeddable/src из директории «Вердж3Д» в react_v3d_app/src.

Скопируйте файл движка build/v3d.js в react_v3d_app/public.

4) Добавьте следующий тег скрипта в react_v3d_app/public/index.html.:

```
<script src="%PUBLIC_URL%/v3d.js"></script>
```

5) Создайте каталог components внутри react_v3d_app/src. Затем создайте файл react_v3d_app/src/components/V3DApp.js со следующим содержанием:

```
import React from 'react';

import * as v3dAppAPI from '../v3dApp/app.js';
import '../v3dApp/app.css';

class V3DApp extends React.Component {

    #app = null;

    componentDidMount() {
        v3dAppAPI.createApp().then(app => {
            this.#app = app;
        });
    }

    componentWillUnmount() {
        if (this.#app !== null) {
            this.#app.dispose();
            this.#app = null;
        }
    }

    render() {
        return <div id={v3dAppAPI.CONTAINER_ID}>
            <div id="fullscreen_button" className="fullscreen-button fullscreen-open" title="Toggle fullscreen mode"></div>
        </div>;
    }
}
export default V3DApp;

```

6) Создайте файл react_v3d_app/src/index.js, содержащий следующий код:

```
import React from 'react';
import ReactDOM from 'react-dom';

import V3DApp from './components/V3DApp.js';

ReactDOM.render(
    <V3DApp/>,
    document.getElementById('root')
);
```

7) Запустите сервер разработки, выполнив следующую команду в директории react_v3d_app:
npm startТеперь приложение должно быть доступно по адресу http://localhost:3000/ по умолчанию.


## Пример приложения «Verge3D» на Vue.js
Вот простая инструкция о том, как создать базовое приложение Vue.js + «Вердж3Д» с помощью утилиты Vue CLI. Вы можете найти копию этой инструкцию в manager/templates/Embeddable/README.md внутри дистрибутива «Вердж3Д».

1) Создайте приложение Vue.js с помощью утилиты Vue CLI:
npx @vue/cli create vue_v3d_app

2) Скопируйте содержимое manager/templates/Embeddable/public из директории «Вердж3Д» в vue_v3d_app/public.

Скопируйте содержимое manager/templates/Embeddable/src из директории «Вердж3Д» в vue_v3d_app/src.

Скопируйте файл движка build/v3d.js в vue_v3d_app/public.

3) Добавьте следующий тег скрипта в vue_v3d_app/public/index.html:

```
<script src="<%= BASE_URL %>v3d.js"></script>
```
4) Создайте файл vue_v3d_app/src/components/V3DApp.vue, содержащий следующий код:
=
```
<template>
    <div :id="containerId">
        <div id="fullscreen_button" class="fullscreen-button fullscreen-open" title="Toggle fullscreen mode"></div>
    </div>
</template>

<script>
import * as v3dAppAPI from '../v3dApp/app.js';

export default {
    name: 'V3DApp',

    data() {
        return {
            containerId: v3dAppAPI.CONTAINER_ID,
        }
    },

    app: null,

    mounted() {
        v3dAppAPI.createApp().then(app => {
            this.$options.app = app;
        });
    },

    beforeDestroy() {
        if (this.$options.app) {
            this.$options.app.dispose();
            this.$options.app = null;
        }
    },
}
</script>

<style>
@import '../v3dApp/app.css';
</style>

```

Функция beforeDestroy() устарела в Vue.js 3.0.0+, вместо нее используйте beforeUnmount().
Подробнее: https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html

5) Измените vue_v3d_app/src/App.vue так, чтобы он выглядел следующим образом:

```
<template>
    <V3DApp></V3DApp>
</template>

<script>
import V3DApp from './components/V3DApp.vue';

export default {
  name: 'App',
  components: {
    V3DApp
  }
}
</script>
```

6) Запустите сервер разработки, выполнив следующую команду в каталоге vue_v3d_app:
npm run serveТеперь приложение должно быть доступно по адресу http://localhost:8080/ по умолчанию.

#

Использование редактора пазлов
Нет прямой интеграции между React/Vue и Редактором Пазлов/ Менеджером приложения. Тем не менее, вы по-прежнему можете использовать пазлы для добавления сценариев поведения в ваши React/Vue-приложения. В этом разделе объясняется, как это сделать и каковы ограничения данного подхода.

Менеджер приложений не знает, как может выглядеть структура каталогов типичного проекта React/Vue. Однако после некоторой настройки менеджер может, по крайней мере, распознать blend-файлы проекта, экспортированные .gltf/.glb/.bin файлы сцен и скрипты визуальной логики пазлов. Это означает, что вы можете просматривать соответствующие ресурсы сцены и запускать редактор пазлов из веб-страницы Менеджера приложений.

Недостатком здесь является то, что просмотр файлов .gltf и работа с пазлами может осуществляться только через «Вердж3Д Плеер», т.е. так же, как и для всех стандартных приложений «Вердж3Д» созданных внутри Менеджера приложений. Таким образом, нет доступа к React/Vue функциям, компонентам, логике и т.д... и пазлы могут быть добавлены только отдельным образом. Тем не менее, полноценное приложение React/Vue может загружаться, запускаться и взаимодействовать с логическим сценарием, созданным в редакторе пазлов.

Настройка менеджера приложений
Предположим, у нас есть приложение React или Vue, созданное в соответствии с руководством, описанным в этом справочнике. Предположим, что оно расположено в пути APP_PATH, а ваш дистрибутив «Вердж3Д» расположен в пути VERGE3D_PATH.

Для того чтобы "соединить" App Manager и проект React/Vue, нам необходимо создать специальный каталог внутри VERGE3D_PATH/applications (место, где обычно находятся все приложения «Вердж3Д»). Мы создадим его как символическую ссылку, указывающую на APP_PATH/public/v3dApp - это и есть место внутри нашего проекта React/Vue, где находятся связанные с verge3d сценой ресурсы и логические файлы пазла. Давайте назовем новую директорию my_app. Вот как это можно сделать:

на Линукс

```
ln -sr APP_PATH/public/v3dApp VERGE3D_PATH/applications/my_app
```

на Виндоус (PowerShell, требуются права администратора)
```
cmd /c mklink /D VERGE3D_PATH\applications\my_app (Resolve-Path APP_PATH\public\v3dApp)
```
После этого остается только открыть файл ***APP_PATH/src/v3dApp/app.js***, затем найти следующую строку:

```
var LOAD_LOGIC_FILES = false;
```

и измените ее следующим образом, чтобы включить загрузку логического скрипта пазла:

```
var LOAD_LOGIC_FILES = true;
```

Теперь вы можете увидеть свой проект в диспетчере приложений. Вы можете открыть его ***.gltf*** и ***.blend*** файлы и использовать редактор пазлов.


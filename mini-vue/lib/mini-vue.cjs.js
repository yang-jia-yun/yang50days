'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createComponentInstance(vnode) {
    const instance = {
        vnode,
        type: vnode.type,
    };
    return instance;
}
function setupComponent(instance) {
    // TODO 初始化 props
    // initProps(instance)
    // TODO 初始化 state
    // initSlots(instance)
    // 初始化有状态的component
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.vnode.type;
    const { setup } = Component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // 判断 setup 的类型
    // TODO function
    // object ，曾直接将 内容挂在到组件实例 上
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    // 保证 component 是有状态的（函数组件待处理）
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    //TODO 为何 Component 为 type ？
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

function render(vnode, container) {
    // 执行 patch, 打补丁
    patch(vnode);
}
function patch(vnode, container) {
    // 处理 component
    processComponent(vnode);
}
function processComponent(vnode, container) {
    // 挂载 component
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    patch(subTree);
}

function createVnode(type, props, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先转换未 vnode
            // 再基于 vnode 进行后续操作
            const vnode = createVnode(rootComponent);
            render(vnode);
        }
    };
}

function h(type, props, children) {
    return createVnode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;

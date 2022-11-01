import { IpcEvent } from './ipc-event';
import { ipcMainManager } from './ipc';
// 在上下文隔离启用的情况下使用预加载
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('event', {
    send: (event: IpcEvent) => ipcMainManager.send(event)
})
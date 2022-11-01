import { ipcMain, ipcRenderer } from 'electron'
import EventEmitter from 'events'
import { IpcEvent } from './ipc-event'


class IpcMainManager extends EventEmitter {
  constructor() {
    super()
  }
  public send(event: IpcEvent) {
    ipcRenderer.invoke('render-event', event)
  }

  public handle() {
    ipcMain.handle('render-event', async (event: Electron.IpcMainInvokeEvent, arg: any) => {
      if (arg instanceof IpcEvent) {
        return handleRenderEvent(arg as IpcEvent)
      } else {
        console.log('事件类型错误:' + JSON.stringify(arg));
      }
    })
  }

}

export const ipcMainManager = new IpcMainManager()

//render事件分发
async function handleRenderEvent(event: IpcEvent) {

}
import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: string, ...data: any[]) => {
    ipcRenderer.send(channel, ...data);
    ipcRenderer.send("game/new_event", { e: channel, data });
  },
  invoke: (channel: string, ...data: any[]) =>
    ipcRenderer.invoke(channel, ...data),
  on: (channel: string, func: any) =>
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
  handle: (channel: string, func: any) =>
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
  remove: (channel: string, func: any) =>
    ipcRenderer.removeListener(channel, func),
  removeAllListeners: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
});

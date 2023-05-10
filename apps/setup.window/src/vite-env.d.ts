/// <reference types="vite/client" />

interface Window {
    ipcRenderer: {
      send(channel: string, ...data: any[]): any;
      invoke(channel: string, ...data: any[]): Promise<any>;
      on(channel: string, data: any): void;
      handle(channel: string, data: any): void;
      remove(channel: string, data: any): void;
      removeAllListeners(channel: string): void;
    };
  }
  
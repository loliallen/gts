const ipcRenderer = window.ipcRenderer;

export const setupApi = {
  openGame: (url: string) => ipcRenderer.send("game/open", url),
  openSetup: (cb: (_: any, data: { e: string; data: any }) => void) => {
    ipcRenderer.on("window/setup", cb);
    return () => {
      ipcRenderer.removeAllListeners("window/setup");
    };
  },
};

export const gameListenerApi = {
  onNewEvent: (cb: (_: any, data: { e: string; data: any }) => void) => {
    ipcRenderer.on("game/new_event", cb);
    return () => {
      ipcRenderer.removeAllListeners("game/new_event");
    };
  },
  openGameList: (cb: (_: any, data: { e: string; data: any }) => void) => {
    ipcRenderer.on("window/game_events", cb);
    return () => {
      ipcRenderer.removeAllListeners("window/game_events");
    };
  },
};

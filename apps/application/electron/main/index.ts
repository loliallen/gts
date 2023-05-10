import { app, BrowserWindow, shell, ipcMain } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { MainWindow } from "./lib/main.window";
import { SetupWindow } from "./lib/setup.window";
import { GameWindow } from "./lib/game.window";

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const main = async () => {
  await app.whenReady();
  const setupWindow = SetupWindow.create();
  const mainWindow = MainWindow.create();
  const gameWindow = GameWindow.create();
  console.log(app.getAppPath())
  setupWindow.start();

  ipcMain.on("game/open", (e, data: string) => {
    mainWindow.start();
    gameWindow.start(data, {});
    setupWindow.window.close();
  });
  ipcMain.on("game/new_event", (e, data) => {
    mainWindow.window.webContents.send("game/new_event", data);
    // console.log("game/new_event", data);
  });

  gameWindow.window.on("close", () => {
    !mainWindow.window.isDestroyed() && mainWindow.window.close();
  });

  app.on("window-all-closed", () => {
    console.log('All windows closed')
    if (process.platform !== "darwin") app.quit();
  });
};

main();

// New window example arg: new windows url

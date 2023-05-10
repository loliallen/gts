import { BrowserWindow, app } from "electron";
import { join } from "path";
import { Window } from "./types";

export class SetupWindow extends Window {
  private constructor() {
    super({
      width: 300,
      height: 400,
      resizable: false,
      title: "Setup",
      titleBarStyle: "hidden",
      autoHideMenuBar: true,
      movable: true,
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
  }

  static create() {
    return new SetupWindow();
  }

  public start() {
    if (process.env.NODE_ENV !== "production") {
      // electron-vite-vue#298
      this.window.loadURL("http://localhost:3001");
      // Open devTool if the app is not packaged
      //   this.window.webContents.openDevTools();
    } else {
      this.window.loadFile(join(app.getAppPath(), "setup.window/index.html"));
      //   this.window.webContents.executeJavaScript(`window.location = "./setup"`);
    }
    this.window.show();
    // this.window.loadURL("");
    // this.window.show();
    // this.window.webContents.openDevTools({ mode: "undocked" });
  }
}

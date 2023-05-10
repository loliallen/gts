import { join } from "node:path";
import { Window } from "./types";

export class GameWindow extends Window {
  private constructor() {
    super({
      width: 1300,
      height: 600,
      title: "Events",
      icon: join(process.env.PUBLIC, "favicon.ico"),
      show: false,
      webPreferences: {
        preload: join(__dirname, "../preload/game.js"),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
  }

  override start(url: string, options: any) {
    if (this.window.isDestroyed()) {
      this.window = GameWindow.create().window;
    }
    this.window.loadURL(url);
    this.window.show();
  }

  static create() {
    return new GameWindow();
  }
}

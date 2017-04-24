/// <reference path="types/electron.d.ts" />

declare module "karma-nightmare" {
  export function screenshot(path: string): Promise<void>;
  export function saveHtml(path: string, saveType?: string): Promise<void>;
  export function isNightmare(): boolean;
  export function getCurrentWindow(): Electron.BrowserWindow;
}

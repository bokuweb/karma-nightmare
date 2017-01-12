declare module "karma-nightmare" {
  export function screenshot(path: string): Promise<void>;
  export function saveHtml(path: string): Promise<void>;
  export function isNightmare(): boolean;
}

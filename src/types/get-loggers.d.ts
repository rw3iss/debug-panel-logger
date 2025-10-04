declare module 'get-loggers' {
  export interface LogModule {
    name: string;
    onLog?: (log: any) => void;
    print?: (...args: any[]) => void;
  }

  export function addLogModule(module: LogModule): void;
}
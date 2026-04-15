type EnvConfigs = {
  env: 'development' | 'production';
  showErrors: boolean;
  showErrorsInProd: boolean;
  showErrorsInPlace: boolean;
};

type ProcessMeta = {
  process?: any;
  prefix: string;
};

/**
 * Singleton class to manage environment configurations. It reads the configurations from the process environment variables and provides a method to access them. The configurations are cached after the first read for performance optimization.
 */
export class ConfigManager {
  private static __instance: ConfigManager;
  protected config: EnvConfigs | undefined = undefined;

  private constructor() {}

  public static getInstance(): ConfigManager {
    if (!ConfigManager.__instance) {
      ConfigManager.__instance = new ConfigManager();
    }
    return ConfigManager.__instance;
  }

  private getProcessMeta(): ProcessMeta {
    const process = (globalThis as any).process ?? import.meta.env;
    const prefix = import.meta?.env ? 'VITE_' : '';

    return { process, prefix };
  }

  public getConfig(): EnvConfigs {
    if (this.config) return this.config;

    const { process, prefix } = this.getProcessMeta();

    this.config = {
      env: (process.MODE as EnvConfigs['env']) || 'production',
      showErrors: process[`${prefix}TRD_SHOW_ERRORS`] === 'true',
      showErrorsInProd: process[`${prefix}TRD_SHOW_ERRORS_IN_PROD`] === 'true',
      showErrorsInPlace: process[`${prefix}TRD_SHOW_ERRORS_IN_PLACE`] === 'true',
    };

    return this.config;
  }

  /**
   * Gets the value of a configuration key.
   *
   * @param key key to be read
   * @returns value of the key
   */
  public getByKey(key: string) {
    const { process } = this.getProcessMeta();
    return process[key];
  }

  public get isShowErrors() {
    const config = this.getConfig();
    return config.showErrors && (config.env === 'development' || config.showErrorsInProd);
  }

  public get isShowErrorsInPlace() {
    const config = this.getConfig();
    return config.showErrorsInPlace;
  }
}

/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Runtime configuration for the library. Error reporting is controlled at runtime via
 * `configure()`, so it works identically across every bundler/runtime (Vite, webpack, SSR, plain Node).
 * No build-time env values are baked into the published package - consumers can always override.
 */

import { EnvConfigs, ErrorReportingOptions } from '@types';

/**
 * Singleton class to manage runtime configurations. Values set through `configure()` always win over
 * anything derived from the environment. When neither is set the library falls back to safe defaults.
 */
export class ConfigManager {
  private static __instance: ConfigManager;
  private config: EnvConfigs | undefined = undefined;
  private overrides: Partial<ErrorReportingOptions> = {};

  private constructor() {}

  public static getInstance(): ConfigManager {
    if (!ConfigManager.__instance) ConfigManager.__instance = new ConfigManager();
    return ConfigManager.__instance;
  }

  /**
   * Overrides the runtime configuration. Values provided here are always used. Call it any time to
   * change behavior, e.g.:
   *
   *   configure({ showErrors: true, showErrorsInProd: true, showErrorsInPlace: true });
   *
   * This is the recommended way to control the library - it works the same in every bundler/runtime.
   *
   * @param options Partial configuration to apply on top of any existing settings.
   */
  public configure(options: ErrorReportingOptions): void {
    this.overrides = { ...this.overrides, ...options };
    this.config = undefined;
  }

  /**
   * Boolean env values only resolve to `true` when explicitly set to "true". Any variable not defined
   * (undefined, null or empty) resolves to false.
   */
  private parseBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (value === undefined || value === null || value === '') return false;
    return String(value).toLowerCase() === 'true';
  }

  /**
   * Parses the mode from an environment value.
   * @param value The environment value for the mode.
   */
  private parseMode(value: unknown): EnvConfigs['mode'] {
    const modes: EnvConfigs['mode'][] = ['development', 'production', 'test'];
    return modes.includes(value as EnvConfigs['mode']) ? (value as EnvConfigs['mode']) : 'production';
  }

  /**
   * Reads the process environment when running on Node (SSR, tests, server-side). In browsers `process`
   * is not defined, so this returns null and the configuration comes from `configure()` overrides and
   * defaults only. `process.env` is a genuine runtime read - it is never baked into the build.
   */
  private getProcessEnv(): Record<string, string> | null {
    const nodeProcess = (globalThis as any).process;
    return nodeProcess?.env ?? null;
  }

  /**
   * Gets the resolved configuration.
   *
   * Precedence: `configure()` override -> environment value -> default.
   *
   * Env keys read (Node/SSR only): `TRD_SHOW_ERRORS`, `TRD_SHOW_ERRORS_IN_PROD`, `TRD_SHOW_ERRORS_IN_PLACE`,
   * plus `MODE`/`NODE_ENV` for the mode.
   *
   * @returns The resolved configuration.
   */
  public getConfig(): EnvConfigs {
    if (this.config) return this.config;

    const env = this.getProcessEnv() ?? {};

    this.config = {
      mode: this.overrides.mode ?? this.parseMode(env.MODE ?? env.NODE_ENV),
      showErrors: this.overrides.showErrors ?? this.parseBoolean(env.TRD_SHOW_ERRORS),
      showErrorsInProd: this.overrides.showErrorsInProd ?? this.parseBoolean(env.TRD_SHOW_ERRORS_IN_PROD),
      showErrorsInPlace: this.overrides.showErrorsInPlace ?? this.parseBoolean(env.TRD_SHOW_ERRORS_IN_PLACE),
    };

    return this.config;
  }

  /**
   * Reads a raw value from the process environment (Node/SSR only).
   *
   * @param key The environment variable name, e.g. `TRD_SHOW_ERRORS`.
   * @returns The value of the key, or undefined when not defined.
   */
  public getByKey(key: string): string | undefined {
    return this.getProcessEnv()?.[key];
  }

  /**
   * Determines if errors should be shown based on the resolved configuration. Errors are shown if
   * `showErrors` is true and either the mode is not 'production' or `showErrorsInProd` is true.
   *
   * @returns true if errors should be shown, false otherwise
   */
  public get isShowErrors() {
    const config = this.getConfig();
    return config.showErrors && (config.mode !== 'production' || config.showErrorsInProd);
  }

  /**
   * Determines if errors should be shown in place based on the resolved configuration.
   *
   * @returns true if errors should be shown in place, false otherwise
   */
  public get isShowErrorsInPlace() {
    const config = this.getConfig();
    return config.showErrorsInPlace;
  }
}

/**
 * Public helper to configure the library at runtime. See {@link ConfigManager.configure}.
 *
 * @param options Partial configuration to apply.
 */
export const configure = (options: ErrorReportingOptions): void => ConfigManager.getInstance().configure(options);

/**
 * @author SkyCodr (aka: Dulan Sudasinghe)
 * @description Test scenarios for the runtime configuration API.
 */

import { vi } from 'vitest';

describe('test scenarios for the runtime configuration (ConfigManager)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should expose safe defaults when nothing is configured or set in the env', async () => {
    vi.stubEnv('TRD_SHOW_ERRORS', '');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PROD', '');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PLACE', '');
    vi.stubEnv('MODE', 'production');

    const { ConfigManager } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    expect(confMgr.getConfig()).toEqual({
      mode: 'production',
      showErrors: false,
      showErrorsInProd: false,
      showErrorsInPlace: false,
    });
    expect(confMgr.isShowErrors).toBeFalsy();
    expect(confMgr.isShowErrorsInPlace).toBeFalsy();
  });

  it('should read the unprefixed env vars as defaults (Node/SSR only)', async () => {
    vi.stubEnv('TRD_SHOW_ERRORS', 'true');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PROD', 'false');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PLACE', 'true');
    vi.stubEnv('MODE', 'test');

    const { ConfigManager } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    expect(confMgr.getConfig()).toEqual({
      mode: 'test',
      showErrors: true,
      showErrorsInProd: false,
      showErrorsInPlace: true,
    });
    expect(confMgr.isShowErrors).toBeTruthy();
    expect(confMgr.isShowErrorsInPlace).toBeTruthy();
  });

  it('should let configure() override env-derived values', async () => {
    vi.stubEnv('TRD_SHOW_ERRORS', 'true');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PLACE', 'true');

    const { ConfigManager, configure } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    configure({ showErrors: false });

    const config = confMgr.getConfig();
    expect(config.showErrors).toBe(false);
    expect(config.showErrorsInPlace).toBe(true);
  });

  it('should partially merge configure() options over previous settings', async () => {
    vi.stubEnv('TRD_SHOW_ERRORS', 'true');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PROD', 'false');
    vi.stubEnv('TRD_SHOW_ERRORS_IN_PLACE', 'false');

    const { ConfigManager, configure } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    configure({ showErrors: false, showErrorsInProd: true });

    const config = confMgr.getConfig();
    expect(config.showErrors).toBe(false);
    expect(config.showErrorsInProd).toBe(true);
    expect(config.showErrorsInPlace).toBe(false);
  });

  it('should let configure() set the mode explicitly', async () => {
    vi.stubEnv('MODE', 'production');

    const { ConfigManager, configure } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    configure({ showErrors: true, showErrorsInProd: true, showErrorsInPlace: true, mode: 'test' });

    expect(confMgr.getConfig().mode).toBe('test');
    expect(confMgr.isShowErrors).toBeTruthy();
    expect(confMgr.isShowErrorsInPlace).toBeTruthy();
  });

  it('should invalidate the cached config on each configure() call', async () => {
    const { ConfigManager, configure } = await import('@utils');
    const confMgr = ConfigManager.getInstance();

    configure({ showErrors: false });
    expect(confMgr.getConfig().showErrors).toBe(false);

    configure({ showErrors: true, showErrorsInPlace: true });
    expect(confMgr.getConfig().showErrors).toBe(true);
    expect(confMgr.getConfig().showErrorsInPlace).toBe(true);
  });
});

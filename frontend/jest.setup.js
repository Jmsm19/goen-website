import 'react-testing-library/cleanup-after-each'
import mockEnvConfig from './__mocks__/mockNextConfig';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: mockEnvConfig.publicRuntimeConfig
}))
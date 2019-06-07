import {cleanup} from '@testing-library/react';

afterEach(() => cleanup());

// This is just a little hack to silence a warning that we'll get until react
// 16.9.0 is released (see
// https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256)
// I would never use this in a real-world app, but it seemed a shame to muddy
// the tests with act() calls that won't be needed in a couple of weeks from now.
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

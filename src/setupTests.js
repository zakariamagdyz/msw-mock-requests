import "@testing-library/jest-dom/extend-expect";

const { server } = require("./mocks/server");

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn"
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

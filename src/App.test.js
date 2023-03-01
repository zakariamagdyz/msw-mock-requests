import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import App from "../src/App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

const renderPage = async () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

/**
 * Here are some examples written for the "Mocking Error, Empty and Loading states with MSW" article.
 * https://cathalmacdonnacha.com/mocking-error-empty-and-loading-states-with-msw
 */
describe("App", () => {
  afterEach(() => {
    // Reset url state after each test.
    window.history.replaceState({}, "", "/");
  });

  test("should display successful state", async () => {
    await renderPage();

    // Wait for loading to finish.
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));

    // Check that successful state is displayed.
    expect(await screen.findByText(/Successful response/)).toBeInTheDocument();
  });

  test("should display error state", async () => {
    // Simulate an error scenario. MSW will then return the appropriate response.
    window.history.replaceState({}, "", "/?error=true");

    // Suppress console errors that we intentionally trigger in this test.
    jest.spyOn(console, "error").mockImplementation(() => {});

    await renderPage();
    expect(await screen.findByText(/Error response/)).toBeInTheDocument();
  });

  test("should display empty results state", async () => {
    // Simulate an empty results scenario. MSW will then return the appropriate response.
    window.history.replaceState({}, "", "/?empty=true");

    await renderPage();
    expect(await screen.findByText(/Empty response/)).toBeInTheDocument();
  });
});

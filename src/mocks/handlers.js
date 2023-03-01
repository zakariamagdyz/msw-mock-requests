import { rest } from "msw";

export const handlers = [
  /**
   * Here are some examples written for the "Mocking Error, Empty and Loading states with MSW" article.
   * https://cathalmacdonnacha.com/mocking-error-empty-and-loading-states-with-msw
   */
  rest.get(`https://made.up/api/usage`, (req, res, ctx) => {
    // Get page url params
    const pageParams = new URLSearchParams(window.location.search);
    const isError = pageParams.get("error") === "true";
    const isEmpty = pageParams.get("empty") === "true";
    const isLoading = pageParams.get("loading") === "true";

    // Error
    if (isError) {
      return res(
        ctx.status(404),
        ctx.json({ message: "Oops! Something went terribly wrong. 😢" })
      );
    }

    // Empty
    if (isEmpty) {
      return res(ctx.status(200), ctx.json([]));
    }

    // Loading
    if (isLoading) {
      return res(ctx.status(200), ctx.json({}), ctx.delay("infinite"));
    }

    // Default - return a 200 OK succesful response.
    return res(ctx.status(200), ctx.json(["Dog", "Cat"]));
  })
];

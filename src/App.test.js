import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import mockResponse from "../public/API/CONTENTLISTINGPAGE-PAGE1.json";

describe("testApp", () => {
  let originFetch;
  beforeEach(() => {
    originFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originFetch;
  });

  test("renders The Application", () => {
    render(<App />);
    const title = screen.getByText(/Romantic Comedy/i);
    expect(title).toBeInTheDocument();
  });

  test("Render images", async () => {
    const mRes = { json: jest.fn().mockResolvedValueOnce(mockResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    global.fetch = mockedFetch;
    render(<App />);
    const title = screen.getByText(/Romantic Comedy/i);
    expect(title).toBeInTheDocument();
    let imagesDiv = await screen.findByTestId(/imagePage/i);
    expect(imagesDiv).toBeInTheDocument();
    const imageCount = screen.getAllByTestId(/imageTestId/i);
    expect(imageCount.length).toBe(20);
  });
});

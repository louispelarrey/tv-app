import { renderHook, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import useFetch from "../useFetch";

describe("useFetch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { name: "John Doe", age: 30 };
    const mockUrl = "https://jsonplaceholder.typicode.com/users";
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFetch(mockUrl),
      {
        wrapper: BrowserRouter
      });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.data).toEqual(mockData));
    await waitFor(() => expect(result.current.error).toBeUndefined());
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      signal: expect.any(AbortSignal),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  });

  it("handles other errors correctly", async () => {
    const mockUrl = "https://jsonplaceholder.typicode.com/users";
    const mockResponse = new Error("Some error occurred");
    global.fetch = jest.fn().mockRejectedValue(mockResponse);

    const { result } = renderHook(() => useFetch(mockUrl),
      {
        wrapper: BrowserRouter
      });
    expect(result.current.loading).toBeTruthy();

    await waitFor(() => expect(result.current.data).toBeUndefined())
    await waitFor(() => expect(expect(result.current.error).toEqual("Some error occurred")));
    expect(result.current.loading).toBeFalsy();
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      signal: expect.any(AbortSignal),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }
  );
});

import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useFetch from "../useFetch";

describe("useFetch", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { name: "John Doe", age: 30 };
    const mockUrl = "https://example.com/api/data";
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));
    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      signal: expect.any(AbortSignal),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  });

  it("handles other errors correctly", async () => {
    const mockUrl = "https://example.com/api/data";
    const mockResponse = new Error("Some error occurred");
    global.fetch = jest.fn().mockRejectedValue(mockResponse);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(mockUrl));
    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockResponse);
    expect(result.current.loading).toBeFalsy();
    expect(fetch).toHaveBeenCalledWith(mockUrl, {
      signal: expect.any(AbortSignal),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  });
});

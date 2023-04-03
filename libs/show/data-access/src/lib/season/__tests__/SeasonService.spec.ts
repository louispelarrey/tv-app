import { Show } from "../../../containers/Home/Home";
import { Season } from "../../../containers/ShowDetails/ShowDetails";
import SeasonService from "../SeasonService";

describe("SeasonService", () => {

  const mockAccessToken = "mockAccessToken";
  const mockShow: Show = {
    id: 1,
    name: "Show 1",
    description: "Show 1",
    imagePath: "https://via.placeholder.com/150",
    followedBy: [],
  };
  const seasonService = new SeasonService();

  afterEach(() => {
    jest.resetAllMocks();
  });;

  describe("fetchSeasonsByShow", () => {
    it("should call the fetch function with the correct URL and headers", async () => {
      const mockData: Season = { id: "1", name: "Season 1", description: "Season 1", show: mockShow };
      const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await seasonService.fetchSeasonsByShow(mockShow, mockAccessToken);

      expect(fetch).toHaveBeenCalledWith(`/api/season/show/${mockShow.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${mockAccessToken}`,
        },
      });
    });

    it("should return the response data", async () => {
      const mockData = [{ id: 1, name: "Season 1" }];
      const mockResponse = { json: jest.fn().mockResolvedValueOnce(mockData) };
      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const result = await seasonService.fetchSeasonsByShow(mockShow, mockAccessToken);

      expect(result).toEqual(mockData);
    });
  });
});

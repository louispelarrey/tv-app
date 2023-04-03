import { Show } from "../../../containers/Home/Home";
import ShowService from "../ShowService";

describe("ShowService", () => {
  let showService: ShowService;
  let accessToken: string;

  beforeEach(() => {
    showService = new ShowService();
    accessToken = "testAccessToken";
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchSpecificShow", () => {
    const mockShow: Show = { id: 1, name: "Test Show", description: "Test Description", imagePath: "testImage.jpg", followedBy: [] };
    const mockResponse = { json: () => Promise.resolve(mockShow) };

    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should call fetch with the correct arguments", async () => {
      const id = "1";
      await showService.fetchSpecificShow(id, accessToken);
      expect(fetch).toHaveBeenCalledWith(`/api/show/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
    });

    it("should return the show with images", async () => {
      const mockImage = "testImage.jpg";
      const fetchImagesForShowsMock = jest.spyOn(showService, "fetchImagesForShows")
        .mockResolvedValueOnce([{ ...mockShow, imagePath: mockImage }]);
      const result = await showService.fetchSpecificShow("1", accessToken);
      expect(result).toEqual({ ...mockShow, imagePath: mockImage });
      expect(fetchImagesForShowsMock).toHaveBeenCalledWith([mockShow]);
    });
  });

  describe("fetchImagesForShows", () => {
    const mockShows: Show[] = [
      { id: 1, name: "Show 1", description: "Description 1", imagePath: "testImage.jpg", followedBy: [] },
      { id: 2, name: "Show 2", description: "Description 2", imagePath: "testImage.jpg", followedBy: [] },
      { id: 3, name: "Show 3", description: "Description 3", imagePath: "testImage.jpg", followedBy: [] },
    ];
    const mockResponse = { json: () => Promise.resolve({ image: { original: "testImage.jpg" } }) };

    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should call fetch with the correct arguments", async () => {
      await showService.fetchImagesForShows(mockShows);
      expect(fetch).toHaveBeenCalledTimes(mockShows.length);
      mockShows.forEach((show) => {
        expect(fetch).toHaveBeenCalledWith(`http://api.tvmaze.com/singlesearch/shows?q=${show.name}`);
      });
    });

    it("should return the shows with images", async () => {
      const result = await showService.fetchImagesForShows(mockShows);
      expect(result).toEqual([
        { ...mockShows[0], imagePath: "testImage.jpg" },
        { ...mockShows[1], imagePath: "testImage.jpg" },
        { ...mockShows[2], imagePath: "testImage.jpg" },
      ]);
    });
  });

  describe('fetchShowsFromDB', () => {
    const accessToken = 'test-access-token';
    const mockShows = [
      { id: 1, name: 'Test Show 1', description: 'Description 1' },
      { id: 2, name: 'Test Show 2', description: 'Description 2' },
      { id: 3, name: 'Test Show 3', description: 'Description 3' },
    ];

    beforeEach(() => {
      jest.spyOn(window, 'fetch');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should fetch shows from the database with the correct authorization header', async () => {
      const mockResponse = { json: () => Promise.resolve(mockShows) };
      const expectedHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      (window.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const showService = new ShowService();
      const result = await showService.fetchShowsFromDB(accessToken);

      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith('/api/show', {
        method: 'GET',
        headers: expectedHeaders,
      });
      expect(result).toEqual(mockShows);
    });
  });

  describe("fetchShowsAndImages", () => {
    const accessToken = "abc123";

    it("should return the shows with images", async () => {
      const expectedShows: Show[] = [
        { id: 1, name: "Friends", description: "Description 1", imagePath: "testImage.jpg", followedBy: [] },
        { id: 2, name: "The Office", description: "Description 2", imagePath: "testImage.jpg", followedBy: [] },
      ];

      const fetchShowsFromDBSpy = jest.spyOn(ShowService.prototype, "fetchShowsFromDB")
        .mockResolvedValueOnce(expectedShows);

      const fetchImagesForShowsSpy = jest.spyOn(ShowService.prototype, "fetchImagesForShows")
        .mockResolvedValueOnce(expectedShows);

      const result = await new ShowService().fetchShowsAndImages(accessToken);

      expect(fetchShowsFromDBSpy).toHaveBeenCalledWith(accessToken);
      expect(fetchImagesForShowsSpy).toHaveBeenCalledWith(expectedShows);
      expect(result).toEqual(expectedShows);
    });

    it("should log error when fetchShowsFromDB fails", async () => {
      console.error = jest.fn();

      const fetchShowsFromDBSpy = jest.spyOn(ShowService.prototype, "fetchShowsFromDB")
        .mockRejectedValueOnce(new Error("Error fetching shows from database"));

      const result = await new ShowService().fetchShowsAndImages(accessToken);

      expect(fetchShowsFromDBSpy).toHaveBeenCalledWith(accessToken);
      expect(console.error).toHaveBeenCalledWith(new Error("Error fetching shows from database"));
      expect(result).toBeUndefined();
    });

    it("should log error when fetchImagesForShows fails", async () => {
      console.error = jest.fn();

      const expectedShows: Show[] = [
        { id: 1, name: "Friends", description: "Description 1", imagePath: "testImage.jpg", followedBy: [] },
        { id: 2, name: "The Office", description: "Description 2", imagePath: "testImage.jpg", followedBy: [] },
      ];
      const fetchShowsFromDBSpy = jest.spyOn(ShowService.prototype, "fetchShowsFromDB")
        .mockResolvedValueOnce(expectedShows);

      const fetchImagesForShowsSpy = jest.spyOn(ShowService.prototype, "fetchImagesForShows")
        .mockRejectedValueOnce(new Error("Error fetching images for shows"));

      const result = await new ShowService().fetchShowsAndImages(accessToken);

      expect(fetchShowsFromDBSpy).toHaveBeenCalledWith(accessToken);
      expect(fetchImagesForShowsSpy).toHaveBeenCalledWith(expectedShows);
      expect(console.error).toHaveBeenCalledWith(new Error("Error fetching images for shows"));
      expect(result).toBeUndefined();
    });
  });


  describe('toggleFollowShow', () => {
    it('should make a GET request to the correct API endpoint and return the response data', async () => {
      const mockResponse = { add: true, message: 'Successfully followed show.' };
      const mockAccessToken = '123abc';
      const mockId = 5;

      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      } as any);

      const showService = new ShowService();

      const result = await showService.toggleFollowShow(mockId, mockAccessToken);

      expect(fetchSpy).toHaveBeenCalledWith(`${process.env.NX_SERVER_URL}/api/show/follow/${mockId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mockAccessToken}`,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockAccessToken = '123abc';
      const mockId = 5;

      const fetchSpy = jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Request failed'));

      const showService = new ShowService();

      try {
        await showService.toggleFollowShow(mockId, mockAccessToken);
      } catch (error) {
        expect(fetchSpy).toHaveBeenCalledWith(`${process.env.NX_SERVER_URL}/api/show/follow/${mockId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${mockAccessToken}`,
          },
        });
        expect(error).toEqual(new Error('Request failed'));
      }
    });
  });

  describe('deleteShow', () => {
    let mockAccessToken: string;
    let mockShowId: number;
    let mockShow: Show;

    beforeAll(() => {
      mockAccessToken = 'mockAccessToken';
      mockShowId = 1;
      mockShow = {
        id: mockShowId,
        name: 'Mock Show',
        description: 'A mock show',
        imagePath: 'http://example.com/mock-show.jpg',
        followedBy: []
      };
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should delete a show with the given id', async () => {
      // Arrange
      const expectedUrl = `${process.env.NX_SERVER_URL}/api/show/${mockShowId}`;
      const expectedOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mockAccessToken}`,
        },
      };
      const expectedResponse = mockShow;

      const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(expectedResponse)
      } as unknown as Response);

      const showService = new ShowService();

      // Act
      const actualResponse = await showService.deleteShow(mockShowId, mockAccessToken);

      // Assert
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
      expect(actualResponse).toEqual(expectedResponse);
    });

    it('should handle errors', async () => {
      // Arrange
      const expectedError = new Error('Network error');

      const fetchMock = jest.spyOn(global, 'fetch').mockRejectedValueOnce(expectedError);

      const showService = new ShowService();

      // Act and Assert
      await expect(showService.deleteShow(mockShowId, mockAccessToken)).rejects.toThrow(expectedError);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});

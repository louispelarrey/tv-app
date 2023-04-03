interface Season {
  id: string
  name: string
  description: string
  show: Show
}
interface Show {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  followedBy: User[];
}
interface User {
  id: number;
  username: string;
}
interface ToggleFollowShowResponse {
  "add": boolean,
  "message": string
}

export default class ShowService {
  public async fetchSpecificShow(id: string, accessToken: string) {
    const response = await fetch(`/api/show/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    const data = await response.json()
    const showWithImage = await this.fetchImagesForShows([data])
    return showWithImage[0]
  }


  /**
   * Fetches the images for the shows
   */
  public async fetchImagesForShows(shows: Show[]): Promise<Show[]> {
    const showsWithImagesRes = await Promise.all(
      shows.map(
        (show: Show) => fetch(`http://api.tvmaze.com/singlesearch/shows?q=${show.name}`)
          .then(res => res.json())
          .then(res => ({ ...show, imagePath: res.image?.original }))
      )
    )
    return showsWithImagesRes
  }

  /**
   * Fetches the shows from the database
   */
  public async fetchShowsFromDB(accessToken: string): Promise<Show[]> {
    const res: Response = await fetch("/api/show", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })

    const fetchedShows = await res.json()
    return fetchedShows
  }

  public async fetchShowsAndImages(accessToken: string): Promise<Show[] | undefined> {
    try {
      const fetchedShows = await this.fetchShowsFromDB(accessToken)
      const showsWithImagesRes = await this.fetchImagesForShows(fetchedShows)
      return showsWithImagesRes
    } catch (error) {
      console.error(error)
    }
  }

  public async createShow(name: string, description: string, accessToken: string) {
    try {
      return await fetch("/api/show", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "name": name,
          "description": description,
        }),
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  public async toggleFollowShow(id: number, accessToken: string): Promise<ToggleFollowShowResponse> {
    const req = await fetch(`${process.env.NX_SERVER_URL}/api/show/follow/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return await req.json();
  }

  public async deleteShow(id: number, accessToken: string): Promise<Show> {
    const req = await fetch(`${process.env.NX_SERVER_URL}/api/show/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return await req.json();
  }
}

import { Show } from "../../containers/Home/Home"

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
  public async fetchImagesForShows(shows: Show[]) {
    const showsWithImagesRes: Show[] = await Promise.all(
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
  public async fetchShowsFromDB(accessToken: string) {
    const res: Response = await fetch("/api/show", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })

    const fetchedShows: Show[] = await res.json()
    return fetchedShows
  }

  public async fetchShowsAndImages(accessToken: string) {
    try {
      const fetchedShows: Show[] = await this.fetchShowsFromDB(accessToken)
      const showsWithImagesRes: Show[] = await this.fetchImagesForShows(fetchedShows)
      return showsWithImagesRes
    } catch (error) {
      console.error(error)
    }
  }

}

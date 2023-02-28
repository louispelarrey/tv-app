import { Show } from "../pages";

const fetchSpecificShow = async (id: number) => {
  const response = await fetch(`api/shows/${id}`)
  const data = await response.json()
  return data
}

/**
   * Fetches the images for the shows
   */
const fetchImagesForShows = async (shows: Show[]) => {
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
const fetchShowsFromDB = async (accessToken: string) => {
  const res: Response = await fetch("/api/show", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    },
  })

  const fetchedShows: Show[] = await res.json()
  return fetchedShows
}

const fetchShowsAndImages = async (accessToken: string) => {
  try {
    const fetchedShows: Show[] = await fetchShowsFromDB(accessToken)
    const showsWithImagesRes: Show[] = await fetchImagesForShows(fetchedShows)
    return showsWithImagesRes
  } catch (error) {
    console.error(error)
  }
}

export { fetchSpecificShow, fetchShowsAndImages, fetchImagesForShows };

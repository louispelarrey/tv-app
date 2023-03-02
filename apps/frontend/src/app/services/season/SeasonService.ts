import { Show } from "../../containers/Home/Home";
import { Season } from "../../containers/ShowDetails/ShowDetails";

export default class SeasonService {
  public async fetchSeasonsByShow({ id }: Show, accessToken: string): Promise<Season[]> {
    const response = await fetch(`/api/season/show/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    });
    return await response.json();
  }
}

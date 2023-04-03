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

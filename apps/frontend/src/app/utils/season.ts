import { Season } from "../pages/ShowDetails";

const fetchSeasonsByShow = async (id: string, accessToken: string): Promise<Season[]> => {
  const response = await fetch(`/api/season/show/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  return await response.json();
}

export { fetchSeasonsByShow }

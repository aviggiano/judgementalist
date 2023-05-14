import axios from "axios";

export interface Watson {
  name: string;
  days?: number;
  is_team?: boolean;
  payout?: number;
  score?: number;
  senior?: boolean;
}

export async function getWatsons(): Promise<Watson[]> {
  const url = "https://mainnet-contest.sherlock.xyz/stats/leaderboard";
  const { data } = await axios.get(url);
  const watsons: Watson[] = Object.keys(data).map((name) => ({
    name,
    ...data[name],
  }));
  return watsons;
}

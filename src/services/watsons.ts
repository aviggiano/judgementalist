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
  const response = await fetch(url);
  const body = await response.json();
  const watsons: Watson[] = Object.keys(body).map((name) => ({
    name,
    ...body[name],
  }));
  return watsons;
}

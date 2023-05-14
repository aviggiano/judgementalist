import fs from "fs/promises";
import config from "../config";

let connected = false;
let data: Record<string, any> = {};

export async function connect(): Promise<void> {
  if (connected) return;
  try {
    const content = await fs.readFile(config.db);
    data = JSON.parse(content.toString());
    connected = true;
  } catch (err) {}
}

export async function get(key?: string): Promise<any> {
  if (!key) return data;
  else return data[key];
}

export async function set(key: string, value: any): Promise<any> {
  data[key] = value;
  await fs.writeFile(config.db, JSON.stringify(data));
  return data[key];
}

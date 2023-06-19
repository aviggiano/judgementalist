import fs from "fs/promises";
import config from "../config";
import * as path from 'path';

let connected = false;
let data: Record<string, any> = {};

export async function connect(): Promise<void> {
  if (connected) return;
  try {
    createDirectoryAndFileIfNotExist(config.db);

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

async function createDirectoryAndFileIfNotExist(filePath: string) {
  try {
    const directoryPath = path.dirname(filePath);
    // Check if the directory exists
    if (!await directoryExists(directoryPath)) {
      // Create the directory
      await fs.mkdir(directoryPath, { recursive: true });
    }

    // Check if the file exists
    if (!await fileExists(filePath)) {
      // Create the file
      await fs.writeFile(filePath, "");
    }
  } catch (error) {
    throw error;
  }
}

async function directoryExists(directoryPath: string): Promise<boolean> {
  try {
    const directoryStats = await fs.stat(directoryPath);
    return directoryStats.isDirectory();
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    const fileStats = await fs.stat(filePath);
    return fileStats.isFile();
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
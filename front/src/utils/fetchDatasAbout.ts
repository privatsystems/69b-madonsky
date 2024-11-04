import { AboutDatas } from '../types';

export default async function fetchDatas(): Promise<AboutDatas> {
  try {
    const response = await fetch(`https://madansky.privat.systems/about.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
    }

    const data: AboutDatas = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Rejeter l'erreur pour que l'appelant puisse également la gérer
    throw error;
  }
}
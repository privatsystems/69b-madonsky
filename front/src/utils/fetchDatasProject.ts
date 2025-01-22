import { ProjectDatas } from '../types';

export default async function fetchExpoDatas(project: string | string[] | undefined): Promise<ProjectDatas> {
  try {
    const response = await fetch(`https://back.madansky.com/${project}.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
    }

    const data: ProjectDatas = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Rejeter l'erreur pour que l'appelant puisse également la gérer
    throw error;
  }
}
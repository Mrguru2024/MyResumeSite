import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
}

export async function getRepositories(username: string): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      direction: "desc",
      per_page: 100,
    });

    return data.map((repo) => ({
      name: repo.name,
      description: repo.description ?? null,
      language: repo.language ?? null,
      html_url: repo.html_url,
      updated_at: repo.updated_at ?? null,
      topics: repo.topics || [],
      homepage: repo.homepage ?? null,
      stargazers_count: repo.stargazers_count ?? 0,
      forks_count: repo.forks_count ?? 0,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}


type User = {
    createdAt: string;
    name: string;
    avatar: string;
    id: string;
}

export default async function fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(
        "https://65e0434ed3db23f76248c29a.mockapi.io/api/v1/users",
      );
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch users data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }
  
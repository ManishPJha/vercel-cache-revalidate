import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

import fetchUsers from "../lib/fetch";

import HeaderClock from "../components/clock";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getBlurDataURL = async (imageURL: string) => {
  const buffer = await fetch(imageURL).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};

// revalidate the data after every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const users = await fetchUsers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center text-xl font-bold mb-4">
        <HeaderClock />
        <h3>Users Records</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.length &&
          users.map(async (user) => {

            const blurDataURL = await getBlurDataURL(user.avatar);

            return (
              <div key={user.id}>
                <div className="bg-white overflow-hidden shadow-md rounded-lg">
                  <Image
                    className="w-full h-40 object-cover"
                    src={user.avatar}
                    alt="Avatar"
                    height={200}
                    width={200}
                    placeholder="blur"
                    blurDataURL={blurDataURL} 
                    />
                  <div className="p-4">
                    <div className="font-bold text-lg truncate">{user.name}</div>
                    <div className="text-gray-500 text-sm">
                      Created At: {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </main>
  );
}

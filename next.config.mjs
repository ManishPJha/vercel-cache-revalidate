/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
            {
                hostname: 'cloudflare-ipfs.com',
                protocol: 'https',
            }
        ]
    }
};

export default nextConfig;

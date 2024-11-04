/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    'output': "export",
    images: {
        loader: "custom",
        loaderFile: "./loader.js",
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.toornament.com",
            }
        ]
    },
};

export default nextConfig;

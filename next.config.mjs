/** @type {import('next').NextConfig} */
const nextConfig = {
  // Slim, self-contained production build for the Docker runtime image.
  output: "standalone",
};

export default nextConfig;

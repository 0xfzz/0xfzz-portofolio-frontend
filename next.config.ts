import type { NextConfig } from "next";
import { execSync } from "child_process";

const lastCommitHash = execSync("git rev-parse --short HEAD").toString().trim();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_HASH: lastCommitHash,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      }
    ],
  },
};

export default nextConfig;

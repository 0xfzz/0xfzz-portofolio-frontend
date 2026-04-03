import type { NextConfig } from "next";
import { execSync } from "child_process";

const getCommitHash = (dir: string | null = null) => {
  try {
    const command = dir ? `git -C ${dir} rev-parse --short HEAD` : "git rev-parse --short HEAD";
    return execSync(command).toString().trim();
  } catch (e) {
    return "unknown";
  }
};

const frontendCommitHash = getCommitHash();
const contentCommitHash = getCommitHash("content");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_HASH: frontendCommitHash,
    NEXT_PUBLIC_CONTENT_COMMIT_HASH: contentCommitHash,
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

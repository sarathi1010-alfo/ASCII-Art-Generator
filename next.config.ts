import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/generator/text-to-ascii',
        destination: '/generators/text-to-ascii',
        permanent: true,
      },
      {
        source: '/discord-ascii-art',
        destination: '/use-cases/discord-ascii-art',
        permanent: true,
      },
      {
        source: '/github-readme-art',
        destination: '/use-cases/github-readme-ascii',
        permanent: true,
      },
      {
        source: '/terminal-customization',
        destination: '/use-cases/terminal-ascii-art',
        permanent: true,
      },
      {
        source: '/text-to-ascii/templates/cool',
        destination: '/generators/text-to-ascii',
        permanent: false,
      },
      {
        source: '/text-to-ascii/templates/scary',
        destination: '/generators/text-to-ascii',
        permanent: false,
      },
      {
        source: '/image-to-ascii/templates/discord',
        destination: '/generators/image-to-ascii',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;

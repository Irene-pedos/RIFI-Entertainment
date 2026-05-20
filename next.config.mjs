/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
      },
      {
        protocol: 'https',
        hostname: 'pdohgtagbcnlsemitjzq.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'tmrcplydvvqnltsmjvwg.supabase.co',
      },
    ],
  },
}

export default nextConfig

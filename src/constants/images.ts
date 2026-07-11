/**
 * Single source of truth for every image path.
 * Replace the files in /public/images/ — nothing else needs to change.
 */
export const IMAGES = {
  profile: "/images/profile-placeholder.webp",
  projects: {
    finsight: "/images/project-1.webp",
    dreamAgency: "/images/project-2.webp",
    education: "/images/project-3.webp",
    community: "/images/project-4.webp",
  },
  certificates: [
    "/images/certificate-1.webp",
    "/images/certificate-2.webp",
    "/images/certificate-3.webp",
    "/images/certificate-4.webp",
  ],
} as const;

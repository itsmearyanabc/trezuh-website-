import bandCurve from "@/assets/images/band-curve.jpg";
import heroTower from "@/assets/images/hero-tower.jpg";
import pillarDevelopments from "@/assets/images/pillar-developments.jpg";
import pillarEstates from "@/assets/images/pillar-estates.jpg";
import pillarWealth from "@/assets/images/pillar-wealth.jpg";
import projectAtlas from "@/assets/images/project-atlas.jpg";
import projectMeridian from "@/assets/images/project-meridian.jpg";
import projectSolenne from "@/assets/images/project-solenne.jpg";

/**
 * Static imports give Next.js the intrinsic dimensions and a blur placeholder
 * for every photograph, so nothing reflows and nothing flashes white.
 * Sources and credits are listed in CREDITS.md.
 */
export const IMAGES = {
  heroTower,
  bandCurve,
  pillarEstates,
  pillarDevelopments,
  pillarWealth,
  projectMeridian,
  projectAtlas,
  projectSolenne,
} as const;

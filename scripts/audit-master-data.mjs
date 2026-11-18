import { createRequire } from "node:module";
import fs from "node:fs";
import ts from "typescript";

const require = createRequire(import.meta.url);
const src = fs.readFileSync("src/data/masterPortfolio.ts", "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
}).outputText;
const mod = { exports: {} };
new Function("exports", "module", "require", js)(mod.exports, mod, require);
const { credentials, pillars, projects, profile } = mod.exports;

const ids = credentials.map((c) => c.id);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
const credIds = credentials.map((c) => c.credentialId).filter(Boolean);
const dupCredly = credIds.filter((id, i) => credIds.indexOf(id) !== i);
const badDates = credentials.filter(
  (c) => Number.isNaN(Date.parse(c.issuedAt)) || !/^\d{4}-\d{2}-\d{2}$/.test(c.issuedAt),
);
const validTags = ["ece", "fullstack", "ai", "ml-dl", "data", "video", "vault"];
const badTags = credentials.filter((c) => c.pillarTags.some((t) => !validTags.includes(t)));
const incomplete = credentials.filter((c) => !c.issuer || !c.title || !c.issueDate);
const badUrls = credentials.filter(
  (c) => c.verificationUrl && !/^https?:\/\//.test(c.verificationUrl) && !c.verificationUrl.startsWith("/"),
);
const featuredWithoutEvidence = credentials.filter(
  (c) => c.featuredInPillar && !c.verificationUrl && !c.credentialId,
);

const pillarStats = pillars.map((p) => ({
  id: p.id,
  projects: projects.filter((x) => x.pillars.includes(p.id)).length,
  featuredCreds: credentials.filter((c) => c.featuredInPillar && c.pillarTags.includes(p.id)).length,
  hasEmpty: !p.coreCompetencies.length || !p.subSkills.length,
}));

const dupProjectSlugs = projects
  .map((p) => p.slug)
  .filter((slug, i, arr) => arr.indexOf(slug) !== i);

console.log(
  JSON.stringify(
    {
      counts: {
        pillars: pillars.length,
        projects: projects.length,
        featuredProjects: projects.filter((p) => p.featuredOnHub).length,
        credentials: credentials.length,
        spoke: credentials.filter((c) => c.featuredInPillar).length,
        vaultOnly: credentials.filter((c) => c.pillarTags.includes("vault")).length,
        archived: credentials.filter((c) => c.archived).length,
      },
      problems: {
        dupIds,
        dupCredly,
        dupProjectSlugs,
        badDates: badDates.map((c) => c.id),
        badTags: badTags.map((c) => c.id),
        incomplete: incomplete.map((c) => c.id),
        badUrls: badUrls.map((c) => c.id),
        featuredWithoutEvidence: featuredWithoutEvidence.map((c) => c.id),
      },
      pillarStats,
      profile: {
        name: profile.fullName,
        graduation: profile.education.expectedGraduation,
        socials: profile.socials.length,
      },
    },
    null,
    2,
  ),
);

/**
 * Utility functions for India Presence component
 */

export interface DistrictRecord {
  site: string;
  location: string;
  bucket: ProjectBucket;
}

export interface LocationGroup {
  location: string;
  sites: string[];
}

export type ProjectBucket =
  | "landfill"
  | "bsfl"
  | "integrated"
  | "waste-plastics-extrusion"
  | "untagged";

// ====== LOCATION NORMALIZATION ======
export const normalizeLocationName = (name: string) => {
  const trimmed = name.trim();

  if (/^NOIDA-/i.test(trimmed)) return "NOIDA";
  if (/^Makkarpura/i.test(trimmed)) return "Makkarpura";
  if (/^Perungudi Package-/i.test(trimmed)) return "Perungudi";
  if (/^Vizag New$/i.test(trimmed) || /^GVMC Vizag$/i.test(trimmed)) return "Vizag";
  if (/^Nagpur Smart City$/i.test(trimmed) || /^NMC-Project/i.test(trimmed)) return "Nagpur";
  if (/^Pondy/i.test(trimmed)) return "Pondy";
  if (/^Trichy New$/i.test(trimmed)) return "Trichy";
  if (/^KDG-PG\d+$/i.test(trimmed)) return "Kodungaiyur";
  if (/^Erode Muthusamy Colony$/i.test(trimmed)) return "Erode";

  return trimmed;
};

export const dedupe = (items: string[]) =>
  Array.from(new Set(items.filter((item) => item.length > 0)));

// ====== LOCATION CLASSIFICATION ======
const EMPHASIZED_LOCATIONS = new Set([
  "karur",
  "dindigul",
  "tiruchirappalli",
  "tiruchirapalli",
  "visakhapatnam",
]);

const FOREGROUND_LOCATIONS = new Set(["virudhunagar", "kadapa"]);
const HEADING_STYLE_LOCATIONS = new Set(["Integrated Alternative Fuel"]);

export const isEmphasizedLocation = (site: string) =>
  EMPHASIZED_LOCATIONS.has(site.trim().toLowerCase());

export const isForegroundLocation = (site: string) =>
  FOREGROUND_LOCATIONS.has(site.trim().toLowerCase());

export const isHeadingStyleLocation = (location: string) =>
  HEADING_STYLE_LOCATIONS.has(location.trim().toLowerCase());

// ====== DATA PARSING & TRANSFORMATION ======
export const parseDistrictRecord = (district: string): DistrictRecord => {
  const raw = district.trim();
  const parts = raw
    .split(" - ")
    .map((part) => part.trim())
    .filter(Boolean);
  const joined = parts.join(" - ").toLowerCase();

  if (joined.includes("landfill mining")) {
    if (parts.length >= 3) {
      return {
        site: normalizeLocationName(parts[0]),
        location: parts[1],
        bucket: "landfill",
      };
    }

    const site = normalizeLocationName(parts[0] ?? raw);
    return { site, location: "Location", bucket: "landfill" };
  }

  if (joined.includes("bsfl")) {
    if (parts.length >= 3) {
      return {
        site: normalizeLocationName(parts[0]),
        location: parts[1],
        bucket: "bsfl",
      };
    }

    const site = normalizeLocationName(parts[0] ?? raw);
    return { site, location: "Location", bucket: "bsfl" };
  }

  if (joined.includes("integrated alternative fuel")) {
    if (parts.length >= 3) {
      return {
        site: normalizeLocationName(parts[0]),
        location: parts[1],
        bucket: "integrated",
      };
    }

    const site = normalizeLocationName(parts[0] ?? raw);
    return { site, location: "Location", bucket: "integrated" };
  }

  if (joined.includes("WPE")) {
    if (parts.length >= 3) {
      return {
        site: normalizeLocationName(parts[0]),
        location: parts[1],
        bucket: "waste-plastics-extrusion",
      };
    }

    const site = normalizeLocationName(parts[0] ?? raw);
    return { site, location: "Location", bucket: "waste-plastics-extrusion" };
  }

  if (parts.length >= 2) {
    // Preserve NOIDA sector names as site labels and map district as heading.
    if (
      parts.length >= 3 &&
      /^noida$/i.test(parts[0]) &&
      /^sector\b/i.test(parts[1])
    ) {
      return {
        site: `${parts[0]} - ${parts[1]}`,
        location: parts.slice(2).join(" - "),
        bucket: "untagged",
      };
    }

    return {
      site: normalizeLocationName(parts[0]),
      location: parts.slice(1).join(" - "),
      bucket: "untagged",
    };
  }

  const normalized = normalizeLocationName(raw);
  return { site: normalized, location: "Location", bucket: "untagged" };
};

export const groupByLocation = (records: DistrictRecord[]): LocationGroup[] => {
  const grouped = new Map<string, string[]>();

  records.forEach((record) => {
    const existing = grouped.get(record.location) ?? [];
    if (!existing.includes(record.site)) {
      existing.push(record.site);
      grouped.set(record.location, existing);
    }
  });

  return Array.from(grouped.entries()).map(([location, sites]) => ({
    location,
    sites,
  }));
};

// ====== DATA BUCKETING LOGIC ======
export const bucketizeDistricts = (districtEntries: string[]) => {
  const parsedDistricts = districtEntries.map(parseDistrictRecord);
  const taggedLandfill = parsedDistricts.filter(
    (item) => item.bucket === "landfill"
  );
  const taggedBsfl = parsedDistricts.filter((item) => item.bucket === "bsfl");
  const taggedIntegrated = parsedDistricts.filter(
    (item) => item.bucket === "integrated"
  );
  const taggedWastePlasticsExtrusion = parsedDistricts.filter(
    (item) => item.bucket === "waste-plastics-extrusion"
  );
  const untagged = parsedDistricts.filter((item) => item.bucket === "untagged");

  const landfillRecords = taggedLandfill.length > 0 ? taggedLandfill : untagged;
  const bsflRecords = taggedBsfl;
  const integratedRecords = taggedIntegrated;
  const wastePlasticsExtrusionRecords = taggedWastePlasticsExtrusion;

  return {
    landfillLocations: groupByLocation(landfillRecords),
    bsflLocations: groupByLocation(bsflRecords),
    integratedLocations: groupByLocation(integratedRecords),
    wastePlasticsExtrusionLocations: groupByLocation(
      wastePlasticsExtrusionRecords
    ),
  };
};

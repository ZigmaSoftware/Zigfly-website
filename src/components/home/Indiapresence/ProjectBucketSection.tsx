import React from "react";
import { LocationGroup } from "./indiaPresenceUtils";
import { LocationGroupItem } from "./LocationGroupItem";

interface ProjectBucketSectionProps {
  title: string;
  locations: LocationGroup[];
  singleColumn?: boolean;
}

export const ProjectBucketSection: React.FC<ProjectBucketSectionProps> = ({
  title,
  locations,
  singleColumn = false,
}) => {
  if (locations.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-2">{title}</p>
      <div className={singleColumn ? "columns-1 gap-8" : "columns-1 gap-8 sm:columns-2"}>
        {locations.map((group) => (
          <LocationGroupItem key={group.location} group={group} />
        ))}
      </div>
    </div>
  );
};

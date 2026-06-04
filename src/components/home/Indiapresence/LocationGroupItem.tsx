import React from "react";
import {
  LocationGroup,
  isEmphasizedLocation,
  isForegroundLocation,
  isHeadingStyleLocation,
} from "./indiaPresenceUtils";

interface LocationGroupItemProps {
  group: LocationGroup;
}

export const LocationGroupItem: React.FC<LocationGroupItemProps> = ({
  group,
}) => {
  const visibleSites = group.sites.filter(
    (site) => site.trim().toLowerCase() !== group.location.trim().toLowerCase()
  );

  return (
    <div className="mb-3 break-inside-avoid">
      {group.location !== "Location" ? (
        <p
          className={
            isHeadingStyleLocation(group.location)
              ? "text-sm font-semibold text-foreground mb-0.5"
              : "text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5 whitespace-nowrap"
          }
        >
          {group.location}
        </p>
      ) : null}
      {visibleSites.length > 0 ? (
        <ul className="space-y-0.5">
          {visibleSites.map((site) => (
            <li
              key={`${group.location}-${site}`}
              className="flex items-start gap-2 text-sm text-foreground leading-normal"
            >
              {!isEmphasizedLocation(site) && !isForegroundLocation(site) ? (
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/70"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={
                  isForegroundLocation(site)
                    ? "font-semibold text-muted-foreground"
                    : isEmphasizedLocation(site)
                      ? "font-semibold text-muted-foreground"
                      : undefined
                }
              >
                {site}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

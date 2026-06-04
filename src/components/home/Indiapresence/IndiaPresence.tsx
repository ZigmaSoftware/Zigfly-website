import React, { useState } from "react";
import IndiaMapSVG from "./IndiaMapSVG";
import { stateData, legendItems } from "@/data/indiaPresenceData";
import {
  bucketizeDistricts,
} from "./indiaPresenceUtils";
import { ProjectBucketSection } from "./ProjectBucketSection";

const IndiaPresence: React.FC = () => {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // ====== COMPUTE DERIVED STATE ======
  const currentState = selectedState || activeState;
  const currentData = currentState ? stateData[currentState] : null;
  const districtEntries = currentData?.districts ?? [];
  const singleColumnBuckets = currentData?.id === "Keralam";
  const {
    landfillLocations,
    bsflLocations,
    integratedLocations,
    wastePlasticsExtrusionLocations,
  } = bucketizeDistricts(districtEntries);

  const stateList = Object.values(stateData);

  // ====== EVENT HANDLERS ======
  const handleStateHover = (stateId: string | null) => {
    setActiveState(stateId);
  };

  const handleStateClick = (stateId: string) => {
    setSelectedState((prev) => (prev === stateId ? null : stateId));
  };

  const handleTabClick = (stateId: string) => {
    setSelectedState(stateId);
    setActiveState(stateId);
  };



  return (
    <section className="min-h-screen bg-background py-16 px-4 md:px-8 lg:px-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center ">
        <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">Pan-India Presence</p>

        <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
          Transforming Landfills <span className="text-primary">Across India</span>
        </h2>

        <p className="mt-6 text-sm md:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          Driving large-scale landfill reclamation through advanced biomining, reclaiming land, reducing
          environmental risk and carbon impact, and enabling circular urban transformation.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              {/* <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-foreground font-medium">
                {item.label}
              </span> */}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_minmax(500px,800px)_380px] gap-6 items-start lg:justify-center">
        {/* State Tabs - Left */}
        <div className="lg:w-[220px]">
          <div className="flex lg:flex-col flex-wrap gap-0.5">
            {stateList.map((state) => (
              <button
                key={state.id}
                onClick={() => handleTabClick(state.id)}
                className={`text-left text-sm lg:text-base px-2.5 py-1 rounded-sm border border-transparent transition-all duration-200 font-medium leading-tight
                  ${currentState === state.id
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "text-foreground hover:bg-secondary"
                  }`}
              >
                {state.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map - Center */}
        <div className="flex items-center justify-center self-start">
          <div className="w-full max-w-[520px] mx-auto">
            <IndiaMapSVG
              activeState={currentState}
              onStateHover={handleStateHover}
              onStateClick={handleStateClick}
            />
          </div>
        </div>

        {/* Data Card - Right */}
        <div className="flex flex-col justify-start lg:pt-1">
          {currentData ? (
            <div
              key={currentData.id}
              className="bg-card border border-border rounded-sm p-5 shadow-sm animate-lift-in"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-accent rounded-full" />
                <h2 className="text-lg font-bold text-foreground">
                  {currentData.name}
                </h2>
              </div>

              {landfillLocations.length > 0 ||
              bsflLocations.length > 0 ||
              integratedLocations.length > 0 ||
              wastePlasticsExtrusionLocations.length > 0 ? (
                <div className="mt-3 space-y-5">
                  <ProjectBucketSection
                    title="Landfill Mining"
                    locations={landfillLocations}
                    singleColumn={singleColumnBuckets}
                  />
                  <ProjectBucketSection
                    title="BSFL Organic Waste Project"
                    locations={bsflLocations}
                    singleColumn={singleColumnBuckets}
                  />
                  <ProjectBucketSection
                    title="Integrated Alternative Fuel"
                    locations={integratedLocations}
                    singleColumn={singleColumnBuckets}
                  />
                  <ProjectBucketSection
                    title="WPE"
                    locations={wastePlasticsExtrusionLocations}
                    singleColumn={singleColumnBuckets}
                  />

                  

                </div>
              ) : null}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-sm p-6 shadow-sm">
              <div className="text-center text-muted-foreground">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                <p className="text-md font-medium">Hover over a state</p>
                <p className="text-md mt-1">
                  to view project details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IndiaPresence;



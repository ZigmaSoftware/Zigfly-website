import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/website/zigma_blueplanet_logo.png";
import zigflyLogo from "@/assets/services/zigfly.png";
import livelarvae from "@/assets/Products/larvae.jpeg";
import drylarvae from "@/assets/website/larva.jpeg";
import manure from "@/assets/Products/Manure.jpeg";
import frass from "@/assets/Products/Frass +6mm.jpeg";



/* ── Types ─────────────────────────────────────────────────── */
interface DropdownItem {
  name: string;
  path: string;
  image?: string;
}

interface NavItem {
  name: string;
  path: string;
  megaMenu?: boolean;
  dropdown?: DropdownItem[];
}


/* NAV ITEMS */

const navItems: NavItem[] = [
  { name: "Home", path: "/" },

  { name: "About Us", path: "/about" },

  {
    name: "Services",
    path: "/services",
    megaMenu: true,
    // dropdown: [
    //   {
    //     name: "BSFL Based Organic Waste Management",
    //     path: "/services#bsfl-organic-waste",
    //     image: bsflsolar,
    //   },
    // ],
  },

  {
    name: "Products",
    path: "/products",
    megaMenu: true,
    dropdown: [
      { name: "Frass",       path: "/products", image: frass },
      { name: "Manure",      path: "/products", image: manure },
      { name: "Dry larvae",  path: "/products", image: drylarvae },
      { name: "Live Larvae", path: "/products", image: livelarvae },
    ],
  },

  { name: "Projects", path: "/projects" ,
  // dropdown: [
  //   { name: "Landfill Mining", path: "/projects?category=landfill-mining" },
  //   { name: "BSFL Organic Waste", path: "/projects?category=bsfl-organic-waste" },
  //   { name: "Integrated Alternative Fuel", path: "/projects?category=integrated-af-projects" },
  //   { name: "WPE", path: "/projects?category=waste-plastics-extrusion" },
    
  
  // ],

  },

  {
    name: "News Room",
    path: "/media",
    dropdown: [
      { name: "In The News", path: "/newsroom" },
      // { name: "Publications", path: "/publications" },
      // { name: "Newsletters", path: "/newsletters" },
      // { name: "Events", path: "/events" },
      // { name: "Awards and Recognitions", path: "/AwardsandRecognition" },
      { name: "Testimonials", path: "/Testimonials" },
      // { name: "Newsroom", path: "/newsroom" },

      // { name: "Cascadeslider", path: "/cascadeslider" }, 
      // { name: "Fullscreenslider", path: "/fullscreenslider" },
    
    ],
  },

  {
    name: "People At Zigma",
    path: "/people",
    // dropdown: [
    //   { name: "People", path: "/people" },
    //   { name: "People Demo1", path: "/peopledemo1" },
    //   { name: "People Demo2", path: "/peopledemo2" },
    //   { name: "People Demo3", path: "/peopledemo3" },
    // ],
  },

  { name: "Careers", path: "/careers" },
];

/* COMPONENT */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [hasHeroSection, setHasHeroSection] = useState(false);
  const [isHeroActive, setIsHeroActive] = useState(false);
  const [canAutoHideOnHero, setCanAutoHideOnHero] = useState(false);
  const [heroHideArmed, setHeroHideArmed] = useState(false);
  const [isHeroHeaderVisible, setIsHeroHeaderVisible] = useState(true);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();

  const dropdownRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  /* Close dropdown when clicking outside */

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Indicator Movement */

  const updateIndicatorToItem = useCallback((name: string) => {
    const itemEl = itemRefs.current[name];
    const navEl = navRef.current;

    if (!itemEl || !navEl) return;

    const itemRect = itemEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();

    setIndicatorStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
      opacity: 1,
    });
  }, []);

  const resetIndicatorToActive = useCallback(() => {
    const activeItem = navItems.find((item) => isActive(item.path));

    if (activeItem) {
      updateIndicatorToItem(activeItem.name);
      return;
    }

    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  }, [isActive, updateIndicatorToItem]);

  useEffect(() => {
    resetIndicatorToActive();
  }, [resetIndicatorToActive]);

  useEffect(() => {
    const handleResize = () => resetIndicatorToActive();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [resetIndicatorToActive]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let frameId = 0;

    const setupHeroSync = () => {
      const heroEl = document.querySelector<HTMLElement>("[data-header-hero]");

      if (!heroEl) {
        setHasHeroSection(false);
        setIsHeroActive(false);
        return;
      }

      setHasHeroSection(true);

      const syncHeroState = () => {
        const headerHeight = 80;
        const rect = heroEl.getBoundingClientRect();
        const heroStillInView =
          rect.bottom > headerHeight + 24 && rect.top < window.innerHeight * 0.85;

        setIsHeroActive(heroStillInView);
      };

      syncHeroState();
      window.addEventListener("scroll", syncHeroState, { passive: true });
      window.addEventListener("resize", syncHeroState);

      cleanup = () => {
        window.removeEventListener("scroll", syncHeroState);
        window.removeEventListener("resize", syncHeroState);
      };
    };

    frameId = window.requestAnimationFrame(setupHeroSync);

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanup?.();
    };
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncCapability = () => {
      setCanAutoHideOnHero(mediaQuery.matches);
    };

    syncCapability();
    mediaQuery.addEventListener("change", syncCapability);

    return () => mediaQuery.removeEventListener("change", syncCapability);
  }, []);

  useEffect(() => {
    const shouldAutoHide = hasHeroSection && isHeroActive && canAutoHideOnHero && !isMenuOpen;

    if (!shouldAutoHide) {
      setHeroHideArmed(false);
      setIsHeroHeaderVisible(true);
      return;
    }

    setHeroHideArmed(false);
    setIsHeroHeaderVisible(true);

    const timerId = window.setTimeout(() => {
      setHeroHideArmed(true);
      setIsHeroHeaderVisible(false);
    }, 5000);

    return () => window.clearTimeout(timerId);
  }, [hasHeroSection, isHeroActive, canAutoHideOnHero, location.pathname, isMenuOpen]);

  useEffect(() => {
    if (!heroHideArmed) return;

    if (activeDropdown || isMenuOpen) {
      setIsHeroHeaderVisible(true);
    }
  }, [activeDropdown, heroHideArmed, isMenuOpen]);

  const activeMegaMenuItem = navItems.find(
    (item) => item.name === activeDropdown && item.megaMenu && item.dropdown
  );
  const megaMenuCols = activeMegaMenuItem?.dropdown?.length ?? 1;
  const megaMenuWidth = megaMenuCols === 1 ? "min(35vw, 340px)" : `min(${megaMenuCols * 26}vw, ${megaMenuCols * 270}px)`;
  const shouldAutoHideHeroHeader = hasHeroSection && isHeroActive && canAutoHideOnHero;
  const isHeroHeaderHidden =
    shouldAutoHideHeroHeader && heroHideArmed && !isHeroHeaderVisible && !isMenuOpen;
  const desktopNavItemClass = "text-foreground hover:text-primary";
  const desktopActiveNavItemClass = "text-primary";
  const mobileNavItemClass = "text-foreground hover:text-primary";
  const mobileActiveNavItemClass = "text-primary";

  return (
    <>
      {isHeroHeaderHidden && (
        <div
          className="fixed inset-x-0 top-0 z-[79] hidden h-10 xl:block"
          onMouseEnter={() => setIsHeroHeaderVisible(true)}
        />
      )}

      <header
        className={cn(
          "top-0 inset-x-0 z-[80] border-b transition-[transform,background-color,border-color,box-shadow] duration-300",
          hasHeroSection ? "fixed" : "sticky",
          isHeroHeaderHidden ? "-translate-y-full" : "translate-y-0",
          "bg-background/95 border-border backdrop-blur shadow-sm"
        )}
        onMouseLeave={() => {
          if (shouldAutoHideHeroHeader && heroHideArmed && !isMenuOpen && !activeDropdown) {
            setIsHeroHeaderVisible(false);
          }
        }}
      >

      <div className="container-main flex items-center justify-center">

        <div className="flex items-center justify-between w-full h-20">

          {/* LOGO */}

          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/zigfly logo.png"
              alt="Zigfly"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="w-px h-8 bg-gray-300 shrink-0" />
            <img
              src={logo}
              alt="Zigma Blue Planet"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="relative hidden xl:flex items-center justify-center gap-4 2xl:gap-8 flex-wrap"
            ref={(el) => {
              dropdownRef.current = el;
              navRef.current = el;
            }}
            onMouseEnter={() => {
              if (shouldAutoHideHeroHeader && heroHideArmed) {
                setIsHeroHeaderVisible(true);
              }
            }}
            onMouseLeave={() => {
              resetIndicatorToActive();
              setActiveDropdown(null);
              if (shouldAutoHideHeroHeader && heroHideArmed && !isMenuOpen) {
                setIsHeroHeaderVisible(false);
              }
            }}
          >

            {/* Sliding Indicator */}

            <div
              className="pointer-events-none absolute left-0 top-3/4 h-[3px] bg-emerald-600 transition-[left,width,opacity,background-color] duration-500"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />

                        {navItems.map((item) => (

              <div
                key={item.name}
                className={item.megaMenu ? "static" : "relative"}
                ref={(el) => {
                  itemRefs.current[item.name] = el;
                }}
                onMouseEnter={() => updateIndicatorToItem(item.name)}
              >

                {item.dropdown ? (

                  <button
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    className={`flex items-center gap-1 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? desktopActiveNavItemClass
                        : desktopNavItemClass
                    }`}
                  >
                    {item.name}

                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                ) : (

                  <Link
                    to={item.path}
                    className={`flex items-center py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.path)
                        ? desktopActiveNavItemClass
                        : desktopNavItemClass
                    }`}
                  >
                    {item.name}
                  </Link>

                )}

                {/* DROPDOWN */}

                {item.dropdown && !item.megaMenu && activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 w-max min-w-[200px] bg-card border border-border rounded-md shadow-xl p-2">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm hover:text-primary"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}

              </div>

            ))}

            {activeMegaMenuItem?.dropdown && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 z-50 bg-white border border-border rounded-xl shadow-2xl p-6"
                style={{ width: megaMenuWidth }}
              >
                <p className="text-[0.65rem] font-bold tracking-widest text-muted-foreground uppercase mb-5 px-1">
                  {`Our ${activeMegaMenuItem.name}`}
                </p>

                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: `repeat(${megaMenuCols}, 1fr)` }}
                >
                  {activeMegaMenuItem.dropdown.map((sub) => {
                    const isServicesMenu = activeMegaMenuItem.name === "Services";
                    return (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setActiveDropdown(null)}
                        className="group flex flex-col gap-2 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div
                          className={`relative overflow-hidden rounded-lg aspect-[16/9] ${
                            isServicesMenu ? "bg-transparent" : "bg-muted"
                          }`}
                        >
                          {isServicesMenu ? (
                            <>
                              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-0">
                                <img
                                  src={zigflyLogo}
                                  alt=""
                                  aria-hidden="true"
                                  className="h-10 w-auto object-contain mix-blend-multiply transition-transform duration-300"
                                  loading="lazy"
                                />
                              </div>
                              {sub.image && (
                                <img
                                  src={sub.image}
                                  alt={sub.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              )}
                            </>
                          ) : sub.image ? (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary" />
                          )}
                          {!isServicesMenu && (
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                          )}
                        </div>
                        <span className="text-[0.9rem] font-medium text-foreground text-center group-hover:text-primary transition-colors duration-200 leading-snug px-1 pb-1">
                          {sub.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </nav>

          {/* CTA */}

          <div className="hidden xl:block shrink-0">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* MOBILE TOGGLE */}

          <button
            className="xl:hidden p-2 transition-colors text-foreground"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (isMenuOpen) setMobileDropdown(null);
            }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {/* MOBILE NAV */}

      {isMenuOpen && (

        <div className="container-main">

          <nav className="xl:hidden py-4 border-t border-border max-h-[70vh] overflow-y-auto pb-6">

                        {navItems.map((item) => (

              <div key={item.name}>

                {item.dropdown ? (

                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.name ? null : item.name)}
                      className={`flex items-center justify-between w-full py-4 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? mobileActiveNavItemClass
                          : mobileNavItemClass
                      }`}
                    >
                      {item.name}

                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />

                    </button>

                    {mobileDropdown === item.name && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => {
                              setMobileDropdown(null);
                              setIsMenuOpen(false);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>

                ) : (

                  <Link
                    to={item.path}
                    className={`flex items-center py-4 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? mobileActiveNavItemClass
                        : mobileNavItemClass
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>

                )}

              </div>

            ))}

            <div className="pt-4 border-t border-border mt-4">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              </Button>
            </div>

          </nav>

        </div>

      )}

      </header>
    </>
  );
};

export default Header;

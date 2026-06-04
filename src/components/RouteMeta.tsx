import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type RouteMetaEntry = {
  description: string;
  title: string;
};

const SITE_NAME = "Zigfly";
const DEFAULT_META: RouteMetaEntry = {
  title: "Sustainable Waste Solutions",
  description:
    "Zigfly delivers sustainable waste management, landfill remediation, and circular economy solutions across India.",
};

const ROUTE_META: Record<string, RouteMetaEntry> = {
  "/": {
    title: "Home",
    description:
      "Explore Zigfly's waste management, remediation, and circular economy services built for scalable environmental impact.",
  },
  "/about": {
    title: "About",
    description:
      "Learn about Zigfly, our leadership, milestones, and approach to sustainable waste transformation.",
  },
  "/awards": {
    title: "Awards",
    description:
      "See the awards and recognitions earned by Zigfly for environmental services and innovation.",
  },
  "/awardsandrecognition": {
    title: "Awards and Recognition",
    description:
      "Browse Zigfly's awards and recognition across environmental impact, landfill remediation, and sustainability.",
  },
  "/careers": {
    title: "Careers",
    description:
      "Explore open roles at Zigfly and build a career in environmental engineering, project delivery, and sustainability.",
  },
  "/careers/apply": {
    title: "Apply",
    description:
      "Submit your application to Zigfly for current and future career opportunities.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Get in touch with Zigfly for business enquiries, partnerships, and sustainability solutions.",
  },
  "/newsletters": {
    title: "Newsletters",
    description:
      "Read Zigfly newsletters covering projects, milestones, and circular economy updates.",
  },
  "/newsroom": {
    title: "Newsroom",
    description:
      "Browse media coverage, project news, and public updates from Zigfly.",
  },
  "/people": {
    title: "People",
    description:
      "Meet the leadership and team behind Zigfly's environmental and waste management initiatives.",
  },
  "/policies": {
    title: "Policies",
    description:
      "Review governance, privacy, whistleblower, and compliance policies for Zigfly.",
  },
  "/products": {
    title: "Products",
    description:
      "Discover Zigfly products including BSFL larvae, manure, frass, and circular material solutions.",
  },
  "/projects": {
    title: "Projects",
    description:
      "Explore Zigfly projects in landfill remediation, waste processing, and environmental restoration.",
  },
  "/projects/gallery": {
    title: "Projects Gallery",
    description:
      "View project galleries showing before-and-after outcomes across Zigfly remediation and recovery sites.",
  },
  "/publications": {
    title: "Publications",
    description:
      "Access reports, advisories, case studies, and technical publications curated by Zigfly.",
  },
  "/services": {
    title: "Services",
    description:
      "Review Zigfly services in waste processing, remediation, BSFL conversion, and resource recovery.",
  },
  "/testimonials": {
    title: "Testimonials",
    description:
      "Read testimonials and partner perspectives on Zigfly's work and environmental outcomes.",
  },
  "/waste-management-showcase": {
    title: "Waste Management Showcase",
    description:
      "Explore Zigfly's waste management showcase and service presentation.",
  },
};

const ensureMetaTag = (name: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  return tag;
};

const RouteMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const entry = ROUTE_META[location.pathname] ?? DEFAULT_META;
    document.title = `${entry.title} | ${SITE_NAME}`;
    ensureMetaTag("description").content = entry.description;
  }, [location.pathname]);

  return null;
};

export default RouteMeta;

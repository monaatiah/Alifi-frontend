/**
 * Universal Page Renderer
 * Renders components from a CMS page_components array.
 * Each item has: { component_identifier, ordering, data, ... }
 * Header and Footer are always injected automatically.
 */

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { getComponentBySlug } from "@/helpers/componentRegistry";
import { PAGE_LAYOUTS } from "@/helpers/pageConfig";

const Header = dynamic(() => import("@/components/header/Index"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Index"), { ssr: false });

class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error(`Component failed to render: ${this.props.name}`, error);
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Render a single CMS component by its component_identifier
 */
const CMSComponentRenderer = ({ identifier }) => {
  const Component = getComponentBySlug(identifier);

  if (!Component) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`No component mapped for identifier: "${identifier}"`);
    }
    return null;
  }

  // Pass identifier so components can fetch their own block by CMS slug
  return (
    <ComponentErrorBoundary name={identifier}>
      <Component identifier={identifier} />
    </ComponentErrorBoundary>
  );
};

/**
 * Main Page Renderer
 * Always renders: Header → CMS components (sorted by ordering) → Footer
 */
export const PageRenderer = ({
  pageComponents = [],
  meta = {},
  seo = {},
  slug = "",
}) => {
  const pageData = useSelector((state) => state?.settings?.pageData || {});

  const getIdentifier = (comp) =>
    comp?.component_identifier ||
    comp?.component?.identifier ||
    comp?.component?.slug ||
    comp?.component_slug ||
    comp?.slug;

  const getNumericComponentId = (comp) => {
    const value = comp?.component_id || comp?.component?.id || comp?.id;
    const id = Number(value);
    return Number.isFinite(id) ? id : null;
  };

  const isInnerPage = slug !== "" && slug !== "home";

  // Sort CMS components by their ordering field
  const sortedComponents = useMemo(
    () => [...pageComponents].sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0)),
    [pageComponents]
  );

  const cmsIdentifiers = useMemo(
    () => sortedComponents.map(getIdentifier).filter(Boolean),
    [sortedComponents]
  );

  const componentIdToIdentifier = useMemo(() => {
    const map = new Map();

    const addSource = (source) => {
      if (!Array.isArray(source)) return;

      source.forEach((entry) => {
        const id = getNumericComponentId(entry);
        const identifier = getIdentifier(entry);

        if (id !== null && identifier && !map.has(id)) {
          map.set(id, identifier);
        }
      });
    };

    addSource(pageData?.config?.components);
    addSource(pageData?.config?.page_components);
    addSource(pageData?.page_components);
    addSource(pageComponents);

    return map;
  }, [pageData, pageComponents]);

  const resolvedIdentifiers = useMemo(() => {
    return sortedComponents
      .map((component) => {
        const directIdentifier = getIdentifier(component);
        if (directIdentifier) return directIdentifier;

        const componentId = Number(component?.component_id);
        if (Number.isFinite(componentId)) {
          return componentIdToIdentifier.get(componentId) || null;
        }

        return null;
      })
      .filter(Boolean);
  }, [sortedComponents, componentIdToIdentifier]);

  const validCmsIdentifiers = useMemo(
    () => resolvedIdentifiers.filter((identifier) => Boolean(getComponentBySlug(identifier))),
    [resolvedIdentifiers]
  );

  // Some CMS payloads only include numeric component_id without identifier metadata.
  // In that case, fall back to the known slug layout so sections still render.
  const fallbackIdentifiers = useMemo(() => {
    const layout = PAGE_LAYOUTS?.[slug] || PAGE_LAYOUTS?.page;
    if (!layout?.components) return [];

    return layout.components
      .map((component) => component?.slug)
      .filter((item) => item && item !== "header" && item !== "footer" && item !== "breadcrumb");
  }, [slug]);

  const usingFallbackIdentifiers = validCmsIdentifiers.length === 0;

  const renderIdentifiers = usingFallbackIdentifiers
    ? fallbackIdentifiers
    : validCmsIdentifiers;

  const hasBreadcrumbInCMS = useMemo(() => {
    const breadcrumbAliases = new Set([
      "breadcrumb",
      "shop_hero",
      "blogs_hero",
      "categories_hero",
      "hero_banner",
    ]);

    return validCmsIdentifiers.some((identifier) => breadcrumbAliases.has(identifier));
  }, [validCmsIdentifiers]);

  return (
    <>
      {/* Header is always first */}
      <ComponentErrorBoundary name="header">
        <Header />
      </ComponentErrorBoundary>

      {/* Breadcrumb is always shown on inner pages unless CMS already includes it */}
      {isInnerPage && !hasBreadcrumbInCMS && (
        <CMSComponentRenderer identifier="breadcrumb" />
      )}

      {/* CMS-managed components, rendered in ordering order */}
      {renderIdentifiers.map((identifier, idx) => {
        return (
          <CMSComponentRenderer
            key={`${identifier}-${idx}`}
            identifier={identifier}
          />
        );
      })}

      {/* Footer is always last */}
      <ComponentErrorBoundary name="footer">
        <Footer />
      </ComponentErrorBoundary>
    </>
  );
};

export default PageRenderer;

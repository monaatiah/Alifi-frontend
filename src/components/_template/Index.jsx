import React from "react";
import { Container } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useSelector } from "react-redux";
import { getComponentByIdentifier } from "@/helpers/functions";

// STEP 1: Replace "component_identifier" with the actual CMS component_identifier value
//         e.g. "hero_slider", "why_choose_us", "product_tabs", etc.
const CMS_IDENTIFIER = "component_identifier";

// STEP 2: Replace "template-section" with the component's CSS class name
const Index = () => {
  const { pageData } = useSelector((state) => state.settings);
  const data = getComponentByIdentifier(pageData?.page_components, CMS_IDENTIFIER);

  // data.data contains the CMS fields for this component
  // data.component contains component metadata

  return (
    <div className={styles["template-section"]}>
      <Container>
        {/* STEP 3: Build your UI using data.data fields */}
        <h2>{data?.data?.title}</h2>
        <p>{data?.data?.description}</p>
      </Container>
    </div>
  );
};

export default Index;

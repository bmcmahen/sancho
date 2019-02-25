/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem } from "../Breadcrumb";
import { Link } from "../Link";

export const BreadcrumbStories = storiesOf("Breadcrumb", module).add(
  "Basic usage",
  () => {
    return (
      <div css={{ display: "flex", justifyContent: "center" }}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="#">Watershed</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="#">Visual Teaching Strategies</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  }
);

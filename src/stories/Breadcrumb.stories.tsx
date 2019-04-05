/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Breadcrumbs, BreadcrumbItem } from "../Breadcrumbs";
import { Link } from "../Link";
import { ToggleDarkMode } from "./ToggleDarkMode";

export const BreadcrumbStories = storiesOf("Breadcrumb", module)
  .add("Basic usage", () => {
    return (
      <div css={{ display: "flex", justifyContent: "center" }}>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link href="#">Watershed</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="#">Visual Teaching Strategies</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    );
  })
  .add("Large", () => {
    return (
      <div css={{ display: "flex", justifyContent: "center" }}>
        <Breadcrumbs size="lg">
          <BreadcrumbItem>
            <Link href="#">Watershed</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href="#">Visual Teaching Strategies</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Settings</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    );
  });

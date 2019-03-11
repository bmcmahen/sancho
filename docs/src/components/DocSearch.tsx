/** @jsx jsx */
import { jsx, Global, css } from "@emotion/core"
import * as React from "react"
import { InputBase, theme, InputGroup, Icon } from "../../../src"
import "./DocSearch.css"
import { alpha } from "../../../src/Theme/colors"

export interface DocSearchProps {}

export const DocSearch: React.FunctionComponent<DocSearchProps> = props => {
  const [enabled, setEnabled] = React.useState()

  React.useEffect(() => {
    const w = window as any
    const docsearch = w.docsearch

    if (docsearch) {
      docsearch({
        apiKey: "976b020b43c68297729e9c18c6412e07",
        indexName: "sancho",
        inputSelector: "#doc-search",
        debug: true,
      })
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [])

  const [search, setSearch] = React.useState("")
  return (
    <form css={{ flex: "1" }} onSubmit={e => e.preventDefault()}>
      <Global
        styles={{
          ".ds-dropdown-menu": {},
          ".algolia-autocomplete": {
            width: "100%",
          },
          ".algolia-docsearch-suggestion--category-header": {
            textDecoration: "none",
            color: theme.colors.text.default,
            fontSize: `${theme.sizes[0]} !important`,
            fontWeight: 600,
          },
          ".algolia-docsearch-suggestion": {
            textDecoration: "none",
          },
          ".algolia-docsearch-suggestion--highlight": {
            boxShadow: "none !important",
            background: `${alpha(
              theme.colors.palette.blue.base,
              0.1
            )} !important`,
            color: `${theme.colors.palette.blue.dark} !important`,
          },
          ".algolia-autocomplete .ds-dropdown-menu": {
            border: "none",
            boxShadow: theme.shadows.md,
            maxWidth: "400px",
            minWidth: "300px",
            width: "315px !important",
            borderRadius: theme.radii.lg,
            transform: "translateX(13%)", // lameee hack for mobile
            lineHeight: 1.5,
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--category-header": {
            borderColor: theme.colors.border.muted,
          },
          ".algolia-autocomplete .ds-dropdown-menu [class^=ds-dataset-]": {
            border: "none",
            borderRadius: theme.radii.lg,
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column": {
            display: "none !important",
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--content": {
            float: "none",
            width: "100%",
            ":before": {
              display: "none",
            },
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--title": {
            marginBottom: 0,
            color: theme.colors.text.default,
            fontWeight: 500,
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--highlight": {
            background: alpha(theme.colors.palette.blue.base, 0.1),
            color: theme.colors.palette.blue.dark,
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--text": {
            color: theme.colors.scales.gray[6],
            fontSize: theme.sizes[0],
          },
          ".algolia-docsearch-suggestion--category-header-lvl0 .algolia-docsearch-suggestion--highlight": {
            background: "none !important",
            color: "#33363d !important",
          },
          ".algolia-autocomplete .algolia-docsearch-suggestion--no-results": {
            padding: "8px !important",
            display: "block",
          },
          [theme.breakpoints.sm]: {
            ".algolia-autocomplete .ds-dropdown-menu": {
              transform: "none",
              maxWidth: "400px",
              minWidth: "400px",
            },
          },
        }}
      />

      <div css={{ flex: 1, position: "relative" }}>
        <InputBase
          type="search"
          aria-label="Search documentation"
          id="doc-search"
          // disabled={!enabled}
          placeholder="Search..."
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSearch(e.currentTarget.value)
          }
          value={search}
          css={{
            width: "100%",
            borderRadius: "32px",
            paddingLeft: "2.5rem",
          }}
        />
        <Icon
          icon="search"
          css={{
            fill: theme.colors.palette.gray[3],
            position: "absolute",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </form>
  )
}

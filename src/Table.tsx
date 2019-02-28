/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import theme from "./Theme";
import { Layer } from "./Layer";

type SectionTypeVariants = "TableHead" | "TableBody";

interface TableSectionContextType {
  type: SectionTypeVariants;
}

const TableSectionContext = React.createContext<TableSectionContextType>({
  type: "TableHead"
});

const TableContext = React.createContext({ fixed: false });

const tableStyle = css({
  borderSpacing: 0,
  borderCollapse: "separate",
  width: "100%",
  fontFamily: theme.fonts.base,
  "-webkit-appearance": "none",
  "-webkit-font-smoothing": "antialiased",
  display: "table"
});

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  minWidth?: string;
  fixed?: string[];
}

export function Table({ children, minWidth, fixed }: TableProps) {
  return (
    <div
      css={{
        width: "100%",
        display: "block",
        overflowX: minWidth ? "auto" : "initial"
      }}
    >
      <table
        css={[
          tableStyle,
          { minWidth, tableLayout: fixed ? "fixed" : undefined }
        ]}
      >
        {fixed && (
          <colgroup>
            {fixed.map((width, i) => {
              return <col key={i} width={width} />;
            })}
          </colgroup>
        )}
        <TableContext.Provider value={{ fixed: fixed ? true : false }}>
          {children}
        </TableContext.Provider>
      </table>
    </div>
  );
}

interface TableHeadProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableHead({ children, ...other }: TableHeadProps) {
  return (
    <thead
      css={{
        display: "table-header-group"
      }}
      {...other}
    >
      <TableSectionContext.Provider value={{ type: "TableHead" }}>
        {children}
      </TableSectionContext.Provider>
    </thead>
  );
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  onClick?: () => void;
}

export function TableRow({ onClick, children, ...other }: TableRowProps) {
  const { type: tableSectionType } = React.useContext(TableSectionContext);

  const buttonProps = onClick
    ? {
        role: "button",
        tabIndex: 0
      }
    : {};

  return (
    <tr
      onClick={onClick}
      css={{
        height: tableSectionType === "TableHead" ? "31px" : "49px",
        display: "table-row",
        outline: "none",
        verticalAlign: "middle",
        cursor: onClick ? "pointer" : "default",
        ":hover": {
          background: onClick ? theme.colors.background.tint1 : "none"
        }
        // ":last-child *": {
        //   borderBottom: tableSectionType === "TableBody" ? "none" : undefined
        // }
      }}
      {...buttonProps}
      {...other}
    >
      {children}
    </tr>
  );
}

const tableCellAlignments = {
  right: css({
    textAlign: "right",
    flexDirection: "row-reverse"
  }),
  left: css({
    textAlign: "left"
  }),
  center: css({
    textAlign: "center"
  }),
  justify: css({
    textAlign: "justify"
  })
};

const tableCellVariants = {
  head: css({
    fontWeight: 500,
    fontSize: theme.sizes[0],
    color: theme.colors.text.muted
  }),
  body: css({
    fontWeight: 400,
    fontSize: theme.sizes[0],
    color: theme.colors.text.default
  })
};

type TableCellBaseProps = React.ThHTMLAttributes<HTMLTableHeaderCellElement> &
  React.TdHTMLAttributes<HTMLTableDataCellElement>;

interface TableCellProps extends TableCellBaseProps {
  align?: keyof typeof tableCellAlignments;
  variant?: keyof typeof tableCellVariants;
  component?: React.ReactType<TableCellBaseProps>;
}

export function TableCell({
  align = "left",
  variant,
  component,
  children,
  ...other
}: TableCellProps) {
  const { type: tableSectionType } = React.useContext(TableSectionContext);
  const { fixed } = React.useContext(TableContext);

  const Component =
    component || (tableSectionType === "TableHead" ? "th" : "td");

  const type = variant || (tableSectionType === "TableHead" ? "head" : "body");

  return (
    <Component
      css={[
        {
          zIndex: 4,
          position: "relative",
          borderBottom: "1px solid",
          borderColor:
            tableSectionType === "TableBody"
              ? theme.colors.border.muted
              : theme.colors.border.default,
          display: "table-cell",
          padding: `${theme.spaces.xs} ${theme.spaces.sm}`,
          [theme.breakpoints.md]: {
            paddingLeft: theme.spaces.md,
            paddingRight: theme.spaces.md
          },
          ":last-child": {
            paddingRight: theme.spaces.md
          }
        },
        fixed && {
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        },
        tableCellVariants[type],
        tableCellAlignments[align]
      ]}
      scope="col"
      {...other}
    >
      {children}
    </Component>
  );
}

interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function TableBody({ children, ...other }: TableBodyProps) {
  return (
    <tbody
      css={{
        display: "table-row-group"
      }}
      {...other}
    >
      <TableSectionContext.Provider value={{ type: "TableBody" }}>
        {children}
      </TableSectionContext.Provider>
    </tbody>
  );
}

interface ExpandingRowProps {
  content: (close: () => void) => React.ReactNode | React.ReactNode;
  children: React.ReactNode;
}

export function ExpandingRow({ content, children }: ExpandingRowProps) {
  const [selected, setSelected] = React.useState(false);

  function close() {
    setSelected(false);
  }

  function open() {
    setSelected(true);
  }

  return (
    <TableBody>
      <TableRow onClick={open}>{children}</TableRow>
      {selected && (
        <tr css={{ display: "table-row", height: "100px" }}>
          <td
            colSpan={React.Children.count(children)}
            css={{
              borderBottom: 0,
              width: "inherit",
              padding: 0,
              position: "relative"
            }}
          >
            <div
              css={{
                zIndex: 3,
                width: "inherit",
                position: "relative",
                paddingBottom: "24px"
              }}
            >
              <div
                css={{
                  position: "relative",
                  whiteSpace: "normal",
                  height: "auto",
                  display: "block",
                  paddingTop: "24px"
                }}
              >
                {typeof content === "function" ? content(close) : content}
              </div>
            </div>
            <Layer
              css={{
                position: "absolute",
                backgroundColor: "white",
                top: "-49px",
                left: "-16px",
                right: "-16px",
                borderRadius: theme.radii.md,
                bottom: 0,
                zIndex: 2
              }}
            >
              {null}
            </Layer>
          </td>
        </tr>
      )}
    </TableBody>
  );
}

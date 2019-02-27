// /** @jsx jsx */
// import { jsx } from "@emotion/core"
// import * as React from "react"
// import { StaticQuery, graphql } from "gatsby"

// interface PropsProps {}

// export function Props({  }: PropsProps) {
//   return (
//     <StaticQuery
//       query={graphql`
//         {
//           allComponentMetadata {
//             edges {
//               node {
//                 displayName
//                 composes
//                 description {
//                   id
//                 }
//                 props {
//                   name
//                   docblock
//                   defaultValue {
//                     value
//                     computed
//                   }
//                   type {
//                     name
//                     value
//                     raw
//                   }
//                   required
//                 }
//               }
//             }
//           }
//         }
//       `}
//       render={data => {
//         console.log("DATA", data)
//         return <div>Hello</div>
//       }}
//     />
//   )
// }

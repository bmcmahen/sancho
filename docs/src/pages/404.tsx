import * as React from "react"
import SEO from "../components/Seo"
import { Text, theme, Link } from "../../../src"

const NotFoundPage = () => (
  <div>
    <SEO title="404: Not found" />
    <Text css={{ display: "block", padding: theme.spaces.lg }}>
      We couldn't find this page. Why not check out the{" "}
      <Link href="/">homepage.</Link>
    </Text>
  </div>
)

export default NotFoundPage

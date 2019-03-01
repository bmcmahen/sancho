/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import { IconNames, Icon, IconName, theme, Tooltip } from "../../../src"

const keys: IconName[] = Object.values(IconNames) as IconName[]

interface IconListProps {}

export function IconList({  }: IconListProps) {
  console.log(keys)
  return keys.map(key => {
    return (
      <div css={{ display: "inline-block", margin: "1rem" }} key={key}>
        <Tooltip key={key} content={key}>
          <div>
            <Icon css={{ margin: theme.spaces.sm }} icon={key} />
          </div>
        </Tooltip>
      </div>
    )
  })
}

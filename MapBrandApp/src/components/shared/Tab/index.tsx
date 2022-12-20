import React, { memo, useEffect, useState } from 'react'
import * as SC from './styles'

const Tab = ({ children, onTabSelected }) => {
  const [itemId, setItemId] = useState(0)

  useEffect(() => {
    onTabSelected && onTabSelected(itemId)
  }, [itemId, onTabSelected])

  return (
    <SC.TabContainer>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          onClick: () => {
            setItemId(index)
          },
          selected: itemId === index
        })
      })}
    </SC.TabContainer>
  )
}

export const TabItem = memo(({ children, ...restProps }) => (
  <SC.TabItem {...restProps}>{children}</SC.TabItem>
))

export default Tab

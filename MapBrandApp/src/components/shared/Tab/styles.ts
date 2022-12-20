import styled from 'styled-components'

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  background: red;
  align-items: stretch;
`

const selectedColor = 'rgb(30,190,230)'
const defaultColor = 'transparent'

export const TabItem = styled.div`
  background-color: white;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 4px solid
    ${(props) => (props.selected ? selectedColor : defaultColor)};
`

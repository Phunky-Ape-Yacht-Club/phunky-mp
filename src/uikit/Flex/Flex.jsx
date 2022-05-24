import styled from '@emotion/styled'

export const Flex = (props) => <FlexDiv {...props}>{props.children}</FlexDiv>

const FlexDiv = styled.div((props) => ({
  display: props.container ? 'flex' : 'block',
  justifyContent: props.justify || 'flex-start',
  flexDirection: props.direction || 'row',
  flexGrow: props.grow || 0,
  flexBasis: props.basis || 'auto',
  flexShrink: props.shrink || 1,
  flexWrap: props.wrap || 'nowrap',
  flex: props.flex || '0 1 auto',
  alignItems: props.align || 'stretch',
  margin: props.margin || '0',
  padding: props.padding || '0',
  width: props.width || 'auto',
  height: props.height || 'auto',
  maxWidth: props.maxWidth || 'none',
  background: props.bg || 'none',
}))

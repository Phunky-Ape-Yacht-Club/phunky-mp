import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { SecondaryButton } from '../../../../uikit/Buttons/Buttons'

const handleEnter = (e, dispatch, i, submitInputQuery) => {
  const inputs = document.querySelectorAll(`input`)

  if (e.key === 'Backspace') {
    inputs[i].value = ''
    if (i !== 0) inputs[i - 1].focus()

    dispatch({ type: 'SET_ID_QUERY', value: inputs[i].value, index: i })
  } else if (e.key === 'Enter') {
    // On Enter
    submitInputQuery()
    e.preventDefault()
  } else {
    if (i === inputs.length - 1 && inputs[i].value !== '') {
      // Last input prevent from typing
      e.preventDefault()
    } else if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      // Numbers only
      inputs[i].value = e.key
      if (i !== inputs.length - 1) inputs[i + 1].focus()

      dispatch({ type: 'SET_ID_QUERY', value: inputs[i].value, index: i })
      e.preventDefault()
    } else if (e.keyCode > 64 && e.keyCode < 91) {
      // Prevent Letters
      e.preventDefault()
    }
  }
}

const PAYCInputBox = ({ name, dispatch, i, submitInputQuery }) => {
  return (
    <ApeSearchInput
      name={name}
      type="text"
      onKeyDown={(e) => {
        handleEnter(e, dispatch, i, submitInputQuery)
      }}
      maxLength={1}
      autoComplete="off"
    />
  )
}

const PAYCNumSearchInput = ({ state, dispatch }) => {
  const history = useHistory()
  const submitInputQuery = () => {
    const currentQuery = state.id.join('')
    history.push(`/details/${currentQuery}`)
  }

  useEffect(() => {
    // reset query on mount of component
    dispatch({ type: 'RESET_ID_QUERY' })
  }, [])

  return (
    <ApeSearchFieldSet>
      <ApeSearch>
        <legend>PAYC#</legend>
        <ApeSearchInputContainer id="ape">
          <PAYCInputBox
            id="first"
            name={'num-1'}
            dispatch={dispatch}
            i={0}
            submitInputQuery={submitInputQuery}
          />
          <PAYCInputBox
            id="second"
            name={'num-2'}
            dispatch={dispatch}
            i={1}
            submitInputQuery={submitInputQuery}
          />
          <PAYCInputBox
            id="third"
            name={'num-3'}
            dispatch={dispatch}
            i={2}
            submitInputQuery={submitInputQuery}
          />
          <PAYCInputBox
            id="fourth"
            name={'num-4'}
            dispatch={dispatch}
            i={3}
            submitInputQuery={submitInputQuery}
          />
        </ApeSearchInputContainer>
      </ApeSearch>
      <SecondaryButton onClick={submitInputQuery} text="GO" />
    </ApeSearchFieldSet>
  )
}

const ApeSearch = styled.div`
  legend {
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 800;
    font-style: italic;
    line-height: 1.2;
    color: #929600;
    margin-bottom: 0px;
    margin-right: 4px;
  }
`
const ApeSearchFieldSet = styled.fieldset`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const ApeSearchInputContainer = styled.div`
  display: flex;
  flex: 2;
  margin-right: 20px;
`

const ApeSearchInput = styled.input`
  display: flex;
  padding: 4px;
  margin-right: 4px;
  border-radius: 3px;
  color: white;
  background: rgb(44, 50, 58);
  border: 0;
  border: 4px solid transparent;
  width: 32px;
  height: 32px;
  &:invalid {
    box-shadow: none;
  }
  &:focus {
    outline: none;
    border: 2px solid #bfc500;
    background: black;
  }
`

export default PAYCNumSearchInput

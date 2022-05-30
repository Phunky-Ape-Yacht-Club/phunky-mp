import React from 'react'
import styled from '@emotion/styled'

import { PrimaryButton } from '../../../uikit/Buttons/Buttons'
import PAYCNumSearchInput from './PAYCNumSearchInput'

// Option Constants With Header as First Item
const bgOtions = [
  'Background',
  'Aquamarine',
  'Army Green',
  'Blue',
  'Gray',
  'New Punk Blue',
  'Orange',
  'Purple',
  'Yellow',
]
const clothesOptions = [
  'Clothes',
  'none',
  'Admirals Coat',
  'Bandolier',
  'Bayc T Black',
  'Bayc T Red',
  'Biker Vest',
  'Black Holes T',
  'Black Suit',
  'Black T',
  'Blue Dress',
  'Bone Necklace',
  'Bone Tee',
  'Caveman Pelt',
  'Cowboy Shirt',
  'Guayabera',
  'Hawaiian',
  'Hip Hop',
  'Kings Robe',
  'Lab Coat',
  'Leather Jacket',
  'Leather Punk Jacket',
  'Lumberjack Shirt',
  'Navy Striped Tee',
  'Pimp Coat',
  'Prison Jumpsuit',
  'Prom Dress',
  'Puffy Vest',
  'Rainbow Suspenders',
  'Sailor Shirt',
  'Service',
  'Sleeveless Logo T',
  'Sleeveless T',
  'Smoking Jacket',
  'Space Suit',
  'Striped Tee',
  'Stunt Jacket',
  'Tanktop',
  'Tie Dye',
  'Toga',
  'Tuxedo Tee',
  'Tweed Suit',
  'Vietnam Jacket',
  'Wool Turtleneck',
  'Work Vest',
]
const earringOptions = [
  'Earring',
  'none',
  'Cross',
  'Diamond Stud',
  'Gold Hoop',
  'Gold Stud',
  'Silver Hoop',
  'Silver Stud',
]
const eyesOptions = [
  'Eyes',
  '3d',
  'Angry',
  'Blindfold',
  'Bloodshot',
  'Blue Beams',
  'Bored',
  'Closed',
  'Coins',
  'Crazy',
  'Cyborg',
  'Eyepatch',
  'Heart',
  'Holographic',
  'Hypnotized',
  'Laser Eyes',
  'Robot',
  'Sad',
  'Scumbag',
  'Sleepy',
  'Sunglasses',
  'Wide Eyed',
  'X Eyes',
  'Zombie',
]
const furOptions = [
  'Fur',
  'Black',
  'Blue',
  'Brown',
  'Cheetah',
  'Cream',
  'Dark Brown',
  'Death Bot',
  'Dmt',
  'Golden Brown',
  'Gray',
  'Noise',
  'Pink',
  'Red',
  'Robot',
  'Solid Gold',
  'Tan',
  'Trippy',
  'White',
  'Zombie',
]
const hatOptions = [
  'Hat',
  'none',
  'Army Hat',
  "Baby's Bonnet",
  'Bandana Blue',
  'Bayc Flipped Brim',
  'Bayc Hat Black',
  'Bayc Hat Red',
  'Beanie',
  'Bowler',
  'Bunny Ears',
  'Commie Hat',
  'Cowboy Hat',
  'Faux Hawk',
  'Fez',
  "Fisherman's Hat",
  "Girl's Hair Pink",
  "Girl's Hair Short",
  'Halo',
  'Horns',
  'Irish Boho',
  "King's Crown",
  'Laurel Wreath',
  'Party Hat 1',
  'Party Hat 2',
  'Police Motorcycle Helmet',
  'Prussian Helmet',
  'S&m Hat',
  'Safari',
  "Sea Captain's Hat",
  "Seaman's Hat",
  'Short Mohawk',
  'Spinner Hat',
  'Stuntman Helmet',
  'Sushi Chef Headband',
  "Trippy Captain's Hat",
  'Vietnam Era Helmet',
  'Ww2 Pilot Helm',
]
const mouthOptions = [
  'Mouth',
  'Bored',
  'Bored Bubblegum',
  'Bored Cigar',
  'Bored Cigarette',
  'Bored Dagger',
  'Bored Kazoo',
  'Bored Party Horn',
  'Bored Pipe',
  'Bored Pizza',
  'Bored Unshaven',
  'Bored Unshaven Bubblegum',
  'Bored Unshaven Cigar',
  'Bored Unshaven Cigarette',
  'Bored Unshaven Dagger',
  'Bored Unshaven Kazoo',
  'Bored Unshaven Party horn',
  'Bored Unshaven Pipe',
  'Bored Unshaven Pizza',
  'Discomfort',
  'Dumbfounded',
  'Grin',
  'Grin Diamond Grill',
  'Grin Gold Grill',
  'Grin Multicolored',
  'Jovial',
  'Phoneme ooo',
  'Phoneme L',
  'Phoneme Oh',
  'Phoneme Vuh',
  'Phoneme Wah',
  'Rage',
  'Small Grin',
  'Tongue Out',
]

const onOptionHeaderClicked = (filterType, dispatch) => {
  dispatch({ type: 'TOGGLE_FILTER', value: filterType })
}

const onOptionClicked = (option, filterType, dispatch) => {
  dispatch({ type: 'SELECT', key: filterType, value: option })
}

const onClearFilters = (dispatch) => {
  dispatch({ type: 'RESET' })
}

const onToggleHideFilters = (dispatch) => {
  dispatch({ type: 'TOGGLE_HIDE_FILTERS' })
}

const mobileWidth = 700

const DropDown = ({ state, displayValue, options, filterType, dispatch }) => {
  return (
    <>
      <DropDownHeader
        onClick={() => onOptionHeaderClicked(filterType, dispatch)}
      >
        <DropDownTitle>{displayValue || options[0]}</DropDownTitle>
        <DropDownArrow
          open={state.selectorIsOpen && state.selectedFilter === filterType}
        />
      </DropDownHeader>
      {state.selectorIsOpen && state.selectedFilter === filterType && (
        <DropDownListContainer>
          <DropDownList>
            {options.map(
              (option, idx) =>
                idx !== 0 && (
                  <ListItem
                    onClick={() =>
                      onOptionClicked(option, filterType, dispatch)
                    }
                    key={Math.random()}
                  >
                    {option}
                  </ListItem>
                )
            )}
          </DropDownList>
        </DropDownListContainer>
      )}
    </>
  )
}

const Filter = ({ state, dispatch }) => {
  return (
    <Main>
      {!state.hideFilters && (
        <DropDownContainer>
          <DropDown
            state={state}
            displayValue={state.bg}
            options={bgOtions}
            filterType={'bg'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.clothes}
            options={clothesOptions}
            filterType={'clothes'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.earring}
            options={earringOptions}
            filterType={'earring'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.eyes}
            options={eyesOptions}
            filterType={'eyes'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.fur}
            options={furOptions}
            filterType={'fur'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.hat}
            options={hatOptions}
            filterType={'hat'}
            dispatch={dispatch}
          />
          <DropDown
            state={state}
            displayValue={state.mouth}
            options={mouthOptions}
            filterType={'mouth'}
            dispatch={dispatch}
          />
        </DropDownContainer>
      )}
      {!state.hideFilters && (
        <PAYCNumSearchInput state={state} dispatch={dispatch} />
      )}
      <ButtonContainer>
        {window.innerWidth <= mobileWidth && (
          <PrimaryButton
            onClick={() => onToggleHideFilters(dispatch)}
            text={state.hideFilters ? 'Show' : 'Hide'}
          />
        )}
        <PrimaryButton
          onClick={() => onClearFilters(dispatch)}
          text="Reset Filters"
        />
      </ButtonContainer>
    </Main>
  )
}

// Styles
const Main = styled('div')`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;

  @media (max-width: ${mobileWidth}px) {
    margin: 2rem 0;
    padding-right: 0;
  }
`

const DropDownContainer = styled('div')`
  width: 100%;
  @media (max-width: ${mobileWidth}px) {
    max-height: 10vh;
    overflow-y: auto;
  }
`

const DropDownHeader = styled('div')`
  padding: 0 0 5px;
  margin: 0 0 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  border-bottom: 0.1rem solid #bfc500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const DropDownTitle = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  font-style: italic;
  text-transform: uppercase;
  color: #bfc500;
`

const DropDownArrow = styled.div`
  position: relative;
  height: 10px;
  width: 10px;

  :before,
  :after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0.1rem;
    height: 100%;
    transition: all 0.25s;
  }

  :before {
    left: -10px;
    transform: ${(p) => (p.open ? 'rotate(45deg)' : 'rotate(-45deg)')};
    background-color: #bfc500;
  }

  :after {
    left: -4px;
    transform: ${(p) => (p.open ? 'rotate(-45deg)' : 'rotate(45deg)')};
    background-color: #bfc500;
  }
`

const DropDownListContainer = styled('div')`
  width: 100%;
  position: relative;
  top: -20px;
  z-index: 10;
`

const DropDownList = styled('ul')`
  width: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
  background: #bfc500;
  border: none;
  box-sizing: border-box;
  color: black;
  font-size: 0.8rem;
  font-weight: 500;
  height: 150px;
  overflow-y: scroll;
  cursor: pointer;
`

const ListItem = styled('li')`
  list-style: none;
  cursor: pointer;
  padding: 0 22px;
  display: block;
  line-height: 60px;
  transition: all 0.25s;
  font-size: 8px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  color: black;

  :hover {
    background: #929600;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`

export default Filter

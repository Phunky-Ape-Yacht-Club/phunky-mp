import { Menu, Dropdown } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { Pill } from '../Pills/Pills'

const SORT_VALUES = [
  { key: 'price_asc', value: 'Price: Low to High' },
  { key: 'price_desc', value: 'Price: High to Low' },
  { key: 'recent', value: 'Most Recent' },
]

const SortDropdown = ({ selectedSort, setSelectedSort }) => {
  const handleClick = ({ key }) => {
    if (setSelectedSort) {
      setSelectedSort(key)
    }
  }

  const getPillText = () => {
    const found = SORT_VALUES.find((item) => item.key === selectedSort)
    return found?.value || 'Sort By'
  }

  const menu = () => (
    <Menu onClick={handleClick}>
      {SORT_VALUES.map((item) => (
        <Menu.Item key={item.key}>{item.value}</Menu.Item>
      ))}
    </Menu>
  )

  // console.log(SORT_VALUES.find((item) => item.key === selectedSort))
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Pill text={getPillText()} icon={<FilterOutlined />} />
    </Dropdown>
  )
}

export default SortDropdown

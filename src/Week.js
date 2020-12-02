import PropTypes from 'prop-types'
import React from 'react'
import * as dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

class Week extends React.PureComponent {
  render() {
    let { date, ...props } = this.props
    let range = Week.range(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

Week.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

Week.defaultProps = TimeGrid.defaultProps

Week.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = (date, { localizer, inclusiveRange }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)
  return inclusiveRange.map(number => {
    return dates.range(start, end).find(function(d) {
      return d.getDay() == number
    })
  })
}

Week.title = (date, { localizer, inclusiveRange }) => {
  let [start, ...rest] = Week.range(date, { localizer, inclusiveRange })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Week

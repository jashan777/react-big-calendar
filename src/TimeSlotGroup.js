import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
      isTimeGutter,
    } = this.props

    const groupProps = getters ? getters.slotGroupProp() : {}
    return (
      <div className="rbc-timeslot-group" {...groupProps}>
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {}

          const slotPropClassName = isTimeGutter
            ? `gutter-${slotProps.className}`
            : slotProps.className

          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={clsx('rbc-time-slot', slotPropClassName)}
              >
                {renderSlot && renderSlot(value, idx)}
              </div>
            </Wrapper>
          )
        })}
      </div>
    )
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
  isTimeGutter: PropTypes.bool,
}

import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './RangeTest.module.scss'

const calcPosition = (value, maxValue) => Math.ceil((value * 100) / maxValue)
const centerPosition = (elemWidth, value, maxValue) => {
  const center = (elemWidth / 100) * calcPosition(value, maxValue) * -1
  return center
}

export const RangeTest = ({
  min,
  max,
  step = 1,
  value,
  onChange,
}) => {
  const thumbRef = useRef()
  const progressRef = useRef()
  const badgeRef = useRef()
  const [inputValue, setInputValue] = useState(value)

  const handlerChange = (event) => {
    const valueNum = parseInt(event.target.value, 10)
    setInputValue(valueNum)
    onChange(valueNum)
  }

  useEffect(() => {
    progressRef.current.style.width = `${calcPosition(inputValue, max)}%`
    thumbRef.current.style.left = `${calcPosition(inputValue, max)}%`
    badgeRef.current.style.left = `${calcPosition(inputValue, max)}%`

    const thumbWidth = thumbRef.current.getBoundingClientRect().width
    const badgeWidth = badgeRef.current.getBoundingClientRect().width

    const centerThumb = centerPosition(thumbWidth, inputValue, max)
    const centerBadge = centerPosition(badgeWidth, inputValue, max)

    thumbRef.current.style.marginLeft = `${centerThumb}px`
    badgeRef.current.style.marginLeft = `${centerBadge}px`
  }, [inputValue])

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.progress} ref={progressRef} />
      </div>
      <div className={styles.thumb} ref={thumbRef} />
      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={inputValue}
        onChange={handlerChange}
      />
      <span className={styles.badge} ref={badgeRef}>
        <span className={styles.inner}>{inputValue}</span>
      </span>
    </div>
  )
}
RangeTest.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
}
RangeTest.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  onChange: () => { },
}

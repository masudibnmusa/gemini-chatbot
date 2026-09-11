// components/ui/Skeleton.jsx
import './Skeleton.css'

function Skeleton({ width = '100%', height = '1rem', rounded = false }) {
  return (
    <div
      className={`skeleton ${rounded ? 'skeleton-rounded' : ''}`}
      style={{ width, height }}
    />
  )
}

export default Skeleton
interface LoadProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export function Loading({
  size = 'medium',
  color = '#3498db',
  speed = 'normal',
  className = ''
}: LoadProps = {}) {
  const sizeMap = {
    small: { width: '1rem', height: '1rem', borderWidth: '2px' },
    medium: { width: '2rem', height: '2rem', borderWidth: '3px' },
    large: { width: '3rem', height: '3rem', borderWidth: '4px' }
  };

  const speedMap = {
    slow: '1.5s',
    normal: '1s',
    fast: '0.5s'
  };

  const Style: React.CSSProperties = {
    display: 'inline-block',
    borderRadius: '50%',
    border: `${sizeMap[size].borderWidth} solid ${color}`,
    borderRightColor: 'transparent',
    animation: `spin ${speedMap[speed]} linear infinite`,
    ...sizeMap[size]
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div 
        style={Style} 
        className={`-load ${className}`}
        role="status"
        aria-label="loading"
      >
        <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>
          Loading...
        </span>
      </div>
    </>
  );
}
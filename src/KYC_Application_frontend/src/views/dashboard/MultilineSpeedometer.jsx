import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import * as d3 from 'd3';

function MultilineSpeedometer({ value }) {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1); // Increment key to force re-render
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      const text = d3.select(`.speedometer-${renderKey} .current-value`);
      if (text.empty()) return;

      text.text(''); // Clear existing text
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '-0.6em')
        .text('Fair');
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', '1.2em')
        .text(value);
    }, 0);
  }, [renderKey, value]);

  return (
    <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}> {/* Scale down the speedometer */}
      <ReactSpeedometer
        forceRender={true}
        maxSegmentLabels={1}
        customSegmentStops={[300, 680, 800]}
        segmentColors={['#ffa90f', '#f6f8fa']}
        needleColor={'#fff'}
        currentValueText=" " // Intentionally blank
        minValue={300}
        maxValue={800}
        value={value}
        ringWidth={15}
        textColor={'#000'}
        width={300} // Adjust the width to control size
        className={`speedometer-${renderKey}`} // Unique class name on each render
      />
    </div>
  );
}

export default MultilineSpeedometer;

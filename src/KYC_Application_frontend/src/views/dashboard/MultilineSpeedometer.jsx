import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import * as d3 from 'd3';

function MultilineSpeedometer({ value }) {

  useEffect(() => {
    setTimeout(() => {
      const text = d3.select('.speedometer .current-value');
      if (text.empty()) return;

      text.text(''); // Clear existing text
      text.append('tspan')
      .attr('x', 0)
      .attr('dy', '-3.4em') // Move text up
      .style('font-size', '16px') // Increase font size
      .text('Fair');
      text.append('tspan')
      .attr('x', 0)
      .attr('dy', '1.2em') // Position next line appropriately
      .style('font-size', '46px') // Consistent font size for the number
      .text(value);
    }, 0);
  }, [ value]);

  return (
    <div style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}> {/* Scale down the speedometer */}
      <ReactSpeedometer
        forceRender={true}
        maxSegmentLabels={1}
        customSegmentStops={[300, 680, 800]}
        segmentColors={['#ffa90f', '#f6f8fa']}
        needleColor="rgba(0,0,0,0)" 
        currentValueText=" " // Intentionally blank
        minValue={300}
        maxValue={800}
        value={value}
        ringWidth={15}
        textColor={'#000'}
        width={300} // Adjust the width to control size}
      className="speedometer"
      />
    </div>
  );
}

export default MultilineSpeedometer;

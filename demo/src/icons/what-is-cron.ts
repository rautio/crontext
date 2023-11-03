import { LitElement, html, unsafeCSS, svg } from 'lit';
import { customElement } from 'lit/decorators.js';

const createLine = ({
  x = 0,
  y = 0,
  text,
  secondText = '',
}: {
  x?: number;
  y?: number;
  text: string;
  secondText?: string;
}) => {
  const y2 = secondText ? 195 + y : 200 + y;
  return svg`
    <text x=${5 + x} y="25" fill="#fff" font-size="2em">
      *
    </text>
    <line
      x1=${10 + x}
      y1="20"
      x2=${10 + x}
      y2=${y2}
      style="stroke: #fff; stroke-width: 2;"
    />
    <line
      x1=${10 + x}
      y1=${y2}
      x2=${30 + x}
      y2=${y2}
      style="stroke: #fff; stroke-width: 2;"
    />
    <text x=${35 + x} y=${secondText ? 190 + y : 205 + y} fill="#fff">
      ${text}
    </text>
    ${
      secondText &&
      svg`
        <text x=${35 + x} y=${210 + y} fill="#fff">
          ${secondText}
        </text>
      `
    }
  `;
};

@customElement('what-is-cron')
export class WhatIsCron extends LitElement {
  render() {
    return html`
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="340"
        height="220"
      >
        ${createLine({ text: 'minute (0-59)' })}
        ${createLine({ text: 'hour (0 - 23)', x: 30, y: -30 })}
        ${createLine({ text: 'day of the month (1 - 31)', x: 60, y: -60 })}
        ${createLine({ text: 'month (1 - 12)', x: 90, y: -90 })}
        ${createLine({
          text: 'day of the week (0 - 6)',
          x: 120,
          y: -120,
          secondText: '(0 is Sunday, 6 is Saturday)',
        })}
      </svg>
    `;
  }
}

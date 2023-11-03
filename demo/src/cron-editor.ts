import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { parseText, nextDate, version, crontext } from 'crontext';
import styles from './cron-editor.css?inline';

console.log({ crontext: version });

@customElement('cron-editor')
export class App extends LitElement {
  static styles = unsafeCSS(styles);

  @state()
  private text = 'Every minute';

  @query('#copy-button') copyBtnSelector: HTMLSelectElement;

  private _handleCopyClick() {
    this.copyBtnSelector.shadowRoot.querySelector('button').click();
  }

  render() {
    const cron = parseText(this.text);
    const date = nextDate(cron, new Date());

    return html` <div class="container">
      <sl-input
        class="user-input"
        label="Type a schedule."
        value="Every minute"
      ></sl-input>
      <div class="copy-container">
        <sl-input
          class="cron-input"
          id="cron-input"
          readonly
          value=${cron}
          style="display:inline-block;"
          @click="${this._handleCopyClick}"
        ></sl-input>
        <sl-copy-button
          id="copy-button"
          label="Copy"
          class="copy-button"
          from="cron-input.value"
          error-label="Whoops, your browser doesn't support this!"
        ></sl-copy-button>
      </div>
      <div class="next-date">
        Next Occurrence:
        <span class="date">
          ${date.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
    </div>`;
  }
}

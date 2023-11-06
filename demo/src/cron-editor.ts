import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { parseText, nextDate, version, crontext } from 'crontext';
import debounce from './utils/debounce';
import styles from './cron-editor.css?inline';

console.log({ crontext: version });

const getUrlInput = (): string => {
  const url = new URL(window.location.href);
  const q = url.searchParams.get('q');
  if (q) {
    return q;
  }
  return '';
};

@customElement('cron-editor')
export class App extends LitElement {
  static styles = unsafeCSS(styles);

  @state()
  private text = getUrlInput() || 'Every minute';

  @query('#copy-button') copyBtnSelector: HTMLSelectElement;

  private handleCopyClick() {
    this.copyBtnSelector.shadowRoot.querySelector('button').click();
  }

  private handleUserInput(e) {
    this.text = e.target.value;
    this.updateUrl(e.target.value);
  }

  private updateUrl = debounce(this._updateUrl, 500);

  private _updateUrl(input: string) {
    const url = new URL(window.location.href);
    if (input) {
      url.searchParams.set('q', input);
    } else {
      url.searchParams.delete('q');
    }
    history.replaceState({}, '', url.href);
  }

  render() {
    const cron = parseText(this.text);
    const date = nextDate(cron, new Date());

    return html` <div class="container">
      <sl-input
        class="user-input"
        label="Type a schedule"
        value="${this.text}"
        @sl-input="${this.handleUserInput}"
      ></sl-input>
      <div class="cron-container">
        <sl-input
          class="cron-input"
          id="cron-input"
          label="Cron schedule"
          readonly
          value=${cron}
          style="display:inline-block;"
          @click="${this.handleCopyClick}"
        ></sl-input>
        <sl-copy-button
          id="copy-button"
          label="Copy"
          title="Copy"
          class="copy-button"
          from="cron-input.value"
          error-label="Whoops, your browser doesn't support this!"
          >Copy</sl-copy-button
        >
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

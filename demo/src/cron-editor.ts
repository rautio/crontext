import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './cron-editor.css?inline';

@customElement('cron-editor')
export class App extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <div class="container">
      <sl-input label="Type a schedule." value="Every minute"></sl-input>
    </div>`;
  }
}

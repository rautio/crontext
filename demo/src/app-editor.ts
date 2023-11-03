import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './app-editor.css';

@customElement('app-editor')
export class App extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html``;
  }
}

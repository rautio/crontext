import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './app-header.css?inline';
import github from './icons/github.svg?inline';

@customElement('app-header')
export class AppHeader extends LitElement {
  static styles = unsafeCSS(styles);
  render() {
    return html`
      <header class="app-header">
        <div class="logo">
          <a href="/">
            <image
              alt="Crontext"
              src="/images/logo.svg"
              width="32"
              height="32"
            />
            <span class="logo-text">Crontext</span>
          </a>
        </div>
        <a href="https://github.com/rautio/crontext">
          <div class="">
            <span>Github</span>
            <span class="">
              <img src=${github} class="github-logo" alt="Github logo" />
            </span>
          </div>
        </a>
      </header>
    `;
  }
}

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
        <div class="header-content">
          <div class="logo-container">
            <a href="/">
              <image class="logo" alt="Crontext logo." src="/images/logo.svg" />
              <span class="logo-text">Crontext</span>
            </a>
          </div>
          <a href="https://github.com/rautio/crontext">
            <span>Github</span>
            <img src=${github} class="github-logo" alt="Github logo" />
          </a>
        </div>
      </header>
    `;
  }
}

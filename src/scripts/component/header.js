/* 
    class ini berisi custom element banner judul aplikasi utama <app-title> dengan dynamic caption
    dan tab nagivasi halaman <nav-tab> dari statistik harian ke statistik wilayah
*/

import '../atom/app-title.js';
import '../atom/nav-tab.js';

class AppHeader extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `
            
            <app-title
                caption = "Monitoring Trend Kasus Covid19 di Indonesia">
            </app-title>
            
            <nav-tab></nav-tab>
            
        `;
    }
}

customElements.define("app-header", AppHeader);
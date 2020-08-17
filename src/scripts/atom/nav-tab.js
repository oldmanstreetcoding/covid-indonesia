/* 
    class ini berisi custom element untuk menampilkan tab navigasi dari statistik harian ke statistik wilayah
*/

class NavTab extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `

            <style>

                @media screen and (max-width: 400px) {

                    .text-tab {
                        font-size: 14px;
                    }
                
                }

            </style>

            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">

                    <a title="Statistik Kasus Harian" class="nav-item nav-link font-weight-bold active text-tab" id="nav-statistik-tab" data-toggle="tab" href="#nav-statistik" role="tab" aria-controls="nav-statistik" aria-selected="true">
                    
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bar-chart-line-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <rect width="4" height="5" x="1" y="10" rx="1"/>
                        <rect width="4" height="9" x="6" y="6" rx="1"/>
                        <rect width="4" height="14" x="11" y="1" rx="1"/>
                        <path fill-rule="evenodd" d="M0 14.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg> 
                    Harian</a>

                    <a title="Statistik Kasus Per Wilayah" class="nav-item nav-link font-weight-bold text-tab" id="nav-petaresiko-tab" data-toggle="tab" href="#nav-petaresiko" role="tab" aria-controls="nav-petaresiko" aria-selected="true">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg> 
                    Wilayah</a>

                </div>
            </nav>
        `;
    }
}

customElements.define("nav-tab", NavTab);
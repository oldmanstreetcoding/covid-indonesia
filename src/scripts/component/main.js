/* 
    class ini merupakan custom element untuk menampilkan bagian body/main halaman aplikasi (sesuai semantic html)
    Yaitu komponen statistik harian <app-statharian> dan komponen statistik wilayah <app-statwilayah>
*/

import '../atom/app-statharian.js';
import '../atom/app-statwilayah.js';

class AppMain extends HTMLElement {
    
    connectedCallback(){

        this.render();
        
    }
  
    render() {
        
        this.innerHTML = `
            
            <div class="row mt-3">

                <div class="col-md-12">

                    <div class="tab-content" id="nav-tabContent">

                        <div id="box-alert"></div>

                        <div class="tab-pane fade show active" id="nav-statistik" role="tabpanel" aria-labelledby="nav-statistik-tab">

                            <app-statharian></app-statharian>

                        </div>

                        <div class="tab-pane fade" id="nav-petaresiko" role="tabpanel" aria-labelledby="nav-petaresiko-tab">
                        
                            <app-statwilayah></app-statwilayah>

                        </div>
                        

                    </div>

                </div>

            </div>
        `;

    }
}

customElements.define("app-main", AppMain);
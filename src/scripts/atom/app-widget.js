/* 
    class berisi komponen untuk membuat widget box info update status covid,
    terdapat beberapa variabel di deklarasikan di connectedCallback untuk membuat komponen ini dinamis
*/

class AppWidget extends HTMLElement {
    connectedCallback(){
        
        this.judul      = this.getAttribute("judul") || null;
        this.icon       = this.getAttribute("icon") || null;
        this.totalkasus = this.getAttribute("totalkasus") || null;
        this.kasusbaru  = this.getAttribute("kasusbaru") || null;
        this.warna      = this.getAttribute("warna") || null;

        this.render();

    }
  
    render() {
        
        this.innerHTML = `
            <style>

                .box-wgt:hover {
                    box-shadow: 0 0 2px 3px DarkTurquoise !important;
                    cursor: pointer;
                }

                @media screen and (max-width: 400px) {

                    .text-total {
                        font-size: 27px;
                    }
                    
                }

            </style>
            
            <div class="card shadow box-wgt text-center ${this.warna} h-70 py-1">
                <div class="card-header">
                    <h6 class="font-weight-bold text-tab">
                        ${this.judul}
                    </h6>
                </div>
                <div class="card-body">
                    ${this.icon}
                    <div class="my-2">
                        <h2 class="text-total font-weight-bold" title="Total Kasus">
                            ${this.totalkasus}
                        </h2>
                    </div>
                    <h4 class="font-weight-bold" title="Total Penambahan Kasus Baru">
                        <svg width='1.5em' height='1.5em' viewBox='0 0 16 16' class='bi bi-plus' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                            <path fill-rule='evenodd' d='M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z'/>
                            <path fill-rule='evenodd' d='M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z'/>
                        </svg> 
                        ${this.kasusbaru}
                    </h4>
                </div>
            </div>
            
        `;
    }
}

customElements.define("app-widget", AppWidget);
/* 
    class ini berisi komponen footer halaman
*/

class AppFooter extends HTMLElement {
    connectedCallback(){
        this.render();
    }
  
    render() {
        this.innerHTML = `
            
            <style>
                @media screen and (max-width: 400px) {

                    #text-footer {
                        font-size: 13px;
                    }
                    
                }
            </style>

            <div class="row mb-3">
                <div class="col-md-12">
                    <div class="card shadow p-3 text-center text-secondary" id="text-footer">
                
                        Covid Indonesia &#169; 2020 &middot; Ahmad Furqan
                    
                    </div>
                </div>
            </div>
            
        `;
    }
}

customElements.define("app-footer", AppFooter);
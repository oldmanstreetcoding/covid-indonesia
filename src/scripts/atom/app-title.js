/* 
    class ini untuk membuat judul aplikasi utama dengan caption yang dinamis
*/

class AppTitle extends HTMLElement {
    connectedCallback(){
        this.caption = this.getAttribute("caption") || null;

        this.render();
    }
  
    render() {
        this.innerHTML = `
            <style>

                #app-title {
                    position: sticky;
                    top: 0px;
                }

                @media screen and (max-width: 1100px) {

                    #app-title {
                        font-size: 20px;
                    }

                }

                @media screen and (max-width: 400px) {

                    #app-title {
                        font-size: 15px;
                    }
                    
                }
                
            </style>
            
            <div id="app-title" class="card shadow text-center h4 font-weight-bold p-3 my-3 bg-covidupdate">
            
                ${this.caption}
            
            </div>
        `;
    }
}

customElements.define("app-title", AppTitle);
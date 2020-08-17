/* 
    class untuk membuat alert aplikasi yang berisi dyanimc caption dan theme warna alert
*/

class AppAlert extends HTMLElement {
    
    connectedCallback(){
        
        this.caption = this.getAttribute("caption") || null;
        this.theme   = this.getAttribute("theme") || null;

        this.render();
    }
  
    render() {
        this.innerHTML = `
            <div class="alert ${this.theme} alert-dismissible fade show" role="alert">
                ${this.caption}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;
    }
}

customElements.define("app-alert", AppAlert);
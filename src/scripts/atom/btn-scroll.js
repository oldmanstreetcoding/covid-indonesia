/* 
    class ini membuat tombol scrool to the top yang responsif dengan scroll halaman,
    sengaja di buat sebagai komponen terpisah, karena berlakuk global
*/

class BtnScroll extends HTMLElement {

    // method untuk menampilkan dan menyembunyikan tombol scroll to the top sesuai scrolling halaman
    scrollFunction() {

        const mybutton = document.querySelector("#goTop");

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }

    }

    // method untuk menampung event ketika tombol di klik, maka halaman otomatis smoot scrolling ke atas
    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    connectedCallback(){
        this.render();

    }
  
    render() {
        this.innerHTML = `

            <style>

                #goTop {
                    display: none; 
                    position: fixed; 
                    bottom: 20px; 
                    right: 30px; 
                    z-index: 99; 
                    border: none; 
                    outline: none; 
                    cursor: pointer; 
                    padding: 15px; 
                    border-radius: 10px; 
                    font-size: 18px;
                    opacity: 0.8;
                }
                
                #goTop:hover {
                    background-color: #555; 
                }

            </style>

            <button id="goTop" class="bg-covidupdate" title="Klik untuk Navigasi ke Atas">
                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M4.646 8.354a.5.5 0 0 0 .708 0L8 5.707l2.646 2.647a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"/>
                    <path fill-rule="evenodd" d="M8 11.5a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5z"/>
                </svg>
            </button>
            
        `;

        // arrow function untuk check scrolling halaman secara dinamis
        window.onscroll = () => {
            this.scrollFunction();
        }

        const mybutton = document.querySelector("#goTop");

        // arrow function untuk memberikan event pada tombol scroll
        mybutton.addEventListener('click', () => {
                
            this.topFunction();

        });

    }
}

customElements.define("btn-scroll", BtnScroll);
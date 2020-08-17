/* 
    class untuk membuat grafik trend kasus harian menggunakan apexchart dan
    menampilkan custom widget yang berisi info jumlah update kasus. Terdapat
    filtering data by month dan by year di sini
*/

import ApexCharts from 'apexcharts';
import Utils from '../utils/utils.js';
import './app-alert.js';
import './app-widget.js';

class AppStatharian extends HTMLElement {

    // method untuk membuat chart line trend kasus harian yang menerima variabel data, filter bulan dan filter tahun
    chartHarian (datas, bulanfilter = Utils.BulanSekarang(), tahunfilter = Utils.TahunSekarang()) {

        // start konversi data dari API sesuai format data apexchart
        let dtCategories    = [];
        let baruPositif     = [];
        let baruRawat       = [];
        let baruSembuh      = [];
        let baruMeninggal   = [];

        datas.forEach(data => {
                                        
            if(Utils.strtoMonth(data.tanggal) == bulanfilter && data.jumlahKasusKumulatif != null && Utils.strtoYear(data.tanggal) == tahunfilter) {
                dtCategories.push(Utils.strtoDate(data.tanggal));
                baruPositif.push(data.jumlahKasusBaruperHari);
                baruRawat.push(data.jumlahKasusDirawatperHari);
                baruSembuh.push(data.jumlahKasusSembuhperHari);
                baruMeninggal.push(data.jumlahKasusMeninggalperHari);
            }
            
        });

        let dtSeries = [
            {
                name: 'Positif',
                data: baruPositif
            },
            {
                name: 'Perawatan',
                data: baruRawat
            },
            {
                name: 'Sembuh',
                data: baruSembuh
            },
            {
                name: 'Meninggal',
                data: baruMeninggal
            }
        ];

        // end konversi data dari API sesuai format data apexchart

        let options = {
            series: dtSeries,
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [5, 5, 5, 5],
                curve: 'straight',
                dashArray: [0, 4, 5, 8]
            },
            title: {
                text: `${Utils.NamaBulan(bulanfilter)} ${tahunfilter}`,
                align: 'left'
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: dtCategories,
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val + " : ";
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " : ";
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " : ";
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val + " : ";
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            },
            theme: {
                mode: 'light', 
                palette: 'palette1', 
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            }
        };
  
        const chart = new ApexCharts(document.querySelector("#chartstat-harian"), options);
        
        chart.render();
    }

    // method untuk fetch data API dan menampilkan <app-alert> jika error atau tidak ada koneksi
    getDataHarian () {

        fetch(`https://indonesia-covid-19.mathdro.id/api/harian`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            this.render(result.data);
            this.chartHarian(result.data);
        })
        .catch(error => {
            this.render([]);
            this.chartHarian([]);

            const boxalert = document.querySelector("#box-alert");
            
            boxalert.innerHTML = `
                <app-alert
                    caption = "<strong>Data Tidak Ditemukan !</strong> Cek Kembali Koneksi Anda" 
                    theme   = "alert-danger"
                >
                </app-alert>
            `;

        });

    }

    connectedCallback(){
        
        this.getDataHarian();

    }
  
    render(datas) {

        let totalpositif    = 0;
        let totalrawat      = 0;
        let totalsembuh     = 0;
        let totalmeninggal  = 0;

        let barupositif     = 0;
        let barurawat       = 0;
        let barusembuh      = 0;
        let barumeninggal   = 0;

        datas.forEach(data => {
            
            // logic ini akan memfilter data yang tampil sesuai filter bulan atau tahun
            if(Utils.strtoDate(data.tanggal) == Utils.TanggalKemarin() && data.jumlahKasusKumulatif != null) {
                totalpositif = data.jumlahKasusKumulatif.toLocaleString();
                totalrawat = data.jumlahpasiendalamperawatan.toLocaleString();
                totalsembuh = data.jumlahPasienSembuh.toLocaleString();
                totalmeninggal = data.jumlahPasienMeninggal.toLocaleString();

                barupositif = data.jumlahKasusBaruperHari.toLocaleString();
                barurawat = data.jumlahKasusDirawatperHari.toLocaleString();
                barusembuh = data.jumlahKasusSembuhperHari.toLocaleString();
                barumeninggal = data.jumlahKasusMeninggalperHari.toLocaleString();
            }
            
        });
        
        this.innerHTML = `

            <style>

                @media screen and (max-width: 400px) {

                    #pilih-periode {
                        width: 100%;
                    }

                    #judul-statistik {
                        display: none;
                    }
                    
                }

            </style>
            
            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow mb-3">
                        <div class="card-header">
                                        
                            <h6 id="judul-statistik" class="mt-2 font-weight-bold text-covidupdate float-left text-tab">
                                Trend Harian Covid19
                            </h6>

                            <form id="pilih-periode" class="float-right form-inline">

                                <select id="txbulan" class="form-control mr-2 text-center" title='Pilih Bulan Untuk Melihat Trend Kasus Bulan Lainnya'>
                                    <option value='' selected> -- Pilih Bulan -- </option>
                                    <option value='1'>Januari</option>
                                    <option value='2'>Februari</option>
                                    <option value='3'>Maret</option>
                                    <option value='4'>April</option>
                                    <option value='5'>Mei</option>
                                    <option value='6'>Juni</option>
                                    <option value='7'>Juli</option>
                                    <option value='8'>Agustus</option>
                                    <option value='9'>September</option>
                                    <option value='10'>Oktober</option>
                                    <option value='11'>November</option>
                                    <option value='12'>Desember</option>
                                </select>

                                <select id="txtahun" class="form-control mr-2 text-center" title='Pilih Tahun Untuk Melihat Trend Kasus Tahun Lainnya'>
                                    <option value='' selected> -- Pilih Tahun -- </option>
                                    <option value='2020'>2020</option>
                                    <option value='2021'>2021</option>
                                </select>
                                
                            </form>
                        
                        </div>
                        
                        <div class="card-body text-center">
                            <div id="chartstat-harian"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-lg-3 mb-3">
                    <app-widget
                        warna       = "text-danger"
                        judul       = "Jumlah Positif s.d Kemarin"
                        icon        = "<svg width='3em' height='3em' viewBox='0 0 16 16' class='bi bi-person-plus' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                        <path fill-rule='evenodd' d='M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm4.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'/>
                        <path fill-rule='evenodd' d='M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z'/>
                        </svg>"
                        totalkasus  = ${totalpositif}
                        kasusbaru   = ${barupositif}
                    >
                    </app-widget>
                </div>

                <div class="col-lg-3 mb-3">
                    <app-widget
                        warna       = "text-info"
                        judul       = "Jumlah Dirawat s.d Kemarin"
                        icon        = "<svg width='3em' height='3em' viewBox='0 0 16 16' class='bi bi-house-door' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                        <path fill-rule='evenodd' d='M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z'/>
                        <path fill-rule='evenodd' d='M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'/>
                        </svg>"
                        totalkasus  = ${totalrawat}
                        kasusbaru   = ${barurawat}
                    >
                    </app-widget>
                </div>

                <div class="col-lg-3 mb-3">
                    <app-widget
                        warna       = "text-success"
                        judul       = "Jumlah Sembuh s.d Kemarin"
                        icon        = "<svg width='3em' height='3em' viewBox='0 0 16 16' class='bi bi-shield-plus' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                        <path fill-rule='evenodd' d='M5.443 1.991a60.17 60.17 0 0 0-2.725.802.454.454 0 0 0-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 0 0 8 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 0 0 2.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 0 0-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 0 1 2.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 0 1-2.418 2.3 6.942 6.942 0 0 1-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 0 1-1.007-.586 11.192 11.192 0 0 1-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 0 1 2.415 1.84a61.11 61.11 0 0 1 2.772-.815z'/>
                        <path fill-rule='evenodd' d='M8 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z'/>
                        <path fill-rule='evenodd' d='M7.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8z'/>
                        </svg>"
                        totalkasus  = ${totalsembuh}
                        kasusbaru   = ${barusembuh}
                    >
                    </app-widget>
                </div>

                <div class="col-lg-3 mb-3">
                    <app-widget
                        warna       = "text-dark"
                        judul       = "Jumlah Meninggal s.d Kemarin"
                        icon        = "<svg width='3em' height='3em' viewBox='0 0 16 16' class='bi bi-truck' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                        <path fill-rule='evenodd' d='M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v7h-1v-7a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5v1A1.5 1.5 0 0 1 0 10.5v-7zM4.5 11h6v1h-6v-1z'/>
                        <path fill-rule='evenodd' d='M11 5h2.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1v-1h1a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4.5h-1V5zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/>
                        <path fill-rule='evenodd' d='M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'/>
                        </svg>"
                        totalkasus  = ${totalmeninggal}
                        kasusbaru   = ${barumeninggal}
                    >
                    </app-widget>
                </div>

            </div>`;

            const PilihTahun = document.querySelector("#txtahun");
            
            // function expression ini untuk memberikan event pada tombol select by month atau by year
            PilihTahun.addEventListener('change', (event) => {
                
                let PilihBulan    = document.querySelector("#txbulan");

                // logic untuk default current month, jika bulan tidak di pilih
                if(PilihBulan.value == '') {
                    PilihBulan.value = Utils.BulanSekarang();
                }

                this.render(datas);
                this.chartHarian(datas, PilihBulan.value, event.target.value);

            });
        
    }
}

customElements.define("app-statharian", AppStatharian);
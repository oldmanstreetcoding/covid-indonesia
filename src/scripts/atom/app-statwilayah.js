/* 
    class ini untuk membuat komponen statistik chart kasus per provinsi menggunakan apexchart
    dan daftar kasus per provinsi menggunakan datatable.
*/

import $ from 'jquery';
import 'datatables.net/js/jquery.dataTables.min.js';
import ApexCharts from 'apexcharts';

class AppStatwilayah extends HTMLElement {

    // method untuk merubah table menjadi datatable
    datatable () {
        
        $('#tablepetaresiko').DataTable({
            searching : false,
            oLanguage : {
                sSearch : 'Pencarian : '
            },
            paging : true,
            pageLength : 10,
            info: false                          
        });

    }

    // method untuk membuat stacked chart bar dari data array datas yang diterimanya
    chartWilayah (datas) {
        
        // start konversi data dari variabel datas yang diterima dari API
        let dtCategories    = [];
        let dataPositif     = [];
        let dataRawat       = [];
        let dataSembuh      = [];
        let dataMeninggal   = [];

        datas.forEach(data => {                      
            if(data.provinsi != 'Indonesia') {
                dtCategories.push(data.provinsi);
                dataPositif.push(data.kasusPosi);
                dataRawat.push((data.kasusPosi-(data.kasusSemb+data.kasusMeni)));
                dataSembuh.push(data.kasusSemb);
                dataMeninggal.push(data.kasusMeni);
            }
        });

        let dtSeries = [
            {
                name: 'Positif',
                data: dataPositif
            },
            {
                name: 'Perawatan',
                data: dataRawat
            },
            {
                name: 'Sembuh',
                data: dataSembuh
            },
            {
                name: 'Meninggal',
                data: dataMeninggal
            }
        ];

        // end konversi data dari variabel datas yang diterima dari API

        let options = {
            series: dtSeries,
            chart: {
                type: 'bar',
                height: 600,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'Provinsi',
                categories: dtCategories,
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            },
            theme: {
                mode: 'light', 
                palette: 'palette3', 
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            }
        };
  
        let chart = new ApexCharts(document.querySelector("#chartstat-wilayah"), options);
        chart.render();
        
    }

    // method untuk fetching data dari API
    getDataWilayah () {
        
        fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            this.render(result.data);
        })
        .catch(error => {
            this.render([]);
        });

    };

    connectedCallback(){

        this.getDataWilayah();
        
    }
  
    render(datas) {

        let text = `
            
            <style>

                @media screen and (max-width: 1100px) {

                    #boxdaftarkasus {
                        overflow: scroll;
                    }
                }
            
            </style>
            
            <div class="row">
                    <div class="col-md-12">
                        <div class="card shadow mb-3">
                            <div class="card-header">
                                            
                                <h6 class="mt-2 font-weight-bold text-covidupdate float-left text-tab">
                                    Statistik Per Provinsi
                                </h6>
                            
                            </div>
                            
                            <div class="card-body text-center">
                                <div id="chartstat-wilayah"></div>
                            </div>
                        </div>
                    </div>
                </div>
                                    
                <div class="row">
                    <div class="col-md-12">
                        <div class="card shadow mb-3">
                            <div class="card-header">
                                            
                                <h6 class="mt-2 font-weight-bold text-covidupdate float-left text-tab">
                                    Table Per Provinsi
                                </h6>
                            
                            </div>
                            
                            <div id="boxdaftarkasus" class="card-body">
                                
                                <table class="table table-bordered table-striped table-sm" id="tablepetaresiko">
                                    <thead>
                                        <tr class="text-white" style="background-color:DarkTurquoise">
                                            <th class='text-center'>No</th>
                                            <th class='text-center'>Provinsi</th>
                                            <th class='text-center'>Positif</th>
                                            <th class='text-center'>Perawatan</th>
                                            <th class='text-center'>Sembuh</th>
                                            <th class='text-center'>Meninggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;

                                    let n = 0;
                                    datas.forEach(data => {
                                        
                                        if(data.provinsi != 'Indonesia') {
                                            
                                            n++;

                                            text+= `
                                                <tr>
                                                    <td class='text-center'>${n}</td>
                                                    <td>${data.provinsi}</td>
                                                    <td class='text-right'>${data.kasusPosi.toLocaleString()}</td>
                                                    <td class='text-right'>${(data.kasusPosi-(data.kasusSemb+data.kasusMeni)).toLocaleString()}</td>
                                                    <td class='text-right'>${data.kasusSemb.toLocaleString()}</td>
                                                    <td class='text-right'>${data.kasusMeni.toLocaleString()}</td>
                                                </tr>
                                            `;

                                        }
                                        
                                    });

                        text+= `</tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>`;

        this.innerHTML = text;

        // setelah halaman di render, maka ubah tabel menjadi datatable
        this.datatable();

        // setelah halaman di render, maka masukkan chart pada div #chartstat-wilayah
        this.chartWilayah(datas);

    }
}

customElements.define("app-statwilayah", AppStatwilayah);
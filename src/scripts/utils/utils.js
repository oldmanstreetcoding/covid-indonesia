/*
    class ini berisi beberapa static function untuk mencari dan mengkonversi 
    tanggal, bulan dan tahun
*/

class Utils {

    static TanggalKemarin () {
        let d = new Date();
        d.setDate(d.getDate() - 1);

        return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    }

    static BulanSekarang () {
        let d = new Date();

        return (d.getMonth()+1);
    }

    static TahunSekarang () {
        let d = new Date();

        return d.getFullYear();
    }

    static strtoDate(str) {
        let d = new Date(str);

        return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    }

    static strtoMonth(str) {
        let d = new Date(str);

        return (d.getMonth()+1);
    }

    static strtoYear(str) {
        let d = new Date(str);

        return d.getFullYear();
    }
    
    static NamaBulan(bulan) {

        const arrBulan      = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ]

        return arrBulan[bulan-1];
    }

}

export default Utils;
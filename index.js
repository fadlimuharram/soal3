const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const server = http.createServer(app);
const port = process.env.PORT || 3000;
const queries = require('./queries');
const request = require('request');

app.use(express.json({limit:'5mb'}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

app.get('/tes',(req,res)=>{
    res.send('hallo');
});

app.get('/api/mahasiswa',queries.getallMahasiswa);
app.post('/api/mahasiswa',queries.createMahasiswa);


app.get('/vrptest',(req,res)=>{
    var origin_addresses = "Tangerang";
    var destination_addresses = [
        "Tangerang",
        "Perkantoran+Hijau+Arkadia",
        "Tanjung+Barat",
        "Pejaten+Village+Mall",
        "Stasiun+Pasar+Minggu"
    ];

    var ruteTercepat = [];
    ruteTercepat.push(origin_addresses);

    var mergeDestination = '';

    // untuk melakukan merge string dengan tambahan | ,
    // namun pada akhir index tidak di tambah
    for(var x=0;x < destination_addresses.length;x++){
        mergeDestination += destination_addresses[x];
        if(x < destination_addresses.length-1){
            mergeDestination += '|';
        }
    }

    for(var y=0;y<destination_addresses.length-1;y++){
         // melakukan request berdasarkan destinasi yang digabungkan di atas
        // dan dengan origin atau posisi saat ini
        request("http://maps.googleapis.com/maps/api/distancematrix/json?destinations="+mergeDestination+"&origins="+destination_addresses[y],{ json: true },(err,res, body)=>{
            if(err) { return console.log(err) }
            var arr = body.rows[0].elements;
            var terpendek = 1000000000;
            var indexTerpendek;

            //melakukan looping setiap element pada row
            arr.forEach((element, i) => {
                // mengambil jarak di dalam array element
                var str = element.distance.text; 
                var jarak = '';
                
                // jika terdapat km maka di hapus huruf km nya dan di ubah ke dalam meter
                // jika terdapat m maka di hapus huruf m nya
                if(str.includes('km')){
                    jarak = str.replace(' km','')*1000;
                }else if(str.includes('m')){
                    jarak = str.replace(' m','');
                }

                // mencari rute terpendek
                if(!ruteTercepat.includes(destination_addresses[i]) && jarak > 1 && jarak < terpendek){
                    terpendek = jarak;
                    indexTerpendek = i;
                }

            
            });
            console.log(terpendek + ' | ' + indexTerpendek + ' | ' + destination_addresses[indexTerpendek]);
            ruteTercepat.push(destination_addresses[indexTerpendek]);
            //console.log(arr);
            console.log(ruteTercepat);
        });
    }
    
    // menunggu request selama 1 detik
    setTimeout(()=>{
        res.status(200).json(ruteTercepat);
    },2000);
    
    console.log(mergeDestination);
});


server.listen(port,()=>{
    console.log(`start pada port : ${port}`);
});
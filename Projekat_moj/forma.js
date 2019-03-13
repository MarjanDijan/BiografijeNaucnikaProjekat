var greska = document.getElementById('greska');
        var istrazivac = {};
        var istrazivaci = [];
        var dohvaceni = false;
        document.getElementById('izlistaj').addEventListener("click", izlistaj);
        document.getElementById('dodaj').addEventListener('click', function(){
            var f = document.getElementById('forma');
            //toggle
            if(f.getAttribute('class') == "hidden"){
                //ovo je kad je forma otvorena
                f.setAttribute('class',"");
                this.innerHTML = "Sakrij formu";
                var identifikator = document.getElementById('identifikator');
                identifikator.value = kreiraj_identifikator();
            }else{
                f.setAttribute('class', 'hidden');
                this.innerHTML = "Dodaj istrazivaca";
            }   
        });

        function kreiraj_identifikator(){
            //definise se najpre sta je identifikator
            //zelimo 4cifreni broj ili nisku
            var brojac_identifikatora = localStorage.getItem('id_istrazivaca');
            if(brojac_identifikatora == null){
                brojac_identifikatora = 1;
            }
            var formiraj_id = brojac_identifikatora.toString().split("");
            var br = brojac_identifikatora.toString();
            var duzina = br.length;
            while(duzina<4){
                formiraj_id.unshift(0);
                duzina++;
            }
            var id = formiraj_id.join("");
            console.log(id);
            brojac_identifikatora++;
            localStorage.setItem('id_istrazivaca', brojac_identifikatora);
            istrazivac.identifikator = id;
            return id;

        }

        function izlistaj(){
            if(!dohvaceni){
                var p = dohvati();
                if(p == null){
                    greska.innerHTML = "Nema podataka";
                }else{
                    for(i=0; i < p.length; i++){
                        kreiraj_tabelu(p[i],'tabela');
                    }
                }
            }
            var lista = document.getElementById('lista');
            lista.className = "shown";
            dohvaceni = true;
            return;
        }

        function kreiraj_tabelu(osoba, t){
            var tabela = document.getElementById(t);
            var red = document.createElement('tr');
            tabela.appendChild(red);
            for(svojstvo in osoba){
                var kol = document.createElement("td");
                kol.innerHTML = osoba[svojstvo];
                red.appendChild(kol);
            }
            return;
        }
        
        function dohvati(){
            var za_dohvatanje = localStorage.getItem("istrazivaci");
            var p = JSON.parse(za_dohvatanje);
            console.log(p);
            return p;
        }
        function smesti_istrazivaca(istrazivac){
            dohvaceni = false;
            var p = dohvati();
            if(p != null){
                p.push(istrazivac);
                za_smestanje = JSON.stringify(p);
            }else{
                istrazivaci.push(istrazivac);
                za_smestanje = JSON.stringify(istrazivaci);
            }
            localStorage.setItem("istrazivaci", za_smestanje);
            return;
        }

        function ime_provera(){
            var ime = document.getElementById('name').value;
            if(ime.trim().length == 0 || ime.indexOf(' ') == -1){
                greska.innerHTML = 'Neispravno uneto ime i prezime';
                return false;
            }
            for(i=0;i<ime.length;i++){
                if(ime[i] != " "){
                    if(ime[i].toUpperCase() == ime[i].toLowerCase()){
                        greska.innerHTML = 'Neslovni karakteri u imenu i prezimenu';
                        return false;
                    }
                }
            }
            istrazivac.ime_prezime = ime;
            return true;
        }

        function ustanova_provera(){
            var ustanova = document.getElementById('ustanova').value;
            if(ustanova.length == 0){
                greska.innerHTML = "Nema ustanove";
                return false;
            }
            istrazivac.ustanova = ustanova;
            return true;
        }

        function biografija_provera(){
            var biografija = document.getElementById('biografija').value;
            if(biografija.length == 0){
                greska.innerHTML = "Nema biografije";
                return false;
            }
            istrazivac.biografija = biografija;
            console.log(istrazivac);
            return true;
        }

        function provera(){
            if(ime_provera() && ustanova_provera() && biografija_provera()){ 
                console.log(istrazivac);
                smesti_istrazivaca(istrazivac);
                return true;
            }
            return false;
        }
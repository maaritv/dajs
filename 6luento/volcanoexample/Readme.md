## Tiedon kohdistaminen ja rikastaminen

1. Miten kaksi datasettiä voidaan kohdistaa yhteisellä avaimella
 * join_volcanos_and_eruptions.js

2. Miten voidaan rikastaa tietoa API:n yli verkosta
  * enrichVolcanosWithCountryNameOnline.js

3. Miten voidaan kohdistaa skeemat sääntöperusteisesti
 * join_eruptions_and_earthquakes.js


## aja ensin: 

- liitos tulivuoren nimellä

```
node join_volcanos_and_eruptions.js 
````

Tuloksena on input-hakemistoon uusi tiedosto, joka näkyy parhaiten selaimen "pretty-print-optiolla": volcanos_and_eruptions.json
jos tuloste on onnistunut, aja seuraavaksi: 

- sääntöpohjainen kohdistus

```
node  join_eruptions_and_earthquakes.js 
```

Tuloksena on output-hakemistoon: volcanoEruptionEarthquakes.json


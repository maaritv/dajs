## Node.js -sovellus, jolla voidaan luoda keksittyä dataa

Joskus pitää luoda kuvitteellista dataa, jolla on halutunlainen rakenne.
Oikealla datalla ei saa testata sovelluksia, mikäli data sisältää esim. henkilöistä tunnistamisen mahdollistavaa tietoa. Myös yritysten data on usein luonteeltaan luottamuksellista, jolloin sitä ei pidä käyttää testaamiseen.

### Ohjeet ajamiseen:

* Avaa VSC:ssa uusi terminaali valikosta: Terminal->New Terminal
* Siirry fakedatagenerator hakemistoon, jos et vielä siellä ole.
* Asenna package.json-tiedoston osoittamat tiedostot ajamalla:

```
  npm install
```

* Aja yksittäinen kooditiedosto:

```
node <skriptin nimi>
```

````
 node generate_book_loans.js
```
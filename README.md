# Vectorama 2016 CTF

##TL;DR(Mitä, Missä, Milloin)

Hacking compo, Vectorama 2016, perjantaina 10.6. klo. 13:00-24:00

IRC: #vectoura @ ircnet
Standi: [Oulu ICT Show Room](https://github.com/ouspg/vecto-ctf/blob/master/compo.png)

##Osa 1. pwnable.kr

[pwnable.kr](http://pwnable.kr/play.php) sivuilta löytyy lukuisia erityyppisiä hakkerointitehtäviä.

Tehtävien vaikeustaso vaihtelee ja jokainen tehtävä on pisteytetty vaikeustason mukaan.

Compon ensimmäisessä osassa tehtävänä on kerätä 10 pistettä, tai ratkaista 4 eri tehtävää.

Ratkaisut voi tulla esittämään compon järjestäjille: 

 * Oulu ICT Show Room [standille](https://github.com/ouspg/vecto-ctf/blob/master/compo.png)
 * #vectoura @ ircnet. 


Ensimmäisen osan ratkaiseminen toimii ilmoittautumisena toiseen osaan, ja lisäksi ensimmäiset 10 saavat palkinnoksi pullon Club Matea/Smoothien.  


##Osa 2. Web Application Hacking

[ctf.vectorama.fi](http://ctf.vectorama.fi) palvelimelle on pystytetty kolme hakkeroitavuudeltaan eri tasoista web applikaatiota.

login:
 * user: admin
 * password: password

[ctf.vectorama.fi:80](http://ctf.vectorama.fi:80):

 * Vaikeusaste: Helppo

[ctf.vectorama.fi:81](http://ctf.vectorama.fi:81):

 * Vaikeusaste: Keskitaso

[ctf.vectorama.fi:82](http://ctf.vectorama.fi:82):

 * Vaikeusaste: Vaikea

Jokaisessa applikaatiossa on 5 erillaista haavoittuvuutta:( Ja mahdollisesti muitakin. ;) )

Esimerkkejä:

 * Brute Force:
  * Kirjaudu sisään käyttäjänimellä: pablo 
  * Vinkki: Ratkaise omalla koneella. Salasana hash: 0d107d09f5bbe40cade3de5c71e9e9b7
 * SQL Injection:  
  * Hanki SQL-injektiota hyödyntäen käyttäjien salasanojen MD5 hashit
  * Plussaa tulee jos saa niistä käyttäjien salasanat hankittua
 * SQL Injection(Blind):
  * ...
 * XSS(Cross-Site-Scripting) reflected:
  * XSS haavoittuvuutta hyödyntäen, injektoi sivulle omaa HTML-koodia.
  * Huom: Selain saattaa estää tietynlaisen sisällön injektion.
 * XSS(Cross-Site-Scripting) stored:
  * Tallenna sivustolle viesti joka näkyy vierailijoiden selaimessa alert-popuppina.

Pisteitä saa esittelemällä järjestäjille erityyppisiä hyökkäyksiä mitä olet onnistunut toteuttamaan. 

Pisteisiin vaikuttaa applikaation vaikeustaso ja hyökkäyksen kekseliäisyys, omaperäisyys ja vaikeus. 

Pisteitä voi seurata osoitteessa: [vecto-ctf](https://ouspg.github.io/vecto-ctf/)

Compossa kaksi sarjaa:

 * "ammattilaiset" == Alan työkokemusta omaavat ja/tai Kapsi ry ja/tai JK ry aktiivit.
 * "harrastelijat" == Me muut :)

Eniten pisteitä keränneelle palkinnoksi: 

 * **ammattilaiset**: *Fame*, Club Matea ja terapiaseuraa

 * **harrastelijat**: *Fame*, Raspberry Pi 3 model B, Club Matea/Smoothie ja kutsu [OUSPG-open](https://github.com/ouspg/ouspg-open) puhujavieraaksi.

Koska kyseessä on haavoittuvaiset web applikaatiot, joihin hyökätään, saattavat ne aina välillä olla jumissa/kaatuneena.

Ongelmista voi ilmoittaa järjestäjille henk.koht., tai hihkaista IRC:ssä.

# Digitale Tafel
Het project Digitale Tafel is een casusopdracht binnen de desbetreffende hogeschool. De opdracht voor deze casus was om in combinatie met een digitale tafel en object interactie burgerparticipatie te bevorderen. De vorige casusgroepen hebben objectherkenning weten te realiseren met de digitale tafel, maar ook een aanbeveling gegeven aan een [repository](https://github.com/andypotato/tritra) die gecloned is. In deze casus is een simulatieomgeving gerealiseerd. Hopende, dat burgers zo laagdrempelig mogelijk kunnen deelnemen aan discussies betreffende ruimtelijke ordening. Deze repos is een Proof of Concept.

Deze omgeving toont een kaart, waarbij standaard is ingezoomt op de gemeente Valkenburg. Ook wordt op deze kaart de bestemmingslagen ingeladen als datalayer. Dit gebeurd met behulp van ArcGIS Javascript API.
Indien een object op de tafel geplaatst is dat herkent wordt, verschijnt een cirkel op de kaart, dat geluidsoverlast simuleert. 

Deze bevat bovendien een paar extra functies:
- Aflezen bestemmingsplan op basis van object positie
- Oplezen bestemmingsplan met Text-To-Speech
- De mogelijkheid om de kaart te bevriezen
- De mogelijkheid om de kaart te bewegen/in en uit te zoomen

## Inhoud:
1. Vereisten
2. Installatie
3. Gebruik
4. Architectuur
5. Development

### 1. Vereisten:
1. Voor de werking van de applicatie is een ArcGIS API Key is vereist. [Maak hier een gratis developer account aan.](https://developers.arcgis.com/sign-up/) Genereer vervolgens een API Key.
2. Een digitale tafel, met touchscreen herkenning van minimaal 10 punten, is vereist om de applicatie te draaien.
3. "smart" objecten die elektrische lading door geven naar 3 drukpunten met 2 identieke en één unieke hoek (een gelijkbenige driehoek). In het huidige voorbeeld zijn de hoekpunten [54, 91, 118] graden gebruikt.

Indien eis 2 en 3 niet mogelijk zijn, is het echter mogelijk om met 'single' touch/muis kliks de applicatie te gebruiken. Indien de applicatie puur getest moet worden voor debugging purposes, is eis 1 voldoende.
De applicatie kan opgestart worden zonder enkel van de vereisten, maar het laadt als gevolg de GIS data niet in.


### 2. Installatie
1. Intalleer [node.js](https://nodejs.org/en) en [GIT](https://git-scm.com/downloads) indien nog niet geïnstalleerd
2. Clone de desbetreffende repository:
```
git clone https://github.com/Daanziaat/DigitaleTafel
```
3. Navigeer naar ```DigitaleTafel\Object_recognizer\node_modules\tritra\dist\participatieTafel\Javascript\Secrets.js``` (niet in de terminal, maar zoeken in de directory via een IDE naar keuze),
voer hier de API key van jouw ArcGIS account in:
```export var arcgisKey = "<jouw API key>"```
4. Open de terminal in de IDE of elke command-line shell en navigeer naar de main directory
5. ```npm intall```
6. ```npm start```

### 3. Gebruik
Belangrijk is om de applicatie als een server te runnen. Dit gebeurd automatisch door ```npm start``` uit te voeren, waarbij gebruikt wordt gemaakt van de 'live-server' package.







- work in progress

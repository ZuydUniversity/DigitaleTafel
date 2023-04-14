# Digitale Tafel
Het project Digitale Tafel is een casusopdracht binnen de desbetreffende hogeschool. De doelstelling voor deze casus was om in combinatie met een digitale tafel en object interactie een simulatieomgeving te bouwen dat burgerparticipatie hoort te bevorderen. Denk bijvoorbeeld aan discussies met de gemeente betreffende ruimtelijke ordening. 
De vorige casusgroepen hebben objectherkenning weten te realiseren met de digitale tafel, maar ook een aanbeveling gegeven aan een [repository](https://github.com/andypotato/tritra) die gecloned is. In deze casus is een simulatieomgeving gerealiseerd. Hopende, dat burgers zo laagdrempelig mogelijk kunnen deelnemen aan discussies betreffende ruimtelijke ordening. Deze repos is een Proof of Concept.

Deze omgeving toont een kaart, waarbij standaard is ingezoomd op de gemeente Valkenburg. Ook wordt op deze kaart de bestemmingslagen ingeladen als datalayer. Dit gebeurd met behulp van ArcGIS Javascript API.
Indien een object op de tafel geplaatst is dat herkent wordt, verschijnt een cirkel op de kaart, dat geluidsoverlast simuleert (althans, dat hoort de cirkel voor te stellen). 

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

## 1. Vereisten:
1. Voor de werking van de applicatie is een ArcGIS API Key is vereist. [Maak hier een gratis developer account aan.](https://developers.arcgis.com/sign-up/) Genereer vervolgens een API Key.
2. Een digitale tafel, met touchscreen herkenning van minimaal 10 punten.
3. ["smart" objecten](https://medium.com/swlh/building-your-own-interactive-touchscreen-table-with-object-recognition-768b663ccce8) die elektrische lading door geven naar 3 drukpunten met 2 identieke en één unieke hoek (een gelijkbenige driehoek). In het huidige voorbeeld zijn de hoekpunten [54, 91, 118] graden gebruikt.

Indien eis 2 en 3 niet mogelijk zijn, is het echter mogelijk om met 'single' touch/muis kliks de applicatie te gebruiken. Indien de applicatie puur getest moet worden voor debugging purposes, is eis 1 voldoende.
De applicatie kan opgestart worden zonder enkel van de vereisten, maar het laadt als gevolg de GIS data niet in.


## 2. Installatie
1. Intalleer [node.js](https://nodejs.org/en) en [GIT](https://git-scm.com/downloads) indien nog niet geïnstalleerd (na installatie -> PC opnieuw opstarten)
2. Clone de desbetreffende repository (op een locatie waar je het wilt installeren):
```
git clone https://github.com/Daanziaat/DigitaleTafel
```
3. Navigeer naar de volgende file (indien eis 1 bekrachtigd moet worden):
```
participatieTafel\Secrets.js
``` 
(niet in de terminal, maar zoeken in de directory via een IDE naar keuze),
voer hier de API key van jouw ArcGIS account in:
```
export var arcgisKey = "<jouw API key>"
```
4. Open de terminal in de IDE of elke command-line shell en navigeer naar de root directory:
```
cd <path>\DigitaleTafel
```
5. Installeer de benodigde packages met de volgende command:
 ```
 npm intall
 ```
6. Voer de applicatie uit met de volgende command:
```
npm start
```

## 3. Gebruik
Belangrijk is om de applicatie als een server te runnen. Dit gebeurd automatisch door ```npm start``` uit te voeren, waarbij gebruikt wordt gemaakt van de 'live-server' package.

Indien de applicatie is opgestart, wordt (als het goed is) een GIS kaart getoond met een rode cirkel in het midden. Drie use-cases;

1. Click met de muis op de kaart om een cirkel toe te voegen.
2. Druk met de vinger op de kaart (op een touchscreen obviously) om een cirkel toe te voegen.
3. Plaats object met driehoeksherkenning op de tafel (touchscreen). Zorg ervoor dat de vingers het "geleidingsdeel" aanraken tijdens het plaatsen/bewegen/slepen van het object, gezien het elektriciteit moet laden om door de tafel herkent te worden.

Een paar overige settings worden aangeraden:
- Druk op F11 om alleen de webapplicatie te zien (dus de tabs etc. zijn niet zichtbaar)
- Windows 10: [Schakel Three-finger gestures uit](https://www.tenforums.com/tutorials/148114-how-enable-disable-touchpad-multifinger-gestures-windows-10-a.html), om te voorkomen dat de objectherkenning gaat buggen

## 4. Architectuur
**Main dish**

De onderste component diagram toont de werking zo'n beetje in a nutshell.

![ComponentDiagramLj3Blok3 (2)](https://user-images.githubusercontent.com/74657735/231879189-411d26fa-1b5c-4d24-8ee4-d43eb3c93a7d.png)

De logica om de functionaliteiten werkend te krijgen (die dus tijdens de casus zijn ontwikkeld) begeven zich in ```DigitaleTafel/Object_recognizer/node_modules/tritra/dist/participatieTafel/```, dat in de diagram gevisualiseerd is. Het is afhankelijk van ```js/tritra.js```, dat de objectherkenning regelt.

**Extra leuke info**

De webpagina wordt via de "live-server" package ingeladen in ```public/index.html``` (het zoekt standaard index.html indien "live-server" getriggered wordt in de root directory. Het gebruik van de "public" folder blijkt een algemene use-case te zijn voor static web apps om de html files in te zetten (citation needed)).

De ```npm start``` command werkt doordat in ```DigitaleTafel/package.json``` de script ervoor is ingesteld als:
```
"scripts": {
    "start": "node -r dotenv/config node_modules/live-server/live-server.js --port=8080 --entry-file=public/index.html"
  }
```
Indien er errors zich ineens zouden voordoen bij ```npm start```, kunnen in ```DigitaleTafel/package.json``` nog settings getweaked worden.

Alle dependencies zijn als het goed is ook vernomen in de package.json en package-lock.json in de root directory.

## 5. Development
Visual Studio Code als IDE wordt aangeraden om erop te runnen (andere IDE's zouden in theorie ook moeten werken, maar die zijn niet getest). Ook wordt aangeraden om met Windows te werken, maar nogmaals: in theorie zou Linux en MacOS ook moeten werken. Deze applciatie is op meerdere Windows PC's getest, waarbij deze succesvol zijn doorlopen. Inprincipe is dat alles wat nodig is om deze applicatie verder te ontwikkelen.

Bugs die er nog in zitten:
- Bij uitzoomen verdwijnt de bestemmingsplanlaag
- Je kan op de 'spreek knop' spammen als je dat leuk vind om te doen
- Indien uitgezoomd -> effects bij plaatsing heeft dezelfde scaling
- Normaliter hoor je een "kort" effectje te zien na plaatsing van het object. Dit werkte niet optimaal en door gebrek aan tijd is deze helaas niet geïmplementeerd. Het effectje kan getriggered worden met een click event, maar geen touch.

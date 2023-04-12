# Digitale Tafel
Het project de Digitale Tafel is een casusopdracht binnen de Design Science Research minor binnen Zuyd Hogeschool. De opdracht voor deze casus was om in combinatie met een digitale tafel en object interactie burgerparticipatie te bevorderen. De vorige casusgroepen hebben objectherkenning weten te realiseren met de digitale tafel. In deze casus is een simulatieomgeving gerealiseerd. Hopende, dat burgers zo laagdrempelig mogelijk kunnen deelnemen aan discussies betreffende ruimtelijke ordening. Deze repos is een Proof of Concept.

Deze omgeving toont een kaart, waarbij standaard is ingezoomt op de gemeente Valkenburg. Ook wordt op deze kaart de bestemmingslagen ingeladen als datalayer. Dit gebeurd met behulp van ArcGIS Javascript API.
Indien een object op de tafel geplaatst is dat herkent wordt, verschijnt een cirkel op de kaart, dat geluidsoverlast simuleert. 


## Inhoud:
1. Vereisten
2. Installatie
3. Gebruik
4. Architectuur
5. Development

### Vereisten:
1. Voor de installatie een ArcGIS API Key is vereist. [Maak hier een gratis account aan.](https://developers.arcgis.com/sign-up/)
2. Een digitale tafel, met touchscreen herkenning van minimaal 10 punten, inclusief een intel NUC is vereist om de applicatie te draaien

### Installatie
1. Intalleer [node.js](https://nodejs.org/en)
2. Clone de desbetreffende repository:
```
git clone https://github.com/Daanziaat/DigitaleTafel
```
3. Open de terminal in de IDE of elke command-line shell en navigeer de main directory
4. Navigeer naar ```DigitaleTafel\Object_recognizer\node_modules\tritra\dist\participatieTafel\Javascript\Secrets.js``` (niet in de terminal, maar zoeken in de code zelf),
voer hier de API key in:
```export var arcgisKey = "<jouw API key>"```
5. ```npm intall```
6. ```npm start```

### Gebruik
<work in progress>

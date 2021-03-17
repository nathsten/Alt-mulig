# Kravspek


## Overordnet beskrivelse
Vi skal lage en kalender.
Den skal kunne vise måned, år og uker.

## Hensikt
Læringsformål.

## Funksjonelle krav
Helt konkrete punkter om hvordan systemet skal fungere. Disse punktene er ofte nummererte eller i det minste i listeform. Ofte grupperer man også sammen relaterte krav i hovedpunkter og underpunkter, slik at listen består av flere nivåer.

1. Skal ha en månedsvisning
    1. Skal vise navn på dager øverst
    1. Skal markere søndager
1. Skal vise oversikt for ett år
    1. Skal vise 12 måneder
1. Skal kunne bla mellom måneder.
1. Skal kunne bla mellom år
1. Skal kunne lagre notat på en dato

### Rammer
 Når skal ting være ferdig, og hvor mye ressurser i form av penger og arbeidstid har vi tilgjengelig?
 1. Tid: ferdig før påske

### Ord og uttrykk
 En beskrivelse av hva vi legger i ord og uttrykk som benyttes i systemet, slik at alle er enige om hva vi snakker om.
* Måned - ca 30 dager
* Uke - 7 dager
* År - 52 uker eller 12 måneder

### Brukere
 Hvem skal bruke systemet, og hvordan skal de bruke det? Hva er forutsetningene til de ulike brukerne?
 * Enbrukersystem
 * Data lagres lokalt på brukers maskin

### Avhengigheter
 Skal systemet kjøre på spesiell maskinvare, eller skal det integreres mot eksisterende komponenter?
* Krever moderne nettleser med støtte for localStorage


### Systemkrav
 Hva kreves av sikkerhet, oppetid, vedlikehold, ytelse osv.?
 * Krever oppdatering av brukers nettleser

 # Planlegging

 ## Brukergrensesnitt

 ### Wireframe for måned

 Figuren viser grensesnittet som brukeren ser ved månedsvisning.

```
        <    2021  >
        <   April  >

     Ma Ti On To Fr Lø Sø
      1  2  3  4  5  6  7
      8  9 10 11 12 13 14
     15 16 17 18 19 20 21
     22 23 24 25 26 27 28
```
# Stórt Verkefni 2

Annað af stórum skilaverkefnum í Vefforritun1 2017. Síða sem inniheldur myndbönd.

## Slóð á síðu

Hægt er að nálgast síðunna í keyrslu  eftirfarandi slóðum:

## Uppsetning

Verkefnið er opið öllum sem vilja halda áfram að þróa það og eru nokkur og er skynsamlegt að nota þau tæki og tól sem verkefnið er upprunalega byggt á.

Fyrst þarf að hlaða niður zip skrá sem inniheldur allar skrárnar. Hægt er að gera það efst á síðunni eða hægt er að líma og keyra eftirfarandi skipun:

```
git clone https://github.com/arnar44/stort-verkefni2.git
```

### Tæki og tól
Verkefnið er unnið með pakkastjórnun:
* [Node.js](https://nodejs.org/en/) - Node Package Controll

Sem þarf að sækja (ef það er ekki til staðar)

Síðan er eftirfarandi skipun keyrð í sömu möppu og verkefnið:

```
npm install
```
Þá er náð í pakka sem í samræmi við það sem er talið upp í
* [package.json](https://github.com/arnar44/stort-verkefni2/blob/master/package.json) - Skrá sem skilgreinir pakka og dependency sem eru notaðir í verkefni

Hægt að er lesa package.json skránna og þar sjást tólin sem eru notuð:
* [Babel](https://babeljs.io/) - Javascript þýðandi (e.compiler).
* [Eslint](https://eslint.org/) - Javaskcript linter
* [Sass](http://sass-lang.com/) - Css extention language (Syntactically Awesome Style Sheets)
* [Sylelint](https://stylelint.io/user-guide/) - Css linter
* [BrowserSync](https://www.browsersync.io/) - Synchronised browser testing

### Hvernig virka tólin?
* í möppunni js  eru .js skrár skrár sem innihalda kóða eftir [ES2015](https://babeljs.io/learn-es2015/) staðlinum sem er framlenging á hinum hefbundna javascript kóða. Basicly fullt af flottum leiðum til að skrifa kóða en ekki allir vafrar styðja þennan staðal :(. Engar áhyggjur. Babel þýðir ES2015 yfir í hefbundin javascipt kóða sem er geymdur í script-compiled.js skránni. script-compiled.js.map skráin er mappið frá ES2015 yfir í hefbundið javascipt. Þið viljið láta html sækja script-compiled.js skránna, thats all. Það er reyndar ein .json skrá en hún geymir upplýsingar um myndböndin en hún er ekki þýdd (því hún er ekki .js skrá)

* Á "svipaðan" hátt þýðir Sass nýtískulegan "css" kóða yfir í hefbindinn.

* Eslint birtir allar villur (eða allt sem honum finnst vitlaust) í skrám sem eru í js möppunni. Keyrt með eftirfarandi skipun:
```
npm run eslint
```
* Stylelint birtir á sama hátt allt sem honum finnst vitlaust eða að betur mætti gera í .scss skrám. Keyrt með eftirfarandi skipun:
```
npm run stylelint
```

* Browsersync leyfir þér að skoða vefsíðuna á meðan þú vinnur í henni. Hún opnar vefþjón og þú hostar basicly sjálfan þig. Síðan þín er á netinu en hún er samt ekki á netinu. Hún er bara aðgengileg þeim tengdum sama neti og þú!
Til að keyra Sass, Babel og Browser sync er eftirfarandi skipun sleginn inn:
```
npm run dev
```

## Höfundar

* **Arnar Pétursson** - arp25@hi.is
* **Freyr Saputra Daníelsson** - fsd1@hi.is



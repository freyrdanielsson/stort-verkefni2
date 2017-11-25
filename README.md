# Stórt Verkefni 2

Annað af stórum skilaverkefnum í Vefforritun1 2017. Síða sem inniheldur myndbönd.

## Slóð á síðu

Hægt er að nálgast síðuna í keyrslu á eftirfarandi slóðum:
* [Heimasvæði Arnars](https://notendur.hi.is/arp25/vefforritun/stortverkefni2/)

* [Heimasvæði Freys](https://notendur.hi.is/fsd1/vefforritun/Stort-verkefni2/Myndbandaleigan/)

## Uppsetning

Verkefnið er opið öllum sem vilja halda áfram að þróa það og eru nokkur og er skynsamlegt að nota þau tæki og tól sem verkefnið er upprunalega byggt á.

Fyrst þarf að hlaða niður zip skrá sem inniheldur allar skrárnar. Hægt er að gera það efst á síðunni eða hægt er að líma og keyra eftirfarandi skipun:

```
git clone https://github.com/arnar44/stort-verkefni2.git
```

* index.html er forsíðan (Það er rétt, þó það sé eiginlega engin kóði!). Hún er byggð á video.js sem er í js möppunni, sem er þýtt í video-compiled.js og stíluð af styles.css.
* Myndbadsspilarinn fyrir hvert myndband er player.html byggður á playerscript.js sem er þýtt í player-compiled.js og stílaður af styles.css.

* Að grafa niður í styles.css er vesen. Í sass möppunni eru skrár með lýsandi nöfnum og hægt er að sjá þar hvernig hlutir eru stílaðir. Sass er því eiginlega sundurliðun á styles.css sem er síðan tekin saman í styles.scss og svo þýdd í styles.css.

* Ef þér langar að bæta við myndbandi skoðaðu þá videos.json í js möppunni. Þú einfaldlega setur myndbandið þitt (sem skal vera .mp4 skrá) í videos möppuna og síðan bætiru við upplýsingum um myndbandið þitt í videos.json skránna líkt og gert er fyrir hin myndböndin.

### Tæki og tól
Verkefnið er unnið með pakkastjórnun:
* [Node.js](https://nodejs.org/en/) - Node Package Controll

Sem þarf að sækja (ef það er ekki til staðar)

Síðan er eftirfarandi skipun keyrð í sömu möppu og verkefnið:

```
npm install
```
Þá er náð í pakka sem eru í samræmi við það sem er talið upp í
* [package.json](https://github.com/arnar44/stort-verkefni2/blob/master/package.json) - Skrá sem skilgreinir pakka og dependency sem eru notaðir í verkefni

Hægt að er lesa package.json skránna og þar sjást tólin sem eru notuð:
* [Babel](https://babeljs.io/) - Javascript þýðandi (e.compiler).
* [Eslint](https://eslint.org/) - Javaskcript linter
* [Sass](http://sass-lang.com/) - Css extention language (Syntactically Awesome Style Sheets)
* [Sylelint](https://stylelint.io/user-guide/) - Css linter
* [BrowserSync](https://www.browsersync.io/) - Synchronised browser testing

### Hvernig virka tólin?
* í möppunni js  eru .js skrár skrár sem innihalda kóða eftir [ES2015](https://babeljs.io/learn-es2015/) staðlinum sem er framlenging á hinum hefbundna javascript kóða. Basicly fullt af flottum leiðum til að skrifa kóða en ekki allir vafrar styðja þennan staðal :(. Engar áhyggjur. Babel þýðir ES2015 yfir í hefbundin(oldschool) javascript kóða sem er geymdur í -compiled.js skrám. script-compiled .js.map skrárnar eru mappið frá ES2015 yfir í hefbundið javascipt. Þið viljið láta index.html sækja video-compiled.js skránna og player.html sækja player-compiled.js skránna, thats all. Það er reyndar ein .json skrá en hún geymir upplýsingar um myndböndin en hún er ekki þýdd (því hún er ekki .js skrá)

* Á "svipaðan" hátt þýðir Sass nýtískulegan "css" kóða yfir í hefbindinn.

* Eslint birtir allar villur (eða allt sem honum finnst vitlaust) í skrám sem eru í js möppunni. Hægt er að breyta eða slökkva  reglum í .eslintrc.js skránni. Keyrt með eftirfarandi skipun:
```
npm run eslint
```
* Stylelint birtir á sama hátt allt sem honum finnst vitlaust eða að betur mætti gera í .scss skrám. Hægt er að breyta eða slökkva  reglum í .stylelintrc skránni. Keyrt með eftirfarandi skipun:
```
npm run stylelint
```

* Browsersync leyfir þér að skoða vefsíðuna á meðan þú vinnur í henni. Hún opnar lítinn vefþjón á þinni eigin vél og þegar þú beytir .js skrá, .scss skrá eða index.html skránni þá endurhleður síðan sig og þ sérð breytingarnar strax.
```
npm run dev
```

## Höfundar

* **Arnar Pétursson** - arp25@hi.is - Hugbúnaðarverkfræðinemi
* **Freyr Saputra Daníelsson** - fsd1@hi.is - Hugbúnaðarverkfræðinemi



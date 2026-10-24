# Dein persönliches Wiki — Jekyll

Das bestehende, flache Wiki-Design mit gemeinsamem Menü, Suche und Leseeinstellungen. Beiträge schreibst du als Markdown. Du brauchst kein zusätzliches Theme.

## Einmal auf GitHub einrichten

1. Entpacke das Quellpaket und kopiere **den gesamten Inhalt** des Ordners in dein Repository. `_config.yml`, `Gemfile` und `index.md` müssen im obersten Verzeichnis liegen. Auch `.github/workflows/pages.yml` muss mit hochgeladen werden; manche Dateiansichten verstecken Ordner mit einem Punkt am Anfang.
2. Wenn du die alte HTML-Version im selben Repository ersetzt: Die alte `index.html`, `beitrag.html` und deren andere lose Dateien durch dieses Paket ersetzen. Insbesondere dürfen nicht `index.html` und `index.md` parallel die Startseite erzeugen. Dieses Paket enthält bereits eine neue `beitrag.html` als Weiterleitung für den alten Beispiellink.
3. Unter **Settings → Pages → Build and deployment → Source** wählst du **GitHub Actions**.
4. Speichere die Dateien im Standardbranch. Der enthaltene Workflow baut und veröffentlicht die Website. Den Fortschritt findest du unter **Actions → Wiki veröffentlichen**. Ist der erste Push schon erfolgt, starte den Workflow dort über **Run workflow**.

Der Workflow bestimmt den Repository-Unterpfad automatisch. Für eine eigene Domain oder die Hauptdomain `name.github.io` ist deshalb kein Umbau der Links erforderlich. In `_config.yml` kannst du `url` auf die öffentliche Adresse setzen, sobald du sie kennst.

Du kannst alles direkt im GitHub-Editor pflegen. Eine lokale Ruby-Installation ist zum Schreiben und Veröffentlichen über GitHub nicht erforderlich.

## Einen Beitrag schreiben

Erstelle eine neue Datei in `_posts/`, zum Beispiel:

```
_posts/2026-10-26-mein-neuer-gedanke.md
```

Der Dateiname muss `JAHR-MONAT-TAG-name.md` folgen. Die Datei beginnt so:

```markdown
---
title: "Mein neuer Gedanke"
description: "Worum es in diesem Beitrag geht."
tags: [Gedanken, Lernen]
---

Hier beginnt mein Text.

## Eine Zwischenüberschrift

Ein weiterer Absatz mit **fetter** oder *kursiver* Schrift.

> Ein Gedanke, der hervorsticht.

## Ein zweiter Abschnitt

Ein [Link](https://example.com) und eine Liste:

- Ein Punkt
- Noch ein Punkt
```

Nach dem Speichern und dem nächsten erfolgreichen Build erscheinen der Beitrag, sein Link in der Startseitenliste und sein Inhalt in der Suche automatisch. Die Liste ist nach Datum absteigend sortiert. Titel und Datum im Artikel stammen aus der Datei; die Lesezeit wird geschätzt. Die Inhaltsverzeichnisse entstehen aus den `##`-Überschriften im Browser.

Neue Beiträge verwenden ohne weitere Angabe das gemeinsame Beitragslayout. Optional: `author`, `category`, `kind` und `description`. Die mitgelieferten Beispiele sind mit `example: true` markiert; lasse das bei deinen eigenen Texten weg.

Beiträge mit einem zukünftigen Datum erscheinen erst bei einem Build nach diesem Datum. Es gibt keinen Zeitplan, der sie automatisch um Mitternacht veröffentlicht. Nutze zum gewünschten Zeitpunkt **Run workflow** oder speichere eine weitere Änderung.

## Entwürfe

Unter `_drafts/neuer-beitrag.md` liegt eine Vorlage. Entwürfe werden nicht veröffentlicht. Zum Veröffentlichen kopierst du den Inhalt in eine passend datierte Datei unter `_posts/`. Für eine lokale Entwurfsvorschau verwende `bundle exec jekyll serve --drafts`.

## Was pflege ich wo?

| Inhalt | Datei |
|---|---|
| Name, Initialen, E-Mail, Interessen, Steckbrief | `_data/profile.yml` |
| Seitentitel, Beschreibung, Grundeinstellungen | `_config.yml` |
| Navigation | `_data/navigation.yml` |
| Projekte | `_data/projects.yml` |
| Einleitung und Startseitentexte | `_includes/home/*.md` |
| Blogbeiträge | `_posts/*.md` |
| Entwurfsvorlage | `_drafts/neuer-beitrag.md` |
| Eigenständige Über-mich-Seite | `ueber.md` |
| Gemeinsames Design | `assets/css/style.css` |
| Menü, Suche, Inhaltsverzeichnis, Leseeinstellungen | `assets/js/main.js` |
| Gemeinsamer Seitenaufbau | `_layouts/default.html` |
| Darstellung eines Beitrags | `_layouts/post.html` |

Neue eigenständige Seiten legst du z.B. als `lesen.md` im obersten Verzeichnis an:

```markdown
---
title: "Meine Leseliste"
permalink: /lesen/
---

## Gerade auf meinem Tisch

Dein Text …
```

Sie erhalten automatisch das Seitenlayout und erscheinen in der Suche. Für einen Eintrag im Hauptmenü ergänze `_data/navigation.yml`.

## Bilder und interne Links

Lege Bilder zum Beispiel unter `assets/images/` ab:

```markdown
![Beschreibung des Bildes]({{ '/assets/images/mein-bild.jpg' | relative_url }})
```

Für Links zu anderen Beiträgen ist Jekyll zuständig. Beispiel mit einer existierenden Datei:

```liquid
[Zum Beispielbeitrag]({{ site.baseurl }}{% post_url 2026-10-25-ein-eigenes-stueck-internet %})
```

Das bleibt auch auf einer Repository-Adresse wie `name.github.io/mein-wiki/` korrekt.

## Lokal ansehen

Benötigt Ruby (empfohlen 3.3) und Bundler. Im Projektordner:

```sh
bundle install
bundle exec jekyll serve
```

Öffne anschließend `http://localhost:4000`. Änderungen an Markdown und Layouts werden neu gebaut. Nach Änderungen an `_config.yml` den Vorschauprozess neu starten.

Eine Vorschau mit Repository-Unterpfad ist möglich:

```sh
bundle exec jekyll serve --baseurl /mein-wiki
```

Dann öffne `http://localhost:4000/mein-wiki/`.

**Wichtig:** Die Quelldateien lassen sich nicht mehr durch Doppelklick als fertige Website betrachten. Jekyll muss sie zunächst bauen. Die alte statische Vorlage wurde separat erhalten; sie ist kein automatisch aktualisiertes Ergebnis dieses Projekts.

## Suche, Datenschutz und Menü

Die Suche lädt `search.json`, die Jekyll aus veröffentlichten Beiträgen und Seiten erzeugt. Sie arbeitet anschließend im Browser, ohne Suchanbieter. Entwürfe und Beiträge mit `published: false` werden im normalen Build ausgelassen. Es gibt keine Tracker oder externen Schriftarten. Leseeinstellungen speichert nur der jeweilige Browser.

Das linke Burgermenü öffnet einen nativen modalen Dialog. Es ist unabhängig von der Scrollposition, lässt sich mit Escape oder dem Schließen-Button verlassen und gibt den Tastaturfokus zurück. Das Design bleibt flach, ohne 3D-Effekte.

## Dokumentation

- Beiträge: https://jekyllrb.com/docs/posts/
- Layouts: https://jekyllrb.com/docs/layouts/
- GitHub Actions: https://jekyllrb.com/docs/continuous-integration/github-actions/

## Technischer Aufbau der Suche

`_plugins/search_index.rb` erstellt `search.json` nach dem Rendern. Dadurch sind auch eingebundene Markdown-Texte vollständig durchsuchbar. Das Plugin nutzt nur Rubys Standardbibliothek. Veröffentliche diese Version mit dem mitgelieferten GitHub-Actions-Workflow, damit das Plugin ausgeführt wird. Mit `search: false` im Kopfbereich einer Seite kannst du sie aus der Suche nehmen.

## Prüfstand dieser Lieferung

- Echter Build mit Jekyll 3.10.0 erfolgreich, sowohl für `/` als auch für `/mein-wiki/`.
- Erzeugte lokale Links, Sprungziele, Suchindex und JavaScript-Syntax geprüft.
- Zusätzlicher Markdown-Testbeitrag ohne Layoutänderung automatisch in Liste und Suche aufgenommen.
- Entwürfe, `published: false`, zukünftige Beiträge und die Fehlerseite aus der Suche ausgeschlossen.
- Das lokale Prüfsystem verwendet Ruby 2.6; der mitgelieferte GitHub-Workflow ist auf Ruby 3.3 vorbereitet. Der Workflow wurde noch nicht in einem GitHub-Repository ausgeführt.
- Visuelle Browserprüfung und Browser-Interaktionen bleiben ungeprüft, da das in dieser Sitzung vorgeschriebene Interceptor-Testprofil nicht eingerichtet ist.

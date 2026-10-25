# Seyyid — A curious work in progress.

Persönliches Jekyll-Zine mit gemischter deutscher/englischer Sprache. Papier, Schwarz, Signalrot, Xerox-Poster und ein offenes Notizbuch über Kunst, Technologie, Business, Investing und Community.

## Inhalt bearbeiten

- `_layouts/home.html`: Hero, Manifest, Projekte, Now und Kontakt.
- `_data/profile.yml`: Name und Interessen.
- `_posts/`: Gedanken als Markdown-Dateien. Die Startseite zeigt die Beiträge automatisch, neueste zuerst; jeder Beitrag hat eine eigene Adresse und das Zine-Layout.
- `assets/css/style.css`: Layout, responsive Darstellung und rote Schließen-Buttons.
- `assets/js/main.js`: Dialoge, Farbakzente und lokaler Kontaktentwurf.
- `assets/images/`: Poster und Augenmotiv. Die Poster sind KI-generierte Illustrationen; die Gesprächsrunde dokumentiert kein reales Treffen.

Die drei enthaltenen Beiträge sind redaktionelle Gedankenskizzen für den Designentwurf. Sie ersetzen die bisherigen Beispieltexte. Die alten Dateinamen bleiben erhalten, die URLs werden durch `slug` im Frontmatter bestimmt.

## Neuen Beitrag schreiben

Eine Datei wie `_posts/2026-10-26-eine-gute-frage.md` anlegen:

```markdown
---
title: "Eine gute Frage"
description: "Ein Gedanke, der noch weitergehen darf."
category: "CURIOSITY"
---

Hier beginnt der Text. Markdown wird automatisch in das Beitragslayout gesetzt.
```

Entwürfe in `_drafts/` bleiben unveröffentlicht. Für eine neue Homepage-Gedankenskizze genügt ein weiterer Post; die Liste wächst automatisch.

## Lokal starten

Ruby 3.3 und Bundler installieren, dann:

```sh
bundle install
bundle exec jekyll serve
```

Die Vorschau läuft unter `http://127.0.0.1:4000`. Die Seite benötigt keine externen Fonts, keine JavaScript-Pakete und kein Tracking. Alle internen und Asset-URLs berücksichtigen Jekylls `baseurl`.

## Kontakt

Bis eine öffentliche Kontaktadresse feststeht, lädt der Dialog einen lokalen `.eml`-Entwurf ohne Empfänger herunter. Er sendet keine Nachrichten und speichert keine Eingaben. Es wurde keine Adresse erfunden. Den Kontakt später im Home-Layout und Kontakt-Dialog durch den gewünschten öffentlichen Kanal ersetzen.

## GitHub Pages

Der bestehende Workflow bleibt der Veröffentlichungsweg. Pull Requests führen nur den Jekyll-Build aus. Veröffentlichungen erfolgen ausschließlich vom Standardbranch; ein Design-Branch oder Pull Request stellt die öffentliche Seite nicht um.

Nach Prüfung und Freigabe des Designs den Branch in `main` übernehmen. Unter Repository Settings → Pages muss als Quelle GitHub Actions gewählt sein. Der Workflow baut mit Ruby 3.3 und Jekyll 3.10.

## Kompatibilität

`/ueber/`, `/404.html` und der frühere Einstieg `/beitrag.html` sind an das neue Design angepasst. Die alten Beispielpost-URLs werden nicht fortgeführt. Die frühere Wiki-Navigation und Leseeinstellungen gehören nicht zum neuen Zine-Design.

## Zitate unter dem Hero

Die drei Zitate werden aus `_data/quotes.yml` geladen. `text` und `author` sind Pflicht; `source` ist ein optionaler Quellenlink. Die beiden ergänzenden Zitate lassen sich dort jederzeit austauschen.

## Quotes als Bilder

`/quotes/` ist eine reduzierte Poster-Galerie. Die Poster liegen in `assets/images/quote-*.jpg`; Metadaten und Bildpfade in `_data/quotes.yml`. Für weitere Poster einen Datensatz ergänzen und in `assets/js/main.js` den zugehörigen `poster_id` in `posterAssets` aufnehmen, damit die Großansicht das Bild findet. Die Originale wurden mit dem integrierten Imagegen-Werkzeug erzeugt.

---
title: Über mich
description: Viele Interessen. Ein roter Faden.
permalink: /ueber/
---

Ich bin Seyyid. Ich denke, mache und verbinde. Zwischen Kunst, Technologie und allem, was in keine Schublade passt.

Mich interessiert, was passiert, wenn man die eigene Bubble verlässt. Wenn Kunst auf Technologie trifft. Wenn ein Buch ein Gespräch auslöst, das noch Tage später nachwirkt.

Diese Seite ist mein offenes Notizbuch. Ich schreibe, um klarer zu denken. Und teile, um weiterzudenken.

## Was mich interessiert

{% for interest in site.data.profile.interests %}
- {{ interest }}
{% endfor %}

[Ein Gespräch anfangen]({{ '/#contact' | relative_url }})

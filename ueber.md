---
title: Über mich
description: Ein paar Worte zu der Person hinter diesem Wiki.
permalink: /ueber/
---
{% include home/ueber.md %}

## Was mich interessiert

{% for interest in site.data.profile.interests %}
- {{ interest }}
{% endfor %}

## Kontakt

[Schreib mir eine E-Mail](mailto:{{ site.data.profile.email }}).

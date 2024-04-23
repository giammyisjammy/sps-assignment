# Task 2

Ho incluso una breve spiegazione citando le fonti. Nessuna di queste risposte è frutto di AI generativa ma ho citato le fonti laddove ho.

## React

_Spiega il concetto di lifting state up e come può essere utilizzato per la comunicazione tra componenti._

A volte è necessario che lo stato di due componenti cambi sempre insieme. Per farlo, si utilizza una tecnica chiamata "sollevamento dello stato" ("lifting state up") che si può riassumere in questi passaggi:

- rimuovere lo stato da entrambe le componenti
- spostarlo nella componente genitore comune più vicino
- ri-passarlo ai discendenti tramite props.

Questa tecnica segue il principio della cosiddetta "single source of truth", ovvero che per ogni "pezzo" (o slice) di stato esiste una specifica componente in cui quell'informazione risiede.

Non significa che _tutto_ lo stato alloggia nella stessa componente; al contrario, è ritenuta buona pratica co-locare lo stato nel primo parente comune dell'albero delle componenti in cui verrà utilizzato (e non più in alto).

Fonti:

- [React Docs: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

## Python

_Descrivi come gestiresti la concorrenza in un'applicazione Python, facendo riferimento sia al threading che all'asyncio._

> ⚠️ Premessa: NON sono uno sviluppatore Python

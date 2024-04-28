# Task 2

Ho incluso una breve spiegazione citando le fonti. Nessuna di queste risposte è frutto di AI generativa ma ho citato le fonti laddove ne ho beneficiato.

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

> ⚠️ Premessa: NON sono uno sviluppatore Python. La mia risposta prende molta
> ispirazione dai contenuti dalla documentazione ufficiale. Ho provato a
> rielaborare con le mie parole ma ci sono alte probabilità che mi sbagli (purtroppo
> si tratta di un concetto complesso e padroneggiarlo completamente richiederebbe dell'esperienza in più.)

In Python, ci sono due approcci principali per gestire la concorrenza: il threading (utilizzo di thread) e l'asyncio (utilizzo di coroutines).

In estrema sintesi, asyncio è più indicato per gestire operazioni di I/O non bloccanti tramite streams e subprocesses. Il threading è più indicato per operazioni di I/O bloccanti. Il motivo è che il threading in determinati casi permette l'esecuzione parallela (esecuzione dei task simultaneo) mentre l'asyncio permette solo l'esecuzione concorrente tra i task (esecuzione dei task in un ordine diverso dal quale vengono dichiarati).

Questo perchè i due moduli sono diversi tra di loro sotto vari aspetti:

<details>
  <summary>1. Programmazione asincrona vs procedurale/Object-oriented</summary>
Asyncio è un paradigma basato sulla programmazione asincrona.

In asyncio quando viene invocata una funzione, viene restituita una struttura dati (in gergo, _handle_) che si può usare per controllarne lo stato o ritirarne i risultati quando questa viene eseguita. L'esecuzione vera e propria della funzione viene delegata ad un istante successivo del tempo.

È diverso rispetto ad un Thread in cui i risultati della chiamata ad una funzione potrebbero avvenire in thread completamente separati, senza nessuna delega sull'esecuzione di questi ultimi.

</details>

<details>
  <summary>2. Modello di concorrenza Coroutine vs Thread</summary>

Una coroutine è una funzione che può essere sospesa e ripresa, in maniera abbastanza simile ad una [generator function in Javascript](https://javascript.info/generators).

> Coroutine: coroutines are a more generalized form of subroutines. Subroutines are entered at one point and exited at another point. Coroutines can be entered, exited, and resumed at many different points.
>
> — [Python Glossary](https://docs.python.org/3/glossary.html#term-coroutine)

Un thread invece è l'oggetto che esegue le istruzioni di un processo.

> Thread: The operating system object that executes the instructions of a process.
>
> — [Threading in Python: What Are Threads](https://superfastpython.com/threading-in-python/#What_Are_Threads)

Sostanzialmente, le Coroutines sono più leggere di un Thread (praticamente equivalgono a delle funzioni) mentre un Thread ha un'impronta sulla memoria più significativa, essendo rappresentato con un oggetto della classe `threading.Thread`.

</details>

<details>
  <summary>3. No GIL vs GIL</summary>
  Le Couroutines non sono limitate dal Global Interpreter Lock (GIL).

Il GIL è un meccanismo di lock che permette all'interprete Python di essere thread-safe

I threads sono soggetti al GIL ed un solo thread alla volta può interagire con l'iterprete Python.

Questa è una limitazione che viene rimossa solo in casi particolari, ad esempio quando si eseguono delle operazioni di I/O bloccanti oppure in alcune librerie di terze parti con un focus sulla performance.

Il GIL non avrebbe senso nel contesto di asyncio in quanto le Coroutines sono tutte eseguite all'interno dello stesso thread.

</details>

<details>
  <summary>4. Molte Coroutines in un solo Thread vs Molti Threads in un solo processo
</summary>
Come accennato prima, più Coroutines sono gestite all'interno dell'event loop in un singolo Thread.

Più thread vengono gestiti dall'istanza del processo Python.

</details>

<details>
  <summary>5. Tasks I/O limitati dal GIL vs Tasks I/O senza limitazioni
</summary>
Asyncio è focalizzato per offrire supporto per le operazioni di I/O non bloccanti. Ad esempio, la comunicazione TCP/IP.

I thread sono invece ottimi per le operazioni di I/O bloccanti. Ad esempio, l'utilizzo di un socket, lettura/scrittura su file o lettura/scrittura su una periferica.

Se un Thread esegue questo tipo di operazioni rilascia il GIL permettendo l'esecuzione simultanea di più thread, al contrario di ciò che potrebbe succedere con una Coroutine.

</details>

Fonti:

- [Python Threading: The Complete Guide](https://superfastpython.com/threading-in-python/)
- [Asynchronous Programming in Python](https://superfastpython.com/python-asynchronous-programming/)
- [Python 3 Docs: Thread-based parallelism](https://docs.python.org/3/library/threading.html)
- [Python 3 Docs: Asynchronous I/O](https://docs.python.org/3/library/asyncio.html)

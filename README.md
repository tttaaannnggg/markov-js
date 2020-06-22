# ez-markov

ez-markov is a small library designed to build very rudimentary markov chains. It is an object that you can instantiate, and has the ability to ingest bigrams, sentences, and full corpuses of text. It builds a graph of bigrams, represented as an adjacency list, and provides methods to generate text by traversing that graph. The path is randomly chosen, but weighted based off of the frequency of a given bigram's occurence in the source text.

I am not a computational linguist (yet), so the algorithm is written based off of my own intuitions and quick google/wikipedia search for information on markov chains. It is good enough for creative projects as it will produce unexpected results, and it may provide fun opportunities to visualize and reimagine your own text, but it will only accidentally produce natural language.

## Installation

install via NPM:

`npm i ez-markov`

## Usage

```
import Markov from "ez-markov";
const chain = new Markov();

const text = "hi this is a body of text. we will generate some text that says something else. repeating text and particular words gives us more information to work with in a body. the longer the text, the better";

chain.addCorpus(text); //ingests text
console.log(chain.getSentence()); //generates a sentence based off of the text;
```

## Methods

### Ingesting text

- `.addWord(word:<string>, nextWord:<string>)`
  - adds a single bigram to the graph. if the bigram exists, increases the weight of that bigram
- `.addStart(word:<string>)`
  - adds a "start" to the graph, an entrypoint that represents the first word of a phrase or sentence. Only useful if the word is also added as a node on the graph.
- `.addSentence(sentence:<string>)`
  - ingests a sentence by splitting a given string on whitespace, then generating bigrams from that sentence, using `addWord` and `addStart`
- `.addCorpus(str:<string>)`
  - adds a body of text to the graph. breaks down sentences on the regexp `/[\.\?\!]\s*/g`, then processes them using `addSentence`

### Generating text

- `.getSentence(startWord:<string>, length:<int>)`
  - generates a sentence by either starting a graph traversal from the provided `string`, and stopping at length `int`, or picking a random starting word from the `start` object. the senetence generated will terminate at `length` number of words, or when there are no more nodes available to traverse.
- `.getCorpus()`
  - generates a body of text that attempts to match the number and length of sentences from the originating corpus. essentially calls `getSentence` with each of the `length`s of the sentences from the original corpus in sequence.

### Exporting text

- `.export()`
  - exports an object in the format `{nodes:<node>[], edges:<edge>[]}`, containing an array of `<nodes>` and an array of `<edges>`, suitable for direct usage with [react-graph-vis](https://www.npmjs.com/package/react-graph-vis)
  - each node is formatted as follows: `{id: <int>, value: <str>, label: <str>}`, where `id` is a primary key used to reference a given node, and `value` and `label` are the word that corresponds to the node
  - each edge is formatted as follows: `{from:<int>, to:<int>, weight:<int>}`, where `from` is the `id` corresponding to the originating node in a bigram, and `to` is the next word in the bigram, with `weight` being the number of occurences of that given bigram.

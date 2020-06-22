function Markov() {
  this.size = 0;
  this.dict = {};
  this.start = {};
  this.sentenceLengths = [];
}

Markov.prototype.addWord = function(word, nextWord) {
  if (!this.dict[word]) {
    this.dict[word] = {};
  }
  if (!nextWord) {
    return;
  }
  if (!this.dict[word][nextWord]) {
    this.dict[word][nextWord] = 0;
  }
  this.dict[word][nextWord]++;
};

Markov.prototype.addStart = function(word) {
  if (!this.start[word]) {
    this.start[word] = 0;
  }
  this.start[word]++;
};

Markov.prototype.addSentence = function(sentence) {
  const words = sentence.split(/\s+/).filter(word => word.length);
  this.sentenceLengths.push(words.length);
  this.addStart(words[0]);
  for (let i = 0; i < words.length; i++) {
    this.addWord(words[i], words[i + 1]);
  }
};

Markov.prototype.getSentence = function(startWord, length) {
  let currentWord = startWord || getWeigtedRandomFromObj(this.start);
  let sentence = currentWord;
  const len =
    length || this.sentenceLengths[getRandIndexFromArray(this.sentenceLengths)];
  for (let i = 0; i < len; i++) {
    const possibleNextWords = this.dict[currentWord];
    if (!possibleNextWords) {
      break;
    }
    currentWord = getWeigtedRandomFromObj(possibleNextWords);
    if (!currentWord) {
      break;
    }
    sentence += " " + currentWord;
  }
  return sentence;
};

Markov.prototype.addCorpus = function(str) {
  const sentences = str
    .split(/[\.\?\!]\s*/g)
    .filter(sentence => sentence.length);
  for (let sentence of sentences) {
    this.addSentence(sentence);
  }
};

Markov.prototype.getCorpus = function() {
  const corpus = [];
  for (let len of this.sentenceLengths) {
    corpus.push(this.getSentence(null, len));
  }
  return corpus.join(". ");
};

Markov.prototype.export = function() {
  //export obj format: {
  //  nodes: <node>[],
  //  edges: <edge>[]
  //}
  //node format: {id:<id>, value:<any>, label:<any>
  //edge format: {from: <id_1>, to:<id_2>, value:<num>}
  const ids = {};
  const nodes = Object.keys(this.dict).map((word, i) => {
    const node = {
      id: i + 1,
      value: word,
      label: word
    };
    ids[word] = node.id;
    return node;
  });
  const edges = [];
  for (let node of nodes) {
    const edgeObj = this.dict[node.value];
    const edgeList = Object.entries(edgeObj);
    for (let edge of edgeList) {
      const singleEdge = {
        from: node.id,
        to: ids[edge[0]],
        weight: edge[1]
      };
      edges.push(singleEdge);
    }
  }
  console.log(nodes.length);
  return {
    nodes,
    edges
  };
};

//helper functions
function getRandIndexFromArray(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getWeigtedRandomFromObj(obj) {
  const possibilities = Object.entries(obj);
  const possibilityCount = possibilities.reduce(
    (acc, entry) => (entry[1] += acc),
    0
  );
  const choice = Math.floor(Math.random() * (possibilityCount + 1));
  if (!possibilities.length) {
    return undefined;
  }
  for (let entry of possibilities) {
    if (choice <= entry[1]) {
      return entry[0];
    }
  }
}

module.exports = Markov;

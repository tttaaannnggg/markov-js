function Markov() {
  this.dict = {};
  this.start = {};
  this.sentenceLengths = [];
}

Markov.prototype.addWord = function(word, nextWord) {
  if (!nextWord) {
    return;
  }
  if (!this.dict[word]) {
    this.dict[word] = {};
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
  const words = sentence.split(/\s+/);
  this.sentenceLengths.push(words.length);
  this.addStart(words[0]);
  for (let i = 0; i < words.length; i++) {
    this.addWord(words[i], words[i + 1]);
  }
};

Markov.prototype.getSentence = function(startWord) {
  let currentWord = startWord || getWeigtedRandomFromObj(this.start);
  let sentence = currentWord;
  const len = this.sentenceLengths[getRandIndexFromArray(this.sentenceLengths)];
  for (let i = 0; i < len; i++) {
    currentWord = getWeigtedRandomFromObj(this.dict[currentWord]);
    if (!currentWord) {
      break;
    }
    sentence += " " + currentWord;
  }
  return sentence;
};

Markov.prototype.addCorpus = function(str) {
  const sentences = str.split(/[\.\?\!]\s*/g);
  for(let sentence of sentences){
    this.addSentence(sentence);
  }
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

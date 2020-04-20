const UKRAININAN_ALPHABET = new Set(['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я']);
const UKRAININAN_WORD_MODS = new Set(['-', "'", '’']);

function splitUkrainian(text) {
  text = text.toLowerCase();

  const words = [];
  let end = 0;
  let start;
  while (end < text.length) {
    if (UKRAININAN_ALPHABET.has(text[end])) {
      start = end;
      end += 1;
      while (end < text.length && UKRAININAN_ALPHABET.has(text[end]) || UKRAININAN_WORD_MODS.has(text[end])) {
        end += 1;
      }
      words.push(text.substring(start, end))
    }
    end += 1;
  }

  return words;
}




function isPronoun(word) {
  return PRONOUNS.has(word);
}


class WordType {
  constructor(name) {
    this.words = new Set();
    this.count = 0;
  }

  add(word) {
    this.words.add(word);
    this.count += 1;
  }

  addWhenMatches(word) {
    if (this.match(word)) {
      this.add(word);
    }
  }
}


const PRONOUNS = new Set([
  'я',
  'мене',
  'мені',
  'мною',
  'себе',
  'собі',
  'собою',
  'ти',
  'тобі',
  'тебе',
  'тобою',
  'ви',
  'вам',
  'вами',
  'вас',
]);
class Pronouns extends WordType {
  match(word) {
    return PRONOUNS.has(word);
  }
}


const CONDITIONALS = new Set(['якщо', 'якби', 'б', 'би']);
const PAST_TENSE_SUFFIXES = ['ила', 'ала', 'ла', 'ив', 'ав', 'али', 'или', 'ли', 'ало', 'ло', 'ило'];

class PastConditionals extends WordType {
  match(word) {
    if (CONDITIONALS.has(word)) {
      return true;
    }
    return PAST_TENSE_SUFFIXES.some((suffix) => word.endsWith(suffix));
  }
}


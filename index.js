const xhr = new XMLHttpRequest();
const urls = populateUrls();
xhr.open("GET", urls[rand(0, urls.length)]);
xhr.send();

const punct_regex = /[~`!@#$%^&*(){}\[\];:"<,.>?\/\\|_+=-]/g;

xhr.onload = (e) => {
    let poems = JSON.parse(xhr.responseText);

    let a_line = getLine(poems[rand(0, poems.length)]);
    let b_line = getLine(poems[rand(0, poems.length)]);

    let txt = a_line + (b_line[0] == b_line[0].toUpperCase() && /[a-zA-Z]/i.test(a_line[a_line.length - 1]) ? ". " : " ") + b_line;
    let words = modernize(txt).split(' ');
    
    let dist = Math.floor(words.length/3)
    let name = words.slice(rand(0, dist), (dist, words.length));

    let name_div = document.getElementById("name");
    name_div.innerHTML = name.join(' ');

    let nickname_div = document.getElementById("nickname");
    nickname_div.innerHTML = "⸢" + nickname(name) + "⸣";
}

function populateUrls() {
    let urls = [];
    urls.push('http://poetrydb.org/author,linecount/Shakespeare;14/lines');
    urls.push('http://poetrydb.org/author/Dickinson/lines');
    urls.push('http://poetrydb.org/author/Tennyson/lines');
    urls.push('http://poetrydb.org/author/Keats/lines');
    urls.push('http://poetrydb.org/author/Bronte/lines');
    
    return urls;
}

function getLine(poem) {
    let lines = poem.lines.filter( (e) => !!e );
    let line = lines[rand(0, lines.length)].replace(/"|\r\n|\n|\r/gm, '');
    return (line[line.length - 1] == "'") ? line.slice(0, line.length - 1) : line;
}

function nickname(arr) {
    let filtered = arr.filter( (e) => {
        e = e.replace(punct_regex, '').trim();
        return (!!e && !ignore.includes(e.toLowerCase()))
    });

    let l = filtered.length - 1;
    let nickname = l >= 0 ? filtered[rand(0, l)] : arr[rand(0, arr.length - 1)];
    return (punct_regex.test(nickname[nickname.length - 1])) ? nickname.slice(0, nickname.length - 1) : nickname;
}

function modernize(str) {
    return str.replace(/\bthee\b/gi, 'you')
              .replace(/\bthou\b/gi, 'you')
              .replace(/\bye\b/gi, 'you')
              .replace(/\bthy\b/gi, 'your')
              .replace(/\bthine\b/gi, 'your')
              .replace(/\bthyself\b/gi, 'yourself')
              .replace(/\bthence\b/gi, 'then')
              .replace(/\bwast\b/gi, 'was')
              .replace(/\bhath\b/gi, 'has')
              .replace(/\bhast\b/gi, 'have')
              .replace(/\bhadst\b/gi, 'had')
              .replace(/\bdost\b/gi, 'do')
              .replace(/\bdoth\b/gi, 'does')
              .replace(/\bnay\b/gi, 'no')
              .replace(/\boft\b/gi, 'often')
              .replace(/\bshalt\b/gi, 'shall')
              .replace(/\bsaith\b/gi, 'says')
              .replace(/\bmine\b/gi, 'my')
              .replace('`', '');
}

function rand(start, end) {
    return Math.floor(Math.random() * (end - start) + start);
}

const ignore = ["i", "a", "aboard", "about", "above", "across", "afore", "after", "against", "all", "along", "alongside", "am", "amid", "amidst", "among", "amongst", "an", "and", "anenst", "another", "any", "anybody", "anyone", "anything", "apud", "are", "around", "as", "aside", "astride", "at", "athwart", "atop", "barring", "been", "before", "behind", "being", "below", "beneath", "beside", "besides", "between", "beyond", "both", "but", "by", "can", "circa", "could", "dare", "despite", "did", "do", "does", "down", "during", "each", "either", "enough", "everybody", "everyone", "everything", "except", "excluding", "failing", "few", "following", "for", "forenenst", "from", "given", "had", "has", "have", "having", "he", "her", "hers", "herself", "him", "himself", "his", "in", "including", "inside", "into", "is", "it", "itself", "lest", "like", "little", "many", "may", "me", "mid", "midst", "might", "mine", "minus", "modulo", "more", "most", "much", "must", "myself", "near", "need", "neither", "next", "no one", "nobody", "none", "nor", "nothing", "notwithstanding", "of", "off", "on", "one", "onto", "opposite", "or", "other", "others", "ought", "ours", "ourselves", "out", "outside", "over", "pace", "past", "per", "plus", "pro", "qua", "regarding", "round", "sans", "save", "several", "shall", "she", "should", "since", "so", "some", "somebody", "someone", "something", "such", "than", "that", "theirs", "them", "themselves", "these", "they", "this", "those", "through", "throughout", "till", "times", "to", "toward", "towards", "under", "underneath", "unlike", "until", "unto", "up", "upon", "us", "versus", "very", "via", "vice", "was", "we", "well", "were", "what", "whatever", "which", "whichever", "who", "whoever", "whom", "there", "whomever", "whose", "will", "with", "within", "without", "worth", "would", "yet", "you", "yours", "yourself", "be", "form", "far", "saw", "little", "that's", "where", "only", "my", "pass", "though", "self", "your", "here", "the", "if", "then", "what", "why", "how", "no", "come", "now", "not", "look", "o", "back", "their", "give", "because", "never", "better", "still", "too", "took", "else", "gave", "when", "seen", "cannot", "its", "ah", "while", "went"]
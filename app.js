const annotatedJson = (fragment) => {
  const [string, annotation] = fragment.split(/\||・/); // split on | or ・ characters
  return {
    string,
    annotation,
  };
};

const State = {
  value: '',
  handleInput(input) {
    this.value = input;
  },
  get output() {
    return this.value
      .split(/{|}|「|」/)
      .map(annotatedJson)
      .map(({ string, annotation }) =>
        annotation
          ? m('ruby', [m('span', string), m('rt', annotation)])
          : string
      );
  },
  get debug() {
    return this.value.split(/{|}|「|」/).map(annotatedJson);
  },
};

const stringify = (json) => JSON.stringify(json, null, ' ');

const Instructions = {
  view: () => [
    m('p', 'Leiðbeiningar'),
    m(
      'p',
      'Umlyktu orði sem þú vilt útskýra með slaufusvigum { } eða japanskum gæsalöppum 「 」. Settu | eða ・ á milli orðs og útskýringar.'
    ),
    m('p', 'Dæmi:', m('br'), '{私|watashi}', m('br'), '「私・わたし」'),
  ],
};

const App = {
  oninit: () =>
    (State.value =
      '「私・わたし」のシャツは「赤・aka」です: Skyrtan {mín|meen} er rauð'),
  view: () => m('section.note', [
    m(Instructions),
    m('textarea', {
      value: State.value,
      oninput: (event) => State.handleInput(event.target.value),
    }),
    m('p', State.output),
    // m('pre', stringify(State.debug)), // debug: show data structure
  ]),
};

m.mount(document.body, App);

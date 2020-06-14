export default ({ location, tech, exp_lvl, from, to, sort }) => {
  return [
    location ? '/' + location : to || from || exp_lvl || tech ? '/all' : '',
    tech ? '/' + tech : to || from || exp_lvl ? '/all' : '',
    exp_lvl ? '/' + exp_lvl : to || from ? '/all' : '',
    from ? '/' + from / 1000 + 'k' : to ? '/-' : '',
    to ? '/' + to / 1000 + 'k' : '',
    sort ? '?sort=' + sort : '',
  ].join('');
};

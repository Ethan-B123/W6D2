class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.makeTowers();
  }

  makeTowers() {
    for (let i = 0; i < 3; i++) {
      let $ul = $(`<ul id='tower-${i}' class='tower'></ul>`);
      this.$el.append($ul);
    }

    for (let i = 0; i < 3; i++) {
      let $li = $(`<li id='peg-${i}' class='peg'></li>`);
      $('#tower-0').append($li);
    }
  }
}


module.exports = View;

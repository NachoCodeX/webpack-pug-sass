'use strict';

class SieveOFEratosthenes {
  constructor() {
    this.init();
    this.initListeners();
    this.total = parseInt(this.getElementValue('sieve-input'));
    this.board = this.getElementById('sieve-board');
    this.elements = this.generateElements();
    this.appendToBoard();
  }

  resetElementsStyles() {
    for (const e of this.elements) {
      e.style.backgroundColor = '#ffdd78';
      e.style.color = '#212121';
    }
  }

  multipliesOf(n) {
    this.resetElementsStyles();
    for (const e of this.elements) {
      const value = parseInt(e.getAttribute('value'));
      // console.log();
      if (value % n == 0) {
        console.log(`${value} is multiple of ${n}`);
        e.style.background = '#212121';
        e.style.color = '#fff';
      }
    }
  }
  onAction(e) {
    const type = parseInt(e.target.getAttribute('data-type'));
    this.multipliesOf(type);
  }
  onPrime() {
    this.resetElementsStyles();
    const aux = [];
    for (const e of this.elements) {
      const value = parseInt(e.getAttribute('value'));
      if (value === 1 || aux.indexOf(value) !== -1) continue;

      for (let i = value + 1; i <= this.elements.length; i++) {
        if (i % value == 0) aux.push(i);
      }
      // primes.push(value);
      e.style.background = '#212121';
      e.style.color = '#fff';
    }

    // console.log(aux);
    // console.log(primes);
  }
  init() {
    this.input = this.getElementById('sieve-input');
    this.btns = document.getElementsByName('action').forEach(btn => {
      btn.addEventListener('click', this.onAction.bind(this));
    });

    this.clear = this.getElementById('clear');
    this.prime = this.getElementById('prime');
    console.log(this.btns);
  }
  initListeners() {
    this.input.addEventListener('input', _.debounce(this.onChanges.bind(this), 500));
    this.clear.addEventListener('click', this.onClear.bind(this));
    this.prime.addEventListener('click', this.onPrime.bind(this));
  }

  onClear() {
    console.log('CLEAR');
    this.resetElementsStyles();
  }
  onChanges(event) {
    if (event.target.value === '') return;
    this.total = parseInt(event.target.value);
    if (this.total < 20) {
      this.total = 20;
      alert(`I SAID DON'T BE STUPID!`);
      this.setElementValue('sieve-input', this.total);
      return;
    } else if (this.total > 150) {
      this.total = 150;
      alert(`I SAID DON'T BE STUPID!`);
      this.setElementValue('sieve-input', this.total);
      return;
    }

    this.elements = this.generateElements();
    this.clearBoard();
    this.generateGridStyles();
    this.appendToBoard();
  }

  generateGridStyles() {
    this.board.style.display = 'grid';
    // this.board.style.gridAutoRows = '4rem';
    if (this.total >= 20 && this.total < 30) this.board.style.gridTemplateColumns = `repeat(5,1fr)`;
    else if (this.total >= 30 && this.total < 40) this.board.style.gridTemplateColumns = `repeat(6,1fr)`;
    else if (this.total >= 40 && this.total < 50) this.board.style.gridTemplateColumns = `repeat(8,1fr)`;
    else {
      this.board.style.gridTemplateColumns = `repeat(10,1fr)`;
    }
    // this.board.style.gridAutoRows = '10rem';
    // this.board.style.gridAutoColumns = '10rem';
  }

  clearBoard() {
    this.board.innerHTML = '';
  }
  appendToBoard() {
    for (const element of this.elements) {
      // console.log(element);
      this.board.appendChild(element);
    }
  }

  generateElements() {
    const elements = [];
    for (let i = 0; i < this.total; i++) {
      const element = document.createElement('div');
      element.className = 'sieve-item';
      element.innerHTML = i + 1;

      element.setAttribute('value', i + 1);
      elements.push(element);
    }
    // console.log(this.elements);
    return elements;
  }

  setElementValue(id, value) {
    document.getElementById(id).value = value;
  }
  getElementValue(id) {
    return document.getElementById(id).value;
  }
  getElementById(id) {
    return document.getElementById(id);
  }
}

new SieveOFEratosthenes();

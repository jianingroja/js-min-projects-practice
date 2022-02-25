const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

const countSpan = document.getElementById('count');
const totalSpan = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // + to make it number

// CONSTANTS

// class name
const CLASS_SEAT = 'seat';
const CLASS_OCCUPIED = 'occupied';
const CLASS_SELECTED = 'selected';

// event type
const EVENT_CLICK = 'click';
const EVENT_CHANGE = 'change';

// FUNCTIONS

// update count and total price data
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedCount = selectedSeats.length;

  // return a new array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  setSeatsData(seatsIndex, selectedCount);
  updateDisplayedInfo(selectedCount, ticketPrice);
};

// update only displayed information in span
const updateDisplayedInfo = (count, price) => {
  countSpan.innerText = count;
  totalSpan.innerText = count * price;
};

// LOCAL STORAGE

// save seats data into localStorage
const setSeatsData = (index, count) => {
  localStorage.setItem('selectedSeats', JSON.stringify(index));
  localStorage.setItem('selectedCount', count);
};

// save movies data into localStorage
const setMovieData = (index, price) => {
  localStorage.setItem('movieIndex', index);
  localStorage.setItem('moviePrice', price);
};

// retrieve data
const initializeUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = localStorage.getItem('movieIndex');
  const selectedCount = localStorage.getItem('selectedCount');
  const ticketPrice = localStorage.getItem('moviePrice');

  if (!!selectedSeats) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add(CLASS_SELECTED);
      }
    });
  }

  if (!!selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  if (!!selectedCount && !!ticketPrice) {
    updateDisplayedInfo(selectedCount, ticketPrice);
  }
};

// EVENT LISTENERS

// select and unselect seat
const handleClick = e => {
  const targetClass = e.target.classList;

  if (
    targetClass.contains(CLASS_SEAT) &&
    !targetClass.contains(CLASS_OCCUPIED)
  ) {
    targetClass.toggle(CLASS_SELECTED);
  }

  updateSelectedCount();
};

// change movie
const handleChange = e => {
  const movieIndex = e.target.selectedIndex;
  const moviePrice = e.target.value;

  ticketPrice = +e.target.value; // + to make it number

  setMovieData(movieIndex, moviePrice);

  updateSelectedCount();
};

// EVENTS

// seat click event
container.addEventListener(EVENT_CLICK, handleClick);

// movie change event
movieSelect.addEventListener(EVENT_CHANGE, handleChange);

initializeUI();

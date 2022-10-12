import { renderBlock } from './lib.js'
const fetch = require('node-fetch')
function dateToUnixStamp(date) {
  return date.getTime() / 1000
}

function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
}

function search(checkInDate, checkOutDate, maxPrice) {
  let url = `http://localhost:3030/places?` +
  `checkInDate=${dateToUnixStamp(checkInDate)}&` +
  `checkOutDate=${dateToUnixStamp(checkOutDate)}&` +
  `coordinates=59.9386,30.3141`

  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`
  }

  return responseToJson(fetch(url))
}

function book(placeId, checkInDate, checkOutDate) {
  return responseToJson(fetch(
    `http://localhost:3030/places/${placeId}?` +
    `checkInDate=${dateToUnixStamp(checkInDate)}&` +
    `checkOutDate=${dateToUnixStamp(checkOutDate)}&`,
    {method: 'PATCH'}
  ));
}

const checkInDate = new Date()
const checkOutDate = new Date()
checkOutDate.setDate(checkOutDate.getDate() + 2)

console.log(checkInDate.getTime(), checkOutDate.getTime())


search(checkInDate, checkOutDate, 2800)
.then((results) => {
  console.log('places length', results.length)

  const place = results[0]
  book(place.id, checkInDate, checkOutDate)
  .then((result) => {
    console.log('booked', result.bookedDates)

    search(checkInDate, checkOutDate)
    .then((results) => {
      console.log('places length', results.length)
    })
  })
})

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock (reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

const toggleFavoriteItem =(event) =>  {
  const id= event.target.dataset.id
  const favoritesItem: string[] = getFavoritesList()
  const isfindItem: unknown = favoritesItem.find(itemId => itemId === id)
  if (Boolean(isfindItem)) {
    const newFavoritesItems = favoritesItem.find (itemId => itemId !== id)
    localStorage.setItem('favoriteItems', newFavoritesItems.join())
  } else {
    localStorage.setItem('favoriteItems', [...favoritesItem,id].join())
  }
}

const getFavoritesList = () => {
  return localStorage.getItem('favoritesItems').split(',')
};
export function book(placeId: string | number, checkInDate: Date | null, checkOutDate: Date | null) { 
 if (placeId && checkInDate && checkOutDate) {
  const data = responseToJson(fetch(
      `http://localhost:3030/places/${placeId}?` +
      `checkInDate=${dateToUnixStamp(checkInDate)}&` +
      `checkOutDate=${dateToUnixStamp(checkOutDate)}&`,
      {method: 'PATCH'}
    ));
    if (data) {
      const bookRes = {
        'id': placeId, 
        'checkIn': checkInDate.getTime(), 
        'checkOut': checkOutDate.getTime()
      }
      localS.set('booked', bookRes )
      renderToast(
        { text: `Вы забронировали номер ${placeId} с ${new Date(checkInDate).toLocaleString('ru-RU')} по ${new Date(checkOutDate).toLocaleString('ru-RU')}`, type: 'success' },
        { name: 'Ок', handler: () => { console.log('Уведомление закрыто') } }
      )
    }
  }
  else {
    return false
  }
};

export function renderSearchResultsBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites"></div>
            <img class="result-img" src="./img/result-2.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `
  )
}

import { renderBlock } from './lib.js'
import { ISearchFormData, IPlace } from './interfaces';

const frmSearch = document.getElementById('frmSearch');
frmSearch?.addEventListener('submit', (e) =>{
  e.preventDefault();
  const inpCity = frmSearch.querySelector('#city') as HTMLInputElement;
  const inpCheckInDate = frmSearch.querySelector('#check-in-date') as HTMLInputElement;
  const inpCheckOutDate = frmSearch.querySelector('#check-out-date') as HTMLInputElement;
  const inpMaxPrice = frmSearch.querySelector('#max-price') as HTMLInputElement;
  const searchFormData: ISearchFormData = {
    city: inpCity.value,
    checkInDate: new Date(inpCheckInDate.value),
    checkOutDate: new Date(inpCheckOutDate.value),
    maxPrice: inpMaxPrice.value === '' ? null: inpMaxPrice.value
  }; 
  search (searchFormData, searchCallback);
});
interface ISearchCallback {
  (error?:Error | IPlace, places?:IPlace[]):void
};
const searchCallback:ISearchCallback = (error, places) => {
  console.log('searchCallback', error, places);
}
export function search (data:ISearchFormData, searchCallback:ISearchCallback) {
  console.log ('function search searchFormData = ', data);
  const a = Boolean(Math.random() <0.5);
  if (a)
  setTimeout(() =>{
    searchCallback(Error('error'));
  }, 2000)
  
  else {
    const places:IPlace[] = [];
    searchCallback (places);
  }
}



export function renderSearchFormBlock () {

  const dateObj: Date = new Date();
  const datePlus2_Obj = new Date(dateObj.getTime() + 2 * 86400000);

  const minDate = dateObj.toLocaleDateString('en-CA');
  const curDate = dateObj.toLocaleDateString('en-CA');
  const minOutDate = datePlus2_Obj.toLocaleDateString('en-CA');

  dateObj.setMonth(dateObj.getMonth() + 2)
  dateObj.setDate(0);

  const maxOutDate = dateObj.toLocaleDateString('en-CA');
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${curDate}" min="${minDate}" max="${maxOutDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${minOutDate}" min="${minOutDate}" max="${maxOutDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}

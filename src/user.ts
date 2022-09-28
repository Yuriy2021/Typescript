import { renderBlock } from './lib.js'

export function renderUserBlock (name:string, avatarLink:string, favoriteItemsAmount: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 0;
  const hasFavoriteItems = favoriteItemsAmount ? true : false;
  const items: number | string = favoritesCaption > 0 ? favoritesCaption : 'ничего нет';

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${items}
          </p>
      </div>
    </div>
    `
  )
}

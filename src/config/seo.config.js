const BASE_TITLE = 'RED Bank | Vanila JS | '

export const getTitle = title => {
  return title ? BASE_TITLE + title : BASE_TITLE
}
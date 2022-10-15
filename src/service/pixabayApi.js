const KEY = '29311395-54c943df23053780296919f88';
const BASE_URL = 'https://pixabay.com/api/';

export default async function pixabayApi(query, page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );

    if (!response.ok)
      throw Error('Oooops, anything did not work. Try again !');
    //переменная, значением которой является ответ бэкэнда, приведенный в объект
    const parsedResponse = await response.json();
    
    if (!parsedResponse.totalHits)
      throw Error(
        `Oooops, we could not find "${query}". Write something else.`
      );

    return parsedResponse;
  } catch (error) {
    throw error;
  }
}

import axios from 'axios';

const getCoordsByAddress = async (address) => {
  try {
    const response = await axios
      .get(`https://geocode-maps.yandex.ru/1.x/?apikey=77a5e6ea-6171-44e6-bdac-228f66072a3e&format=json&results=1&geocode=${address}`);

    return Promise.resolve(response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos?.split(' ')
      .reverse());
  } catch (e) {
    return Promise.reject();
  }
};

export default {
  getCoordsByAddress,
};

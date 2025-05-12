import axios from 'axios';

const domain = 'http://localhost:1337/api';

export const getCategories = async () => {
  const res = await axios.get(`${domain}/categories?populate=*`);
  return res.data.data;
};

export const getSubCategories = async () => {
  const res = await axios.get(`${domain}/sub-categories?populate=*`);
  return res.data.data;
};

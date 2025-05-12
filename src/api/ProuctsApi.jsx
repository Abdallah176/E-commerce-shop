import axios from "axios";

const domain = "http://localhost:1337";

export const fetchLatestProducts = async () => {
  const res = await axios.get(`${domain}/api/products`, {
    params: {
      populate: "*",
      "filters[collection_type][$eq]": "latest",
      "pagination[limit]": 10,
    },
  });
  return res.data.data;
};

export const fetchBestSellerProducts = async () => {
    const res = await axios.get(`${domain}/api/products`, {
      params: {
        populate: "*",
        "filters[collection_type][$eq]": "bestseller",
        "pagination[limit]": 5,
      },
    });
    return res.data.data;
  };
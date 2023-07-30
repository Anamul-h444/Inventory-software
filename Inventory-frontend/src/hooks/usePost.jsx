import React, { useState, useEffect } from "react";
import axios from "axios";

const usePost = (url, requestData) => {
  const [value, setValue] = useState({
    data: "",
    isLoading: true,
    error: "",
  });
  const { data, isLoading, error } = value;

  useEffect(() => {
    axios
      .post(url, requestData)
      .then((res) => {
        console.log(res);
        setValue({ ...value, data: res.data, isLoading: false, error: false });
      })
      .catch((error) => {
        console.log(error);
        setValue({ ...value, isLoading: false, error: error.message });
      });
  }, [url, requestData]);

  return { data, isLoading, error };
};

export default usePost;

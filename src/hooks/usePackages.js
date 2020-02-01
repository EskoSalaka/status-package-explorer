import { useState } from "react";

// Simple hook for using localstorage with the variable "packages"
const usePackages = () => {
  const [packages, setPackages] = useState(() => {
    try {
      const storageItem = window.localStorage.getItem("packages");
      return storageItem ? JSON.parse(storageItem) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  const setValue = value => {
    try {
      setPackages(value);

      window.localStorage.setItem("packages", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [packages, setValue];
};

export default usePackages;

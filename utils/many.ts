import {useState} from "react";
import {ServerResponse} from "http";

export const isServer = () => typeof window === "undefined";
export const isBrowser = () => typeof window !== "undefined";

export const useForceUpdate = () => {
   const [_, setValue] = useState(0); // integer state
   return () => setValue(value => value + 1); // update the state to force render
}

export const redirectTo = (destination: string, permanent: boolean = false) => {
   return {redirect: {permanent, destination}}
}

export const getKeyByValue = (object, value) => {
   return Object.keys(object).find(key => object[key] === value);
}

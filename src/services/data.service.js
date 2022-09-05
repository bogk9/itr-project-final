import { authHeader } from "./auth-header";
const header = authHeader();

// specific user as arguemnt! 
const fetchCollections = (user_id, header) => {
    console.log("fetching collections with header:");
    console.log(header);
    return getData("userCollections", [user_id], header);
}

// specific collection as argument!
const fetchItems = (collection_id, type) => {
    return getData("collectionItems", [collection_id], header, type && {type: type});
}

export const DataService = {
    fetchCollections,
    fetchItems,
  };

// Helper functions

var getData = (action, targets, headers, extraParams = {}) => {
    const params = new URLSearchParams(targets.map((s) => ["id", s]));
    Object.entries(extraParams).forEach(([key, value]) => params.append(key, value));
    return fetch(`/api/get/${action}?${params.toString()}`,{method: "GET", headers })
    .then((res) => {
      if (!res.ok)
        return res.json().then((error) => {throw new Error(error.message);});
      return res.json();
    });
};
import axios from "axios";

export default class SearchCache {
  constructor() {
    console.log("initiated the class");
    this.searchMap = new Map();
    this.queryList = new Set();
  }

  checkInv(query) {
    console.log("this searchMap", this.searchMap);
    return new Promise(async (resolve, reject) => {
      if (this.queryList.has(query)) {
        resolve(this.searchMap.get(query));
      } else {
        let max = 0;
        let res = null;

        this.queryList.forEach((val) => {
          let len = val.length;
          if (query.length >= len) {
            if (val === query.slice(0, len)) {
              if (max < val.length) {
                max = val.length;
                res = val;
              }
            }
          }
        });

        if (res !== null) {
          let tempRes = [];
          let len = query.length;
          let arrSearch = this.searchMap.get(res);
          console.log("from ............res", res, arrSearch);

          arrSearch.map((val) => {
            if (query.toLowerCase() === val.slice(0, len).toLowerCase())
              tempRes.push(val);
          });
          console.log("from ............res", tempRes);

          this.searchMap.set(query, tempRes);
          this.queryList.add(query);
          resolve(tempRes);
        } else {
          console.log("need from server");
          var ans = await this.getServer(query);

          this.searchMap.set(query, ans);
          this.queryList.add(query);

          resolve(ans);
        }
      }
    });
  }

  getServer(query) {
    return new Promise((resolve, reject) => {
      var url =
        process.env.REACT_APP_REST_ENDPOINT + "/suggest/search/" + query;
      console.log("environment value", url);
      axios
        .get(url)
        .then((result, err) => {
          if (err) {
            console.log("error again", err);
            reject(err.toString());
          } else {
            console.log("the result", result.data.result);
            resolve(result.data.result);
          }
        })
        .catch((e) => {
          console.log("error in axios request", e);
          reject(e.toString());
        });
    });
  }
}

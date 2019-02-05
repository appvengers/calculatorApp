export default class Api {
  static addOperation(firstNumber, secondNumber) {
    return fetch(
      "https://20190204t145901-dot-dotted-byway-229018.appspot.com/services/operations/V1",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstNumber,
          secondNumber,
          operation: "add"
        })
      }
    )
      .then(res => res.json())
      .then(json => {
        return json.data;
      })
      .catch(ex => {
        throw new Error("fetch failed" + ex);
      });
  }
}

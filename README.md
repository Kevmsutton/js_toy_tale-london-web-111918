


* For examples, refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

## STEP 5: Increase toy's likes!

When a user clicks on a toy's like button, two things should happen:
  * Conditionally increase the toy's like count
  * Send a patch request to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
  * Headers and body are provided below. If your request isn't working, make sure your header and keys match the documentation.

```
PATCH http://localhost:3000/toys/:id
headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body:
{
  "likes": <new number>
}
```

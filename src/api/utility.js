const TranlateText =()=>{
    let url = "https://translation.googleapis.com/v3/projects/PROJECT_ID:translateText";  // Modified
let response = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": "Bearer ###accessToken###",  // Modified
    "Content-Type": "application/json",
  },
  body: JSON.stringify({  // Modified
    sourceLanguageCode: "en",
    targetLanguageCode: "ru",
    contents: ["Dr. Watson, come here!"],
    mimeType: "text/plain",
  }),
});

let result = await response.json();

console.log(result);
}
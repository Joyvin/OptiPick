import axios from "axios"
import { useEffect, useState } from "react"

export const CountButton = () => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  const sendRequest = () => {
    console.log("no hi")
    if (url) {
      // console.log("hi")
      axios
        .post("http://localhost:4000/endpoint", {
          url
        })
        .then((response) => console.log(response))
        .catch((error) => console.error(error))
    }
  }

  return (
    <>
      <button onClick={sendRequest}>Send URL</button>
      <p>{url}</p>
    </>
  )
}

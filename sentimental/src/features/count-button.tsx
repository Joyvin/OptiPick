import axios from "axios"
import { Moon, Sparkles } from "lucide-react"
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
      <div className="block w-[90%] mx-auto text-center">
        <div className="flex justify-center flex-row gap-3 my-4 border-b pb-2">
          <Sparkles />
          <h1 className="font-bold text-xl">Welcome to OptiPick</h1>
        </div>
        <p>Analyse your page in one click and find the best product experienced by customers</p>
        <div className="absolute bottom-4 right-4 flex gap-3">
        <button
          className="rounded-md p-2 px-4 border border-black "
          onClick={sendRequest}>
          <Moon size={20}/>
        </button>

        <button
          className="rounded-md p-2 px-4 border border-black "
          onClick={sendRequest}>
          Analyse Page
        </button>
        </div>
        {/* <p>{url}</p> */}
      </div>
    </>
  )
}

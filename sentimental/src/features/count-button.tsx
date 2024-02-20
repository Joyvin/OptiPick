import axios from "axios"
import { Moon, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import someCoolImage from "data-base64:~/../assets/Binary code.mp4"

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
        <p className="mb-3">Analyse your page in one click and find the best product experienced by customers</p>

        {/* <img src={someCoolImage} alt="Some pretty cool image" /> */}
        <video src={someCoolImage} muted autoPlay loop />


        <div className="absolute bottom-4 right-4 flex gap-3">
        <button
          className="rounded-md p-2 px-4 border border-black "
          onClick={sendRequest}>
          <Moon size={20}/>
        </button>

        <button
          className="rounded-md p-2 px-4 border border-black"
          onClick={sendRequest}>
          Analyse Product
        </button>
        </div>
        {/* <p>{url}</p> */}
      </div>
    </>
  )
}

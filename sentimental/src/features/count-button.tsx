import someCoolImage from "data-base64:~/../assets/Binary code.mp4"
import { Moon, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export const CountButton = () => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  const sendRequest = async () => {
    console.log("no hi")
    if (url) {
      console.log("hi")
      try {
        const response = await fetch("http://127.0.0.1:8000/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "http://127.0.0.1:8000"
          },
          body: JSON.stringify({ url: url })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      <div className="block w-[90%] mx-auto text-center">
        <div className="flex justify-center flex-row gap-3 my-4 border-b pb-2">
          <Sparkles />
          <h1 className="font-bold text-xl">Welcome to OptiPick</h1>
        </div>
        <p className="mb-3">
          Analyse your page in one click and find the best product experienced
          by customers
        </p>

        {/* <img src={someCoolImage} alt="Some pretty cool image" /> */}
        <video src={someCoolImage} muted autoPlay loop />

        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            className="rounded-md p-2 px-4 border border-black "
            onClick={sendRequest}>
            <Moon size={20} />
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

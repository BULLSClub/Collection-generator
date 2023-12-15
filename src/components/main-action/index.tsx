import html2canvas from 'html2canvas'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { changePreview, changeProgress, changeShowMetadata, changeShowPreview, changeStatus } from '../../core/store/app-slice/appSlice'
import styles from './style.module.css'
import { Buffer } from 'buffer'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

// const { ipcRenderer } = window.require('electron');



const MainAction = () => {

  const { files, count, width, height, collectionDescription, collectionName, status, format, standard, symbol, sellerFeeBasisPoints, animationUrl, externalUrl } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const worker = useMemo(() => new Worker(new URL('../../worker/generator.worker.ts', import.meta.url)), []);
  const [currentCount, setCurrentCount] = useState(0)

  useEffect(() => {
    dispatch(changeProgress((currentCount / count) * 100))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCount])

  useEffect(() => {
    if (status === "COMPLETED") setCurrentCount(0)
  }, [status])

  const onGenerate = () => {
    if (!files.length) {
      alert("Please add NFT png Layers to generate collection.")
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(changeStatus('GENERATING'))
    const zip = new JSZip();
    const nftCollectionFolder = zip.folder("Collection")
    const metadataFolder = zip.folder("Metadata")

    worker.postMessage({ files, count, standard, format, collectionName, collectionDescription,
      symbol, sellerFeeBasisPoints, animationUrl, externalUrl
     })
    worker.onmessage = async (event) => {
      const outerLoopLength = event.data.nfts.length
      for (let outerIndex = 0; outerIndex < outerLoopLength; outerIndex++) {
        const innerLoopLength = event.data.nfts[outerIndex].length
        document.getElementById("nftElement")!.style.width = `${width / 2}px`
        document.getElementById("nftElement")!.style.height = `${height / 2}px`
        for (let innerIndex = 0; innerIndex < innerLoopLength; innerIndex++) {
          const imgElement = document.createElement('img')
          imgElement.style.position = "absolute"
          imgElement.style.width = `${width / 2}px`
          imgElement.style.height = `${height / 2}px`
          imgElement.src = event.data.nfts[outerIndex][innerIndex];
          document.getElementById("nftElement")?.appendChild(imgElement);
        }
        const canvas = await html2canvas(document.getElementById("nftElement")!);
        const data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, 'base64');
        const metadataBuf = Buffer.from(JSON.stringify(event.data.metadata[outerIndex]), 'utf-8')
        nftCollectionFolder.file((outerIndex + 1).toString() + `.${format.toLowerCase()}`, buf, { base64: true })
        metadataFolder.file((outerIndex + 1).toString() + ".json", metadataBuf)
        document.getElementById("nftElement")!.innerHTML = ""
        setCurrentCount((prev) => prev + 1)
      }
      zip.file("nft-collection", (await nftCollectionFolder.generateAsync({ type: "base64" })), { base64: true, dir: true })
      zip.file("metadata", (await metadataFolder.generateAsync({ type: "base64" })), { base64: true, dir: true })
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          FileSaver.saveAs(content, "Nft Collection.zip");
        });
    }
  }

  const onPreviewHandler = () => {
    if (files.length === 0) {
      alert("Please add NFT layers to preview")
      return
    }
    const previewLayer: string[] = []
    files.forEach((file) => {
      previewLayer.push(URL.createObjectURL(file.files[0]))
    })
    dispatch(changePreview(previewLayer))
    dispatch(changeShowPreview(true))
  }
  const onPreviewMetadataHandler = () => {
    dispatch(changeShowMetadata(true))
  }

  return (
    <div className='flex flex-col md:flex-row justify-between mt-5 gap-3 mx-5'>
      <button onClick={onPreviewHandler} className={`flex-1 ${styles.secondaryBtn}`}  >
        Preview NFT
      </button>
      {/* <button onClick={onPreviewMetadataHandler} className={styles.secondaryBtn}  >
        Preview Metadata
      </button> */}
      <button onClick={onGenerate} className={`flex-1 ${styles.mainBtn}`} >
        Generate NFT Collection
      </button>
    </div>
  )
}

export default MainAction
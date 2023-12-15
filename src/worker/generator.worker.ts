import { DataType } from "../App"

export default onmessage = (event) => {
  const nfts = []
  const metadata: Array<object> = []
  const standard = event.data.standard
  const format = event.data.format

  if (standard === "ETHEREUM") {
    for (let index = 0; index < event.data.count; index++) {
      const nftLayer: string[] = []
      const attribute: Record<string, any> = {}
      event.data.files.forEach((layer: DataType) => {
        const randomEnd = layer.files.length
        let randomIndex = Math.floor(Math.random() * randomEnd) + 1
        let random = randomIndex - 1
        const source = URL.createObjectURL(layer.files[random])
        const key = layer.folder.replaceAll(" ", "_")

        attribute[key] = {
          type: "string",
          description: layer.files[random].name.replace(".png", "").replace(".jpg", "").replaceAll("_", " ").replaceAll("-", ""),
        }
        nftLayer.push(source)
      })
      attribute["image"] = {
        "type": "string",
        "description": `${index + 1}.${format.toLowerCase()}`
      }
      const data = {
        title: `${event.data.collectionName} ${index + 1}`,
        type: "object",
        properties: attribute
      }
      metadata.push(data)
      nfts.push(nftLayer)
    }
    console.log(metadata)
    postMessage({ nfts, metadata })
    return
  }
  if (standard === "OPENSEA-RARIBLE") {
    for (let index = 0; index < event.data.count; index++) {
      const nftLayer: string[] = []
      const attribute: Record<string, any> = {}
      event.data.files.forEach((layer: DataType) => {
        const randomEnd = layer.files.length
        let randomIndex = Math.floor(Math.random() * randomEnd) + 1
        let random = randomIndex - 1
        const source = URL.createObjectURL(layer.files[random])
        const key = layer.folder.replaceAll(" ", "_")
        attribute[key] = {
          type: "string",
          description: layer.files[random].name.replace(".png", "").replace(".jpg", "").replaceAll("_", " ").replaceAll("-", ""),
        }
        nftLayer.push(source)
      })
      const data = {
        name: `${event.data.collectionName} ${index + 1}`,
        description: event.data.collectionDescription,
        external_image: `${index + 1}.${format.toLowerCase()}`,
        image: `${index + 1}.${format.toLowerCase()}`,
        attributes: attribute
      }
      metadata.push(data)
      nfts.push(nftLayer)
    }
    console.log(metadata)
    postMessage({ nfts, metadata })
  }
  if (standard === "SOLANA") {
    for (let index = 0; index < event.data.count; index++) {
      const nftLayer: string[] = []
      const attribute: Array<Record<string, any>> = []
      event.data.files.forEach((layer: DataType) => {
        const randomEnd = layer.files.length
        let randomIndex = Math.floor(Math.random() * randomEnd) + 1
        let random = randomIndex - 1
        const source = URL.createObjectURL(layer.files[random])
        const key = layer.folder.replaceAll(" ", "_")
        attribute.push({
          trait_type: key,
          value: layer.files[random].name.replace(".png", "").replace(".jpg", "").replaceAll("_", " ").replaceAll("-", ""),
        })
        nftLayer.push(source)
      })
      const data = {
        name: `${event.data.collectionName} ${index + 1}`,
        symbol: event.data.symbol,
        description: event.data.collectionDescription,
        image: `${index + 1}.${format.toLowerCase()}`,
        animation_url: event.data.animationUrl,
        external_url: event.data.externalUrl,
        seller_fee_basis_points: event.data.sellerFeeBasisPoints,
        attributes: attribute
      }
      metadata.push(data)
      nfts.push(nftLayer)
    }
    console.log(metadata)
    postMessage({ nfts, metadata })
  }

}

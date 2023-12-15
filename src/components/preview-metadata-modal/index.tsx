import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { changeShowMetadata, changeShowPreview } from "../../core/store/app-slice/appSlice"
import JSON2 from 'JSON2'
import { useState } from "react"


const metadatsSample = {
    ETHEREUM: {
        "title": "Asset Name",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "Property description"
            },
            "description": {
                "type": "string",
                "description": "Property description"
            },
            "image": {
                "type": "string",
                "description": "Property description"
            }
        }
    },
    OPENSEA: {
        "description": "Asset description",
        "external_url": "href to external_url",
        "image": "href to image",
        "name": "Asset Name",
        "attributes": [{
            "trait_type": "Trait Name",
            "value": "Trait Value"
        },
        {
            "trait_type": "Trait Name",
            "value": "Trait Value"
        },]
    },
    RARIBLE: {
        "title": "Asset Metadata",
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "Property description"
            },
            "description": {
                "type": "string",
                "description": "Property description"
            },
            "image": {
                "type": "string",
                "description": "Property description"
            }
        }
    }
}

const PreviewMetaDataModal = () => {
    const { showMetadata, standard } = useSelector((state: RootState) => state.app)
    const [sample, setSample] = useState(metadatsSample)
    const dispatch = useDispatch()

    return (
        <div>
            <Modal
                title={`${standard} Standard`}
                centered
                open={showMetadata}
                onOk={() => dispatch(changeShowMetadata(false))}
                onCancel={() => dispatch(changeShowMetadata(false))}
                width={400}
            >
                <div className='w-full flex justify-center rounded-lg'>
                    <div className="relative w-[400px]">
                        <textarea rows={14} className="resize-none w-full h-full text-white bg-[transparent]">{JSON.stringify(sample[standard], null, "\t")}</textarea>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PreviewMetaDataModal
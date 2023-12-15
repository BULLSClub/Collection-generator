import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store"
import { changeShowPreview } from "../../core/store/app-slice/appSlice"

const PreviewModal = () => {
    const { preview, showPreview } = useSelector((state:RootState)=>state.app)
    const dispatch = useDispatch()
    return (
        <div>
            <Modal
                title="Preview NFT"
                centered
                open={showPreview}
                onOk={() => dispatch(changeShowPreview(false))}
                onCancel={() => dispatch(changeShowPreview(false))}
                width={400}
            >
                <div className='w-full flex justify-center rounded-lg'>
                    <div className="relative w-[300px]">
                        {showPreview && preview.map((layer) =>
                            <img style={{ position: 'absolute', objectFit: 'contain' }} src={layer} alt="" />
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PreviewModal
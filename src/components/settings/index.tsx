import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { InputNumber, Radio, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { changeAnimationUrl, changeCollectionDescription, changeCollectionName, changeCount, changeExternalUrl, changeFormat, changeHeight, changeMetadataPath, changeNftPath, changeSellerPoints, changeStandard, changeSymbol, changeWidth } from '../../core/store/app-slice/appSlice'
import { RootState } from '../../app/store'
import Input from 'antd/lib/input/Input'
import styles from './style.module.css'
import TextArea from 'antd/lib/input/TextArea'
// const { ipcRenderer } = window.require('electron');


const Settings = () => {
    const { count, width, height, format, standard, collectionName, collectionDescription, animationUrl, symbol, externalUrl, sellerFeeBasisPoints } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const metadataRef = useRef<HTMLInputElement>(null);
    const nftRef = useRef<HTMLInputElement>(null);
    const [standardDropDownOpen, setStandardDropDownOpen] = useState(false)


    useEffect(() => {
        if (metadataRef.current !== null) {
            metadataRef.current.setAttribute("directory", "");
            metadataRef.current.setAttribute("webkitdirectory", "");
        }
        if (nftRef.current !== null) {
            nftRef.current.setAttribute("directory", "");
            nftRef.current.setAttribute("webkitdirectory", "");
        }
    }, [metadataRef, nftRef]);

    const changeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event)
    }

    return (
        <div className={`flex flex-col ${styles.container}`}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Number of NFTs</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <InputNumber className="mt-1 ant-input-number-focused" size="large" min={1} max={100000} value={count} onChange={(value) => dispatch(changeCount(value || 10))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Image width in px</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <InputNumber className="mt-1 ant-input-number-focused" size="large" min={1} max={100000} value={width} onChange={(value) => dispatch(changeWidth(value || 800))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Image height in px</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <InputNumber className="mt-1 ant-input-number-focused" size="large" min={1} max={100000} value={height} onChange={(value) => dispatch(changeHeight(value || 800))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Image format</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <Radio.Group defaultValue={format} buttonStyle="solid" onChange={(event) => dispatch(changeFormat(event.target.value))}>
                    <Radio.Button className={styles.pngBtn} value="PNG">PNG</Radio.Button>
                    <Radio.Button className={styles.jpgBtn} value="JPG">JPG</Radio.Button>
                </Radio.Group>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Metadata standard</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <Select
                    onBlur={() => setStandardDropDownOpen(false)}
                    className='mt-9'
                    onClick={() => setStandardDropDownOpen(true)}
                    value={standard}
                    open={standardDropDownOpen}
                    dropdownRender={() => (
                        <div
                            onMouseDown={(e) => {
                                e.preventDefault();
                                if ((e.target as any).id) {
                                    dispatch(changeStandard((e.target as any).id))
                                    e.stopPropagation();
                                    setStandardDropDownOpen(false)
                                }

                            }}
                        >   <p className='cursor-pointer text-black px-2' id='ETHEREUM'>Ethereum</p>
                            <p className='cursor-pointer text-black px-2' id='OPENSEA-RARIBLE'>Opensea / RARIBLE</p>
                            <p className='cursor-pointer text-black px-2' id='SOLANA'>Solana / Metaplex</p>
                        </div>
                    )}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Collection name</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <Input className="mt-1" size="large" value={collectionName} placeholder={"Enter name here"} onChange={(event) => dispatch(changeCollectionName(event.target.value))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                <p className='h-[36px] my-0 flex items-center'>Collection description</p>
                <p className='h-[36px] my-0 grid place-items-center'>:</p>
                <TextArea className="mt-1" size="large" value={collectionDescription} placeholder={"Enter description here"} onChange={(event) => dispatch(changeCollectionDescription(event.target.value))} />
            </div>
            {standard === "SOLANA" &&
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                        <p className='h-[36px] my-0 flex items-center'>Collection symbol</p>
                        <p className='h-[36px] my-0 grid place-items-center'>:</p>
                        <Input className="mt-1" size="large" value={symbol} placeholder={"Enter symbol here"} onChange={(event) => dispatch(changeSymbol(event.target.value))} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                        <p className='h-[36px] my-0 flex items-center'>External Url</p>
                        <p className='h-[36px] my-0 grid place-items-center'>:</p>
                        <Input className="mt-1" size="large" value={externalUrl} placeholder={"Enter external url here"} onChange={(event) => dispatch(changeExternalUrl(event.target.value))} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                        <p className='h-[36px] my-0 flex items-center'>Animation Url</p>
                        <p className='h-[36px] my-0 grid place-items-center'>:</p>
                        <Input className="mt-1" size="large" value={animationUrl} placeholder={"Enter animation url here"} onChange={(event) => dispatch(changeAnimationUrl(event.target.value))} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 3fr', marginTop: '10px' }}>
                        <p className='h-[36px] my-0 flex items-center'>Seller Fee Basis Points</p>
                        <p className='h-[36px] my-0 grid place-items-center'>:</p>
                        <InputNumber className="mt-1 ant-input-number-focused" size="large" value={sellerFeeBasisPoints} onChange={(value) => dispatch(changeSellerPoints(value || 0))} />
                    </div>

                </>}
            

            {/* <div className='border border-gray-500 px-2 pb-3 rounded-lg mt-3'>
                <p className='h-[36px] my-0 flex items-center'>NFT output path</p>
                <div className='flex items-stretch'>
                    <Input className={styles.pathInput} disabled style={{ width: '100%' }} size="small" value={nftPath.replace(".", "")} onChange={(value) => dispatch(changeMetadataPath(value.target.value))} />
                    <button className={styles.inputButton} onClick={() => {
                        // ipcRenderer.invoke('openFolder', "hi").then((value: string) => {
                        //     dispatch(changeNftPath(value))
                        // });
                    }}>
                        Change
                    </button>
                    <input onChange={changeFileHandler} hidden type="file" id="chooseNftPath" ref={nftRef} />

                </div>            </div>
            <div className='border border-gray-500 px-2 pb-3 rounded-lg mt-3 flex flex-col'>
                <p className='h-[36px] my-0 flex  items-center'>Metadata output path</p>
                <div className='flex items-stretch'>
                    <Input className={styles.pathInput} disabled style={{ width: '100%' }} size="small" value={metadataPath.replace(".", "")} onChange={(value) => dispatch(changeMetadataPath(value.target.value))} />
                    <button className={styles.inputButton}  onClick={() => {
                        // ipcRenderer.invoke('openFolder', "hi").then((value: string) => {
                        //     dispatch(changeMetadataPath(value))
                        // });
                    }} >
                        Change
                    </button>
                    <input onChange={changeFileHandler} hidden type="file" id="chooseMetadatPath" ref={metadataRef} />
                </div>
            </div> */}
        </div>
    )
}

export default Settings
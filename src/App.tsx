import { useEffect, useState } from 'react';
import './App.css';
import { Progress } from 'antd';
import Settings from './components/settings'
import { UploadComponent } from './components/upload-file';
import { CloseOutlined } from '@ant-design/icons';
import MainAction from './components/main-action';
import PreviewModal from './components/preview-modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeFiles, changeMetadataPath, changeNftPath, changeProgress, changeStatus } from './core/store/app-slice/appSlice';
import { RootState } from './app/store';
import ListSort from './components/layer';
import PreviewMetaDataModal from './components/preview-metadata-modal';
// const { ipcRenderer } = window.require('electron')



export interface DataType {
  key: string;
  folder: string;
  number: number;
  path: string;
  color: string;
  files: File[]
}





function App() {
  // document.body.style.overflow = "hidden"
  const dispatch = useDispatch()
  const { status, files, progress, nftPath } = useSelector((state: RootState) => state.app)
  const [uploaded, setUploaded] = useState(false)

  useEffect(() => {
    if (files.length === 0) {
      setUploaded(false)
    }
  }, [files])

  useEffect(() => {
    // ipcRenderer.invoke('initDirectory').then(([defaultNftPath, defaultMetadataPath]: string[]) => {
    //   dispatch(changeNftPath(defaultNftPath))
    //   dispatch(changeMetadataPath(defaultMetadataPath))
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const onFileSelectHandler = (files: any[]) => {
    console.log(files)
    setUploaded(true)
    const data: DataType[] = []

    for (const file in files) {
      const path = files[file][0].originFileObj.webkitRelativePath
      // path.pop()
      const newFolder: DataType = {
        key: file,
        folder: file.replaceAll("_", " "),
        number: files[file].length,
        path: path,
        files: [],
        color: getRandomColor()
      }
      files[file].forEach((file: any) => {
        if(file.type ===  "image/png"){
          newFolder.files.push(file.originFileObj)
        }
      })
      data.push(newFolder)
    }
    dispatch(changeFiles(data))
  }

  const onCloseHandler = () => {
    dispatch(changeStatus("COMPLETED"))
    dispatch(changeFiles([]))
    dispatch(changeProgress(0))
  }

  const openOutputFolder = () => {
    // ipcRenderer.invoke('outputFolder', nftPath)
  }


  return (
    <div className="App pt-3">
      <div>
      <a href='https://bullsclub.space/'>
      <img src="/Bullsc.png" width="100" height="100" /></a>
      </div>
      <header className="App-header">
     
        <p className="text-lg font-semibold text-center">BULLSCLUB NFT Collection Generator</p>
     
      </header>
      <div className='main flex flex-col md:flex-row'>

        <div className="mx-5 flex-1">
          {!uploaded && !files.length ? <UploadComponent onFileSelected={onFileSelectHandler} /> :
            <ListSort />
          }
        </div>
        <div className='mx-0 md:mx-5 flex-1 mt-10 md:mt-0'>
          <div>
          </div>
          <Settings />
          <MainAction />
          <a href='mailto:collection@bullsclub.space'>
         Mail a Sample to get featured 📭</a>
        </div>
       
      </div>

      {
        status === "GENERATING" &&
        <div style={{
          // background: 'red'
        }} className='absolute z-10 h-screen w-screen top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#1a1a1adc]'>
          <div className='bg-white w-96 flex justify-center pb-4 pt-2 flex-col items-center rounded-lg shadow-lg loading-overlay'>
            <p className='text-black text-right w-full px-3'><CloseOutlined onClick={onCloseHandler} /></p>
            <Progress type="circle"   percent={Math.floor(progress)} width={80} />
            {progress < 100
              ?
              <p className='text-black mt-4'>Generating NFT Collection...</p> :
              <>
                <p className='text-black mt-4'>NFT Collection generated successfully</p>
                <div className='flex'>
                  <button onClick={openOutputFolder} className="mainBtn" >
                    Open output folder
                  </button>
                </div>

              </>
            }

          </div>
        </div>}

      {
        status === "GENERATING"
        &&
        <div id="nftElement" className="relative w-[300px] h-[300px] mx-auto mt-10">

        </div>

      }
      <PreviewModal />
      {/* <PreviewMetaDataModal /> */}


    </div>
  );
}

export default App;

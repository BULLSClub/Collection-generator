/* eslint-disable no-empty-pattern */
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './style.module.css'


const { Dragger } = Upload;



export const UploadComponent = ({ onFileSelected }: { onFileSelected: (files: any[]) => void }) => {
  const [files, setFiles] = useState<any>({})
  const props: UploadProps = {
    name: 'file',
    directory: true,
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest(options) {
    },
    onChange(info) {
      const key = info.file.originFileObj?.webkitRelativePath.split("/")[0].replaceAll(" ", "_").toLowerCase() || "temp"
      const tempFile = files
      tempFile[key] = tempFile[key] ? [...tempFile[key], info.file] : [info.file]
      setFiles(tempFile)
      onFileSelected(files)
    },
    onDrop(e) {
    },
  };
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined className={styles.icon} />
      </p>
      <p className="ant-upload-text px-5">Click or drag folders to this area to add the NFT Layers</p>
      <p onClick={() => console.log(files)} className="ant-upload-hint px-5">
        Empty folder shouldn't be added
        <p>Note: Make sure your files are in PNG format.</p>
      </p>
    </Dragger>
  )
}
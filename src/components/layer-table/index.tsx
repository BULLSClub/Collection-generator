import { DeleteOutlined, DownOutlined, FolderAddOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataType } from "../../App";
import { RootState } from "../../app/store";
import { changeFiles, changeSelectedIndex } from "../../core/store/app-slice/appSlice";



const columns: ColumnsType<DataType> = [
    {
        title: 'Folder name',
        dataIndex: 'folder',
        key: 'folder',
    },
    {
        title: 'Path',
        dataIndex: 'path',
        key: 'path',
        render: text => <p style={{ textOverflow: 'ellipsis', width: '290px', whiteSpace: 'nowrap', overflow: 'hidden', margin: '0' }}>{text}</p>
    },
];

const LayerTable = () => {
    const { files, selectedIndex } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current?.setAttribute("directory", "");
            ref.current?.setAttribute("webkitdirectory", "");
        }
    }, [files])

    const changeFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const key = (event.target.files![0].webkitRelativePath).split("/")[0].toLowerCase()
        const path = ((event.target.files![0] as any).path as string).split("/")
        path.pop()

        const tempOriginalArray = [...files]
        console.log(tempOriginalArray)
        const length = event.target.files?.length || 0
        const data: DataType = {
            key: key,
            folder: key,
            number: length,
            files: [],
            color:"red",
            path: path.join("/")
        }
        for (let index = 0; index < length; index++) {
            data.files.push(event.target.files![index])
        }
        tempOriginalArray.push(data)
        dispatch(changeFiles(tempOriginalArray))
    }

    const moveSelectedLayerUp = () => {
        if (selectedIndex !== 0) {
            const tempOriginalArray = [...files]
            const tempLayer = tempOriginalArray[selectedIndex]
            tempOriginalArray[selectedIndex] = tempOriginalArray[selectedIndex - 1]
            tempOriginalArray[selectedIndex - 1] = tempLayer
            dispatch(changeSelectedIndex(selectedIndex - 1))
            dispatch(changeFiles(tempOriginalArray))
        }
    }

    const moveSelectedLayerDown = () => {
        if (selectedIndex < files.length - 1) {
            const tempOriginalArray = [...files]
            const tempLayer = tempOriginalArray[selectedIndex]
            tempOriginalArray[selectedIndex] = tempOriginalArray[selectedIndex + 1]
            tempOriginalArray[selectedIndex + 1] = tempLayer
            dispatch(changeSelectedIndex(selectedIndex + 1))
            dispatch(changeFiles(tempOriginalArray))
        }
    }

    const deleteSelectedLayer = () => {
        const tempOriginalArray = [...files]
        tempOriginalArray.splice(selectedIndex, 1)
        dispatch(changeFiles(tempOriginalArray))
    }


    return (
        <div>
            <Table
                scroll={{ y:280, x: 400 }}
                onRow={(_, rowIndex) => {
                    return {
                        onClick: event => {
                            dispatch(changeSelectedIndex(rowIndex || 0))
                        }, // click row
                    };
                }}
                rowClassName={(record, index) => (index === selectedIndex ? "table-active" : "")}
                pagination={false} columns={columns} dataSource={files} footer={() => <div className='flex justify-center gap-5 w-full'>
                    
                </div>} />
                <Button onClick={() => {
                        document.getElementById("addFile")?.click()
                    }} type="primary" shape="circle" icon={<FolderAddOutlined />} />
                    <input onChange={changeFileHandler} hidden type="file" id="addFile" ref={ref} />
                    <Button type="primary" shape="circle" onClick={moveSelectedLayerUp} icon={<UpOutlined />} />
                    <Button type="primary" shape="circle" onClick={moveSelectedLayerDown} icon={<DownOutlined />} />
                    <Button type="primary" danger shape="circle" onClick={deleteSelectedLayer} icon={<DeleteOutlined />} />
        </div>
    )
}


export default LayerTable
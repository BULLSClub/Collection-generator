import { DeleteOutlined, FolderAddOutlined, PictureOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { ChangeEvent, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataType } from "../../App"
import { RootState } from "../../app/store"
import { changeFiles, changeSelectedIndex } from "../../core/store/app-slice/appSlice"
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided } from 'react-beautiful-dnd';



const ListSort = () => {
    const { files } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const ref = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (ref.current !== null) {
            ref.current.setAttribute("directory", "");
            ref.current.setAttribute("mozdirectory", "");
            ref.current.setAttribute("msdirectory", "");
            ref.current.setAttribute("odirectory", "");
            ref.current.setAttribute("multiple", "");

        }
    }, [ref]);

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
            color: "red",
            path: path.join("/")
        }
        for (let index = 0; index < length; index++) {
            data.files.push(event.target.files![index])
        }
        tempOriginalArray.push(data)
        dispatch(changeFiles(tempOriginalArray))
    }

    // const moveSelectedLayerUp = () => {
    //     if (selectedIndex !== 0) {
    //         const tempOriginalArray = [...files]
    //         const tempLayer = tempOriginalArray[selectedIndex]
    //         tempOriginalArray[selectedIndex] = tempOriginalArray[selectedIndex - 1]
    //         tempOriginalArray[selectedIndex - 1] = tempLayer
    //         dispatch(changeSelectedIndex(selectedIndex - 1))
    //         dispatch(changeFiles(tempOriginalArray))
    //     }
    // }

    // const moveSelectedLayerDown = () => {
    //     if (selectedIndex < files.length - 1) {
    //         const tempOriginalArray = [...files]
    //         const tempLayer = tempOriginalArray[selectedIndex]
    //         tempOriginalArray[selectedIndex] = tempOriginalArray[selectedIndex + 1]
    //         tempOriginalArray[selectedIndex + 1] = tempLayer
    //         dispatch(changeSelectedIndex(selectedIndex + 1))
    //         dispatch(changeFiles(tempOriginalArray))
    //     }
    // }

    const deleteSelectedLayer = (index: number) => {
        const tempOriginalArray = [...files]
        tempOriginalArray.splice(index, 1)
        dispatch(changeFiles(tempOriginalArray))
    }

    const onBeforeCapture = () => { };

    const onBeforeDragStart = () => { };

    const onDragStart = () => { };

    const onDragUpdate = () => { };


    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) return
        const tempOriginalArray = [...files]
        const [reorderedIndex] = tempOriginalArray.splice(result.source.index, 1)
        tempOriginalArray.splice(result.destination.index, 0, reorderedIndex)
        dispatch(changeFiles(tempOriginalArray))
    };
    return (
        <div>
            <div >
                <DragDropContext
                    onBeforeCapture={onBeforeCapture}
                    onBeforeDragStart={onBeforeDragStart}
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                    onDragEnd={onDragEnd}
                >
                    <Droppable droppableId="droppable-1" type="LAYER">
                        {(provided, snapshot) => (
                            <div
                                className="p-5 rounded-lg overflow-y-scroll"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{ backgroundColor: snapshot.draggingOverWith ? '#0b0b0b40' : '#0b0b0b40', height: '25rem' }}
                            >
                                {files.map((file, index) =>
                                    <Draggable key={file.folder} draggableId={file.folder} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div key={index}
                                                    style={{
                                                        background: snapshot.isDragging ? '#2b2b2b87' : 'transparent'
                                                    }}
                                                    onClick={() => dispatch(changeSelectedIndex(index))}
                                                    className={`border p-2 my-2 rounded-sm flex items-center gap-2 cursor-pointer shadow-md `}>
                                                    <PictureOutlined />
                                                    <p className="m-0 grow"> {file.folder}</p>
                                                    <button className="p-0 grid place-items-center rounded-full bg-[red] w-7 h-7" onClick={() => deleteSelectedLayer(index)}>{<DeleteOutlined />}</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
            
            <p className="text-sm mt-1 font-thick text-gray-300 text-center">Drag layers to arrange them</p>

            {/* <div className="flex gap-5  mt- m-3 justify-center ">
                <Button style={{
                    outline: 'none',
                    border: 'none',
                    color: 'black',
                }} onClick={() => {
                    document.getElementById("addFile")?.click()
                }} type="primary" shape="circle" icon={<FolderAddOutlined />} />
                <input onChange={changeFileHandler} hidden type="file" id="addFile" ref={ref} />
            </div> */}

        </div>
    )
}

export default ListSort
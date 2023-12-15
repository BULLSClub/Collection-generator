/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataType } from '../../../App';

export interface AppState {
    status: 'INITIAL' | 'LOADED' | 'GENERATING' | 'COMPLETED',
    files: Array<DataType>,
    preview: string[],
    showPreview: boolean,
    showMetadata: boolean,
    progress: number
    selectedIndex: number,
    width: number,
    height: number,
    count: number,
    format: 'PNG' | 'JPG',
    nftPath: string,
    metadataPath: string,
    standard: 'ETHEREUM' | 'OPENSEA-RARIBLE' | 'RARIBLE' | 'SOLANA',
    collectionName: string,
    collectionDescription: string,
    symbol: string,
    animationUrl: string,
    externalUrl: string,
    sellerFeeBasisPoints: number,
}

const initialState: AppState = {
    status: 'INITIAL',
    files: [],
    preview: [],
    showPreview: false,
    progress: 0,
    selectedIndex: 0,
    width: 800,
    height: 800,
    count: 10,
    showMetadata: false,
    format: 'PNG',
    nftPath: "./output/nft",
    metadataPath: "./output/metadata",
    standard: 'ETHEREUM',
    collectionName: "",
    collectionDescription: "",
    symbol: "",
    animationUrl: "",
    externalUrl: "",
    sellerFeeBasisPoints: 0
};


export const counterSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<'INITIAL' | 'LOADED' | 'GENERATING' | 'COMPLETED'>) => {
            state.status = action.payload
        },
        changeSelectedIndex: (state, action: PayloadAction<number>) => {
            state.selectedIndex = action.payload
        },
        changeShowPreview: (state, action: PayloadAction<boolean>) => {
            state.showPreview = action.payload
        },
        changePreview: (state, action: PayloadAction<string[]>) => {
            state.preview = action.payload
        },
        changeFiles: (state, action: PayloadAction<DataType[]>) => {
            state.files = action.payload
        },
        changeWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload
        },
        changeHeight: (state, action: PayloadAction<number>) => {
            state.height = action.payload
        },
        changeCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        },
        changeFormat: (state, action: PayloadAction<'PNG' | 'JPG'>) => {
            state.format = action.payload
        },
        changeNftPath: (state, action: PayloadAction<string>) => {
            state.nftPath = action.payload
        },
        changeMetadataPath: (state, action: PayloadAction<string>) => {
            state.metadataPath = action.payload
        },
        changeProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload
        },
        changeStandard: (state, action: PayloadAction<string>) => {
            state.standard = action.payload as any
        },
        changeAnimationUrl: (state, action: PayloadAction<string>) => {
            state.animationUrl = action.payload as any
        },
        changeSellerPoints: (state, action: PayloadAction<number>) => {
            state.sellerFeeBasisPoints = action.payload
        },
        changeExternalUrl: (state, action: PayloadAction<string>) => {
            state.externalUrl = action.payload
        },
        changeSymbol: (state, action: PayloadAction<string>) => {
            state.symbol = action.payload
        },
        changeCollectionName: (state, action: PayloadAction<string>) => {
            state.collectionName = action.payload
        },
        changeCollectionDescription: (state, action: PayloadAction<string>) => {
            state.collectionDescription = action.payload
        },
        changeShowMetadata: (state, action: PayloadAction<boolean>) => {
            state.showMetadata = action.payload
        }
    },
});

export const { changeWidth, changeHeight, changeCount, changeFormat,
    changeMetadataPath, changeNftPath, changeFiles, changePreview, changeShowPreview,
    changeSelectedIndex, changeStatus, changeProgress, changeStandard, changeShowMetadata,
    changeCollectionName, changeCollectionDescription, changeAnimationUrl, changeExternalUrl, changeSellerPoints,
    changeSymbol } = counterSlice.actions;
export default counterSlice.reducer;

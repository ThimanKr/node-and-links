import React from "react";
import { createAction, createReducer } from "redux-act";
import { call, put, takeLatest, select } from "redux-saga/effects";
import { race, take } from "@redux-saga/core/effects";
import { Button, Modal } from "antd";
import {
  deleteFile,
  getFileData,
  getFiles,
  uploadFile,
} from "../services/fileUploadService";

import { handleAPIError } from "../utility/apiErrorHandler";

export const getFilesAction = createAction("GET_FILES");
export const setFileDataAction = createAction("SET_FILES");
export const uploadFileAction = createAction("UPLOAD_FILE");
export const setFileUploadSuccessAction = createAction(
  "SET_UPLOAD_FILE_SUCCESS"
);
export const setFileUploadFailAction = createAction("SET_FILE_FAIL");
export const deleteFileAction = createAction("DELETE_FILE");
export const getDataAction = createAction("GET_FILE_DATA");
export const setDataAction = createAction("SET_FILE_DATA");
export const toggleDeleteFileModalAction = createAction(
  "TOGGLE_DELETE_FILE_MODAL"
);
export const confirmDeleteFileModalAction = createAction(
  "CONFIRM_DELETE_FILE_MODAL"
);
export const cancelDeleteFileModalAction = createAction(
  "CANCEL_DELETE_FILE_MODAL"
);
export const resetFileDataAction = createAction("RESET_FILE_DATA");

const getFilesSaga = function*(action) {
  try {
    console.log("before request files", response);
    const response = yield call(getFiles, action.payload);
    console.log("response files", response.data);
    yield put(setFileDataAction(response.data));
  } catch (e) {
    console.log("Error in getting gap selected student files", e);
    handleAPIError(e);
  }
};

const uploadFileSaga = function*(action) {
  yield put(resetFileDataAction());
  console.log("form data", action.payload);
  console.log("nodeFile", action.payload.nodeFile.originFileObj);

  let formData = new FormData();
  formData.append("file", action.payload.nodeFile.originFileObj);
  const data = {
    fileType: action.payload.type,
    file: formData,
    fileName: action.payload.nodeFile.file.name,
  };
  try {
    const response = yield call(uploadFile, data);
    console.log("form data response", response);
    if (response["status"] === 200) {
      yield put(setFileUploadSuccessAction(true));
      yield put(getFilesAction());
      Modal.success({
        title: "Success",
        content: (
          <div>
            <p>File ({data.fileName}) was uploaded successfully!</p>
          </div>
        ),
      });
    } else {
      yield put(setFileUploadFailAction(true));
      yield put(getFilesAction());
      Modal.success({
        title: "Success",
        content: (
          <div>
            <p>File ({data.fileName}) was not uploaded successfully!!!</p>
          </div>
        ),
      });
    }
  } catch (e) {
    console.log("Error", e);
    if (e.data !== "") {
      handleAPIError(e);
    } else {
      handleAPIError({
        data: [{ errorCode: "", message: "Errors Occurred While Uploading!" }],
      });
    }
  }
};

const deleteGapFileSaga = function*(action) {
  console.log("form data", action.payload);
  try {
    yield put(toggleDeleteFileModalAction(true));
    const [yes] = yield race([
      take(confirmDeleteFileModalAction),
      take(cancelDeleteFileModalAction),
    ]);
    if (yes) {
      yield put(resetFileDataAction());
      const response = yield call(deleteFile, action.payload.fileId);
      if (response) {
        yield put(getFilesAction());
        Modal.success({
          title: "Success",
          content: (
            <div>
              <p>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    marginRight: "5px",
                  }}
                >
                  {action.payload.name}
                </span>
                <br></br>
                File deleted successfully!
              </p>
            </div>
          ),
        });
      } else {
        Modal.error({
          title: "Error",
          content: (
            <div>
              <p>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    marginRight: "5px",
                  }}
                >
                  {action.payload.name}
                </span>
                <br></br>
                File delete failed!
              </p>
            </div>
          ),
        });
      }
    }
    yield put(toggleDeleteFileModalAction(false));
  } catch (e) {
    console.log("Error", e);
    yield put(toggleDeleteFileModalAction(false));
    handleAPIError(e);
  }
};

const getFileDataSaga = function*(action) {
  try {
    const response = yield call(getFileData, action.payload);
    yield put(setDataAction(response.data));
  } catch (e) {
    console.log("Error in getting gap selected student files", e);
    handleAPIError(e);
  }
};

/* Sagas */

export const fileUploadRootSaga = function*() {
  yield takeLatest(getFilesAction, getFilesSaga);
  yield takeLatest(uploadFileAction, uploadFileSaga);
  yield takeLatest(deleteFileAction, deleteGapFileSaga);
  yield takeLatest(getDataAction, getFileDataSaga);
};

const initialState = {
  nodeData: [],
  data: null,
  fileData: [],
  uploadOk: null,
  uploadFail: null,
  deleteModalFile: false,
};

/* Reducers */
export const fileReducer = createReducer(
  {
    [setFileUploadSuccessAction]: (state, payload) => {
      return { ...state, uploadOk: payload };
    },
    [setFileUploadFailAction]: (state, payload) => {
      return { ...state, uploadFail: payload };
    },
    [setFileDataAction]: (state, payload) => {
      return {
        ...state,
        fileData: payload,
      };
    },
    [setDataAction]: (state, payload) => {
      return {
        ...state,
        nodeData: payload,
      };
    },
    [toggleDeleteFileModalAction]: (state, payload) => {
      return { ...state, deleteModalFile: payload };
    },
    [resetFileDataAction]: (state, payload) => {
      return {
        nodeData: [],
        data: null,
        fileData: [],
        uploadOk: null,
        uploadFail: null,
        deleteModalFile: false,
      };
    },
  },
  initialState
);

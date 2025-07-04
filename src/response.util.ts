export interface ResponseOk {
  status: "Success";
}

export interface ResponseOkWithData<T> extends ResponseOk {
  data?: T;
}

// 判斷 T 是否為物件，若是則返回包含資料的回應，否則返回只有狀態的回應
export type ResponseOkType<T> = T extends object
  ? ResponseOkWithData<T>
  : ResponseOk;

export const sendOk = <T>(payload?: T): ResponseOkType<T> => {
  if (payload) {
    return {
      status: "Success",
      data: payload,
    } as ResponseOkType<T>;
  }
  return {
    status: "Success",
  } as ResponseOkType<T>;
};

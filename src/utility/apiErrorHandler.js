import {Modal} from "antd";
import React from "react";

export const handleAPIError = (errorResponse) => {
    let message = 'Network Error!';
    if(errorResponse.data.length > 0){
        const erroCodes = errorResponse.data.map((e) => e.message);
         message = erroCodes.join("\n");
    }
    Modal.error({
        title: 'Error',
        content: (
            <div>
                <p>
                    {message}
                </p>
            </div>
        ),
    });
};

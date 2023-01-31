import React from 'react'
import {FileSearchOutlined} from '@ant-design/icons';

export const customizeRenderEmpty = () => (
    <div style={{textAlign: 'center'}}>
      <FileSearchOutlined style={{fontSize: 20}}/>
      <p>No Record Found!</p>
    </div>
);
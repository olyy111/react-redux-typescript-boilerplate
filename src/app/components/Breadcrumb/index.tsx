import * as React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
export const BreadcrumbCustom = (props: any)=>{
  return (
    <Breadcrumb>
      {
        (props.data || []).map((v: any,i: number)=>(
          <Breadcrumb.Item key={i}>
            {v.path?(<Link to={v.path}>{v.name}</Link>):v.name}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
};

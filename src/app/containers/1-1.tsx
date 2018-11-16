import * as React from 'react';
import { connect } from 'react-redux';
import {Table} from 'antd';
import {RootState} from "app/reducers";
// import {DemoModel} from "app/models";
import { bindActionCreators, Dispatch } from 'redux';
import {omit} from "app/utils";
import {demoActions, commonActions} from "app/actions";
import {RouteComponentProps} from "react-router";
import {CommonModel} from "app/models";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a href="#">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'LastLogin',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
  }
];
export namespace DemoPage {
  export interface Props extends RouteComponentProps<void> {
    demo: RootState.DemoState;
    actions: demoActions & commonActions;
  }
}
@connect(
  (state: RootState, ownProps): Pick<DemoPage.Props, 'demo'> => {
    return { demo: state.demo };
  },
  (dispatch: Dispatch): Pick<DemoPage.Props, 'actions'> => ({
    actions: {
      ...bindActionCreators(omit(demoActions, 'Type'), dispatch),
      ...bindActionCreators(omit(commonActions, 'Type'), dispatch),
    }
  })
)
export default class DemoPage extends React.Component<DemoPage.Props>{
  constructor(props: DemoPage.Props){
    super(props)
  }
  render(){
    let {data,loading, pagination} = this.props.demo;
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={this.handleTableChange.bind(this)}
        loading={loading}
      />
    )
  }
  handleTableChange(pagination: any, filters: any, sorter: any){
    this.fetch(pagination.current)
  }
  fetch(current: number){
    // 更新列表
    this.props.actions.fetchData({
      current: current,
      pageSize: 10,
      loading: false,
    })
  }
  componentDidMount(){
    const breadcrumbData: CommonModel[] = [
      {
        name:'首页',
        path:'/'
      },{
        name:'菜单一1',
        path: '/11'
      }
    ]
    this.props.actions.changeBreadcrumb(breadcrumbData);
    this.fetch(1);
  }
}

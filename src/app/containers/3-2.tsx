import * as React from 'react';
import { connect } from 'react-redux';
import {RootState} from "app/reducers";
import { bindActionCreators, Dispatch } from 'redux';
import {omit} from "app/utils";
import {commonActions} from "app/actions";
import { CommonModel } from 'app/models'
import {RouteComponentProps} from "react-router";


export namespace Option {
  export interface Props extends RouteComponentProps<void> {
    demo: RootState.CommonState;
    actions: commonActions;
  }
}

@connect(
  (state: RootState, ownProps): any => {
    return { demo: state.demo };
  },
  (dispatch: Dispatch): any => ({
    actions: bindActionCreators(omit(commonActions, 'Type'), dispatch)
  })
)
export default class Option extends React.Component<Option.Props>{
  constructor(props: Option.Props){
    super(props)
  }
  render(){
    return (<div>菜单三2</div>)
  }
  componentDidMount(){
    const breadcrumbData: CommonModel[] = [
      {
        name:'首页',
        path:'/'
      },{
        name:'菜单三2'
      }
    ]
    this.props.actions.changeBreadcrumb(breadcrumbData)
  }
}
